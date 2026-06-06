const mongoose = require('mongoose');

/**
 * Product Schema for Premium Accessories.
 */
const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Product code ID is required'],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Sky', 'Prism', 'Lume', 'Vector', 'Nova', 'Neo', 'Prime'],
      message: 'Category must be Sky, Prism, Lume, Vector, Nova, Neo, or Prime'
    },
    trim: true,
  },
  series: {
    type: String,
    required: [true, 'Series description is required'],
    trim: true,
  },
  badge: {
    type: String,
    default: '',
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  image: {
    type: String,
    default: '',
    trim: true,
  },
  finishes: {
    type: [String],
    default: ['Black', 'Rose Gold', 'Gold'],
  },
  acrylicVariants: {
    type: [String],
    default: ['White Acrylic', 'Black Acrylic', 'Marble Acrylic'],
  },
  price: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
