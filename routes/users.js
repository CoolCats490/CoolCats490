require('dotenv').config()
const auth = require("../middleware/auth");
// first we need to create a router
const router = require("express").Router();

// we need user variable to use the user model
let User = require("../models/user.model");

//We need a tag variable to use the tag model
const Tag = require("../models/tags.model");

//bcrypt js will allow us to hash our passwords
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//now we need to specify that if we recieve a '/get' request from the server,
// then what are we gonna do with the database

router.route("/").get((req, res) => {
  //its gonna go to user, find users and then return json file of users
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// what to do if we get '/add' request from server
// First we get the information from the server, and then create a new user from that informatin and
// then finally save it to the database as json file and print the message "User added!"
router.route("/add").post(async (req, res) => {
  try {
    
    const firstname = String(req.body.firstname);
    const lastname = String(req.body.lastname);
    const username = String(req.body.username);
    const age = Number(req.body.age);
    const interests = req.body.interests;
    const email = String(req.body.email);

    //make a salt and hash for passwords using bcrypt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const password = hashedPassword;

    const newUser = new User({
      username,
      age,
      interests,
      password,
      email,
      firstname,
      lastname
    });

    //send intrests to be checked/inserted into the database
    tagHandler(newUser);

    await newUser
      .save().catch((err) => res.status(400).json("Error Testing: " + err));
      
      
      const payload = {
        newUser:{
            id:newUser.id
          }
      };

      jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {expiresIn: 10000},
        (err, token) =>{
            if (err) throw err;
            res.status(200).json({
                token
            });
        }
      );

  } catch{
      res.status(500).send("Server Error");
  }

});

//most code and explanation found here
//https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i
router.post("/login", async (req, res) => {

    const{username, password} = req.body;
    try{
        let user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }
        //compare given password and database password
        const passMatch = await bcrypt.compare(req.body.password, user.password); 

        if (!passMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

        const payload = {
            user: {
              id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {
              expiresIn: "1h"
            },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                "token":token,
                "expiresIn": "3600000" //aka as 60 mins
              });
            }
          );
        
    }catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Server Error"
        });
    }
});

router.route("/me").get(auth, async(req, res) =>{
    try{
        const user = await User.findById(req.user.id);
        res.json({
          _id:user._id,
          username:user.username,
          age:user.age,
          interests:user.interests,
          age:user.age,
          firstname:user.firstname,
          lastname:user.lastname,
          createdAt:user.createdAt,
          email:user.email,
          hideProfile:user.hideProfile,
          displayCreatedGroups:user.displayCreatedGroups,
          displayJoinedGroups: user.displayJoinedGroups,
          profilePic:user.profilePic,
          profileBio:user.profileBio
        });
    }
    catch(error){
        res.send({message: "Error Fetching User"})
    }
});

const tagHandler = (newUser) =>{

  //Go through each tag from the user
  newUser.interests.forEach(element => {
    //Check tag database for duplicates and count each occurence
    Tag.countDocuments({tagName: element}, function(err, count){
      
      if(count > 0){

        //find tag database record
        Tag.findOneAndUpdate(
          {tagName:element},
          //push the user record to the tag database record
          {$push:{"users":{userId:newUser._id,userName:newUser.username}}},
          function(err, tags){
            if(err)
              res.status(400).json('Error: ' + err);
          }
        )
      }
      else{

        let newTag = new Tag({
          tagName: element,
          users:[{
            userId:newUser._id,
            userName: newUser.username
          }]
        })
        //save tag to the database
        newTag.save().catch(err => res.status(400).json('Error: ' + err));
      }
    })
  });
}

//This route will find a user by their _id and respond with their info
router.route("/:userId").get(async (req, res) =>{
  
  
  try{
    //find the user by id
    const user = await User.findById(req.params.userId)

    //return object with user info
    res.json({
      _id:user._id,
      username:user.username,
      interests:user.interests,
      firstname:user.firstname,
      lastname:user.lastname,
      createdAt:user.createdAt,
      hideProfile:user.hideProfile,
      displayCreatedGroups:user.displayCreatedGroups,
      displayJoinedGroups: user.displayJoinedGroups,
      profilePic:user.profilePic,
      profileBio:user.profileBio
    })

  }
  catch(error){
    res.send({message: "Error Fetching User"})
}

});

router.route("/hideProfile").post( (req,res)=>{
   User.findByIdAndUpdate(
      {_id:req.body._id}, 
      {hideProfile:req.body.hideProfile}, 
      function(err){
        if(err){
          console.log(err)
          res.send(err)
        }
        else{
          res.send("Profile Updated")
        }
  })
});

router.route("/displayCreatedGroups").post( (req,res)=>{

   User.findByIdAndUpdate(
      {_id:req.body._id}, 
      {displayCreatedGroups:req.body.displayCreatedGroups}, 
      function(err){
        if(err){
          console.log(err)
          res.send(err)
        }
        else{
          res.send("Profile Updated")
        }
  })
});

router.route("/displayJoinedGroups").post( (req,res)=>{

  User.findByIdAndUpdate(
     {_id:req.body._id}, 
     {displayJoinedGroups:req.body.displayJoinedGroups}, 
     function(err){
       if(err){
         console.log(err)
         res.send(err)
       }
       else{
         res.send("Profile Updated")
       }
 })
});

router.route("/profilePic").post( (req,res)=>{
  User.findByIdAndUpdate(
     {_id:req.body._id}, 
     {profilePic:req.body.profilePic}, 
     function(err){
       if(err){
         console.log(err)
         res.send(err)
       }
       else{
         res.send("Profile Updated")
       }
 })
});

router.post("/changePass", async (req, res) =>{

  try{
    //find user by username
    let user = await User.findOne({username:req.body.username});

    //if user is not found send aa error msg
    if(!user){
      return res.status(400).json({message: "User does not exist"});
    }

    //Check if passwords match
    const passMatch = await bcrypt.compare(req.body.password, user.password);

    //Send error if password does not match
    if (!passMatch)
        return res.status(400).json({
          message: "Incorrect Password!"
        });

    //make a salt and hash for passwords using bcrypt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.newPassowrd, salt);
    const password = hashedPassword;

    //save the changed password
    User.findOneAndUpdate(
      {username:req.body.username},
      {password:password},
      function(err, user){
        if(err){
          res.send(err)
        }
        
        const payload = {
          user:{
              id:user.id
            }
        };

        //Generate and send the new JWT token
        jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          {expiresIn: 10000},
          (err, token) =>{
              if (err) throw err;
              res.status(200).json({
                  "token":token,
                "expiresIn": "3600000" //aka as 60 mins
              });
          }
        );
      }
      )

    

    
  }catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
}
})

router.route("/changeEmail").post( (req,res)=>{

  User.findByIdAndUpdate(
     {_id:req.body._id}, 
     {email:req.body.email}, 
     function(err){
       if(err){
         console.log(err)
         res.status(400).json({message: "Failed To Update Password"})
       }
       else{
         res.status(200).json({message:"Email Updated"})
       }
 })
});

router.route("/changeTags").post((req,res)=>{

  //Replace the interests array with the new tags
  User.findByIdAndUpdate(
    {_id:req.body.userData._id},
    {interests: req.body.tagsArray},
    function(err){
      if(err){
        console.log(err)
        res.status(400).json({message: "Failed To Update Tags"})
      }
      else{
        if(req.body.addedTags){
          newUserTags(req.body.userData, req.body.addedTags);
        }
        if(req.body.removedTags){
          removeUserTags(req.body.userData, req.body.removedTags);
        }
        
        res.status(200).json({message:"Tags Updated"});
      }
    })


});

const newUserTags = ( userData, addedTags) =>{

  //Go through each tag from the user
  addedTags.forEach(element => {
      //update tag based on name, or insert if it does not exist
    Tag.updateOne(
      {tagName:element},
      {$addToSet:{"users":{
          grouuserIdpId:userData._id,
          userName: userData.username
      }}},
      { upsert: true },
      function(err){
          if(err){
            res.status(400).json({message: "Error adding tags"});
            console.log(err)
          }
        }
    )
  });
}

const removeUserTags = (userData, removedTags) => {
    //Go through each tag
    removedTags.forEach(element => {
        //find the tag name in the database
        Tag.findOneAndUpdate(
            {tagName:element},
            //remove the group from the tag
            {$pull: {"users":{userId: userData._id}}},
            function(err){
                if(err)
              res.status(400).json({message: "Error Removing tag"});
            }
        )
    })
}

router.route("/changeBio").post( (req,res)=>{

  User.findByIdAndUpdate(
     {_id:req.body._id}, 
     {profileBio:req.body.profileBio}, 
     function(err){
       if(err){
         console.log(err)
         res.status(400).json({message: "Failed To Update Bio"})
       }
       else{
         res.status(200).json({message:"Bio Updated"})
       }
 })
});

// and we export the module via router
module.exports = router;
