const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {type: String, required: true, minlength: 3},
    location: {type: String },
    tags: {enum: ['Video game', 'concert', 'dinner', 'movie', 'game', 'hike', 'cultural event', 'hangout']},
    numberOfPeopleNeeded: {type:Number, min: 1},
    time: {type: String},
    type: {enum: ['In-person', 'Online']},
    },
    {timestamps: true});

const Activity = mongoose.model('Activity', activitySchema);
module.export = Activity;