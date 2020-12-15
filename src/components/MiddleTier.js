import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import queryString from 'querystring';

import env from '../private.json';
import spotifyService from "../services/SpotifyService";
import userService from '../services/UserService';

const clientId = env.CLIENT_ID;
const authorizeUrl = (uri) => `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent('user-read-private user-read-email')}&redirect_uri=${encodeURIComponent(uri)}`

export const RedirectPage = (props) => {
    //useEffect(() => window.location.replace(authorizeUrl(`http://localhost:3000/callback/${props.match.params.callback}`)));
    //https://nameless-plateau-81307.herokuapp.com/callback
    useEffect(() => window.location.replace(authorizeUrl(`https://nameless-plateau-81307.herokuapp.com/callback/${props.match.params.callback}`)));
    return <p>Redirecting...</p>;
}

class Callback extends React.Component {
    componentDidMount() {
        const authCode = queryString.parse(this.props.location.search)["?code"]
        this.props.setAuthorizationCode(authCode);
        spotifyService.fetchTokens(authCode, this.props.match.params.callback).then(response => {
            userService.setAccessToken(response.access_token)
                .then(status => {
                    this.props.setTokens(response.access_token, response.refresh_token);
                })
        });
    }
    render() {
        return <Redirect to={`/${this.props.match.params.callback || 'search'}`}/>
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