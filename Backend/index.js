const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const contactRoutes = require('./routes/contactRoutes');
const bodyParser = require('body-parser');
const Contact = require('./models/Contact');

const cors = require('cors');  // Import the cors package

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:3000', 'https://sneakerhead-sneakerrank-dy24.vercel.app/'], // Replace with your frontend origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allows cookies to be sent with requests
}));

app.use(cors());
// Routes


app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/contact', contactRoutes);
app.post('/contact/submit', async (req, res) => {
  try {
    const { email, phone, message } = req.body;

    // Log the received data to the console
    console.log('Received contact form data:');
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Message: ${message}`);

    // Create a new contact document
    const newContact = new Contact({ email, phone, message });

    // Save the document to the database
    await newContact.save();

    // Send a success response
    res.status(200).send('Form submitted successfully!');
  } catch (error) {
    // Handle errors
    console.error('Error saving contact form data:', error);
    res.status(500).send('An error occurred while submitting the form.');
  }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});