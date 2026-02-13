import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState } from '@/types';

// Mock user for development
const mockUser: User = {
  id: 'mock-user-123',
  email: 'demo@conveero.com',
  name: 'Demo Business',
  facebook_user_id: 'fb-123456',
  instagram_page_id: 'ig-789012',
  instagram_page_name: 'DemoBoutique',
  ai_personality: 'friendly',
  brand_voice: 'Warm, helpful, and professional',
  response_tone: 'friendly',
  auto_reply_enabled: true,
  reply_start_hour: 9,
  reply_end_hour: 21,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-20T00:00:00Z',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // In production, this would call the actual API
        if (email && password) {
          set({
            user: { ...mockUser, email },
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({ isLoading: false });
          throw new Error('Invalid credentials');
        }
      },

      loginWithFacebook: async () => {
        set({ isLoading: true });
        
        // Simulate Facebook OAuth
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        set({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      mockLogin: () => {
        set({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1200));
        
        if (email && password && name) {
          set({
            user: { ...mockUser, email, name },
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({ isLoading: false });
          throw new Error('Please fill in all fields');
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
    }),
    {
      name: 'conveero-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
