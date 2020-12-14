const postsModel = require('../models/posts.model.server');

const findAllPosts = () => postsModel.find();

const findPostById = (postId) => postsModel.findById(postId);

const createPost = (post) => {

}

const updatePost = (postId, newPost) => {

}

const deletePost = (postId) => {

}

const queryPost = (query) => postsModel.find();

module.exports = {findAllPosts, findPostById, createPost, updatePost, deletePost, queryPost};