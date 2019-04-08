import React, { Component } from 'react';
import DisplayLayer from './displayLayer';
import connect from '../astridConnect';
import AstridDragger from '../astridDragger'

class RebuildLayer extends Component {
    setDragNode = (payload) => {
        this.setState({
            dragNode: payload
        })
    }

    render = () => {
        return (
            <AstridDragger columns={this.props.columns}>
                <DisplayLayer
                    {...this.props}
                    {...this}
                />
            </AstridDragger>
        )
    }

    componentDidUpdate = () => {
        //violation
        this.state.dragNode.addEventListener('click', ()=>console.log('clicked'))
    }
}

export default connect(RebuildLayer)