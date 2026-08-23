import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Table2, RefreshCw, Download, MoreHorizontal, Copy, ExternalLink,
  Users, Sparkles, Rocket, Loader2, Link2Off, Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { LeadRowSkeleton } from '@/components/dashboard/Skeletons';
import { cn } from '@/lib/utils';
import {
  Lead, LeadStatus, SheetConnection, clearConnection, fetchLeads, formatTimestamp,
  loadConnection, parseSheetId, saveConnection, sheetUrl, toCsv,
} from '@/lib/leadsMock';

/* ------------------------------ Status pill ------------------------------ */
const STATUS_TONES: Record<LeadStatus, string> = {
  New: 'bg-blue-50 text-blue-700 border-blue-200',
  Contacted: 'bg-muted text-muted-foreground border-border',
  Pilot: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Closed: 'bg-muted/50 text-muted-foreground/70 border-border/70',
};

function StatusPill({ status }: { status: LeadStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium',
        STATUS_TONES[status] ?? STATUS_TONES.Contacted,
      )}
    >
      {status}
    </span>
  );
}

/* ------------------------------ Stat card -------------------------------- */
function StatCard({
  label, value, foot, icon: Icon, loading,
}: {
  label: string; value: number; foot: string; icon: typeof Users; loading: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-sm)]"
    >
      <div className="flex items-start justify-between">
        <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
        <div className="rounded-lg bg-muted p-2">
          <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
        </div>
      </div>
      {loading ? (
        <Skeleton className="mt-4 h-7 w-16" />
      ) : (
        <p className="mt-4 text-[26px] font-semibold leading-none tracking-[-0.015em] tabular-nums text-foreground">
          {value}
        </p>
      )}
      <p className="mt-2 text-[12px] text-muted-foreground">{foot}</p>
    </motion.div>
  );
}

/* ------------------------------ Setup guide ------------------------------ */
function SetupGuideDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Set up your CRM Sheet</DialogTitle>
          <DialogDescription>
            Conveero reads your sheet — it never writes to it or stores a copy.
          </DialogDescription>
        </DialogHeader>
        <ol className="space-y-3 text-[13px] text-muted-foreground">
          <li><span className="font-medium text-foreground">1.</span> Create a new Google Sheet (or open an existing one).</li>
          <li>
            <span className="font-medium text-foreground">2.</span> Add these exact column headers in row 1:
            <div className="mt-2 overflow-x-auto rounded-lg border border-border bg-muted/50 p-3 font-mono text-[12px] text-foreground">
              Timestamp | Name | Email | Company | Status | Source
            </div>
          </li>
          <li>
            <span className="font-medium text-foreground">3.</span> Use one of these values in the
            {' '}<span className="font-medium text-foreground">Status</span> column: New, Contacted, Pilot, Closed.
          </li>
          <li><span className="font-medium text-foreground">4.</span> Share the sheet with view access, then copy the sheet URL or ID.</li>
          <li><span className="font-medium text-foreground">5.</span> Paste it into “Connect Google Sheet”.</li>
        </ol>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------------------- Connect dialog ----------------------------- */
function ConnectDialog({
  open, onOpenChange, onConnect,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onConnect: (conn: SheetConnection) => void;
}) {
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const id = parseSheetId(value);
    if (!id) {
      setError('Paste a valid Google Sheets URL or sheet ID.');
      return;
    }
    setError('');
    setBusy(true);
    // Placeholder for the real OAuth / API route handshake.
    await new Promise((r) => setTimeout(r, 700));
    setBusy(false);
    onConnect({
      sheetId: id,
      sheetName: name.trim() || 'CRM Sheet',
      connectedAt: new Date().toISOString(),
      lastSyncedAt: new Date().toISOString(),
    });
    setValue('');
    setName('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Google Sheet</DialogTitle>
          <DialogDescription>
            Paste the sheet URL or ID. Conveero reads rows for display only.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-foreground">Sheet URL or ID</label>
            <Input
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(''); }}
              placeholder="https://docs.google.com/spreadsheets/d/..."
              autoFocus
            />
            {error && <p className="text-[12px] text-destructive">{error}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-foreground">Label (optional)</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="CRM Sheet" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} disabled={busy}>
            {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Connect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------- Page ------------------------------------ */
export default function Leads() {
  const { toast } = useToast();
  const [connection, setConnection] = useState<SheetConnection | null>(() => loadConnection());
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [connectOpen, setConnectOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  const load = async (conn: SheetConnection) => {
    setLoading(true);
    try {
      setLeads(await fetchLeads(conn.sheetId));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connection) load(connection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection?.sheetId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) =>
      [l.name, l.email, l.company, l.status, l.source].some((f) => f.toLowerCase().includes(q)),
    );
  }, [leads, query]);

  const stats = useMemo(() => ({
    total: leads.length,
    fresh: leads.filter((l) => l.status === 'New').length,
    pilots: leads.filter((l) => l.status === 'Pilot').length,
  }), [leads]);

  const handleConnect = (conn: SheetConnection) => {
    saveConnection(conn);
    setConnection(conn);
    toast({ title: 'Sheet connected', description: 'Leads will sync from your Google Sheet.' });
  };

  const handleDisconnect = () => {
    clearConnection();
    setConnection(null);
    setLeads([]);
  };

  const handleSync = async () => {
    if (!connection) return;
    const next = { ...connection, lastSyncedAt: new Date().toISOString() };
    saveConnection(next);
    setConnection(next);
    await load(next);
    toast({ title: 'Synced', description: 'Pulled the latest rows from your sheet.' });
  };

  const handleExport = () => {
    const blob = new Blob([toCsv(filtered)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conveero-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      toast({ title: 'Email copied', description: email });
    } catch {
      toast({ title: 'Could not copy', variant: 'destructive' });
    }
  };

  /* ------------------------- Disconnected state ------------------------- */
  if (!connection) {
    return (
      <div className="mx-auto w-full max-w-2xl px-1 py-10">
        <div className="rounded-2xl border border-border/70 bg-card p-8 text-center shadow-[var(--shadow-sm)]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Table2 className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
          </div>
          <h1 className="mt-4 text-[19px] font-semibold tracking-[-0.015em] text-foreground">
            Connect your CRM Sheet
          </h1>
          <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-muted-foreground">
            Link your Google Sheet to visualize leads and customer data directly in Conveero.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <Button onClick={() => setConnectOpen(true)} className="min-h-[44px] px-5">
              Connect Google Sheet
            </Button>
            <button
              type="button"
              onClick={() => setGuideOpen(true)}
              className="text-[13px] font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              View setup guide
            </button>
          </div>
        </div>
        <ConnectDialog open={connectOpen} onOpenChange={setConnectOpen} onConnect={handleConnect} />
        <SetupGuideDialog open={guideOpen} onOpenChange={setGuideOpen} />
      </div>
    );
  }

  /* --------------------------- Connected state --------------------------- */
  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[20px] font-semibold tracking-[-0.015em] text-foreground">Leads</h1>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Synced from your CRM Sheet
            <Badge variant="secondary" className="ml-2 align-middle text-[11px]">{connection.sheetName}</Badge>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={handleSync} disabled={loading}>
            <RefreshCw className={cn('mr-2 h-4 w-4', loading && 'animate-spin')} />
            Sync Now
          </Button>
          <Button variant="outline" onClick={handleExport} disabled={!filtered.length}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="ghost" onClick={handleDisconnect} className="text-muted-foreground">
            <Link2Off className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total Leads" value={stats.total} foot="All rows in the sheet" icon={Users} loading={loading} />
        <StatCard label="New Leads" value={stats.fresh} foot="Status = New" icon={Sparkles} loading={loading} />
        <StatCard label="Pilots Started" value={stats.pilots} foot="Status = Pilot" icon={Rocket} loading={loading} />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-2 border-b border-border/70 p-3">
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search leads"
              className="pl-9"
            />
          </div>
          <span className="ml-auto text-[12px] text-muted-foreground tabular-nums">
            {filtered.length} {filtered.length === 1 ? 'row' : 'rows'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-border/70 text-[12px] font-medium text-muted-foreground">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <LeadRowSkeleton key={i} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center">
                    {query ? (
                      <EmptyState
                        bare
                        icon={Search}
                        title="No matching leads"
                        description="No leads match your search. Try a different name, email, or company."
                      />
                    ) : (
                      <EmptyState
                        bare
                        icon={Users}
                        title="No leads yet"
                        description="When visitors fill out your contact form, they&rsquo;ll appear here"
                        actionLabel="View contact form"
                        onAction={() => window.open('/contact', '_blank', 'noopener,noreferrer')}
                      />
                    )}
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-border/50 transition-colors duration-150 last:border-0 hover:bg-muted/50"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{lead.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{lead.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">{lead.company}</td>
                    <td className="px-4 py-3"><StatusPill status={lead.status} /></td>
                    <td className="px-4 py-3 text-muted-foreground">{lead.source}</td>
                    <td className="px-4 py-3 text-muted-foreground tabular-nums">{formatTimestamp(lead.timestamp)}</td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={`Actions for ${lead.name}`}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => copyEmail(lead.email)}>
                            <Copy className="mr-2 h-4 w-4" /> Copy Email
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <a href={sheetUrl(connection.sheetId)} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" /> Open in Sheets
                            </a>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SetupGuideDialog open={guideOpen} onOpenChange={setGuideOpen} />
    </div>
  );
}
