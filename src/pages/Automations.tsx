import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Zap, Plus, MessageSquare, Send, Reply, MoreHorizontal, Pencil, FlaskConical,
  ScrollText, Trash2, Check, X, ArrowUpRight, ShieldAlert, Search, ChevronLeft,
  ChevronRight, Inbox, AlertTriangle, Sparkles, CheckCircle,
} from 'lucide-react';
import {
  AutomationRule, ApprovalItem, ActivityLog, LogStatus, emptyRule, matchKeywords,
  relativeTime,
} from '@/lib/automationsMock';
import { useToast } from '@/hooks/use-toast';

/* ---------------------------------------------------------------------------
   Linear-style dark tokens, scoped to this page only so the rest of the
   dashboard theme is untouched.
--------------------------------------------------------------------------- */
const S = {
  canvas: 'bg-[#010102]',
  s1: 'bg-[#0f1011]',
  s2: 'bg-[#141516]',
  s3: 'bg-[#18191a]',
  line: 'border-[#23252a]',
  line2: 'border-[#34343a]',
  ink: 'text-[#f7f8f8]',
  muted: 'text-[#d0d6e0]',
  subtle: 'text-[#8a8f98]',
};
const ACCENT = '#5e6ad2';

const btnBase =
  'inline-flex items-center justify-center gap-1.5 rounded-lg text-[13px] font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5e6ad2]/60 disabled:opacity-50 active:scale-[0.98]';
const btnPrimary = `${btnBase} h-9 px-3.5 bg-[#5e6ad2] text-white hover:brightness-95`;
const btnGhost = `${btnBase} h-9 px-3 border border-[#34343a] text-[#f7f8f8] hover:bg-[#18191a]`;
const inputCls =
  'w-full h-9 rounded-lg bg-[#141516] border border-[#23252a] px-3 text-[13px] text-[#f7f8f8] placeholder:text-[#8a8f98] outline-none focus:border-[#5e6ad2] transition-colors';
const areaCls =
  'w-full rounded-lg bg-[#141516] border border-[#23252a] px-3 py-2 text-[13px] leading-relaxed text-[#f7f8f8] placeholder:text-[#8a8f98] outline-none focus:border-[#5e6ad2] transition-colors resize-y';


function Pill({ tone, children }: { tone: 'amber' | 'blue' | 'green' | 'slate' | 'purple' | 'red'; children: React.ReactNode }) {
  const tones: Record<string, string> = {
    amber: 'bg-amber-500/10 text-amber-600 border-amber-400/25',
    blue: 'bg-[hsl(var(--primary))]/15 text-[hsl(var(--foreground))] border-[hsl(var(--primary))]/35',
    green: 'bg-emerald-500/10 text-emerald-600 border-emerald-400/25',
    slate: 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))]',
    purple: 'bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-400/25',
    red: 'bg-red-500/10 text-red-600 border-red-500/25',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 rounded-full border transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]/60 ${
        checked ? 'bg-[hsl(var(--primary))] border-[hsl(var(--primary))]' : 'bg-[hsl(var(--muted))] border-[hsl(var(--border))]'
      }`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 520, damping: 34 }}
        className="absolute top-[1px] h-[16px] w-[16px] rounded-full bg-white"
        style={{ left: checked ? 20 : 2 }}
      />
    </button>
  );
}

function Check2({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-center gap-2 text-[13px] text-[hsl(var(--foreground))]">
      <span
        className={`grid h-4 w-4 place-items-center rounded-[4px] border transition-colors ${
          checked ? 'bg-[hsl(var(--primary))] border-[hsl(var(--primary))]' : 'bg-[hsl(var(--background))] border-[hsl(var(--border))]'
        }`}
      >
        {checked && <Check className="h-3 w-3 text-[hsl(var(--primary-foreground))]" strokeWidth={3} />}
      </span>
      {children}
    </button>
  );
}

/* ----------------------------- Metrics strip ----------------------------- */
function MetricsStrip({ pending }: { pending: number }) {
  const cards = [
    {
      label: 'Total Comments Captured',
      value: '0',
      foot: <span className={S.subtle}>No comments received yet</span>,
    },
    {
      label: 'DMs Triggered',
      value: '0',
      foot: <Pill tone="slate">0% trigger rate</Pill>,
    },
    {
      label: 'Pending Approvals',
      value: String(pending),
      foot: (
        <span className="inline-flex items-center gap-1 rounded-full border border-[#5e6ad2]/30 bg-[#5e6ad2]/10 px-2 py-0.5 text-[11px] font-medium text-[#8b9cf0]">
          Queue Clear
        </span>
      ),
    },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <motion.div
          key={c.label}
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={`rounded-xl border ${S.line} ${S.s1} p-4`}
        >
          <p className={`text-[12px] ${S.subtle}`}>{c.label}</p>
          <p className={`mt-2 text-[26px] font-semibold tabular-nums tracking-[-0.02em] ${S.ink}`}>{c.value}</p>
          <div className="mt-2 text-[12px]">{c.foot}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------- Rule card ------------------------------- */
function RuleCard({
  rule, onToggle, onEdit, onDelete, onTest, onLogs,
}: {
  rule: AutomationRule;
  onToggle: (v: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
  onTest: () => void;
  onLogs: () => void;
}) {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    if (!menu) return;
    const close = () => setMenu(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menu]);

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`rounded-xl border ${S.line} ${S.s1} p-4`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={`text-[15px] font-medium ${S.ink} truncate`}>{rule.name}</h3>
            {rule.dryRun && <Pill tone="amber">Dry-Run</Pill>}
            {rule.requireApproval && <Pill tone="blue">Manual Approval</Pill>}
          </div>
          <p className={`mt-1 text-[12px] ${S.subtle}`}>
            {rule.scope === 'all' ? 'Any post · all current & future' : `Post ${rule.postId}`} ·{' '}
            {rule.triggered7d} triggers in 7d
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Toggle checked={rule.active} onChange={onToggle} label={`Toggle ${rule.name}`} />
          <div className="relative">
            <button
              type="button"
              aria-label="Rule actions"
              onClick={(e) => { e.stopPropagation(); setMenu((v) => !v); }}
              className={`grid h-8 w-8 place-items-center rounded-lg border ${S.line2} ${S.subtle} hover:bg-[hsl(var(--muted))]`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {menu && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.14 }}
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute right-0 z-30 mt-1 w-44 overflow-hidden rounded-lg border ${S.line2} ${S.s3} p-1 shadow-xl`}
                >
                  {[
                    { icon: Pencil, label: 'Edit', fn: onEdit },
                    { icon: FlaskConical, label: 'Test Rule', fn: onTest },
                    { icon: ScrollText, label: 'View Logs', fn: onLogs },
                  ].map((i) => (
                    <button
                      key={i.label}
                      onClick={() => { setMenu(false); i.fn(); }}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                    >
                      <i.icon className="h-3.5 w-3.5" /> {i.label}
                    </button>
                  ))}
                  <button
                    onClick={() => { setMenu(false); onDelete(); }}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] text-red-600 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {rule.keywords.map((k) => (
          <span key={k} className={`rounded-md border ${S.line2} ${S.s2} px-2 py-0.5 text-[11px] ${S.muted}`}>{k}</span>
        ))}
        <Pill tone="slate">{rule.matchType === 'exact' ? 'Exact Word' : 'Partial Match'}</Pill>
      </div>

      <div className={`mt-3 flex items-center gap-3 border-t ${S.line} pt-3 text-[12px] ${S.subtle}`}>
        <span className={`inline-flex items-center gap-1.5 ${rule.dmEnabled ? 'text-[hsl(var(--foreground))]' : ''}`}>
          <Send className="h-3.5 w-3.5" /> Private DM
        </span>
        <span className={`inline-flex items-center gap-1.5 ${rule.publicReplyEnabled ? 'text-[hsl(var(--foreground))]' : ''}`}>
          <Reply className="h-3.5 w-3.5" /> Public Reply
        </span>
      </div>
    </motion.div>
  );
}

/* --------------------------- Create/Edit drawer --------------------------- */
function RuleDrawer({
  open, initial, onClose, onSave,
}: {
  open: boolean;
  initial: AutomationRule | null;
  onClose: () => void;
  onSave: (r: AutomationRule) => void;
}) {
  const [draft, setDraft] = useState<AutomationRule>(initial ?? emptyRule());
  const [kw, setKw] = useState('');
  const [sample, setSample] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => { if (open) { setDraft(initial ?? emptyRule()); setKw(''); setSample(''); setErrors({}); } }, [open, initial]);

  const set = <K extends keyof AutomationRule>(k: K, v: AutomationRule[K]) => setDraft((d) => ({ ...d, [k]: v }));

  const addKeyword = () => {
    const v = kw.trim();
    if (!v || draft.keywords.includes(v)) { setKw(''); return; }
    set('keywords', [...draft.keywords, v]);
    setKw('');
  };

  const matched = useMemo(
    () => matchKeywords(sample, draft.keywords, { wholeWord: draft.matchType === 'exact', caseInsensitive: draft.caseInsensitive }),
    [sample, draft.keywords, draft.matchType, draft.caseInsensitive],
  );

  const submit = () => {
    const e: Record<string, string> = {};
    if (!draft.name.trim()) e.name = 'Give the rule a name.';
    if (draft.keywords.length === 0) e.keywords = 'Add at least one trigger keyword.';
    if (draft.scope === 'post' && !draft.postId?.trim()) e.postId = 'Enter the Instagram media ID.';
    if (draft.dmEnabled && !draft.dmMessage.trim()) e.dmMessage = 'Write the DM that will be sent.';
    setErrors(e);
    if (Object.keys(e).length) return;
    onSave({ ...draft, id: draft.id || `rule_${Date.now()}` });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[560px] flex-col border-l ${S.line} ${S.canvas}`}
            role="dialog" aria-modal="true" aria-label="Automation editor"
          >
            <header className={`flex items-center justify-between border-b ${S.line} px-5 py-4`}>
              <div>
                <h2 className={`text-[15px] font-medium ${S.ink}`}>{initial ? 'Edit automation' : 'Create automation'}</h2>
                <p className={`text-[12px] ${S.subtle}`}>Trigger DMs or public replies from Instagram comments.</p>
              </div>
              <button onClick={onClose} aria-label="Close" className={`grid h-8 w-8 place-items-center rounded-lg border ${S.line2} ${S.subtle} hover:bg-[#18191a]`}>
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              <div>
                <label className={`mb-1.5 block text-[12px] font-medium ${S.muted}`}>Rule name</label>
                <input className={inputCls} value={draft.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Sizing Guide Auto-DM" />
                {errors.name && <p className="mt-1 text-[11px] text-red-600">{errors.name}</p>}
              </div>

              <div>
                <p className={`mb-1.5 text-[12px] font-medium ${S.muted}`}>Post target</p>
                <div className="space-y-2">
                  {([['all', 'All current & future posts'], ['post', 'Specific post media ID']] as const).map(([v, l]) => (
                    <button key={v} type="button" onClick={() => set('scope', v)}
                      className={`flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-[13px] transition-colors ${
                        draft.scope === v ? 'border-[#5e6ad2] bg-[#5e6ad2]/10 text-[#f7f8f8]' : `${S.line2} ${S.s2} text-[#f7f8f8]`
                      }`}>
                      <span className={`grid h-4 w-4 place-items-center rounded-full border ${draft.scope === v ? 'border-[#5e6ad2]' : 'border-[#34343a]'}`}>
                        {draft.scope === v && <span className="h-2 w-2 rounded-full bg-[#5e6ad2]" />}
                      </span>
                      {l}
                    </button>
                  ))}
                </div>
                {draft.scope === 'post' && (
                  <>
                    <input className={`${inputCls} mt-2`} placeholder="Instagram media ID" value={draft.postId ?? ''} onChange={(e) => set('postId', e.target.value)} />
                    {errors.postId && <p className="mt-1 text-[11px] text-red-600">{errors.postId}</p>}
                  </>
                )}
              </div>

              <div>
                <label className={`mb-1.5 block text-[12px] font-medium ${S.muted}`}>Trigger keywords</label>
                <div className={`flex flex-wrap items-center gap-1.5 rounded-lg border ${S.line2} ${S.s2} p-2`}>
                  {draft.keywords.map((k) => (
                    <span key={k} className={`inline-flex items-center gap-1 rounded-md border ${S.line2} ${S.s3} px-2 py-0.5 text-[11px] ${S.muted}`}>
                      {k}
                      <button onClick={() => set('keywords', draft.keywords.filter((x) => x !== k))} aria-label={`Remove ${k}`}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    value={kw}
                    onChange={(e) => setKw(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addKeyword(); } }}
                    onBlur={addKeyword}
                    placeholder="Type a keyword, press Enter"
                    className="min-w-[160px] flex-1 bg-transparent px-1 text-[13px] text-[#f7f8f8] placeholder:text-[#8a8f98] outline-none"
                  />
                </div>
                {errors.keywords && <p className="mt-1 text-[11px] text-red-600">{errors.keywords}</p>}
              </div>

              <div className="flex flex-wrap gap-4">
                <Check2 checked={draft.matchType === 'exact'} onChange={(v) => set('matchType', v ? 'exact' : 'partial')}>Whole-word match only</Check2>
                <Check2 checked={draft.caseInsensitive} onChange={(v) => set('caseInsensitive', v)}>Case-insensitive</Check2>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className={`text-[12px] font-medium ${S.muted}`}>Private DM message</label>
                  <Toggle checked={draft.dmEnabled} onChange={(v) => set('dmEnabled', v)} label="Enable private DM" />
                </div>
                <textarea
                  rows={4}
                  className={areaCls}
                  value={draft.dmMessage}
                  onChange={(e) => set('dmMessage', e.target.value)}
                  disabled={!draft.dmEnabled}
                  placeholder="Hi {username}, thanks for your comment! ..."
                />
                <div className="mt-1.5 flex items-center gap-1.5">
                  {['{username}', '{keyword}'].map((v) => (
                    <button key={v} type="button" onClick={() => set('dmMessage', `${draft.dmMessage}${v}`)}
                      className={`rounded-md border ${S.line2} ${S.s2} px-2 py-0.5 text-[11px] ${S.subtle} hover:text-[#f7f8f8]`}>{v}</button>
                  ))}
                </div>
                {errors.dmMessage && <p className="mt-1 text-[11px] text-red-600">{errors.dmMessage}</p>}
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className={`text-[12px] font-medium ${S.muted}`}>Public comment reply</label>
                  <Toggle checked={draft.publicReplyEnabled} onChange={(v) => set('publicReplyEnabled', v)} label="Enable public reply" />
                </div>
                {draft.publicReplyEnabled && (
                  <>
                    <textarea
                      rows={3} className={areaCls}
                      placeholder="One reply per line — Conveero picks one at random."
                      value={draft.publicReplies.join('\n')}
                      onChange={(e) => set('publicReplies', e.target.value.split('\n'))}
                    />
                    <p className={`mt-1 text-[11px] ${S.subtle}`}>Each line is a variant in the randomized reply pool.</p>
                  </>
                )}
              </div>

              <div className={`space-y-3 rounded-xl border ${S.line} ${S.s1} p-3.5`}>
                <p className={`flex items-center gap-1.5 text-[12px] font-medium ${S.muted}`}>
                  <ShieldAlert className="h-3.5 w-3.5" /> Safety & control
                </p>
                {([
                  ['dryRun', 'Dry-Run Mode', 'Test keyword matching without sending real messages.'],
                  ['requireApproval', 'Require Manual Approval', 'Queue replies for human review before sending.'],
                ] as const).map(([key, label, hint]) => (
                  <div key={key} className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`text-[13px] ${S.ink}`}>{label}</p>
                      <p className={`text-[11px] ${S.subtle}`}>{hint}</p>
                    </div>
                    <Toggle checked={draft[key]} onChange={(v) => set(key, v)} label={label} />
                  </div>
                ))}
              </div>

              <div className={`rounded-xl border ${S.line} ${S.s1} p-3.5`}>
                <p className={`flex items-center gap-1.5 text-[12px] font-medium ${S.muted}`}>
                  <FlaskConical className="h-3.5 w-3.5" /> Test your keywords
                </p>
                <input className={`${inputCls} mt-2`} placeholder="Type a sample comment..." value={sample} onChange={(e) => setSample(e.target.value)} />
                <div className="mt-2 text-[12px]">
                  {draft.keywords.length === 0 && !sample.trim() ? (
                    <span className={S.subtle}>Enter keywords and type a sample comment above to test matching...</span>
                  ) : !sample.trim() ? (
                    <span className={S.subtle}>Type a sample comment to see which keywords match.</span>
                  ) : matched.length ? (
                    <span className="text-emerald-500">
                      MATCHED: {matched.map((m) => `'${m}'`).join(', ')} → will trigger{' '}
                      {draft.dryRun ? 'a dry-run log only' : draft.requireApproval ? 'an approval queue item' : 'the DM template'}
                    </span>
                  ) : (
                    <span className="text-amber-500">NO MATCH — this comment would be ignored.</span>
                  )}
                </div>
              </div>
            </div>

            <footer className={`flex items-center justify-end gap-2 border-t ${S.line} px-5 py-4`}>
              <button className={btnGhost} onClick={onClose}>Cancel</button>
              <button className={btnPrimary} onClick={submit}>Save automation</button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------ Status badge ------------------------------ */
const STATUS: Record<LogStatus, { label: string; tone: 'green' | 'amber' | 'slate' | 'purple' | 'red' }> = {
  sent: { label: 'Sent', tone: 'green' },
  pending: { label: 'Pending Approval', tone: 'amber' },
  dry_run: { label: 'Skipped (Dry Run)', tone: 'slate' },
  rate_limited: { label: 'Skipped (Rate Limit)', tone: 'purple' },
  rejected: { label: 'Rejected', tone: 'red' },
  failed: { label: 'Failed', tone: 'red' },
};

/* --------------------------------- Page ---------------------------------- */
export default function Automations() {
  const { toast } = useToast();
  const [tab, setTab] = useState<'rules' | 'queue' | 'logs'>('rules');
  const [killswitch, setKillswitch] = useState(true);
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [logs] = useState<ActivityLog[]>([]);
  const [drawer, setDrawer] = useState<{ open: boolean; rule: AutomationRule | null }>({ open: false, rule: null });

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | LogStatus>('all');
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<ActivityLog | null>(null);
  const pageSize = 8;

  const filtered = useMemo(
    () =>
      logs.filter((l) => {
        const q = query.trim().toLowerCase();
        const okQ = !q || l.handle.toLowerCase().includes(q) || l.keyword.toLowerCase().includes(q) || l.comment.toLowerCase().includes(q);
        return okQ && (status === 'all' || l.status === status);
      }),
    [logs, query, status],
  );
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);
  useEffect(() => { setPage(1); }, [query, status]);

  const saveRule = (r: AutomationRule) => {
    setRules((prev) => (prev.some((p) => p.id === r.id) ? prev.map((p) => (p.id === r.id ? r : p)) : [r, ...prev]));
    setDrawer({ open: false, rule: null });
    toast({ title: 'Automation saved', description: `“${r.name}” is ${r.active ? 'live' : 'paused'}.` });
  };

  const tabs = [
    { id: 'rules', label: 'Active Rules' },
    { id: 'queue', label: 'Approval Queue', count: approvals.length },
    { id: 'logs', label: 'Activity Logs' },
  ] as const;

  return (
    <div className={`min-h-full ${S.canvas} px-4 py-6 sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-[1180px] space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className={`text-[22px] font-semibold tracking-[-0.02em] ${S.ink}`}>Comment Automations</h1>
            <p className={`mt-1 max-w-[620px] text-[13px] ${S.subtle}`}>
              Automatically trigger private DMs or public replies when users comment on your Instagram posts.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className={`inline-flex items-center gap-2.5 rounded-lg border ${S.line2} ${S.s1} px-3 py-1.5`}>
              <span className={`h-2 w-2 rounded-full ${killswitch ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]' : 'bg-red-400'}`} />
              <span className={`text-[12px] ${S.muted}`}>Global Killswitch: {killswitch ? 'Active' : 'Paused'}</span>
              <Toggle checked={killswitch} onChange={setKillswitch} label="Global killswitch" />
            </div>
            <button className={btnPrimary} onClick={() => setDrawer({ open: true, rule: null })}>
              <Plus className="h-4 w-4" /> Create Automation
            </button>
          </div>
        </div>

        {!killswitch && (
          <div className="flex items-center gap-2 rounded-lg border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-[12px] text-amber-600">
            <AlertTriangle className="h-3.5 w-3.5" /> All automations are paused. No DMs or public replies will be sent.
          </div>
        )}

        <MetricsStrip pending={approvals.length} />

        {/* Tabs */}
        <div className={`inline-flex rounded-lg border ${S.line} ${S.s1} p-1`}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${tab === t.id ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'}`}
            >
              {tab === t.id && (
                <motion.span layoutId="automation-tab" transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  className="absolute inset-0 rounded-md bg-[hsl(var(--border))]" />
              )}
              <span className="relative inline-flex items-center gap-1.5">
                {t.label}
                {'count' in t && t.count > 0 && (
                  <span className="rounded-full bg-amber-400/15 px-1.5 text-[10px] text-amber-600">{t.count}</span>
                )}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }}>
            {/* -------------------------- Tab 1 -------------------------- */}
            {tab === 'rules' && (
              <div className="grid gap-3">
                {rules.map((r) => (
                  <RuleCard
                    key={r.id}
                    rule={r}
                    onToggle={(v) => setRules((prev) => prev.map((p) => (p.id === r.id ? { ...p, active: v } : p)))}
                    onEdit={() => setDrawer({ open: true, rule: r })}
                    onTest={() => setDrawer({ open: true, rule: r })}
                    onLogs={() => { setQuery(r.keywords[0] ?? ''); setTab('logs'); }}
                    onDelete={() => {
                      setRules((prev) => prev.filter((p) => p.id !== r.id));
                      toast({ title: 'Automation deleted', description: `“${r.name}” was removed.` });
                    }}
                  />
                ))}
                {rules.length === 0 && (
                  <div className={`rounded-xl border ${S.line} ${S.s1} p-6 text-center`}>
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#18191a]">
                      <Sparkles className="h-5 w-5 text-[#8b9cf0]" />
                    </div>
                    <h3 className={`mt-4 text-[15px] font-medium ${S.ink}`}>No automation rules configured</h3>
                    <p className={`mx-auto mt-1 max-w-[420px] text-[13px] ${S.subtle}`}>
                      Create your first keyword trigger to automatically send private DMs or public replies when customers comment on your Instagram posts.
                    </p>
                    <button className={`${btnPrimary} mt-4`} onClick={() => setDrawer({ open: true, rule: null })}>
                      <Plus className="h-4 w-4" /> Create your first rule
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* -------------------------- Tab 2 -------------------------- */}
            {tab === 'queue' && (
              <div className="grid gap-3">
                {approvals.map((a) => (
                  <ApprovalCard
                    key={a.id}
                    item={a}
                    onResolve={(kind) => {
                      setApprovals((prev) => prev.filter((p) => p.id !== a.id));
                      toast({
                        title: kind === 'reject' ? 'Reply rejected' : 'DM sent',
                        description: kind === 'reject' ? `Nothing was sent to ${a.handle}.` : `Reply delivered to ${a.handle}.`,
                      });
                    }}
                  />
                ))}
                {approvals.length === 0 && (
                  <div className={`rounded-xl border ${S.line} ${S.s1} p-6 text-center`}>
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#18191a]">
                      <CheckCircle className="h-5 w-5 text-[#8b9cf0]" />
                    </div>
                    <h3 className={`mt-4 text-[15px] font-medium ${S.ink}`}>Approval queue is empty</h3>
                    <p className={`mx-auto mt-1 max-w-[420px] text-[13px] ${S.subtle}`}>
                      When comment automation rules with manual approval enabled are triggered, drafted replies will appear here for your review.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* -------------------------- Tab 3 -------------------------- */}
            {tab === 'logs' && (
              <div className={`rounded-2xl border ${S.line} ${S.s1}`}>
                <div className={`flex flex-col gap-2 border-b ${S.line} p-3 sm:flex-row sm:items-center`}>
                  <div className="relative flex-1">
                    <Search className={`pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 ${S.subtle}`} />
                    <input className={`${inputCls} pl-8`} placeholder="Search by @handle, keyword or comment" value={query} onChange={(e) => setQuery(e.target.value)} />
                  </div>
                  <select className={`${inputCls} sm:w-[190px]`} value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
                    <option value="all">All statuses</option>
                    {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>

                {/* Desktop table */}
                <div className="hidden md:block">
                  <table className="w-full text-left">
                    <thead>
                      <tr className={`border-b ${S.line} text-[11px] uppercase tracking-[0.06em] ${S.subtle}`}>
                        <th className="px-4 py-2.5 font-medium">Timestamp</th>
                        <th className="px-4 py-2.5 font-medium">Commenter</th>
                        <th className="px-4 py-2.5 font-medium">Comment Text</th>
                        <th className="px-4 py-2.5 font-medium">Triggered Rule</th>
                        <th className="px-4 py-2.5 font-medium">Status</th>
                        <th className="px-4 py-2.5 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((l) => (
                        <tr key={l.id} className={`border-b ${S.line} transition-colors hover:bg-[#18191a]`}>
                          <td className={`whitespace-nowrap px-4 py-2.5 text-[12px] ${S.subtle}`}>{relativeTime(l.at)}</td>
                          <td className={`whitespace-nowrap px-4 py-2.5 text-[13px] ${S.ink}`}>{l.handle}</td>
                          <td className={`max-w-[260px] truncate px-4 py-2.5 text-[13px] ${S.muted}`} title={l.comment}>{l.comment}</td>
                          <td className={`px-4 py-2.5 text-[12px] ${S.muted}`}>
                            {l.ruleName} <span className={S.subtle}>· {l.keyword}</span>
                          </td>
                          <td className="px-4 py-2.5"><Pill tone={STATUS[l.status].tone}>{STATUS[l.status].label}</Pill></td>
                          <td className="px-4 py-2.5 text-right">
                            <button className={`text-[12px] ${S.subtle} hover:text-[#f7f8f8]`} onClick={() => setDetail(l)}>View detail</button>
                          </td>
                        </tr>
                      ))}
                      {rows.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-4 py-14 text-center">
                            <ScrollText className={`mx-auto h-6 w-6 ${S.subtle}`} />
                            <p className={`mt-3 text-[13px] ${S.muted}`}>No comment activity recorded yet. Incoming comments from connected Instagram accounts will appear here in real time.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="space-y-2 p-3 md:hidden">
                  {rows.map((l) => (
                    <button key={l.id} onClick={() => setDetail(l)} className={`block w-full rounded-xl border ${S.line2} ${S.s2} p-3 text-left`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-[13px] ${S.ink}`}>{l.handle}</span>
                        <span className={`text-[11px] ${S.subtle}`}>{relativeTime(l.at)}</span>
                      </div>
                      <p className={`mt-1 line-clamp-2 text-[12px] ${S.muted}`}>{l.comment}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className={`text-[11px] ${S.subtle}`}>{l.ruleName} · {l.keyword}</span>
                        <Pill tone={STATUS[l.status].tone}>{STATUS[l.status].label}</Pill>
                      </div>
                    </button>
                  ))}
                  {rows.length === 0 && (
                    <div className="py-10 text-center">
                      <ScrollText className={`mx-auto h-6 w-6 ${S.subtle}`} />
                      <p className={`mt-3 px-4 text-[13px] ${S.muted}`}>No comment activity recorded yet. Incoming comments from connected Instagram accounts will appear here in real time.</p>
                    </div>
                  )}
                </div>

                <div className={`flex items-center justify-between border-t ${S.line} px-4 py-3 text-[12px] ${S.subtle}`}>
                  <span>{filtered.length} events</span>
                  <div className="flex items-center gap-1.5">
                    <button className={`grid h-7 w-7 place-items-center rounded-md border ${S.line2} disabled:opacity-40`} disabled={page === 1} onClick={() => setPage((p) => p - 1)} aria-label="Previous page">
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <span className={S.muted}>{page} / {pages}</span>
                    <button className={`grid h-7 w-7 place-items-center rounded-md border ${S.line2} disabled:opacity-40`} disabled={page === pages} onClick={() => setPage((p) => p + 1)} aria-label="Next page">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <RuleDrawer open={drawer.open} initial={drawer.rule} onClose={() => setDrawer({ open: false, rule: null })} onSave={saveRule} />

      {/* Log detail modal */}
      <AnimatePresence>
        {detail && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-foreground/20" onClick={() => setDetail(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              role="dialog" aria-modal="true" aria-label="Log detail"
              className={`fixed left-1/2 top-1/2 z-50 w-[min(560px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 rounded-2xl border ${S.line} ${S.s1} p-5`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-[15px] font-medium ${S.ink}`}>{detail.handle}</h3>
                  <p className={`text-[12px] ${S.subtle}`}>{relativeTime(detail.at)} · {detail.channel === 'dm' ? 'Private DM' : 'Public reply'}</p>
                </div>
                <Pill tone={STATUS[detail.status].tone}>{STATUS[detail.status].label}</Pill>
              </div>
              <blockquote className={`mt-3 rounded-lg border-l-2 border-[hsl(var(--primary))] ${S.s2} px-3 py-2 text-[13px] ${S.muted}`}>{detail.comment}</blockquote>
              <p className={`mt-3 text-[12px] ${S.subtle}`}>Matched <span className="text-[hsl(var(--foreground))]">{detail.keyword}</span> via {detail.ruleName}</p>
              <pre className={`mt-3 max-h-[220px] overflow-auto rounded-lg border ${S.line2} ${S.s2} p-3 text-[11px] leading-relaxed text-[hsl(var(--foreground))]`}>
{JSON.stringify(detail.payload, null, 2)}
              </pre>
              <div className="mt-4 flex justify-end">
                <button className={btnGhost} onClick={() => setDetail(null)}>Close</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------- Approval card ----------------------------- */
function ApprovalCard({ item, onResolve }: { item: ApprovalItem; onResolve: (kind: 'send' | 'edit' | 'reject') => void }) {
  const [draft, setDraft] = useState(item.draft);
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <motion.div
      layout whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`rounded-xl border ${S.line} ${S.s1} p-4`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[hsl(var(--primary))]/20 text-[11px] font-medium text-[hsl(var(--foreground))]">
            {item.handle.replace('@', '').slice(0, 2).toUpperCase()}
          </span>
          <span className={`text-[13px] ${S.ink}`}>{item.handle}</span>
          <span className={`text-[12px] ${S.subtle}`}>{relativeTime(item.at)}</span>
        </div>
        <Pill tone="blue">
          <MessageSquare className="h-3 w-3" /> {item.ruleName} · “{item.keyword}”
        </Pill>
      </div>

      <blockquote className={`mt-3 rounded-lg border-l-2 border-[hsl(var(--border))] ${S.s2} px-3 py-2 text-[13px] italic ${S.muted}`}>
        “{item.comment}”
      </blockquote>

      <textarea
        ref={ref}
        rows={3}
        className={`${areaCls} mt-3`}
        value={draft}
        onChange={(e) => { setDraft(e.target.value); setEditing(true); }}
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <button className={btnPrimary} onClick={() => onResolve('send')}>
          <Send className="h-3.5 w-3.5" /> Approve & Send DM
        </button>
        <button className={btnGhost} onClick={() => { if (!editing) { ref.current?.focus(); setEditing(true); } else onResolve('edit'); }}>
          <Pencil className="h-3.5 w-3.5" /> {editing ? 'Send edited reply' : 'Edit & Send'}
        </button>
        <button className={`${btnBase} h-9 px-3 border border-red-500/30 text-red-600 hover:bg-red-500/10`} onClick={() => onResolve('reject')}>
          <X className="h-3.5 w-3.5" /> Reject
        </button>
      </div>
    </motion.div>
  );
}
