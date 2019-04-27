import React, { Component } from 'react';
import { AstridContext } from '../Group/AstridGroup';

export default class AstridNavigator extends Component {
    render() {
        const { children, by, to } = this.props;
        return (
            <AstridContext.Consumer>
                {({ move_by }) => (
                    <button
                        onClick={()=>move_by(by, to)}>
                        {children}
                    </button>
                )}
            </AstridContext.Consumer>
        )
    }
}