import React, { Component } from 'react';

class ImageComponent extends Component {
    constructor(props) {
        super(props);
        this.background = '';
    }

    render = () => {
        /**
         * astrid position => current active item position
         * astrid identity => position of this item
         * 
         * background color is used to mark item as current
         */
        const { astrid_identity, astrid_position } = this.props;
        const { some_user_prop, image } = this.props;
       
        return (
            <div
                style={{
                    width: (some_user_prop ? 200 : '100%'),
                    paddingTop: (some_user_prop ? 'unset' : '100%'),
                    height: (some_user_prop ? '100%' : 'unset'),
                    backgroundColor: (astrid_position === astrid_identity ? 'rgb(100,100,100)' : 'rgba(130,130,130,0.4)'),
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    border: 'solid 1px white',
                    boxSizing: 'border-box',
                }} />
        )
    }
}

export default ImageComponent