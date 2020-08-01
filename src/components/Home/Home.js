import React from 'react';

import EventCalendarView from '#components/EventCalendarView';
import WeatherView from '#components/WeatherView';
import WasteCollectionView from '#components/WasteCollectionView';

import './Home.css';

function Home() {
    return (
        <div className="home">
            <main>
                <WasteCollectionView />
                <WeatherView />
            </main>
            <footer>
                <EventCalendarView />
            </footer>
        </div>
    );
}

export default Home;
