// User types
export interface User {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Server types
export interface Server {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

// Subscription types
export interface Subscription {
  id: string;
  user_id: string;
  server_id: string;
  server?: Server;
  expires_at: string;
  paid: boolean;
  via_coupon: boolean;
  created_at: string;
}

export type SubscriptionDuration = 1 | 3 | 6 | 12;

export interface SubscriptionRequest {
  server_id: string;
  duration: SubscriptionDuration;
  discount_code?: string;
  payment_method: 'stripe' | 'paypal';
}

// Discount code types
export interface DiscountCode {
  id: string;
  code: string;
  server_id: string;
  server?: Server;
  expires_at: string;
  max_uses: number | null;
  current_uses: number;
  created_by: string;
  created_at: string;
}

export interface DiscountCodeUsage {
  id: string;
  discount_code_id: string;
  discount_code?: DiscountCode;
  user_id: string;
  user?: User;
  used_at: string;
}

export interface DiscountCodeCreateRequest {
  code: string;
  server_id: string;
  expires_at: string;
  max_uses: number | null;
}

// Payment types
export interface PaymentIntent {
  client_secret: string;
  id: string;
}

// Error types
export interface ApiError {
  message: string;
  status: number;
}