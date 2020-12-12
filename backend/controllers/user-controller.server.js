const userService = require('../services/user-service.server');

module.exports = function (app) {
    app.post('/api/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = userService.findUserByCredentials(username);
        if (user) {
            if (user.password === password) {
                req.session['currentUser'] = user;
                userService.setCurrentUser(user);
                res.json(user);
            } else {
                res.json({error: "Invalid password"});
            }
        } else {
            res.json({error: "Invalid username"});
        }
    });

    app.post('/api/register', (req, res) => {
        const newUser = req.body;
        const user = userService.createUser(newUser);
        if (user) {
            //req.session['currentUser'] = user;
            userService.setCurrentUser(user);
            res.json(user);
        } else {
            res.json({error: "Username already exists"});
        }
    });

    app.post('/api/logout', (req, res) => {
        //req.session.destroy();
        userService.setCurrentUser(null);
        res.status(200);
    });

    app.get('/api/currentUser', (req, res) => {
        //const currentUser = req.session['currentUser'];
        const currentUser = userService.getCurrentUser();
        if (currentUser) res.json(currentUser);
        else res.json({error: "No current user"});
    });

    app.get('/api/users', (req, res) => {
        const users = userService.findAllUsers();
        res.json(users);
    });

    app.get('/api/users/:userId', (req, res) => {
        const userId = req.params.userId;
        const user = userService.findUserById(userId);
        if (user) res.json(user);
        else res.json({error: "No user with id"});
    });

    app.get('/api/accessToken', (req, res) => {
        //const currentUser = req.session['currentUser'];
        const accessToken = userService.getAccessToken();
        if (accessToken) res.json(accessToken);
        else res.json({error: "No current access token"});
    });

    app.post('/api/accessToken', (req, res) => {
        //const currentUser = req.session['currentUser'];
        const accessToken = req.body.accessToken;
        userService.setAccessToken(accessToken);
        res.json({message: "all good"});
    });
}