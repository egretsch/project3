const db = require("../models");
const bcrypt = require('bcrypt')

// Login
module.exports = {

  logoutUser: function (req, res) {

    // if (users.length === 0) {
    
    var userObj = {
      _id: "",
      name: "",
      userName: "",
      email: "",
      
      gender: ""
    }
    console.log(userObj);
    req.session.user.loggedIn = false;
    req.session.user.currentUser = userObj;
    res.json(userObj);
    // } else {
    //   res.json(false);
    // }
    console.log(req.session.user.loggedIn, "logedout")
    console.log(req.session.user.currentUser, "logedout")
  },

  updateUser: function (req, res) {
    console.log("this is our req.body inside update users: ", req.body);

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
            // if (users.length === 0) {
            console.log("this is our database result user inside updated user", users)
            var userObj = {
              _id: users._id,
              name: users.name,
              email: users.email,
              userName: users.userName,
              gender: users.gender
            }
            console.log(userObj);
            req.session.user.loggedIn = true;
            req.session.user.currentUser = userObj;
            res.json(userObj);
            // } else {
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
    console.log(req.body.loginObj.userName, "backend")
    db.User
      .findOne({ userName: req.body.loginObj.userName })
      .then(users => {
        console.log(users)

        console.log(users.userName, "This is the userName");
        console.log(users.password, "This is the password");
        // if (users.length === 0) {
        if (!users && typeof users === object) {
          res.status(404).send('Invalid username or password. Please try again');
        } else {
          bcrypt.compare(req.body.loginObj.password, users.password).then(function (bcryptRes) {
            // res == true

            if (!bcryptRes) {
              console.log("it worked1");
              res.status(404).send('Invalid username or password. Please try again');
            } else {
              console.log("it worked 2");

              var userObj = {
                _id: users._id,
                name: users.name,
                email: users.email,
                userName: users.userName,
                gender: users.gender
              }
              console.log(userObj);
              req.session.user.loggedIn = true;
              req.session.user.currentUser = userObj;
              res.json(userObj);
            }
          });
        }
        // } else {
        //   res.json(false);
        // }
      })
      .catch((err) => {
        console.log(err)
        res.status(422).json(err)
      });
  },

  create: function (req, res) {
    db.User.find({ $or: [{ userName: req.body.userName }, { email: req.body.email }] }).then(dbData => {
      console.log("This is dbData inside create: ", dbData);


      if (dbData.length === 0) {
        console.log(2)
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
