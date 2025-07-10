const Contact = require('../models/Contact');

exports.addContact = async (req, res) => {
  const { name, phone } = req.body;
  try {
    const contact = new Contact({ name, phone });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Error adding contact' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting contact' });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { name, phone, email, grade, section, parentName, parentPhone } = req.body;
    
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, schoolId: req.user.schoolId },
      { name, phone, email, grade, section, parentName, parentPhone },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (err) {
    console.error("❌ Error updating contact:", err.message);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Contact with this phone number already exists in your school' });
    }
    res.status(500).json({ message: 'Error updating contact' });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findOne({ 
      _id: req.params.id, 
      schoolId: req.user.schoolId 
    });
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (err) {
    console.error("❌ Error fetching contact:", err.message);
    res.status(500).json({ message: 'Error fetching contact' });
  }
};
