const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    username: String,
    password: String,
    id: mongoose.Schema.Types.ObjectId,
    role: {type: String, enum: ['artist', 'listener']}
}, {collection: 'users'});

module.exports = usersSchema;