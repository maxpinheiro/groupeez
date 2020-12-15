const root = 'http://localhost:4000';
const root2 = 'https://nameless-plateau-81307.herokuapp.com';

const findAllReviews = () => {
    return fetch(`${root}/api/reviews`)
        .then(response => response.json());
};

const findReviewById = (reviewId) => {
    return fetch(`${root}/api/reviews/${reviewId}`)
        .then(response => response.json());
};

const createReview = (newReview, artistUser) => {
    return fetch(`${root}/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({newReview, artistUser}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
};

const updateReview = (reviewId, review) => {
    return fetch(`${root}/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify(review),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
};

const deleteReview = (reviewId, creatorId, artistUser) => {
    return fetch(`${root}/api/reviews/${reviewId}`, {
        method: 'DELETE',
        body: JSON.stringify({creatorId, artistUser}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
};

const queryReview = (query) => {
    return fetch(`${root}/api/reviews/search/${query}`)
        .then(response => response.json());
};

export default {findAllReviews, findReviewById, createReview, updateReview, deleteReview, queryReview};