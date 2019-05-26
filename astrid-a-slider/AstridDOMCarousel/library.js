import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

export default {
    replaceDefaultProps: function (props) { 
        const { mode, columns, onMove, lazy, lazyMode } = props;

        const defaults = {
            mode: {
                scroll: 'finite', //infinite, returnable
                axis: 'horizontal', //vertical
                size: '100%', //css
                margin: '0 auto', //css
                fit_to: 'transverse', //view, both, none
                centering: false, // center, %, px,
            },
            columns: 1,
            onMove: ()=>{},
            lazy: false,
            lazyMode: null,
        }
        
        let new_mode = (!mode || typeof mode !== 'object' ? defaults.mode : mode );
        new_mode = (!mode || typeof mode !== 'object' ? new_mode : this.validateMode(new_mode));
        let new_columns = (typeof columns === 'number' && columns > 0 ? parseInt(columns) : defaults.columns);
        let new_onMove = (typeof onMove === 'function' ? onMove : defaults.onMove);
        let new_lazy =  (lazy === true ? true : defaults.lazy);
        let new_lazyMode = (new_lazy === true && (lazyMode === 'visible' ||  lazyMode === 'pre_visible')) ? 
            lazyMode === 'visible' ? 'visible' : 'pre_visible' : defaults.lazyMode;

        return { mode: new_mode, columns: new_columns, onMove: new_onMove, lazy: new_lazy, lazyMode: new_lazyMode }
    },

    validateMode: function (mode) {
        const {
            scroll,
            axis,
            size,
            margin,
            fit_to,
            centering,
        } = mode;

        const valid_mode = {
            scroll: (scroll === 'finite' || scroll === 'infinite' || scroll === 'returnable' ? scroll : 'finite'),
            axis: (axis === 'horizontal' || axis === 'vertical' ? axis : 'horizontal'),
            size: (typeof parseInt(size) === 'number' && size !== 0 ? size : '100%'),
            margin: (!margin ? '0 auto' : margin ),
            fit_to: (fit_to === 'transverse' || fit_to === 'view' || fit_to === 'both' || fit_to === 'none' ? fit_to : 'transverse'),
            centering: (centering === true ? true : false) ,
        }

        return valid_mode;
    },
}