import React, { Component, cloneElement, createRef } from 'react';
import carouselConnect from './../astridConnect';
import { findDOMNode } from 'react-dom';
import { library } from './../library';

class DataLayer extends Component {
    constructor(props) {
        super(props);
        this.position = this.props.mode === 'infinite' ? this.props.columns : 0;

        this.carouselReference = createRef();
    }

    renderCarouselItems = () => {
        return this.props.to_render.components.map((Child, idx) => {
            return Child;
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
        let { columns, to_render, by, to, mode } = this.props;
        const { components_positionsX } = to_render;

        if (mode === 'infinite') {
            to = library.getModifiedTo(columns, to, components_positionsX.length);
        }

        const position = typeof by !== 'boolean' ? (this.position + by) : to;
        this.position = typeof position === 'number' ? position : this.position;

        this.position = library.getValidCarouselPosition(this.position, components_positionsX.length);

        this.isOnEdge();
        let left = components_positionsX[this.position];
        return -left + 'px';
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
            transform: `translateX(${position})`
        }

        return (
            <ul
                ref={this.carouselReference}
                style={listStyle}
            >
                {this.renderCarouselItems()}
            </ul>
        )
    }

    componentDidUpdate = () => {
        const { navigators } = this.props;

        navigators.forEach((navigator) => {
            navigator.triggerSetState({
                ...this.informationForNavigators
            })
        })
    }

    componentDidMount = () => {
        const { navigators } = this.props;

        navigators.forEach((navigator) => {
            navigator.triggerSetState({
                ...this.informationForNavigators
            })
        })
    }
}

export default carouselConnect(DataLayer)