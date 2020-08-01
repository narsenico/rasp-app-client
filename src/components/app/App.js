import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '#components/Home';
import WasteCollectionEditor from '#components/WasteCollectionEditor';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/wastecollectioneditor">
                    <WasteCollectionEditor />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
