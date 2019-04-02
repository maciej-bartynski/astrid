import React, { Component } from 'react';
import connect from '../astridConnect';
import PositionLayer from './positionLayer';

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
        let newItems = null;
        newItems = (items && items.length && items.length > 0 && typeof items === 'object') ? items : children;
        newItems = (newItems && newItems.length && newItems.length > 0 && typeof newItems === 'object') ? newItems : null;
        this.validItems = newItems;
    }

    getIsSlider = () => {
        const { columns } = this.props;
        this.isSlider = this.validItems.length <= columns ? false : true;
    }

    getInfiniteFriendlyArray = () => {
        const { columns, SETTINGS: { mode } } = this.props;
        const { validItems, isSlider } = this;
        if (!isSlider || mode === 'finite') return;

        let infiniteFriendlyArray = [];
        const MINIMUM_CAROUSEL_ITEMS_AMOUNT = 3 * columns;

        if (validItems.length < MINIMUM_CAROUSEL_ITEMS_AMOUNT) {
            let minSafeAmount = this.multipleSlidersFriendlyArrayLength(validItems.length, columns);
            let index = 0;
            for (let i = 0; i < minSafeAmount; i++) {
                index = index >= validItems.length ? 0 : index;
                infiniteFriendlyArray.push(validItems[index])
                index++;
            }
        } else {
            infiniteFriendlyArray = this.validItems;
        }

        this.validItems = infiniteFriendlyArray;
    }

    multipleSlidersFriendlyArrayLength(array, columns) {
        let minSafeAmount = columns * 3;
        let safeLen = array;
        while (safeLen < minSafeAmount) {
            safeLen += array
        }
        return safeLen;
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