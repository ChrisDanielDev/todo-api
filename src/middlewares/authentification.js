// Middleware to verify user authentication
const jwt = require("jsonwebtoken");
const { User, RevokedToken } = require("../models");

const JWT_SECRET_KEY = process.env.password_salt || 'your-secret-key-here';

async function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    // Check if the token has been revoked
    const revokedToken = await RevokedToken.findOne({ where: { token: token } });
    if (revokedToken) {
      return res.status(401).json({ message: 'Authorization token has been revoked' });
    }

    User.findOne({ where: { id: decoded.userId } }).then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = user;

      next();
    });
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = { authenticateUser };
