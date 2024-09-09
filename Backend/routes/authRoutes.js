const express = require('express');
const router = express.Router();
const { signup, login, checkLogin } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');
const { submitContactForm } = require('../controllers/contactController');

// Public Routes
router.post('/signup', signup);
router.post('/login', login);

// Protected Routes
router.get('/check-login', authenticate, (req, res) => {
    // Logic to check if the user is logged in based on token
    res.status(200).json({ message: 'User is logged in', loggedIn: true });
});

// Protect the contact form submission route
router.post('/contact', authenticate, submitContactForm);

module.exports = router;
