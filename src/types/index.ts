// User & Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  facebook_user_id?: string;
  instagram_page_id?: string;
  instagram_page_name?: string;
  ai_personality: 'friendly' | 'professional' | 'casual';
  brand_voice?: string;
  response_tone: 'friendly' | 'professional' | 'casual';
  auto_reply_enabled: boolean;
  reply_start_hour: number;
  reply_end_hour: number;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  mockLogin: () => void;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

// Product Types
export interface Product {
  id: string;
  client_id: string;
  title: string;
  description: string;
  price: number;
  image_url?: string;
  category?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Conversation Types
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  client_id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  messages: Message[];
  message_count: number;
  last_message?: string;
  last_interaction_at: string;
  unread_count: number;
  is_resolved: boolean;
  created_at: string;
}

// Dashboard Types
export interface DashboardStats {
  total_messages_this_month: number;
  response_rate: number;
  active_conversations: number;
  total_products: number;
  avg_response_time: string;
}

// Settings Types
export interface AutoReplySettings {
  enabled: boolean;
  start_hour: number;
  end_hour: number;
  response_tone: 'friendly' | 'professional' | 'casual';
  include_product_links: boolean;
  include_product_images: boolean;
  custom_instructions?: string;
}

export interface AIPersonalitySettings {
  business_name: string;
  brand_voice: string;
  custom_instructions?: string;
  industry: 'ecommerce' | 'fashion' | 'food' | 'beauty' | 'services' | 'other';
  personality_preset: 'friendly' | 'professional' | 'casual';
}

export interface InstagramSettings {
  page_id?: string;
  page_name?: string;
  page_avatar?: string;
  is_connected: boolean;
  last_synced?: string;
}

export interface AccountSettings {
  email: string;
  email_notifications: boolean;
  desktop_notifications: boolean;
}

// Analytics Types
export interface AnalyticsData {
  date: string;
  messages: number;
  response_time: number;
}

export interface AnalyticsSummary {
  total_messages: number;
  avg_response_time: string;
  resolution_rate: number;
  customer_satisfaction?: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
