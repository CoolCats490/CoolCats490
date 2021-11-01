const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {type: String, required: true, minlength: 3},
    time: {type: String},
    type: {type:String},
    description: {type:String}
    },
    {timestamps: true});

module.exports = mongoose.model('Activity', activitySchema);
