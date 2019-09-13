import React, { Component, PureComponent, Fragment, createRef } from 'react';
import { findDOMNode } from 'react-dom';

class Carousel extends PureComponent {
    render = () => {
        const { data } = this.props;
        return (
            <div data-astrid-selector='gallery'>
                {this.props.children}
            </div>
        )
    }
}

export default Carousel;