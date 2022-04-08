const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema =  new Schema({
    username: {type: String, required: true, unique: true, minlength: 3},
    age: {type: Date},
    interests: [{type: String}],
    password: {type: String},
    email: {type: String, required: true, unique: true},
    firstname: {type: String, required: true},
    lastname: {type:String, required:true},
    createdAt:{type:Date, default:Date.now()},
    profileBio:{type:String},
    profilePic:{type:String},
    hideProfile:{type:Boolean},
    displayCreatedGroups:{type:Boolean},
    displayJoinedGroups:{type:Boolean}

});

module.exports = mongoose.model('User', userSchema);