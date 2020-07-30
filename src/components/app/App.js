import React from 'react';

import Calendar from '../calendar/Calendar';
import Weather from '../weather/Weather';
import WasteCollection from '../wastecollection/WasteCollection';

import './App.css';

function App() {
    return <div className="app">
      <main>
          <WasteCollection />
          <Weather />
      </main>
      <footer>
        <Calendar />
      </footer>
    </div>;
}

export default App;
