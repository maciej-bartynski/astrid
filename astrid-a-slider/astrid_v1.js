import React, { cloneElement } from 'react';
import Astrid, { AstridGroup } from './astrid';

const block = (
    <div style={{
        width: 300,
        height: 200,
        border: 'solid 1px green'
    }}>
        treść
    </div>
)

class SomeParentComponent extends React.Component {
    render = () => {

        const indicator = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        return (
            <AstridGroup>
                <Astrid>
                    {indicator.map((dummyItem, idx) => {
                        return cloneElement(block, { key: idx })
                    })}
                </Astrid>
            </AstridGroup>
        )
    }
}

export default SomeParentComponent