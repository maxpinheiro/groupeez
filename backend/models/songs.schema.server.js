const mongoose = require('mongoose');

const songsSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    artists: [String],
    artistIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'ArtistsModel'}],
    images: [String]
}, {collection: 'songs'});

module.exports = songsSchema;