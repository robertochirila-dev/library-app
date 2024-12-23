const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Reader =  require("../models/Reader")

// Loan a book to a reader
// Assuming we have a Book and Reader model
router.post('/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const { readerId } = req.body; // assuming you send the readerId in the request body

  try {
    // Find the book and reader
    const book = await Book.findById(bookId);
    const reader = await Reader.findById(readerId);

    if (!book || !reader) {
      return res.status(404).send('Book or Reader not found');
    }

    if (!book.available) {
      return res.status(400).send('Book is not available');
    }

    // Mark the book as borrowed and assign it to the reader
    book.available = false; // Book is now unavailable
    book.borrowedBy = reader._id; // Assign book to the reader
    await book.save();

    res.status(200).send('Book successfully assigned to the reader');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;