const artistsModel = require('../models/artists.model.server');

const findAllArtists = () => artistsModel.find();

const findArtistById = (artistId) => artistsModel.findById(artistId);

const findArtistBySpotifyId = (spotifyId) => artistsModel.find({"spotifyId": spotifyId});

const createArtist = (artist) => artistsModel.create(artist);

const queryArtist = (query) => artistsModel.find();

const updateArtist = (artistId, artist) => artistsModel.update({_id: artistId}, {$set: {bio: artist.bio}});

const createPostForArtist = (artistId, postId) => artistsModel.update({_id: artistId}, {$push: {posts: postId}});

const deletePostForArtist = (artistId, postId) => artistsModel.update({_id: artistId}, {$pull: {posts: postId}});

const createReviewForArtist = (artistId, reviewId) => artistsModel.update({_id: artistId}, {$push: {reviews: reviewId}});

const deleteReviewForArtist = (artistId, reviewId) => artistsModel.update({_id: artistId}, {$pull: {reviews: reviewId}});

module.exports = {findAllArtists, findArtistById, findArtistBySpotifyId, createArtist, queryArtist, updateArtist, createPostForArtist, deletePostForArtist, createReviewForArtist, deleteReviewForArtist};