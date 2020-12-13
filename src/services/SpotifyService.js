import env from '../private.json';

const queryString = require('querystring');
const searchUrl = 'https://api.spotify.com/v1/search';

export const search = (queryParams, accessToken) => {
    return fetch(`${searchUrl}?${queryString.stringify(queryParams)}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(response => response.json());
}

export const findSong = (songId, accessToken) => {
    return fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(response => response.json());
}

export const findAlbum = (albumId, accessToken) => {
    return fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(response => response.json());
}

export const findArtist = (artistId, accessToken) => {
    return fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(response => response.json());
}


export const fetchTokens = (authCode) => {
    return fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: queryString.stringify({
            code: authCode,
            redirect_uri: 'http://localhost:3000/callback',
            grant_type: 'authorization_code',
            client_id: env.CLIENT_ID,
            client_secret: env.CLIENT_SECRET
        })
    }).then(response => response.json());
}

export const refreshToken = (refreshToken) => {
    return fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: queryString.stringify({
            refresh_token: refreshToken,
            redirect_uri: 'http://localhost:3000/callback',
            grant_type: 'refresh_token',
            client_id: env.CLIENT_ID,
            client_secret: env.CLIENT_SECRET
        })
    }).then(response => response.json());
}

export default {search, findSong, findAlbum, findArtist, fetchTokens, refreshToken};