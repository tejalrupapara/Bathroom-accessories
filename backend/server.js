const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Imports
const connectDB = async () => {
  const cDB = require('./config/db');
  await cDB();
};
const errorHandler = require('./middleware/error');

// Routers
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database Connection
connectDB();

// Global Middlewares
app.use(cors({
  origin: '*', // Allows cross-origin requests from any source in development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Base Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    status: 'ok', 
    message: 'NEXXORA Premium Catalog Backend service is operational.' 
  });
});

// Mounting MVC Routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Fallback Route for non-existent pages
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Resource Not Found - Specified request path [${req.originalUrl}] does not exist.`);
  next(error);
});

// Global Error Handler Middleware
app.use(errorHandler);

// Listen on configured port
app.listen(PORT, () => {
  console.log(`Server launched successfully on port ${PORT}`);
});
