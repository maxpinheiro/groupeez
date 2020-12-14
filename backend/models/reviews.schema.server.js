const mongoose = require('mongoose');

const reviewsSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    creator: String,
    creatorId: {type: mongoose.Schema.Types.ObjectId, ref: 'ListenersModel'},
    songId: String,
    title: String,
    text: String
}, {collection: 'reviews'});

module.exports = reviewsSchema;