// Mock data + types for the Comment Automations workspace.
// Every accessor is an async placeholder so it can be swapped for real
// Supabase/backend calls without touching the UI layer.

export type MatchType = 'exact' | 'partial';

export interface AutomationRule {
  id: string;
  name: string;
  scope: 'all' | 'post';
  postId?: string;
  postThumb?: string;
  keywords: string[];
  matchType: MatchType;
  caseInsensitive: boolean;
  dmEnabled: boolean;
  dmMessage: string;
  publicReplyEnabled: boolean;
  publicReplies: string[];
  dryRun: boolean;
  requireApproval: boolean;
  active: boolean;
  triggered7d: number;
}

export type LogStatus =
  | 'sent'
  | 'pending'
  | 'dry_run'
  | 'rate_limited'
  | 'rejected'
  | 'failed';

export interface ActivityLog {
  id: string;
  at: string; // ISO
  handle: string;
  comment: string;
  ruleName: string;
  keyword: string;
  status: LogStatus;
  channel: 'dm' | 'public';
  payload: Record<string, unknown>;
}

export interface ApprovalItem {
  id: string;
  handle: string;
  at: string;
  comment: string;
  ruleName: string;
  keyword: string;
  draft: string;
}

export interface AutomationMetrics {
  captured: number;
  capturedTrend: number;
  dmsTriggered: number;
  conversionRate: number;
  pendingApprovals: number;
}

const ago = (mins: number) => new Date(Date.now() - mins * 60_000).toISOString();

export const mockRules: AutomationRule[] = [
  {
    id: 'rule_sizing',
    name: 'Sizing Guide Auto-DM',
    scope: 'all',
    keywords: ['size', 'fit', 'measurements'],
    matchType: 'partial',
    caseInsensitive: true,
    dmEnabled: true,
    dmMessage:
      'Hey {username}! You asked about "{keyword}" — here is our full sizing guide: conveero.com/sizing. Happy to help you pick the right fit!',
    publicReplyEnabled: true,
    publicReplies: ['Just sent you a DM with the sizing guide!', 'Check your DMs — sizing details are on the way.'],
    dryRun: false,
    requireApproval: true,
    active: true,
    triggered7d: 312,
  },
  {
    id: 'rule_promo',
    name: 'Summer Promo Link Delivery',
    scope: 'post',
    postId: '17924412331100234',
    keywords: ['link', 'price', 'shop'],
    matchType: 'exact',
    caseInsensitive: true,
    dmEnabled: true,
    dmMessage: 'Thanks {username}! Here is the summer drop link: conveero.com/summer — 20% off ends Sunday.',
    publicReplyEnabled: false,
    publicReplies: [],
    dryRun: true,
    requireApproval: false,
    active: true,
    triggered7d: 198,
  },
  {
    id: 'rule_restock',
    name: 'Restock Waitlist Capture',
    scope: 'all',
    keywords: ['restock', 'sold out', 'available'],
    matchType: 'partial',
    caseInsensitive: true,
    dmEnabled: true,
    dmMessage: 'Hi {username}, want us to ping you the moment it is back? Reply YES and you are on the waitlist.',
    publicReplyEnabled: true,
    publicReplies: ['Restock is close — DM sent!'],
    dryRun: false,
    requireApproval: false,
    active: false,
    triggered7d: 0,
  },
];

export const mockApprovals: ApprovalItem[] = [
  {
    id: 'ap_1',
    handle: '@shopper_jane',
    at: ago(4),
    comment: 'Is the medium true to size or should I size up?',
    ruleName: 'Sizing Guide Auto-DM',
    keyword: 'size',
    draft:
      'Hey @shopper_jane! Our medium runs true to size — if you are between sizes we suggest sizing up. Full guide: conveero.com/sizing',
  },
  {
    id: 'ap_2',
    handle: '@marc.builds',
    at: ago(21),
    comment: 'what is the price on this one? link please',
    ruleName: 'Summer Promo Link Delivery',
    keyword: 'price',
    draft: 'Thanks @marc.builds! It is $89 — grab it here: conveero.com/summer (20% off ends Sunday).',
  },
  {
    id: 'ap_3',
    handle: '@lea.wears',
    at: ago(58),
    comment: 'does it fit a 5\u201911 frame?',
    ruleName: 'Sizing Guide Auto-DM',
    keyword: 'fit',
    draft: 'Hi @lea.wears! At 5\u201911 the L gives the best drape. Full measurements here: conveero.com/sizing',
  },
];

const handles = ['@shopper_jane', '@marc.builds', '@lea.wears', '@nomad.kit', '@atlas.studio', '@rue_daily', '@finnwear'];
const comments = [
  'Is the medium true to size?',
  'what is the price on this one? link please',
  'when is this back in stock?',
  'do you ship to Canada?',
  'love this fit, where can I shop it',
  'size up or down for a wide foot?',
  'restock the black one please',
];
const statuses: LogStatus[] = ['sent', 'pending', 'dry_run', 'rate_limited', 'rejected', 'failed', 'sent', 'sent'];

export const mockLogs: ActivityLog[] = Array.from({ length: 42 }, (_, i) => {
  const rule = mockRules[i % mockRules.length];
  return {
    id: `log_${i + 1}`,
    at: ago(2 + i * 17),
    handle: handles[i % handles.length],
    comment: comments[i % comments.length],
    ruleName: rule.name,
    keyword: rule.keywords[i % rule.keywords.length],
    status: statuses[i % statuses.length],
    channel: i % 4 === 0 ? 'public' : 'dm',
    payload: {
      media_id: rule.postId ?? '17924412331100234',
      comment_id: `c_${900000 + i}`,
      match_type: rule.matchType,
      dry_run: rule.dryRun,
      require_approval: rule.requireApproval,
      latency_ms: 320 + ((i * 37) % 900),
    },
  };
});

export const mockMetrics: AutomationMetrics = {
  captured: 1420,
  capturedTrend: 12.4,
  dmsTriggered: 890,
  conversionRate: 62.7,
  pendingApprovals: mockApprovals.length,
};

/** Relative timestamp helper ("2m ago"). */
export function relativeTime(iso: string): string {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

/** Pure keyword matcher shared by the sandbox tester and the mock engine. */
export function matchKeywords(
  text: string,
  keywords: string[],
  opts: { wholeWord: boolean; caseInsensitive: boolean },
): string[] {
  const haystack = opts.caseInsensitive ? text.toLowerCase() : text;
  return keywords.filter((raw) => {
    const k = opts.caseInsensitive ? raw.toLowerCase() : raw;
    if (!k) return false;
    if (!opts.wholeWord) return haystack.includes(k);
    const escaped = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|\\W)${escaped}(\\W|$)`).test(haystack);
  });
}

export const emptyRule = (): AutomationRule => ({
  id: '',
  name: '',
  scope: 'all',
  keywords: [],
  matchType: 'partial',
  caseInsensitive: true,
  dmEnabled: true,
  dmMessage: 'Hey {username}! Thanks for asking about "{keyword}" — here are the details: ',
  publicReplyEnabled: false,
  publicReplies: [],
  dryRun: false,
  requireApproval: false,
  active: true,
  triggered7d: 0,
});

// --- Hook placeholders (swap the bodies for real backend calls) -------------
export async function fetchAutomations(): Promise<AutomationRule[]> {
  return mockRules;
}
export async function fetchApprovals(): Promise<ApprovalItem[]> {
  return mockApprovals;
}
export async function fetchLogs(): Promise<ActivityLog[]> {
  return mockLogs;
}
export async function fetchMetrics(): Promise<AutomationMetrics> {
  return mockMetrics;
}
