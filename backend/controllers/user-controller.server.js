const userService = require('../services/user-service.server');

module.exports = function (app) {
    app.post('/api/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        userService.findAllUsers().then(users => {
            const user = users.find(u => u.username === username);
            if (user) {
                if (user.password === password) {
                    userService.setCurrentUser(user);
                    res.json(user);
                } else {
                    res.json({error: "Invalid password"});
                }
            } else {
                res.json({error: "Invalid username"});
            }
        })
        /*
        userService.findUserByCredentials(username).then(user => {
            console.log('user: ' + user.password + user.username);
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
        })*/
    });

    app.post('/api/register', (req, res) => {
        const newUser = req.body;
        const user = userService.createUser(newUser);
        if (user) {
            userService.setCurrentUser(user);
            res.json(user);
        } else {
            res.json({error: "Username already exists"});
        }
    });

    app.post('/api/logout', (req, res) => {
        userService.setCurrentUser(null);
        res.status(200);
    });

    app.get('/api/currentUser', (req, res) => {
        const currentUser = userService.getCurrentUser();
        if (currentUser) res.json(currentUser);
        else res.json({error: "No current user"});
    });

    app.get('/api/users', (req, res) => {
        userService.findAllUsers().then(users => {
            res.json(users);
        })
    });

    app.get('/api/users/:userId', (req, res) => {
        const userId = req.params.userId;
        if (userId !== 'undefined') {
            userService.findUserById(userId).then(user => {
                if (user) res.json(user);
                else res.json({error: "No user with id"});
            })
        } else res.json({error: "No id provided"});
    });

    app.get('/api/accessToken', (req, res) => {
        const accessToken = userService.getAccessToken();
        if (accessToken) res.json(accessToken);
        else res.json({error: "No current access token"});
    });

    app.post('/api/accessToken', (req, res) => {
        const accessToken = req.body.accessToken;
        userService.setAccessToken(accessToken);
        res.json({message: "all good"});
    });

    app.get('/api/refreshToken', (req, res) => {
        const refreshToken = userService.getRefreshToken();
        if (refreshToken) res.json(refreshToken);
        else res.json({error: "No current access token"});
    });

    app.post('/api/refreshToken', (req, res) => {
        const refreshToken = req.body.refreshToken;
        userService.setRefreshToken(refreshToken);
        res.json({message: "all good"});
    });
}