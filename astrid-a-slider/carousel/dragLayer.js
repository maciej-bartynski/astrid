import React, { Component } from 'react';
import DisplayLayer from './displayLayer';
import { findDOMNode } from 'react-dom';
import connect from '../astridConnect';

class RebuildLayer extends Component {
    constructor(props) {
        super(props);
        this.dragArea = React.createRef();
    }

    onMouseEnter = () => {
        if (!this.dragArea.current) return;
        const dragAreaNode = findDOMNode(this.dragArea.current);
        this.dragAreaWidth = dragAreaNode.offsetWidth;
        this.translateAreaNode = dragAreaNode.querySelector('div[data-astrid-selector="astrid-track-selector"]');

        this.touchStart = null;
        this.touchEnd = null;
        this.movedByPx = null;
        this.movedByPercent = null;
        this.lockedPercentLeft = null;
        this.transitionStyle = this.translateAreaNode.style.transition;
    }

    onMouseDown = (e) => {
        this.locked = true;
        this.touchStart = e.clientX;

        this.translateAreaNodeTransition = this.translateAreaNode.style.transition;
        this.translateAreaNode.style.transition = 'none';
        this.lockedPercentLeft = this.translateAreaNode.getAttribute("data-astrid-position");
        this.lockedPercentLeft = parseInt(this.lockedPercentLeft);

    }

    onMouseMove = (e) => {
        if (!this.locked) return;

        this.touchEnd = e.clientX;
        this.movedByPx = this.touchEnd - this.touchStart;
        this.movedByPercent = this.movedByPx / this.dragAreaWidth * 100;

        this.translateAreaNode.style.transform = `translate(${this.lockedPercentLeft+this.movedByPercent}%, 0)`;         
    }

    onMouseUp = (e) => {
        const { columns } = this.props;
 
        if (!this.locked) return;
        this.locked = false;

        this.touchEnd = e.clientX;
        this.movedByPx = this.touchEnd - this.touchStart;
        this.movedByPercent = this.movedByPx / this.dragAreaWidth * 100;

        let by = (columns / 100 * this.movedByPercent);
        by =  Math.abs(by - Math.floor(by)) > 0.5 ? Math.ceil(by) : Math.floor(by); 
        by = !by ? -0 : by ;

        setTimeout( ()=>{
            this.translateAreaNode.style.transition = this.translateAreaNodeTransition;
            this.props.move_by(-by);
        } )
    }

    render = () => {
        return (
            <div
                ref={this.dragArea}
                onDragStart={(e)=>{e.preventDefault(); e.stopPropagation();}}
                onMouseEnter={this.onMouseEnter}
                onMouseDown={(e) => this.onMouseDown(e)}
                onMouseUp={(e) => this.onMouseUp(e)}
                onMouseMove={e=>this.onMouseMove(e)}>
                
                <DisplayLayer
                    {...this.props}
                />
            </div>
        )
    }

    componentDidUpdate = () => {
        //violation
        //this.state.dragNode.addEventListener('click', ()=>console.log('clicked'))
    }
}

export default connect(RebuildLayer)