import React, { Component } from 'react';
import AstridSlider from './astridSlider';

export default class AstridDataLayer extends Component {
    
    arrayToValidArray = () => {
        let { items, children, columns, mode } = this.props;
        
        items = ( items && items.length && items.length > 0) ? items : children ;
        
        if (!items || items.length < 1) { this.validItems = null; return };

        this.validItems = [];
        this.isSlider = items.length <= columns ? false : true ;
        if (!this.isSlider) { this.validItems = items; return };
        if (mode==='finite') { this.validItems = items; return };

        if (mode==='infinite'){
            const MINIMUM_CAROUSEL_ITEMS_AMOUNT = 3 * columns;
            
            if (items.length < MINIMUM_CAROUSEL_ITEMS_AMOUNT) {
                let index = 0;
                for(let i = 0; i<MINIMUM_CAROUSEL_ITEMS_AMOUNT; i++){
                    index = index >= items.length  ? 0 : index;
                    this.validItems.push(items[index])
                    index++;
                }
            }
        } 
    }
       
    render = () => {
        this.arrayToValidArray();
        
        if (!this.validItems || this.validItems.length === 0) return null;
        
        return(
            <AstridSlider {...this.props} {...this}/>
        )
    }
}