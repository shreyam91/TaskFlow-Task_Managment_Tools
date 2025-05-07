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

// Add this to your userRoutes.js

router.get('/users', verifyToken, async (req, res) => {
  try {
    const users = await User.find({}, 'username firstname lastname _id'); // Fetch limited fields
    const formattedUsers = users.map(user => ({
      id: user._id,
      name: `${user.firstname} ${user.lastname}` // or username, depending on what you prefer
    }));
    res.json(formattedUsers);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
