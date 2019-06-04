import { cloneElement } from 'react';

export default class Initialization {
    constructor(astridProps) {
        this.astridProps = astridProps.config;
        this.astridChildren = astridProps.children;
        this.replaceDefaultMode();
        this.replaceDefaultTransition();
        this.replaceDefaultChildren_dependentToValidProps();
        this.touchAndNavigationEvents();
        this.astridProps = null;
        this.astridChildren = null;

        this.initialStyles = {
            view: {
                overflow: 'hidden',
                [(this.newMode.axis === 'vertical' ? 'height' : 'width')]: this.newMode.size,
                display: (this.newMode.axis === 'vertical' ? 'inline-block' : 'block'),
                margin: this.newMode.margin,
                boxSizign: 'border-box',
            },

            gallery: {
                [(this.newMode.axis === 'vertical' ? 'height' : 'width')]: '100%',
                display: (this.newMode.axis === 'vertical' ? 'inline-block' : 'block'),
                whiteSpace: (this.newMode.axis === 'vertical' ? '' : 'nowrap'),
                boxSizign: 'border-box',
            }
        }

        this.animationStyles = {
            view_styles: {
                transition: `${(this.newMode.axis === 'vertical' ? 'width' : 'height')} ${this.newTransition.time + 'ms ' + this.newTransition.curve}`,
            },

            gallery: {
                transition: `${this.newTransition.time + 'ms ' + this.newTransition.curve + ' ' + this.newTransition.type}`,
            }
        }
    }

    touchAndNavigationEvents = () => {
        const { touch, touch_sensibility, navigatable } = this.astridProps;

        const defaultEvents = {
            touch: true,
            touch_sensibility: 3,
            navigatable: true
        }
        
        this.touch = touch === false ? touch : defaultEvents.touch;
        this.touchSensibility = typeof parseInt(touch_sensibility) === 'number' ? touch_sensibility : defaultEvents.touch_sensibility;
        this.navigatable = navigatable === false ? navigatable : defaultEvents.navigatable;
    }

    replaceDefaultMode = () => {
        const { mode } = this.astridProps;
        const { scroll, axis, size, margin, fitTo, centering } = mode;

        const defaultMode = {
            scroll: 'finite', //infinite, returnable
            axis: 'horizontal', //vertical
            size: '100%', //css
            margin: '0 auto', //css
            fit_to: 'transverse', //view, both, none
            centering: false, // center, %, px,
        }

        const newMode = ( !mode || typeof mode !== 'object' ? defaultMode : mode);

        newMode.scroll = (scroll === 'finite' || scroll === 'infinite' || scroll === 'returnable' ? scroll : defaultMode.scroll);
        newMode.axis = (axis === 'horizontal' || axis === 'vertical' ? axis : defaultMode.horizontal);
        newMode.size = (typeof parseInt(size) === 'number' && size !== 0 ? size : defaultMode.size);
        newMode.margin = (margin ? margin : defaultMode.margin);
        newMode.fitTo = (fitTo === 'transverse' || fitTo === 'view' || fitTo === 'both' || fitTo === 'none' ? fitTo : defaultMode.transverse);
        newMode.centering = (centering === true ? true : false);

        this.newMode = newMode;
    }

    replaceDefaultTransition = () => {
        const { transition } = this.astridProps;
        const { type, time, curve } = transition;

        const validCurves = [
            'linear',
            'ease-in',
            'ease-out',
            'ease-in-out'
        ]

        const defaultTransition = {
            type: 'transform',
            time: 300,
            curve: 'linear',
        }

        const newTransition = ( !transition || typeof transition !== 'object' ? defaultTransition : transition);
        
        newTransition.type = (type === 'transform' || type === 'fade' || type === 'none'? type : defaultTransition.type);
        newTransition.time = (typeof parseInt(time) === 'number' ? parseInt(time) : defaultTransition.time);
        newTransition.curve = defaultTransition.curve;

        validCurves.forEach(validCurve => {
            if (validCurve === curve) {
                newTransition.curve = curve;
            }
        })

        this.newTransition = newTransition ;
    }

    replaceDefaultChildren_dependentToValidProps = () => {
        const { scroll, axis } = this.newMode;

        if ( !scroll || !axis ) {
            this.newChildren = null ;
        }
        
        const astridChildren = this.astridChildren.map((item, idx) => {
            const astridChildProps = {
                key: idx,
                id: idx,
                ['data-astrid-selector']: "astrid-child",
                style: {
                    ...item.props.style,
                    display: 'inline-block',
                    verticalAlign: 'top',
                    float: (axis==='vertical' ? 'left' : ''),
                    clear: (axis==='vertical' ? 'both' : ''),
                }
            }
           
            return cloneElement(item, astridChildProps)
        })   
        
        if (scroll === 'infinite') {
            const columns = Math.floor( astridChildren.length / 3 );            
            const head = astridChildren.slice(0, -columns);
            const tail = astridChildren.slice(-columns);
            this.newChildren = tail.concat(head);
            this.columns = columns;
        } else {
            this.newChildren = astridChildren ;
            this.columns = null ; //irrelevant
        }
    }
}