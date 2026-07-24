import { useState, useRef, useEffect, useMemo, KeyboardEvent, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Send,
  Bot,
  CheckCircle,
  ArrowLeft,
  User,
  Loader2,
  AlertCircle,
  RefreshCw,
  Instagram,
  Info,
  MoreHorizontal,
  RotateCcw,
  UserPlus,
  MailOpen,
  X,
  WifiOff,
  Sparkles,
  Inbox,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { formatDistanceToNow, format, isToday, isYesterday, differenceInMinutes } from 'date-fns';
import { mockConversations, type MockConversation, type ConvAssignee } from '@/lib/conversationsMock';
import type { Message } from '@/types';

type Segment = 'all' | 'unread' | 'attention' | 'resolved';
type StatusFilter = 'any' | 'open' | 'resolved';
type Sort = 'newest' | 'unread_first';
type QaState = 'ready' | 'loading' | 'error' | 'empty';

type OutgoingStatus = 'sent' | 'sending' | 'failed';
interface UiMessage extends Message {
  status?: OutgoingStatus;
}

const SEGMENTS: { id: Segment; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'attention', label: 'Needs attention' },
  { id: 'resolved', label: 'Resolved' },
];

export default function Conversations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const qaState = (searchParams.get('convState') as QaState) || 'ready';

  const [conversations, setConversations] = useState<MockConversation[]>([]);
  const [status, setStatus] = useState<QaState>('loading');
  const [selectedId, setSelectedId] = useState<string | null>(searchParams.get('id') || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [segment, setSegment] = useState<Segment>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('any');
  const [aiFailedOnly, setAiFailedOnly] = useState(false);
  const [last7dOnly, setLast7dOnly] = useState(false);
  const [sort, setSort] = useState<Sort>('newest');

  const [newMessage, setNewMessage] = useState('');
  const [pending, setPending] = useState<Record<string, UiMessage[]>>({});
  const [infoOpen, setInfoOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Mock channel connectivity
  const [channelConnected] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulated load with QA states
  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    const t = setTimeout(() => {
      if (cancelled) return;
      if (qaState === 'loading') return;
      if (qaState === 'error') {
        setStatus('error');
        return;
      }
      if (qaState === 'empty') {
        setConversations([]);
        setStatus('ready');
        return;
      }
      setConversations(mockConversations);
      setStatus('ready');
    }, 450);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [qaState]);

  const counts = useMemo(() => {
    const all = conversations.length;
    const unread = conversations.filter((c) => (c.unread_count || 0) > 0 && !c.is_resolved).length;
    const attention = conversations.filter((c) => c.needs_attention && !c.is_resolved).length;
    const resolved = conversations.filter((c) => c.is_resolved).length;
    return { all, unread, attention, resolved };
  }, [conversations]);

  const filtered = useMemo(() => {
    let list = [...conversations];
    // segment
    if (segment === 'unread') list = list.filter((c) => (c.unread_count || 0) > 0 && !c.is_resolved);
    else if (segment === 'attention') list = list.filter((c) => c.needs_attention && !c.is_resolved);
    else if (segment === 'resolved') list = list.filter((c) => c.is_resolved);
    // status
    if (statusFilter === 'open') list = list.filter((c) => !c.is_resolved);
    else if (statusFilter === 'resolved') list = list.filter((c) => c.is_resolved);
    // ai failed
    if (aiFailedOnly) list = list.filter((c) => c.ai_status === 'failed');
    // 7d
    if (last7dOnly) {
      const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
      list = list.filter((c) => new Date(c.last_interaction_at).getTime() >= cutoff);
    }
    // search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.sender_name?.toLowerCase().includes(q) ||
          c.last_message?.toLowerCase().includes(q) ||
          c.handle?.toLowerCase().includes(q),
      );
    }
    // sort
    if (sort === 'newest') {
      list.sort((a, b) => +new Date(b.last_interaction_at) - +new Date(a.last_interaction_at));
    } else {
      list.sort((a, b) => {
        const ua = a.unread_count || 0;
        const ub = b.unread_count || 0;
        if (ua !== ub) return ub - ua;
        return +new Date(b.last_interaction_at) - +new Date(a.last_interaction_at);
      });
    }
    return list;
  }, [conversations, segment, statusFilter, aiFailedOnly, last7dOnly, searchQuery, sort]);

  const selected = conversations.find((c) => c.id === selectedId) || null;
  const selectedMessages: UiMessage[] = useMemo(() => {
    if (!selected) return [];
    return [...(selected.messages || []), ...(pending[selected.id] || [])];
  }, [selected, pending]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedMessages.length, selectedId]);

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }, [newMessage, selectedId]);

  const composerDisabled =
    !selected || !channelConnected || selected.is_resolved;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const next = new URLSearchParams(searchParams);
    next.set('id', id);
    setSearchParams(next, { replace: true });
    // mark read (mock)
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unread_count: 0 } : c)));
  };

  const clearSelection = () => {
    setSelectedId(null);
    const next = new URLSearchParams(searchParams);
    next.delete('id');
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => {
    setSegment('all');
    setStatusFilter('any');
    setAiFailedOnly(false);
    setLast7dOnly(false);
    setSearchQuery('');
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selected || composerDisabled) return;
    const id = `pending-${Date.now()}`;
    const draft: UiMessage = {
      id,
      role: 'assistant',
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      status: 'sending',
    };
    setPending((p) => ({ ...p, [selected.id]: [...(p[selected.id] || []), draft] }));
    setNewMessage('');
    // simulate ack; 15% chance to fail for demo
    setTimeout(() => {
      setPending((p) => {
        const list = p[selected.id] || [];
        const shouldFail = Math.random() < 0.15;
        return {
          ...p,
          [selected.id]: list.map((m) =>
            m.id === id ? { ...m, status: shouldFail ? 'failed' : 'sent' } : m,
          ),
        };
      });
    }, 900);
  };

  const retrySend = (msgId: string) => {
    if (!selected) return;
    setPending((p) => ({
      ...p,
      [selected.id]: (p[selected.id] || []).map((m) =>
        m.id === msgId ? { ...m, status: 'sending' } : m,
      ),
    }));
    setTimeout(() => {
      setPending((p) => ({
        ...p,
        [selected.id]: (p[selected.id] || []).map((m) =>
          m.id === msgId ? { ...m, status: 'sent' } : m,
        ),
      }));
    }, 900);
  };

  const toggleResolved = () => {
    if (!selected) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selected.id
          ? { ...c, is_resolved: !c.is_resolved, status: c.is_resolved ? 'open' : 'resolved' }
          : c,
      ),
    );
  };

  const setAssignee = (a: ConvAssignee) => {
    if (!selected) return;
    setConversations((prev) => prev.map((c) => (c.id === selected.id ? { ...c, assignee: a } : c)));
  };

  const markUnread = () => {
    if (!selected) return;
    setConversations((prev) =>
      prev.map((c) => (c.id === selected.id ? { ...c, unread_count: Math.max(1, c.unread_count) } : c)),
    );
    clearSelection();
  };

  const onComposerKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const showList = !isMobileView || !selectedId;
  const showDetail = !isMobileView || !!selectedId;

  const showInfoDesktop = infoOpen && !isMobileView && !!selected;

  const openInfo = () => {
    if (isMobileView) setMobileInfoOpen(true);
    else setInfoOpen((v) => !v);
  };

  const anyFilterActive =
    segment !== 'all' || statusFilter !== 'any' || aiFailedOnly || last7dOnly || !!searchQuery;

  return (
    <div className="h-[calc(100vh-3.5rem)] flex bg-background">
      {/* Rail */}
      <AnimatePresence mode="wait">
        {showList && (
          <motion.div
            key="rail"
            initial={isMobileView ? { x: -60, opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'border-r border-border/60 bg-card flex flex-col',
              isMobileView ? 'w-full' : 'w-80 lg:w-96',
            )}
          >
            {/* Header */}
            <div className="p-3 border-b border-border/60 space-y-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-[14px] font-semibold text-foreground md:tracking-[-0.01em]">
                  Conversations
                </h2>
                <span className="text-[11px] text-muted-foreground tabular-nums">
                  {counts.all}
                </span>
              </div>

              {/* Segments */}
              <div className="flex items-center gap-1 overflow-x-auto -mx-1 px-1 scrollbar-thin">
                {SEGMENTS.map((s) => {
                  const c =
                    s.id === 'all'
                      ? counts.all
                      : s.id === 'unread'
                      ? counts.unread
                      : s.id === 'attention'
                      ? counts.attention
                      : counts.resolved;
                  const active = segment === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSegment(s.id)}
                      className={cn(
                        'shrink-0 h-8 px-2.5 rounded-md text-[12px] font-medium inline-flex items-center gap-1.5 transition-colors focus-ring',
                        active
                          ? 'bg-foreground text-background'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                      )}
                    >
                      {s.label}
                      <span
                        className={cn(
                          'text-[10.5px] tabular-nums px-1.5 rounded-full',
                          active ? 'bg-background/20' : 'bg-muted',
                        )}
                      >
                        {c}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  strokeWidth={1.75}
                />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 text-[13px]"
                />
              </div>

              {/* Filter + Sort */}
              <div className="flex items-center flex-wrap gap-1.5">
                <FilterChip
                  active={statusFilter !== 'any'}
                  label={
                    statusFilter === 'open'
                      ? 'Open'
                      : statusFilter === 'resolved'
                      ? 'Resolved'
                      : 'Status'
                  }
                >
                  <DropdownMenuItem onSelect={() => setStatusFilter('any')}>Any</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setStatusFilter('open')}>Open</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setStatusFilter('resolved')}>Resolved</DropdownMenuItem>
                </FilterChip>

                <ToggleChip active={aiFailedOnly} onClick={() => setAiFailedOnly((v) => !v)}>
                  AI failed
                </ToggleChip>
                <ToggleChip active={last7dOnly} onClick={() => setLast7dOnly((v) => !v)}>
                  7d
                </ToggleChip>

                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="h-7 px-2 rounded-md text-[11.5px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-ring">
                        {sort === 'newest' ? 'Newest' : 'Unread first'}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel className="text-[11px]">Sort by</DropdownMenuLabel>
                      <DropdownMenuItem onSelect={() => setSort('newest')}>Newest</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSort('unread_first')}>
                        Unread first
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {anyFilterActive && (
                  <button
                    onClick={clearFilters}
                    className="h-7 px-2 rounded-md text-[11.5px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-ring inline-flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 min-h-0">
              {status === 'loading' ? (
                <div className="p-2 space-y-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3">
                      <Skeleton variant="shimmer" className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton variant="shimmer" className="h-3 w-1/2" />
                        <Skeleton variant="shimmer" className="h-3 w-4/5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : status === 'error' ? (
                <RailError onRetry={() => setStatus('ready')} />
              ) : filtered.length === 0 ? (
                anyFilterActive ? (
                  <RailEmpty
                    icon={<Search className="w-5 h-5" />}
                    title="No matches"
                    subtitle="Try clearing filters or searching differently."
                    action={<Button variant="outline" size="sm" onClick={clearFilters}>Clear filters</Button>}
                  />
                ) : (
                  <RailEmpty
                    icon={<Inbox className="w-5 h-5" />}
                    title="No conversations yet"
                    subtitle="New Instagram DMs will show up here."
                  />
                )
              ) : (
                <ScrollArea className="h-full">
                  <ul className="p-1.5">
                    {filtered.map((c) => (
                      <li key={c.id}>
                        <ConversationRow
                          conv={c}
                          selected={selectedId === c.id}
                          onClick={() => handleSelect(c.id)}
                        />
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thread */}
      <AnimatePresence mode="wait">
        {showDetail && (
          <motion.div
            key="thread"
            initial={isMobileView ? { x: 60, opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex min-w-0"
          >
            <div className="flex-1 flex flex-col min-w-0">
              {status === 'loading' && !selected ? (
                <ThreadLoading />
              ) : status === 'error' ? (
                <ThreadError onRetry={() => setStatus('ready')} />
              ) : !selected ? (
                <ThreadEmpty />
              ) : (
                <>
                  {/* Header */}
                  <div className="h-16 px-3 md:px-4 border-b border-border/60 flex items-center justify-between gap-2 bg-card">
                    <div className="flex items-center gap-3 min-w-0">
                      {isMobileView && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-11 w-11 -ml-2"
                          onClick={clearSelection}
                          aria-label="Back"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </Button>
                      )}
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-[12px]">
                          {selected.sender_name?.charAt(0) || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[13.5px] font-semibold text-foreground truncate">
                            {selected.sender_name}
                          </p>
                          <StatusPill resolved={selected.is_resolved} />
                        </div>
                        <p className="text-[11.5px] text-muted-foreground truncate flex items-center gap-1.5">
                          <Instagram className="w-3 h-3" strokeWidth={1.75} />
                          {selected.handle || 'instagram'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant={selected.is_resolved ? 'outline' : 'outline'}
                        size="sm"
                        className="h-8 text-[12px] gap-1.5 hidden sm:inline-flex"
                        onClick={toggleResolved}
                      >
                        {selected.is_resolved ? (
                          <>
                            <RotateCcw className="w-3.5 h-3.5" /> Reopen
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" /> Resolve
                          </>
                        )}
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-[12px] gap-1.5 hidden sm:inline-flex"
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                            {selected.assignee === 'me' ? 'You' : 'Unassigned'}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel className="text-[11px]">Assign to</DropdownMenuLabel>
                          <DropdownMenuItem onSelect={() => setAssignee('me')}>Me</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => setAssignee('unassigned')}>
                            Unassigned
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={openInfo}
                        aria-label="Details"
                      >
                        <Info className="w-4 h-4" />
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="More">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onSelect={toggleResolved} className="sm:hidden">
                            {selected.is_resolved ? 'Reopen' : 'Resolve'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={markUnread}>
                            <MailOpen className="w-3.5 h-3.5 mr-2" /> Mark unread
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel className="text-[11px] sm:hidden">Assign</DropdownMenuLabel>
                          <DropdownMenuItem
                            onSelect={() => setAssignee('me')}
                            className="sm:hidden"
                          >
                            Me
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => setAssignee('unassigned')}
                            className="sm:hidden"
                          >
                            Unassigned
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Banners */}
                  {!channelConnected && (
                    <div className="px-4 py-2.5 bg-destructive/5 border-b border-destructive/20 flex items-center gap-2 text-[12.5px] text-destructive">
                      <WifiOff className="w-4 h-4" />
                      Instagram channel disconnected. Reconnect to send replies.
                    </div>
                  )}
                  {selected.is_resolved && (
                    <div className="px-4 py-2.5 bg-muted border-b border-border/60 flex items-center justify-between text-[12.5px] text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-success" /> Marked resolved
                      </span>
                      <button
                        onClick={toggleResolved}
                        className="text-[12px] font-medium text-foreground hover:underline"
                      >
                        Reopen
                      </button>
                    </div>
                  )}

                  {/* Messages */}
                  <ScrollArea className="flex-1 bg-muted/30">
                    <div className="p-4 space-y-4 max-w-3xl mx-auto">
                      {selectedMessages.length === 0 ? (
                        <div className="text-center py-16 text-[12.5px] text-muted-foreground">
                          No messages yet.
                        </div>
                      ) : (
                        renderMessagesWithSeparators(selectedMessages, retrySend)
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Composer */}
                  <div className="p-3 md:p-4 border-t border-border/60 bg-card sticky bottom-0">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                      }}
                      className="flex items-end gap-2 max-w-3xl mx-auto"
                    >
                      <textarea
                        ref={textareaRef}
                        rows={1}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={onComposerKey}
                        disabled={composerDisabled}
                        placeholder={
                          !channelConnected
                            ? 'Channel disconnected'
                            : selected.is_resolved
                            ? 'Conversation resolved — reopen to reply'
                            : 'Type a message… (⌘/Ctrl+Enter to send)'
                        }
                        className={cn(
                          'flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-[13.5px] leading-relaxed',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-card',
                          'disabled:opacity-60 disabled:cursor-not-allowed',
                          'min-h-[40px] max-h-40 scrollbar-thin',
                        )}
                      />
                      <Button
                        type="submit"
                        disabled={composerDisabled || !newMessage.trim()}
                        className="h-10 press-scale"
                        aria-label="Send"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </div>

            {/* Desktop Info Panel (shell) */}
            {showInfoDesktop && (
              <aside className="hidden md:flex w-72 lg:w-80 border-l border-border/60 bg-card flex-col">
                <InfoPanel conv={selected!} onClose={() => setInfoOpen(false)} />
              </aside>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Info Sheet */}
      <Sheet open={mobileInfoOpen} onOpenChange={setMobileInfoOpen}>
        <SheetContent side="right" className="p-0 w-full sm:max-w-sm">
          <SheetHeader className="px-4 py-3 border-b border-border/60">
            <SheetTitle className="text-[14px]">Details</SheetTitle>
          </SheetHeader>
          {selected && <InfoPanel conv={selected} onClose={() => setMobileInfoOpen(false)} embedded />}
        </SheetContent>
      </Sheet>
    </div>
  );
}

/* ---------- Sub-components ---------- */

function FilterChip({
  label,
  active,
  children,
}: {
  label: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'h-7 px-2.5 rounded-full text-[11.5px] font-medium border transition-colors focus-ring',
            active
              ? 'bg-foreground text-background border-foreground'
              : 'bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/40',
          )}
        >
          {label}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}

function ToggleChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-7 px-2.5 rounded-full text-[11.5px] font-medium border transition-colors focus-ring',
        active
          ? 'bg-foreground text-background border-foreground'
          : 'bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/40',
      )}
    >
      {children}
    </button>
  );
}

function StatusPill({ resolved }: { resolved: boolean }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'h-5 px-1.5 text-[10px] font-medium rounded-full',
        resolved
          ? 'bg-success/10 text-success border-success/20'
          : 'bg-muted text-muted-foreground border-border',
      )}
    >
      {resolved ? 'Resolved' : 'Open'}
    </Badge>
  );
}

function ConversationRow({
  conv,
  selected,
  onClick,
}: {
  conv: MockConversation;
  selected: boolean;
  onClick: () => void;
}) {
  const unread = (conv.unread_count || 0) > 0;
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative w-full text-left flex items-start gap-3 rounded-lg px-3 py-3 min-h-[64px] transition-colors focus-ring',
        selected ? 'bg-muted' : 'hover:bg-muted/60',
      )}
    >
      {selected && (
        <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r bg-foreground" />
      )}
      <div className="relative flex-shrink-0">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-secondary text-secondary-foreground text-[12.5px] font-medium">
            {conv.sender_name?.charAt(0) || '?'}
          </AvatarFallback>
        </Avatar>
        <span
          className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-card border border-border flex items-center justify-center"
          title="Instagram"
        >
          <Instagram className="w-2.5 h-2.5 text-muted-foreground" strokeWidth={2} />
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              'text-[13px] truncate',
              unread ? 'font-semibold text-foreground' : 'font-medium text-foreground/90',
            )}
          >
            {conv.sender_name}
          </span>
          <span className="text-[10.5px] text-muted-foreground flex-shrink-0 tabular-nums">
            {formatDistanceToNow(new Date(conv.last_interaction_at), { addSuffix: false })}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p
            className={cn(
              'text-[12.5px] truncate pr-2',
              unread ? 'text-foreground/80' : 'text-muted-foreground',
            )}
          >
            {conv.last_message}
          </p>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {conv.ai_status === 'failed' && (
              <Badge
                variant="outline"
                className="h-4 px-1 text-[9.5px] rounded-full bg-destructive/10 text-destructive border-destructive/20"
              >
                AI failed
              </Badge>
            )}
            {conv.is_resolved ? (
              <Badge
                variant="outline"
                className="h-4 px-1 text-[9.5px] rounded-full bg-success/10 text-success border-success/20"
              >
                Resolved
              </Badge>
            ) : null}
            {unread && (
              <span className="min-w-4 h-4 px-1 rounded-full bg-foreground text-background text-[10px] font-semibold tabular-nums inline-flex items-center justify-center">
                {conv.unread_count}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

function renderMessagesWithSeparators(msgs: UiMessage[], retry: (id: string) => void) {
  const out: React.ReactNode[] = [];
  let lastDayKey = '';
  msgs.forEach((m) => {
    const d = new Date(m.timestamp);
    const key = format(d, 'yyyy-MM-dd');
    if (key !== lastDayKey) {
      lastDayKey = key;
      const label = isToday(d)
        ? 'Today'
        : isYesterday(d)
        ? 'Yesterday'
        : format(d, 'EEE, MMM d');
      out.push(
        <div key={`sep-${key}`} className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-border/60" />
          <span className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
          <div className="flex-1 h-px bg-border/60" />
        </div>,
      );
    }
    out.push(<MessageBubble key={m.id} message={m} onRetry={retry} />);
  });
  return out;
}

function MessageBubble({ message, onRetry }: { message: UiMessage; onRetry: (id: string) => void }) {
  const isOutgoing = message.role === 'assistant';
  const failed = message.status === 'failed';
  const sending = message.status === 'sending';
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={cn('flex gap-2', isOutgoing ? 'justify-end' : 'justify-start')}
    >
      {!isOutgoing && (
        <Avatar className="h-7 w-7 flex-shrink-0 mt-1">
          <AvatarFallback className="bg-secondary text-secondary-foreground text-[10px]">
            <User className="w-3.5 h-3.5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div className={cn('space-y-1 max-w-[80%]', isOutgoing && 'items-end flex flex-col')}>
        <div
          className={cn(
            'px-3.5 py-2 rounded-2xl text-[13.5px] leading-relaxed',
            isOutgoing
              ? cn(
                  'bg-primary text-primary-foreground rounded-br-md',
                  failed && 'border border-destructive/60',
                  sending && 'opacity-70',
                )
              : 'bg-card border border-border text-foreground rounded-bl-md',
          )}
        >
          {message.content}
        </div>
        <div
          className={cn(
            'flex items-center gap-1.5 text-[10.5px] text-muted-foreground',
            isOutgoing ? 'justify-end' : 'justify-start',
          )}
        >
          <span className="uppercase tracking-wider font-medium">
            {isOutgoing ? 'Agent' : 'User'}
          </span>
          <span>·</span>
          <span className="tabular-nums">{format(new Date(message.timestamp), 'HH:mm')}</span>
          {sending && <span className="text-muted-foreground">· Sending…</span>}
          {failed && (
            <>
              <span className="text-destructive">· Failed</span>
              <button
                onClick={() => onRetry(message.id)}
                className="text-destructive font-medium hover:underline"
              >
                Retry
              </button>
            </>
          )}
        </div>
      </div>
      {isOutgoing && (
        <Avatar className="h-7 w-7 flex-shrink-0 mt-1">
          <AvatarFallback className="bg-foreground text-background text-[10px]">
            <Bot className="w-3.5 h-3.5" />
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
}

function InfoPanel({
  conv,
  onClose,
  embedded,
}: {
  conv: MockConversation;
  onClose: () => void;
  embedded?: boolean;
}) {
  const first = conv.messages?.[0];
  const waiting = differenceInMinutes(new Date(), new Date(conv.last_interaction_at));
  return (
    <div className="flex-1 overflow-y-auto">
      {!embedded && (
        <div className="h-16 px-4 border-b border-border/60 flex items-center justify-between">
          <p className="text-[13px] font-semibold">Details</p>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      <div className="p-4 space-y-5 text-[12.5px]">
        <section className="space-y-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-secondary text-secondary-foreground text-[13px]">
                {conv.sender_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-[13px] font-semibold">{conv.sender_name}</p>
              <p className="text-[11.5px] text-muted-foreground">{conv.handle}</p>
            </div>
          </div>
        </section>

        <section>
          <p className="text-[10.5px] uppercase tracking-wider text-muted-foreground mb-2">
            Conversation
          </p>
          <dl className="space-y-1.5">
            <Row k="Channel" v="Instagram" />
            <Row k="Status" v={conv.is_resolved ? 'Resolved' : 'Open'} />
            <Row k="Assignee" v={conv.assignee === 'me' ? 'You' : 'Unassigned'} />
            <Row k="AI" v={conv.ai_status.replace('_', ' ')} />
            <Row k="Messages" v={String(conv.message_count)} />
            <Row k="Last activity" v={`${waiting}m ago`} />
            {first && <Row k="First seen" v={format(new Date(first.timestamp), 'MMM d, yyyy')} />}
          </dl>
        </section>

        <section>
          <p className="text-[10.5px] uppercase tracking-wider text-muted-foreground mb-2">
            Linked products
          </p>
          <div className="rounded-lg border border-dashed border-border/60 p-3 text-[11.5px] text-muted-foreground flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> No products linked yet
          </div>
        </section>

        <section>
          <p className="text-[10.5px] uppercase tracking-wider text-muted-foreground mb-2">
            Notes
          </p>
          <div className="rounded-lg border border-dashed border-border/60 p-3 text-[11.5px] text-muted-foreground">
            Internal notes coming soon.
          </div>
        </section>

        <section>
          <p className="text-[10.5px] uppercase tracking-wider text-muted-foreground mb-2">
            Timeline
          </p>
          <div className="rounded-lg border border-dashed border-border/60 p-3 text-[11.5px] text-muted-foreground">
            Event timeline coming soon.
          </div>
        </section>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-foreground font-medium capitalize">{v}</dd>
    </div>
  );
}

function ThreadEmpty() {
  return (
    <div className="flex-1 flex items-center justify-center bg-muted/20">
      <div className="text-center max-w-xs px-6">
        <div className="w-12 h-12 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
          <Inbox className="w-5 h-5 text-muted-foreground" strokeWidth={1.75} />
        </div>
        <p className="text-[14px] font-semibold text-foreground">Select a conversation</p>
        <p className="text-[12.5px] text-muted-foreground mt-1">
          Choose a conversation from the list to view its messages.
        </p>
      </div>
    </div>
  );
}

function ThreadLoading() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
    </div>
  );
}

function ThreadError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center max-w-xs px-6">
        <div className="w-10 h-10 rounded-xl bg-destructive/10 mx-auto mb-3 flex items-center justify-center">
          <AlertCircle className="w-4 h-4 text-destructive" />
        </div>
        <p className="text-[13px] font-medium text-foreground">Couldn't load conversation</p>
        <Button variant="outline" size="sm" className="mt-3 gap-1.5 h-8" onClick={onRetry}>
          <RefreshCw className="w-3.5 h-3.5" /> Retry
        </Button>
      </div>
    </div>
  );
}

function RailEmpty({
  icon,
  title,
  subtitle,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="h-full flex items-center justify-center px-6">
      <div className="text-center">
        <div className="w-10 h-10 rounded-xl bg-muted mx-auto mb-3 flex items-center justify-center text-muted-foreground">
          {icon}
        </div>
        <p className="text-[13px] font-semibold text-foreground">{title}</p>
        <p className="text-[12px] text-muted-foreground mt-1 max-w-[220px]">{subtitle}</p>
        {action && <div className="mt-3">{action}</div>}
      </div>
    </div>
  );
}

function RailError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="h-full flex items-center justify-center px-6">
      <div className="text-center">
        <div className="w-10 h-10 rounded-xl bg-destructive/10 mx-auto mb-3 flex items-center justify-center">
          <AlertCircle className="w-4 h-4 text-destructive" />
        </div>
        <p className="text-[13px] font-medium text-foreground">Couldn't load conversations</p>
        <Button variant="outline" size="sm" className="mt-3 gap-1.5 h-8" onClick={onRetry}>
          <RefreshCw className="w-3.5 h-3.5" /> Retry
        </Button>
      </div>
    </div>
  );
}
