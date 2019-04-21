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
        this.mode = this.props.mode;
        this.transition = this.props.transition;

        this.getValidItems();
        this.getIsSlider();
        this.getMode();
        this.getTransition();
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

    getMode = () => {
        const { mode } = this.props;
        const { isSlider } = this;

        this.mode = isSlider ? mode : null ;
    }

    getTransition = () => {
        const { isSlider } = this;
        const { transition } = this.props;

        const staticGallery = {
            time: null,
            curve: null,
            style: null,
            mode: null,
        }

        const validTransition = {
            time: transition.time ? transition.time : 300,
            curve: transition.curve ? transition.curve : 'linear',
            style: transition.style ? transition.style : 'translate', //or fade,
            mode: transition.mode ? transition.mode : 'absolue',
        }

        this.transition = isSlider ? validTransition : staticGallery ;
    }

    getInfiniteFriendlyArray = () => {
        const { columns, mode } = this.props;
       
        if (!this.isSlider || mode !== 'infinite') return;   

        this.validItems = library.getInfiniteElementsArray(columns, this.validItems);
        this.validItems = library.moveLastIndexesToStart(columns, this.validItems)
    }

    render = () => {
        /*const { by, move_by, children, items, SETTINGS, columns } = this.props;
        this.by = by;
        this.move_by = move_by;
        this.children = children;
        this.items = items;
        this.SETTINGS = SETTINGS;
        this.columns = columns;
        this.getValidItems();
        this.getIsSlider();
        this.getInfiniteFriendlyArray();*/

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