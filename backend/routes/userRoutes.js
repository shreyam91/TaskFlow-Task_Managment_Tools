// routes/userRoute.js
const express = require('express');
const router = express.Router();

const { getUser, getAllUsers } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');

// Any authenticated user
router.get('/user', verifyToken, getUser);

// Only admin can view all users
router.get('/users', verifyToken, authorizeRole('admin'), getAllUsers);

module.exports = router;
