const Newsletter = require('../models/Newsletter');

/**
 * @desc    Subscribe new email to newsletter
 * @route   POST /api/newsletter/subscribe
 * @access  Public (Validated)
 */
const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    // Check duplicate manually for robust user feedback
    const existing = await Newsletter.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ success: false, error: 'This email is already subscribed to our newsletter' });
    }

    const subscriber = await Newsletter.create({ email: normalizedEmail });

    return res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter.',
      subscriber,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc    Get all newsletter subscribers
 * @route   GET /api/newsletter/subscribers
 * @access  Private (Admin Protected)
 */
const getAllSubscribers = async (req, res, next) => {
  try {
    const pageNum = parseInt(req.query.page, 10) || 1;
    const limitNum = parseInt(req.query.limit, 10) || 50;
    const skipNum = (pageNum - 1) * limitNum;

    const totalSubscribers = await Newsletter.countDocuments();
    const subscribers = await Newsletter.find()
      .sort({ subscribedAt: -1 })
      .skip(skipNum)
      .limit(limitNum);

    return res.json({
      success: true,
      count: subscribers.length,
      totalPages: Math.ceil(totalSubscribers / limitNum),
      currentPage: pageNum,
      totalSubscribers,
      subscribers,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc    Export subscriber list as CSV file
 * @route   GET /api/newsletter/export
 * @access  Private (Admin Protected)
 */
const exportSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });

    // Compile columns header
    let csvContent = '\uFEFFEmail,Subscription Date\r\n'; // \uFEFF is UTF-8 BOM for Excel compatibility

    subscribers.forEach(sub => {
      const formattedDate = sub.subscribedAt.toISOString().replace(/T/, ' ').replace(/\..+/, '');
      csvContent += `"${sub.email}","${formattedDate}"\r\n`;
    });

    // Set download headers
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=nexxora_subscribers.csv');

    return res.status(200).send(csvContent);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  subscribe,
  getAllSubscribers,
  exportSubscribers,
};
