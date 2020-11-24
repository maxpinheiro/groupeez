const queryString = require('querystring');

type searchQuery = {q: string};
type restful = (params: searchQuery) => Promise<JSON>;

const searchUrl: string = 'https://api.spotify.com/v1/search';

export const search: restful = (queryParams: searchQuery) => {
    return fetch(`${searchUrl}?${queryString.stringify(queryParams)}`, {
        headers: {
            Authorization: ''
        }
    }).then(response => response.json());
}