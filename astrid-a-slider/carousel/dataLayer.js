import React, { Component } from 'react';
import AstridSlider from './rebuildLayer';
import connect from '../astridConnect';

class AstridDataLayer extends Component {

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
        const { columns, mode } = this.props;
        const { validItems, isSlider } = this;
        if (!isSlider || mode === 'finite') return;

        let infiniteFriendlyArray = [];
        const MINIMUM_CAROUSEL_ITEMS_AMOUNT = 3 * columns;

        if (validItems.length < MINIMUM_CAROUSEL_ITEMS_AMOUNT) {
            let index = 0;
            for (let i = 0; i < MINIMUM_CAROUSEL_ITEMS_AMOUNT; i++) {
                index = index >= validItems.length ? 0 : index;
                infiniteFriendlyArray.push(validItems[index])
                index++;
            }
        }

        this.validItems = infiniteFriendlyArray;
    }

    componentDidMount = () => {
        const { validItems } = this;
        const { columns } = this.props;

        this.props.setMaxPosition(validItems.length - columns);
    }

    render = () => {
        if (!this.validItems) {
            return (
                <div>
                    Slider require array of data
                </div>
            )
        };

        return (<AstridSlider {...this.props} {...this} />)
    }
}

export default connect(AstridDataLayer)