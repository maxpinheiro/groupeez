const reviewsModel = require('../models/reviews.model.server');

const findAllReviews = () => reviewsModel.find();

const findReviewById = (reviewId) => reviewsModel.findById(reviewId);

const createReview = (review) => reviewsModel.create(review);

const updateReview = (reviewId, newReview) => reviewsModel.update({_id: reviewId}, {$set: newReview});

const deleteReview = (reviewId) => reviewsModel.remove({_id: reviewId});

const queryReview = (query) => reviewsModel.find();

module.exports = {findAllReviews, findReviewById, createReview, updateReview, deleteReview, queryReview};