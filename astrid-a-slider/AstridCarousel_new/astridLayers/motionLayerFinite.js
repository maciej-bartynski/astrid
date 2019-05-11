import React, { Component, cloneElement, createRef } from 'react';
import carouselConnect from './../astridConnect';
import { findDOMNode } from 'react-dom';
import { library } from './../library';

class MotionLayerFinite extends Component {
    constructor(props) {
        super(props);
        this.position = this.props.mode === 'infinite' ? this.props.columns : 0;

        this.carouselReference = createRef();
    }

    renderCarouselItems = () => {
        return this.props.to_render.components.map((Child, idx) => {
            return cloneElement(
                Child, { astrid_position: this.position }
            )
        })
    }

    isOnEdge = () => {
        const MAX_POSITION = this.props.to_render.components.length - 1;
        const MIN_POSITION = 0;
        if (this.position >= MAX_POSITION) {
            this.position = MAX_POSITION;
            this.rightEdge = true;
        } else {
            this.rightEdge = false;
        }

        if (this.position <= MIN_POSITION) {
            this.position = MIN_POSITION;
            this.leftEdge = true;
        } else {
            this.leftEdge = false;
        }

        this.informationForNavigators = {
            active_position: this.position,
            left_edge: this.leftEdge,
            right_edge: this.rightEdge
        }
    }

    getPosition = () => {
        let { columns, to_render, by, to, mode, axis } = this.props;
        const { components_positions, components } = to_render;

        if (mode === 'infinite') {
            to = library.getModifiedTo(columns, to, components_positions.length);
        }

        const position = typeof by !== 'boolean' ? (this.position + by) : to;
        this.position = typeof position === 'number' ? position : this.position;
        this.position = library.getValidCarouselPosition(this.position, components.length);

        this.isOnEdge();
        this.carouselTransverseAxisWidth();

        const TRANSITION_UNIT = this.props.grid ? '%' : 'px';
        const transitionPosition = -components_positions[this.position] + TRANSITION_UNIT;
        return transitionPosition;
    }

    carouselTransverseAxisWidth = () => {
        let { columns, to_render, grid, axis } = this.props;
        if ( grid ) return;
        const {
            components,
            components_widths,
            components_heights,
            components_positions,
            carouselSize,
            modifyCarouselTransverseWidth,
        } = to_render;

        const componentsSizes = axis === 'vertical' ? components_widths : components_heights ;
        let currentMinimalTransverseAxisWidth = componentsSizes[this.position];
        const carousel_items_max_iterator = components.length - 1 ;
        const carousel_items_min_iterator = this.position ;
        const currentCssPosition = components_positions[this.position];

        for (let i = carousel_items_min_iterator; i <= carousel_items_max_iterator; i++) {
            const next_item_css_position = components_positions[i + 1];
            const next_item_span_position = components_positions[i + 2];
            const next_item_transverse_size = componentsSizes[i + 1];

            if (next_item_span_position - currentCssPosition <= carouselSize) { //jeśli następny mieści się w wizjerze
                if (  next_item_transverse_size  > currentMinimalTransverseAxisWidth ) {
                    currentMinimalTransverseAxisWidth =  next_item_transverse_size ;
                }
            } else if ( (carouselSize/columns)*(columns-1) >= next_item_css_position - currentCssPosition ) { //następny zajmuje choć szerokość 1 kolumny
                if (  next_item_transverse_size  > currentMinimalTransverseAxisWidth ) {
                    currentMinimalTransverseAxisWidth =  next_item_transverse_size ;
                }
            } else {
                break;
            }

        }

        modifyCarouselTransverseWidth(currentMinimalTransverseAxisWidth)
    }

    render = () => {
        const position = this.getPosition();

        const translate = ( this.props.axis === 'vertical' ) ? 
            `translateY(${position})` : `translateX(${position})`;

        const dimension = ( this.props.axis === 'vertical' ) ? 
            'height' : 'width';

        const listStyle = {
            display: 'block',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            whiteSpace: 'nowrap',
            transition: 'transform 300ms linear',
            transform: translate,
        }

        listStyle[dimension] = '100%';

        return (
            <div
                ref={this.carouselReference}
                style={listStyle}
                onMouseDown = {(e)=>{this.handleLock(e)}}
                onMouseMove = {(e)=>{this.handleMove(e)}}
                onMouseUp ={(e)=>{this.handleLose(e)}}
               
            >
                {this.renderCarouselItems()}
            </div>
        )
    }

    tellNavigatorsIfOnEdge = () => {
        const { navigators } = this.props;
        if (!navigators) return;
        navigators.forEach((navigator) => {
            navigator.triggerSetState({
                ...this.informationForNavigators
            })
        })
    }

    componentDidUpdate = () => {
        this.tellNavigatorsIfOnEdge();
    }

    componentDidMount = () => {
        this.tellNavigatorsIfOnEdge();
    }

    handleLock = (e) => {
        e.stopPropagation() ; 
        e.preventDefault() ;
        this.locked = true;
        this.lockPosition = e.clientX ;
        this.carouselNode = findDOMNode(this.carouselReference.current) ;
        const findPosition = this.carouselNode.style.transform.indexOf('(');
        const number = parseFloat(this.carouselNode.style.transform.slice(findPosition+1));
        this.caroudelNodeInitialLeft = number;
    }

    handleLose = (e) => {
        this.locked = false;
        this.losePosition = e.clientX;
        this.difference = this.losePosition - this.lockPosition ;
        this.shiftByPx = Math.abs(this.difference );

        const { move_by, columns, to_render: { carouselSize } } = this.props;

        const columnWidth = carouselSize / columns ;
        const isShifted = this.shiftByPx > columnWidth/2;
        if (!isShifted) {
            this.carouselNode.style.transform = `translateX(${this.caroudelNodeInitialLeft}px)`;
            return;
        };
        const shiftByColumns = Math.ceil(this.shiftByPx / columnWidth);
        const shiftDirection = Math.sign(this.difference);
        const moveBy = shiftByColumns * -shiftDirection;
        move_by(moveBy)
        
    }

    handleMove = (e) => {
        if (!this.locked) return;
        
        this.movePosition = e.clientX;
        this.difference = this.movePosition - this.lockPosition ;
        this.moveBy = this.caroudelNodeInitialLeft + this.difference ;
        
        this.carouselNode.style.transform = `translateX(${this.moveBy}px)`
    }
}

export default carouselConnect(MotionLayerFinite)