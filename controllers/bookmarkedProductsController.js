const db = require("../models");




module.exports = {
  bookmarkProduct: function (req, res) {
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
        console.log("Successfully added product.");
      })
  },

  getBookmarkedProducts: function (req, res){
    const userId = req.session.user.currentUser.id
    db.User
      .findOne({
        _id: userId
      }).then(dbModel => {
        res.json(dbModel)
      }).catch(err => res.status(422).json(err))
  }




  
};
