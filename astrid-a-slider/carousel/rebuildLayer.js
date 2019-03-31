import React, { Component } from 'react';
import AstridSlider from './displayLayer';
import connect from '../astridConnect';

class AstridDataLayer extends Component {
    constructor(props){
        super(props);
        this.position = 0;
        this.activeItem = 0;
        this.state = {
            position: 0,
            activeItem: 0,
        }
    }

    newPosition = () => {
        const { SETTINGS: { mode }, validItems, by, columns } = this.props;
        
        const demandedPositionToHigh = ((this.position + by) >= validItems.length - columns);
        const demandedPositionToLow = ((this.position + by) < 0);
        const demandedItemToHigh = ((this.position + by) >= validItems.length - columns);
        const demandedItemToLow = ((this.position + by) < 0);
        let newPosition;
        let activeItem;
        
        if (mode === 'finite') {
            newPosition = (demandedPositionToHigh || demandedPositionToLow) ?
                demandedPositionToHigh ? (validItems.length - columns) : 0 : (this.position + by)

            activeItem = (demandedItemToHigh || demandedItemToLow) ?
                demandedItemToHigh ? (validItems.length - 1) : 0 : (this.position + by)
        };

        if (mode === 'infinite') {
            const toHigh = (0 + ((this.position + by) - (validItems.length-1)))
            const toLow = ((validItems.length-1) - (this.position + by))
            
            newPosition = (demandedPositionToHigh || demandedPositionToLow) ?
                demandedPositionToHigh ? toHigh : toLow : (this.position + by)

            activeItem = newPosition;
            console.log(toHigh, toLow)
        }

        this.position = newPosition;
        this.activeItem = activeItem;
        console.log(this.position, this.activeItem)
        //this.setState({
        //    position: newPosition
        //})
    }

    componentDidUpdate = () => {
        //this.shouldRebuild();
    }

    render = () => {
        this.newPosition();
        return (<AstridSlider {...this.props} { ...this }/>)
    }
}

export default connect(AstridDataLayer)