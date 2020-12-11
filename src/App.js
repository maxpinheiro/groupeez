import React from "react";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { withCookies } from 'react-cookie';

import SearchPage from './components/SearchPage';
import {CallbackPage, RedirectPage} from "./components/MiddleTier";
import DetailsPage from "./components/DetailsPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";

const LandingPage = () =>
    <div className="container">
        <Link to="/login">Login</Link>
        <Link to="/authorize">Search</Link>
    </div>

class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/register" component={LoginPage} />
                        <Route path={["/profile", "/profile/:userId"]} component={ProfilePage} />
                        <Route exact path="/search" component={SearchPage} />
                        <Route exact path="/details/:detailsId" component={DetailsPage} />
                        <Route exact path="/authorize" component={RedirectPage} />
                        <Route exact path="/callback" component={CallbackPage} />
                    </Switch>
                </Router>
            </div>
        );
    }
}
export default App;