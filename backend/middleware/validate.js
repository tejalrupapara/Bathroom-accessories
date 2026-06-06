/**
 * Custom Input Validation Middleware Module.
 * Ensures data integrity before reaching controllers.
 */

const validateQuote = (req, res, next) => {
  const { name, phone, email, selectedProducts } = req.body;
  const errors = [];

  if (!name || name.trim() === '') {
    errors.push({ field: 'name', message: 'Name is required' });
  }
  
  if (!phone || phone.trim() === '') {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  }
  
  if (!email || email.trim() === '') {
    errors.push({ field: 'email', message: 'Email address is required' });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
  }

  if (!selectedProducts || !Array.isArray(selectedProducts) || selectedProducts.length === 0) {
    errors.push({ field: 'selectedProducts', message: 'At least one product must be selected for your quote request' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  next();
};

const validateContact = (req, res, next) => {
  const { name, email, phone, message } = req.body;
  const errors = [];

  if (!name || name.trim() === '') {
    errors.push({ field: 'name', message: 'Name is required' });
  }
  
  if (!phone || phone.trim() === '') {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  }

  if (!email || email.trim() === '') {
    errors.push({ field: 'email', message: 'Email address is required' });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
  }

  if (!message || message.trim() === '') {
    errors.push({ field: 'message', message: 'Message content is required' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  next();
};

const validateNewsletter = (req, res, next) => {
  const { email } = req.body;
  const errors = [];

  if (!email || email.trim() === '') {
    errors.push({ field: 'email', message: 'Email address is required' });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  const errors = [];

  if (!username || username.trim() === '') {
    errors.push({ field: 'username', message: 'Username is required' });
  }
  
  if (!password || password.trim() === '') {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  next();
};

module.exports = {
  validateQuote,
  validateContact,
  validateNewsletter,
  validateLogin,
};
