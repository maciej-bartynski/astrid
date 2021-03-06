import React, { cloneElement } from 'react';

export const library = {
    getElementsArray: function (children, columnSize, axis) {
        const data = {
            items: [],
            ids: [],
        }

        children.map((item, idx) => {
            const carouselItem = this.itemToCarouselItem(item, idx, columnSize, axis)
            data.items.push(carouselItem);
            data.ids.push(idx);
        })

        return data;
    },

    itemToCarouselItem: function (item, idx, columnSize, axis) {
        let displayType = axis === 'vertical' ? 'block' : 'inline-block';
        let floatType = axis === 'vertical' ? { float: 'left', clear: 'left'} : {};
        
        const itemStyles = {
            display: displayType,
            verticalAlign: 'top',
            /*width: (columnSize ? columnSize : 'auto'),*/
            listStyle: 'none',
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
            ...floatType,
        }

        const dimension =  axis === 'vertical' ? 'height' : 'width';
        itemStyles[dimension] = columnSize;

        const CarouselItem = (props) => {
            return (
                <div
                    key={idx}
                    data-carousel-selector='carousel_item'
                    style={itemStyles}>
                    {cloneElement(
                        item, { astrid_identity: idx, ...props }
                    )}
                </div>
            )
        }

        return <CarouselItem/>
    },

    getIsSlider: (columns, elementsArray) => {
        return elementsArray.length <= columns ? false : true;
    },

    getIsGrid: (grid) => {
        return (grid === null || grid === undefined || grid) ? true : false;
    },

    getValidCarouselPosition: (demandedPosition, arrayLength) => {
        const toLow = demandedPosition < 0;
        const toHigh = demandedPosition > arrayLength - 1;
        return (toLow || toHigh ? toLow ? 0 : arrayLength - 1 : demandedPosition)
    },

    arrayListFromArrayLikeList: (arrayLike) => {
        let validArray = [];
        for (let i = 0; i < arrayLike.length; i++) {
            validArray.push(arrayLike[i])
        }
        return validArray;
    },

    getInfiniteElementsArray: function (columns, elementsArray) {
        let infiniteElementsArray = [];
        const ARRAY_LENGTH = elementsArray.length;
        const MINIMUM_SLIDER_LENGTH = 3 * columns;
        const MINIMUM_SAFE_ARRAY_LENGTH = this.getMinSafeArrayLength(ARRAY_LENGTH, MINIMUM_SLIDER_LENGTH);

        if (ARRAY_LENGTH < MINIMUM_SAFE_ARRAY_LENGTH) {
            let helper_iterator = 0;

            for (let i = 0; i < MINIMUM_SAFE_ARRAY_LENGTH; i++) {
                helper_iterator = helper_iterator >= ARRAY_LENGTH ? 0 : helper_iterator;
                const element = cloneElement(
                    elementsArray[helper_iterator],
                    { key: i, infinite_identity: i }
                )
                infiniteElementsArray.push(element)
                helper_iterator++;
            }

        } else {
            infiniteElementsArray = elementsArray;
        }

        infiniteElementsArray = this.moveLastIndexesToStart(columns, infiniteElementsArray)
        return infiniteElementsArray;
    },

    getMinSafeArrayLength: function (arrayLength, minLength) {
        while (arrayLength < minLength && arrayLength !== 0 && minLength !== 0) {
            arrayLength += arrayLength
        }
        return arrayLength;
    },

    moveLastIndexesToStart: function (columns, elementsArray) {
        let SliderLeftOverflow = elementsArray.slice(elementsArray.length - columns);
        let SliderVisibleAreaAndRightOverflow = elementsArray.slice(0, elementsArray.length - columns);
        return SliderLeftOverflow.concat(SliderVisibleAreaAndRightOverflow);
    },

    getModifiedTo: function (columns, to, componentsLength) {
        let modifiedTo;
        if (to >= componentsLength - columns) {
            const revertTo = to - (componentsLength - columns);
            modifiedTo = revertTo;
        } else {
            modifiedTo = columns + to;
        }
        return modifiedTo;
    }
}