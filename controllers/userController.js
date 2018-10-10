const db = require("../models");
const bcrypt = require('bcrypt')

// Login
module.exports = {

  // updateUser: function (req, res) {
  //   console.log(req.body, "req .body")
  //   console.log("this is our req.session.user.currentUser: ", req.session.user.currentUser)
  //   db.User.find({}).then(dbUsers => {
  //     console.log(dbUsers);
  //     for (let i = 0; i < dbUsers.length; i++) {
  //       if (req.session.user.currentUser._id === dbUsers[i]._id) {
  //         continue;
  //       }
  //       if (req.body.userName === dbUsers.userName || req.body.email === dbusers.email) {
  //       }
  //     }
  //     const saltRounds = 10;
  //     const myPlaintextPassword = req.body.password;
  //     bcrypt.genSalt(saltRounds, function (err, salt) {
  //       bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
  //         req.body.password = hash;
  //         db.User
  //           .update(
  //             { _id: req.session.user.currentUser._id },
  //             {
  //               $set: {
  //                 name: req.body.name,
  //                 userName: req.body.userName,
  //                 email: req.body.email,
  //                 password: req.body.password,
  //                 gender: req.body.gender
  //               }
  //             })
  //           .then(users => {
  //             console.log(users)

  //           })
  //           .catch((err) => {
  //             console.log(err)
  //             res.status(422).json(err)
  //           });
  //       });
  //     });



  //   });

  // },

  updateUser: function(req, res){
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
            console.log("this is our database result user inside updated user" , users)

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
      })
      .catch((err) => {
        console.log(err)
        res.status(422).json(err)
      });
  },



  create: function (req, res) {

    db.User.find({ $or: [{ userName: req.body.userName }, { email: req.body.email }] }).then(dbData => {
      


  create: function (req, res) {
    db.User.find({$or: [{userName: req.body.userName}, {email: req.body.email}]}).then(dbData =>{
      console.log("This is dbData inside create: ", dbData);


      if (dbData.length === 0) {
        console.log(2)
        const saltRounds = 10;
        const myPlaintextPassword = req.body.password;
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
            req.body.password = hash;
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
