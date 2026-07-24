export type Trend = { value: number; direction: 'up' | 'down' | 'flat' };

export type AttentionKind = 'unread' | 'failed' | 'disconnected' | 'setup';

export interface AttentionItem {
  id: string;
  kind: AttentionKind;
  title: string;
  meta: string;
  actionLabel: string;
  href: string;
}

export interface DashboardMock {
  setup: { instagram: boolean; aiKnowledge: boolean; products: boolean };
  kpis: {
    messages7d: { value: number; trend: Trend; spark: number[] };
    activeConversations: { value: number; trend: Trend };
    aiReplyRate: { value: number; trend: Trend };
    needsAttention: { value: number };
  };
  attention: AttentionItem[];
  channel: {
    name: 'Instagram';
    status: 'healthy' | 'degraded' | 'down' | 'disconnected';
    lastSyncAt: string;
    webhook: 'ok' | 'error';
  };
  usage: {
    plan: 'Free' | 'Starter' | 'Pro';
    used: number;
    quota: number;
    renewsAt: string;
  };
}

export const dashboardMock: DashboardMock = {
  setup: { instagram: true, aiKnowledge: true, products: false },
  kpis: {
    messages7d: {
      value: 1284,
      trend: { value: 12.4, direction: 'up' },
      spark: [8, 12, 9, 14, 18, 16, 22, 20, 24, 26, 23, 28],
    },
    activeConversations: { value: 37, trend: { value: 3.1, direction: 'up' } },
    aiReplyRate: { value: 0.92, trend: { value: 1.8, direction: 'up' } },
    needsAttention: { value: 5 },
  },
  attention: [
    { id: '1', kind: 'unread', title: '4 unread DMs from repeat buyers', meta: 'Oldest 42 min ago', actionLabel: 'Review', href: '/conversations' },
    { id: '2', kind: 'failed', title: 'AI reply failed for @maria.k', meta: 'Missing product info', actionLabel: 'Fix', href: '/conversations' },
    { id: '3', kind: 'setup', title: 'No products in catalog', meta: 'AI can\u2019t recommend items', actionLabel: 'Add', href: '/products' },
  ],
  channel: {
    name: 'Instagram',
    status: 'healthy',
    lastSyncAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    webhook: 'ok',
  },
  usage: {
    plan: 'Starter',
    used: 1284,
    quota: 2000,
    renewsAt: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
};
