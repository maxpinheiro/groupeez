const postsModel = require('../models/posts.model.server');

const findAllPosts = () => postsModel.find();

const findPostById = (postId) => postsModel.findById(postId);

const createPost = (post) => postsModel.create(post);

const updatePost = (postId, newPost) => postsModel.update({_id: postId}, {$set: newPost});

const deletePost = (postId) => postsModel.remove({_id: postId});

const queryPost = (query) => postsModel.find();

module.exports = {findAllPosts, findPostById, createPost, updatePost, deletePost, queryPost};