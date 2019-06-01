import React, { Component, createContext } from 'react';
import library from './library';

export let AstridDOMBoundaryData = createContext({
    by: null,
})



export default class AstridDOMBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            by: null,
            go: this.go,
        }
    }

    go = (by) => {   
        this.setState({
            by,
            restore: false,
        })
    }

    render() {
        const { children } = this.props;
       
        return (
            <AstridDOMBoundaryData.Provider value={this.state}>
                { children }
            </AstridDOMBoundaryData.Provider>
        )
    }
}