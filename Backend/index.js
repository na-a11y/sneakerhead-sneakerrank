const express = require('express');
const connectDB = require('./config/db');
const authenticate = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const contactRoutes = require('./routes/contactRoutes');
const Contact = require('./models/Contact');

const cors = require('cors');  // Import the cors package

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://sneakerhead-sneakerrank-dy24.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.options('*', cors());
// Routes

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/contact', contactRoutes);
app.post('/contact/submit', async(req, res) => {
  const { email, phone, message } = req.body;
  
  try {
    // Log the incoming request data for debugging
    console.log('Received data:', req.body);

    // Save the form data to MongoDB
    const newContact = new Contact({ email, phone, message });
    await newContact.save();

    // Respond with success
    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    // Log the error in case of failure
    console.error('Error while submitting contact form:', error);

    // Respond with an error message
    res.status(500).json({ message: 'Failed to submit contact form' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
