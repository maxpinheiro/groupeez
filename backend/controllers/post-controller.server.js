const postService = require('../services/post-service.server');

module.exports = function (app) {
    app.get('/api/posts', (req, res) => {
        const posts = postService.findAllPosts();
        res.json(posts);
    });
    app.get('/api/posts/:postId', (req, res) => {
        const postId = req.params.postId;
        const post = postService.findPostById(postId);
        if (post) res.json(post);
        else res.json({error: "No post with id"});
    });
    app.post('/api/posts', (req, res) => {
        const newPost = req.body;
        const post = postService.createPost(newPost);
        if (post) res.json(post);
        else res.json({error: "Could not create post"});
    });
    app.put('/api/posts/:postId', (req, res) => {
        const postId = req.params.postId;
        const newPost = req.body;
        const post = postService.updatePost(postId, newPost);
        if (post) res.json(post);
        else res.json({error: "Could not update post"});
    });
    app.delete('/api/posts/:postId', (req, res) => {
        const postId = req.params.postId;
        const newPost = req.body;
        const status = postService.deletePost(postId, newPost);
        res.send(status);
    });
    app.get('/api/posts/search/:query', (req, res) => {
        const query = req.params.query;
        const posts = postService.queryPost(query);
        res.json(posts);
    });
}