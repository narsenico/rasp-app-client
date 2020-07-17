import React from 'react';
import './App.css';
import Clock from '../clock/Clock';
import Calendar from '../calendar/Calendar';
import Weather from '../weather/Weather';
import WasteCollection from '../wastecollection/WasteCollection';

function App() {
    return <div className="app">
      <header>
        <Clock />
      </header>
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
