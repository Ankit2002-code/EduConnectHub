const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const Message = require('../models/Message'); // Assuming you log SMS messages
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const totalMessages = await Message.countDocuments();
    const lastMessage = await Message.findOne().sort({ createdAt: -1 });

    res.json({
      totalContacts,
      totalMessages,
      lastMessageTime: lastMessage?.createdAt || null,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load stats' });
  }
});

module.exports = router;
