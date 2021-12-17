// first we need to create a router
const router = require('express').Router();

// we need user variable to use the user model
let Tag = require('../models/tags.model');

//now we need to specify that if we recieve a '/get' request from the server,
// then what are we gonna do with the database

router.route('/').get((req,res) => {
    //its gonna go to user, find users and then return json file of users
    Tag.find().then(tags => res.json(tags)).catch(err => res.status(400).json('Error: ' + err));
});


// when used url http://localhost:5000/tags/tagName and made get request
// this will return the specific tag
router.route('/:incomingTag').get((req, res) => {
    let incomingTag = req.params.incomingTag
    Tag.find({tagName:incomingTag}).then(tag => res.json(tag)).catch(err => res.status(400).json('Error: ' + err));
});


// // what to do if we get '/add' request from server
// // First we get the information from the server, and then create a new user from that informatin and
// // then finally save it to the database as json file and print the message "User added!"
// router.route('/add').post((req, res) => {
//     const tag = String(req.body.interests);

//     const newTag = new Tag({
//         interests
//     });

//     tag.save().then(()=> res.json('New tag added!')).catch(err => res.status(400).json('Error Testing: ' + err));


// });

// and we export the module via router
module.exports = router;
