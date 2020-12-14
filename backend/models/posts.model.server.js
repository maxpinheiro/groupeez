const mongoose = require('mongoose');
const postsSchema = require('./posts.schema.server');

const postsModel = mongoose.model('PostsModel', postsSchema);

module.exports = postsModel;