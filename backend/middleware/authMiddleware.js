// middleware/auth.js

const jwt = require('jsonwebtoken');

// You should set this in your .env in production
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Simple Express middleware for JWT authentication
module.exports = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token. Authorization denied.' });
  }
  const token = authHeader.replace('Bearer ', '').trim();

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded payload (like { userId }) to request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token is not valid.' });
  }
};
