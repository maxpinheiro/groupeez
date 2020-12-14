const {generateId, stringSimilarity} = require('../utils/utils');
const reviewsDao = require('../daos/reviews.dao.server');

const findAllReviews = () => reviewsDao.findAllReviews();

const findReviewById = (reviewId) => reviewsDao.findReviewById(reviewId);

const createReview = (review) => reviewsDao.createReview(review);

const updateReview = (reviewId, newReview) => reviewsDao.updateReview(reviewId, newReview);

const deleteReview = (reviewId) => reviewsDao.deleteReview(reviewId);

const queryReview = (query) => reviewsDao.queryReview(query);

/*
let reviews = [...(require('./reviews.json'))];

const findAllReviews = () => reviews;

const findReviewById = (reviewId) => reviews.find(review => review.id === reviewId);

const createReview = (review) => {
    let id = generateId(10);
    // can't have two reviews with the same id
    while (reviews.find(u => u.id === id)) {
        id = generateId(10);
    }
    reviews.push({id, creator: review.creator, creatorId: review.creatorId, songId: review.songId, title: review.title, text: review.text});
    return {id, creator: review.creator, creatorId: review.creatorId, songId: review.songId, title: review.title, text: review.text};
}

const updateReview = (reviewId, newReview) => {
    const reviewIdx = reviews.indexOf(reviews.find(r => r.id === reviewId));
    if (reviewIdx === -1) return 0;
    reviews.splice(reviewIdx, 1, newReview);
    return 1;
}

const deleteReview = (reviewId) => {
    const reviewIdx = reviews.indexOf(reviews.find(r => r.id === reviewId));
    if (reviewIdx === -1) return 0;
    reviews.splice(reviewIdx, 1);
    return 1;
}

const queryReview = (query) => reviews.filter(r => stringSimilarity(query, r.title) >= 0.6);
*/

module.exports = {findAllReviews, findReviewById, createReview, updateReview, deleteReview, queryReview};