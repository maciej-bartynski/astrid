import React, { useState, useEffect } from 'react';

export default () => {
    const useStateHelper = (counte) => {
        return counte + 1
    }
    const useEffectHelper = (count) => {
        document.title = count
    }
    const useEffectHelper2 = (num, setDescriber) => {
        const word = num % 2 === 0 ? num === 0 ? 'ZEROWY' : 'PARZYSTY' : "NIEPARZYSTY";

        setDescriber(word)
    }
    const [counter, setCounter] = useState(0);
    useEffect(() => useEffectHelper(counter))
    const [describer, setDescriber] = useState('NIEPARZYSTY')
    useEffect(() => useEffectHelper2(counter, setDescriber))
    return (
        <div>
            <h1>Jakiś tekst</h1>
            <button onClick={() => {
                setCounter(useStateHelper(counter));
            }}>
                <p>OTO JEST NOWY {describer}: COUNTER {counter}</p>
            </button>
        </div>
    )
}