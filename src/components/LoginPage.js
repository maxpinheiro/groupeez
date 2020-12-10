import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import userService from '../services/UserService';

class Login extends React.Component {
    state = {
        username: "",
        password: "",
        error: ""
    };

    componentDidMount() {
    }

    login = () => {
        userService.login(this.state.username, this.state.password)
            .then(user => {
                if (user.error) {
                    const error = user.error === "Invalid username" ? "Sorry, we can't find an account with this username." : "Incorrect password.";
                    this.setState(prevState => ({
                        ...prevState,
                        error
                    }))
                } else {
                    //this.props.cookies.set('currentUser', user.id, {path: '/'});
                    this.props.history.push('/profile');
                }
            })
    }

    render() {
        return (
            <div className="container-fluid">
                <p className="h2">Login</p>
                <div>
                    <div className="row">
                        <p className="col-sm-2 col-lg-1"></p>
                        <div className="col-sm-10 col-lg-11">
                            {this.state.error !== "" &&
                            <p className="p-2 rounded border-secondary text-danger">{this.state.error}</p>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="username" className="col-sm-2 col-lg-1">Username</label>
                        <div className="input-group col-sm-10 col-lg-11">
                            <input onChange={(e) => this.setState(prevState => ({...prevState, username: e.target.value}))}
                                type="text" className="form-control" placeholder="username"
                                   id="usernameFld"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-2 col-lg-1">Password</label>
                        <div className="input-group col-sm-10 col-lg-11">
                            <input onChange={(e) => this.setState(prevState => ({...prevState, password: e.target.value}))}
                                   type="text" className="form-control" placeholder="password"
                                   id="passwordFld"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <p className="col-sm-2 col-lg-1"></p>
                        <div className="col-sm-10 col-lg-11">
                            <button onClick={this.login} className="btn btn-primary btn-block">Login</button>
                            <div className="row">
                                <div className="col">
                                    <p className="d-inline">Don't have an account?</p>
                                    <Link to="/register" className="mx-3">Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    //cookies: ownProps.cookies
})

const propertyToDispatchMapper = (dispatch) => ({
})

const LoginPage = connect(stateToProperty, propertyToDispatchMapper)(Login);
export default LoginPage;