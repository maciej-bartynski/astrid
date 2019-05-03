import React, { Component, createContext } from 'react';
import { timingSafeEqual } from 'crypto';

export let CarouselContext = createContext({
    position: null,
    move: () => { }
})

export default class CarouselGroup extends Component {
    constructor(props) {
        super(props);
        this.navigators=[];

        this.state = {
            by: null,
            to: null,
            move_to: this.move_to,
            move_by: this.move_by,

            navigators: [],
            navigators_reference: this.navigators_reference,

            /*left_edge: null,
            right_edge: null,
            isOnEdge: this.isOnEdge,*/
        }
    }

    move_to = (to) => {
        if (typeof to !== 'number') {
            return;
        }

        this.setState({
           to,
           by: false,
        })
    }

    move_by = (by) => {
        if (typeof by !== 'number') {
            by = 0;
        }
        
        this.setState({
            by,
            to: false,
        })
    }

    /*isOnEdge = (left_edge, right_edge) => {
        this.setState({
            left_edge,
            right_edge,
            position: this.state.position,
        })
    }*/

    navigators_reference = async (payload) => {
        this.navigators.push(payload);
    }

    componentDidMount=()=>{
       
        this.setState({
            navigators: this.navigators
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