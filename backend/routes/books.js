const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Get all books
router.get("/", async (req, res) => {
    const books = await Book.find().populate("loanedTo");
    res.json(books);
});

// Add a new book
router.post('/', async (req, res) => {
    const { title, author, year, genre } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: 'Title and Author are required' });
    }

    try {
        const newBook = new Book({ title, author, year, genre });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add book' });
    }
});

module.exports = router;