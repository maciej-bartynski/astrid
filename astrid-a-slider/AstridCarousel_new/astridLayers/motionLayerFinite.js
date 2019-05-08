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
        if (this.position >= this.props.to_render.components.length - 1) {
            this.position = this.props.to_render.components.length - 1;
            this.rightEdge = true;
        } else {
            this.rightEdge = false;
        }

        if (this.position <= 0) {
            this.position = 0;
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
        const { components_positionsX, components_positionsY } = to_render;

        if (mode === 'infinite') {
            to = library.getModifiedTo(columns, to, components_positionsX.length);
        }

        const position = typeof by !== 'boolean' ? (this.position + by) : to;
        this.position = typeof position === 'number' ? position : this.position;

        this.position = library.getValidCarouselPosition(this.position, components_positionsX.length);

        this.isOnEdge();
        this.carouselYAxisWidth();

        const TRANSITION_UNIT = this.props.grid ? '%' : 'px';

        if (axis === 'vertical') {
            let top = components_positionsY[this.position];
            return -top + TRANSITION_UNIT;
        }

        let left = components_positionsX[this.position];
        return -left + TRANSITION_UNIT;
    }

    carouselYAxisWidth = () => {
        let { columns, to_render, by, to, mode, grid, axis } = this.props;
        if (grid) return;
        const { components,
            components_widths,
            components_heights,
            components_IDs,
            components_positionsX,
            components_positionsY,
            carouselWidth,
            carouselHeight,
            modifyCarouselYAxisWidth } = to_render;

        const componentsSizes = axis === 'vertical' ? components_widths : components_heights ;
        const componentsPositions = axis === 'vertical' ? components_positionsY : components_positionsX ;
        const carouselSize = axis === 'vertical' ? carouselHeight : carouselWidth ;

        let carouselYAxisWidth = componentsSizes[this.position];
        const LENGTH = components.length;

        const thisLeft = componentsPositions[this.position];

        for (let i = this.position; i < LENGTH; i++) {
            
            const nextLeft = componentsPositions[i + 1];
            const nextLeft_rightEdge = componentsPositions[i + 2];

            if (nextLeft_rightEdge - thisLeft <= carouselSize) { //jeśli następny mieści się w wizjerze
                
                if ( componentsSizes[i + 1] > carouselYAxisWidth ) {
                    carouselYAxisWidth = componentsSizes[i + 1];
                    
                }
            } else if ( (carouselSize/columns)*(columns-1) >= nextLeft - thisLeft ) { //następny zajmuje choć szerokość 1 kolumny
                if ( componentsSizes[i + 1] > carouselYAxisWidth ) {
                    carouselYAxisWidth = componentsSizes[i + 1];
                    
                }
            } else {
                break;
            }
        }

        /*let carouselYAxisWidth = components_heights[this.position];
        const LENGTH = components.length;

        for (let i = this.position; i < LENGTH; i++) {
            const thisLeft = components_positionsX[i];
            const nextLeft = components_positionsX[i + 1];
            const nextLeft_rightEdge = components_positionsX[i + 2];

            if (nextLeft_rightEdge - thisLeft <= carouselWidth) { //jeśli następny mieści się w wizjerze
                if ( components_heights[i + 1] > carouselYAxisWidth ) {
                    carouselYAxisWidth = components_heights[i + 1];
                }
            } else if ( (carouselWidth/columns)*(columns-1) >= nextLeft - thisLeft ) { //następny zajmuje choć szerokość 1 kolumny
                if ( components_heights[i + 1] > carouselYAxisWidth ) {
                    carouselYAxisWidth = components_heights[i + 1];
                }
            } else {
                break;
            }
        } */

        modifyCarouselYAxisWidth(carouselYAxisWidth)
    }

    render = () => {
        const position = this.getPosition();

        const translate = ( this.props.axis === 'vertical' ) ? 
            `translateY(${position})` : `translateX(${position})`;

        const dimension = ( this.props.axis === 'vertical' ) ? 
            'height' : 'width';

        const listStyle = {
            /*width: '100%',*/
            display: 'block',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            whiteSpace: 'nowrap',
            transition: 'transform 300ms linear',
            transform: translate,
            boxSizing: 'border-box'
        }

        listStyle[dimension] = '100%';

        return (
            <div
                ref={this.carouselReference}
                style={listStyle}
            >
                {this.renderCarouselItems()}
            </div>
        )
    }

    componentDidUpdate = () => {
        const { navigators } = this.props;
        if (!navigators) return;
        navigators.forEach((navigator) => {
            navigator.triggerSetState({
                ...this.informationForNavigators
            })
        })
    }

    componentDidMount = () => {
        const { navigators } = this.props;
        if (!navigators) return;
        navigators.forEach((navigator) => {
            navigator.triggerSetState({
                ...this.informationForNavigators
            })
        })
    }
}

export default carouselConnect(MotionLayerFinite)