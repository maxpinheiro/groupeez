import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import queryString from 'querystring';

import env from '../private.json';
import {fetchTokens} from "../services/SpotifyService";

import userService from '../services/UserService';

const clientId = env.CLIENT_ID;
const authorizeUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent('user-read-private user-read-email')}&redirect_uri=${encodeURIComponent('http://localhost:3000/callback')}`

export const RedirectPage = () => {
    useEffect(() => window.location.replace(authorizeUrl));
    return <p>Redirecting...</p>;
}

class Callback extends React.Component {
    componentDidMount() {
        const authCode = queryString.parse(this.props.location.search)["?code"]
        this.props.setAuthorizationCode(authCode);
        fetchTokens(authCode).then(response => {
            userService.setAccessToken(response.access_token)
                .then(accessToken => {
                    this.props.setTokens(accessToken, response.refresh_token);
                })
        });
    }
    render() {
        return <Redirect to="/search"/>
    }
}

const stateToProperty = (state) => ({})

const propertyToDispatchMapper = (dispatch) => ({
    setAuthorizationCode: (authCode) => dispatch({
        type: "AUTHORIZATION_CODE",
        authCode
    }),
    setTokens: (accessToken, refreshToken) => dispatch({
        type: "TOKENS",
        accessToken,
        refreshToken
    })
})

export const CallbackPage = connect(stateToProperty, propertyToDispatchMapper)(Callback);