import React, { Component } from 'react';
import AstridSlider from './displayLayer';
import connect from '../astridConnect';

class AstridDataLayer extends Component {
    constructor(props){
        super(props);
        this.position = 0;
        this.state = {
            ...this.props,
            validItems: this.props.validItems,
            position: this.props.position,
        }
    }

    componentDidUpdate = () => {
        //this.shouldRebuild();
    }

    shouldRebuild = () => {
        const {mode} = this.props;
        if (mode !== 'infinite') return;

        if (this.position === this.props.position) return;
        this.position = this.props.position;

        const { validItems, direction, position, columns, by } = this.props;

        let newValidItems;
        if (direction === 'left') {
            newValidItems = validItems.slice(by).concat(validItems.slice(0, by))
        } else {
            newValidItems = validItems.slice(validItems.length - by).concat(validItems.slice(0, validItems.length - by))
        }

        setTimeout(
            ()=>{
                this.setState({ 
                    validItems: newValidItems,
                    position: 0,
                });
            },
            300
        )
    }

    render = () => {
        return (<AstridSlider {...this.props} />)
    }
}

export default connect(AstridDataLayer)