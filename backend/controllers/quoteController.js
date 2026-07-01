const QuoteRequest = require('../models/QuoteRequest');
const { sendNotificationEmail, formatEmailError } = require('../services/emailService');
const { sendQuoteNotification } = require('../services/whatsappService');

/**
 * @desc    Submit user quote request, dispatch Nodemailer email alert and Twilio WhatsApp alert
 * @route   POST /api/quotes
 * @access  Public (Validated)
 */
const submitQuote = async (req, res, next) => {
  try {
    const { name, phone, email, company, city, message, selectedProducts } = req.body;

    // 1. Stage 1: Database Storage (Core Requirement)
    const newQuote = await QuoteRequest.create({
      name,
      phone,
      email,
      company,
      city,
      message,
      selectedProducts,
    });

    // 2. Stage 2: Email Alert (Resend on Render / SMTP locally - Fail-safe)
    let emailStatus = { sent: false, error: null };
    try {
      // Construct Product List HTML
      const productListHtml = selectedProducts.map(p => `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-family: monospace; font-weight: bold; color: #1a1a2e;">${p.id || 'N/A'}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${p.name || 'N/A'}</td>
          <td style="padding: 10px; border: 1px solid #ddd; color: #c9a84c; font-weight: bold;">${p.category || 'N/A'}</td>
          <td style="padding: 10px; border: 1px solid #ddd; font-style: italic;">${p.series || 'N/A'}</td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${p.price ? `₹${p.price.toLocaleString('en-IN')}` : 'N/A'}</td>
        </tr>
      `).join('');

      const result = await sendNotificationEmail({
        fromName: name,
        replyTo: email,
        subject: 'New Quote Request - NEXXORA',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 25px; border: 1px solid #c9a84c; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            
            <div style="text-align: center; border-bottom: 2px solid #c9a84c; padding-bottom: 15px; margin-bottom: 20px;">
              <h1 style="color: #1a1a2e; margin: 0; font-size: 24px; letter-spacing: 1px;">NEXXORA</h1>
              <p style="color: #c9a84c; margin: 5px 0 0 0; font-size: 12px; font-weight: bold; text-transform: uppercase;">Premium Bathroom Accessories Catalogue</p>
            </div>

            <h2 style="color: #1a1a2e; font-size: 18px; border-left: 4px solid #c9a84c; padding-left: 10px; margin-bottom: 15px;">New Quote Request Details</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px;">
              <tr>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; width: 30%; font-weight: bold; color: #555;">Name:</td>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; color: #111;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; color: #111;"><a href="mailto:${email}" style="color: #c9a84c; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; color: #111;"><a href="tel:${phone}" style="color: #c9a84c; text-decoration: none;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Company Name:</td>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; color: #111;">${company || 'Not Provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">City / Location:</td>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; color: #111;">${city || 'Not Provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; font-weight: bold; color: #555; vertical-align: top;">Cover Letter / Message:</td>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; color: #333; line-height: 1.5;">${message || 'No additional message was provided.'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Submitted At:</td>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; color: #555;">${newQuote.createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
              </tr>
            </table>

            <h3 style="color: #1a1a2e; font-size: 16px; border-left: 4px solid #c9a84c; padding-left: 10px; margin-bottom: 15px;">Selected Accessories Overview</h3>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 13px;">
              <thead>
                <tr style="background-color: #f7f5f0; border-top: 2px solid #c9a84c; border-bottom: 2px solid #c9a84c;">
                  <th style="padding: 12px 10px; text-align: left; color: #1a1a2e; font-weight: bold;">Code</th>
                  <th style="padding: 12px 10px; text-align: left; color: #1a1a2e; font-weight: bold;">Product Accessory</th>
                  <th style="padding: 12px 10px; text-align: left; color: #1a1a2e; font-weight: bold;">Category</th>
                  <th style="padding: 12px 10px; text-align: left; color: #1a1a2e; font-weight: bold;">Series</th>
                  <th style="padding: 12px 10px; text-align: right; color: #1a1a2e; font-weight: bold;">M.R.P (Each)</th>
                </tr>
              </thead>
              <tbody>
                ${productListHtml}
              </tbody>
            </table>

            <div style="background-color: #fcfbf9; border: 1px dashed #c9a84c; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
              <p style="margin: 0; font-size: 13px; color: #1a1a2e;">
                <strong>Next Action:</strong> Contact the customer within 24 hours to present pricing and coordinate specifications.
              </p>
            </div>

            <div style="border-top: 1px solid #eee; padding-top: 15px; text-align: center; font-size: 11px; color: #888; line-height: 1.4;">
              <p style="margin: 0 0 5px 0;">This email is an automated transmission triggered from the NEXXORA Catalogue Portal.</p>
              <p style="margin: 0;"><strong>Greenvolt Enterprise</strong> · Ahmedabad, Gujarat, India · +91 99986 64704</p>
            </div>

          </div>
        `,
      });
      emailStatus = { sent: true, error: null, provider: result.provider };
      console.log(`Quote Request email sent via ${result.provider}.`);
    } catch (emailError) {
      emailStatus = { sent: false, error: formatEmailError(emailError) };
      console.error('Failed to dispatch Quote Request email alert:', emailStatus.error);
    }

    // 3. Stage 3: WhatsApp Alert (Twilio - Fail-safe)
    let whatsappStatus = { sent: false, error: null };
    try {
      await sendQuoteNotification(newQuote);
      whatsappStatus = { sent: true, error: null };
    } catch (whatsappError) {
      whatsappStatus = { sent: false, error: whatsappError.message || 'WhatsApp notification failed' };
      console.error('Twilio failed to dispatch Quote Request WhatsApp alert:', whatsappStatus.error);
    }

    // 4. Return API response with notification status for browser debugging
    return res.status(201).json({
      success: true,
      message: 'Quote request submitted and recorded successfully.',
      quote: newQuote,
      notifications: {
        email: emailStatus,
        whatsapp: whatsappStatus,
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc    Get all quote requests
 * @route   GET /api/quotes
 * @access  Private (Admin Protected)
 */
const getAllQuotes = async (req, res, next) => {
  try {
    const pageNum = parseInt(req.query.page, 10) || 1;
    const limitNum = parseInt(req.query.limit, 10) || 20;
    const skipNum = (pageNum - 1) * limitNum;

    const totalQuotes = await QuoteRequest.countDocuments();
    const quotes = await QuoteRequest.find()
      .sort({ createdAt: -1 })
      .skip(skipNum)
      .limit(limitNum);

    return res.json({
      success: true,
      count: quotes.length,
      totalPages: Math.ceil(totalQuotes / limitNum),
      currentPage: pageNum,
      totalQuotes,
      quotes,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc    Mark quote request contacted status
 * @route   PUT /api/quotes/:id/contacted
 * @access  Private (Admin Protected)
 */
const markContacted = async (req, res, next) => {
  try {
    const quote = await QuoteRequest.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, error: 'Quote request not found' });
    }

    // Toggle contacted status
    quote.contacted = !quote.contacted;
    await quote.save();

    return res.json({
      success: true,
      message: `Quote marked as ${quote.contacted ? 'contacted' : 'pending'}`,
      quote
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc    Delete a quote request
 * @route   DELETE /api/quotes/:id
 * @access  Private (Admin Protected)
 */
const deleteQuote = async (req, res, next) => {
  try {
    const quote = await QuoteRequest.findByIdAndDelete(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, error: 'Quote request not found' });
    }

    return res.json({ success: true, message: 'Quote request deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  submitQuote,
  getAllQuotes,
  markContacted,
  deleteQuote,
};
