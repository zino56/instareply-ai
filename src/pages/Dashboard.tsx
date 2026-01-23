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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { mockDashboardStats, mockConversations } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const { user } = useAuthStore();
  const stats = mockDashboardStats;
  const recentConversations = mockConversations.slice(0, 5);
  const isConnected = Boolean(user?.instagram_page_id);

  const statCards = [
    {
      label: 'Messages This Month',
      value: stats.total_messages_this_month.toLocaleString(),
      icon: MessageSquare,
      trend: '+12%',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Response Rate',
      value: `${stats.response_rate}%`,
      icon: TrendingUp,
      trend: '+2.1%',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Active Conversations',
      value: stats.active_conversations.toString(),
      icon: Clock,
      trend: null,
      color: 'text-info',
      bgColor: 'bg-info/10',
    },
    {
      label: 'Avg Response Time',
      value: stats.avg_response_time,
      icon: Bot,
      trend: '-5s',
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
        className="space-y-8"
      >
        {/* Welcome Header */}
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Hi, {user?.name || 'there'} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your Instagram automation
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </Button>
            <Button asChild>
              <Link to="/conversations">
                <MessageSquare className="w-4 h-4 mr-2" />
                View Messages
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Instagram Connection Status */}
        <motion.div variants={item}>
          <Card className={cn(
            'border-2 transition-all',
            isConnected ? 'border-success/30 bg-success/5' : 'border-warning/30 bg-warning/5'
          )}>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center',
                    isConnected ? 'bg-success/20' : 'bg-warning/20'
                  )}>
                    <Instagram className={cn(
                      'w-7 h-7',
                      isConnected ? 'text-success' : 'text-warning'
                    )} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">
                        {isConnected ? user?.instagram_page_name : 'No Page Connected'}
                      </h3>
                      {isConnected ? (
                        <Badge variant="secondary" className="bg-success/20 text-success border-0">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-warning/20 text-warning border-0">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Disconnected
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {isConnected
                        ? 'AI is actively replying to your Instagram DMs'
                        : 'Connect your Instagram page to start automating DMs'}
                    </p>
                  </div>
                </div>
                <Button variant={isConnected ? 'outline' : 'default'} asChild>
                  <Link to="/settings?tab=instagram">
                    {isConnected ? 'Change Page' : 'Connect Page'}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <Card key={stat.label} className="hover-scale">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={cn('p-2.5 rounded-lg', stat.bgColor)}>
                    <stat.icon className={cn('w-5 h-5', stat.color)} />
                  </div>
                  {stat.trend && (
                    <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                      {stat.trend}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <p className="stat-value">{stat.value}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Quick Actions & Recent Conversations */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/conversations">
                    <MessageSquare className="w-4 h-4 mr-3" />
                    View All Conversations
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/products">
                    <Package className="w-4 h-4 mr-3" />
                    Manage Products
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/settings">
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/analytics">
                    <BarChart3 className="w-4 h-4 mr-3" />
                    View Analytics
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Conversations */}
          <motion.div variants={item} className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Recent Conversations</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/conversations">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {recentConversations.map((conversation) => (
                    <Link
                      key={conversation.id}
                      to={`/conversations?id=${conversation.id}`}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-medium">
                          {conversation.sender_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">
                            {conversation.sender_name}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(conversation.last_interaction_at), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.last_message}
                        </p>
                      </div>
                      {conversation.unread_count > 0 && (
                        <Badge className="badge-unread">
                          {conversation.unread_count}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
