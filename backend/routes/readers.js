const express = require("express");
const router = express.Router();
const Reader = require("../models/Reader");

// Get all readers
router.get("/", async (req, res) => {
  const readers = await Reader.find();
  res.json(readers);
});

// Add a new reader
router.post("/", async (req, res) => {
  const reader = new Reader(req.body);
  await reader.save();
  res.json(reader);
});

module.exports = router;