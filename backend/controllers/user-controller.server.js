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
        const username = req.body.username;
        const password = req.body.password;
        const user = userService.createUser(username, password);
        if (user) {
            req.session['currentUser'] = user;
            userService.setCurrentUser(user);
            res.json(user);
        } else {
            res.json({error: "Username already exists"});
        }
    });

    app.post('/api/logout', (req, res) => {
        req.session.destroy();
        userService.setCurrentUser(null);
        res.status(200);
    });

    app.get('/api/currentUser', (req, res) => {
        //const currentUser = req.session['currentUser'];
        const currentUser = userService.getCurrentUser();
        if (currentUser) res.json(currentUser);
        else res.json({error: "No current user"});
    });
}