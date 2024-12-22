const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Loan a book to a reader
router.post("/", async (req, res) => {
  const { bookId, readerId } = req.body;
  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ error: "Book not found" });

  book.loanedTo = readerId;
  await book.save();
  res.json({ message: "Book loaned successfully", book });
});

module.exports = router;