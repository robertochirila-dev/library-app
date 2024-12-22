const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  loanedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Reader", default: null },
});

module.exports = mongoose.model("Book", bookSchema);