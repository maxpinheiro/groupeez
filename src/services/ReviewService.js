const findAllReviews = () => {
    return fetch('http://localhost:4000/api/reviews')
        .then(response => response.json());
};

const findReviewById = (reviewId) => {
    return fetch(`http://localhost:4000/api/reviews/${reviewId}`)
        .then(response => response.json());
};

const createReview = (newReview) => {
    return fetch('http://localhost:4000/api/reviews', {
        method: 'POST',
        body: JSON.stringify(newReview),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
};

const updateReview = (reviewId, review) => {
    return fetch(`http://localhost:4000/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify(review),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
};

const deleteReview = (reviewId) => {
    return fetch(`http://localhost:4000/api/reviews/${reviewId}`, {
        method: 'DELETE'
    }).then(response => response.json());
};

export default {findAllReviews, findReviewById, createReview, updateReview, deleteReview};