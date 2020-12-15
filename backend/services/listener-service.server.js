const {stringSimilarity} = require('../utils/utils');
const listenersDao = require('../daos/listeners.dao.server');

const findAllListeners = () => listenersDao.findAllListeners();

const findListenerById = (listenerId) => listenersDao.findListenerById(listenerId);

const createListener = (listener) => listenersDao.createListener(listener);

const queryListener = (query) => listenersDao.queryListener(query);

const createReviewForListener = (listenerId, reviewId) => listenersDao.createReviewForListener(listenerId, reviewId);

const deleteReviewForListener = (listenerId, reviewId) => listenersDao.deleteReviewForListener(listenerId, reviewId);

module.exports = {findAllListeners, findListenerById, createListener, queryListener, createReviewForListener, deleteReviewForListener}