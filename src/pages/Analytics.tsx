import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  MessageSquare,
  Clock,
  TrendingUp,
  Calendar,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { mockAnalyticsData, mockAnalyticsSummary } from '@/data/mockData';
import { cn } from '@/lib/utils';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Analytics() {
  const [dateRange, setDateRange] = useState('30');
  const data = mockAnalyticsData;
  const summary = mockAnalyticsSummary;

  const statCards = [
    {
      label: 'Total Messages',
      value: summary.total_messages.toLocaleString(),
      icon: MessageSquare,
      change: '+15.2%',
      changeType: 'positive',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Avg Response Time',
      value: summary.avg_response_time,
      icon: Clock,
      change: '-12%',
      changeType: 'positive',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Resolution Rate',
      value: `${summary.resolution_rate}%`,
      icon: TrendingUp,
      change: '+3.1%',
      changeType: 'positive',
      color: 'text-info',
      bgColor: 'bg-info/10',
    },
    {
      label: 'Customer Satisfaction',
      value: `${summary.customer_satisfaction}/5`,
      icon: BarChart3,
      change: '+0.2',
      changeType: 'positive',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <div className="container py-8 max-w-7xl">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Track your automation performance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[160px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export</Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.label} className="hover-scale">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={cn('p-2.5 rounded-lg', stat.bgColor)}>
                    <stat.icon className={cn('w-5 h-5', stat.color)} />
                  </div>
                  <span
                    className={cn(
                      'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
                      stat.changeType === 'positive'
                        ? 'text-success bg-success/10'
                        : 'text-destructive bg-destructive/10'
                    )}
                  >
                    {stat.changeType === 'positive' ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="stat-value">{stat.value}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Messages Chart */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Messages Per Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(48 96% 53%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(48 96% 53%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="date"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return date.getDate().toString();
                        }}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        labelFormatter={(value) => {
                          const date = new Date(value);
                          return date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          });
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="messages"
                        stroke="hsl(48 96% 53%)"
                        strokeWidth={2}
                        fill="url(#colorMessages)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Response Time Chart */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Average Response Time (seconds)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="date"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return date.getDate().toString();
                        }}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        labelFormatter={(value) => {
                          const date = new Date(value);
                          return date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          });
                        }}
                        formatter={(value: number) => [`${value}s`, 'Response Time']}
                      />
                      <Line
                        type="monotone"
                        dataKey="response_time"
                        stroke="hsl(142 76% 36%)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Performance Summary */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <p className="text-4xl font-bold text-primary mb-2">98.5%</p>
                  <p className="text-sm text-muted-foreground">Response Rate</p>
                  <p className="text-xs text-success mt-1">↑ 2.1% from last month</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <p className="text-4xl font-bold text-primary mb-2">23s</p>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-xs text-success mt-1">↓ 5s from last month</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <p className="text-4xl font-bold text-primary mb-2">94.2%</p>
                  <p className="text-sm text-muted-foreground">Resolution Rate</p>
                  <p className="text-xs text-success mt-1">↑ 3.1% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
