  
import React, { Component, cloneElement } from 'react';
import { CarouselContext } from './astridGroup';

export default class AstridPointer extends Component {
    constructor(props){
        super(props);
        this.state = {
            left_edge: null,
            right_edge: null,
            active_position: null,
        }
    }
    render() {
        const { children, to } = this.props;
        const { left_edge, right_edge, active_position } = this.state;
        
        return (
            <CarouselContext.Consumer>
                {({ move_to, navigators_reference }) => {
                this.navigatorsReference = navigators_reference;
                return (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        role='button'
                        tabIndex={0}
                        onKeyDown={()=>move_to(to)}
                        onClick={()=>move_to(to)}>
                        { cloneElement( children, { left_edge, right_edge, active_position } ) }
                    </div>
                )}}
            </CarouselContext.Consumer>
        )
        
    
    }

    triggerSetState = (payload) => {
        this.setState({...payload})
    }
    
    componentDidMount = () => {
       this.navigatorsReference( this ); 
    }
}