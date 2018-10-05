const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// user model

const userSchema = new Schema({
<<<<<<< HEAD
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
=======
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
>>>>>>> 1d727a190d7199bc84841cb9bc9bb5eb13da50f6
});

const User = mongoose.model("User", userSchema);

<<<<<<< HEAD
module.exports = User;
=======
module.exports = User;
>>>>>>> 1d727a190d7199bc84841cb9bc9bb5eb13da50f6
