const express = require('express');
const router = express.Router();
const {
  submitQuote,
  getAllQuotes,
  markContacted,
  deleteQuote,
} = require('../controllers/quoteController');
const { validateQuote } = require('../middleware/validate');
const { protect } = require('../middleware/auth');

// Public quote registration route
router.post('/', validateQuote, submitQuote);

// Admin-secured quotes viewing, status updating and deletion routes
router.get('/', protect, getAllQuotes);
router.put('/:id/contacted', protect, markContacted);
router.delete('/:id', protect, deleteQuote);

module.exports = router;
