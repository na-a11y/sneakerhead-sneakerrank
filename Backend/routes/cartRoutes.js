const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const User = require('../models/User');
const Product = require('../models/Product');

// Add a product to the cart
router.post('/add', authenticate, async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Add product to cart if it's not already present
    if (!user.cart.includes(productId)) {
      user.cart.push(productId);
      await user.save();
      return res.status(200).json({ message: 'Product added to cart', cart: user.cart });
    } else {
      return res.status(400).json({ message: 'Product already in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove a product from the cart
router.post('/remove', authenticate, async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = user.cart.filter(item => item.toString() !== productId);
    await user.save();
    return res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get the cart for the user
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('cart');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;