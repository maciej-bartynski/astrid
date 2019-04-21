import React, { Component } from 'react';
import connect from '../astridConnect';

class AstridDisplayLayer extends Component {
    getControlledContent = () => {
        let { validItems, activeItem, columns, transition, mode, position } = this.props;
       
        this.validItems = validItems.map((item, idx) => {
            const Item = item.Item;
            const keyIndex = item.keyIndex;
            const current = idx === activeItem ? true : false;
            const visible = (idx >= position && idx < position + columns) ? true : false;
            return (
                <div
                    key={'astrid-track-clipper-' + idx}
                    style={{
                        width: `${100 / columns}%`,
                        display: 'inline-block',
                    }}>

                    {(typeof Item === 'function') ? <Item current={current} visible={visible} keyIndex={keyIndex} key={idx} /> : Item}
                </div>
            )
        })

        console.log(position, columns)
        const TRASNLATE_TO = -1 * position * (100 / columns);
        
        return (
            <div
                key={'astrid-track-tracker'}
                data-astrid-selector='astrid-track-selector'
                data-astrid-position = { TRASNLATE_TO }
                style={{
                    transform: `translate(${TRASNLATE_TO}%, 0)`,
                    transition: `transform ${transition.time}ms ${transition.curve}`,
                    whiteSpace: 'nowrap',
                }}>
                {this.validItems}
            </div>

        )
    }

    render() {
        return (
            <div
                key={'astrid-track-clipper'}
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