import React, { Component } from 'react';
import carouselConnect from './astridConnect';
import MotionLayer from './astridLayers/itemsLayer';

import { library } from './library';

class DataLayer extends Component {

    constructor(props) {
        super(props);
        this.validChildren = [];
        this.isSlider = null;
        this.getvalidChildren();
    }

    getvalidChildren = () => {
        const { children, columns } = this.props;

        if ( children === null || children === undefined ) {
            this.validChildren = null;
            return;
        }

        this.validChildren = library.getElementsArray(children);
        this.isSlider = library.getIsSlider(columns, this.validChildren)
        this.getInfiniteFriendlyArray();
    }

    getInfiniteFriendlyArray = () => {
        const { columns, mode } = this.props;
        if (!this.isSlider || mode === 'finite') return;
        this.validChildren = library.getInfiniteElementsArray(columns, this.validChildren);
        this.validChildren = library.moveLastIndexesToStart(columns, this.validChildren)
    }

    render = () => {
        if (!this.validChildren || !this.validChildren.length) {
            return (
                <div>
                    Slider require array of data
                </div>
            )
        };

        return (
            <div style={{
                width: '100%',
                overflowX: 'hidden',
                overflowY: 'visible'
            }}>
                <MotionLayer validChildren={this.validChildren} columns={this.props.columns} grid={this.props.grid} mode={this.props.mode}/>
            </div>
        )
    }
}

export default carouselConnect(DataLayer)