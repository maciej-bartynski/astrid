import React, { Component } from 'react';
import boundary from './boundary';
import library from './library';

class Navigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position_logic: null,
            left_edge: null,
            right_edge: null
        }
    }
    
    render = () => {
        return(
            <div 
                onClick={ ()=> this.handleOnClick()}
            >
                {this.props.children}
            </div>
        )
    }
    
    handleOnClick = () => {
        const { jump,slide} = this.props;
        if ( typeof slide === 'number') {
            this.props.slide_by(slide);
        } else if ( typeof jump === 'number' ) {
            const { jump } = this.props;
            this.props.slide_to(jump);   
        } else {
            this.props.slide_by(1);
        }
    }

    
}

export default boundary(Navigator);