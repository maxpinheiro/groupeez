const mongoose = require('mongoose');

const artistsSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: String,
    name: String,
    spotifyId: String,
    bio: String,
    profileUrl: String,
    library: [{type: mongoose.Schema.Types.ObjectId, ref: 'SongsModel'}],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'ReviewsModel'}],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'PostsModel'}],
    groupeez: [{type: mongoose.Schema.Types.ObjectId, ref: 'ListenersModel'}]
}, {collection: 'artists'});

module.exports = artistsSchema;