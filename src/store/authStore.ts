import { create } from 'zustand';
import { api, isAuthenticated as checkAuth, logout as doLogout, loginWithInstagram } from '@/lib/api';

interface ClientStatus {
  name?: string;
  email?: string;
  instagram_page_id?: string;
  instagram_page_name?: string;
  [key: string]: any;
}

interface AuthState {
  clientStatus: ClientStatus | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  fetchClientStatus: () => Promise<void>;
  loginWithInstagram: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  clientStatus: null,
  isAuthenticated: checkAuth(),
  isLoading: false,

  fetchClientStatus: async () => {
    set({ isLoading: true });
    try {
      const data = await api.getClientStatus();
      set({ clientStatus: data, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  loginWithInstagram: () => {
    loginWithInstagram();
  },

  logout: () => {
    doLogout();
    set({ clientStatus: null, isAuthenticated: false });
  },
}));
