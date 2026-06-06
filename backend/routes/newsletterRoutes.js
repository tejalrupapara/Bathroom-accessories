const express = require('express');
const router = express.Router();
const {
  subscribe,
  getAllSubscribers,
  exportSubscribers,
} = require('../controllers/newsletterController');
const { validateNewsletter } = require('../middleware/validate');
const { protect } = require('../middleware/auth');

// Public subscription route
router.post('/subscribe', validateNewsletter, subscribe);

// Admin-secured viewing and exporting routes
router.get('/subscribers', protect, getAllSubscribers);
router.get('/export', protect, exportSubscribers);

module.exports = router;
