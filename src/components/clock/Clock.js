import React, { useState } from 'react';
import { useInterval, longTime, shortDate } from '../../utility';

import './Clock.css';

/**
 * Componente che mostra data e ora.
 */
function Clock() {
    const [date, setDate] = useState();
    const [time, setTime] = useState();

    useInterval(() => {
        setDate(shortDate());
        setTime(longTime());
    }, 1000, 1000);

    return (
        <div className="clock">
            <div className="text-left text-uppercase">{date}</div>
            <div className="text-right text-uppercase">{time}</div>
        </div>
    );
}

export default Clock;
