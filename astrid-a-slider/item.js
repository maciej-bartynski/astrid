import React, {Component} from 'react';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: null,
            isCurrent: null,
            adress: null,
        }
    }
    

    componentDidMount = () => {
        this.locationData();
    }

    componentDidUpdate = (prevProp, prevState) => {
        if (this.props.location.adress === prevProp.location.adress &&
            this.props.location.position === prevProp.location.position &&
            this.props.location.view === prevProp.location.view) {
                return;
            }
        this.locationData();
    }

    locationData = () => {
        let { location } = this.props

        let isCurrent = false;
        let isVisible = false;

        location.view.map((item)=>{
            if (item === location.adress) {
                isVisible = true;
            }
        })

        if (location.adress === location.position) {
            isCurrent = true;
        }

        if (
            isCurrent !== this.state.isCurrent ||
            isVisible !== this.state.isVisible
        ) {
            this.setState({
                isVisible,
                isCurrent,
                adress: location.adress
            })
        }
    }
    
    render = () => {
        console.log('rendered is now ', this.props.location)
        if (typeof this.props.children === 'object') {
            return this.props.children
        }

        if (typeof this.props.children === 'function') {
            return <this.props.children { ...this.props } {...this.state }/>;
        }

        return null;
    }
}