const root = 'http://localhost:4000';

const findAllArtists = () => {
    return fetch(`${root}/api/artists`)
        .then(response => response.json());
};

const findArtistById = (artistId) => {
    return fetch(`${root}/api/artists/${artistId}`)
        .then(response => response.json());
};

const findArtistBySpotifyId = (spotifyId) => {
    return fetch(`${root}/api/artists/${spotifyId}`)
        .then(response => response.json());
};

const updateArtist = (artistId, newArtist) => {
    return fetch(`${root}/api/artists/${artistId}`, {
        method: `PUT`,
        body: JSON.stringify(newArtist),
        headers: {
            "content-type" : "application/json"
        }
    }).then(response => response.json());
};

const queryArtist = (query) => {
    return fetch(`${root}/api/artists/search/${query}`)
        .then(response => response.json());
};

export default {findAllArtists, findArtistById, findArtistBySpotifyId, updateArtist, queryArtist};