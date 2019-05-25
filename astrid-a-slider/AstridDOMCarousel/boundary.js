import React, { Component } from 'react';
import library from './library';
import { AstridDOMBoundaryData } from './group';

export default AstridDOMCarousel => {
    return (props) => (
        <AstridDOMBoundaryData.Consumer>
            {(carouselContext)=> <AstridDOMCarousel {...props} {...carouselContext} /> }
        </AstridDOMBoundaryData.Consumer>
    )
}