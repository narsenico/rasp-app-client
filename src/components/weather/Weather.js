import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import { getIconClassName } from './WeatherIconsHelper';
import { useInterval, shortTime } from '../../utility';

import './Weather.css';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

/**
 * Componente che mostra il meteo.
 * TODO: ogni quanto deve aggiornarsi? basta una volta al giorno?
 */
function Weather() {
    const WeatherIcon = useRef();
    const [forecast, setForecast] = useState();

    useInterval(
        async () => {
            try {
                const res = await axios.get(
                    `${SERVER_BASE_URL}/weather/forecast`
                );
                setForecast(res.data);
                // TODO: mostrare la situazione peggiore da adesso alle prox 3 ore
            } catch (e) {
                console.error(e);
                setForecast(null);
            }
        },
        1000,
        100000000
    );

    return (
        <div className="weather">
            {forecast && forecast.hourly && forecast.hourly.length > 0 ? (
                <>
                    <div className="weather-description text-center place-center text-uppercase text-ellipsis text-2x">
                        {forecast.hourly[0].weather[0].description}
                    </div>
                    <div className="weather-main place-center">
                        <i
                            className={getIconClassName(
                                forecast.hourly[0].weather[0].id
                            )}
                        ></i>
                    </div>
                    <div className="weather-items">
                        {forecast.hourly.slice(1, 5).map((hour, index) => (
                            <div key={index}>
                                <div>{shortTime(new Date(hour.date))}</div>
                                <i
                                    className={getIconClassName(
                                        hour.weather[0].id
                                    )}
                                ></i>
                            </div>
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    );
}

export default Weather;
