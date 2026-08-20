// Leads viewer data layer.
// This page is a *visual viewer* for an external Google Sheet — there is no
// custom CRM backend. Every accessor below is an async placeholder that can be
// swapped for a real API route / MCP call without touching the UI.

export type LeadStatus = 'New' | 'Contacted' | 'Pilot' | 'Closed';

export interface Lead {
  id: string;
  timestamp: string; // ISO
  name: string;
  email: string;
  company: string;
  status: LeadStatus;
  source: string;
}

export interface SheetConnection {
  sheetId: string;
  sheetName: string;
  connectedAt: string;
  lastSyncedAt: string;
}

const STORAGE_KEY = 'conveero_leads_sheet_v1';

export function loadConnection(): SheetConnection | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SheetConnection) : null;
  } catch {
    return null;
  }
}

export function saveConnection(conn: SheetConnection) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conn));
  } catch {
    /* ignore */
  }
}

export function clearConnection() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/** Preview-only fixtures. Never used in production builds. */
const MOCK_LEADS: Lead[] = [
  {
    id: 'l1',
    timestamp: '2026-08-19T14:22:00.000Z',
    name: 'Amina Yusuf',
    email: 'amina@brightlane.co',
    company: 'Brightlane Studio',
    status: 'New',
    source: 'Instagram DM',
  },
  {
    id: 'l2',
    timestamp: '2026-08-19T09:05:00.000Z',
    name: 'Daniel Okafor',
    email: 'daniel@northpeak.io',
    company: 'Northpeak',
    status: 'Pilot',
    source: 'Website form',
  },
  {
    id: 'l3',
    timestamp: '2026-08-18T17:41:00.000Z',
    name: 'Sofia Marchetti',
    email: 'sofia@casaverde.it',
    company: 'Casa Verde',
    status: 'Contacted',
    source: 'Comment automation',
  },
  {
    id: 'l4',
    timestamp: '2026-08-17T11:12:00.000Z',
    name: 'Tomás Rivera',
    email: 'tomas@lumeapparel.com',
    company: 'Lume Apparel',
    status: 'Pilot',
    source: 'Referral',
  },
  {
    id: 'l5',
    timestamp: '2026-08-16T08:30:00.000Z',
    name: 'Grace Bennett',
    email: 'grace@harborandco.com',
    company: 'Harbor & Co.',
    status: 'Closed',
    source: 'Website form',
  },
];

const IS_DEV = import.meta.env.DEV;

/** Fetch rows for the connected sheet. Dev shows fixtures; prod starts empty. */
export async function fetchLeads(_sheetId: string): Promise<Lead[]> {
  await new Promise((r) => setTimeout(r, 550));
  return IS_DEV ? MOCK_LEADS : [];
}

export function sheetUrl(sheetId: string) {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
}

/** Accepts a raw sheet ID or a full Google Sheets URL. */
export function parseSheetId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match) return match[1];
  return /^[a-zA-Z0-9-_]{20,}$/.test(trimmed) ? trimmed : null;
}

export function toCsv(leads: Lead[]): string {
  const head = ['Timestamp', 'Name', 'Email', 'Company', 'Status', 'Source'];
  const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  const rows = leads.map((l) =>
    [l.timestamp, l.name, l.email, l.company, l.status, l.source].map(esc).join(',')
  );
  return [head.join(','), ...rows].join('\n');
}

export function formatTimestamp(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
