import React from 'react';
import { AstridContext } from './AstridGroup';

export default WrappedComponent => {
    return (props) => (
        <AstridContext.Consumer>
            {(astridContext)=><WrappedComponent {...props} {...astridContext} />}
        </AstridContext.Consumer>
    )
}