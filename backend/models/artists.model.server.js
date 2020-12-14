const mongoose = require('mongoose');
const artistsSchema = require('./artists.schema.server');

const artistsModel = mongoose.model('ArtistsModel', artistsSchema);

module.exports = artistsModel;