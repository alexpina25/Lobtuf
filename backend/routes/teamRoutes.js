const express = require('express');
const { createTeam, getTeams } = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createTeam).get(protect, getTeams);

module.exports = router;
