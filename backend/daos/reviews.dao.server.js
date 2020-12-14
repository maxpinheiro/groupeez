const reviewsModel = require('../models/reviews.model.server');

const findAllReviews = () => reviewsModel.find();

const findReviewById = (reviewId) => reviewsModel.findById(reviewId);

const createReview = (review) => {

}

const updateReview = (reviewId, newReview) => {

}

const deleteReview = (reviewId) => {

}

const queryReview = (query) => reviewsModel.find();

module.exports = {findAllReviews, findReviewById, createReview, updateReview, deleteReview, queryReview};