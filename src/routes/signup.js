const express = require("express");
const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");

const { User } = require("../models");

const router = express.Router();

const SALT = process.env.password_salt || 10;

// Password validation schema
const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .not().spaces();

// Sign-up endpoint
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user with email already exists
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: 'User with email already exists' });
    }

    // Validate name
    if (!name) {
      return res.status(400).json({ message: 'Missing field name' });
    }

    // Validate the password
    if (!passwordSchema.validate(password)) {
      return res.status(400).json({ message: 'Invalid password format, it must have at least 8 characters, one symbol, one number, one uppercase, one lowercase and no trailing spaces.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT);

    // Create the user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Return success response
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = {
  signUpRouter: router
}
