import React, { Component, cloneElement, createRef } from 'react';
import carouselConnect from './../astridConnect';
import { findDOMNode } from 'react-dom';
import { library } from './../library';

class MotionLayerFinite extends Component {
    constructor(props) {
        super(props);
        this.TRANSITION_UNIT = this.props.grid ? '%' : 'px';
        this.position = this.props.mode === 'infinite' ? this.props.columns : 0;

        this.carouselReference = createRef();
    }

    renderCarouselItems = () => {

        return this.props.to_render.galleryItems.map((Child, idx) => {
            return cloneElement(
                Child, { astrid_position: this.position, key: idx }
            )
        })
    }

    isOnEdge = () => {
        const MAX_POSITION = this.props.to_render.galleryItems.length - 1;
        const MIN_POSITION = 0;
        if (this.position >= MAX_POSITION) {
            this.position = MAX_POSITION;
            this.rightEdge = true;
        } else {
            this.rightEdge = false;
        }

        if (this.position <= MIN_POSITION) {
            this.position = MIN_POSITION;
            this.leftEdge = true;
        } else {
            this.leftEdge = false;
        }

        this.informationForNavigators = {
            active_position: this.position,
            left_edge: this.leftEdge,
            right_edge: this.rightEdge
        }
    }

    getPosition = () => {
        let { columns, to_render, by, to, mode } = this.props;
        const { galleryItems_positions, galleryItems } = to_render;

        if (mode === 'infinite') {
            to = library.getModifiedTo(columns, to, galleryItems_positions.length);
        }

        if (typeof to === 'boolean' && typeof by === 'number') {
            this.position += by;

        } else if (typeof by === 'boolean' && typeof to === 'number') {
            this.position = to;

        }
        this.position = library.getValidCarouselPosition(this.position, galleryItems.length);

        this.isOnEdge();
        this.carouselTransverseAxisWidth();

        const transitionPosition = -galleryItems_positions[this.position] + this.TRANSITION_UNIT;

        if (this.transitionPosition === transitionPosition) {
            /** react not rerender DOM if styles not changed */
            this.backToCurrentCssLeftWithoutTriggeringLogic();
        }

        this.transitionPosition = transitionPosition;

        return transitionPosition;
    }

    carouselTransverseAxisWidth = () => {
        let { columns, to_render, grid, axis } = this.props;
        if (grid) return;
        const {
            galleryItems,
            galleryItems_widths,
            galleryItems_heights,
            galleryItems_positions,
            carouselSize,
            modifyCarouselTransverseWidth,
        } = to_render;

        const galleryItemsSizes = axis === 'vertical' ? galleryItems_widths : galleryItems_heights;
        let currentMinimalTransverseAxisWidth = galleryItemsSizes[this.position];
        const carousel_items_max_iterator = galleryItems.length - 1;
        const carousel_items_min_iterator = this.position;
        const currentCssPosition = galleryItems_positions[this.position];

        for (let i = carousel_items_min_iterator; i <= carousel_items_max_iterator; i++) {
            const next_item_css_position = galleryItems_positions[i + 1];
            const next_item_span_position = galleryItems_positions[i + 2];
            const next_item_transverse_size = galleryItemsSizes[i + 1];

            if (next_item_span_position - currentCssPosition <= carouselSize) { //jeśli następny mieści się w wizjerze
                if (next_item_transverse_size > currentMinimalTransverseAxisWidth) {
                    currentMinimalTransverseAxisWidth = next_item_transverse_size;
                }
            } else if ((carouselSize / columns) * (columns - 1) >= next_item_css_position - currentCssPosition) { //następny zajmuje choć szerokość 1 kolumny
                if (next_item_transverse_size > currentMinimalTransverseAxisWidth) {
                    currentMinimalTransverseAxisWidth = next_item_transverse_size;
                }
            } else {
                break;
            }

        }

        modifyCarouselTransverseWidth(currentMinimalTransverseAxisWidth)
    }

    render = () => {
        const { sizes_checked } = this.props;
        let cssPosition = sizes_checked ? this.getPosition() : this.position;

        const translate = (this.props.axis === 'vertical') ?
            `translateY(${cssPosition})` : `translateX(${cssPosition})`;

        const dimension = (this.props.axis === 'vertical') ?
            'height' : 'width';

        const listStyle = {
            display: 'block',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            whiteSpace: 'nowrap',
            transition: 'transform 300ms linear',
            transform: translate,
        }

        listStyle[dimension] = '100%';

        return (
            <div
                ref={this.carouselReference}
                style={listStyle}
                onClickCapture={this.handleClickCapture}
                onMouseDown={this.handleLock}
                onMouseMove={this.handleMove}
                onMouseUp={this.handleMouseUp}
                onMouseLeave={this.handleMouseOut}
            >
                {this.renderCarouselItems()}
            </div>
        )
    }

    tellNavigatorsIfOnEdge = () => {
        const { navigators } = this.props;
        if (!navigators) return;
        navigators.forEach((navigator) => {
            navigator.triggerSetState({
                ...this.informationForNavigators
            })
        })
    }

    componentDidUpdate = () => {
        /** set variable needed for dragging */
        this.columnWidthPx = this.columnWidthPx ? this.columnWidthPx : this.props.carouselSizePx / this.props.columns;

        this.tellNavigatorsIfOnEdge();
    }

    componentDidMount = () => {

        this.tellNavigatorsIfOnEdge();

        this.carouselNode = findDOMNode(this.carouselReference.current);

        this.minDraggingDistance = 100;
    }

    backToCurrentCssLeftWithoutTriggeringLogic = () => {
        const { axis } = this.props;
        const translate = axis === 'vertical' ? `translateY(${this.transitionPosition})` : `translateX(${this.transitionPosition})`;
        this.carouselNode.style.transform = translate;
        this.locked = false;
    }

    /**
     * DRAGGING GRID (BY %) OR NOGRID (BY PX) GALLERY
     */

    formatShiftDifferenceToPxOrPercent = (difference) => {
        const { carouselSizePx, grid } = this.props;

        if (!grid) {
            return (parseFloat(this.transitionPosition) + difference) + 'px';
        }

        const differencePercent = (difference / carouselSizePx) * 100;
        return (parseFloat(this.transitionPosition) + differencePercent) + '%';
    }

    /**
     * MOUSE EVENTS
     */

    handleLock = (e) => {
        e.stopPropagation();
        e.preventDefault();

        /** will be dragged */
        this.carouselNode.style.transition = 'none';

        /** if locked, mouseMove is dragging */
        this.locked = true;

        /** check start position */
        const { axis } = this.props;
        this.lockPosition = axis === 'vertical' ? e.clientY : e.clientX;
    }

    handleMove = (e) => {
        e.stopPropagation();
        e.preventDefault();

        /** if gallery is not being dragged, return */
        if (!this.locked) return;

        const { axis } = this.props;

        /** potential stop position if drag is finished now */
        const losePosition = axis === 'vertical' ? e.clientY : e.clientX;

        /** by now is moved by some px or % */
        this.differencePx = losePosition - this.lockPosition;
        const finalMoveBy = this.formatShiftDifferenceToPxOrPercent(this.differencePx);

        /** drag DOM node */
        this.carouselNode.style.transform = axis === 'vertical' ? `translateY(${finalMoveBy})` : `translateX(${finalMoveBy})`;
    }

    handleMouseUp = (e) => {

        /** if gallery was not being dragged, return */
        if (!this.locked) return;

        e.stopPropagation();
        e.preventDefault();

        this.handleLose();
    }

    handleMouseOut = (e) => {

        /** if gallery was being dragged, stop dragging */
        this.handleMouseUp(e);

        /** disable drag on mouse move */
        this.locked = false;
    }


    handleLose = () => {

        /** restore transition disabled during dragging */
        this.carouselNode.style.transition = '300ms linear transform';

        const { move_by } = this.props;

        /** if abs distance < 100, return to start position */
        const isShifted = ((this.differencePx < -this.minDraggingDistance) || (this.differencePx > this.minDraggingDistance));
        if (!isShifted) {
            this.backToCurrentCssLeftWithoutTriggeringLogic();
            return;
        };

        /** format px distance to columns distance */
        let distanceColumns = Math.round(this.differencePx / this.columnWidthPx);
        /** it is shifted for sure (more than 100px), so do not return zero */
        if (distanceColumns === 0) {
            distanceColumns = Math.sign(this.differencePx / this.columnWidthPx)
        }

        /** revert int to -int to prevent transition direction */
        move_by(-distanceColumns)
    }

    handleClickCapture = (e) => {

        /** if clicked and dragged */
        if (this.locked) {

            /** unclick on drag stop */
            this.locked = false;

            /** prevent items clicking immediately after stop dragging */
            e.stopPropagation();
        }
    }
}

export default carouselConnect(MotionLayerFinite)