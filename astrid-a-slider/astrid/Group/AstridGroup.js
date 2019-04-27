import React, { Component, createContext } from 'react';

export let AstridContext = createContext({
    by: null,
    move_by: () => { }
})

export default class AstridGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /**
             * by columns or items
             */
            by: null,
            move_by: this.move_by,

            /**
             * for navigators, trigerred only once
             */
            infinite_child: null,
            has_infinite_child: this.has_infinite_child
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

    has_infinite_child = (hasInfiniteChild) => {
        if (this.state.infinite_child) return;
        if (hasInfiniteChild){
            this.setState({
                infinite_child: true
            })
        }
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