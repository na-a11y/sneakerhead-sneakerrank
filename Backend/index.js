const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const contactRoutes = require('./routes/contactRoutes');
const productRoutes = require('./routes/productRoutes');
const { submitContactForm } = require('./controllers/contactController');

const Contact = require('./models/Contact');

const cors = require('cors');  // Import the cors package

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-production-frontend-url.com'], // Replace with your frontend origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allows cookies to be sent with requests
}));


app.options('*', cors());
// Routes

app.use('/api/products', productRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/contact', contactRoutes);
app.post('/contact/submit', async(req, res) => {
  const { email, phone, message } = req.body;

  try {
    const newContact = new Contact({
      email,
      phone,
      message,
    });

    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    console.error('Error while submitting contact form:', error);
    res.status(500).json({ message: 'Failed to submit contact form' });
  }
 
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
