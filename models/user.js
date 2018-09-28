const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  allergens: [
    {
      type: Schema.Types.ObjectId,
      ref: "Allergens"
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
