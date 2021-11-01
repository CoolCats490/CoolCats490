const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema =  new Schema({
    username: {type: String, required: true, unique: true, minlength: 3},
    age: {type: Number, min: 18 },
    interests: {type: String}
});

module.exports = mongoose.model('User', userSchema);