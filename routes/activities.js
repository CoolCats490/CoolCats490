// first we need to create a router
const router = require('express').Router();

const res = require('express/lib/response');
// we need user variable to use the user model
let Activity = require('../models/activities.model');

// we need user variable to use the user model
let Comment = require('../models/comments.model');

//We need a tag variable to use the tag model
const Tag = require("../models/tags.model");

//needs a vairable to use the reccurance model

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
    const time = req.body.time;
    const type = String(req.body.type);
    const description = String(req.body.description);
    const tagsArray = req.body.tagsArray;
    const createdBy = req.body.createdBy;
    const members = req.body.members;
    const occurance = req.body.occurances;
    const permission = req.body.permission;

    const newActivity = new Activity({
        name,
        time,
        type,
        description,
        tagsArray,
        createdBy,
        members,
        occurance,
        permission
    });

    newActivity.save().then(()=> res.json('Activity added!')).catch(err => res.status(400).json('Error: ' + err));

    const newComment = new Comment({
        activityID: newActivity._id,
        activityName: newActivity.name
    });

    //Create a comment record for this activity
    newComment.save().catch(err => res.status(400).json('Error: ' + err));

    //send tags to be checked by the database
    if(tagsArray)
        newActivityTags(newActivity._id ,newActivity);

});

// when used url http://localhost:5000/activities/new and made get request
// this will return the 5 newest activities
router.route('/latest').get((req,res) => {
    Activity.find().sort({ _id: -1 }).limit(5).then(activity => res.json(activity)).catch(err => res.status(400).json('Error: ' + err));
});

//returns the reccuring groups
router.route('/recurringGroups').get((req,res) => {
    Activity.find().sort({occurances: -1}).then(activity => res.json(activity)).catch(err=> res.starus(400).json('Error: '+err));
});
// when used url http://localhost:5000/activities/new and made get request
// this will return the top 5 activities based on members
router.route('/top').get((req,res) => {
    Activity.find().sort({ "membersLength": -1 }).limit(5).then(activity => res.json(activity)).catch(err => res.status(400).json('Error: ' + err));
});

// when used url http://localhost:5000/activities/id_of_the_activity and made get request
// this will return the specific activity
router.route('/:id').get((req, res) => {
    Activity.findById(req.params.id).then(activity => res.json(activity)).catch(err => res.status(400).json('Error: ' + err));
});
 
// when used url http://localhost:5000/activities/id_of_the_activity and made a delete request
// this will delete the specific activity
router.route('/:id').delete((req, res) => {
    let activityID = req.params.id

    //Detele Activity
    Activity.findByIdAndDelete(activityID).then(activity => res.json('Exercise Deleted!')).catch(err => res.status(400).json('Error: ' + err));

    //find comment object by activity id and delete comments for that activity
    Comment.findOneAndDelete( {activityID:activityID},
        function(err, commentOBJ){
            if(err){
                console.log(err)
            }
        } )

    //Remove group from tag list
    deleteActivityTag(activityID);
});

// when used url http://localhost:5000/activities/createdBy and made get request
// this will return the activities created by the user
router.route('/createdBy').post((req, res) => {
    
    let incomingUser = req.body.userId;

    Activity.find({"createdBy.id":incomingUser}, function(err, groups){
        if(err){
            res.send(err)
        }else{
            res.json(groups)
        }
        
    });
});





// when used url http://localhost:5000/activities/joinedGroups will make a post request
// 
router.route('/joinedGroups').post((req, res) => {
    let incomingUser = req.body.userId;

    Activity.find({"members.id":incomingUser, "createdBy.id":{$ne: incomingUser} }, function(err, groups){
        if(err){
            res.send(err)
        }else{
            res.json(groups)
        }
        
    });
});

// when used url http://localhost:5000/activities/update/id_of_the_activity
// this will update the specific activity linked with that ID
router.route('/update/:id').post((req, res) => {
    let activityID = req.params.id;
    let addedTags = req.body.addedTags;
    let removedTags = req.body.removedTags;

    let activityData = {
        name: String(req.body.name),
        time: req.body.time,
        type: String(req.body.type),
        description: String(req.body.description),
        tagsArray: req.body.tagsArray,
        createdBy: req.body.createdBy,
        members: req.body.members,
        occurance: req.body.occurances,
        permission: req.body,permission
    }

    Activity.findById(activityID)
    .then(activity => {
        activity.name = String(req.body.name);
        activity.time = req.body.time;
        activity.type = String(req.body.type);
        activity.description = String(req.body.description);
        activity.tagsArray = req.body.tagsArray;
        activity.occurance = req.body.occurance;
        activity.permission = req.body.permission;

        activity.save().then(()=> res.json('Activity updated!')).catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));

    //Add new tags if they are any
    if(addedTags)
        newActivityTags(activityID, activityData, addedTags);

    //Remove tags if they are any
    if(removedTags)
        removeActivityTag(removedTags, activityID);

});

// when used url http://localhost:5000/activities/join/id_of_the_activity
// this will add the user to specific activity and tag group
router.route('/join/:id').post((req, res) => {

    //find activity by id
    Activity.findOneAndUpdate(
        {_id: req.params.id},
        //add user name and id to the activity's member array
        {$addToSet: {"members":req.body}},
        //if there is an error send it front end's console
        function(err, data){
            if(err){
                res.status(400).json('Error: ' + err)
            }
            else{
                res.json('Activity joined!')
            }
        }
    )

    Tag.updateMany(
        {"groups.groupId":req.params.id},
        {$addToSet: {"groups.$.groupMembers": req.body} },
        function(err, result){
            if(err){
                console.log(err)
            }
            else{
                console.log(result)
            }
        }
    )

});

// when used url http://localhost:5000/activities/leave/:id
// this will remove the user from the specific activity and tag group
router.route('/leave/:id').post((req, res) => {

    console.log(req.body.id)

    //find activity by id
    Activity.findOneAndUpdate(
        {_id: req.params.id},
        //remove the user name and id from the activity's member array
        {$pull: { "members": {id : req.body.id} } },
        //if there is an error send it front end's console
        function(err, data){
            if(err){
                res.status(400).json('Error: ' + err)
            }
            else{
                res.json('Left Activity!')
            }
        }
    )

    Tag.updateMany(
        {"groups.groupId":req.params.id},
        {$pull: {"groups.$.groupMembers": {id : req.body.id} } },
        function(err, result){
            if(err){
                console.log(err)
            }
            else{
                console.log(result)
            }
        }
    )

});

//This route will return all group info for a given array of group IDs
router.route('/findGroups').post((req, res) => {
    const tagGroups = req.body.tagGroups;
    const returnedGroupInfo = [];

    //Search for each group id and return their details
    tagGroups.forEach( element =>{
        Activity.find( {_id:element},function(err, group){
            if(err)
              res.status(400).json('Error: ' + err);
            else{
                returnedGroupInfo.push(group);
            }

        })
    })
    res.json(returnedGroupInfo);
});


const newActivityTags = (activityID, activityData, addedTags) =>{

    //Go through each tag from the user
    addedTags.forEach(element => {
        //update tag based on name, or insert if it does not exist
      Tag.updateOne(
        {tagName:element},
        {$addToSet:{"groups":{
            groupId:activityID,
            groupName: activityData.name,
            groupTime: activityData.time,
            groupType: activityData.type,
            groupDescription: activityData.description,
            groupCreatedBy: activityData.createdBy,
            groupMembers: activityData.members
        }}},
        { upsert: true },
        function(err, tags){
            if(err)
              res.status(400).json('Error: ' + err);
          }
      )
    });
  }

  const deleteActivityTag = (activityID) =>{
      Tag.updateMany(
          {groupId: activityID},
          {$pull:{"groups":{groupId: activityID}} },
          function(err, tags){
            if(err)
              res.status(400).json('Error: ' + err);
          }
      )
  }

const removeActivityTag = (removedTags, activityID) => {
    //Go through each tag
    removedTags.forEach(element => {
        //find the tag name in the database
        Tag.findOneAndUpdate(
            {tagName:element},
            //remove the group from the tag
            {$pull: {"groups":{groupId: activityID}}},
            function(err, tags){
                if(err)
              res.status(400).json('Error: ' + err);
            }
        )
    })
}

// and we export the module via router
module.exports = router;