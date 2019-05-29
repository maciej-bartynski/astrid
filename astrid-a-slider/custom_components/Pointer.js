import React, { Component } from 'react';

export default class Pointer extends Component {
    render = () => {
         /**
         * astrid position => current active item position
         * astrid identity => position of this item
         * 
         * background color is used to mark item as current
         */
        const { to, active_position } = this.props;

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

        objectStyles.background = (to === active_position) ? 'gray' : 'rgba(0,0,0,0.2' ;

        return (
            <div
                style={objectStyles}
            >{to}</div>
        )
    }
}