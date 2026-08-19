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

export const mockRules: AutomationRule[] = [];
export const mockApprovals: ApprovalItem[] = [];
export const mockLogs: ActivityLog[] = [];
export const mockMetrics: AutomationMetrics = {
  captured: 0,
  capturedTrend: 0,
  dmsTriggered: 0,
  conversionRate: 0,
  pendingApprovals: 0,
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
  dmMessage: '',
  publicReplyEnabled: false,
  publicReplies: [],
  dryRun: true,
  requireApproval: true,
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
