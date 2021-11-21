require('dotenv').config()
const auth = require("../middleware/auth");
// first we need to create a router
const router = require("express").Router();

// we need user variable to use the user model
let User = require("../models/user.model");

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
    const interests = String(req.body.interests);
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

    await newUser
      .save();
      //.then(() => res.json("User added!"));
      //.catch((err) => res.status(400).json("Error Testing: " + err));
      
      
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
    //   res.json({accessTonken: accessToken})
    //   console.log({accessTonken: accessToken})

  } catch{
      res.status(500).send("Server Error");
  }

});

//most code found here
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
              expiresIn: "10m"
            },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                token
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
        res.json(user);
    }
    catch(error){
        res.send({message: "Error Fetching User"})
    }
});




// and we export the module via router
module.exports = router;
