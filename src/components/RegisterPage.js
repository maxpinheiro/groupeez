import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import userService from '../services/UserService';

class Register extends React.Component {
    state = {
        username: "",
        password: "",
        role: "",
        spotifyId: null,
        error: ""
    };

    componentDidMount() {
    }

    register = () => {
        const spotifyId = this.state.spotifyId && this.state.spotifyId !== '' ? this.state.spotifyId : null;
        const newUser = {username: this.state.username, password: this.state.password, role: this.state.role, spotifyId};
        userService.register(newUser)
            .then(user => {
                if (user.error) {
                    const error = 'Username already exists.';
                    this.setState(prevState => ({
                        ...prevState,
                        error
                    }))
                } else {
                    this.props.history.push('/authorize/profile');
                }
            })
    }

    render() {
        return (
            <div className="container-fluid">
                <p className="h2">Create a new account</p>
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
                        <label htmlFor="role" className="col-sm-2 col-lg-1">Role</label>
                        <div className="input-group col-sm-10 col-lg-11">
                            <div className="form-check mr-3">
                                <input className="form-check-input" type="radio" value="listener" name="roleInput" id="listener"
                                       onChange={(e) => this.setState(prevState => ({...prevState, role: 'listener'}))}/>
                                    <label className="form-check-label">Listener</label>
                            </div>
                            <div className="form-check mr-3">
                                <input className="form-check-input" type="radio" value="artist" id="artist" name="roleInput"
                                       onChange={(e) => this.setState(prevState => ({...prevState, role: 'artist'}))}/>
                                    <label className="form-check-label">Artist</label>
                            </div>
                            {
                                this.state.role === 'artist' &&
                                <div className="d-flex ml-5">
                                    <p className="d-inline mr-2">Verified on Spotify?</p>
                                    <div className="d-flex">
                                        <label className="d-inline">Spotify ID: </label>
                                        <input onChange={(e) => this.setState(prevState => ({...prevState, spotifyId: e.target.value}))}
                                               type="text" className="form-control d-inline ml-3" placeholder="spotify id" id="spotifyIdFld"/>
                                    </div>

                                </div>
                            }
                        </div>
                    </div>
                    <div className="form-group row">
                        <p className="col-sm-2 col-lg-1"></p>
                        <div className="col-sm-10 col-lg-11">
                            <button onClick={this.register} className="btn btn-primary btn-block">Register</button>
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

const RegisterPage = connect(stateToProperty, propertyToDispatchMapper)(Register);
export default RegisterPage;