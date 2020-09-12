import React, { Suspense } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './auth/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const App = () => {
    const { token, login, logout, userId } = useAuth();
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
                    <Route path="/auth">
                        <Auth />
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/auth" /> :
                    </Route>
                </Suspense>
                </main>
            </Router>
        </AuthContext.Provider>

    );
}

export default App;
