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
    app.post('/api/reviews', (req, res) => {
        const newReview = req.body;
        const review = reviewService.createReview(newReview);
        if (review) res.json(review);
        else res.json({error: "Could not create review"});
    });
    app.put('/api/reviews/:reviewId', (req, res) => {
        const reviewId = req.params.reviewId;
        const newReview = req.body;
        const review = reviewService.updateReview(reviewId, newReview);
        if (review) res.json(review);
        else res.json({error: "Could not update review"});
    });
    app.delete('/api/reviews/:reviewId', (req, res) => {
        const reviewId = req.params.reviewId;
        const newReview = req.body;
        const status = reviewService.deleteReview(reviewId, newReview);
        res.send(status);
    });
    app.get('/api/reviews/search/:query', (req, res) => {
        const query = req.params.query;
        const reviews = reviewService.queryReview(query);
        res.json(reviews);
    });
}