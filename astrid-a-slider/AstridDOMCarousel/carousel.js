import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import library from './library';
import boundary from './boundary'

class AstridDOMCarousel extends Component {

    settingsToValidSettings = (props) => {
        const {
            mode: {
                scroll,
                axis,
                size,
                margin,
                fit_to,
                centering
            },
            columns,
            lazy,
            lazyMode
        } = library.replaceDefaultProps(props.config);

        this.children = library.childrenToAstridChildren(this.props.children, scroll, columns, axis)

        this.centering = centering;
        this.scroll = scroll;
        this.fit_to = fit_to;
        this.columns = columns;
        this.axis = axis;
        this.onMove = this.props.config.onMove;
        this.lazy = lazy;
        this.lazyMode = lazyMode;
        this.size = size;
        this.margin = margin;
    }

    constructor(props) {
        super(props);
        this.initialRenderChildren = true;

        this.settingsToValidSettings(props);

        this.view_styles = {
            overflow: 'hidden',
            [(this.axis === 'vertical' ? 'height' : 'width')]: this.size,
            display: (this.axis === 'vertical' ? 'inline-block' : 'block'),
            margin: this.margin,
            boxSizign: 'border-box',
            transition: `${(this.axis === 'vertical' ? 'width' : 'height')} 300ms linear`,
        }

        this.gallery_styles = {
            [(this.axis === 'vertical' ? 'height' : 'width')]: '100%',
            display: (this.axis === 'vertical' ? 'inline-block' : 'block'),
            whiteSpace: (this.axis === 'vertical' ? '' : 'nowrap'),
            transition: 'transform 300ms linear',
            transform: (this.axis === 'vertical' ? `translateY(0)` : `translateX(0)`),
            boxSizign: 'border-box',
        }

        this.position_logical = this.scroll === 'infinite' || this.scroll === 'returnable' ? this.columns : 0;
        this.position_translate = 0;

        this.offsetSize = this.axis === 'horizontal' ? 'offsetWidth' : 'offsetHeight';
        this.offsetBorder = this.axis === 'vertical' ? 'offsetTop' : 'offsetLeft';
    }

    render = () => {
        const { children } = this;
        const { restore } = this; console.log('render', this.scroll, this.position_logical)

        if (!restore && !this.initialRenderChildren) {
            this.getPosition_gallery();
        } else if (!this.initialRenderChildren) {
            this.restorePosition_gallery();
        }

        return (
            <div
                data-astrid-selector='view-frame'
                style={{
                    ...this.view_styles
                }}
                onTransitionEnd={
                    this.handleTransitionEnd
                }
            >
                <div data-astrid-selector='gallery-frame'
                    style={{
                        ...this.gallery_styles,
                    }}
                >
                    {children}
                </div>

            </div>
        );
    }

    handleTransitionEnd = () => {
        if (this.scroll !== 'infinite') {
            return;
        }

        this.restore = true;

        this.rebuildChildrenArr();
        this.children = this.newChildren;
        this.position_logical = this.columns;

        this.position_translate = 0;
        for (let i = 0; i < this.columns; i++) {
            this.position_translate -= this.gallery_items[i][this.offsetSize];
        }

        this.gallery_styles.transition = 'none';

        requestAnimationFrame(
            () => {
                this.forceUpdate();
            }
        )
    }

    componentDidUpdate = () => {
        this.gallery_styles.transition = '300ms linear transform';
    }

    rebuildChildrenArr = () => {
        this.newChildren = null;
        const head = this.children.slice(0, this.props.by);
        const tail = this.children.slice(this.props.by);
        this.newChildren = tail.concat(head);

        const node_head = this.gallery_items.slice(0, this.props.by);
        const node_tail = this.gallery_items.slice(this.props.by);
        this.gallery_items = node_tail.concat(node_head);
    }

    restorePosition_gallery = () => {
        this.gallery_styles.transform = this.axis === 'vertical' ?
            `translateY(${this.position_translate}px)`
            : `translateX(${this.position_translate}px)`;

        this.restore = false;
    }

    getPosition_gallery = () => {
        let by = this.props.by;

        const offsetSize = this.axis === 'vertical' ? 'offsetHeight' : 'offsetWidth';
        const loop_direction_logical = Math.sign(by);
        const loop_current_item = loop_direction_logical < 0 ? loop_direction_logical : 0;
        const loop_direction_translate = loop_direction_logical * -1;

        if (this.scroll === 'infinite') {
            while (this.gallery_items[this.position_logical + loop_direction_logical] && by) {
                by += loop_direction_translate;
                this.position_translate += this.gallery_items[this.position_logical + loop_current_item][offsetSize] * loop_direction_translate;
                this.position_logical += loop_direction_logical;
            };
        }

        if (this.scroll === 'finite') {

            while (this.gallery_items[this.position_logical + loop_direction_logical] && by) {
                by += loop_direction_translate;
                this.position_logical += loop_direction_logical;
            };

            this.position_translate = -this.gallery_items[this.position_logical][this.offsetBorder];

            const maxRange = this.lastItemReference[this.offsetBorder] + this.lastItemReference[this.offsetSize];
            const isOnRightEdge = this.gallery_items[this.position_logical][this.offsetBorder] > maxRange - this.view_frame[offsetSize]

            if (isOnRightEdge) {
                this.position_translate = -(this.lastItemReference[this.offsetBorder] + this.lastItemReference[this.offsetSize]) + this.view_frame[offsetSize]
            }
        }

        if (this.scroll === 'returnable') {
            const MAX = this.gallery_items.length;
            const DEMAND = this.position_logical + by;
            const goTo = Math.sign(by) > 0 ? DEMAND - MAX : MAX + DEMAND;
        
            if ( DEMAND >= MAX || DEMAND < 0 ) {
                this.position_logical = goTo ;
            } else {
                while (this.gallery_items[this.position_logical + loop_direction_logical] && by) {
                    by += loop_direction_translate;
                    this.position_logical += loop_direction_logical;
                };
            }

            this.position_translate = -this.gallery_items[this.position_logical][this.offsetBorder];
            const maxRange = this.lastItemReference[this.offsetBorder] + this.lastItemReference[this.offsetSize];
            const isOnRightEdge = this.gallery_items[this.position_logical][this.offsetBorder] > maxRange - this.view_frame[offsetSize]

            if (isOnRightEdge) {
                this.position_translate = -(this.lastItemReference[this.offsetBorder] + this.lastItemReference[this.offsetSize]) + this.view_frame[offsetSize]
            }
        }

        this.gallery_styles.transform = this.axis === 'vertical' ?
            `translateY(${this.position_translate}px)`
            : `translateX(${this.position_translate}px)`;
    }

    componentDidMount = () => {
        this.view_frame = findDOMNode(this);
        this.gallery_frame = this.view_frame.querySelector('[data-astrid-selector="gallery-frame"]');
        this.gallery_items = library.nodeListToArray(this.view_frame.querySelectorAll('[data-astrid-selector="astrid-child"]'));
        this.lastItemReference = this.gallery_items[this.gallery_items.length - 1]
        this.initialRenderChildren = false;
        this.props.go(this.position_logical);
    }
}

export default boundary(AstridDOMCarousel)