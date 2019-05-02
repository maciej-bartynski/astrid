export const library = {
    getElementsArray: (children) => {
        let newItems = children.map((item, idx)=>{
            return {
                CarouselItem: item, 
                carouselItemID: idx, 
                carouselItemWidth: null,
                carouselItemHeight: null,
            }
        })
        return newItems;
    },

    arrayListFromArrayLikeList: (arrayLike) => {
        let validArray = [];
        for (let i = 0; i<arrayLike.length; i++){
            validArray.push(arrayLike[i])
        }
        return validArray;
    },

    getIsSlider: (columns, elementsArray) => {
        return elementsArray.length <= columns ? false : true;
    },

    getInfiniteElementsArray: (columns, elementsArray) => {
        let infiniteElementsArray = [];
        const ARRAY_LENGTH = elementsArray.length;
        const MINIMUM_SLIDER_LENGTH = 3 * columns;
        const MINIMUM_SAFE_ARRAY_LENGTH = library.getMinSafeArrayLength(ARRAY_LENGTH, MINIMUM_SLIDER_LENGTH);
        
        if (ARRAY_LENGTH < MINIMUM_SAFE_ARRAY_LENGTH) {
            let helper_iterator = 0;

            for (let i = 0; i < MINIMUM_SAFE_ARRAY_LENGTH; i++) {
                helper_iterator = helper_iterator >= ARRAY_LENGTH ? 0 : helper_iterator;
                infiniteElementsArray.push(elementsArray[helper_iterator])
                helper_iterator++;
            }

        } else {
            infiniteElementsArray = elementsArray;
        }


        return infiniteElementsArray;
    },

    getMinSafeArrayLength: (arrayLength, minLength) => {

        while (arrayLength < minLength) {
            arrayLength += arrayLength
        }
      
        return arrayLength;
    },

    moveLastIndexesToStart: (columns, elementsArray) => {
        let SliderLeftOverflow = elementsArray.slice(elementsArray.length - columns);
        let SliderVisibleAreaAndRightOverflow = elementsArray.slice(0, elementsArray.length - columns);
        return SliderLeftOverflow.concat(SliderVisibleAreaAndRightOverflow);
    }
}