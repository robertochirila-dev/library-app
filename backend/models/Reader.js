const mongoose = require("mongoose");

const readerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    membershipDate: {
      type: Date,
      required: true,
    },
    booksTaken: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',  // Assuming you have a 'Book' model to reference the books taken by the reader
    }],
  });

module.exports = mongoose.model("Reader", readerSchema);