import React, { Component, Fragment, createContext } from 'react';

export let AstridContext = createContext({
    position: null,
    move: () => { }
})

export default class AstridGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SETTINGS: {
                ...this.props
            },

            by: null,
            move_by: this.move_by,
        }
    }

    move_by = (payload) => {
        if (typeof payload !== 'number') {
            payload = 1;
        }

        this.setState({
            by: payload,
            by_percent: null,
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