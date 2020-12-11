const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'something'
}));

//mongoose.connect('mongodb://localhost/whiteboard', {useNewUrlParser: true});

// general preprocessing for all requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
})

app.get('/api', (req, res) => {
    res.send(req.session['currentUser']);
})

require('./controllers/user-controller.server')(app);
require('./controllers/artist-controller.server')(app);
require('./controllers/listener-controller.server')(app);
require('./controllers/song-controller.sever')(app);
require('./controllers/review-controller.sever')(app);

app.listen(4000, () => console.log("Listening on port 4000..."));