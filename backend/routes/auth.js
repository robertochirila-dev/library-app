// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT token with user role
        const token = jwt.sign({ userId: user._id, role: user.userType }, "your_jwt_secret_key", { expiresIn: "1h" });

        res.json({ token }); // Send token to frontend
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Registration route
router.post('/register', async (req, res) => {
    const { email, password, userType, username } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({
            email,
            username,
            password,
            userType,
        });

        // Save user to DB
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;