const db = require("../models/user");

// Defining methods for the userController
module.exports = {
  findByUsername: function(req, res) {
    db.User
      .findByUsername(req.params.username)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
