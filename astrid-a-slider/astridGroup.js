import React, { Component, Fragment, createContext } from 'react';

export let AstridContext = createContext({
    position: null,
    move: ()=>{}
})

export default class AstridGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 0,
            move: this.move,
        }
    }

    move = (direction) => {
        direction = direction === 'left' ? -1 : 1 ;
        this.setState({
            position: this.state.position + direction
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