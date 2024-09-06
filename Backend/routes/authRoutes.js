const express = require('express');
const router = express.Router();
const { signup, login, checkLogin } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/check-login', authenticate, checkLogin);

module.exports = router;
