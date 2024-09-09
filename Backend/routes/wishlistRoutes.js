const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const User = require('../models/User');
const Product = require('../models/Product');

// Add a product to the wishlist
router.post('/add', authenticate, async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Add product to wishlist if it's not already present
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
      return res.status(200).json({ message: 'Product added to wishlist', wishlist: user.wishlist });
    } else {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove a product from the wishlist
router.post('/remove', authenticate, async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.wishlist = user.wishlist.filter(item => item.toString() !== productId);
    await user.save();
    return res.status(200).json({ message: 'Product removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get the wishlist for the user
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('wishlist');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;