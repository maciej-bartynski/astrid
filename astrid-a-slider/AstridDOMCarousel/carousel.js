import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import library from './library';
import boundary from './boundary';
import TouchPanel from './touchPanel';
import Initialization from './initialization';

class AstridDOMCarousel extends Component {

    constructor(props) {
        super(props);

        this.stage_initialize = true;
        this.stage_progress = false;
        this.stage_infiniteRebuild = false;
        this.initialize = new Initialization(props);
        this.view_styles = this.initialize.initialStyles.view;
        this.gallery_styles = this.initialize.initialStyles.gallery;
        this.position_logical = this.initialize.newMode.scroll === 'infinite' ? this.initialize.columns : 0;

        this.children = this.initialize.newChildren;
        this.time = this.initialize.newTransition.time;
        this.curve = this.initialize.newTransition.curve;
        this.type = this.initialize.newTransition.type;
        this.centering = this.initialize.newMode.centering;
        this.scroll = this.initialize.newMode.scroll;
        this.fitTo = this.initialize.newMode.fitTo;
        this.axis = this.initialize.newMode.axis;
        this.onMove = this.initialize.onMove;
        this.size = this.initialize.newMode.size;
        this.margin = this.initialize.newMode.margin;
        this.columns = this.initialize.columns;

        this.touchSensibility = this.initialize.touchSensibility;
        this.navigatable = this.initialize.navigatable;
        this.touch = this.initialize.touch
    }

    getChildren = () => {
        const { children } = this;
        const { stage_progress, stage_infiniteRebuild } = this;

        if (stage_infiniteRebuild) {
            return children.map((child, idx) => {
                return React.cloneElement(child, { active_position: this.position_logical, position: idx })
            })
        } else if (this.scroll !== 'infinite') {
            return children.map((child, idx) => {
                return React.cloneElement(child, { active_position: this.position_logical, position: idx })
            })
        } else {
            return this.children
        }
    }

    render = () => {
        const { stage_progress, stage_infiniteRebuild } = this;

        if (stage_progress) {
            if (this.scroll !== 'infinite') {
                this.getPosition_gallery();
                this.setPosition_gallery();
            } else {
                if (!stage_infiniteRebuild) {
                    this.getPosition_gallery();
                    this.setPosition_gallery();
                } else {
                    this.setPosition_gallery();
                }
            }
        }

        this.children = this.getChildren();

        return (
            <div
                data-astrid-selector='view-frame'
                style={{
                    ...this.view_styles
                }}
            >
                <div data-astrid-selector='gallery-frame'
                    style={{
                        ...this.gallery_styles,
                    }}
                    onClickCapture={(e) => this.handleDragEvents(e, 'handleClickCapture')}
                    onMouseDown={(e) => this.handleDragEvents(e, 'handleLock')}
                    onMouseMove={(e) => this.handleDragEvents(e, 'handleMove')}
                    onMouseUp={(e) => this.handleDragEvents(e, 'handleMouseUp')}
                    onMouseLeave={(e) => this.handleDragEvents(e, 'handleMouseOut')}
                    onTouchStart={(e) => this.handleDragEvents(e, 'handleTouchStart')}
                    onTouchMove={(e) => this.handleDragEvents(e, 'handleTouchMove')}
                    onTouchEnd={(e) => this.handleDragEvents(e, 'handleTouchEnd')}
                >
                    {this.children}
                </div>
            </div>
        );
    }

    componentDidMount = () => {
        this.finishInitializeSlider();
    }

    finishInitializeSlider = () => {
        const { axis } = this;
        this.offsetSize = axis === 'horizontal' ? 'offsetWidth' : 'offsetHeight';
        this.offsetBorder = axis === 'vertical' ? 'offsetTop' : 'offsetLeft';
        this.getNodesAndReferences();
        this.setEvents();
        this.setInitialPositions();
        this.setAnimationStyles();
        this.stage_initialize = false;
        this.stage_progress = true;
    }

    getNodesAndReferences = () => {
        this.view_frame = findDOMNode(this);
        this.gallery_frame = this.view_frame.querySelector('[data-astrid-selector="gallery-frame"]');
        this.gallery_items = library.nodeListToArray(this.view_frame.querySelectorAll('[data-astrid-selector="astrid-child"]'));
        this.lastItemReference = this.gallery_items[this.gallery_items.length - 1];
    }

    setEvents = () => {
        const { touchSensibility, axis, touch, gallery_frame, view_frame, offsetSize } = this;
        const { slide_by } = this.props;

        if (touch) {
            this.dragLibrary = new TouchPanel(gallery_frame, touchSensibility, axis, slide_by, view_frame[offsetSize])
        }
    }

    setInitialPositions = () => {
        const { axis, columns } = this;
        this.position_translate = 0;

        for (let i = 0; i < columns; i++) {
            this.position_translate -= this.gallery_items[i][this.offsetSize];
        }
        this.gallery_frame.style.transform = (axis === 'vertical' ? `translateY(${this.position_translate}px)` : `translateX(${this.position_translate}px)`);
    }

    setAnimationStyles = () => {
        this.view_styles = {
            ...this.view_styles,
            ...this.initialize.animationStyles.view
        }

        this.gallery_styles = {
            ...this.gallery_styles,
            ...this.initialize.animationStyles.gallery
        }
    }

    handleDragEvents = (e, name) => {
        if (this.dragLibrary) {
            this.dragLibrary[name](e, this.position_translate);
        }
    }

    handleTransitionEnd = () => {
        this.stage_infiniteRebuild = true;

        const head = this.children.slice(0, this.by);
        const tail = this.children.slice(this.by);
        this.children = tail.concat(head);

        const node_head = this.gallery_items.slice(0, this.by);
        const node_tail = this.gallery_items.slice(this.by);
        this.gallery_items = node_tail.concat(node_head);

        this.position_logical = this.columns;
        this.position_translate = 0;
        for (let i = 0; i < this.columns; i++) {
            this.position_translate -= this.gallery_items[i][this.offsetSize];
        }
        this.gallery_styles.transition = 'none';
        this.forceUpdate();
    }

    componentDidUpdate = () => {
        this.gallery_styles.transition = `${this.time + 'ms ' + this.curve + ' ' + this.type}`;

        if (this.type === 'fade') {
            this.gallery_frame.style.opacity = 0;
            requestAnimationFrame(() => {
                this.gallery_frame.style.transition = `${this.time}ms ${this.curve} opacity`;
                this.gallery_frame.style.opacity = 1;
                requestAnimationFrame(() => {
                    this.gallery_frame.style.transition = `${0}ms ${this.curve} opacity`;
                })
            })
        }

        if (this.scroll === 'infinite') {
            if (!this.stage_infiniteRebuild) {
                setTimeout(this.handleTransitionEnd, this.time);
            } {
                this.stage_infiniteRebuild = false;
            }
        }
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

        if (this.operationIsInitialization) {
            this.getInitialBy();
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

        if (this.scroll === 'infinite') {
            this.scrollBy_loop(this.by)
            this.position_translate = -this.gallery_items[this.position_logical][this.offsetBorder];
            console.log(this.gallery_frame.style)
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
}

export default boundary(AstridDOMCarousel)