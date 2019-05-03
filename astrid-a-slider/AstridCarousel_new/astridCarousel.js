import React, { Component, createRef } from 'react';
import carouselConnect from './astridConnect';
import MotionLayer from './astridLayers/itemsLayer';
import { findDOMNode } from 'react-dom';
import { library } from './library';

class DataLayer extends Component {

    constructor(props) {
        super(props);
        this.validChildren = [];
        this.sizes_available = false;
        this.carouselReference = createRef();

        this.components = [];
        this.components_IDs = [];
        this.components_widths = [];
        this.components_heights = [];

        this.isSlider = null;
        this.isGrid = null;

        this.getIsSlider();
        this.getIsGrid();
        this.getValidChildren();
        this.getInfiniteFriendlyArray();
    }

    getValidChildren = () => {
        const { children, columns } = this.props;

        if (children === null || children === undefined) {
            this.components = null;
            return;
        }

        const columnWidth = this.isGrid ? 100/columns + '%' : 'auto' ;

        const elementsDataArrays = library.getElementsArray(children, columnWidth);
        this.components = elementsDataArrays.items;
        this.components_dataIDs = elementsDataArrays.ids;
    }

    getIsSlider = () => {
        const { columns } = this.props;
        this.isSlider = library.getIsSlider(columns, this.props.children)
    }

    getIsGrid = () => {
        const { grid } = this.props;
        this.isGrid = library.getIsGrid(grid)
    }

    getInfiniteFriendlyArray = () => {
        const { columns, mode } = this.props;
        if (!this.isSlider || mode === 'finite') return;

        this.components = library.getInfiniteElementsArray(columns, this.components);
        this.components_IDs = library.getInfiniteElementsArray(columns, this.components_IDs);
    }

    render = () => {
        if (!this.components) {
            this.stopAllActions = true;
            return (
                <div>
                    Slider require array of data
                </div>
            )
        };

        return (
            <div
                ref={this.carouselReference}
                style={{
                    width: '100%',
                    overflowX: 'hidden',
                    overflowY: 'visible'
                }}>
                {this.sizes_available ?
                    <MotionLayer
                        validChildren={this.state.components}
                        to_render={this.state}
                        columns={this.props.columns}
                        grid={this.isGrid}
                        slider={this.isSlider}
                        mode={this.props.mode}
                    /> : this.components
                }
            </div>
        )
    }

    componentDidMount = () => {
        if (this.stopAllActions) return null ;

        const carousel = findDOMNode(this.carouselReference.current);
        let itemNodes = carousel.querySelectorAll('li[data-carousel-selector="carousel_item"]');
        itemNodes = library.arrayListFromArrayLikeList(itemNodes);

        itemNodes.map((node) => {
            this.components_widths.push(node.offsetWidth);
            this.components_heights.push(node.offsetHeight);
        })

        this.sizes_available = true ;

        this.setState({
            components: this.components,
            components_widths: this.components_widths,
            components_heights: this.components_heights,
            components_IDs: this.components_IDs,
        })
    }
}

export default carouselConnect(DataLayer)