import { create } from 'zustand';
import { DiscountCode, DiscountCodeUsage } from '../types';
import { 
  getDiscountCodes, 
  createDiscountCode, 
  validateDiscountCode,
  getDiscountCodeUsage
} from '../lib/api';

interface DiscountCodeState {
  discountCodes: DiscountCode[];
  currentCodeUsage: DiscountCodeUsage[];
  loading: boolean;
  validating: boolean;
  error: string | null;
  validationResult: { valid: boolean; message: string } | null;
  fetchDiscountCodes: () => Promise<void>;
  createDiscountCode: (
    code: string,
    serverId: string,
    expiresAt: string,
    maxUses: number | null
  ) => Promise<boolean>;
  validateCode: (code: string) => Promise<boolean>;
  fetchCodeUsage: (codeId: string) => Promise<void>;
}

const discountCodeStore = create<DiscountCodeState>((set) => ({
  discountCodes: [],
  currentCodeUsage: [],
  loading: false,
  validating: false,
  error: null,
  validationResult: null,

  fetchDiscountCodes: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getDiscountCodes();
      set({ discountCodes: data, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: typeof error === 'object' && error !== null && 'message' in error
          ? String(error.message)
          : 'Failed to fetch discount codes',
      });
    }
  },

  createDiscountCode: async (code, serverId, expiresAt, maxUses) => {
    set({ loading: true, error: null });
    try {
      const newCode = await createDiscountCode(code, serverId, expiresAt, maxUses);
      set((state) => ({
        discountCodes: [...state.discountCodes, newCode],
        loading: false,
      }));
      return true;
    } catch (error) {
      set({
        loading: false,
        error: typeof error === 'object' && error !== null && 'message' in error
          ? String(error.message)
          : 'Failed to create discount code',
      });
      return false;
    }
  },

  validateCode: async (code) => {
    set({ validating: true, validationResult: null, error: null });
    try {
      const result = await validateDiscountCode(code);
      set({
        validating: false,
        validationResult: { 
          valid: true, 
          message: `Code valid for server: ${result.server.name}` 
        },
      });
      return true;
    } catch (error) {
      set({
        validating: false,
        validationResult: { 
          valid: false, 
          message: typeof error === 'object' && error !== null && 'message' in error
            ? String(error.message)
            : 'Invalid discount code'
        },
      });
      return false;
    }
  },

  fetchCodeUsage: async (codeId) => {
    set({ loading: true, error: null });
    try {
      const data = await getDiscountCodeUsage(codeId);
      set({ currentCodeUsage: data, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: typeof error === 'object' && error !== null && 'message' in error
          ? String(error.message)
          : 'Failed to fetch code usage',
      });
    }
  },
}));

export default discountCodeStore;