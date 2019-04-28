import React, { Component } from 'react';
import connect from '../Group/AstridConnect';

class InfiniteLayer extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const { children } = this.props;

        return children
    }
}

export default connect(InfiniteLayer)