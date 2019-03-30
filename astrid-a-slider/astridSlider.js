import React, { Component } from 'react';
import { AstridContext } from './astridGroup';

export default class AstridSlider extends Component {
    constructor(props){
        super(props);
        this.position = 0;
    }

    componentDidMount = () => {
        let { validItems, isSlider, columns, transition } = this.props;
        this.setMaxPosition( validItems.length - columns );
    }

    componentDidUpdate = () => {
        let { validItems, isSlider, columns, transition } = this.props;
        this.setMaxPosition( validItems.length - columns );
    }

    getControlledContent = (position, setMaxPosition, move) => {
        let { validItems, isSlider, columns, transition } = this.props;
  
        this.setMaxPosition = setMaxPosition;

        position = (position >= validItems.length - columns || position <= 0) ?
            (position >= validItems.length - columns) ? validItems.length - columns: 0 : position ;

        this.validItems = validItems.map((Item, idx)=>{
            return (
                <div 
                    key={idx}
                    style={{
                    width: `${100/columns}%`,
                    display: 'inline-block',
                }}>
                    {(typeof Item === 'function') ? <Item/> : Item }
                </div>
            )
        })

        return (
            <div style={{
                width: '100%',
                transform: `translate(${-1 * position * (100/columns)}%, 0)`,
                transition: `transform ${transition.time}ms ${transition.curve}`,
                whiteSpace: 'nowrap',
            }}>
                {this.validItems}
            </div>
        )
    }
       
    render() {
        
        return (
            <AstridContext.Consumer>
                {({ position, setMaxPosition, move }) => (
                    <div style={{
                        overflow: 'hidden',
                    }}>
                        {this.getControlledContent(position, setMaxPosition, move)}
                    </div>
                )}
            </AstridContext.Consumer>
        )
    }
}