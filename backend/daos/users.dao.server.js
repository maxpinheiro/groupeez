const usersModel = require('../models/users.model.server');

const findAllUsers = () => usersModel.find();

const findUserByCredentials = (name) => usersModel.find({username: name});

const findUserById = (userId) => usersModel.findById(userId);

const createUser = (user) => usersModel.create(user);

module.exports = {findAllUsers, findUserByCredentials, findUserById, createUser};