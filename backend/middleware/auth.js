const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

/**
 * Protect routes - require JWT Admin Authentication.
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'NEXXORA_SECRET_KEY_123456');

      // Bind admin session to request (excluding password)
      req.admin = await Admin.findById(decoded.id).select('-password');
      
      if (!req.admin) {
        return res.status(401).json({ success: false, error: 'Not authorized, admin not found' });
      }

      return next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({ success: false, error: 'Not authorized, token verification failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
