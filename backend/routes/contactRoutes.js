const express = require('express');
const router = express.Router();
const {
  submitInquiry,
  getAllInquiries,
  markResolved,
} = require('../controllers/contactController');
const { validateContact } = require('../middleware/validate');
const { protect } = require('../middleware/auth');

// Public contact form submission route
router.post('/', validateContact, submitInquiry);

// Admin-secured contact logs listing and resolution route
router.get('/', protect, getAllInquiries);
router.put('/:id/resolve', protect, markResolved);

module.exports = router;
