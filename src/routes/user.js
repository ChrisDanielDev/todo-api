const express = require("express");

const { authenticateUser } = require("../middlewares/authentification");

const router = express.Router();

// User endpoint
router.get('/user', authenticateUser, async (req, res) => {
  const {id, name, email } = req.user;
  res.status(200).json({ user: { id, name, email } });
});

module.exports = {
  userRouter: router
}
