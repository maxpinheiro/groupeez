import React from "react";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {FaUserCircle} from 'react-icons/fa';
import {AiFillHome} from "react-icons/ai";

import SearchPage from './components/search/SearchPage';
import {CallbackPage, RedirectPage} from "./components/MiddleTier";
import DetailsPage from "./components/details/DetailsPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/profiles/ProfilePage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import PostCreator from "./components/profiles/PostCreator";
import ReviewCreator from "./components/details/ReviewCreator";

const LandingPage = () =>
    <div className="container">
        <Link to="/login">Login</Link>
        <Link to="/authorize">Search</Link>
    </div>

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Router>
                    <div className="mb-2">
                        <Link to={"/"} className="">
                            <AiFillHome />
                        </Link>
                        <Link to={"/profile"} className="float-right">
                            <FaUserCircle />
                        </Link>
                    </div>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/register" component={RegisterPage} />
                        <Route exact path="/profile" component={ProfilePage} />
                        <Route exact path="/profile/:userId" component={ProfilePage} />
                        <Route exact path="/search" component={SearchPage} />
                        <Route exact path="/details/:detailType/:detailId" component={DetailsPage} />
                        <Route exact path="/authorize" component={RedirectPage} />
                        <Route exact path="/callback" component={CallbackPage} />
                        <Route exact path="/review/:reviewType/:detailId" component={ReviewCreator} />
                        <Route exact path="/post" component={PostCreator} />
                        <Route exact path="/post/:postType/:postId" component={PostCreator} />
                    </Switch>
                </Router>
            </div>
        );
    }
}
export default App;