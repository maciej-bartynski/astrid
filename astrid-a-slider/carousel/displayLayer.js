import React, { Component } from 'react';
import connect from '../astridConnect';

class AstridDisplayLayer extends Component {
    getControlledContent = () => {
        let { validItems, isSlider, columns, SETTINGS: { transition, mode }, position } = this.props;

        this.validItems = validItems.map((item, idx) => {
            const Item = item.Item;
            const keyIndex = item.keyIndex;
            const current = idx === this.props.activeItem ? true : false;
            const visible = (idx >= position && idx < position + columns) ? true : false;
            return (
                <div
                    key={idx}
                    style={{
                        width: `${100 / columns}%`,
                        display: 'inline-block',
                    }}>
                    
                    {(typeof Item === 'function') ? <Item current={current} visible={visible} keyIndex={keyIndex} key={idx} /> : Item}
                </div>
            )
        })

        return (
            <div className={'astrid-track'} datatransform={`translate(${-1 * position * (100 / columns)}%,0)`}>
                <div 
                    style={{
                    transform: `translate(${-1 * position * (100 / columns)}%,0)`,
                    transition: `transform ${transition.time}ms ${transition.curve}`,
                    whiteSpace: 'nowrap',
                }}>
                    {this.validItems}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div
                style={{
                overflow: 'hidden',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {this.getControlledContent()}
            </div>
        )
    }
}

export default connect(AstridDisplayLayer)