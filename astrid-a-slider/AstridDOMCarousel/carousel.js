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
            transition: {
                time,
                curve,
                type,
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

        this.time = time;
        this.curve = curve;
        this.type = type;
    }

    constructor(props) {
        super(props);
        this.operationIsInitialization = true;

        this.settingsToValidSettings(props);

        this.view_styles = {
            overflow: 'hidden',
            [(this.axis === 'vertical' ? 'height' : 'width')]: this.size,
            display: (this.axis === 'vertical' ? 'inline-block' : 'block'),
            margin: this.margin,
            boxSizign: 'border-box',
            transition: `${(this.axis === 'vertical' ? 'width' : 'height')} ${this.time + 'ms ' + this.curve}`,
        }

        this.gallery_styles = {
            [(this.axis === 'vertical' ? 'height' : 'width')]: '100%',
            display: (this.axis === 'vertical' ? 'inline-block' : 'block'),
            whiteSpace: (this.axis === 'vertical' ? '' : 'nowrap'),
            transition: `${this.time + 'ms ' + this.curve + ' ' + this.type}`,
            transform: (this.axis === 'vertical' ? `translateY(0)` : `translateX(0)`),
            boxSizign: 'border-box',
        }

        this.position_logical = 0;
        this.position_translate = 0;

        this.offsetSize = this.axis === 'horizontal' ? 'offsetWidth' : 'offsetHeight';
        this.offsetBorder = this.axis === 'vertical' ? 'offsetTop' : 'offsetLeft';
    }

    render = () => {
        const { children, quietlyReset_infinite, operationIsInitialization } = this;

        if (!quietlyReset_infinite && 
            !operationIsInitialization
        ) {
            this.getPosition_gallery();
            this.setPosition_gallery();
        } else if (!operationIsInitialization) {
            this.setPosition_gallery();
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

        if (this.operationIsInitialization) {
            this.operationIsInitialization = false;
            return;
        }

        this.quietlyReset_infinite = true;
        this.rebuildReactChildrenAndNodeArrays_infinite();
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
        if (this.scroll !== 'infinite') {
            this.operationIsInitialization = false
        }

        if (this.type === 'fade') {
            this.gallery_frame.style.transition = 'opacity 300ms linear';
            requestAnimationFrame(
                ()=>{
                    this.gallery_frame.style.opacity = 1 ;
                }
            )
            
        }

        this.gallery_styles.transition = `${this.time + 'ms ' + this.curve + ' ' + this.type}`;
    }

    rebuildReactChildrenAndNodeArrays_infinite = () => {
        const head = this.children.slice(0, this.by);
        const tail = this.children.slice(this.by);
        this.newChildren = tail.concat(head);

        const node_head = this.gallery_items.slice(0, this.by);
        const node_tail = this.gallery_items.slice(this.by);
        this.gallery_items = node_tail.concat(node_head);
    }

    setPosition_gallery = () => {
        this.gallery_styles.transform = this.axis === 'vertical' ?
            `translateY(${this.position_translate}px)`
            : `translateX(${this.position_translate}px)`;

        if (this.type === 'fade') {
            this.gallery_styles.opacity = 0;
            this.gallery_frame.style.transition = 'none 300ms linear';
        }

        this.quietlyReset_infinite = false;
    }

    finiteScroll_returnable = () => {
        const maxRightItem = this.gallery_items.length;
        const demandedItem = this.position_logical + this.by;     
        if (demandedItem >= maxRightItem || demandedItem < 0) {
            return Math.sign(this.by) > 0 ? demandedItem - maxRightItem : maxRightItem + demandedItem;
        }
        return 'no return';
    }

    finiteScroll_preventEdges = () => {
        const maxRange = this.lastItemReference[this.offsetBorder] + this.lastItemReference[this.offsetSize];
        const isOnRightEdge = this.gallery_items[this.position_logical][this.offsetBorder] > maxRange - this.view_frame[this.offsetSize]

        if (isOnRightEdge) {
            this.position_translate = -(this.lastItemReference[this.offsetBorder] + this.lastItemReference[this.offsetSize]) + this.view_frame[this.offsetSize]
        }
    }

    scrollBy_loop = () => {
        let loopFactor = this.by;
        const loop_direction_logical = Math.sign(this.by);
        const loop_direction_translate = -loop_direction_logical;
        while (this.gallery_items[this.position_logical + loop_direction_logical] && loopFactor) {
            loopFactor += loop_direction_translate;
            this.position_logical += loop_direction_logical;
        };
    }

    calculateValueOfBy = () => {
        let { to } = this.props;
        let demandedGalleryItem = null;
        this.gallery_items.forEach((item, idx) => {
            const id = item.getAttribute('id');
            if (id == to) {
                demandedGalleryItem = idx;

            }
        })
        return demandedGalleryItem - this.position_logical;
    }

    unifyToAndBy = () => {
        const { by, to } = this.props;

        if (typeof to === 'number') {
            this.by = this.calculateValueOfBy();
        } else if (typeof by === 'number') {
            this.by = by;
        } else {
            this.by = 0;
        }
    }

    getInitialBy = () => {
        if (this.scroll === 'infinite') {
            this.by = this.columns;
        } else {
            this.by = 0;
        }
    }

    getPosition_gallery = () => {
        this.unifyToAndBy();

        if (this.operationIsInitialization) {
            this.getInitialBy();
        }

        if (this.scroll === 'infinite') {
            this.scrollBy_loop(this.by)
            this.position_translate = -this.gallery_items[this.position_logical][this.offsetBorder];
        }

        if (this.scroll === 'finite') {
            this.scrollBy_loop(this.by);
            this.position_translate = -this.gallery_items[this.position_logical][this.offsetBorder];
            this.finiteScroll_preventEdges()
        }

        if (this.scroll === 'returnable') {
            const returnTo = this.finiteScroll_returnable(this.by);
            if (typeof returnTo !== 'number') {
                this.scrollBy_loop(this.by);
            } else {
                this.position_logical = returnTo;
            }
            this.position_translate = -this.gallery_items[this.position_logical][this.offsetBorder];
            this.finiteScroll_preventEdges()
        }
    }

    componentDidMount = () => {
        this.view_frame = findDOMNode(this);
        this.gallery_frame = this.view_frame.querySelector('[data-astrid-selector="gallery-frame"]');
        this.gallery_items = library.nodeListToArray(this.view_frame.querySelectorAll('[data-astrid-selector="astrid-child"]'));
        this.lastItemReference = this.gallery_items[this.gallery_items.length - 1]
        this.getPosition_gallery();
        this.setPosition_gallery();
        this.forceUpdate();
    }
}

export default boundary(AstridDOMCarousel)