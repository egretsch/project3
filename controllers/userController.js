const db = require("../models");
const bcrypt = require('bcrypt')

// Defining methods for the booksController
module.exports = {
  // findAll: function(req, res) {
  //   db.Book
  //     .find(req.query)
  //     .sort({ date: -1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  findOne: function(req, res) {
    console.log(req.body.loginObj.userName, "backend")
    db.User
      .findOne(req.body.loginObj.userName)
      .then(users => {
        console.log(users)
        // console.log(data.dataValues + "This is the datavalues");
        // console.log(data.dataValues.userName + "This is the userName");
        // console.log(data.dataValues.password + "This is the password");
        // if (!data && typeof data === object) {
        //   res.status(404).send('Invalid username or password. Please try again');
        // } else {
        //   bcrypt.compare(req.body.password, data.dataValues.password).then(function (bcryptRes) {
        //     // res == true

        //     if (!bcryptRes) {
        //       console.log("it worked1");
        //       res.status(404).send('Invalid username or password. Please try again');
        //     } else {
        //       console.log("it worked 2");

        //       var userObj = {
        //         id: data.dataValues._id,
        //         name: data.dataValues.name,
        //         email: data.dataValues.email,
        //         userName: data.dataValues.userName,
        //         gender: data.dataValues.gender
        //       }
        //       console.log(userObj);
        //       req.session.user.loggedIn = true;
        //       req.session.user.currentUser = userObj;
        //       res.json(userObj);
        //     }
        //   });
        // }
      })
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
        req.body.password = hash;
        db.User
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      });
    });
  }
  // update: function(req, res) {
  //   db.Book
  //     .findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   db.Book
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
