const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientsSchema = new Schema({
 ingredients: { type: String, required: true, unique: true }
});

const Ingredients = mongoose.model("Ingredients", ingredientsSchema);

module.exports = Ingredients;