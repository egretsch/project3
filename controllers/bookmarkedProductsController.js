const db = require("../models");

module.exports = {
  bookmarkProduct: function (req, res) {
    const userEmail = req.session.user.currentUser.email
    const product = req.body.product;
    db.User
      .findOneAndUpdate({
        email: userEmail
      },
      {
        $push: {bookmarkedProducts: product}
      }
      )
      .then(results => {
        console.log("Successfully added product.");
      })
  },

  getBookmarkedProducts: function (req, res){
    const userEmail = req.session.user.currentUser.email
    db.User
      .findOne({
        email: userEmail
      }).then(dbModel => {
        res.json(dbModel)
        // console.log(dbModel)
      }).catch(err => res.status(422).json(err))
  },

  deleteBookmarkedProduct: function (req, res) {
    const userEmail = req.session.user.currentUser.email
    const product = req.body.product;
    db.User
      .findOneAndUpdate({
        email: userEmail
      },
      {
        $pull: {bookmarkedProducts: product}
      }
      ).then(dbModel => {
          res.json(dbModel)
      }).catch(err => res.status(422).json(err))
  }
  
};
