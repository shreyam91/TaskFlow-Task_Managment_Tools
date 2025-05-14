const express = require('express');
const router = express.Router();

const { getUser, getAllUsers } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/user', verifyToken, getUser);
router.get('/users', verifyToken, getAllUsers);

module.exports = router;
