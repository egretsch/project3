const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookmarkedProductsSchema = new Schema({
<<<<<<< HEAD
   name: { type: String, required: true, unique: true }
=======
    name: { type: String, required: true, unique: true }
>>>>>>> 1d727a190d7199bc84841cb9bc9bb5eb13da50f6
});

const BookmarkedProducts = mongoose.model("BookmarkedProducts", bookmarkedProductsSchema);

module.exports = BookmarkedProducts;