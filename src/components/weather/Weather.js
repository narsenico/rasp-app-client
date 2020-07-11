import React, { useEffect } from 'react';
import axios from 'axios';

import './Weather.css';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

/**
 * Componente che mostra il meteo.
 * TODO: ogni quanto deve aggiornarsi? basta una volta al giorno?
 */
function Weather() {
    useEffect(
        () => {
            (async () => {
                try {
                    const res = await axios.get(
                        `${SERVER_BASE_URL}/weather/forecast`
                    );
                    const forecast = res.data;
                    console.log(forecast)
                } catch (e) {
                    console.error(e);
                }
            })();
        },
        []
    );

    return (
        <div className="weather">
            WEATHER
        </div>
    );
}

export default Weather;
