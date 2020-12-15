const root = 'http://localhost:4000';
const root2 = 'https://nameless-plateau-81307.herokuapp.com/';

const findAllPosts = () => {
    return fetch(`${root2}/api/posts`)
        .then(response => response.json());
};

const findPostById = (postId) => {
    return fetch(`${root2}/api/posts/${postId}`)
        .then(response => response.json());
};

const createPost = (newPost) => {
    return fetch(`${root2}/api/posts`, {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
};

const updatePost = (postId, post) => {
    return fetch(`${root2}/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
};

const deletePost = (postId, artistId) => {
    return fetch(`${root2}/api/posts/${postId}`, {
        method: 'DELETE',
        body: JSON.stringify({artistId}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
};

const queryPost = (query) => {
    return fetch(`${root2}/api/posts/search/${query}`)
        .then(response => response.json());
};

export default {findAllPosts, findPostById, createPost, updatePost, deletePost, queryPost};