const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Import Product model

// POST /api/products/add - Add a new product
router.post('/add', async (req, res) => {
  const { name, price, description, imageUrl } = req.body;

  // Validate: Ensure all required fields are provided
  if (!name || !price || !description || !imageUrl) {
    return res.status(400).json({ msg: 'Please fill in all fields' });
  }

  try {
    // Create and save the new product
    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl,
    });

    const savedProduct = await newProduct.save(); // Save to MongoDB
    res.status(201).json(savedProduct); // Return the saved product
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET /api/products - Retrieve all products
router.get('/', async (req, res) => {
    try {
      const products = await Product.find(); // Fetch all products from the database
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  });

module.exports = router;
