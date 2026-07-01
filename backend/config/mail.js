const nodemailer = require('nodemailer');

/**
 * Formats Nodemailer/SMTP errors for API responses and logs.
 */
function formatSmtpError(error) {
  if (!error) return 'Unknown email error';
  const details = [error.message || 'Email send failed'];
  if (error.code) details.push(`code: ${error.code}`);
  if (error.responseCode) details.push(`SMTP response: ${error.responseCode}`);
  return details.join(' | ');
}

/**
 * Configure SMTP Mail Transporter.
 * Uses environment variables for authentication.
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_PORT === '465', // True for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false // Helps avoid SSL/TLS issues in development
  }
});

module.exports = transporter;
module.exports.formatSmtpError = formatSmtpError;
