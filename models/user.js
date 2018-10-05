const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// user model

const userSchema = new Schema({
 name: { type: String, required: true },
 userName: { type: String, required: true, unique: true },
 email: { type: String, required: true, unique: true },
 password: { type: String, required: true },
 gender: { type: String, required: true },
 ingredients: [
   {
     type: Schema.Types.ObjectId,
     ref: "Ingredients"
   }
 ],
 bookmarkedProducts: [
   {
     type: Schema.Types.ObjectId,
     ref: "BookmarkedProducts"
   }
 ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;