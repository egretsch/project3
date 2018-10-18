const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema for the Products with upcCode in our database.

const productSchema = new Schema({
  brandName: { type: String, required: true, unique: true },
  upcCode: { type: String, required: true, unique: true }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;