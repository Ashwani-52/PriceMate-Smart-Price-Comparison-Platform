require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// CORS configuration for network sharing
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests from any origin in development
        callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
};
app.use(cors(corsOptions));

const connectDB = require('./src/config/db');

// Database Connection
connectDB();

// Routes
const auth = require('./src/routes/authRoutes');
const products = require('./src/routes/productRoutes');
const payment = require('./src/routes/paymentRoutes');
const admin = require('./src/routes/adminRoutes');
const orders = require('./src/routes/orderRoutes');

app.use('/api/v1/auth', auth);
app.use('/api/v1/products', products);
app.use('/api/v1/payment', payment);
app.use('/api/v1/admin', admin);
app.use('/api/v1/orders', orders);

// Health check route
app.get('/', (req, res) => {
    res.json({ 
        success: true, 
        message: 'GEM Ecommerce API is running...', 
        timestamp: new Date().toISOString() 
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Create Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;