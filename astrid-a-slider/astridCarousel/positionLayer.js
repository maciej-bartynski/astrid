import React, { Component } from 'react';
import RebuildLayer from './rebuildLayer';
import connect from '../astridConnect';

class PositionLayer extends Component {
    constructor(props) {
        super(props);

        this.position = this.props.mode === 'infinite' ? this.props.columns : 0;
        this.activeItem = this.props.mode === 'infinite' ? this.props.columns : 0;
    }

    setNewPosition = () => {
        const { mode, by } = this;//.props;

        const demandedPosition = this.position + by;
        const demandedItem = this.activeItem + by;

        if (mode === 'finite') {
            this.finiteMode(demandedPosition, demandedItem)
        };

        if (mode === 'circular') {
            this.circularMode(demandedPosition, demandedItem);
            this.optionalAdjustmentForCircularMode();
        }
        
        if (mode === 'infinite') {
            this.circularMode(demandedPosition, demandedItem);
            this.optionalAdjustmentForCircularMode();
            this.reportEdge();
        };

        this.position = this.newPosition;
    }

    reportEdge = () => {
        if (this.newPosition === this.props.columns){
            console.log('LEFT EDGE');
        } else if (this.newPosition === this.props.validItems.length - this.props.columns) {
            console.log('RIGHT EDGE');
        }
    }

    circularMode = (demandedPosition, demandedItem) => {
        const { validItems, columns } = this;//.props;
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
        const { validItems, columns } = this;//.props;
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

    optionalAdjustmentForCircularMode = () => {
        const { validItems, columns } = this.props;
        if (this.activeItem >= 0 && this.activeItem < validItems.length - columns) {
            this.newPosition = this.activeItem;
        } else {
            this.newPosition = validItems.length - columns;
        }
    }

    render = () => {
        this.propsToScope();
        this.setNewPosition();
    
        return (
            <RebuildLayer
                {...this}
            />
        )
    }

    propsToScope = () => {
        const { by, move_by, children, items, columns, mode, validItems, isSlider, transition } = this.props;
        this.by = by;
        this.move_by = move_by;
        this.children = children;
        this.items = items;
        this.columns = columns;
        this.validItems = validItems;
        this.isSlider = isSlider;
        this.transition = transition;
        this.mode = mode;
    }
}

export default connect(PositionLayer)