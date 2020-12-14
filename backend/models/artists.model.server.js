const mongoose = require('mongoose');
const artistsSchema = require('./users.schema.server');

const artistsModel = mongoose.model('ArtistsModel', artistsSchema);

module.exports = artistsModel;