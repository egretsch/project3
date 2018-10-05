const express = require("express");
<<<<<<< HEAD
const path = require('path');
=======
const session = require('express-session');
>>>>>>> 1d727a190d7199bc84841cb9bc9bb5eb13da50f6
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
<<<<<<< HEAD
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set static folder
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'client/build')));

=======
const cors = require('cors');
const PORT = process.env.PORT || 3001;




app.use(session({
  secret: process.env.SESSIONSECRET || 'cat',
  resave: false,
  saveUninitialized: true
}));

function userSetup(req, res, next) {
  if (!req.session.user) {
    req.session.user = {};
    req.session.user.loggedIn = false;
  }
  next();
}

// Define middleware here
app.use(userSetup);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/public"));
}
>>>>>>> 1d727a190d7199bc84841cb9bc9bb5eb13da50f6
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/projectthree");

mongoose.Promise = Promise;


// Start the API server
app.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}!`);
=======
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdata");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
>>>>>>> 1d727a190d7199bc84841cb9bc9bb5eb13da50f6
});
