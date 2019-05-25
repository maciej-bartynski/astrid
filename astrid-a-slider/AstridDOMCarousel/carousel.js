import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import library from './library';
import boundary from './boundary'

class AstridDOMCarousel extends Component {

    constructor(props) {
        super(props);

        const { mode: { scroll, axis, size, margin, fit_to, centering }, columns } = library.replaceDefaultProps(props.config);
        this.centering = centering;
        this.scroll = scroll;
        this.fit_to = fit_to;
        this.columns = columns;
        this.axis = axis;
        this.onMove = this.props.config.onMove;

        this.view_styles = {
            overflow: 'hidden',
            [(axis === 'vertical' ? 'height' : 'width')]: size,
            display: (axis === 'vertical' ? 'inline-block' : 'block'),
            margin,
            boxSizign: 'border-box',

        }
        this.centering_styles = {
            transform: [(axis === 'vertical' ? `translateY(${centering}px)` : `translateX(${centering}px)`)],
            overflow: 'visible',
            [(axis === 'vertical' ? 'height' : 'width')]: '100%',
            display: (axis === 'vertical' ? 'inline-block' : 'block'),
            boxSizign: 'border-box',
            transition: 'transform 300ms linear',
        }
        this.gallery_styles = {
            display: 'block',
            [(axis === 'vertical' ? 'height' : 'width')]: '100%',
            display: (axis === 'vertical' ? 'inline-block' : 'block'),
            whiteSpace: 'nowrap',
            transition: 'transform 300ms linear',
            transform: (axis === 'vertical' ? `translateY(0)` : `translateX(0)`),
            boxSizign: 'border-box',
        }

        this.position_logical = 0;
        this.position_translate = 0;
    }

    render = () => {
        const { children } = this.props;

        let moveGalleryStyle = {};

        if (this.props.by) {
            this.getPosition_gallery();
            this.getPosition_centering();
            this.getTransverseSize();
            this.onMove(this.gallery_items, this.position_logical);
        }

        return (
            <div
                data-astrid-selector='view-frame'
                style={{
                    ...this.view_styles
                }}
            >
                <div data-astrid-selector='centering-frame'
                    style={{
                        ...this.centering_styles,
                    }}
                >
                    <div data-astrid-selector='gallery-frame'
                        style={{
                            ...this.gallery_styles,
                            ...moveGalleryStyle
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        );
    }

    getPosition_centering = () => {
        let translate_centering_frame = 0;
        const offsetSize = this.axis === 'vertical' ? 'offsetHeight' : 'offsetWidth';
        const offsetBorder = this.axis === 'vertical' ? 'offsetTop' : 'offsetLeft';

        if (this.centering === true) {
            const space = this.gallery_items[this.position_logical][offsetSize];
            const frame = this.view_frame[offsetSize];
            translate_centering_frame = (frame - space) / 2;
        }

        if (this.position_translate + translate_centering_frame > 0) {
            translate_centering_frame = 0;
            for (let i = 0 ; i<=this.position_logical; i++) {
                translate_centering_frame += this.gallery_items[i][offsetBorder]
            }
        }

        const lastItem = this.gallery_items[this.gallery_items.length - 1];
        const galleryWidth = lastItem[offsetBorder] + lastItem[offsetSize];
        if (galleryWidth + this.position_translate + translate_centering_frame < this.view_frame[offsetSize]) {
            translate_centering_frame = this.view_frame[offsetSize];
            for (let i = this.position_logical; i< this.gallery_items.length; i++) {
                translate_centering_frame -= this.gallery_items[i][offsetSize]
            }
        }

        this.centering_styles.transform = this.axis === 'vertical' ? `translateY(${translate_centering_frame}px)` : `translateX(${translate_centering_frame}px)`;
    }

    getPosition_gallery = () => {
        let by = this.props.by;

        const offsetSize = this.axis === 'vertical' ? 'offsetHeight' : 'offsetWidth';

        const loop_direction_logical = Math.sign(by);
        const loop_current_item = loop_direction_logical < 0 ? loop_direction_logical : 0;
        const loop_direction_translate = loop_direction_logical * -1;

        while (this.gallery_items[this.position_logical + loop_direction_logical] && by) {
            by += loop_direction_translate;
            this.position_translate += this.gallery_items[this.position_logical + loop_current_item][offsetSize] * loop_direction_translate;
            this.position_logical += loop_direction_logical;
        };

        this.gallery_styles.transform = this.axis === 'vertical' ? `translateY(${this.position_translate}px)` : `translateX(${this.position_translate}px)`;

    }

    getTransverseSize = () => {
        if (this.fit_to === 'transverse') {
            const offsetSize = this.axis === 'vertical' ? 'offsetWidth' : 'offsetHeight';
            const viewFrameSize = this.axis === 'vertical' ? 'width' : 'height';
            this.transverseSize = this.gallery_items[this.position_logical][offsetSize];
            this.view_styles[viewFrameSize] = this.transverseSize + 'px';
        }
    }

    componentDidMount = () => {
        this.view_frame = findDOMNode(this);
        this.centering_frame = this.view_frame.querySelector('[data-astrid-selector="centering-frame"]');
        this.gallery_frame = this.view_frame.querySelector('[data-astrid-selector="gallery-frame"]');
        this.gallery_items = this.view_frame.querySelectorAll('[data-astrid-selector="gallery-item"]');
        for (let i = 0; i < this.gallery_items.length; i++) {
            this.gallery_items[i].style.display = (this.axis === 'vertical' ? 'block' : 'inline-block');
            this.gallery_items[i].style.verticalAlign = 'top';
            this.gallery_items[i].style.float = (this.axis === 'vertical' ? 'left' : '');
            this.gallery_items[i].style.clear = (this.axis === 'vertical' ? 'both' : '');
        }

        this.props.plainJsStore.getPosition = this.getPosition;
    }
}

export default boundary(AstridDOMCarousel)