const express = require('express');
const { createMatch, getMatches } = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createMatch).get(protect, getMatches);

module.exports = router;
