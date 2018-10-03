const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  products: [{
    type: Schema.Types.ObjectId,
    ref: "product"
  }],
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "ingredient"
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;