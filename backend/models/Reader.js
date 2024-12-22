const mongoose = require("mongoose");

const readerSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("Reader", readerSchema);