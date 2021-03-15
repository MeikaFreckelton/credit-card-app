const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

userSchema.plugin(uniqueValidator);

module.exports = User = mongoose.model('User', User);