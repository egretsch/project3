const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  products: {type: Array, required: false}
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
