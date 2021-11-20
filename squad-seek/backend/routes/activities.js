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
    const name = String(req.body.name);
    const time = Date.parse(req.body.time);
    const type = String(req.body.type);
    const description = String(req.body.description);
    const tagsArray = (req.body.tagsArray)
    
    
    

    const newActivity = new Activity({
        name,
        time,
        type,
        description,
        tagsArray
    });

    newActivity.save().then(()=> res.json('Activity added!')).catch(err => res.status(400).json('Error: ' + err));


});

// when used url http://localhost:5000/activities/id_of_the_activity and made get request
// this will return the specific activity
router.route('/:id').get((req, res) => {
    Activity.findById(req.params.id).then(activity => res.json(activity)).catch(err => res.status(400).json('Error: ' + err));
});
 
// when used url http://localhost:5000/activities/id_of_the_activity and made a delete request
// this will delete the specific activity
router.route('/:id').delete((req, res) => {
    Activity.findByIdAndDelete(req.params.id).then(activity => res.json('Exercise Deleted!')).catch(err => res.status(400).json('Error: ' + err));
});


// when used url http://localhost:5000/activities/update/id_of_the_activity
// this will update the specific activity linked with that ID
router.route('/update/:id').put((req, res) => {
    Activity.findById(req.params.id)
    .then(activity => {
        activity.name = String(req.body.name);
        activity.time = String(req.body.time);
        activity.type = String(req.body.type);
        activity.description = String(req.body.description);
        activity.tagsArray = req.body.tagsArray;

        activity.save().then(()=> res.json('Activity updated!')).catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));

});



// and we export the module via router
module.exports = router;