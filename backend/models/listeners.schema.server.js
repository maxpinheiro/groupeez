const mongoose = require('mongoose');

const listenersSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: String,
    name: String,
    bio: String,
    profileUrl: String,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'ReviewsModel'}],
    favorites: [String],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'ArtistsModel'}],
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'ListenersModel'}]
}, {collection: 'listeners'});

module.exports = listenersSchema;