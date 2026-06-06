const twilio = require('twilio');

/**
 * Send custom formatted WhatsApp message using Twilio WhatsApp API.
 * @param {string} body - The message body to transmit
 */
const sendWhatsAppMessage = async (body) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromWhatsApp = process.env.TWILIO_FROM_WHATSAPP || 'whatsapp:+14155238886';
  const toWhatsApp = process.env.TO_WHATSAPP || 'whatsapp:+919998664704';

  // Return gracefully if Twilio is not pre-configured
  if (!accountSid || !authToken || accountSid.startsWith('ACXXXXXX') || authToken === 'mockpass' || authToken === 'your_twilio_auth_token') {
    console.warn('Twilio WhatsApp API Credentials are unconfigured or placeholder. Skipping WhatsApp transmission.');
    return { success: false, reason: 'Credentials unconfigured' };
  }

  try {
    const client = twilio(accountSid, authToken);
    const result = await client.messages.create({
      body,
      from: fromWhatsApp,
      to: toWhatsApp,
    });
    console.log(`Twilio WhatsApp message sent successfully. SID: ${result.sid}`);
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error('Twilio WhatsApp dispatch failed:', error.message);
    throw error; // Re-throw to allow capturing in controller try-catches
  }
};

/**
 * Send Contact Inquiry Alert via WhatsApp.
 * @param {Object} inquiry - The contact inquiry document
 */
const sendContactNotification = async (inquiry) => {
  const { name, email, phone, city, subject, message } = inquiry;

  const formattedMsg = `🔔 *New Contact Inquiry*

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Location/City:* ${city || 'Not Provided'}

*Subject:* ${subject || 'General Catalog Inquiry'}

*Message:*
${message}

_Submitted From:_
NEXXORA Website`;

  return await sendWhatsAppMessage(formattedMsg);
};

/**
 * Send Quote Request Alert via WhatsApp.
 * @param {Object} quote - The quote request document
 */
const sendQuoteNotification = async (quote) => {
  const { name, email, phone, company, city, message, selectedProducts } = quote;

  // Compile individual products list
  const productsList = selectedProducts && Array.isArray(selectedProducts)
    ? selectedProducts.map(p => `• ${p.name || 'Accessory'} (${p.id || 'Code'})`).join('\n')
    : 'No items selected';

  const formattedMsg = `🔔 *New Quote Request*

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Company:* ${company || 'Not Provided'}
*Location/City:* ${city || 'Not Provided'}

*Selected Products:*
${productsList}

*Message:*
${message || 'No additional message was provided.'}

_Submitted From:_
NEXXORA Website`;

  return await sendWhatsAppMessage(formattedMsg);
};

module.exports = {
  sendContactNotification,
  sendQuoteNotification,
};
