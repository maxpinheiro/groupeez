const reviewService = require('../services/review-service.server');
const listenerService = require('../services/listener-service.server');
const artistService = require('../services/artist-service.server');

module.exports = function (app) {
    app.get('/api/reviews', (req, res) => {
        reviewService.findAllReviews().then(reviews => res.json(reviews));
    });
    app.get('/api/reviews/:reviewId', (req, res) => {
        const reviewId = req.params.reviewId;
        reviewService.findReviewById(reviewId).then(review => {
            if (review) res.json(review);
            else res.json({error: "No review with id"});
        });
    });
    app.post('/api/reviews', (req, res) => {
        const newReview = req.body.newReview;
        const artistUser = req.body.artistUser;
        reviewService.createReview(newReview).then(review => {
            if (review) {
                listenerService.createReviewForListener(newReview.creatorId, review._id).then(status => {
                    if (artistUser && artistUser !== '') {
                        artistService.createReviewForArtist(artistUser, review._id).then(status => res.json(review));
                    } else {
                        res.json(review);
                    }
                });
            }
            else res.json({error: "Could not create review"});
        });
    });
    app.put('/api/reviews/:reviewId', (req, res) => {
        const reviewId = req.params.reviewId;
        const newReview = req.body;
        reviewService.updateReview(reviewId, newReview).then(status => {
            if (status.ok === 1) res.json(newReview);
            else res.json({error: "Could not update review"});
        });
    });
    app.delete('/api/reviews/:reviewId', (req, res) => {
        const reviewId = req.params.reviewId;
        const creatorId = req.body.creatorId;
        const artistUser = req.body.artistUser;
        reviewService.deleteReview(reviewId).then(status => {
            if (status.ok === 1) {
                listenerService.deleteReviewForListener(creatorId, reviewId).then(status => {
                    if (artistUser && artistUser !== '') {
                        artistService.deleteReviewForArtist(artistUser, reviewId).then(status => res.json({message: "deleted"}));
                    } else {
                        res.json({message: "deleted"})
                    }
                });
            }
            else res.json({error: "Could not delete review"});
        });
    });
    app.get('/api/reviews/search/:query', (req, res) => {
        const query = req.params.query;
        reviewService.queryReview(query).then(reviews => res.json(reviews));
    });
}