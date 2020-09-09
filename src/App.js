import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './auth/Auth';

const App = () => {
    return (
        <Router>
            <MainNavigation />
            <main>
                <Route path="/auth">
                    <Auth />
                </Route>
                <Route exact path="/">
                    <Redirect to="/auth" /> :
                </Route>
            </main>
        </Router>
    );
}

export default App;
