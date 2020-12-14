const {generateId, stringSimilarity} = require('../utils/utils');
const artistsDao = require('../daos/artists.dao.server');

const findAllArtists = () => artistsDao.findAllArtists();

const findArtistById = (artistId) => artistsDao.findArtistById(artistId);

const findArtistBySpotifyId = (spotifyId) => artistsDao.findArtistBySpotifyId(spotifyId);

const createArtist = (artist) => artistsDao.createArtist(artist);

const queryArtist = (query) => artistsDao.queryArtist(query);

const createPostForArtist = (artistId, postId) => artistsDao.createPostForArtist(artistId, postId);

/*
let artists = [...(require('./artists.json'))];

const findAllArtists = () => artists;

const findArtistById = (artistId) => artists.find(artist => artist.id === artistId);

const findArtistBySpotifyId = (spotifyId) => artists.find(artist => artist.spotifyId === spotifyId);

const createArtist = (artist) => {
    artists.push({id: artist.id, username: artist.username, name: 'New user', spotifyId: artist.spotifyId, bio: ''});
    return {id: artist.id, username: artist.username, name: 'New user', spotifyId: artist.spotifyId, bio: ''};
}

const queryArtist = (query) => artists.filter(a => stringSimilarity(query, a.username) >= 0.6 || stringSimilarity(query, a.name) >= 0.6);

const createPostForArtist = (artistId, postId) => {
    const artist = artists.find(a => a.id === artistId);
    if (!artist) return 0;
    artists[artists.indexOf(artist)] = {...artist, posts: [...artist.posts, postId]};
    return 1;
}
*/

module.exports = {findAllArtists, findArtistById, findArtistBySpotifyId, createArtist, queryArtist, createPostForArtist};