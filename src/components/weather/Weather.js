import React, { useState } from 'react';
import axios from 'axios';

import { getHourlyIconClassName } from './WeatherIconsHelper';
import { useInterval, shortTime } from '../../utility';

import './Weather.css';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

/**
 * Componente che mostra il meteo.
 * TODO: ogni quanto deve aggiornarsi? basta una volta al giorno?
 */
function Weather() {
    const [forecast, setForecast] = useState();

    useInterval(
        async () => {
            try {
                const res = await axios.get(
                    `${SERVER_BASE_URL}/weather/forecast`
                );
                const { sunrise, sunset, hourly } = res.data;
                // considero il primo elemento di hourly come il meteo corente
                // poi prendo i successivi 4 elementi
                setForecast({
                    current: {
                        description: hourly[0].weather[0].description,
                        icon: getHourlyIconClassName(
                            hourly[0],
                            sunrise,
                            sunset
                        ),
                    },
                    items: hourly.slice(1, 5).map((hour) => ({
                        time: shortTime(new Date(hour.date)),
                        icon: getHourlyIconClassName(
                            hour,
                            sunrise,
                            sunset
                        ),
                    })),
                });
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
            {forecast ? (
                <>
                    <div className="weather-description text-center place-center text-uppercase text-ellipsis text-2x">
                        {forecast.current.description}
                    </div>
                    <div className="weather-main place-center">
                        <i className={forecast.current.icon}></i>
                    </div>
                    <div className="weather-items">
                        {forecast.items.map((item, index) => (
                            <div key={index}>
                                <div>{item.time}</div>
                                <i className={item.icon}></i>
                            </div>
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    );
}

export default Weather;
