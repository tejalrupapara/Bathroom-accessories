const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

// Protected dashboard metrics endpoints
router.get('/stats', protect, getStats);

module.exports = router;
