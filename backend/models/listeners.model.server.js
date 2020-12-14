const mongoose = require('mongoose');
const listenersSchema = require('./listeners.schema.server');

const listenersModel = mongoose.model('ListenersModel', listenersSchema);

module.exports = listenersModel;