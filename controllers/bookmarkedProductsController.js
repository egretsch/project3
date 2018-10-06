const db = require("../models/bookmarkedProducts");

// Defining methods for the bookmarkedProductsController


//ASK: if we just put it in our users.bookmarkedProducts array, would that work? How would we do it?


module.exports = {
  findAll: function(req, res) {
    db.BookmarkedProducts
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.BookmarkedProducts
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.BookmarkedProducts
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
