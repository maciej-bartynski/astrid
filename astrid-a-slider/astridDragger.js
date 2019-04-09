import React, { Component } from 'react';
import { AstridContext } from './astridGroup';
import { findDOMNode } from 'react-dom';

export default class AstridDragger extends Component {
    constructor(props) {
        super(props);
        this.dragArea = React.createRef();
    }

    onMouseEnter = () => {
        if (!this.dragArea.current) return;
        const dragAreaNode = findDOMNode(this.dragArea.current);
        this.dragAreaWidth = dragAreaNode.offsetWidth;

        this.translateAreaNode = dragAreaNode.querySelector('.astrid-track');

        this.touchStart = null;
        this.touchEnd = null;
        this.movedByPx = null;
        this.movedByPercent = null;
    }

    onMouseDown = (e, callb) => {
        this.locked = true;
        this.touchStart = e.clientX
    }

    onMouseMove = (e, move_by_percent) => {
        if (!this.locked) return;

        
    }

    onMouseUp = (e, callb) => {
        const { columns } = this.props;
        if (!this.locked) return;
        this.locked = false;

        this.touchEnd = e.clientX;
        this.movedByPx = this.touchEnd - this.touchStart;
        this.movedByPercent = this.movedByPx / this.dragAreaWidth * 100;

        let by = (columns / 100 * this.movedByPercent);
        by =  Math.abs(by - Math.floor(by)) > 0.5 ? Math.ceil(by) : Math.floor(by); 

        callb(-by);
    }

    render() {
        const { children } = this.props;
        return (
            <AstridContext.Consumer>
                { ({ move_by }) => (
                    <div
                        ref={this.dragArea}
                        onMouseEnter={this.onMouseEnter}
                        onMouseDown={(e) => this.onMouseDown(e)}
                        onMouseUp={(e) => this.onMouseUp(e, move_by)}>
                        {children}
                    </div>
                )}
            </AstridContext.Consumer>
        )
    }
}
