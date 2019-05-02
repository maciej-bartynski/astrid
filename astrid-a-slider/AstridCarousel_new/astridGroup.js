import React, { Component, createContext } from 'react';

export let CarouselContext = createContext({
    position: null,
    move: () => { }
})

export default class CarouselGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            by: null,
            move_by: this.move_by,

            left_edge: null,
            right_edge: null,
            isOnEdge: this.isOnEdge,
        }
    }

    move_by = (payload) => {
        if (typeof payload !== 'number') {
            payload = 0;
        }

        this.setState({
            by: payload,
        })
    }

    isOnEdge = (left_edge, right_edge) => {
        this.setState({
            left_edge,
            right_edge,
            by: 0,
        })
    }

    render() {
        const { children } = this.props;
        return (
            <CarouselContext.Provider value={this.state}>
                { children }
            </CarouselContext.Provider>
        )
    }
}