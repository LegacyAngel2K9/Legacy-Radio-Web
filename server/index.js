const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const authRoutes = require('./routes/auth');
const serverRoutes = require('./routes/servers');
const subscriptionRoutes = require('./routes/subscriptions');
const discountRoutes = require('./routes/discountCodes');
const paymentRoutes = require('./routes/payments');
const adminRoutes = require('./routes/admin');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Configure CORS
app.use(cors({
  origin: config.corsOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/servers', serverRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/discount-codes', discountRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
    status: err.statusCode || 500,
  });
});

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${config.nodeEnv} mode`);
});

module.exports = app;