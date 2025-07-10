const sendSMS = require('../utils/smsSender');
const Contact = require('../models/Contact');
const Message = require('../models/Message');

exports.sendSMS = async (req, res) => {
  const { message } = req.body;

  try {
    const contacts = await Contact.find();
    const phoneNumbers = contacts.map(c => c.phone);
    const response = await sendSMS(message, phoneNumbers);
    await new Message({ text: message }).save();
    res.json({ message: 'SMS sent', response });
  } catch (err) {
    res.status(500).json({ message: 'SMS failed', error: err.message });
  }
};

exports.getMessageHistory = async (req, res) => {
  try {
    const messages = await Message.find({ schoolId: req.user.schoolId })
      .populate('sentBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(messages);
  } catch (err) {
    console.error('Error fetching message history:', err);
    res.status(500).json({ message: 'Error fetching message history' });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findOne({ 
      _id: req.params.id, 
      schoolId: req.user.schoolId 
    }).populate('sentBy', 'firstName lastName');

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(message);
  } catch (err) {
    console.error('Error fetching message:', err);
    res.status(500).json({ message: 'Error fetching message' });
  }
};
