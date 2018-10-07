const db = require("../models");

// Defining methods for the ingredientsController



module.exports = {
  saveIngredient: function (req, res) {
    const userId = req.session.user.currentUser.id
    const ingredient = req.body.ingredient;
    console.log(ingredient)
    db.User
      .findOneAndUpdate({
        _id: userId
      },
      {
        $push: {ingredients: ingredient}
      }
      )
      .then(results => {
        console.log(results);
      })
  },
};
