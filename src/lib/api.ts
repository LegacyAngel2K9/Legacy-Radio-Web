import axios from 'axios';
import { ApiError } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add the token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses by logging out the user
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Error handler helper
const handleError = (error: unknown): never => {
  if (axios.isAxiosError(error) && error.response) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
  throw new Error('An unexpected error occurred');
};

// Auth API calls
export const register = async (email: string, username: string, password: string) => {
  try {
    const response = await api.post('/auth/register', { email, username, password });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Server API calls
export const getServers = async () => {
  try {
    const response = await api.get('/servers');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const createServer = async (name: string, description: string) => {
  try {
    const response = await api.post('/admin/servers', { name, description });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateServer = async (id: string, name: string, description: string) => {
  try {
    const response = await api.put(`/admin/servers/${id}`, { name, description });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Subscription API calls
export const getSubscriptions = async () => {
  try {
    const response = await api.get('/subscriptions');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const createSubscription = async (
  server_id: string,
  duration: number,
  payment_method: 'stripe' | 'paypal',
  discount_code?: string
) => {
  try {
    const response = await api.post('/subscribe', {
      server_id,
      duration,
      payment_method,
      discount_code,
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Discount code API calls
export const getDiscountCodes = async () => {
  try {
    const response = await api.get('/admin/discount-codes');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const createDiscountCode = async (
  code: string,
  server_id: string,
  expires_at: string,
  max_uses: number | null
) => {
  try {
    const response = await api.post('/admin/discount-codes', {
      code,
      server_id,
      expires_at,
      max_uses,
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const validateDiscountCode = async (code: string) => {
  try {
    const response = await api.post('/apply-discount', { code });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getDiscountCodeUsage = async (code_id: string) => {
  try {
    const response = await api.get(`/admin/discount-usage/${code_id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Payment API calls
export const createPaymentIntent = async (
  server_id: string,
  duration: number,
  discount_code?: string
) => {
  try {
    const response = await api.post('/payments/create-intent', {
      server_id,
      duration,
      discount_code,
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export default api;