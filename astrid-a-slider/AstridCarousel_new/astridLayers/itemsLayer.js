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

    isOnEdge = () => {
        if (this.position >= this.props.to_render.components.length - 1) {
            this.position = this.props.to_render.components.length - 1;
            this.rightEdge = true;
        } else if (this.position <= 0) {
            this.position = 0;
            this.leftEdge = true;
        } else {
            this.leftEdge = false;
            this.rightEdge = false;
        }

        this.informationForNavigators = {
            active_position: this.position,
            left_edge: this.leftEdge,
            right_edge: this.rightEdge
        }
       
    }

    getPosition = () => {
        let { grid, columns, to_render, by, to, mode } = this.props;
        const { components_widths } = to_render;
        
        
        if (mode === 'infinite') {
            to = library.getModifiedTo(columns, to, components_widths.length);
        } 

        const position = typeof by !== 'boolean' ? (this.position + by) : to ;
        this.position = typeof position === 'number' ? position : this.position;
        
        this.position = library.getValidCarouselPosition(this.position, components_widths.length);

        this.isOnEdge();

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
        const { navigators } = this.props;
       
        navigators.forEach( (navigator)=>{
            console.log('IS IT NABI? ', navigator)
            navigator.triggerSetState({
                ...this.informationForNavigators
            })
        } )

       /* if (this.leftEdge || this.rightEdge ) {
            this.wasOnEdge = true;
            this.props.isOnEdge( this.leftEdge, this.rightEdge );
        } else {
            if (this.wasOnEdge) {
                this.wasOnEdge = false;
                this.props.isOnEdge( false, false );
            }
        } */ 
    }
}

export default carouselConnect(DataLayer)