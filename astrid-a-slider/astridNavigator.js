import React, { Component } from 'react';
import { AstridContext } from './astridGroup';

export default class AstridNavigator extends Component {
    render() {
        const { children, direction } = this.props;
        return (
            <AstridContext.Consumer>
                {({ move }) => (
                    <button
                        onClick={()=>move(direction)}>
                        {children}
                    </button>
                )}
            </AstridContext.Consumer>
        )
    }
}