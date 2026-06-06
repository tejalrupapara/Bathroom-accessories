const mongoose = require('mongoose');

/**
 * Quote Request Schema.
 * Captures user contact details and chosen items.
 */
const quoteRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  company: {
    type: String,
    default: '',
    trim: true,
  },
  city: {
    type: String,
    default: '',
    trim: true,
  },
  message: {
    type: String,
    default: '',
    trim: true,
  },
  selectedProducts: {
    type: [mongoose.Schema.Types.Mixed],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'At least one product must be selected for a quote request.'
    }
  },
  contacted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('QuoteRequest', quoteRequestSchema);
