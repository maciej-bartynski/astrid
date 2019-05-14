import React from 'react';
import { CarouselContext } from './astridGroup';

export default WrappedComponent => {
    return (props) => (
        <CarouselContext.Consumer>
            {(carouselContext)=> <WrappedComponent {...props} {...carouselContext} /> }
        </CarouselContext.Consumer>
    )
}