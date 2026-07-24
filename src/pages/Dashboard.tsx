import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
  MessageSquare,
  Instagram,
  ArrowRight,
  Settings,
  CheckCircle2,
  AlertCircle,
  Bot,
  Loader2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import type { Conversation } from '@/types';
import { pageContainer as container, pageItem as item } from '@/lib/motion';
import { dashboardMock } from '@/lib/dashboardMock';
import type { AttentionItem } from '@/lib/dashboardMock';
import { SetupAlert } from '@/components/dashboard/SetupAlert';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { NeedsAttentionList } from '@/components/dashboard/NeedsAttentionList';
import { ChannelHealthCard } from '@/components/dashboard/ChannelHealthCard';
import { QuickActionsCard } from '@/components/dashboard/QuickActionsCard';
import { UsagePlanCard } from '@/components/dashboard/UsagePlanCard';
import { FirstRunChecklist } from '@/components/dashboard/FirstRunChecklist';
import { StatePanel } from '@/components/dashboard/StatePanel';

type BlockStatus = 'loading' | 'error' | 'ready';

// Mock fixtures are ONLY allowed in local dev builds. Production ignores them entirely.
const IS_DEV = import.meta.env.DEV;

export default function Dashboard() {
  const { clientStatus, fetchClientStatus } = useAuthStore();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [convStatus, setConvStatus] = useState<BlockStatus>('loading');
  const [searchParams] = useSearchParams();

  // Dev-only visual state override for QA: ?dashState=loading|error|empty
  const stateOverride = IS_DEV ? searchParams.get('dashState') : null;

  const load = async () => {
    setLoading(true);
    setConvStatus('loading');
    try {
      await fetchClientStatus();
      const convData = await api.getConversations();
      setConversations(Array.isArray(convData) ? convData : convData?.data || []);
      setConvStatus('ready');
    } catch {
      setConvStatus('error');
    }
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const isConnected = Boolean(clientStatus?.instagram_page_id);
  const recentConversations = conversations.slice(0, 5);

  // Real setup signals. Product/knowledge counts aren't in clientStatus yet — treat as unknown (false) so users see the step.
  const hasProducts = Boolean(clientStatus?.products_count && clientStatus.products_count > 0);
  const hasKnowledge = Boolean(clientStatus?.knowledge_count && clientStatus.knowledge_count > 0);

  const setupSteps = useMemo(() => ([
    { label: 'Connect Instagram', done: isConnected, href: '/settings?tab=instagram' },
    { label: 'Add AI knowledge', done: hasKnowledge, href: '/ai-knowledge' },
    { label: 'Add products', done: hasProducts, href: '/products' },
  ]), [isConnected, hasKnowledge, hasProducts]);

  const setupDone = setupSteps.filter((s) => s.done).length;
  const firstRun = setupDone === 0 || stateOverride === 'empty';

  // Derive real KPIs from what we actually have.
  const unreadCount = conversations.reduce((n, c: any) => n + (c.unread_count || 0), 0);
  const activeCount = conversations.filter((c: any) => (c.status ? c.status !== 'resolved' : true)).length;

  const kpiStatus: BlockStatus = stateOverride === 'loading' ? 'loading' : stateOverride === 'error' ? 'error' : convStatus;
  const attentionStatus: BlockStatus = kpiStatus;
  const channelStatus: BlockStatus = stateOverride === 'loading' ? 'loading' : stateOverride === 'error' ? 'error' : 'ready';
  const convDisplayStatus: BlockStatus = stateOverride === 'loading' ? 'loading' : stateOverride === 'error' ? 'error' : convStatus;

  // Build real "Needs attention" items from live signals.
  const realAttention: AttentionItem[] = [];
  if (!isConnected) {
    realAttention.push({ id: 'ig', kind: 'disconnected', title: 'Instagram not connected', meta: 'Connect a page to start automating DMs', actionLabel: 'Connect', href: '/settings?tab=instagram' });
  }
  if (unreadCount > 0) {
    realAttention.push({ id: 'unread', kind: 'unread', title: `${unreadCount} unread ${unreadCount === 1 ? 'message' : 'messages'}`, meta: 'Review in the inbox', actionLabel: 'Review', href: '/conversations' });
  }
  if (isConnected && !hasProducts) {
    realAttention.push({ id: 'prod', kind: 'setup', title: 'No products in catalog', meta: 'AI can\u2019t recommend items yet', actionLabel: 'Add', href: '/products' });
  }
  if (isConnected && !hasKnowledge) {
    realAttention.push({ id: 'kb', kind: 'setup', title: 'No AI knowledge uploaded', meta: 'Train the AI on your brand', actionLabel: 'Add', href: '/ai-knowledge' });
  }

  const attentionItems: AttentionItem[] = stateOverride === 'empty'
    ? []
    : IS_DEV && stateOverride
      ? dashboardMock.attention
      : realAttention;

  // Channel derived from real client status.
  const channel = {
    name: 'Instagram' as const,
    status: (isConnected ? 'healthy' : 'disconnected') as 'healthy' | 'disconnected',
    lastSyncAt: null,
    webhook: 'unknown' as const,
  };

  // Usage: no backend endpoint yet — hide unless dev override with mock.
  const usage = IS_DEV && stateOverride ? dashboardMock.usage : null;

  if (loading && !stateOverride) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 md:py-8 max-w-[1400px] mx-auto w-full">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 md:space-y-8">
        {/* Welcome Header */}
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-[22px] md:text-[26px] font-semibold md:tracking-[-0.015em] leading-tight text-foreground">
              Hi, {clientStatus?.name || 'there'} 👋
            </h1>
            <p className="text-muted-foreground mt-1.5 text-[14px]">
              Here's what's happening with your Instagram automation today.
            </p>
          </div>
          <div className="flex gap-2.5">
            <Button variant="outline" size="sm" className="gap-2 h-9 press-scale" asChild><Link to="/settings"><Settings className="w-4 h-4" strokeWidth={1.75} />Settings</Link></Button>
            <Button size="sm" className="gap-2 h-9 press-scale" asChild><Link to="/conversations"><MessageSquare className="w-4 h-4" strokeWidth={1.75} />View messages</Link></Button>
          </div>
        </motion.div>

        {firstRun ? (
          <motion.div variants={item}>
            <FirstRunChecklist
              tasks={[
                { id: '1', label: 'Connect your Instagram page', description: 'Authorize Conveero to read and reply to DMs.', done: isConnected, href: '/settings?tab=instagram', cta: 'Connect' },
                { id: '2', label: 'Train the AI on your brand', description: 'Upload a PDF or paste your knowledge base.', done: dashboardMock.setup.aiKnowledge, href: '/ai-knowledge', cta: 'Add' },
                { id: '3', label: 'Add products to your catalog', description: 'So the AI can recommend the right item.', done: dashboardMock.setup.products, href: '/products', cta: 'Add' },
                { id: '4', label: 'Set your reply preferences', description: 'Tone, hours, and auto-reply behavior.', done: false, href: '/settings', cta: 'Set up' },
              ]}
            />
          </motion.div>
        ) : (
          <motion.div variants={item}>
            <SetupAlert steps={setupSteps} />
          </motion.div>
        )}

        {/* Instagram Connection Status */}
        <motion.div variants={item}>
          <Card className={cn('rounded-2xl border shadow-[var(--shadow-sm)] transition-all bg-card', isConnected ? 'border-success/25' : 'border-warning/30')}>
            <CardContent className="p-5 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', isConnected ? 'bg-success/12' : 'bg-warning/12')}>
                    <Instagram className={cn('w-5 h-5', isConnected ? 'text-success' : 'text-warning')} strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-[15px] leading-tight text-foreground">{isConnected ? clientStatus?.instagram_page_name : 'No page connected'}</h3>
                      {isConnected ? (
                        <Badge variant="secondary" className="bg-success/10 text-success border-0 font-medium h-5"><CheckCircle2 className="w-3 h-3 mr-1" />Connected</Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-warning/10 text-warning border-0 font-medium h-5"><AlertCircle className="w-3 h-3 mr-1" />Disconnected</Badge>
                      )}
                    </div>
                    <p className="text-[13px] text-muted-foreground mt-1">
                      {isConnected ? 'AI is actively replying to your Instagram DMs' : 'Connect your Instagram page to start automating DMs'}
                    </p>
                  </div>
                </div>
                <Button variant={isConnected ? 'outline' : 'default'} size="sm" className="h-9 press-scale" asChild>
                  <Link to="/settings?tab=instagram">{isConnected ? 'Change page' : 'Connect page'}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* KPI Row */}
        <motion.div variants={item} className="space-y-3">
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Overview</h2>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <KpiCard label="Messages (7d)" value={null} icon={MessageSquare} status={kpiStatus} hint="Metric available soon" />
            <KpiCard label="Active conversations" value={convStatus === 'ready' ? activeCount : null} icon={Clock} status={kpiStatus} />
            <KpiCard label="AI reply rate" value={null} icon={Sparkles} format={(n) => `${Math.round(n)}%`} status={kpiStatus} hint="Metric available soon" />
            <KpiCard label="Needs attention" value={attentionItems.length} icon={AlertCircle} status={kpiStatus} emphasize />
          </div>
        </motion.div>

        {/* Row: Needs Attention + Channel Health */}
        <motion.div variants={item} className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <NeedsAttentionList items={attentionItems} status={attentionStatus} onRetry={load} />
          </div>
          <ChannelHealthCard status={channelStatus} channel={channel} onRetry={load} />
        </motion.div>

        {/* Row: Recent Conversations + Quick Actions */}
        <motion.div variants={item} className="grid lg:grid-cols-3 gap-5">
          <Card className="h-full lg:col-span-2 rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-[14px] font-semibold text-foreground">Recent conversations</CardTitle>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -mr-2 h-8 text-[13px]" asChild><Link to="/conversations">View all<ArrowRight className="w-4 h-4 ml-1" strokeWidth={1.75} /></Link></Button>
            </CardHeader>
            <CardContent className="pt-0">
              <StatePanel
                status={convDisplayStatus === 'ready' && recentConversations.length === 0 ? 'empty' : convDisplayStatus}
                onRetry={load}
                skeleton={<>
                  {[0,1,2,3].map(i => (
                    <div key={i} className="flex items-center gap-3 py-3">
                      <Skeleton variant="shimmer" className="w-8 h-8 rounded-full" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton variant="shimmer" className="h-3.5 w-1/3" />
                        <Skeleton variant="shimmer" className="h-3 w-2/3" />
                      </div>
                    </div>
                  ))}
                </>}
                empty={
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-3">
                      <MessageSquare className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                    </div>
                    <p className="text-foreground text-[14px] font-medium">No conversations yet</p>
                    <p className="text-muted-foreground text-[13px] mt-1 max-w-[260px]">Connect your Instagram page to start receiving and automating DMs.</p>
                    <Button size="sm" className="mt-4 h-9 press-scale" asChild><Link to="/settings?tab=instagram">Connect Instagram</Link></Button>
                  </div>
                }
              >
                <div className="divide-y divide-border/60 -mx-2">
                  {recentConversations.map((conversation) => (
                    <Link key={conversation.id} to={`/conversations?id=${conversation.id}`} className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-muted/50 transition-colors group focus-ring">
                      <Avatar className="h-8 w-8 ring-1 ring-border">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-[12px] font-medium">{conversation.sender_name?.charAt(0) || '?'}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-medium text-[13px] truncate text-foreground">{conversation.sender_name}</p>
                          {conversation.last_interaction_at && (
                            <span className="text-[12px] text-muted-foreground tabular-nums shrink-0">{formatDistanceToNow(new Date(conversation.last_interaction_at), { addSuffix: true })}</span>
                          )}
                        </div>
                        <p className="text-[12px] text-muted-foreground line-clamp-1 mt-0.5">{conversation.last_message}</p>
                      </div>
                      {(conversation.unread_count || 0) > 0 && <Badge className="bg-primary text-primary-foreground min-w-[20px] h-5 px-1.5 flex items-center justify-center text-[11px] font-semibold rounded-full">{conversation.unread_count}</Badge>}
                    </Link>
                  ))}
                </div>
              </StatePanel>
            </CardContent>
          </Card>

          <QuickActionsCard />
        </motion.div>

        {/* Row: Usage / Plan + insights placeholder */}
        <motion.div variants={item} className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <UsagePlanCard status={usageStatus} usage={dashboardMock.usage} onRetry={load} />
          </div>
          <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-muted/30 h-full">
            <CardContent className="p-5 flex items-start gap-3 h-full">
              <div className="p-2 rounded-lg bg-background border border-border/60 shrink-0">
                <Bot className="w-4 h-4 text-muted-foreground" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium text-foreground">More insights</p>
                  <Badge variant="secondary" className="h-5 bg-background text-muted-foreground border border-border/60 font-medium text-[10px] uppercase tracking-wider">Soon</Badge>
                </div>
                <p className="mt-1 text-[12.5px] text-muted-foreground leading-relaxed">Resolution time, customer sentiment, and AI accuracy will appear here as your history grows.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
