import React, { Component } from 'react';
import AstridSlider from './astridSlider';

export default class AstridDataLayer extends Component {

    arrayToValidArray = () => {
        const { items, children, columns, mode } = this.props;

        items = ( items && items.length && items.length > 0) ? items : children ;
        
        if (!items || items.length < 1) return null;
    }
       
    render = () => <AstridSlider {...this.props} />
}