const mongoose = require('mongoose');

/**
 * Contact Inquiry Schema.
 * Captures user contact forms.
 */
const contactInquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  city: {
    type: String,
    default: '',
    trim: true,
  },
  subject: {
    type: String,
    default: 'General Inquiry',
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ContactInquiry', contactInquirySchema);
