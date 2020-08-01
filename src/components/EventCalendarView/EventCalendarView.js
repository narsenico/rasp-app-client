import React, { useState } from 'react';
import axios from 'axios';

import { useInterval } from '#hooks';
import { humanDate, shortTime, longTime } from '#helpers/date';

import './EventCalendarView.css';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
const INTERVAL = 60000;

/**
 * Componente che mostra il prossimo evento del calendario.
 */
function EventCalendarView() {
    const [event, setEvent] = useState();
    const [time, setTime] = useState();

    useInterval(
        () => {
            setTime(longTime());
        },
        1000,
        1000
    );

    useInterval(
        () => {
            (async () => {
                try {
                    const res = await axios.get(
                        `${SERVER_BASE_URL}/calendar/events`
                    );
                    const events = res.data;
                    // console.log(events);
                    if (events.length === 0) {
                        setEvent(null);
                    } else {
                        const {
                            start,
                            end,
                            summary,
                            description,
                            location,
                        } = events[0];
                        const dtStart = new Date(start);
                        const dtEnd = new Date(end);
                        setEvent({
                            start: `${humanDate(dtStart)} ${shortTime(
                                dtStart
                            )}`,
                            end: `${humanDate(dtEnd)} ${shortTime(dtEnd)}`,
                            summary,
                            description,
                            location,
                        });
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
        <div className="event-calendar-view">
            <div className="time">{time}</div>
            {event ? (
                <>
                    <div className="start">{event.start}</div>
                    <div className="end">{event.end}</div>
                    <div className="summary">{event.summary}</div>
                    <div className="descr">{event.description}</div>
                    <div className="location">{event.location}</div>
                </>
            ) : (
                <div className="descr">Non hai un cazzo da fare</div>
            )}
        </div>
    );
}

export default EventCalendarView;
