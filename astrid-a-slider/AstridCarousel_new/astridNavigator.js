  
import React, { Component, cloneElement } from 'react';
import { CarouselContext } from './astridGroup';

export default class CarouselNavigator extends Component {
    constructor(props){
        super(props);
        this.state = {
            left_edge: null,
            right_edge: null,
            active_position: null,
        }
    }
    render() {
        const { children, by } = this.props;
        const { left_edge, right_edge, active_position } = this.state;
        
        return (
            <CarouselContext.Consumer>
                {({ move_by, navigators_reference }) => {
                this.navigatorsReference = navigators_reference;
                return (
                    <div
                        role='button'
                        tabIndex={0}
                        onKeyDown={()=>move_by(by)}
                        onClick={()=>move_by(by)}>
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