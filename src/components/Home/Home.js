import React from 'react';

import Calendar from '../Calendar';
import Weather from '../Weather';
import WasteCollection from '../WasteCollection';

import './Home.css';

function Home() {
    return (
        <div className="home">
            <main>
                <WasteCollection />
                <Weather />
            </main>
            <footer>
                <Calendar />
            </footer>
        </div>
    );
}

export default Home;
