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
        this.touch = this.initialize.touch;

        this.centering = 'center' //MOCKED!
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
                    setTimeout(this.handleTransitionEnd, this.time);
                } else {
                    this.setPosition_gallery();
                    this.stage_infiniteRebuild = false;
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
        this.position_translate = 0 + this.positioning;
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
    }

    setPosition_gallery = () => {
        this.gallery_styles.transform = this.axis === 'vertical' ?
            `translateY(${this.position_translate}px)`
            : `translateX(${this.position_translate}px)`;
    }

    protectGalleryEnd = () => {
        const maxRange = -(this.gallery_items[this.max_position][this.offsetBorder] + this.gallery_items[this.max_position][this.offsetSize]) + this.view_frame[this.offsetSize];
        
        this.position_translate = this.position_translate > 0 || this.position_translate < maxRange ? 
            this.position_translate > 0 ? 0 : maxRange : this.position_translate;
    }

    findNextPosition = () => {
        this.demanded_position = this.position_logical + this.by;
        this.max_position = this.gallery_items.length - 1
        this.position_logical = (this.demanded_position > this.max_position || this.demanded_position < 0) ?
            this.demanded_position < 0 ?
                0 : this.max_position : this.demanded_position;
    }

    findNextPosition_returnable = () => {
        const incrementation = this.by > 0;
        if (this.demanded_position > this.max_position || this.demanded_position < 0) {
            this.position_logical = incrementation ?
                this.demanded_position - 1 - this.max_position : this.max_position + 1 + this.demanded_position;
        }
    }

    calculateBy = () => {
        let { to } = this.props;

        let demandedGalleryItem = null;
 
        for (let i = 0; i < this.gallery_items.length; i++) {
            const id = this.gallery_items[i].getAttribute('id');
            if (id == to) {
                demandedGalleryItem = i;
                break;
            }
        }

        this.by = demandedGalleryItem - this.position_logical;
    }

    unifyToAndBy = () => {
        const { by, to } = this.props;
        if (typeof to === 'number') {
            this.calculateBy();
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

    findNextTranslate = () => {
        this.positioning = this.centering === 'center' ?
            (this.view_frame[this.offsetSize] - this.gallery_items[this.position_logical][this.offsetSize]) / 2 :
            this.centering;

        this.position_translate = -(this.gallery_items[this.position_logical][this.offsetBorder]) + this.positioning;
    }

    getPosition_gallery = () => {
        this.unifyToAndBy();
        this.findNextPosition();
        if (this.scroll === 'returnable') {
            this.findNextPosition_returnable();
        }
        this.findNextTranslate();
        this.protectGalleryEnd();
    }
}

export default boundary(AstridDOMCarousel)