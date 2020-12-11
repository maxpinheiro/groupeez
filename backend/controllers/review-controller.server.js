const reviewService = require('../services/review-service.server');

module.exports = function (app) {
    app.get('/api/reviews', (req, res) => {
        const reviews = reviewService.findAllReviews();
        res.json(reviews);
    });
    app.get('/api/reviews/:reviewId', (req, res) => {
        const reviewId = req.params.reviewId;
        const review = reviewService.findReviewById(reviewId);
        if (review) res.json(review);
        else res.json({error: "No review with id"});
    });
}