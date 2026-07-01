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

  console.log('📱 WhatsApp Configuration Check:');
  console.log('Account SID exists:', !!accountSid);
  console.log('Auth Token exists:', !!authToken);
  console.log('From WhatsApp:', fromWhatsApp);
  console.log('To WhatsApp:', toWhatsApp);

  // Check if credentials are properly configured
  if (!accountSid || !authToken || accountSid.startsWith('ACXXXXXX') || authToken === 'mockpass') {
    console.warn('⚠️ Twilio WhatsApp API Credentials are unconfigured or placeholder.');
    console.warn('Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env');
    return { success: false, reason: 'Credentials unconfigured' };
  }

  // Validate phone number format
  if (!toWhatsApp.startsWith('whatsapp:+')) {
    console.warn('⚠️ Invalid WhatsApp number format. Must be: whatsapp:+919998664704');
    return { success: false, reason: 'Invalid phone number format' };
  }

  try {
    const client = twilio(accountSid, authToken);
    console.log('📤 Sending WhatsApp message...');
    console.log('Message preview:', body.substring(0, 100) + '...');
    
    const result = await client.messages.create({
      body,
      from: fromWhatsApp,
      to: toWhatsApp,
    });
    
    console.log(`✅ Twilio WhatsApp message sent successfully. SID: ${result.sid}`);
    console.log(`📊 Message Status: ${result.status}`);
    return { success: true, sid: result.sid, status: result.status };
    
  } catch (error) {
    console.error('❌ Twilio WhatsApp dispatch failed:');
    console.error('Error Message:', error.message);
    console.error('Error Code:', error.code);
    console.error('Error Status:', error.status);
    
    // Provide helpful error messages
    if (error.code === 20003) {
      console.error('🔑 Authentication Error: Invalid Twilio Account SID or Auth Token');
    } else if (error.code === 21211) {
      console.error('📱 Invalid  Phone Number: Check the WhatsApp number format');
    } else if (error.code === 21408) {
      console.error('🚫 WhatsApp Business API not active for this number');
    } else if (error.code === 21608) {
      console.error('⚠️ The phone number is not a valid WhatsApp Business account');
    }
    
    throw error;
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