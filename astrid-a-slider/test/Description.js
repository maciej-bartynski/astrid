import React, { Component } from 'react';

export default class TextComponent extends Component {
    getSize(dimension) {
        const { astrid_identity } = this.props;

        if (astrid_identity > 6) {
            return 200 - astrid_identity * 10;
        }
        return astrid_identity * 20 + 120;
    }

    render = () => {
        const DATA_RECEIVED_FROM_ASTRID_CAROUSEL = this.props;
        const CAROUSEL_ITEM_INDEX = DATA_RECEIVED_FROM_ASTRID_CAROUSEL.astrid_identity;
        const CAROUSEL_CURRENT_POSITION = DATA_RECEIVED_FROM_ASTRID_CAROUSEL.astrid_position;

        const { title } = this.props;

        const objectStyle = {
            border: 'solid 1px rgb(200,200,200)',
            borderTop: 'none',
            color: 'white',
            background: (CAROUSEL_ITEM_INDEX === CAROUSEL_CURRENT_POSITION ? 'rgb(130,130,130)' : 'rgba(130,130,130,0.4)'),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            padding: (CAROUSEL_ITEM_INDEX % 2 === 0 ? '5px 5px' : '5px 20px'),
        }

        objectStyle.minWidth = this.getSize() + 'px';

        objectStyle.minHeight = this.getSize() + 'px';

        return (
            <div style={objectStyle}>
                {title.title}
            </div>
        )
    }
}