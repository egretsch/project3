const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientsSchema = new Schema({
<<<<<<< HEAD
 ingredients: { type: String, required: true, unique: true }
=======
  ingredients: { type: String, required: true, unique: true }
>>>>>>> 1d727a190d7199bc84841cb9bc9bb5eb13da50f6
});

const Ingredients = mongoose.model("Ingredients", ingredientsSchema);

<<<<<<< HEAD
module.exports = Ingredients;
=======
module.exports = Ingredients;
>>>>>>> 1d727a190d7199bc84841cb9bc9bb5eb13da50f6
