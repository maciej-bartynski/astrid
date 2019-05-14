import React, { Component, createRef } from 'react';
import carouselConnect from './astridConnect';
import MotionLayerFinite from './astridLayers/motionLayerFinite';
import { findDOMNode } from 'react-dom';
import { library } from './library';

class AstridCarousel extends Component {

    constructor(props) {
        super(props);

        this.sizes_available = false;
        this.carouselReference = createRef();

        this.isSlider = null;
        this.isGrid = null;
        this.isInfinite = null;
        this.getIsSlider();
        this.getIsGrid();
        //this.getInfiniteFriendlyArray();

        this.state = {
            galleryItems: this.getValidChildren(), //react elements
            galleryItems_widths: [], //elem sizes
            galleryItems_heights: [], //elem sizes
            galleryItems_positions: [], //gallery position if elem active, depends on axis: top or left
        }
    }

    getValidChildren = () => {
        const { children, columns, axis } = this.props;

        if (children === null || children === undefined) {
            return null;
        }

        const columnSize = this.isGrid ? 100 / columns + '%' : 'auto';
        const elementsDataArrays = library.getElementsArray(children, columnSize, axis);
        return elementsDataArrays;
    }

    getIsSlider = () => {
        const { columns } = this.props;
        this.isSlider = library.getIsSlider(columns, this.props.children);
    }

    getIsGrid = () => {
        const { grid } = this.props;
        this.isGrid = library.getIsGrid(grid);
    }

    //getInfiniteFriendlyArray = () => {
    //    const { columns, mode } = this.props;
    //    if (!this.isSlider || mode === 'finite') return;
    //    this.isInfinite = true;
    //    this.components = library.getInfiniteElementsArray(columns, this.components);
    //    this.components_IDs = library.getInfiniteElementsArray(columns, this.components_IDs);
    //}

    render = () => {
        if (!this.state.galleryItems) {
            return (
                <div>
                    Slider require array of data
                </div>
            )
        };
       
        const { axis } = this.props;
        const transitionDimension = axis === 'vertical' ? 'width' : 'height';
        const sizeDimension = axis === 'vertical' ? 'height' : 'width';

        const clipFrameStyle = {
            overflow: 'hidden',
            transition: `${transitionDimension} 300ms linear`,
            boxSizing: 'border-box'
        }

        clipFrameStyle[sizeDimension] = '100%';

        return (
            <div
                ref={this.carouselReference}
                style={clipFrameStyle}>
                <MotionLayerFinite
                    sizes_checked={ this.sizes_available ? true : false }
                    to_render={this.state}
                    columns={this.props.columns}
                    grid={this.isGrid}
                    slider={this.isSlider}
                    mode={this.props.mode}
                    axis={this.props.axis}
                    carouselSizePx={this.carouselSizePx}
                />
            </div>
        )
    }

    getCarouselItemsDOMNodes = () => {
        const { axis } = this.props;
        const offsetSize = axis === 'vertical' ? 'offsetHeight' : 'offsetWidth';
        const FULL_PERCENT_SIZE = 100;
        const carousel = findDOMNode(this.carouselReference.current);
        const carouselSize = this.isGrid ? FULL_PERCENT_SIZE : carousel[offsetSize];
        this.carouselSizePx = carousel[offsetSize];

        const nodesList = carousel.querySelectorAll('div[data-carousel-selector="carousel_item"]');
       
        const nodesArray = library.arrayListFromArrayLikeList(nodesList);
       
        return {
            nodesArray,
            carouselSize,
        }
    }

    getCarouselTransitionData = (nodesArray) => {
        const { columns, axis } = this.props;
        let galleryTotalSize = 0;
        const offsetSize = axis === 'vertical' ? 'offsetHeight' : 'offsetWidth';
        
        this.galleryItems_widths = [];
        this.galleryItems_heights = [];
        this.galleryItems_positions = [];

        nodesArray.map((node) => {
            const nodeOffsetSize = this.isGrid ? 100 / columns : node[offsetSize]
            this.galleryItems_widths.push(node.offsetWidth);
            this.galleryItems_heights.push(node.offsetHeight);
            this.galleryItems_positions.push(galleryTotalSize);
            galleryTotalSize += nodeOffsetSize;
        })

        return galleryTotalSize;
    }

    correctLastGalleryItemsPositions = (galleryTotalSize, carouselSize, nodesArray) => {
        let minTransverseSize = 0;
        const { axis } = this.props;
        const dimensionSize = axis === 'vertical' ? 'galleryItems_widths' : 'galleryItems_heights';

        for (let i = nodesArray.length - 1; i >= 0; i--) {
            if (this.galleryItems_positions[i] > (galleryTotalSize - carouselSize)) {
                minTransverseSize = this[dimensionSize][i] > minTransverseSize ? this[dimensionSize][i] : minTransverseSize;
            } else {
                break;
            }
        }

        for (let i = nodesArray.length - 1; i >= 0; i--) {
            if (this.galleryItems_positions[i] > (galleryTotalSize - carouselSize)) {
                this.galleryItems_positions[i] = galleryTotalSize - carouselSize;
                this[dimensionSize][i] = minTransverseSize;
            } else {
                break;
            }
        }
    }

    componentDidMount = () => {
        if (!this.state.galleryItems) return null;

        const { nodesArray, carouselSize } = this.getCarouselItemsDOMNodes();
      
        const galleryTotalSize = this.getCarouselTransitionData(nodesArray);
        this.correctLastGalleryItemsPositions(galleryTotalSize, carouselSize, nodesArray);
        this.sizes_available = true;

        const newState = {
            galleryItems: this.state.galleryItems,
            galleryItems_widths: this.galleryItems_widths,
            galleryItems_heights: this.galleryItems_heights,
            galleryItems_positions: this.galleryItems_positions,
            carouselSize,
            modifyCarouselTransverseWidth: this.modifyCarouselTransverseWidth
        }

        this.setState(newState)
    }

    modifyCarouselTransverseWidth = (size) => {
        const { axis } = this.props;

        const dimension = axis === 'vertical' ? 'width' : 'height';
        this.carouselReference.current.style[dimension] = size + 'px';

    }
}

export default carouselConnect(AstridCarousel)