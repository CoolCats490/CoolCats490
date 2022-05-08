const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {type: String, required: true, minlength: 3},
    createdBy:[
        {
            id:{type:String},
            username:{type:String}
        }
    ],
    time: {type: String},
    type: {type:String},
    description: {type:String},
    tagsArray: [{type: String}],
    groupPic:{type:String},
    address:{type:String},
    location:[{
        lat:{type:String},
        lng:{type:String}
    }],
    members: [
        {
            id:{type:String},
            username:{type:String},
            profilePic:{type:String}
        }
    ]
    },
    {timestamps: true});

module.exports = mongoose.model('Activity', activitySchema);
