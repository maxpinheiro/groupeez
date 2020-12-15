const root = 'http://localhost:4000';
const root2 = 'https://nameless-plateau-81307.herokuapp.com/';
const findAllArtists = () => {
    return fetch(`${root2}/api/artists`)
        .then(response => response.json());
};

const findArtistById = (artistId) => {
    return fetch(`${root2}/api/artists/${artistId}`)
        .then(response => response.json());
};

const findArtistBySpotifyId = (spotifyId) => {
    return fetch(`${root2}/api/artists/${spotifyId}`)
        .then(response => response.json());
};

const createArtist = (listener) => {
};

const updateArtist = (listenerId, newListener) => {

};

const deleteArtist = (listenerId, newListener) => {

};

const queryArtist = (query) => {
    return fetch(`http://localhost:4000/api/artists/search/${query}`)
        .then(response => response.json());
};

export default {findAllArtists, findArtistById, findArtistBySpotifyId, createArtist, updateArtist, deleteArtist, queryArtist};