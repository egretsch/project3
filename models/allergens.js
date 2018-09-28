const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const allergensSchema = new Schema({
  allergens: { type: String, required: true }
});

const Allergens = mongoose.model("Allergens", allergensSchema);

module.exports = Allergens;
