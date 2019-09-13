
import React, { Component, createContext } from 'react';
import { findDOMNode } from 'react-dom'
export let AstridGroupContext = createContext();

export class AstridGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            ini: null,
        }
    }

    render = () => {
        return(
            <AstridGroupContext.Provider value={this.state}>
                { this.props.children }
            </AstridGroupContext.Provider>
        )
    }

    componentDidMount = () => {
        const group = findDOMNode(this);
        const gallery = group.querySelector('[data-astrid-selector="gallery"]');
        //const items = gallery.childNodes();

        console.log('jea;', group, gallery)
    }
}

export default AstridGroup;