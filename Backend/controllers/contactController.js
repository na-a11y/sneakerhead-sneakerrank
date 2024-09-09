const Contact = require('../models/Contact');

const submitContactForm = async (req, res) => {
  const { email, phone, message } = req.body;
  
  try {
    const newContact = new Contact({ email, phone, message });
    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit contact form' });
  }
};

module.exports = { submitContactForm };
