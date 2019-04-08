import React, { Component } from 'react';
import RebuildLayer from './rebuildLayer';
import connect from '../astridConnect';

class PositionLayer extends Component {
    constructor(props) {
        super(props);
        
        this.position = this.props.SETTINGS.mode === 'infinite' ? this.props.columns : 0;
        this.activeItem = this.props.SETTINGS.mode === 'infinite' ? this.props.columns : 0;
    }

    setNewPosition = () => {
        const { SETTINGS: { mode }, by } = this.props;

        const demandedPosition = this.position + by;
        const demandedItem = this.activeItem + by;

        if (mode === 'finite') {
            this.finiteMode(demandedPosition, demandedItem)
        };

        if (mode === 'infinite') {
            this.infiniteMode(demandedPosition, demandedItem);
            this.optionalAdjustmentForInfiniteMode();
        }

        this.position = this.newPosition;
    }

    infiniteMode = (demandedPosition, demandedItem) => {
        const { validItems, columns } = this.props;
        const revertFromToHigh = demandedItem - validItems.length;
        const revertFromToLow = validItems.length + demandedItem;

        const demandedPositionToHigh = (demandedPosition >= validItems.length - columns);
        const demandedPositionToLow = (demandedPosition < 0);

        const demandedItemToHigh = (demandedItem >= validItems.length);
        const demandedItemToLow = (demandedItem < 0);

        this.newPosition = (demandedPositionToHigh || demandedPositionToLow) ?
            demandedPositionToHigh ? (validItems.length - columns) : 0 : demandedPosition

        this.activeItem = demandedItem;

        if (demandedItemToHigh) {
            this.activeItem = revertFromToHigh;
            this.newPosition = revertFromToHigh;
        } else if (demandedItemToLow) {
            this.activeItem = revertFromToLow;
            this.newPosition = (this.activeItem > validItems.length - columns) ? validItems.length - columns : this.activeItem;
        }
    }

    finiteMode = (demandedPosition, demandedItem) => {
        const { validItems, columns } = this.props;
        const demandedPositionToHigh = (demandedPosition >= validItems.length - columns);
        const demandedPositionToLow = (demandedPosition < 0);
        const demandedItemToHigh = (demandedItem >= validItems.length);
        const demandedItemToLow = (demandedItem < 0);

        const newPosition = (demandedPositionToHigh || demandedPositionToLow) ?
            demandedPositionToHigh ? (validItems.length - columns) : 0 : demandedPosition

        this.activeItem = (demandedItemToHigh || demandedItemToLow) ?
            demandedItemToHigh ? (validItems.length - 1) : 0 : demandedItem;

        this.newPosition = newPosition !== demandedItem ? this.position : newPosition;
    }

    optionalAdjustmentForInfiniteMode = () => {
        const { validItems, columns } = this.props;
        if (this.activeItem >= 0 && this.activeItem < validItems.length - columns) {
            this.newPosition = this.activeItem;
        } else {
            this.newPosition = validItems.length - columns;
        }
        
    }

    render = () => {
        this.setNewPosition();
        
        return (
            <RebuildLayer 
                {...this.props}
                {...this}
            />
        )
    }
}

export default connect(PositionLayer)