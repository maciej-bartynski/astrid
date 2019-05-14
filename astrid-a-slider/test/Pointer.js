import React, { Component } from 'react';

export default class Pointer extends Component {
    render = () => {
        const DATA_RECEIVED_FROM_ASTRID_CAROUSEL = this.props;
        const CAROUSEL_CURRENT_INDEX = DATA_RECEIVED_FROM_ASTRID_CAROUSEL.active_position;
        const CAROUSEL_EDGE_LEFT = DATA_RECEIVED_FROM_ASTRID_CAROUSEL.left_edge;
        const CAROUSEL_EDGE_RIGHT = DATA_RECEIVED_FROM_ASTRID_CAROUSEL.right_edge;

        const { to } = this.props;

        const objectStyles = {
            width: '100%',
            height: '100%',
            padding: 5,
            textAlign: 'center',
            border: '1px white solid',
            display: 'inline-block',
            boxSizing: 'border-box',
            color: 'white',
            cursor: 'pointer',
            boxSizing: 'border-box',
        }

        objectStyles.background = (to ===  CAROUSEL_CURRENT_INDEX) ? 'gray' : 'rgba(0,0,0,0.2' ;

        return (
            <div
                style={objectStyles}
            >{to}</div>
        )
    }
}