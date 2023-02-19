const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const JWT_SECRET_KEY = process.env.password_salt || 'your-secret-key-here';
const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the given email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, { expiresIn: '1h' });

    // Return success response with JWT token
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = {
  loginRouter: router
}
