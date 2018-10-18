const db = require("../models");
const bcrypt = require('bcrypt')
let isAuth = false;
let _id;
let name;
let email;
let userName;
let gender;


// Login
module.exports = {


  userAuth: function (req, res) {
    
    

    var userObj = {
      _id: _id,
      name: name,
      email: email,
      userName: userName,
      gender: gender,
      validUser: isAuth,

    }
    
    req.session.user.loggedIn = false;
    req.session.user.currentUser = userObj;
    let logedinCurrentUser = req.session.user.currentUser

    
    res.json(userObj);

  },

  logoutUser: function (req, res) {

    _id = "";
    name = "";
    email = "";
    userName = "";
    gender = "";
    isAuth = false;

    var userObj = {
      _id: _id,
      name: name,
      email: email,
      userName: userName,
      gender: gender,
      validUser: isAuth,

    }

    console.log(userObj);
    req.session.user.loggedIn = false;
    req.session.user.currentUser = userObj;
    res.json(userObj);

  },

  updateUser: function (req, res) {
    

    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
        req.body.password = hash;
        db.User
          .update(
            { _id: req.session.user.currentUser._id },
            {
              $set: {
                name: req.body.name,
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender
              }
            })
          .then(users => {
            

            db.User.findOne({ userName: req.body.userName })
              .then(users => {
                
                _id = users._id;
                name = users.name;
                email = users.email;
                userName = users.userName;
                gender = users.gender;
                isAuth = true;

                var userObj = {
                  _id: _id,
                  name: name,
                  email: email,
                  userName: userName,
                  gender: gender,
                  validUser: isAuth,

                }

                
                req.session.user.loggedIn = true;
                req.session.user.currentUser = userObj;
                res.json(userObj);

              })
              .catch((err) => {
                console.log(err)
                res.status(422).json(err)
              });


            // else {
            //   res.json(false);
            // }
          })
          .catch((err) => {
            console.log("This is our error inside of update: ", err)
            res.status(422).json(err)
          });
      });
    });

  },



  currentUser: function (req, res) {
    const currentUserObject = req.session.user.currentUser
    console.log(currentUserObject)
    res.json(currentUserObject);

  },


  findOne: function (req, res) {
  
    db.User
      .findOne({ userName: req.body.loginObj.userName })
      .then(users => {


        if (!users && typeof users === object) {
          res.status(404).send('Invalid username or password. Please try again');
        } else {
          bcrypt.compare(req.body.loginObj.password, users.password).then(function (bcryptRes) {


            if (!bcryptRes) {

              res.status(404).send('Invalid username or password. Please try again');
            } else {
              

              _id = users._id;
              name = users.name;
              email = users.email;
              userName = users.userName;
              gender = users.gender;
              isAuth = true;

              var userObj = {
                _id: _id,
                name: name,
                email: email,
                userName: userName,
                gender: gender,
                validUser: isAuth,

              }
              console.log(userObj);
              req.session.user.loggedIn = true;
              req.session.user.currentUser = userObj;
              res.json(userObj);
            }
          });
        }

      })
      .catch((err) => {
        console.log(err)
        res.status(422).json(err)
      });
  },

  create: function (req, res) {
    db.User.find({ $or: [{ userName: req.body.userName }, { email: req.body.email }] }).then(dbData => {
      


      if (dbData.length === 0) {
        
        const saltRounds = 10;
        const myPlaintextPassword = req.body.password;
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
            req.body.password = hash;

            console.log("This is the req.body: ", req.body);

            db.User
              .create(req.body)
              .then(dbModel => res.json(dbModel))
              .catch(err => {
                console.log("this is our error inside create: ", err);
                res.status(422).json(err)
              });
          });
        });
      } else {
        res.json(false);
      }
    }).catch(err => {
      res.status(422).json(err);
    })

  }

};
