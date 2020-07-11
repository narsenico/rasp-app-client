import React, { useState } from 'react';
import axios from 'axios';
import { useInterval } from '../../utility';

import './Calendar.css';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
const INTERVAL = 60000;

/**
 * Componente che mostra il prossimo evento del calendario.
 */
function Calendar() {
    const [event, setEvent] = useState();

    useInterval(
        () => {
            (async () => {
                try {
                    const res = await axios.get(
                        `${SERVER_BASE_URL}/calendar/events`
                    );
                    const events = res.data;
                    console.log(events);
                    if (events.length === 0) {
                        setEvent(null);
                    } else {
                        setEvent(events[0]);
                    }
                } catch (e) {
                    // TODO: gestire mancata autorizzazione
                    console.error(e);
                }
            })();
        },
        0,
        INTERVAL
    );

    return (
        <div className="calendar-event">
            {event ? (
                <>
                    <div className="calendar-event-start">{event.start}</div>
                    <div className="calendar-event-end">{event.end}</div>
                    <div className="calendar-event-summary">
                        {event.summary}
                    </div>
                    <div className="calendar-event-description">
                        {event.description}
                    </div>
                    <div className="calendar-event-location">
                        {event.location}
                    </div>
                </>
            ) : (
                <div className="calendar-event-summary">
                    Non hai un cazzo da fare
                </div>
            )}
        </div>
    );
}

export default Calendar;
