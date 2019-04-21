import React, { Component, Fragment, createContext } from 'react';

export let AstridContext = createContext({
    by: null,
    move_by: () => { }
})

export default class AstridGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            by: null,
            move_by: this.move_by,
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

    render() {
        const { children } = this.props;
        return (
            <AstridContext.Provider value={this.state}>
                {children}
            </AstridContext.Provider>
        )
    }
}