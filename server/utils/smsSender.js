const twilio = require('twilio');
require('dotenv').config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (message, numbersArray) => {
  const results = [];

  for (const number of numbersArray) {
    try {
      const res = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: number.startsWith('+') ? number : `+91${number}` // Convert if needed
      });
      results.push({ number, sid: res.sid });
    } catch (err) {
      console.error(`❌ Failed for ${number}:`, err.message);
      results.push({ number, error: err.message });
    }
  }

  return results;
};

module.exports = sendSMS;
