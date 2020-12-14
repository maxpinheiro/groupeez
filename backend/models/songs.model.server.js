const mongoose = require('mongoose');
const songsSchema = require('./songs.schema.server');

const songsModel = mongoose.model('SongsModel', songsSchema);

module.exports = songsModel;