const { Resend } = require('resend');
const transporter = require('../config/mail');
const formatSmtpError = require('../config/mail').formatSmtpError;

const resendClient = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function getEmailProvider() {
  return resendClient ? 'resend' : 'smtp';
}

/**
 * Sends notification emails.
 * Uses Resend HTTPS API on Render (when RESEND_API_KEY is set).
 * Falls back to Gmail SMTP for local development.
 */
async function sendNotificationEmail({ fromName, replyTo, subject, html }) {
  const to = process.env.NOTIFICATION_EMAIL || 'greenvolt28@gmail.com';

  if (resendClient) {
    const from = process.env.RESEND_FROM_EMAIL || 'NEXXORA <onboarding@resend.dev>';
    const { data, error } = await resendClient.emails.send({
      from,
      to: [to],
      reply_to: replyTo,
      subject,
      html,
    });

    if (error) {
      throw new Error(error.message || 'Resend API email send failed');
    }

    return { provider: 'resend', id: data?.id };
  }

  const fromEmail = process.env.SMTP_USER || 'greenvolt28@gmail.com';
  await transporter.sendMail({
    from: `"${fromName} via NEXXORA" <${fromEmail}>`,
    to,
    replyTo,
    subject,
    html,
  });

  return { provider: 'smtp' };
}

function formatEmailError(error) {
  if (!error) return 'Unknown email error';
  return error.message || formatSmtpError(error);
}

async function verifyEmailConfig() {
  if (resendClient) {
    if (!process.env.RESEND_API_KEY.startsWith('re_')) {
      throw new Error('RESEND_API_KEY looks invalid (should start with re_)');
    }
    return { provider: 'resend', ready: true };
  }

  await new Promise((resolve, reject) => {
    transporter.verify((error) => {
      if (error) reject(error);
      else resolve();
    });
  });

  return { provider: 'smtp', ready: true };
}

module.exports = {
  sendNotificationEmail,
  formatEmailError,
  verifyEmailConfig,
  getEmailProvider,
};
