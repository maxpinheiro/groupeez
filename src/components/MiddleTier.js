import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import queryString from 'querystring';

const clientId =  process.env.CLIENT_ID === undefined ? 'bfc0e2b164624c0caa413825fab9fa36' : process.env.CLIENT_ID;
const authorizeUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent('user-read-private user-read-email')}&redirect_uri=${encodeURIComponent('http://localhost:3000/callback')}`

export const RedirectPage = () => {
    useEffect(() => window.location.replace(authorizeUrl));
    return <p>Redirecting...</p>;
}

class CallbackPage extends React.Component {
    componentDidMount() {
        const authCode = queryString.parse(this.props.location.search)["?code"]
        this.props.setAuthorizationCode(authCode);
    }
    render() {
        return (<Redirect to="/search"/>)
    }
}

const stateToProperty = (state) => ({})

const propertyToDispatchMapper = (dispatch) => ({
    setAuthorizationCode: (authCode) => dispatch({
        type: "AUTHORIZATION_CODE",
        authCode
    })
})

export const CallBackPage = connect(stateToProperty, propertyToDispatchMapper)(CallbackPage);