const userService = require('../services/user-service.server');

module.exports = function (app) {
    app.post('/api/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = userService.findUserByCredentials(username, password);
        if (user) {
            if (user.password === password) {
                res.status(200).json(user);
            } else {
                res.status(401).json({error: "Invalid password"});
            }
        } else {
            res.status(404).json({error: "Invalid username"});
        }
    });

    app.post('/api/register', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = userService.createUser(username, password);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(409).json({error: "Username already exists"});
        }
    });
}