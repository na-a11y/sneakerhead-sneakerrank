import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/', 
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth
export const signup = (formData) => API.post('/auth/signup', formData);
export const login = (formData) => API.post('/auth/login', formData);

// Cart
export const addToCart = (productId) => API.post('/cart/add', { productId });
export const updateCartQuantity = (productId, change) => API.post('/cart/update', { productId, change });
export const removeFromCart = (productId) => API.post('/cart/remove', { productId });
export const getCart = () => API.get('/cart');

// Wishlist
export const addToWishlist = (productId) => API.post('/wishlist/add', { productId });
export const removeFromWishlist = (productId) => API.post('/wishlist/remove', { productId });
export const getWishlist = () => API.get('/wishlist');

// Products
export const getProducts = () => API.get('/products');

// Contact
export const submitContactForm = (formData) => API.post('/contact/submit', formData);
