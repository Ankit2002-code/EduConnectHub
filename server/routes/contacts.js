const express = require('express');
const { addContact, getContacts, deleteContact } = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.use(authMiddleware);

router.post('/', addContact);
router.get('/', getContacts);
router.delete('/:id', deleteContact);

module.exports = router;
