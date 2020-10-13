// ADD EXPENSES
// CREATE STATE INPUT HANDLER ONLY FOR EXPENSES
// WHERE TO CREATE IT ? NOT SAME INPUT HANDLER THAN ADD PERSON

import React, { Suspense } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './auth/Auth';
import Dashboard from './dashboard/pages/Dashboard';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const App = () => {
    const { token, login, logout, userId } = useAuth();
    let routes;

    if (token) {
        routes = (
            <Switch>
                  <Route path="/dashboard">
                      <Dashboard />
                  </Route>
                  <Route exact path="/">
                      <Redirect to="/dashboard" /> :
                  </Route>
                  <Redirect to="/dashboard" />
            </Switch>
        );
    } else {
        routes = (
          <Switch>
                <Route path="/auth">
                    <Auth />
                </Route>
                <Route exact path="/">
                    <Redirect to="/auth" /> :
                </Route>
          </Switch>
        );
      }
    
    return (
        <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout
        }}
        >
            <Router>
                <MainNavigation />
                <main>
                <Suspense fallback={
                    <div className="center">
                        <LoadingSpinner/>
                    </div>
                }>
                    {routes}
                </Suspense>
                </main>
            </Router>
        </AuthContext.Provider>

    );
}

export default App;
