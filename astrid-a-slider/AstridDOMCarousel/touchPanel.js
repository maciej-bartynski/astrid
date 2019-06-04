
class TouchPanel {
    constructor(gallery, sensibility, axis, slide_by, view) {
        this.gallery = gallery;
        this.axis = axis;
        this.preventTransition = this.gallery.style.transition;
        this.factor = sensibility;
        this.slide_by = slide_by;
        this.view = view;
        this.columnWidthPx = Math.floor(this.view / this.factor);
    }
    
    handleLock = (e, startingPoint, touch) => {
        e.stopPropagation();
        e.preventDefault();
        /** will be dragged */
        this.gallery.style.transition = 'none';
        /** if locked, mouseMove is dragging */
        this.startingPoint = startingPoint;
        this.locked = true;
        /** check start position */
        if ( touch ) {
            this.lockPosition = this.axis === 'vertical' ? e.touches[0].clientY : e.touches[0].clientX;
        } else {
            this.lockPosition = this.axis === 'vertical' ? e.clientY : e.clientX;
        }
    }

    handleMove = (e, _, touch) => {
        e.stopPropagation();
        e.preventDefault();
        /** if gallery is not being dragged, return */
        if (!this.locked) return;
        /** potential stop position if drag is finished now */
        let losePosition; /*= this.axis === 'vertical' ? e.clientY : e.clientX*/;
        if ( touch ) {
            losePosition = this.axis === 'vertical' ? e.touches[0].clientY : e.touches[0].clientX;
        } else {
            losePosition = this.axis === 'vertical' ? e.clientY : e.clientX;
        }
        /** by now is moved by some px or % */
        this.differencePx = losePosition - this.lockPosition;
        const finalMoveBy = this.startingPoint + this.differencePx;
        /** drag DOM node */
        this.gallery.style.transform = this.axis === 'vertical' ? `translateY(${finalMoveBy}px)` : `translateX(${finalMoveBy}px)`;
    }

    handleMouseUp = (e) => {
        /** if gallery was not being dragged, return */
        if (!this.locked) return;
        e.stopPropagation();
        e.preventDefault();
        this.handleLose();
    }

    handleMouseOut = (e) => {
        /** if gallery was being dragged, stop dragging */
        this.handleMouseUp(e);
        /** disable drag on mouse move */
        this.locked = false;
    }


    handleLose = () => {
        /** restore transition disabled during dragging */
        this.gallery.style.transition = this.preventTransition;
        /** if abs distance < 30, return to start position */
        const isShifted = (Math.abs(this.differencePx) > 30);
        if (!isShifted) {
            this.backToCurrentCssLeftWithoutTriggeringLogic()
            return;
        };
        /** format px distance to columns distance */
        let distanceColumns = Math.round(this.differencePx / this.columnWidthPx);
        /** it is shifted for sure (more than 100px), so do not return zero */
        if (distanceColumns === 0) {
            distanceColumns = Math.sign(this.differencePx / this.columnWidthPx)
        }
        /** reset differencePx to prevent future clicks and drags */
        this.differencePx = 0;
        /** revert int to -int to prevent transition direction */
        this.slide_by(-distanceColumns)
    }

    handleClickCapture = (e) => {
        /** if clicked and dragged */
        if (this.locked) {
            /** unclick on drag stop */
            this.locked = false;
            /** prevent items clicking immediately after stop dragging */
            e.stopPropagation();
        }
    }    

    backToCurrentCssLeftWithoutTriggeringLogic = () => {
        console.log('requested')
        const translate = this.axis === 'vertical' ? `translateY(${this.startingPoint}px)` : `translateX(${this.startingPoint}px)`;
        this.gallery.style.transform = translate;
        this.locked = false;
    }

    handleTouchStart = (e, startingPoint) => {
        this.handleLock(e, startingPoint,true)
    }

    handleTouchMove = (e,startingPoint)=>{
        this.handleMove(e, startingPoint,true)
    }

    handleTouchEnd = (e, startingPoint) => {
        this.handleMouseUp(e, startingPoint,true)
    }
}

export default TouchPanel;