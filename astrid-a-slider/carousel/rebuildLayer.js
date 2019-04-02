import React, { Component } from 'react';
import DisplayLayer from './displayLayer';
import connect from '../astridConnect';

class RebuildLayer extends Component {
    
    getRebuildLayer = () => {
        const { SETTINGS: { mode }, validItems, by } = this.props;
        if (mode !== 'infinite') return;

        let head;
        let tail;
        if (by < 0){
            head = validItems.slice(Math.abs(by));
            tail = validItems.slice(0, Math.abs(by));

            let newValidItems = head.concat(tail);
            this.rebuildedItems = newValidItems;
        } else {
            head = validItems.slice(validItems.length - by);
            tail = validItems.slice(0, validItems.length - by);

            let newValidItems = tail.concat(head);
            this.rebuildedItems = newValidItems;
        }

        console.log(this.rebuildedItems)

    }

    render = () => {
        this.getRebuildLayer();
        
        return (
            <DisplayLayer 
                {...this.props}
                {...this.state}
            />
        )
    }
}

export default connect(RebuildLayer)