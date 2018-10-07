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
        console.log("Successfully added product.");
      })
  },
  getSavedProducts: function (req, res){
    const userId = req.session.user.currentUser.id
    db.User
      .findOne({
        _id: userId
      }).then(result => {
        console.log(result.bookmarkedProducts)
        res.json(result)
      });
  }




  
};
