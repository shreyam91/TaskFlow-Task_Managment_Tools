const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getDashboardData,
  searchAndFilterTasks,
} = require('../controllers/taskController');

// Define the POST route only once, with the logging middleware first
router.post('/', auth, (req, res, next) => {
  console.log("🛬 Incoming task POST request");
  next(); // Pass control to the next middleware (createTask)
}, createTask);

router.get('/', auth, getTasks);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

// New routes
router.get('/dashboard/overview', auth, getDashboardData);
router.get('/search/filter', auth, searchAndFilterTasks);

module.exports = router;
