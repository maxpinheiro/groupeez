const findAllPosts = () => {
    return fetch('http://localhost:4000/api/posts')
        .then(response => response.json());
};

const findPostById = (postId) => {
    return fetch(`http://localhost:4000/api/posts/${postId}`)
        .then(response => response.json());
};

const createPost = (newPost) => {
    return fetch('http://localhost:4000/api/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
};

const updatePost = (postId, post) => {
    return fetch(`http://localhost:4000/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
};

const deletePost = (postId) => {
    return fetch(`http://localhost:4000/api/posts/${postId}`, {
        method: 'DELETE'
    }).then(response => response.json());
};

const queryPost = (query) => {
    return fetch(`http://localhost:4000/api/posts/search/${query}`)
        .then(response => response.json());
};

export default {findAllPosts, findPostById, createPost, updatePost, deletePost, queryPost};