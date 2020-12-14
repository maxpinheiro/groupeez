const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    type: {type: String, enum: ['tour', 'message']},
    artist: String,
    artistId: {type: mongoose.Schema.Types.ObjectId, ref: 'ArtistsModel'},
    title: String,
    text: String
}, {collection: 'posts'});

module.exports = postsSchema;