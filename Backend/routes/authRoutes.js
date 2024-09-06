const express = require('express');
const router = express.Router();
const { signup, login, checkLogin } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');
const { submitContactForm } = require('../controllers/contactController');

// Route to handle contact form submission

router.post('/signup', signup);
router.post('/login', login);
router.get('/check-login', authenticate, checkLogin);
router.post('/contact', submitContactForm);

module.exports = router;

