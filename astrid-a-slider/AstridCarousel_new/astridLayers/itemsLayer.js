import React, { Component, cloneElement, createRef } from 'react';
import carouselConnect from './../astridConnect';
import { findDOMNode } from 'react-dom';
import { library } from './../library';

class DataLayer extends Component {
    constructor(props) {
        super(props);
        this.position = this.props.mode === 'infinite' ? this.props.columns : 0 ;

        this.carouselReference = createRef();
    }

    renderCarouselItems = () => {
        return this.props.to_render.components.map((child)=>{
            return child
        })
    }

    /*isOnEdge = () => {
        if (this.positionItem >= this.state.validChildren.length - 1) {
            this.positionItem = this.state.validChildren.length - 1;
            this.rightEdge = true;
        } else if (this.positionItem <= 0) {
            this.positionItem = 0;
            this.leftEdge = true;
        } else {
            this.leftEdge = false;
            this.rightEdge = false;
        }
    }*/

    getPosition = () => {
        const { grid, columns, to_render, by } = this.props;
        const { components_widths } = to_render;
        this.position = library.getValidCarouselPosition(this.position + by, components_widths.length);

        //this.isOnEdge();

        if ( !grid ) {
            let left = 0;
            for ( let i = 0; i < this.position ; i++ ){
                left += components_widths[i];
            }
            return -left + 'px';
        } else {
            return -(this.position * (100/columns)) + '%'
        }
    }

    render = () => {
        let position = this.getPosition();
        
        const listStyle = {
            width: '100%',
            display: 'block',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            whiteSpace: 'nowrap',
            transition: 'transform 300ms linear',
            transform: `translateX(${ position })`
        }

        return (
            <ul
                ref={this.carouselReference}
                style={
                    listStyle}
                onTransitionEnd = { this.transitionEndHandler }
            >
                {this.renderCarouselItems()}
            </ul>
        )
    }

    transitionEndHandler = () => {
        if (this.leftEdge || this.rightEdge ) {
            this.wasOnEdge = true;
            this.props.isOnEdge( this.leftEdge, this.rightEdge );
        } else {
            if (this.wasOnEdge) {
                this.wasOnEdge = false;
                this.props.isOnEdge( false, false );
            }
        }
    }
}

export default carouselConnect(DataLayer)