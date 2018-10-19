const db = require("../models");

module.exports = {
  saveIngredient: function (req, res) {
    const userEmail = req.session.user.currentUser.email
    const ingredient = req.body.ingredient;
    db.User
      .findOneAndUpdate({
        email: userEmail
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
    const userEmail = req.session.user.currentUser.email
    db.User
      .findOne({
        email: userEmail
      })
      .then(dbModel => {
        // console.log(dbModel);
        res.json(dbModel);
      })
      .catch (err => res.status(422).json(err))
  },

  deleteSavedIngredient: function (req,res) {
    const userEmail = req.session.user.currentUser.email
    const ingredient = req.body.ingredient;
    console.log("Deleted Ingredient: " + ingredient)
    db.User
      .findOneAndUpdate({
        email: userEmail
      },
      {
        $pull: {ingredients: ingredient}
      })
      .then(dbModel => {

        // console.log("AFTER DELETE: " + dbModel);
        res.json(dbModel);
      })
      .catch (err => res.status (422).json(err))
  },
};
