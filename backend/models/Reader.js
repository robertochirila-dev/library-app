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
  booksTaken: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
      title: { type: String, required: true },
    },
  ],
  membershipDate: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Reader", readerSchema);