// Configuration for the backend server
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  // Server configuration
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'legacy-radio-secret-key',
    expiresIn: '7d', // JWT expiration time (7 days)
  },
  
  // Database configuration
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  
  // Stripe configuration
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_mock',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  
  // PayPal configuration
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    mode: process.env.PAYPAL_MODE || 'sandbox', // 'sandbox' or 'live'
  },
  
  // CORS configuration
  corsOrigins: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:5173'],
};