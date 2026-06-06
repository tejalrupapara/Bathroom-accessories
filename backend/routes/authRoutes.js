const express = require('express');
const router = express.Router();
const { login, changePassword } = require('../controllers/authController');
const { validateLogin } = require('../middleware/validate');
const { protect } = require('../middleware/auth');

// Public route for administration logging
router.post('/login', validateLogin, login);

// Private route for admin updating passwords
router.post('/change-password', protect, changePassword);

module.exports = router;
