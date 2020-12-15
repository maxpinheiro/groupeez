const postService = require('../services/post-service.server');
const artistService = require('../services/artist-service.server');

module.exports = function (app) {
    app.get('/api/posts', (req, res) => {
        postService.findAllPosts().then(posts => res.json(posts));
    });
    app.get('/api/posts/:postId', (req, res) => {
        const postId = req.params.postId;
        if (postId) {
            postService.findPostById(postId).then(post => {
                if (post) res.json(post);
                else res.json({error: "No post with id"});
            });
        }
    });
    app.post('/api/posts', (req, res) => {
        const newPost = req.body;
        postService.createPost(newPost).then(post => {
            if (post) {
                artistService.createPostForArtist(newPost.artistId, post._id).then(status => res.json(post));
            }
            else res.json({error: "Could not create post"});
        });
    });
    app.put('/api/posts/:postId', (req, res) => {
        const postId = req.params.postId;
        const newPost = req.body;
        postService.updatePost(postId, newPost).then(status => {
            if (status.ok === 1) res.json(newPost);
            else res.json({error: "Could not update post"});
        });
    });
    app.delete('/api/posts/:postId', (req, res) => {
        const postId = req.params.postId;
        const artistId = req.body.artistId;
        postService.deletePost(postId).then(status => {
            if (status.ok === 1) {
                console.log(artistId + ', ' + postId);
                artistService.deletePostForArtist(artistId, postId).then(response => res.json({message: "deleted"}));
            }
            else res.json({error: "Could not delete post"});
        });
    });
    app.get('/api/posts/search/:query', (req, res) => {
        const query = req.params.query;
        postService.queryPost(query).then(posts => res.json(posts));
    });
}