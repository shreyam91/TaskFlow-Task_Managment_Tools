// teamRoutes.js
const express = require('express');
const {
  createTeam,
  getAllTeams,
  deleteTeam,
  updateTeam,
} = require('../controllers/teamController');

const router = express.Router();

router.post('/', createTeam);
router.get('/', getAllTeams);
router.put('/:id', updateTeam);
router.patch('/:id', updateTeam);
router.delete('/:id', deleteTeam);

module.exports = router;
