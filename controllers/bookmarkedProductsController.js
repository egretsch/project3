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
  getProducts: function (req, res){
    const userId = req.session.user.currentUser.id
    dbUser
      .findOne({
        _id: userId
      }).then(results => {
        console.log(results)
      });
  }




  
};
