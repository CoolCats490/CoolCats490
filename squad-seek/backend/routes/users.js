
// first we need to create a router
const router = require('express').Router();

// we need user variable to use the user model
let User = require('../models/user.model');

//now we need to specify that if we recieve a '/get' request from the server,
// then what are we gonna do with the database

router.route('/').get((req,res) => {
    //its gonna go to user, find users and then return json file of users
    User.find().then(users => res.json(users)).catch(err => res.status(400).json('Error: ' + err));
});


// what to do if we get '/add' request from server
// First we get the information from the server, and then create a new user from that informatin and
// then finally save it to the database as json file and print the message "User added!"
router.route('/add').post((req, res) => {
    const username = String(req.body.username);
    const age = Number(req.body.age);
    const interests = String(req.body.interests);
    const password = String(req.body.password);

    const newUser = new User({
        username,
        age,
        interests,
        password
    });

    newUser.save().then(()=> res.json('User added!')).catch(err => res.status(400).json('Error Testing: ' + err));


});

// and we export the module via router
module.exports = router;
