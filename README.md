# Legacy Radio - Professional Voice Communication Platform

![Legacy Radio](public/legacyradio.png)

A modern web application for professional voice communication services, built specifically for logistics and transport industries. Legacy Radio provides secure, reliable voice servers to keep teams connected and coordinated in real-time.

## Features

- 🔐 **Secure Authentication**
  - Email and password-based authentication
  - Role-based access control (User/Admin)
  - Protected routes and API endpoints

- 🎙️ **Voice Servers**
  - Multiple server management
  - Real-time voice communication
  - Server status monitoring
  - Subscription-based access

- 💳 **Flexible Subscriptions**
  - Multiple duration options (1, 3, 6, 12 months)
  - Stripe payment integration
  - PayPal payment support
  - Discount code system

- 👑 **Admin Dashboard**
  - Server management
  - Discount code creation and tracking
  - Usage analytics
  - User management

## Tech Stack

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Zustand (State Management)
  - React Router v6
  - Lucide React (Icons)

- **Backend**
  - Node.js
  - Express
  - Supabase (Database & Auth)
  - Stripe (Payments)
  - Edge Functions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (for payments)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/legacy-radio.git
   cd legacy-radio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the environment variables in `.env` with your credentials

5. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Variables

Required environment variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## Project Structure

```
legacy-radio/
├── src/
│   ├── components/     # Reusable React components
│   ├── lib/           # Utility functions and API clients
│   ├── pages/         # Page components
│   ├── store/         # Zustand store definitions
│   └── types/         # TypeScript type definitions
├── supabase/
│   ├── functions/     # Edge Functions
│   └── migrations/    # Database migrations
└── public/           # Static assets
```

## Database Schema

The application uses the following main tables:

- `users` - User accounts and profiles
- `stripe_customers` - Stripe customer mappings
- `stripe_subscriptions` - Subscription records
- `stripe_orders` - Payment records
- `servers` - Voice server configurations
- `discount_codes` - Promotional codes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@legacyradio.com or open an issue in the GitHub repository.

## Acknowledgments

- [Supabase](https://supabase.io/) for database and authentication
- [Stripe](https://stripe.com/) for payment processing
- [Lucide](https://lucide.dev/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling