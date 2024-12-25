const express = require("express");
const router = express.Router();
const Book = require("../models/Book");


// Get all books
router.get("/", async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// Delete a book
router.delete('/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookId);
        
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        res.json({ message: 'Book deleted successfully', book: deletedBook });
    } catch (err) {
        console.error("Error deleting book:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Get specific book
router.get('/:id', async (req, res) => {
    try {
      const bookId = req.params.id;  // Extract the book ID from the URL
  
      // Attempt to find the book in the database by its ID
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.json(book);  // Return the book details as a JSON response
    } catch (err) {
      console.error("Error fetching book:", err);
      res.status(500).json({ message: "Internal server error" });
    }
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