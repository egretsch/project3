const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {type: String, required: true},
  activeIngredients: { type: String, required: true },
  inactiveIngredients: { type: String, required: true }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
