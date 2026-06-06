const mongoose = require('mongoose');

/**
 * Newsletter Subscription Schema.
 * Forces unique entries.
 */
const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
