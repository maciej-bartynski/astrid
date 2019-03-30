import React, { Component, Fragment, createContext } from 'react';

export let AstridContext = createContext({
    position: null,
    move: () => { }
})

export default class AstridGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 0,
            maxPosition: 0,
            move: this.move,
            setMaxPosition: this.setMaxPosition
        }
    }

    move = (direction) => {
        if (direction === 'secretely'){
            this.setState({
                position: 0
            })
        }
        direction = direction === 'left' ? -1 : 1;
        let newPosition = ((this.state.position + direction) > this.state.maxPosition) || ((this.state.position + direction) < 0) ?
            ((this.state.position + direction) > this.state.maxPosition) ? this.state.maxPosition : 0 : (this.state.position + direction)
        this.setState({
            position: newPosition
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