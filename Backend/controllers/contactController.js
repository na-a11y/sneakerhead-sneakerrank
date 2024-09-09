const Contact = require('../models/Contact');

// Function to handle contact form submission with CORS support
const submitContactForm = async (req, res) => {
  // Set CORS headers to allow requests from your frontend
  res.setHeader('Access-Control-Allow-Origin', 'https://sneakerhead-sneakerrank-dy24.vercel.app');  // Your frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight (OPTIONS) request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();  // Preflight request success, no need to process further
  }

  // Destructure contact form data from the request body
  const { email, phone, message } = req.body;

  try {
    // Debugging to ensure data is received properly
    console.log('Contact form data received:', req.body);

    // Create a new contact record using the data
    const newContact = new Contact({ email, phone, message });

    // Save the new contact record to the database
    await newContact.save();

    // Respond with success message
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error submitting contact form:', error);

    // Respond with error message
    res.status(500).json({ message: 'Failed to submit contact form' });
  }
};

module.exports = { submitContactForm };
