const express = require('express');

const { RevokedToken } = require("../models");
const { authenticateUser } = require("../middlewares/authentification");

const router = express.Router();

// Login endpoint
router.post('/logout', authenticateUser, async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    try {
      // Check if the token has already been revoked
      const revokedToken = await RevokedToken.findOne({ where: { token: token } });
      if (revokedToken) {
        return res.status(401).json({ message: 'Authorization token has been revoked' });
      }

      // Revoke the token by adding it to the database
      await RevokedToken.create({ token: token, revokedAt: new Date() });

      res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {
  logoutRouter: router
}
