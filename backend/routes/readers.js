const express = require("express");
const router = express.Router();
const Reader = require("../models/Reader");
const mongoose = require("mongoose")

// Get all readers
router.get("/", async (req, res) => {
  const readers = await Reader.find();
  res.json(readers);
});

router.get('/:id', async (req, res) => {
    try {
      const readerId = req.params.id;  // Extract the book ID from the URL
      console.log(`Fetching reader with ID: ${readerId}`);  // Debugging point
  
      // Attempt to find the book in the database by its ID
      const reader = await Reader.findById(readerId);
      if (!reader) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.json(reader);  // Return the book details as a JSON response
    } catch (err) {
      console.error("Error fetching reader:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

// Add a new reader
router.post('/', async (req, res) => {
    try {
      const { name, email, phone, membershipDate, booksTaken } = req.body;
      console.log(name, email, phone)
  
      // Convert book IDs from string to ObjectId
      const booksObjectIds = booksTaken.map(bookId => new mongoose.Types.ObjectId(bookId));
  
      const newReader = new Reader({
        name,
        email,
        phone,
        membershipDate,
        booksTaken: booksObjectIds, // Use the converted ObjectIds here
      });
  
      await newReader.save();
      res.status(201).json(newReader);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving reader' });
    }
  });

  // Update reader details
router.put("/:id", async (req, res) => {
  try {
    const updatedReader = await Reader.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReader) {
      return res.status(404).json({ message: "Reader not found" });
    }
    res.json(updatedReader);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a reader
router.delete("/:id", async (req, res) => {
  try {
    const deletedReader = await Reader.findByIdAndDelete(req.params.id);
    if (!deletedReader) {
      return res.status(404).json({ message: "Reader not found" });
    }
    res.json({ message: "Reader deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;