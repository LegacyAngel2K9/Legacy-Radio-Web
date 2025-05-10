import { create } from 'zustand';
import { User } from '../types';
import { getProfile, login, register } from '../lib/api';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  id: string;
  role: 'user' | 'admin';
  exp: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const authStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isAdmin: false,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { token, user } = await login(email, password);
      localStorage.setItem('token', token);
      
      // Decode JWT to check if user is admin
      const decoded = jwtDecode<JwtPayload>(token);
      const isAdmin = decoded.role === 'admin';
      
      set({
        user,
        token,
        isAuthenticated: true,
        isAdmin,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to login',
      });
      throw error;
    }
  },

  register: async (email: string, username: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { token, user } = await register(email, username, password);
      localStorage.setItem('token', token);
      
      set({
        user,
        token,
        isAuthenticated: true,
        isAdmin: user.role === 'admin',
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to register',
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
    });
  },

  checkAuth: async () => {
    const { token } = get();
    
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return false;
    }
    
    try {
      // Check if token is expired
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp < currentTime) {
        // Token expired
        localStorage.removeItem('token');
        set({ isAuthenticated: false, user: null, token: null });
        return false;
      }
      
      // Token is valid, get user profile
      const userData = await getProfile();
      set({
        user: userData,
        isAuthenticated: true,
        isAdmin: userData.role === 'admin',
      });
      return true;
    } catch (error) {
      localStorage.removeItem('token');
      set({ isAuthenticated: false, user: null, token: null });
      return false;
    }
  },
}));

export default authStore;