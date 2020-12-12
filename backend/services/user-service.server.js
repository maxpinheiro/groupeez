const {generateId} = require('../utils/utils');
const artistService = require('./artist-service.server');
const listenerService = require('./listener-service.server');

let users = [...(require('./users.json'))];
let currentUser = null;
let accessToken = null;
let refreshToken = null;

const findAllUsers = () => users;

const findUserByCredentials = (username) => users.find(user => user.username === username);

const findUserById = (userId) => users.find(user => user.id === userId);

const createUser = (user) => {
    // can't have two users with the same username
    if (users.find(u => u.username === user.username)) {
        return null;
    } else {
        let id = generateId(10);
        // can't have two users with the same id
        while (users.find(u => u.id === id)) {
            id = generateId(10);
        }
        users.push({id, username: user.username, password: user.password, role: user.role});
        // add user to artist/listener database
        if (user.role === 'artist') {
            artistService.createArtist(user);
        } else {
            listenerService.createListener(user);
        }

        return {id, username: user.username, password: user.password, role: user.role};
    }
}

const getCurrentUser = () => currentUser;
const setCurrentUser = (user) => currentUser = user;

const getAccessToken = () => accessToken;
const setAccessToken = (token) => accessToken = token;

const getRefreshToken = () => refreshToken;
const setRefreshToken = (token) => refreshToken = token;

module.exports = {findAllUsers, findUserByCredentials, findUserById, createUser, getCurrentUser, setCurrentUser, getAccessToken, setAccessToken, getRefreshToken, setRefreshToken};