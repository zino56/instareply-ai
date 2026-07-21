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
    <div className="container py-8 md:py-10 max-w-7xl">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 md:space-y-8">
        {/* Welcome Header */}
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] leading-tight">
              Hi, {clientStatus?.name || 'there'} 👋
            </h1>
            <p className="text-muted-foreground mt-1.5 text-[15px]">
              Here's what's happening with your Instagram automation
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 border-border/80 hover:border-border" asChild><Link to="/settings"><Settings className="w-4 h-4" strokeWidth={1.75} />Settings</Link></Button>
            <Button className="gap-2" asChild><Link to="/conversations"><MessageSquare className="w-4 h-4" strokeWidth={1.75} />View Messages</Link></Button>
          </div>
        </motion.div>

        {/* Instagram Connection Status */}
        <motion.div variants={item}>
          <Card className={cn('rounded-2xl border shadow-[var(--shadow-sm)] transition-all', isConnected ? 'border-success/20 bg-success/[0.04]' : 'border-warning/25 bg-warning/[0.04]')}>
            <CardContent className="p-5 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center shrink-0', isConnected ? 'bg-success/15' : 'bg-warning/15')}>
                    <Instagram className={cn('w-6 h-6', isConnected ? 'text-success' : 'text-warning')} strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-[17px] leading-tight">{isConnected ? clientStatus?.instagram_page_name : 'No Page Connected'}</h3>
                      {isConnected ? (
                        <Badge variant="secondary" className="bg-success/10 text-success border-0 font-medium"><CheckCircle2 className="w-3 h-3 mr-1" />Connected</Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-warning/10 text-warning border-0 font-medium"><AlertCircle className="w-3 h-3 mr-1" />Disconnected</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isConnected ? 'AI is actively replying to your Instagram DMs' : 'Connect your Instagram page to start automating DMs'}
                    </p>
                  </div>
                </div>
                <Button variant={isConnected ? 'outline' : 'default'} asChild>
                  <Link to="/settings?tab=instagram">{isConnected ? 'Change Page' : 'Connect Page'}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {statCards.map((stat) => (
            <Card key={stat.label} className="rounded-2xl border border-border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={cn('p-3 rounded-xl', stat.bgColor)}>
                    <stat.icon className={cn('w-5 h-5', stat.color)} strokeWidth={1.75} />
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-[32px] font-bold text-foreground tabular-nums tracking-[-0.02em] leading-none">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-medium mt-2">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Quick Actions & Recent Conversations */}
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div variants={item}>
            <Card className="h-full rounded-2xl border border-border shadow-[var(--shadow-sm)]">
              <CardHeader className="pb-4"><CardTitle className="text-[15px] font-semibold">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2.5">
                <Button variant="outline" className="w-full justify-start h-11 group hover:bg-muted/60" asChild><Link to="/conversations"><MessageSquare className="w-4 h-4 mr-3" strokeWidth={1.75} />View All Conversations<ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.75} /></Link></Button>
                <Button variant="outline" className="w-full justify-start h-11 group hover:bg-muted/60" asChild><Link to="/products"><Package className="w-4 h-4 mr-3" strokeWidth={1.75} />Manage Products<ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.75} /></Link></Button>
                <Button variant="outline" className="w-full justify-start h-11 group hover:bg-muted/60" asChild><Link to="/settings"><Settings className="w-4 h-4 mr-3" strokeWidth={1.75} />Settings<ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.75} /></Link></Button>
                <Button variant="outline" className="w-full justify-start h-11 group hover:bg-muted/60" asChild><Link to="/analytics"><BarChart3 className="w-4 h-4 mr-3" strokeWidth={1.75} />View Analytics<ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.75} /></Link></Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} className="lg:col-span-2">
            <Card className="h-full rounded-2xl border border-border shadow-[var(--shadow-sm)]">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-[15px] font-semibold">Recent Conversations</CardTitle>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -mr-2" asChild><Link to="/conversations">View All<ArrowRight className="w-4 h-4 ml-1" strokeWidth={1.75} /></Link></Button>
              </CardHeader>
              <CardContent>
                {recentConversations.length === 0 ? (
                  <p className="text-muted-foreground text-center py-10 text-sm">No conversations yet. Connect your Instagram to get started!</p>
                ) : (
                  <div className="space-y-0.5">
                    {recentConversations.map((conversation) => (
                      <Link key={conversation.id} to={`/conversations?id=${conversation.id}`} className="flex items-center gap-4 px-3 py-3.5 rounded-xl hover:bg-muted/60 transition-colors group">
                        <Avatar className="h-10 w-10 ring-1 ring-border">
                          <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-medium">{conversation.sender_name?.charAt(0) || '?'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-medium text-sm truncate">{conversation.sender_name}</p>
                            {conversation.last_interaction_at && (
                              <span className="text-[11px] text-muted-foreground tabular-nums shrink-0">{formatDistanceToNow(new Date(conversation.last_interaction_at), { addSuffix: true })}</span>
                            )}
                          </div>
                          <p className="text-[13px] text-muted-foreground truncate mt-0.5">{conversation.last_message}</p>
                        </div>
                        {(conversation.unread_count || 0) > 0 && <Badge className="bg-primary text-primary-foreground min-w-[22px] h-[22px] px-1.5 flex items-center justify-center text-[11px] font-semibold rounded-full">{conversation.unread_count}</Badge>}
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
