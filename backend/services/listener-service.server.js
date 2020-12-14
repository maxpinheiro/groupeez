const {stringSimilarity} = require('../utils/utils');
const listenersDao = require('../daos/listeners.dao.server');

const findAllListeners = () => listenersDao.findAllListeners();

const findListenerById = (listenerId) => listenersDao.findListenerById(listenerId);

const createListener = (listener) => listenersDao.createListener(listener);

const queryListener = (query) => listenersDao.queryListener(query);

const createReviewForListener = (listenerId, reviewId) => listenersDao.createReviewForListener(listenerId, reviewId);

/*
let listeners = [...(require('./listeners.json'))];

const findAllListeners = () => listeners;

const findListenerById = (listenerId) => listeners.find(listener => listener.id === listenerId);

const createListener = (listener) => {
    listeners.push({id: listener.id, username: listener.username, name: 'New user', bio: ''});
    return {id: listener.id, username: listener.username, name: 'New user', bio: ''};
};

const updateListener = (listenerId, newListener) => {

};

const deleteListener = (listenerId, newListener) => {

};

const queryListener = (query) => listeners.filter(l => stringSimilarity(query, l.username) >= 0.6 || stringSimilarity(query, l.name) >= 0.6);

const createReviewForListener = (listenerId, reviewId) => {
    const listener = listeners.find(l => l.id === listenerId);
    if (!listener) return 0;
    listeners[listeners.indexOf(listener)] = {...listener, reviews: [...listener.reviews, reviewId]};
    return 1;
}
*/

module.exports = {findAllListeners, findListenerById, createListener, queryListener, createReviewForListener}