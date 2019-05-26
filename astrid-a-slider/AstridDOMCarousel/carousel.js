import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import library from './library';
import boundary from './boundary'

class AstridDOMCarousel extends Component {

    constructor(props) {
        super(props);

        const { mode: { scroll, axis, size, margin, fit_to, centering }, columns, lazy, lazyMode } = library.replaceDefaultProps(props.config);
        this.centering = centering;
        this.scroll = scroll;
        this.fit_to = fit_to;
        this.columns = columns;
        this.axis = axis;
        this.onMove = this.props.config.onMove;
        this.lazy = lazy;
        this.lazyMode = lazyMode;

        this.view_styles = {
            overflow: 'hidden',
            [(axis === 'vertical' ? 'height' : 'width')]: size,
            display: (axis === 'vertical' ? 'inline-block' : 'block'),
            margin,
            boxSizign: 'border-box',
            transition: `${(axis === 'vertical' ? 'width' : 'height')} 300ms linear`,
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
            [(axis === 'vertical' ? 'height' : 'width')]: '100%',
            display: (axis === 'vertical' ? 'inline-block' : 'block'),
            whiteSpace: 'nowrap',
            transition: 'transform 300ms linear',
            transform: (axis === 'vertical' ? `translateY(0)` : `translateX(0)`),
            boxSizign: 'border-box',
        }

        this.position_logical = 0;
        this.position_translate = 0;
        this.initialBy=0;
    }

    render = () => {
        let { by, children } = this.props;
        by = by ? by : this.initialBy;

        if (typeof this.props.by === 'number') {
            this.getPosition_gallery();
            this.getPosition_centering();
            this.mainNodeListLoop();
            this.getTransverseSize();
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
        this.translate_centering_frame = translate_centering_frame;
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

    mainNodeListLoop = () => {
        this.pre_visible_items =[];
        this.post_visible_items =[];
        this.visible_items = [];

        const offsetSize = this.axis === 'vertical' ? 'offsetHeight' : 'offsetWidth';
        const offsetBorder = this.axis === 'vertical' ? 'offsetTop' : 'offsetLeft';
        
        const framePosition = 0;
        const frameRange = this.view_frame[offsetSize];
        const framePosition_pre = -frameRange;
        const frameRange_post = 2*frameRange;

        for ( let i = this.position_logical; i < this.gallery_items.length; i++ ){
            const item = this.gallery_items[i];
            const itemPosition = this.position_translate + item[offsetBorder] + this.translate_centering_frame;
            const itemRange = itemPosition + item[offsetSize];

            if ( itemPosition < frameRange_post ){
                if ( itemRange <= frameRange ){
                    this.visible_items.push({
                        index: i,
                        status: 'visible',
                        width: item.offsetWidth,
                        height: item.offsetHeight,
                        node: this.gallery_items[i],
                        
                    })
                } else {
                    this.post_visible_items.push({
                        index: i,
                        status: 'post_visible',
                        width: item.offsetWidth,
                        height: item.offsetHeight,
                        node: this.gallery_items[i],
                    })
                }
            } else {
                break;
            }
        }

        for ( let i = this.position_logical-1; i>=0; i-- ){
            const item = this.gallery_items[i];
            const itemPosition = this.position_translate + item[offsetBorder] + this.translate_centering_frame;
            const itemRange = itemPosition + item[offsetSize];

            if ( itemRange > framePosition_pre ){
                if ( itemPosition >= framePosition ){
                    this.visible_items.push({
                        index: i,
                        status: 'visible',
                        width: item.offsetWidth,
                        height: item.offsetHeight,
                        node: this.gallery_items[i],
                        
                    })
                } else {
                    this.pre_visible_items.push({
                        index: i,
                        status: 'pre_visible',
                        width: item.offsetWidth,
                        height: item.offsetHeight,
                        node: this.gallery_items[i],
                    })
                }
            } else {
                break;
            }
        }
    }

    getTransverseSize = () => {
        let currentSize = 0;
        const size = this.axis === 'vertical' ? 'width' : 'height';
        this.visible_items.forEach((item)=>{
            if (item[size]>currentSize) {
                currentSize = item[size];
            }
        })
        this.view_styles[size] = currentSize + 'px';
    }

    astridLazyLoad = () => {
        
        const offsetSize = this.axis === 'vertical' ? 'offsetWidth' : 'offsetHeight';
        const size = this.axis === 'vertical' ? 'width' : 'height';
        const lazyChildren = this.lazyMode === 'visible' ? 
            this.visible_items : this.pre_visible_items.concat(this.visible_items.concat(this.post_visible_items));
          
        lazyChildren.forEach((item)=>{
            let images = item.node.querySelectorAll('[data-astrid-lazy="true"]');
            images = images.length !== 0 ? images : [ item.node ] ;
            
            for (let i = 0; i < images.length; i++){
                const isLazy = images[i].getAttribute('data-astrid-lazy')
                if (isLazy) {
                    images[i].removeAttribute('data-astrid-lazy')
                    const src = images[i].getAttribute('data-astrid-lazy-src');
                    images[i].removeAttribute('data-astrid-lazy-src')
                    images[i].setAttribute('src', src);

                    if (images[i].getAttribute('data-astrid-lazy-style')) {
                        const style = images[i].getAttribute('data-astrid-lazy-style');
                        images[i].removeAttribute('data-astrid-lazy-style');
                        images[i].setAttribute('style', style);
                    }
                    
                    images[i].onload = ()=> {
                        if (this.view_frame[offsetSize] < this.gallery_items[item.index][offsetSize]){
                            this.view_frame.style[size] = this.gallery_items[item.index][offsetSize] + 'px';
                        }
                    }
                }
            }
        })
        
    }

    componentDidUpdate = () => {
       
        if ( this.lazy === true ) {
            this.astridLazyLoad();
        }
        //this.onMove(this.position_logical, this.gallery_items, this.visible_items, this.pre_visible_items, this.post_visible_items, this.view_frame);
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

        this.props.go(0);
    }
}

export default boundary(AstridDOMCarousel)