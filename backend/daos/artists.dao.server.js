const artistsModel = require('../models/artists.model.server');

const findAllArtists = () => artistsModel.find();

const findArtistById = (artistId) => artistsModel.findById(artistId);

const findArtistBySpotifyId = (spotifyId) => artistsModel.find({"spotifyId": spotifyId});

const createArtist = (artist) => artistsModel.create(artist);

const queryArtist = (query) => artistsModel.find();

const createPostForArtist = (artistId, postId) => artistsModel.update({_id: artistId}, {$push: {posts: postId}});

module.exports = {findAllArtists, findArtistById, findArtistBySpotifyId, createArtist, queryArtist, createPostForArtist};