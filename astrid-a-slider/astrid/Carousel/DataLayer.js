import React, { Component } from 'react';
import connect from '../Group/AstridConnect';
import { library } from '../libraries/dataLibrary';

class DataLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getColumnWidth = (afterRender) => {
        const { grid } = this.props;

        if (grid) {
            let { columns } = grid;
            const MIN_COLUMNS_AMOUNT = 1;
            columns = library.getLegalNumber(columns, MIN_COLUMNS_AMOUNT);
            const column_percentage_width = 100 / columns;
            return column_percentage_width;
        }

        if (!grid) {
            if (afterRender) {
                let gallery = document.querySelector('[data-astrid_selector="astrid_gallery"]')
                let galleryItems = document.querySelectorAll('[data-astrid_selector="astrid_item"]');
                galleryItems = library.getArrayFromNodeList(galleryItems);
                let galleryWidth = gallery.offsetWidth;

                let itemsWidthSum = 0;
                let galleryItemsWidth = galleryItems.map((item, idx) => {
                    itemsWidthSum += item.offsetWidth;
                    return {
                        primary_idx: idx,
                        width: item.offsetWidth
                    };
                })

                let isSlider = itemsWidthSum > galleryWidth ? true : false;

                this.setState({
                    isSlider,
                    galleryItemsWidth
                })
            }
            return 'await_for_render_and_check_item_width';
        }
    }

    wrapChildren = (afterRender) => {
        const { children } = this.props;

        return children.map((child, id) => {
            let wrapperStyles = {
                display: 'inline-block',
            }

            let column_width = this.getColumnWidth(afterRender);
            if (typeof column_width === 'number') {
                wrapperStyles.width = column_width + '%';
            }

            return (
                <div
                    key={id}
                    style={wrapperStyles}
                    data-astrid_primary_idx={id}
                    data-astrid_selector='astrid_item'>
                    {child}
                </div>
            )
        })

    }

    isSlider = () => {
        const { children, columns, grid } = this.props;
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
        const { children, pixel_width } = this.props;
console.log(this)
        if (!children) {
            return null
        }

        return (
            <div
                data-astrid_selector='astrid_gallery'
                style={{
                    width: (pixel_width && typeof pixel_width === 'number' ? pixel_width + 'px' : '100%'),
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                }}>
                {this.wrapChildren()}
            </div>
        )
    }

    componentDidMount = () => {
        const { grid } = this.props;
        const AFTER_RENDER = true;
        this.isInfiniteCarouselInGroup();
        this.isSlider();
        if (!grid) {
            this.wrapChildren(AFTER_RENDER);
        }
    }

} 
   


export default connect(DataLayer)