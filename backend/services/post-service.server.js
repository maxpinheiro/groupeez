const {generateId, stringSimilarity} = require('../utils/utils');

let posts = [...(require('./posts.json'))];

const findAllPosts = () => posts;

const findPostById = (postId) => posts.find(post => post.id === postId);

const createPost = (post) => {
    let id = generateId(10);
    // can't have two posts with the same id
    while (posts.find(u => u.id === id)) {
        id = generateId(10);
    }
    posts.push({id, creator: post.creator, creatorId: post.creatorId, songId: post.songId, text: post.text});
    console.log('posts: ' + posts);
    return {id, creator: post.creator, creatorId: post.creatorId, songId: post.songId, text: post.text};
}

const updatePost = (postId, newPost) => {
    const postIdx = posts.indexOf(posts.find(p => p.id === postId));
    if (postIdx === -1) return 0;
    posts.splice(postIdx, 1, newPost);
    return 1;
}

const deletePost = (postId) => {
    const postIdx = posts.indexOf(posts.find(p => p.id === postId));
    if (postIdx === -1) return 0;
    posts.splice(postIdx, 1);
    return 1;
}

const queryPost = (query) => posts.filter(p => stringSimilarity(query, p.title) >= 0.6);

module.exports = {findAllPosts, findPostById, createPost, updatePost, deletePost, queryPost};