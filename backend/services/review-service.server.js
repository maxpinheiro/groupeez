const {generateId} = require('../utils/utils');

let reviews = [...(require('./reviews.json'))];

const findAllReviews = () => reviews;

const findReviewById = (reviewId) => reviews.find(review => review.id === reviewId);

const createReview = (review) => {
    let id = generateId(10);
    // can't have two reviews with the same id
    while (reviews.find(u => u.id === id)) {
        id = generateId(10);
    }
    reviews.push({id, creator: review.creator, creatorId: review.creatorId, songId: review.songId, text: review.text});
    console.log('reviews: ' + reviews);
    return {id, creator: review.creator, creatorId: review.creatorId, songId: review.songId, text: review.text};
}


module.exports = {findAllReviews, findReviewById, createReview};