// first we need to create a router
const router = require('express').Router();

// we need user variable to use the user model
let Activity = require('../models/activities.model');

//now we need to specify that if we recieve a '/get' request from the server,
// then what are we gonna do with the database
router.route('/').get((req,res) => {
    //its gonna go to user, find users and then return json file of users
    Activity.find().then(activities => res.json(activities)).catch(err => res.status(400).json('Error: ' + err));
});


// what to do if we get '/add' request from server
// First we get the information from the server, and then create a new user from that informatin and
// then finally save it to the database as json file and print the message "User added!"
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const tags = req.body.tags;
    const numberOfPeopleNeeded = Number(req.body.numberOfPeopleNeeded);
    const time = req.body.time;
    const type = req.body.type;

    const newActivity = new User({
        name,
        location,
        tags,
        numberOfPeopleNeeded,
        time,
        type
    });

    newActivity.save().then(()=> res.json('Activity added!')).catch(err => res.status(400).json('Error: ' + err));


});

// and we export the module via router
module.exports = router;