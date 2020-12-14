const mongoose = require('mongoose');
const reviewsSchema = require('./reviews.schema.server');

const reviewsModel = mongoose.model('ReviewsModel', reviewsSchema);

module.exports = reviewsModel;