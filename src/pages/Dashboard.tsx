import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Instagram,
  MessageCircle,
  ArrowRight,
  Settings,
  BarChart3,
  Package,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Inbox,
  UserCheck,
  Clock3,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import type { Conversation } from '@/types';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
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
        // fail silently
      }
      setLoading(false);
    };
    load();
  }, [fetchClientStatus]);

  const isConnected = Boolean(clientStatus?.instagram_page_id);
  const recentConversations = conversations.slice(0, 6);

  // Pipeline pulse — derive from current data without inventing metrics
  const unread = conversations.filter((c) => (c.unread_count || 0) > 0).length;
  const active = conversations.filter((c) => !c.is_resolved).length;
  const awaitingFollowup = Math.max(active - unread, 0);
  const handedOff = conversations.filter((c) => c.is_resolved).length;

  const pipeline = [
    { key: 'unread', label: 'Unread', value: unread, icon: Inbox },
    { key: 'qualifying', label: 'Qualifying', value: active, icon: UserCheck },
    { key: 'followup', label: 'Awaiting follow-up', value: awaitingFollowup, icon: Clock3 },
    { key: 'handed', label: 'Handed off', value: handedOff, icon: Send },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="section-container py-10 max-w-[1200px]">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
        {/* Header */}
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2">Command center</div>
            <h1 className="font-display text-4xl md:text-5xl text-foreground leading-[1.05]">
              Hi, {clientStatus?.name?.split(' ')[0] || 'there'}.
            </h1>
            <p className="text-muted-foreground mt-2">
              Here's what's moving through Instagram and WhatsApp today.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild className="h-10 rounded-[10px]">
              <Link to="/settings"><Settings className="w-4 h-4 mr-1.5" />Settings</Link>
            </Button>
            <Button asChild className="h-10 rounded-[10px] bg-foreground text-background hover:bg-accent">
              <Link to="/conversations"><MessageSquare className="w-4 h-4 mr-1.5" />Open inbox</Link>
            </Button>
          </div>
        </motion.div>

        {/* Connection status */}
        <motion.div variants={item}>
          <div className={cn(
            'rounded-xl border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4',
            isConnected ? 'border-border bg-card' : 'border-warning/40 bg-warning/5'
          )}>
            <div className="flex items-center gap-4">
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center',
                isConnected ? 'bg-accent/10 text-accent' : 'bg-warning/20 text-warning'
              )}>
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">{isConnected ? clientStatus?.instagram_page_name : 'No channel connected'}</h3>
                  {isConnected ? (
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-0 gap-1">
                      <CheckCircle2 className="w-3 h-3" />Connected
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-warning/15 text-warning border-0 gap-1">
                      <AlertCircle className="w-3 h-3" />Disconnected
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {isConnected
                    ? 'Conveero is replying, qualifying, and routing on your behalf.'
                    : 'Connect Instagram or WhatsApp to start capturing leads.'}
                </p>
              </div>
            </div>
            <Button variant={isConnected ? 'outline' : 'default'} asChild className="h-10 rounded-[10px]">
              <Link to="/settings?tab=instagram">{isConnected ? 'Manage channels' : 'Connect channel'}</Link>
            </Button>
          </div>
        </motion.div>

        {/* Pipeline strip */}
        <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {pipeline.map((p) => (
            <div key={p.key} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{p.label}</span>
                <p.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="font-display text-4xl text-foreground leading-none">{p.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Recent conversations + quick actions */}
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4">
          <motion.div variants={item}>
            <Card className="rounded-xl border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base font-medium">Recent conversations</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Across Instagram and WhatsApp</p>
                </div>
                <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
                  <Link to="/conversations">View all<ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
                </Button>
              </CardHeader>
              <CardContent className="pt-0">
                {recentConversations.length === 0 ? (
                  <div className="text-sm text-muted-foreground text-center py-12">
                    No conversations yet. Connect a channel to start capturing leads.
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {recentConversations.map((c) => (
                      <Link
                        key={c.id}
                        to={`/conversations?id=${c.id}`}
                        className="flex items-center gap-3 py-3 -mx-2 px-2 rounded-md hover:bg-secondary/50 transition-colors group"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-secondary text-foreground text-xs font-medium">
                            {c.sender_name?.charAt(0) || '?'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{c.sender_name}</p>
                              <MessageCircle className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                            </div>
                            {c.last_interaction_at && (
                              <span className="text-[11px] text-muted-foreground flex-shrink-0">
                                {formatDistanceToNow(new Date(c.last_interaction_at), { addSuffix: true })}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate mt-0.5">{c.last_message}</p>
                        </div>
                        {(c.unread_count || 0) > 0 && (
                          <span className="text-[10px] uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded flex-shrink-0">
                            {c.unread_count} new
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="rounded-xl border-border h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Quick actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { to: '/conversations', label: 'Inbox', icon: MessageSquare },
                  { to: '/products', label: 'Catalog', icon: Package },
                  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
                  { to: '/settings', label: 'Settings', icon: Settings },
                ].map((a) => (
                  <Button
                    key={a.to}
                    variant="outline"
                    asChild
                    className="w-full justify-start h-10 rounded-[10px] border-border font-normal"
                  >
                    <Link to={a.to}>
                      <a.icon className="w-4 h-4 mr-2.5 text-muted-foreground" />
                      {a.label}
                      <ArrowRight className="w-3.5 h-3.5 ml-auto text-muted-foreground" />
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
