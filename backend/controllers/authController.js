const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

/**
 * @desc    Admin login & generate token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Locate administrative user
    const admin = await Admin.findOne({ username: username.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    // Compare passwords
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    // Generate JSON Web Token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'NEXXORA_SECRET_KEY_123456',
      { expiresIn: '30d' } // Extended admin session length
    );

    return res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc    Change admin password
 * @route   POST /api/auth/change-password
 * @access  Private (Admin Protected)
 */
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, error: 'Please enter both current and new passwords' });
    }

    // Retrieve active admin session details
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ success: false, error: 'Admin user not found' });
    }

    // Authenticate current password
    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Incorrect current password' });
    }

    // Set new password (will trigger pre-save hashing hook)
    admin.password = newPassword;
    await admin.save();

    return res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
  changePassword,
};
