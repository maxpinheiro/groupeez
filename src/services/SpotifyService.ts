const queryString = require('querystring');

type searchQuery = {q: string};

const searchUrl: string = 'https://api.spotify.com/v1/search';

export const search: (params: searchQuery) => Promise<JSON> = (queryParams: searchQuery) => {
    return fetch(`${searchUrl}?${queryString.stringify(queryParams)}`, {
        headers: {
            Authorization: ''
        }
    }).then(response => response.json());
}

export const fetchTokens: (authCode: string) => Promise<JSON> = (authCode: string) => {
    const body = {
        code: authCode,
        redirect_uri: 'http://localhost:3000/callback',
        grant_type: 'authorization_code',
        client_id: 'bfc0e2b164624c0caa413825fab9fa36',
        client_secret: '2686fc23d0974cccb88e31551f0424c0'
    };
    return fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: queryString.stringify(body)
    }).then(response => response.json());
}