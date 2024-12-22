const express = require("express");
const router = express.Router();
const Reader = require("../models/Reader");
const mongoose = require("mongoose")

// Get all readers
router.get("/", async (req, res) => {
  const readers = await Reader.find();
  res.json(readers);
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

module.exports = router;