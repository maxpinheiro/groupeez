const {generateId} = require('../utils/utils');
const artistService = require('./artist-service.server');
const listenerService = require('./listener-service.server');
const usersDao = require('../daos/users.dao.server');

let currentUser = null;
let accessToken = null;
let refreshToken = null;

const findAllUsers = () => usersDao.findAllUsers();

const findUserByCredentials = (username) => usersDao.findUserByCredentials(username);

const findUserById = (userId) => usersDao.findUserById(userId);

const createUser = (user) => {
    if (user.role === 'artist') {
        artistService.createArtist(user);
    } else if (user.role === 'listener') {
        listenerService.createListener(user);
    }
    return usersDao.createUser(user);
}

const getCurrentUser = () => currentUser;
const setCurrentUser = (user) => currentUser = user;

const getAccessToken = () => accessToken;
const setAccessToken = (token) => accessToken = token;

const getRefreshToken = () => refreshToken;
const setRefreshToken = (token) => refreshToken = token;

module.exports = {findAllUsers, findUserByCredentials, findUserById, createUser, getCurrentUser, setCurrentUser, getAccessToken, setAccessToken, getRefreshToken, setRefreshToken};