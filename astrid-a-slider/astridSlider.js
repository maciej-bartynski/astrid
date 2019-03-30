import React, { Component } from 'react';
import { AstridContext } from './astridGroup';

export default class AstridSlider extends Component {
    getControlledContent = (position) => {
        let { items, children, columns, transition } = this.props;

        items = ( items && items.length && items.length > 0) ? items : children ;
        
        if (!items || items.length < 1) return null;

        position = (position >= items.length - columns || position <= 0) ?
            (position >= items.length - columns) ? items.length - columns: 0 : position ;

        return (
            <div style={{
                width: '100%',
                transform: `translate(${-1 * position * (100/columns)}%, 0)`,
                transition: `transform ${transition.time}ms ${transition.curve}`,
                whiteSpace: 'nowrap'
            }}>
                {items.map((Item, idx)=>{
                    return (
                        <div style={{
                            width: `${100/columns}%`,
                            display: 'inline-block',
                        }}>
                            {(typeof Item === 'function') ? <Item key={idx}/> : Item }
                        </div>
                    )
                })}
            </div>
        )
    }
       
    render() {
        return (
            <AstridContext.Consumer>
                {({ position }) => (
                    <div>
                        {this.getControlledContent(position)}
                    </div>
                )}
            </AstridContext.Consumer>
        )
    }
}