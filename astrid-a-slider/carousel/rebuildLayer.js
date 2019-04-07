import React, { Component } from 'react';
import DisplayLayer from './displayLayer';
import connect from '../astridConnect';

class RebuildLayer extends Component {

    constructor(props) {
        super(props);
        this.newValidItems = this.props.validItems;
    }

    getRebuildLayer = () => {
        const { SETTINGS: { mode }, by } = this.props;
        const { newValidItems } = this;
        if (mode !== 'infinite') return;

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
        //this.getRebuildLayer();
        
        return (
            <DisplayLayer
                {...this.props}
                //{...this.state}
            />
        )
    }
}

export default connect(RebuildLayer)