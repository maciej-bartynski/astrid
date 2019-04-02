import React, { Component } from 'react';
import connect from '../astridConnect';

class AstridDisplayLayer extends Component {
    constructor(props) {
        super(props);
        
        this.position = 0;
    }

    getControlledContent = () => {
        let { validItems, rebuildedItems, isSlider, columns, SETTINGS: { transition, mode }, position } = this.props;

        this.validItems = validItems.map((Item, idx) => {
            return (
                <div
                    key={idx}
                    style={{
                        width: `${100 / columns}%`,
                        display: 'inline-block',
                    }}>
                    { idx === this.props.activeItem ? 'current' : null }
                    {(typeof Item === 'function') ? <Item /> : Item}
                </div>
            )
        })

        return (
            <div style={{
                width: '100%',
                transform: `translate(${-1 * position * (100 / columns)}%, 0)`,
                transition: `transform ${transition.time}ms ${transition.curve}`,
                whiteSpace: 'nowrap',
            }}>
                {this.validItems}
            </div>
        )
    }

    render() {

        return (

            <div style={{
                overflow: 'hidden',
            }}>
                {this.getControlledContent()}
            </div>

        )
    }
}

export default connect(AstridDisplayLayer)