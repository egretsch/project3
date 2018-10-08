const db = require("../models");

// Defining methods for the ingredientsController



module.exports = {
  saveIngredient: function (req, res) {
    const userId = req.session.user.currentUser.id
    const ingredient = req.body.ingredient;
    db.User
      .findOneAndUpdate({
        _id: userId
      },
      {
        $push: {ingredients: ingredient}
      }
      )
      .then(results => {
        console.log("Successfully added Ingredient!")
        })
  },

  getSavedIngredients: function (req, res){
    const userId = req.session.user.currentUser.id;
    db.User
      .findOne({
        _id: userId
      })
      .then(dbModel => {
        // console.log(dbModel);
        res.json(dbModel);
      })
      .catch (err => res.status(422).json(err))
  }
};
