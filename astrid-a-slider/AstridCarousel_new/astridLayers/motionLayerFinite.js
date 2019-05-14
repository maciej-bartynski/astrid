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
        
        return this.props.to_render.galleryItems.map((Child, idx) => {
            return cloneElement(
                Child, { astrid_position: this.position, key: idx }
            )
        })
    }

    isOnEdge = () => {
        const MAX_POSITION = this.props.to_render.galleryItems.length - 1;
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
        const { galleryItems_positions, galleryItems } = to_render;

        if (mode === 'infinite') {
            to = library.getModifiedTo(columns, to, galleryItems_positions.length);
        }

        const position = typeof by !== 'boolean' ? (this.position + by) : to;
        this.position = typeof position === 'number' ? position : this.position;
        this.position = library.getValidCarouselPosition(this.position, galleryItems.length);
      
        this.isOnEdge();
        this.carouselTransverseAxisWidth();

        const TRANSITION_UNIT = this.props.grid ? '%' : 'px';
        this.transitionPosition = -galleryItems_positions[this.position] + TRANSITION_UNIT;
       
        return this.transitionPosition;
    }

    carouselTransverseAxisWidth = () => {
        let { columns, to_render, grid, axis } = this.props;
        if ( grid ) return;
        const {
            galleryItems,
            galleryItems_widths,
            galleryItems_heights,
            galleryItems_positions,
            carouselSize,
            modifyCarouselTransverseWidth,
        } = to_render;

        const galleryItemsSizes = axis === 'vertical' ? galleryItems_widths : galleryItems_heights ;
        let currentMinimalTransverseAxisWidth = galleryItemsSizes[this.position];
        const carousel_items_max_iterator = galleryItems.length - 1 ;
        const carousel_items_min_iterator = this.position ;
        const currentCssPosition = galleryItems_positions[this.position];

        for (let i = carousel_items_min_iterator; i <= carousel_items_max_iterator; i++) {
            const next_item_css_position = galleryItems_positions[i + 1];
            const next_item_span_position = galleryItems_positions[i + 2];
            const next_item_transverse_size = galleryItemsSizes[i + 1];

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
        const { sizes_checked } = this.props;
        const position = sizes_checked ? this.getPosition() : this.position ;
       
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
                onMouseUp ={(e)=>{this.handleMouseUp(e)}}
                onMouseLeave ={(e)=>{this.handleMouseUp(e)}}
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
        this.carouselNode = findDOMNode(this.carouselReference.current) ;
        this.minDraggingDistance = 100;

   
    }

    handleLock = (e) => {
        this.carouselNode.style.transition = 'none';
        e.stopPropagation() ; 
        e.preventDefault() ;
        this.locked = true;
        const { axis } = this.props;
        this.lockPosition = axis === 'vertical' ? e.clientY : e.clientX;
    }

    backToCurrentCssLeftWithoutTriggeringLogic = () => {
        const { axis } = this.props;
        const translate = axis === 'vertical' ? `translateY(${this.transitionPosition})` : `translateX(${this.transitionPosition})` ;
        this.carouselNode.style.transform = translate;
        this.locked = false;
    }

    convertPixelsToColumns = (columnWidthPx) => {
        const distanceColumns = this.distancePx / columnWidthPx;
        const distanceInteger = Math.round(distanceColumns);
        const distanceNonZeroInteger = distanceInteger === 0 ? 1 : distanceInteger ;
        
        return distanceNonZeroInteger ;
    }

    handleLose = () => {
        this.carouselNode.style.transition = '300ms linear transform';
        this.differencePx = this.losePosition - this.lockPosition ;
        this.distancePx = Math.abs(this.differencePx );

        const { move_by, columns, carouselSizePx } = this.props;

        const columnWidthPx = carouselSizePx / columns ;
        const isShifted = this.distancePx > this.minDraggingDistance;
        
        if (!isShifted) {
            this.backToCurrentCssLeftWithoutTriggeringLogic();
            return;
        };

        const distanceColumns = this.convertPixelsToColumns(columnWidthPx);
        const shiftDirection = Math.sign(this.differencePx);
        const moveBy = distanceColumns * -shiftDirection;
        
        this.locked = false;
        move_by(moveBy)
    }

    handleMouseUp = (e) => {
        if (!this.locked) return;
        e.stopPropagation() ; 
        e.preventDefault() ;
        this.handleLose();
    }

    handleMouseOut = (e) => {
        if (!this.locked) return;
        e.stopPropagation() ; 
        e.preventDefault() ;
        this.handleLose();
    }

    moveByPxOrPercent = ( difference) => {
        const { carouselSizePx, grid } = this.props;

        if (!grid) {
            return (parseFloat(this.transitionPosition) + difference) + 'px';
        }

        const differencePercent = (difference / carouselSizePx) * 100 ;
        return (parseFloat(this.transitionPosition) + differencePercent) + '%';
    }

    handleMove = (e) => {
        e.stopPropagation() ; 
        e.preventDefault() ;
        if (!this.locked) return;

        const { axis } = this.props;
        this.losePosition = axis === 'vertical' ? e.clientY : e.clientX;
        
        const movePosition = axis === 'vertical' ? e.clientY : e.clientX;
        const difference = movePosition - this.lockPosition ;
        const moveBy = this.moveByPxOrPercent(difference) ;
        
        this.carouselNode.style.transform = axis === 'vertical' ? `translateY(${moveBy})` : `translateX(${moveBy})` ;
    }
}

export default carouselConnect(MotionLayerFinite)