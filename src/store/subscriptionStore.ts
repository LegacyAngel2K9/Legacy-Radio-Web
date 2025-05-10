import { create } from 'zustand';
import { Subscription, SubscriptionDuration } from '../types';
import { getSubscriptions, createSubscription } from '../lib/api';

interface SubscriptionState {
  subscriptions: Subscription[];
  loading: boolean;
  error: string | null;
  selectedServer: string | null;
  selectedDuration: SubscriptionDuration;
  discountCode: string;
  paymentMethod: 'stripe' | 'paypal';
  fetchSubscriptions: () => Promise<void>;
  setSelectedServer: (serverId: string | null) => void;
  setSelectedDuration: (duration: SubscriptionDuration) => void;
  setDiscountCode: (code: string) => void;
  setPaymentMethod: (method: 'stripe' | 'paypal') => void;
  createSubscription: () => Promise<boolean>;
  resetSubscriptionForm: () => void;
}

const subscriptionStore = create<SubscriptionState>((set, get) => ({
  subscriptions: [],
  loading: false,
  error: null,
  selectedServer: null,
  selectedDuration: 1,
  discountCode: '',
  paymentMethod: 'stripe',

  fetchSubscriptions: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getSubscriptions();
      set({ subscriptions: data, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: typeof error === 'object' && error !== null && 'message' in error
          ? String(error.message)
          : 'Failed to fetch subscriptions',
      });
    }
  },

  setSelectedServer: (serverId) => {
    set({ selectedServer: serverId });
  },

  setSelectedDuration: (duration) => {
    set({ selectedDuration: duration });
  },

  setDiscountCode: (code) => {
    set({ discountCode: code });
  },

  setPaymentMethod: (method) => {
    set({ paymentMethod: method });
  },

  createSubscription: async () => {
    const { selectedServer, selectedDuration, discountCode, paymentMethod } = get();
    
    if (!selectedServer) {
      set({ error: 'Please select a server' });
      return false;
    }
    
    set({ loading: true, error: null });
    
    try {
      await createSubscription(
        selectedServer,
        selectedDuration,
        paymentMethod,
        discountCode || undefined
      );
      
      set({ loading: false });
      return true;
    } catch (error) {
      set({
        loading: false,
        error: typeof error === 'object' && error !== null && 'message' in error
          ? String(error.message)
          : 'Failed to create subscription',
      });
      return false;
    }
  },

  resetSubscriptionForm: () => {
    set({
      selectedServer: null,
      selectedDuration: 1,
      discountCode: '',
      paymentMethod: 'stripe',
      error: null,
    });
  },
}));

export default subscriptionStore;