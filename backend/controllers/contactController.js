const ContactInquiry = require('../models/ContactInquiry');
const transporter = require('../config/mail');
const { sendContactNotification } = require('../services/whatsappService');

/**
 * @desc    Submit new contact inquiry, dispatch Nodemailer email alert and Twilio WhatsApp alert
 * @route   POST /api/contacts
 * @access  Public (Validated)
 */
const submitInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, city, subject, message } = req.body;

    // 1. Stage 1: Database Storage (Core Requirement)
    const newInquiry = await ContactInquiry.create({
      name,
      email,
      phone,
      city,
      subject: subject || 'General Catalog Inquiry',
      message,
    });

    // 2. Stage 2: Email Alert (Nodemailer - Fail-safe)
    try {
      const mailOptions = {
        from: `"${name} via NEXXORA" <${process.env.SMTP_USER || 'greenvolt28@gmail.com'}>`,
        to: process.env.NOTIFICATION_EMAIL || 'greenvolt28@gmail.com',
        replyTo: email,
        subject: `New Contact Inquiry - NEXXORA`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 25px; border: 1px solid #c9a84c; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            
            <div style="text-align: center; border-bottom: 2px solid #c9a84c; padding-bottom: 15px; margin-bottom: 20px;">
              <h1 style="color: #1a1a2e; margin: 0; font-size: 24px; letter-spacing: 1px;">NEXXORA</h1>
              <p style="color: #c9a84c; margin: 5px 0 0 0; font-size: 12px; font-weight: bold; text-transform: uppercase;">Premium Bathroom Accessories Catalogue</p>
            </div>

            <h2 style="color: #1a1a2e; font-size: 18px; border-left: 4px solid #c9a84c; padding-left: 10px; margin-bottom: 15px;">New Inquiry Details</h2>
            
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
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">City / Location:</td>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; color: #111;">${city || 'Not Provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Subject:</td>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; color: #111; font-weight: bold;">${subject || 'General Catalog Inquiry'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; font-weight: bold; color: #555; vertical-align: top;">Message / Inquiry:</td>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; color: #333; line-height: 1.5;">${message}</td>
              </tr>
              <tr>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Submitted At:</td>
                <td style="padding: 10px 5px; border-bottom: 1px solid #eee; color: #555;">${newInquiry.createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
              </tr>
            </table>

            <div style="border-top: 1px solid #eee; padding-top: 15px; text-align: center; font-size: 11px; color: #888; line-height: 1.4;">
              <p style="margin: 0 0 5px 0;">This email is an automated transmission triggered from the NEXXORA Catalogue Contact Form.</p>
              <p style="margin: 0;"><strong>Greenvolt Enterprise</strong> · Ahmedabad, Gujarat, India · +91 99986 64704</p>
            </div>

          </div>
        `
      };
      await transporter.sendMail(mailOptions);
      console.log('Nodemailer successfully dispatched Contact Us email notification.');
    } catch (emailError) {
      // Gracefully log email failure but continue processing WhatsApp and response
      console.error('Nodemailer failed to dispatch Contact Us email alert:', emailError.message);
    }

    // 3. Stage 3: WhatsApp Alert (Twilio - Fail-safe)
    try {
      await sendContactNotification(newInquiry);
    } catch (whatsappError) {
      // Gracefully log WhatsApp failure but continue processing response
      console.error('Twilio failed to dispatch Contact Us WhatsApp alert:', whatsappError.message);
    }

    // 4. Return standard success API response
    return res.status(201).json({
      success: true,
      message: 'Your contact inquiry has been submitted and recorded successfully.',
      inquiry: newInquiry,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc    Get all contact inquiries
 * @route   GET /api/contacts
 * @access  Private (Admin Protected)
 */
const getAllInquiries = async (req, res, next) => {
  try {
    const pageNum = parseInt(req.query.page, 10) || 1;
    const limitNum = parseInt(req.query.limit, 10) || 20;
    const skipNum = (pageNum - 1) * limitNum;

    const totalInquiries = await ContactInquiry.countDocuments();
    const inquiries = await ContactInquiry.find()
      .sort({ createdAt: -1 })
      .skip(skipNum)
      .limit(limitNum);

    return res.json({
      success: true,
      count: inquiries.length,
      totalPages: Math.ceil(totalInquiries / limitNum),
      currentPage: pageNum,
      totalInquiries,
      inquiries,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc    Mark contact inquiry resolved status
 * @route   PUT /api/contacts/:id/resolve
 * @access  Private (Admin Protected)
 */
const markResolved = async (req, res, next) => {
  try {
    const inquiry = await ContactInquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, error: 'Contact inquiry not found' });
    }

    // Toggle resolved status
    inquiry.resolved = !inquiry.resolved;
    await inquiry.save();

    return res.json({
      success: true,
      message: `Inquiry marked as ${inquiry.resolved ? 'resolved' : 'pending'}`,
      inquiry
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  submitInquiry,
  getAllInquiries,
  markResolved,
};
