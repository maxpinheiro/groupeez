import env from '../private.json';

const queryString = require('querystring');
type searchQuery = {q: string};
const searchUrl: string = 'https://api.spotify.com/v1/search';

export const search: (params: searchQuery, accessToken: string) => Promise<JSON> = (queryParams: searchQuery, accessToken: string) => {
    return fetch(`${searchUrl}?${queryString.stringify(queryParams)}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(response => response.json());
}

export const findSong: (songId: string, accessToken: string) => Promise<JSON> = (songId: string, accessToken: string) => {
    return fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(response => response.json());
}

export const fetchTokens: (authCode: string) => Promise<JSON> = (authCode: string) => {
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