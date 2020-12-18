const artistsDao = require('../daos/artists.dao.server');

const findAllArtists = () => artistsDao.findAllArtists();

const findArtistById = (artistId) => artistsDao.findArtistById(artistId);

const findArtistBySpotifyId = (spotifyId) => artistsDao.findArtistBySpotifyId(spotifyId);

const createArtist = (artist) => artistsDao.createArtist(artist);

const queryArtist = (query) => artistsDao.queryArtist(query);

const updateArtist = (artistId, artist) => artistsDao.updateArtist(artistId, artist);

const createPostForArtist = (artistId, postId) => artistsDao.createPostForArtist(artistId, postId);

const deletePostForArtist = (artistId, postId) => artistsDao.deletePostForArtist(artistId, postId);

const createReviewForArtist = (artistId, reviewId) => artistsDao.createReviewForArtist(artistId, reviewId);

const deleteReviewForArtist = (artistId, reviewId) => artistsDao.deleteReviewForArtist(artistId, reviewId);

module.exports = {findAllArtists, findArtistById, findArtistBySpotifyId, createArtist, queryArtist, updateArtist, createPostForArtist, deletePostForArtist, createReviewForArtist, deleteReviewForArtist};