const cors = require('cors');
const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');

// Use CORS only for this route
router.post('/submit', cors(), submitContactForm);

module.exports = router;
