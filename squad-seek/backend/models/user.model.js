const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema =  new Schema({
    username: {type: String, required: true, unique: true, minlength: 3},
    age: {type: Number, min: 18 },
    interests: {enum: ['online gaming', 'hiking', 'exercising', 'sports', 'food']}
});

module.exports = mongoose.model('User', userSchema);