const mongoose = require('mongoose');
const reviewsSchema = require('./reviews.schema.server');

const reviewsModel = mongoose.model('PostsModel', reviewsSchema);

module.exports = reviewsModel;