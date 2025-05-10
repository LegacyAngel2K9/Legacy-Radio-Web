# Legacy Radio Web Portal

A secure, scalable web application for Legacy Radio's voice communication platform for logistics and transport. The portal handles user management, subscription handling, server access, and discount codes.

## Features

- User authentication with JWT tokens
- Subscription management for voice servers (1, 3, 6, or 12 months)
- Admin dashboard for server and discount code management
- Payment processing via Stripe and PayPal
- Discount code system with usage tracking
- Responsive, mobile-friendly UI

## Technology Stack

### Backend
- Node.js with Express.js
- MySQL with Sequelize ORM
- JWT for authentication
- Stripe SDK for payments
- PayPal REST API for alternative payment
- bcrypt for password hashing

### Frontend
- React with Vite
- Zustand for state management
- TailwindCSS for styling
- Axios for API calls
- React Router for navigation

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/legacy-radio-portal.git
cd legacy-radio-portal
```

2. Install dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

3. Set up environment variables
```bash
# Copy the example env file and modify it with your values
cp .env.example .env
```

4. Start the development servers
```bash
# Start the frontend development server
npm run dev

# In a separate terminal, start the backend server
npm run server
```

## Project Structure

```
legacy-radio-portal/
├── src/                   # Frontend source code
│   ├── components/        # React components
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   ├── store/             # Zustand state management
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── server/                # Backend source code
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Express middleware
│   ├── models/            # Sequelize models
│   ├── routes/            # API routes
│   └── index.js           # Server entry point
├── public/                # Static assets
└── package.json           # Project dependencies and scripts
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/profile` - Get user profile

### Servers
- `GET /api/servers` - Get subscribed servers
- `POST /api/admin/servers` - Create a new server (admin only)

### Subscriptions
- `POST /api/subscribe` - Create a new subscription
- `GET /api/subscriptions` - Get user subscriptions

### Discount Codes
- `POST /api/admin/discount-codes` - Create a new discount code (admin only)
- `POST /api/apply-discount` - Validate and apply a discount code
- `GET /api/admin/discount-usage` - Get discount code usage history

## License

This project is proprietary and confidential. Unauthorized copying of files, via any medium is strictly prohibited.