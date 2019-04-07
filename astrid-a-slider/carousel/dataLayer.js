import React, { Component } from 'react';
import connect from '../astridConnect';
import PositionLayer from './positionLayer';
import {
    library
} from './library';

class DataLayer extends Component {

    constructor(props) {
        super(props);
        this.validItems = [];
        this.isSlider = null;
        this.getValidItems();
        this.getIsSlider();
        this.getInfiniteFriendlyArray();
    }

    getValidItems = () => {
        const { items, children } = this.props;
        this.validItems = library.getUnifiedElementsArray(items, children);
    }

    getIsSlider = () => {
        const { columns } = this.props;
        this.isSlider = library.getIsSlider(columns, this.validItems)
    }

    getInfiniteFriendlyArray = () => {
        const { columns, SETTINGS: { mode } } = this.props;
      
        if (!this.isSlider || mode === 'finite') return;
        this.validItems = library.getInfiniteElementsArray(columns, this.validItems);
        this.validItems = library.moveLastIndexesToStart(columns, this.validItems)
    }

    render = () => {
        if (!this.validItems || !this.validItems.length) {
            return (
                <div>
                    Slider require array of data
                </div>
            )
        };

        return (
            <PositionLayer
                {...this.props}
                {...this}
            />
        )
    }
}

export default connect(DataLayer)