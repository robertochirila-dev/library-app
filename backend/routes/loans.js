const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Reader =  require("../models/Reader")
const authMiddleware = require("../middleware/authMiddleware");


// Loan a book to a reader
// Assuming we have a Book and Reader model
router.post('/:bookId', authMiddleware("admin"), async (req, res) => {
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

    // Update the Book document
    book.available = false; // Book is no longer available
    book.borrowedBy = reader._id; // Assign book to reader
    await book.save();

    // Update the Reader document (Add book to booksTaken)
    reader.booksTaken.push(book._id);
    await reader.save();

    res.status(200).send('Book successfully assigned to the reader');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;