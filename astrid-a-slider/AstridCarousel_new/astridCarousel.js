import React, { Component, createRef } from 'react';
import carouselConnect from './astridConnect';
import MotionLayerFinite from './astridLayers/motionLayerFinite';
import { findDOMNode } from 'react-dom';
import { library } from './library';

class AstridCarousel extends Component {

    constructor(props) {
        super(props);
        this.validChildren = [];
        this.sizes_available = false;
        this.carouselReference = createRef();

        this.components = [];
        this.components_IDs = [];
        this.components_widths = [];
        this.components_heights = [];
        this.components_positionsX = []; //if horizontal
        this.components_positionsY = []; //if vertical

        this.isSlider = null;
        this.isGrid = null;

        this.getIsSlider();
        this.getIsGrid();
        this.getValidChildren();
        this.getInfiniteFriendlyArray();
    }

    getValidChildren = () => {
        const { children, columns, axis } = this.props;

        if (children === null || children === undefined) {
            this.components = null;
            return;
        }

        const columnSize = this.isGrid ? 100 / columns + '%' : 'auto';
        const elementsDataArrays = library.getElementsArray(children, columnSize, axis);
        this.components = elementsDataArrays.items;
        this.components_IDs = elementsDataArrays.ids;
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

        const { axis } = this.props;
        const transitionDimension = axis === 'vertical' ? 'width' : 'height' ;
        const sizeDimension = axis === 'vertical' ? 'height' : 'width';

        const clipFrameStyle = {
            /*width: '100%',*/
            overflow: 'hidden',
            transition: `${transitionDimension} 300ms linear`,
            boxSizing: 'border-box'
        }

        clipFrameStyle[sizeDimension] = '100%';

        return (
            <div
                ref={this.carouselReference}
                style={clipFrameStyle}>

                {this.sizes_available ?
                    <MotionLayerFinite
                        to_render={this.state}
                        columns={this.props.columns}
                        grid={this.isGrid}
                        slider={this.isSlider}
                        mode={this.props.mode}
                        axis={this.props.axis}
                    /> : this.components
                }
            </div>
        )
    }

    componentDidMount = () => {
        if (this.stopAllActions) return null;

        const carousel = findDOMNode(this.carouselReference.current);
        const carouselWidth = carousel.offsetWidth;
        const carouselHeight = carousel.offsetHeight;
        let itemNodes = carousel.querySelectorAll('div[data-carousel-selector="carousel_item"]');
        itemNodes = library.arrayListFromArrayLikeList(itemNodes);

        let componentPositionX = 0;
        let componentPositionY = 0;
        
        itemNodes.map((node) => {
            this.components_widths.push(node.offsetWidth);
            this.components_heights.push(node.offsetHeight);
            this.components_positionsX.push(componentPositionX);
            this.components_positionsY.push(componentPositionY);
            componentPositionX += node.offsetWidth;
            componentPositionY += node.offsetHeight;
        })

        const galleryTotalWidth = componentPositionX;
        const galleryTotalHeight = componentPositionY;

        for (let i = itemNodes.length - 1; i >= 0; i--) {
            if (this.components_positionsX[i] > (galleryTotalWidth - carouselWidth)) {
                this.components_positionsX[i] = componentPositionX - carouselWidth;
            }

            if (this.components_positionsY[i] > (galleryTotalHeight - carouselHeight)) {
                this.components_positionsY[i] = componentPositionY - carouselHeight;
            }
        }

        this.sizes_available = true;

        this.setState({
            components: this.components,
            components_widths: this.components_widths,
            components_heights: this.components_heights,
            components_IDs: this.components_IDs,
            components_positionsX: this.components_positionsX,
            components_positionsY: this.components_positionsY,
            carouselWidth,
            carouselHeight,
            modifyCarouselYAxisWidth: this.modifyCarouselYAxisWidth
        })
    }

    modifyCarouselYAxisWidth = (size) => {
        const { axis } = this.props;
       
        const dimension = axis === 'vertical' ? 'width' : 'height' ;
        this.carouselReference.current.style[dimension] = size + 'px';
       
    }
}

export default carouselConnect(AstridCarousel)