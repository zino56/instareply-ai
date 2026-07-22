import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  TrendingUp,
  Package,
  Instagram,
  ArrowRight,
  Settings,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bot,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import type { Conversation, DashboardStats } from '@/types';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const { clientStatus, fetchClientStatus } = useAuthStore();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        await fetchClientStatus();
        const convData = await api.getConversations();
        setConversations(Array.isArray(convData) ? convData : convData?.data || []);
      } catch {
        // fail silently, show empty state
      }
      setLoading(false);
    };
    load();
  }, [fetchClientStatus]);

  const isConnected = Boolean(clientStatus?.instagram_page_id);
  const recentConversations = conversations.slice(0, 5);

  const stats: DashboardStats = {
    total_messages_this_month: conversations.reduce((s, c) => s + (c.message_count || 0), 0),
    response_rate: 0,
    active_conversations: conversations.filter((c) => !c.is_resolved).length,
    total_products: 0,
    avg_response_time: '-',
  };

  const statCards = [
    { label: 'Messages This Month', value: stats.total_messages_this_month.toLocaleString(), icon: MessageSquare, trend: null, color: 'text-primary', bgColor: 'bg-primary/10' },
    { label: 'Active Conversations', value: stats.active_conversations.toString(), icon: Clock, trend: null, color: 'text-info', bgColor: 'bg-info/10' },
  ];

  if (loading) {
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
            <h1 className="text-[24px] md:text-[28px] font-semibold tracking-[-0.02em] leading-tight text-foreground">
              Hi, {clientStatus?.name || 'there'} 👋
            </h1>
            <p className="text-muted-foreground mt-1.5 text-[14px]">
              Here's what's happening with your Instagram automation today.
            </p>
          </div>
          <div className="flex gap-2.5">
            <Button variant="outline" size="sm" className="gap-2 h-9" asChild><Link to="/settings"><Settings className="w-4 h-4" strokeWidth={1.75} />Settings</Link></Button>
            <Button size="sm" className="gap-2 h-9" asChild><Link to="/conversations"><MessageSquare className="w-4 h-4" strokeWidth={1.75} />View Messages</Link></Button>
          </div>
        </motion.div>

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
                      <h3 className="font-semibold text-[15px] leading-tight text-foreground">{isConnected ? clientStatus?.instagram_page_name : 'No Page Connected'}</h3>
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
                <Button variant={isConnected ? 'outline' : 'default'} size="sm" className="h-9" asChild>
                  <Link to="/settings?tab=instagram">{isConnected ? 'Change Page' : 'Connect Page'}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Overview Section */}
        <motion.div variants={item} className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Overview</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {statCards.map((stat) => (
              <Card key={stat.label} className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-border transition-all duration-300 bg-card">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <p className="text-[13px] text-muted-foreground font-medium">{stat.label}</p>
                    <div className={cn('p-2 rounded-lg', stat.bgColor)}>
                      <stat.icon className={cn('w-4 h-4', stat.color)} strokeWidth={1.75} />
                    </div>
                  </div>
                  <p className="mt-4 text-[28px] font-semibold text-foreground tabular-nums tracking-[-0.02em] leading-none">{stat.value}</p>
                  <p className="mt-2 text-[12px] text-muted-foreground">Updated just now</p>
                </CardContent>
              </Card>
            ))}
            <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-muted/30 sm:col-span-2 xl:col-span-2">
              <CardContent className="p-5 flex items-start gap-3 h-full">
                <div className="p-2 rounded-lg bg-background border border-border/60 shrink-0">
                  <Bot className="w-4 h-4 text-muted-foreground" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium text-foreground">More insights</p>
                    <Badge variant="secondary" className="h-5 bg-background text-muted-foreground border border-border/60 font-medium text-[10px] uppercase tracking-wider">Soon</Badge>
                  </div>
                  <p className="mt-1 text-[12.5px] text-muted-foreground leading-relaxed">Response rate, resolution time, and AI accuracy will appear here as your conversation history grows.</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </motion.div>

        {/* Activity Section */}
        <motion.div variants={item} className="space-y-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Activity</h2>
          <div className="grid lg:grid-cols-3 gap-5">
            <Card className="h-full rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card">
              <CardHeader className="pb-3"><CardTitle className="text-[14px] font-semibold text-foreground">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start h-10 group text-[13px] font-medium bg-transparent hover:bg-muted/60" asChild><Link to="/conversations"><MessageSquare className="w-4 h-4 mr-3 text-muted-foreground" strokeWidth={1.75} />View All Conversations<ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.75} /></Link></Button>
                <Button variant="outline" className="w-full justify-start h-10 group text-[13px] font-medium bg-transparent hover:bg-muted/60" asChild><Link to="/products"><Package className="w-4 h-4 mr-3 text-muted-foreground" strokeWidth={1.75} />Manage Products<ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.75} /></Link></Button>
                <Button variant="outline" className="w-full justify-start h-10 group text-[13px] font-medium bg-transparent hover:bg-muted/60" asChild><Link to="/settings"><Settings className="w-4 h-4 mr-3 text-muted-foreground" strokeWidth={1.75} />Settings<ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.75} /></Link></Button>
                <Button variant="outline" className="w-full justify-start h-10 group text-[13px] font-medium bg-transparent hover:bg-muted/60" asChild><Link to="/analytics"><BarChart3 className="w-4 h-4 mr-3 text-muted-foreground" strokeWidth={1.75} />View Analytics<ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.75} /></Link></Button>
              </CardContent>
            </Card>

            <Card className="h-full lg:col-span-2 rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-[14px] font-semibold text-foreground">Recent Conversations</CardTitle>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -mr-2 h-8 text-[13px]" asChild><Link to="/conversations">View All<ArrowRight className="w-4 h-4 ml-1" strokeWidth={1.75} /></Link></Button>
              </CardHeader>
              <CardContent className="pt-0">
                {recentConversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-3">
                      <MessageSquare className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                    </div>
                    <p className="text-foreground text-[14px] font-medium">No conversations yet</p>
                    <p className="text-muted-foreground text-[13px] mt-1 max-w-[260px]">Connect your Instagram page to start receiving and automating DMs.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border/60 -mx-2">
                    {recentConversations.map((conversation) => (
                      <Link key={conversation.id} to={`/conversations?id=${conversation.id}`} className="flex items-center gap-4 px-2 py-3 rounded-lg hover:bg-muted/50 transition-colors group focus-ring">
                        <Avatar className="h-9 w-9 ring-1 ring-border">
                          <AvatarFallback className="bg-secondary text-secondary-foreground text-[13px] font-medium">{conversation.sender_name?.charAt(0) || '?'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-medium text-[13px] truncate text-foreground">{conversation.sender_name}</p>
                            {conversation.last_interaction_at && (
                              <span className="text-[11px] text-muted-foreground tabular-nums shrink-0">{formatDistanceToNow(new Date(conversation.last_interaction_at), { addSuffix: true })}</span>
                            )}
                          </div>
                          <p className="text-[12.5px] text-muted-foreground line-clamp-1 mt-0.5">{conversation.last_message}</p>
                        </div>
                        {(conversation.unread_count || 0) > 0 && <Badge className="bg-primary text-primary-foreground min-w-[20px] h-5 px-1.5 flex items-center justify-center text-[11px] font-semibold rounded-full">{conversation.unread_count}</Badge>}
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
