const artistsDao = require('../daos/artists.dao.server');

const findAllArtists = () => artistsDao.findAllArtists();

const findArtistById = (artistId) => artistsDao.findArtistById(artistId);

const findArtistBySpotifyId = (spotifyId) => artistsDao.findArtistBySpotifyId(spotifyId);

const createArtist = (artist) => artistsDao.createArtist(artist);

const queryArtist = (query) => artistsDao.queryArtist(query);

const createPostForArtist = (artistId, postId) => artistsDao.createPostForArtist(artistId, postId);

const deletePostForArtist = (artistId, postId) => artistsDao.deletePostForArtist(artistId, postId);

const createReviewForArtist = (artistUser, reviewId) => artistsDao.createReviewForArtist(artistUser, reviewId);

const deleteReviewForArtist = (artistUser, reviewId) => artistsDao.deleteReviewForArtist(artistUser, reviewId);

module.exports = {findAllArtists, findArtistById, findArtistBySpotifyId, createArtist, queryArtist, createPostForArtist, deletePostForArtist, createReviewForArtist, deleteReviewForArtist};