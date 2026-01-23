import type { DashboardStats, Conversation, Product, AnalyticsData, AnalyticsSummary } from '@/types';

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  total_messages_this_month: 1247,
  response_rate: 98.5,
  active_conversations: 23,
  total_products: 45,
  avg_response_time: '< 30s',
};

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    client_id: 'client-1',
    sender_id: 'ig-user-1',
    sender_name: 'Sarah Johnson',
    sender_avatar: undefined,
    messages: [
      { id: 'm1', role: 'user', content: 'Hi! Do you have this dress in size M?', timestamp: '2024-01-23T10:30:00Z' },
      { id: 'm2', role: 'assistant', content: 'Hi Sarah! 👋 Yes, we do have the Floral Summer Dress in size M. It\'s $59.99 and we have 3 in stock. Would you like me to send you the link to order?', timestamp: '2024-01-23T10:30:15Z' },
      { id: 'm3', role: 'user', content: 'Yes please! And do you ship to California?', timestamp: '2024-01-23T10:31:00Z' },
      { id: 'm4', role: 'assistant', content: 'Absolutely! We ship to all US states including California. Standard shipping is free for orders over $50, and it typically takes 3-5 business days. Here\'s the link: [Product Link]. Let me know if you need anything else! 💛', timestamp: '2024-01-23T10:31:20Z' },
    ],
    message_count: 4,
    last_message: 'Yes please! And do you ship to California?',
    last_interaction_at: '2024-01-23T10:31:00Z',
    unread_count: 0,
    is_resolved: false,
    created_at: '2024-01-23T10:30:00Z',
  },
  {
    id: 'conv-2',
    client_id: 'client-1',
    sender_id: 'ig-user-2',
    sender_name: 'Mike Chen',
    sender_avatar: undefined,
    messages: [
      { id: 'm1', role: 'user', content: 'What time do you close today?', timestamp: '2024-01-23T09:15:00Z' },
      { id: 'm2', role: 'assistant', content: 'Hi Mike! Our online store is open 24/7! 🛒 If you\'re asking about our physical location, we\'re open until 8 PM today. How can I help you?', timestamp: '2024-01-23T09:15:10Z' },
      { id: 'm3', role: 'user', content: 'Can I return items bought online to the store?', timestamp: '2024-01-23T09:20:00Z' },
    ],
    message_count: 3,
    last_message: 'Can I return items bought online to the store?',
    last_interaction_at: '2024-01-23T09:20:00Z',
    unread_count: 1,
    is_resolved: false,
    created_at: '2024-01-23T09:15:00Z',
  },
  {
    id: 'conv-3',
    client_id: 'client-1',
    sender_id: 'ig-user-3',
    sender_name: 'Emma Wilson',
    sender_avatar: undefined,
    messages: [
      { id: 'm1', role: 'user', content: 'Is the leather bag still available?', timestamp: '2024-01-22T16:00:00Z' },
      { id: 'm2', role: 'assistant', content: 'Hi Emma! 👜 Yes, our Classic Leather Tote is still available! It comes in Black, Tan, and Burgundy. Which color were you interested in?', timestamp: '2024-01-22T16:00:12Z' },
      { id: 'm3', role: 'user', content: 'Tan please! How much is it?', timestamp: '2024-01-22T16:05:00Z' },
      { id: 'm4', role: 'assistant', content: 'Great choice! The Tan Classic Leather Tote is $149.99. It\'s genuine leather and comes with a 2-year warranty. Would you like to order it?', timestamp: '2024-01-22T16:05:15Z' },
      { id: 'm5', role: 'user', content: 'Perfect, sending payment now!', timestamp: '2024-01-22T16:10:00Z' },
    ],
    message_count: 5,
    last_message: 'Perfect, sending payment now!',
    last_interaction_at: '2024-01-22T16:10:00Z',
    unread_count: 0,
    is_resolved: true,
    created_at: '2024-01-22T16:00:00Z',
  },
  {
    id: 'conv-4',
    client_id: 'client-1',
    sender_id: 'ig-user-4',
    sender_name: 'Jessica Peel',
    sender_avatar: undefined,
    messages: [
      { id: 'm1', role: 'user', content: 'Do you have any discounts for first-time buyers?', timestamp: '2024-01-23T08:00:00Z' },
    ],
    message_count: 1,
    last_message: 'Do you have any discounts for first-time buyers?',
    last_interaction_at: '2024-01-23T08:00:00Z',
    unread_count: 1,
    is_resolved: false,
    created_at: '2024-01-23T08:00:00Z',
  },
  {
    id: 'conv-5',
    client_id: 'client-1',
    sender_id: 'ig-user-5',
    sender_name: 'Alex Rivera',
    sender_avatar: undefined,
    messages: [
      { id: 'm1', role: 'user', content: 'When will the blue sneakers be back in stock?', timestamp: '2024-01-22T14:30:00Z' },
      { id: 'm2', role: 'assistant', content: 'Hi Alex! 👟 The Blue Runner Sneakers are expected back in stock next Tuesday. Would you like me to notify you when they\'re available?', timestamp: '2024-01-22T14:30:10Z' },
      { id: 'm3', role: 'user', content: 'Yes please!', timestamp: '2024-01-22T14:32:00Z' },
      { id: 'm4', role: 'assistant', content: 'Done! ✅ I\'ve added you to our notify list. You\'ll get a DM as soon as they\'re back. Is there anything else I can help with?', timestamp: '2024-01-22T14:32:08Z' },
    ],
    message_count: 4,
    last_message: 'Yes please!',
    last_interaction_at: '2024-01-22T14:32:00Z',
    unread_count: 0,
    is_resolved: true,
    created_at: '2024-01-22T14:30:00Z',
  },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    client_id: 'client-1',
    title: 'Floral Summer Dress',
    description: 'Beautiful floral print dress perfect for summer occasions. Made with breathable cotton fabric.',
    price: 59.99,
    image_url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop',
    category: 'Dresses',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z',
  },
  {
    id: 'prod-2',
    client_id: 'client-1',
    title: 'Classic Leather Tote',
    description: 'Genuine leather tote bag with premium stitching. Perfect for work or casual outings.',
    price: 149.99,
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop',
    category: 'Bags',
    is_active: true,
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-18T00:00:00Z',
  },
  {
    id: 'prod-3',
    client_id: 'client-1',
    title: 'Blue Runner Sneakers',
    description: 'Lightweight running sneakers with cushioned sole. Available in multiple sizes.',
    price: 89.99,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    category: 'Footwear',
    is_active: false,
    created_at: '2024-01-08T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'prod-4',
    client_id: 'client-1',
    title: 'Silk Scarf Collection',
    description: 'Luxurious silk scarves with hand-printed designs. Multiple patterns available.',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&h=300&fit=crop',
    category: 'Accessories',
    is_active: true,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z',
  },
  {
    id: 'prod-5',
    client_id: 'client-1',
    title: 'Minimalist Watch',
    description: 'Elegant minimalist watch with genuine leather strap. Water resistant up to 30m.',
    price: 129.00,
    image_url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop',
    category: 'Watches',
    is_active: true,
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-19T00:00:00Z',
  },
  {
    id: 'prod-6',
    client_id: 'client-1',
    title: 'Denim Jacket',
    description: 'Classic denim jacket with vintage wash. Perfect for layering in any season.',
    price: 79.99,
    image_url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&h=300&fit=crop',
    category: 'Outerwear',
    is_active: true,
    created_at: '2024-01-14T00:00:00Z',
    updated_at: '2024-01-21T00:00:00Z',
  },
];

// Mock Analytics Data
export const mockAnalyticsData: AnalyticsData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    messages: Math.floor(Math.random() * 50) + 20,
    response_time: Math.floor(Math.random() * 30) + 10,
  };
});

export const mockAnalyticsSummary: AnalyticsSummary = {
  total_messages: 12847,
  avg_response_time: '23 seconds',
  resolution_rate: 94.2,
  customer_satisfaction: 4.8,
};
