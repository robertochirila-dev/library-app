const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  available: { type: Boolean, default: true },
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Reader', default: null }, // New field
});

module.exports = mongoose.model("Book", bookSchema);