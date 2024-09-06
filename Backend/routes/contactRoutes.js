const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');

// Route to handle contact form submission
router.post('/submit', submitContactForm);

module.exports = router;
