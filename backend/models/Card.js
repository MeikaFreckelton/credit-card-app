const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Cards = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    cardNumber: {
        type: Number,
        required: true,
        unique: true
    },
    cardName: {
        type: String,
        required: true,
        unique: false
    },
    expiryMonth: {
        type: Number,
        required: true,
        unique: false
    },
    expiryYear: {
        type: Number,
        required: true,
        unique: false
    },
    cvv: {
        type: Number,
        required: true,
        unique: false
    }
})

module.exports = User = mongoose.model('Cards', Cards);