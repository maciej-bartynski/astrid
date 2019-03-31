import React, { Component, Fragment, createContext } from 'react';
import { type } from 'os';

export let AstridContext = createContext({
    position: null,
    move: () => { }
})

export default class AstridGroup extends Component {
    constructor(props) {
        super(props);
        this.maxSliderLength = 0;
        this.state = {
            position: 0,
            maxPosition: 0,
            move: this.move,
            setMaxPosition: this.setMaxPosition,
            childrenCarousels: [],
            reportChildrenCarousel: this.reportChildrenCarousel
        }
    }

    reportChildrenCarousel = (payload) => {
        this.setState({
            childrenCarousels: payload
        })
    }

    move = (direction, by) => {
        let mathDirection = direction === 'left' ? -1 : 1;
        by = typeof by === 'number' ? Math.abs(by) : 1;
        mathDirection = mathDirection * by;
        let newPosition = ((this.state.position + mathDirection) > this.state.maxPosition) || ((this.state.position + mathDirection) < 0) ?
            ((this.state.position + mathDirection) > this.state.maxPosition) ? this.state.maxPosition : 0 : (this.state.position + mathDirection)

        this.setState({
            position: newPosition,
            direction,
            by,
        })
    }

    setMaxPosition = (payload) => {
        this.setState({
            maxPosition: payload
        })
    }

    render() {
        const { children } = this.props;
        return (
            <AstridContext.Provider value={this.state}>
                {children}
            </AstridContext.Provider>
        )
    }
}