const usersModel = require('../models/users.model.server');

const findAllUsers = () => usersModel.find();

const findUserByCredentials = (username) => usersModel.find({"username": username});

const findUserById = (userId) => usersModel.findById(userId);

const createUser = (user) => {

}

module.exports = {findAllUsers, findUserByCredentials, findUserById, createUser};