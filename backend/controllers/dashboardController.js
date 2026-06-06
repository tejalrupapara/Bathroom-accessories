const Product = require('../models/Product');
const QuoteRequest = require('../models/QuoteRequest');
const ContactInquiry = require('../models/ContactInquiry');
const Newsletter = require('../models/Newsletter');

/**
 * @desc    Fetch Admin Dashboard statistics
 * @route   GET /api/dashboard/stats
 * @access  Private (Admin Protected)
 */
const getStats = async (req, res, next) => {
  try {
    // Perform concurrent counts for high-performance response times
    const [totalProducts, totalQuotes, totalInquiries, totalSubscribers] = await Promise.all([
      Product.countDocuments(),
      QuoteRequest.countDocuments(),
      ContactInquiry.countDocuments(),
      Newsletter.countDocuments(),
    ]);

    // Fetch brief recent activity feeds to enrich the dashboard visual layout
    const [recentQuotes, recentInquiries] = await Promise.all([
      QuoteRequest.find().sort({ createdAt: -1 }).limit(5),
      ContactInquiry.find().sort({ createdAt: -1 }).limit(5)
    ]);

    return res.json({
      success: true,
      stats: {
        totalProducts,
        totalQuotes,
        totalInquiries,
        totalSubscribers,
      },
      recentActivity: {
        quotes: recentQuotes,
        inquiries: recentInquiries
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getStats,
};
