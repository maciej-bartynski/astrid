import React, { Component, cloneElement, createRef } from 'react';
import carouselConnect from './../astridConnect';
import { findDOMNode } from 'react-dom';
import { library } from './../library';
import { runInNewContext } from 'vm';

class DataLayer extends Component {
    constructor(props) {
        super(props);
        this.activeItem = 0;
        this.positionItem = 0;

        this.carouselReference = createRef();
        this.prepareValidChildren();
    }

    widthsArr = () => {
        let widthsArr = [];
        const { validChildren, columns, grid } = this.props;
        if (grid) {
            validChildren.forEach(() => {
                widthsArr.push(100 / columns);
            });
        } else {
            validChildren.forEach(() => {
                widthsArr.push(100 / columns);
            });
        }
    }

    prepareValidChildren = () => {
        const { validChildren, columns, grid } = this.props;

        const isGrid = grid === null || grid === undefined || grid ? true : false;

        const itemStyles = {
            display: 'inline-block',
            width: (isGrid ? `${100 / columns}%` : 'auto'),
            listStyle: 'none',
            margin: 0,
            padding: 0,
        }

        this.validChildren = validChildren.map((Child, idx) => {
            const CarouselItem = (
                <li
                    data-carousel-selector='carousel_item'
                    style={itemStyles}>
                    {cloneElement(
                        Child.CarouselItem, { identity: idx }
                    )}
                </li>
            )
            return {
                CarouselItem,
                carouselItemID: Child.carouselItemID,
            }
        })
    }

    renderValidChildren = () => {
        return this.validChildren.map((Child, id)=>{
            return Child.CarouselItem
        })
    }

    isOnEdge = () => {
        if (this.positionItem >= this.state.validChildren.length - 1) {
            this.positionItem = this.state.validChildren.length - 1;
            this.rightEdge = true;
        } else if (this.positionItem <= 0) {
            this.positionItem = 0;
            this.leftEdge = true;
        } else {
            this.leftEdge = false;
            this.rightEdge = false;
        }
    }

    getPosition = (by) => {
        if (!this.state || !this.state.validChildren || !by) return ;

        const { grid, columns } = this.props;
        const newPositionItem = this.positionItem + by;
        this.positionItem = newPositionItem;

        this.isOnEdge();

        const isGrid = grid === null || grid === undefined || grid ? true : false;

        if ( !isGrid ) {
            let left = 0;
            for ( let i = 0; i < this.positionItem ; i++ ){
                left += this.state.validChildren[i].carouselItemWidth;
            }
            return -left + 'px';
        } else {
            return -(this.positionItem * (100/columns)) + '%'
        }
    }

    render = () => {
        let position = this.getPosition(this.props.by);
        position = position ? position : this.positionItem;
        const listStyle = {
            width: '100%',
            display: 'block',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            whiteSpace: 'nowrap',
            transition: 'transform 300ms linear',
            transform: `translateX(${ position })`
        }

        console.log('rereeeebder')

        return (
            <ul
                ref={this.carouselReference}
                style={
                    listStyle}
                onTransitionEnd = { this.transitionEndHandler }
            >
                {this.renderValidChildren()}
            </ul>
        )
    }

    transitionEndHandler = () => {
        
        if (this.leftEdge || this.rightEdge ) {
            this.wasOnEdge = true;
            this.props.isOnEdge( this.leftEdge, this.rightEdge );
        } else {
            if (this.wasOnEdge) {
                this.wasOnEdge = false;
                this.props.isOnEdge( false, false );
            }
        }
    }

    componentDidMount = () => {
        const carousel = findDOMNode(this.carouselReference.current);
        const itemNodes = carousel.querySelectorAll('li[data-carousel-selector="carousel_item"]');
        const itemNodesArray = library.arrayListFromArrayLikeList(itemNodes);
      
        itemNodesArray.map((it, id) => {
            this.validChildren[id].carouselItemWidth = it.offsetWidth
            this.validChildren[id].carouselItemHeight = it.offsetHeight
        })

        this.setState({
            validChildren: this.validChildren
        })
    }
}

export default carouselConnect(DataLayer)