import React, { Component, createContext } from 'react';

export let CarouselContext = createContext({
    position: null,
    move: () => { }
})

export default class CarouselGroup extends Component {
    constructor(props) {
        super(props);
        this.maxPositions=[];

        this.state = {
            by: null,
            to: null,
            move_to: this.move_to,
            move_by: this.move_by,

            left_edge: null,
            right_edge: null,
            isOnEdge: this.isOnEdge,
        }
    }

    move_to = (to) => {
        if (typeof to !== 'number') {
            to = this.state.position;
        }

        this.setState({
           to
        })
    }

    move_by = (by) => {
        if (typeof by !== 'number') {
            by = 0;
        }
        
        this.setState({
            by
        })
    }

    isOnEdge = (left_edge, right_edge) => {
        this.setState({
            left_edge,
            right_edge,
            position: this.state.position,
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