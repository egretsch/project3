const db = require("../models");
const bcrypt = require('bcrypt')

// Login
module.exports = {

 
  findOne: function(req, res) {
    console.log(req.body.loginObj.userName, "backend")
    db.User
      .findOne({userName: req.body.loginObj.userName})
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
                id: users._id,
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

    db.User.find({$or: [{userName: req.body.userName}, {email: req.body.email}]}).then(dbData =>{
      console.log("This is dbData inside create: ", dbData);

      if(dbData.length === 0){
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
      }else{
        res.json(false);
      }
    })
   
  }

};
