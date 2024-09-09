const express = require('express');
const router = express.Router();
const { signup, login, checkLogin } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');
const { submitContactForm } = require('../controllers/contactController');

// Route to handle contact form submission

router.post('/signup', signup);
router.post('/login', login);

router.get('/check-login', (req, res) => {
    // Logic to check if the user is logged in
    const isLoggedIn = true; // Replace with actual logic
    if (isLoggedIn) {
      res.status(200).json({ message: 'User is logged in' });
    } else {
      res.status(401).json({ message: 'User is not logged in' });
    }
  });
router.post('/contact', submitContactForm);

module.exports = router;

