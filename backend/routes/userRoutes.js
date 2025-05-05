// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken'); // to verify token

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ msg: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user data in the request object
    next();
  } catch (err) {
    return res.status(400).json({ msg: 'Invalid token' });
  }
};

// Get user data endpoint
router.get('/user', verifyToken, async (req, res) => {
  try {
    // Assuming the user ID is stored in the token
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({
        username: user.username,
        firstname:user.firstname,
        lastname: user.lastname,
        email: user.email,
        // avatar: user.avatar,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
