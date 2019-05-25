import React, { Component } from 'react';
import boundary from './boundary';
import library from './library';

class Navigator extends Component {
    render = () => {
        return(
            <div style={{
                width: 100,
                height: 30,
                cursor: 'pointer',
                border: 'solid 1px red'
            }}
                onClick={ ()=> this.handleOnClick()/*props.move_by(this.props.move) */}
            >
                {this.props.move}
            </div>
        )
    }
    
    handleOnClick = () => {
        //this.props.plainJsStore.getPosition(this.props.move)
        this.props.go(this.props.move);
        //this.props.plainJsStore.getPosition(this.props.move);
    }
}

export default boundary(Navigator);