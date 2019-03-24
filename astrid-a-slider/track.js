import React, { Component } from 'react';
import './App.css';
import ItemWrapper from './item'

let caro;
let navi;

class AstridTrack extends Component {
    caro = this;

    constructor(props) {
        super(props);
        caro = this;

        this.position = 0;

        this.state = {
            sliderCss: {
                width: '100%',
                transition: 'transform 300ms ease-out',
                transform: 'translate(0,0)',
                boxSizing: 'border-box',
                whiteSpace: 'nowrap'
            }
        }
    }

    componentDidMount = () => {
        this.prepareSlider();
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props) {
            this.prepareSlider();
        }
    }

    locationData = () => {
        this.visibleIndexes = [];
        for (let i = 0; i < this.amount; i++) {
            if (i >= -this.position &&
                i < -this.position + this.columns) {
                this.visibleIndexes.push(i);
            }
        }
    }

    prepareItems = () => {
        this.locationData();
        return this.props.config.sliders[0].items.map((item, idx) => {
            return (
                <div style={this.getColumnCss(this.amount)} key={idx}>
                    <ItemWrapper location={{ adress: idx, view: this.visibleIndexes, position: -this.position }}>
                        {item}
                    </ItemWrapper>
                </div>
            )
        })
    }

    prepareSlider = () => {
        this.amount = this.props.config.sliders[0].items.length;
        this.columns = this.props.config.sliders[0].columns;
        this.columnWidth = 100 / this.columns;
        this.prepareItems();
        this.forceUpdate();
    }

    getWrapperCss = () => {
        return {
            width: '100%',
            boxSizing: 'content-box',
            overflow: 'hidden'

        }
    }

    getColumnCss = () => {
        return {
            width: `${100 / this.columns}%`,
            display: 'inline-block',
            boxSizing: 'content-box'
        }
    }

    preventEdgeTresspassing = (direction) => {
        if (direction === 'left') {
            return this.position - 1 < -this.amount + this.columns ? false : true;
        } else {
            return this.position + 1 > 0 ? false : true;
        }
    }

    move = (direction) => {
        if (!this.preventEdgeTresspassing(direction)) return;

        if (direction === 'left') {
            this.position -= 1;
        } else {
            this.position += 1;
        }

        this.setState(
            {
                sliderCss: {
                    ...this.state.sliderCss,
                    transform: `translateX(${this.position * this.columnWidth}%)`
                }
            }
        )

    }

    render() {

        if (!this.amount) return null;

        return (
            <div className="App">

                <div style={this.getWrapperCss()}>
                    <div style={this.state.sliderCss}>
                        {this.prepareItems()}
                    </div>
                </div>

                <button
                    onClick={() => this.move('left')}
                >
                    Left
                </button>

                <button
                    onClick={() => this.move('right')}
                >
                    Right
                </button>

            </div>
        );
    }
}

class AstridNavbutton extends Component {
    move = (arg) => {
        this.ctx.move(arg);
    }
    
    render = () => {
        let { direction, children } = this.props;
        
        return (<button onClick={() => this.move(direction)}>
            { children }
        </button>)
    }
}

export class Astrid {
    constructor() { 
        this.ctx = caro;  
        this.AstridCarousel = AstridTrack;
        this.AstridNavigation = AstridNavbutton;
        this.AstridNavigation.ctx = this.ctx;
    }
}

export default AstridTrack;
