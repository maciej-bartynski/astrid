import React, { Component } from 'react';
import DragLayer from './dragLayer';
import connect from '../astridConnect';

class RebuildLayer extends Component {
    constructor(props) {
        super(props);
        this.validItems = this.props.validItems;
        this.columns = this.props.columns;
        this.position = this.props.position;
        this.activeItem = this.props.activeItem;

        this.newValidItems = this.props.validItems;

    }

    getRebuildLayer = () => {
        const { by } = this;//.props;
        const { newValidItems } = this;

        let head;
        let tail;
        if (by < 0) {
            tail = newValidItems.slice(newValidItems.length - Math.abs(by));
            head = newValidItems.slice(0, newValidItems.length - Math.abs(by));
            let validItems = tail.concat(head);
            this.newValidItems = validItems;
        } else {
            head = newValidItems.slice(0, Math.abs(by));
            tail = newValidItems.slice(Math.abs(by));
            let validItems = tail.concat(head);
            this.newValidItems = validItems;
        }
    }

    render = () => {
        this.propsToScope();
        return (
            <DragLayer
                {...this}
            />
        )
    }

    propsToScope = () => {
        const { by, move_by, children, mode, items, columns, transition, validItems, isSlider, position, activeItem } = this.props;
        this.by = by;
        this.move_by = move_by;
        this.children = children;
        this.items = items;
        this.transition = transition;
        this.columns = columns;
        this.validItems = validItems;
        this.isSlider = isSlider;
        this.position = position;
        this.activeItem = activeItem;
        this.mode = mode
    }
}

export default connect(RebuildLayer)