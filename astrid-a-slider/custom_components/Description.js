import React, { Component } from 'react';

export default class TextComponent extends Component {
    getSize(dimension) {
        /**
         * some random styling
         */
        const { astrid_identity } = this.props;

        if (astrid_identity > 6) {
            return 200 - astrid_identity * 10;
        }
        return astrid_identity * 20 + 120;
    }

    render = () => {
        /**
         * astrid position => current active item position
         * astrid identity => position of this item
         * 
         * background color is used to mark item as current
         */
        const { astrid_identity, astrid_position } = this.props;
        const { title } = this.props;

        const objectStyle = {
            border: 'solid 1px rgb(200,200,200)',
            borderTop: 'none',
            color: 'white',
            background: (astrid_identity === astrid_position ? 'rgb(130,130,130)' : 'rgba(130,130,130,0.4)'),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            padding: (astrid_identity % 2 === 0 ? '5px 5px' : '5px 20px'),
        }

        objectStyle.minWidth = this.getSize() + 'px';

        objectStyle.minHeight = this.getSize() + 'px';

        return (
            <div style={objectStyle}>
                {title}
            </div>
        )
    }
}