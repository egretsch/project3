const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookmarkedProductsSchema = new Schema({
   name: { type: String, required: true, unique: true }
});

const BookmarkedProducts = mongoose.model("BookmarkedProducts", bookmarkedProductsSchema);

module.exports = BookmarkedProducts;