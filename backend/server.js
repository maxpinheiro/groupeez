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

const connectionString = 'mongodb+srv://user:user>@cluster0.w3ooj.mongodb.net/groupeez?retryWrites=true&w=majority';
mongoose.connect(connectionString, {useNewUrlParser: true});
//mongoose.connect('mongodb://localhost/groupeez', {useNewUrlParser: true});

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
require('./controllers/song-controller.server')(app);
require('./controllers/review-controller.server')(app);
require('./controllers/post-controller.server')(app);

app.listen(process.env.PORT || 4000, () => console.log("Listening on port" + (process.env.PORT || 4000) + "..."));