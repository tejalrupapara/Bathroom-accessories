const mongoose = require('mongoose');
const Product = require('../models/Product');

/**
 * @desc    Get all products with filtering, searching, sorting and pagination
 * @route   GET /api/products
 * @access  Public
 */
const getAllProducts = async (req, res, next) => {
  try {
    const { category, series, search, sort, page, limit } = req.query;

    const query = {};

    // 1. Category filter (exclude 'All' wildcard)
    if (category && category !== 'All' && category !== 'all') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    // 2. Series filter
    if (series) {
      query.series = { $regex: new RegExp(series, 'i') };
    }

    // 3. Search query
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { id: { $regex: search, $options: 'i' } },
      ];
    }

    // 4. Sorting logic
    let sortOptions = { createdAt: -1 }; // default: newest
    if (sort) {
      switch (sort) {
        case 'price_asc':
          sortOptions = { price: 1 };
          break;
        case 'price_desc':
          sortOptions = { price: -1 };
          break;
        case 'name_asc':
          sortOptions = { name: 1 };
          break;
        case 'name_desc':
          sortOptions = { name: -1 };
          break;
        case 'newest':
        default:
          sortOptions = { createdAt: -1 };
          break;
      }
    }

    // 5. Pagination
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const skipNum = (pageNum - 1) * limitNum;

    // Fetch counts and records
    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skipNum)
      .limit(limitNum);

    return res.json({
      success: true,
      count: products.length,
      totalPages: Math.ceil(totalProducts / limitNum),
      currentPage: pageNum,
      totalProducts,
      products,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc    Get specific product by ID (supports Mongoose ObjectId and custom product code like SAA-1)
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req, res, next) => {
  try {
    const identifier = req.params.id;

    // Check custom code first, then mongo ID if valid
    const query = {
      $or: [{ id: identifier }]
    };

    if (mongoose.isValidObjectId(identifier)) {
      query.$or.push({ _id: identifier });
    }

    const product = await Product.findOne(query);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product accessory not found' });
    }

    return res.json({ success: true, product });
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private (Admin Protected)
 */
const createProduct = async (req, res, next) => {
  try {
    const { id, name, category, series, badge, description, image, finishes, acrylicVariants, price } = req.body;

    // Block if product code exists
    const duplicate = await Product.findOne({ id: id.toUpperCase().trim() });
    if (duplicate) {
      return res.status(400).json({ success: false, error: `Product code '${id}' is already registered` });
    }

    const product = await Product.create({
      id: id.toUpperCase().trim(),
      name,
      category,
      series,
      badge,
      description,
      image,
      finishes,
      acrylicVariants,
      price,
    });

    return res.status(201).json({ success: true, product });
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc    Update product catalog details
 * @route   PUT /api/products/:id
 * @access  Private (Admin Protected)
 */
const updateProduct = async (req, res, next) => {
  try {
    const identifier = req.params.id;
    const query = { $or: [{ id: identifier }] };
    if (mongoose.isValidObjectId(identifier)) {
      query.$or.push({ _id: identifier });
    }

    const product = await Product.findOneAndUpdate(query, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    return res.json({ success: true, product });
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc    Remove product accessory
 * @route   DELETE /api/products/:id
 * @access  Private (Admin Protected)
 */
const deleteProduct = async (req, res, next) => {
  try {
    const identifier = req.params.id;
    const query = { $or: [{ id: identifier }] };
    if (mongoose.isValidObjectId(identifier)) {
      query.$or.push({ _id: identifier });
    }

    const product = await Product.findOneAndDelete(query);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    return res.json({ success: true, message: 'Product accessory deleted from catalogue' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
