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
  Bot,
  Zap,
  Users,
  Sparkles,
  Clock,
  CheckCircle2,
  Send,
  Heart,
  Star,
  Shield,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const
  }
};

export default function Dashboard() {
  const { user } = useAuthStore();
  const stats = mockDashboardStats;
  const recentConversations = mockConversations.slice(0, 4);
  const isConnected = Boolean(user?.instagram_page_id);

  const features = [
    {
      icon: Zap,
      title: "Turn comments into conversations to fuel sales",
      description: "Automatically engage with every comment and convert followers into paying customers with AI-powered responses.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Users,
      title: "Personal connections. Profitable conversations.",
      description: "Build genuine relationships at scale while driving revenue through personalized messaging.",
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      icon: Heart,
      title: "Engage followers instantly with automatic replies",
      description: "Never miss a DM. AI responds instantly 24/7, keeping customers happy and engaged.",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      icon: Globe,
      title: "Expand your reach effortlessly",
      description: "Scale your Instagram presence without hiring a team. AI handles the conversations.",
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  const platforms = [
    { name: "Instagram", icon: Instagram, connected: isConnected },
    { name: "Messenger", icon: Send, connected: false },
    { name: "WhatsApp", icon: MessageSquare, connected: false },
    { name: "Telegram", icon: Send, connected: false },
  ];

  const statCards = [
    {
      label: 'Messages This Month',
      value: stats.total_messages_this_month.toLocaleString(),
      icon: MessageSquare,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Response Rate',
      value: `${stats.response_rate}%`,
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Active Chats',
      value: stats.active_conversations.toString(),
      icon: Users,
      color: 'text-info',
      bgColor: 'bg-info/10',
    },
    {
      label: 'Avg Response',
      value: stats.avg_response_time,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <div className="min-h-screen">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-0"
      >
        {/* Hero Section */}
        <motion.section 
          variants={item}
          className="relative bg-gradient-to-br from-primary via-primary to-yellow-400 py-16 lg:py-24 overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-secondary-foreground rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-foreground rounded-full blur-3xl" />
          </div>

          <div className="container max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className="mb-6 bg-secondary text-secondary-foreground border-0 px-4 py-1.5 text-sm font-semibold">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI-Powered Automation
                  </Badge>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary leading-tight mb-6"
                >
                  Make the <span className="relative inline-block">
                    most
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                      <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-secondary/30"/>
                    </svg>
                  </span> of every conversation
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-secondary/80 mb-8 max-w-xl mx-auto lg:mx-0"
                >
                  Welcome back, <span className="font-bold">{user?.name || 'there'}</span>! Your AI assistant is actively managing your Instagram DMs.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Button 
                    size="lg" 
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold px-8 py-6 text-lg rounded-xl shadow-lg"
                    asChild
                  >
                    <Link to="/conversations">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      View Conversations
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-white/20 border-secondary/30 text-secondary hover:bg-white/30 font-bold px-8 py-6 text-lg rounded-xl"
                    asChild
                  >
                    <Link to="/settings">
                      <Settings className="w-5 h-5 mr-2" />
                      Settings
                    </Link>
                  </Button>
                </motion.div>

                {/* Trust Badges */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-10 flex items-center gap-6 justify-center lg:justify-start"
                >
                  <div className="flex items-center gap-2 text-secondary/70">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm font-medium">Secure</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary/70">
                    <Star className="w-5 h-5" />
                    <span className="text-sm font-medium">4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary/70">
                    <Bot className="w-5 h-5" />
                    <span className="text-sm font-medium">AI Powered</span>
                  </div>
                </motion.div>
              </div>

              {/* Floating Stats Cards */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="hidden lg:block relative"
              >
                <motion.div animate={floatAnimation} className="relative">
                  {/* Main Stats Card */}
                  <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center">
                        <BarChart3 className="w-7 h-7 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">This Month</p>
                        <p className="text-3xl font-bold text-secondary">{stats.total_messages_this_month.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-success/10 rounded-xl p-4">
                        <p className="text-2xl font-bold text-success">{stats.response_rate}%</p>
                        <p className="text-xs text-muted-foreground">Response Rate</p>
                      </div>
                      <div className="bg-info/10 rounded-xl p-4">
                        <p className="text-2xl font-bold text-info">{stats.active_conversations}</p>
                        <p className="text-xs text-muted-foreground">Active Chats</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-success text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    <CheckCircle2 className="w-4 h-4 inline mr-1" />
                    AI Active
                  </div>

                  {/* Mini Card */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 transform -rotate-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-secondary">Avg Response</p>
                        <p className="text-lg font-bold text-primary">{stats.avg_response_time}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Quick Stats - Mobile */}
        <motion.section variants={item} className="lg:hidden bg-background py-6">
          <div className="container max-w-7xl">
            <div className="grid grid-cols-2 gap-3">
              {statCards.map((stat) => (
                <Card key={stat.label} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', stat.bgColor)}>
                      <stat.icon className={cn('w-5 h-5', stat.color)} />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Instagram Connection Banner */}
        <motion.section variants={item} className="bg-background py-8">
          <div className="container max-w-7xl">
            <Card className={cn(
              'border-2 transition-all overflow-hidden',
              isConnected ? 'border-success/30 bg-gradient-to-r from-success/5 to-success/10' : 'border-warning/30 bg-gradient-to-r from-warning/5 to-warning/10'
            )}>
              <CardContent className="p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      'w-16 h-16 rounded-2xl flex items-center justify-center',
                      isConnected ? 'bg-success/20' : 'bg-warning/20'
                    )}>
                      <Instagram className={cn(
                        'w-8 h-8',
                        isConnected ? 'text-success' : 'text-warning'
                      )} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-xl">
                          {isConnected ? user?.instagram_page_name : 'Connect Your Instagram'}
                        </h3>
                        <Badge className={cn(
                          'font-semibold',
                          isConnected ? 'bg-success/20 text-success border-0' : 'bg-warning/20 text-warning border-0'
                        )}>
                          {isConnected ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Connected
                            </>
                          ) : 'Disconnected'}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">
                        {isConnected
                          ? 'AI is actively replying to your Instagram DMs 24/7'
                          : 'Connect your Instagram business page to start automating DMs'}
                      </p>
                    </div>
                  </div>
                  <Button 
                    size="lg"
                    className={cn(
                      'font-bold rounded-xl px-6',
                      isConnected ? 'bg-secondary hover:bg-secondary/90' : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    )}
                    asChild
                  >
                    <Link to="/settings?tab=instagram">
                      {isConnected ? 'Manage Page' : 'Connect Now'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Scale Up Section */}
        <motion.section variants={item} className="bg-muted/30 py-16 lg:py-24">
          <div className="container max-w-7xl">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4"
              >
                Scale up your <span className="text-primary">best</span>
                <br />conversations
              </motion.h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Turn every Instagram interaction into an opportunity with AI-powered automation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-card">
                    <CardContent className="p-8">
                      <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mb-6', feature.bgColor)}>
                        <feature.icon className={cn('w-7 h-7', feature.color)} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Platforms Section */}
        <motion.section variants={item} className="bg-primary py-16 lg:py-24">
          <div className="container max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary mb-4">
                Everywhere your<br />audience is
              </h2>
              <p className="text-lg text-secondary/70">
                Connect with customers on their favorite platforms
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {platforms.map((platform) => (
                <motion.div
                  key={platform.name}
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    'bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all',
                    platform.connected && 'bg-white/20 ring-2 ring-success'
                  )}
                >
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <platform.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <p className="font-bold text-secondary">{platform.name}</p>
                  {platform.connected && (
                    <Badge className="mt-2 bg-success text-white border-0 text-xs">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Recent Conversations */}
        <motion.section variants={item} className="bg-background py-16 lg:py-24">
          <div className="container max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Your inbox: before & after
                </h2>
                <p className="text-muted-foreground mt-1">
                  All your recent conversations in one place
                </p>
              </div>
              <Button variant="outline" className="font-semibold" asChild>
                <Link to="/conversations">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentConversations.map((conversation, index) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/conversations?id=${conversation.id}`}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 mb-4">
                          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                              {conversation.sender_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-foreground truncate">
                              {conversation.sender_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(conversation.last_interaction_at), { addSuffix: true })}
                            </p>
                          </div>
                          {conversation.unread_count > 0 && (
                            <Badge className="badge-unread">
                              {conversation.unread_count}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {conversation.last_message}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section variants={item} className="bg-secondary py-16 lg:py-20">
          <div className="container max-w-7xl">
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { icon: MessageSquare, label: 'Conversations', link: '/conversations', color: 'bg-primary' },
                { icon: Package, label: 'Products', link: '/products', color: 'bg-info' },
                { icon: BarChart3, label: 'Analytics', link: '/analytics', color: 'bg-success' },
                { icon: Settings, label: 'Settings', link: '/settings', color: 'bg-warning' },
              ].map((action) => (
                <Link key={action.label} to={action.link}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-white/10 hover:bg-white/15 rounded-2xl p-6 text-center transition-all cursor-pointer"
                  >
                    <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4', action.color)}>
                      <action.icon className="w-7 h-7 text-white" />
                    </div>
                    <p className="font-bold text-white">{action.label}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
