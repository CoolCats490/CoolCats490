const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log('MongoDB database connection established successfully.')
});


// These are the different collections used into the database and how we will 
// separate the data
const activityRouter = require('./routes/activities');
const userRouter = require('./routes/users');
const tagRouter = require('./routes/tags');
const commentRouter = require('./routes/comments');
const bodyParser = require('body-parser');

//This enables Express to serve up the build we just created, 
//which is how we serve up our frontend up on Azure.
app.use(express.static('./client/build'));

// Serve Static assests if in production
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build")); // change this if your dir structure is different
//     app.get("*", (req, res) => {
//       res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
//   }

// Every time user enters /users to the brower, it will show the users list
app.use('/activities', activityRouter);
app.use('/users', userRouter);
app.use('/tags',tagRouter);
app.use('/comments',commentRouter);


app.listen(port, () => {
    console.log('Server is running on port: %f', port);
});
