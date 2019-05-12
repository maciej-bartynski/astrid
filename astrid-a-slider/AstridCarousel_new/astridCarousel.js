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

        this.components = []; //react elements
        this.components_IDs = []; //identifier
        this.components_widths = []; //elem size
        this.components_heights = []; //elem size
        this.components_positions = []; //gallery position if elem active, depends on axis: top or left

        this.isSlider = null;
        this.isGrid = null;
        this.isInfinite = null;

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
        this.isSlider = library.getIsSlider(columns, this.props.children);
    }

    getIsGrid = () => {
        const { grid } = this.props;
        this.isGrid = library.getIsGrid(grid);
    }

    getInfiniteFriendlyArray = () => {
        const { columns, mode } = this.props;
        if (!this.isSlider || mode === 'finite') return;
        this.isInfinite = true;
        this.components = library.getInfiniteElementsArray(columns, this.components);
        this.components_IDs = library.getInfiniteElementsArray(columns, this.components_IDs);
    }

    render = () => {
        if (!this.components) {
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
                        carouselSizePx={this.carouselSizePx}
                    /> : this.components
                }
            </div>
        )
    }

    getCarouselItemsDOMNodes = () => {
        const { axis } = this.props;
        const offsetSize = axis === 'vertical' ? 'offsetHeight' : 'offsetWidth' ;
        const FULL_PERCENT_SIZE = 100;
        const carousel = findDOMNode(this.carouselReference.current);
        const carouselSize =  this.isGrid ? FULL_PERCENT_SIZE : carousel[offsetSize];
        this.carouselSizePx = carousel[offsetSize];
      
        const nodesList = carousel.querySelectorAll('div[data-carousel-selector="carousel_item"]');
        const nodesArray = library.arrayListFromArrayLikeList(nodesList);

        return {
            nodesArray,
            carouselSize,
        }
    }

    getCarouselTransitionData = ( nodesArray ) => {
        const { columns, axis } = this.props;
        let galleryTotalSize = 0;
        const offsetSize = axis === 'vertical' ? 'offsetHeight' : 'offsetWidth' ;
        nodesArray.map((node) => {
            const nodeOffsetSize = this.isGrid ? 100/columns : node[offsetSize]
            this.components_widths.push(node.offsetWidth);
            this.components_heights.push(node.offsetHeight);
            this.components_positions.push(galleryTotalSize);
            galleryTotalSize += nodeOffsetSize;
        }) 
        return galleryTotalSize; 
    }

    correctLastGalleryItemsPositions=( galleryTotalSize, carouselSize, nodesArray )=>{
        let minTransverseSize = 0;
        const { axis } = this.props;
        const dimensionSize = axis === 'vertical' ?  'components_widths' : 'components_heights';
        
        for (let i = nodesArray.length - 1; i >= 0; i--) {
            if (this.components_positions[i] > ( galleryTotalSize - carouselSize)) {
                minTransverseSize = this[dimensionSize][i] > minTransverseSize ? this[dimensionSize][i] : minTransverseSize ;
            } else {
                break;
            }
        }

        for (let i = nodesArray.length - 1; i >= 0; i--) {
            if (this.components_positions[i] > ( galleryTotalSize - carouselSize)) {
                this.components_positions[i] = galleryTotalSize - carouselSize;
                this[dimensionSize][i] = minTransverseSize;
            } else {
                break;
            }
        }
    }

    componentDidMount = () => {
        if (!this.components) return null;
        
        const { nodesArray, carouselSize } = this.getCarouselItemsDOMNodes();
        const galleryTotalSize = this.getCarouselTransitionData(nodesArray);
        this.correctLastGalleryItemsPositions( galleryTotalSize, carouselSize, nodesArray );
        this.sizes_available = true;

        const newState = {
            components: this.components,
            components_widths: this.components_widths,
            components_heights: this.components_heights,
            components_IDs: this.components_IDs,
            components_positions: this.components_positions,
            carouselSize,
            modifyCarouselTransverseWidth: this.modifyCarouselTransverseWidth
        }

        this.setState(newState)
    }

    modifyCarouselTransverseWidth = (size) => {
        const { axis } = this.props;
       
        const dimension = axis === 'vertical' ? 'width' : 'height' ;
        this.carouselReference.current.style[dimension] = size + 'px';
       
    }
}

export default carouselConnect(AstridCarousel)