import React, { Component, createRef, cloneElement } from 'react';
import connect from '../Group/AstridConnect';
import { library } from '../libraries/dataLibrary';
import { findDOMNode } from 'react-dom';
import InfiniteLayer from './InfiniteLayer';
import FiniteLayer from './FiniteLayer';

class DataLayer extends Component {
    constructor(props) {
        super(props);
        this.newAlignPosition = 0;
        if (this.props.mode === 'infinite') {
            this.FiniteInfiniteLayer = InfiniteLayer
        } else {
            this.FiniteInfiniteLayer = FiniteLayer
        }

        this.astrid_gallery = createRef();
        this.astrid_galleryWrapper = createRef();
        this.column_references = [];
        this.state = {}
        this.reactChildrenToGalleryItems();
    }

    createPosition = () => {
        const {
            isSlider,
            galleryItemsWidth,
            gallerySecondaryItemsWidth
        } = this.state;
        const { grid, inline, inline_extended, by } = this.props;

        let demandedPosition = this.newAlignPosition + by;

        let newAlignPosition = 0;
        let newActivePosition = 0;
        
        if (grid) {
            newAlignPosition = demandedPosition * 100/grid.columns
            newAlignPosition = -newAlignPosition + '%'
        }

        if (inline) {
            for (let i =0; i<demandedPosition; i++){
                newAlignPosition += galleryItemsWidth[i].width;
                newAlignPosition = -newAlignPosition + 'px'
            }
        }

        if (inline_extended) {
            for (let i =0; i<demandedPosition; i++){
                newAlignPosition += gallerySecondaryItemsWidth[i].width;
                newAlignPosition = -newAlignPosition + 'px'
            }
        }

        this.newAlignPosition = newAlignPosition;
    }

    reactChildrenToGalleryItems = () => {
        this.galleryItems = this.wrapChildrenIntoGalleryColumns();
    }

    wrapChildrenIntoGalleryColumns = () => {
        const { children, grid, inline } = this.props;

        return children.map((child, id) => {

            let wrapperStyles = {
                display: 'inline-block',
            }

            if (grid) {
                let column_width = this.getGridColumnWidth();
                wrapperStyles.width = column_width + '%';
            }

            const column_reference = createRef();
            this.column_references.push(column_reference);

            const clonedChild = cloneElement(
                child,
                { title: 'my id is: ' + id },
            )

            return (
                <div
                    key={id}
                    ref={column_reference}
                    style={wrapperStyles}
                    data-astrid_primary_idx={id}
                    data-astrid_selector={grid || inline ? 'astrid_column' : 'astrid_inline_container'}>
                    {clonedChild}
                </div>
            )
        })
    }

    getGridColumnWidth = () => {
        const { grid } = this.props;
        let { columns } = grid;
        const MIN_COLUMNS_AMOUNT = 1;
        columns = library.getLegalNumber(columns, MIN_COLUMNS_AMOUNT);
        const column_percentage_width = 100 / columns;
        return column_percentage_width;
    }

    wrapGrandchildrenIntoGalleryColumns = () => {

        const galleryWrapper = findDOMNode(this.astrid_galleryWrapper.current);
        const galleryWrapperWidth = galleryWrapper.offsetWidth;


        let itemsWidthSum = 0;
        let gallerySecondaryItemsWidth = [];
        let secondary_idx_counter = 0;

        let galleryItemsWidth = this.galleryItems.map((item, idx) => {
            const galleryNODEItem = findDOMNode(item.ref.current);
            let galleryNODEItem_astridItems = galleryNODEItem.querySelectorAll('[data-astrid_selector="astrid-item"]')
            galleryNODEItem_astridItems = library.getArrayFromNodeList(galleryNODEItem_astridItems);

            galleryNODEItem_astridItems.map((node, id) => {
                itemsWidthSum += node.offsetWidth;

                gallerySecondaryItemsWidth.push({
                    secondary_idx: secondary_idx_counter,
                    width: node.offsetWidth
                })
            })

            secondary_idx_counter += 1;

            return {
                primary_idx: idx,
                width: galleryNODEItem.offsetWidth
            }
        })

        const isSlider = itemsWidthSum > galleryWrapperWidth ? true : false;

        this.setState({
            isSlider,
            galleryItemsWidth,
            gallerySecondaryItemsWidth
        })
    }

    isSlider = () => {
        const { children, grid } = this.props;
        const { columns } = grid;

        if (grid) {
            if (children.length > columns) {
                this.setState({
                    isSlider: true,
                    galleryItemsWidth: 'grid/irrelevant'
                })
            } else {
                this.setState({
                    isSlider: false,
                    galleryItemsWidth: 'grid/irrelevant'
                })
            }
        }
    }

    isInfiniteCarouselInGroup = () => {
        const { has_infinite_child, mode } = this.props;

        if (mode === 'infinite') {
            has_infinite_child(true)
        }
    }

    render = () => {
        const { children, pixel_width, mode } = this.props;

        if (!children) {
            return null
        }

        this.createPosition();

        return (
            <div
                ref={this.astrid_galleryWrapper}
                data-astrid_selector='astrid_galleryWrapper'>
                <div
                    data-astrid_selector='astrid_gallery'
                    ref={this.astrid_gallery}
                    style={{
                        width: (pixel_width && typeof pixel_width === 'number' ? pixel_width + 'px' : '100%'),
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        transition: 'transform 300ms linear',
                        transform: `translateX(${this.newAlignPosition})`
                    }}>
                    <this.FiniteInfiniteLayer>
                        {this.galleryItems}
                    </this.FiniteInfiniteLayer>
                </div>
            </div>
        )
    }

    componentDidMount = () => {
        const { inline, inline_extended } = this.props;
        this.isInfiniteCarouselInGroup();

        if (inline || inline_extended) {
            this.wrapGrandchildrenIntoGalleryColumns();
        } else {
            this.isSlider();
        }
    }

}



export default connect(DataLayer)