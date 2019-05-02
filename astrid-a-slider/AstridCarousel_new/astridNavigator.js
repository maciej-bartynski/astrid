  
import React, { Component, cloneElement } from 'react';
import { CarouselContext } from './astridGroup';

export default class CarouselNavigator extends Component {
    render() {
        const { children, by } = this.props;
        
        return (
            <CarouselContext.Consumer>
                {({ move_by, left_edge, right_edge }) => (
                    <div
                        role='button'
                        tabIndex={0}
                        onKeyDown={()=>move_by(by)}
                        onClick={()=>move_by(by)}>
                        { cloneElement( children, { left_edge, right_edge } ) }
                    </div>
                )}
            </CarouselContext.Consumer>
        )
    }
}