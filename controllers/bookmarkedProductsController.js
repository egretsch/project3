const db = require("../models");




module.exports = {
  saveProduct: function (req, res) {
    const userId = req.session.user.currentUser.id
    const product = req.body.product;
    db.User
      .findOneAndUpdate({
        _id: userId
      },
      {
        $push: {bookmarkedProducts: product}
      }
      )
      .then(results => {
        console.log(results);
      })
  },





  // findAll: function(req, res) {
  //   db.BookmarkedProducts
  //     .find(req.query)
  //     .sort({ date: -1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // create: function(req, res) {
  //   db.BookmarkedProducts
  //     .create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   db.BookmarkedProducts
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
