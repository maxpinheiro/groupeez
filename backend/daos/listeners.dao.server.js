const listenersModel = require('../models/listeners.model.server');

const findAllListeners = () => listenersModel.find();

const findListenerById = (listenerId) => listenersModel.findById(listenerId);

const findListenerBySpotifyId = (spotifyId) => listenersModel.find({"spotifyId": spotifyId});

const createListener = (listener) => {

}

const queryListener = (query) => listenersModel.find();

const createReviewForListener = (listenerId, reviewId) => {

}

module.exports = {findAllListeners, findListenerById, findListenerBySpotifyId, createListener, queryListener, createReviewForListener};