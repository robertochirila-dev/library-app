const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.find().populate("loanedTo");
  res.json(books);
});

// Add a new book
router.post("/", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json(book);
});

module.exports = router;