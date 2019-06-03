import React, { Component, createContext } from 'react';
import { findDOMNode } from 'react-dom'
import library from './library';

export let AstridDOMBoundaryData = createContext({
    by: null,
})



export default class AstridDOMBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            by: null,
            to: null,
            slide_by: this.slide_by,
            slide_to: this.slide_to
        }
    }

    slide_by = (by) => {   
       
        this.setState({
            by,
            to: null,
        })
    }

    slide_to = (to) => {
        this.setState({
            by: null,
            to,
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