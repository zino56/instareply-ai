import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, MessageSquare, Clock, TrendingUp, Calendar, ArrowUp, ArrowDown, Loader2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from 'recharts';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Analytics() {
  const [dateRange, setDateRange] = useState('30');
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await api.getConversations();
        setConversations(Array.isArray(data) ? data : data?.data || []);
      } catch { /* empty */ }
      setLoading(false);
    };
    load();
  }, []);

  const totalMessages = conversations.reduce((s, c) => s + (c.message_count || 0), 0);
  const activeConvs = conversations.filter((c: any) => !c.is_resolved).length;

  // Generate simple chart data from conversations
  const data = Array.from({ length: Number(dateRange) }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (Number(dateRange) - 1 - i));
    return { date: date.toISOString().split('T')[0], messages: 0, response_time: 0 };
  });

  const statCards = [
    { label: 'Total Messages', value: totalMessages.toLocaleString(), icon: MessageSquare, change: '-', changeType: 'positive' as const, color: 'text-primary', bgColor: 'bg-primary/10' },
    { label: 'Active Conversations', value: activeConvs.toString(), icon: Clock, change: '-', changeType: 'positive' as const, color: 'text-success', bgColor: 'bg-success/10' },
    { label: 'Total Conversations', value: conversations.length.toString(), icon: TrendingUp, change: '-', changeType: 'positive' as const, color: 'text-info', bgColor: 'bg-info/10' },
  ];

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="container py-8 max-w-7xl">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground mt-1">Track your automation performance</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[160px]"><Calendar className="w-4 h-4 mr-2" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export</Button>
          </div>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.label} className="hover-scale">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={cn('p-2.5 rounded-lg', stat.bgColor)}><stat.icon className={cn('w-5 h-5', stat.color)} /></div>
                </div>
                <div className="mt-4">
                  <p className="stat-value">{stat.value}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div variants={item}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5" />Messages Per Day</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs><linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(48 96% 53%)" stopOpacity={0.3} /><stop offset="95%" stopColor="hsl(48 96% 53%)" stopOpacity={0} /></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => new Date(v).getDate().toString()} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="messages" stroke="hsl(48 96% 53%)" strokeWidth={2} fill="url(#colorMessages)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5" />Average Response Time (seconds)</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => new Date(v).getDate().toString()} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                      <Line type="monotone" dataKey="response_time" stroke="hsl(142 76% 36%)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
