import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import {
  Bot,
  Clock,
  Instagram,
  User,
  Save,
  LogOut,
  RefreshCw,
  Trash2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  MessageSquare,
  Building,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
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

const personalityPresets = [
  {
    id: 'friendly',
    title: 'Friendly Seller',
    description: 'Warm, approachable, uses emojis',
    preview: "Hi there! 👋 So happy to hear from you! That's an amazing choice - let me tell you all about it! 💛",
  },
  {
    id: 'professional',
    title: 'Professional Support',
    description: 'Formal, detailed, business-focused',
    preview: 'Thank you for reaching out. I\'d be happy to assist you with your inquiry. Here are the details you requested.',
  },
  {
    id: 'casual',
    title: 'Casual & Fun',
    description: 'Relaxed, conversational, hip',
    preview: 'Hey! Great question! 🔥 Yeah, we totally have that in stock. Super popular item btw - you have great taste!',
  },
];

export default function Settings() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'auto-reply';
  const { user, logout } = useAuthStore();
  const { toast } = useToast();

  // Auto-Reply Settings State
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(user?.auto_reply_enabled ?? true);
  const [startHour, setStartHour] = useState(user?.reply_start_hour?.toString() ?? '9');
  const [endHour, setEndHour] = useState(user?.reply_end_hour?.toString() ?? '21');
  const [responseTone, setResponseTone] = useState<string>(user?.response_tone ?? 'friendly');
  const [includeLinks, setIncludeLinks] = useState(true);
  const [includeImages, setIncludeImages] = useState(true);
  const [customInstructions, setCustomInstructions] = useState('');

  // AI Personality State
  const [businessName, setBusinessName] = useState(user?.name ?? '');
  const [brandVoice, setBrandVoice] = useState(user?.brand_voice ?? '');
  const [industry, setIndustry] = useState('ecommerce');
  const [selectedPreset, setSelectedPreset] = useState<string>(user?.ai_personality ?? 'friendly');

  // Account State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(true);

  const isConnected = Boolean(user?.instagram_page_id);

  const handleSave = (section: string) => {
    toast({
      title: 'Settings saved',
      description: `Your ${section} settings have been updated.`,
    });
  };

  const handleConnectFacebook = () => {
    toast({
      title: 'Connecting to Facebook',
      description: 'Redirecting to Facebook OAuth...',
    });
  };

  const handleSync = () => {
    toast({
      title: 'Syncing',
      description: 'Syncing with Instagram...',
    });
  };

  const hours = Array.from({ length: 24 }, (_, i) => ({
    value: i.toString(),
    label: `${i.toString().padStart(2, '0')}:00`,
  }));

  return (
    <div className="container py-8 max-w-4xl">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <motion.div variants={item}>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and automation preferences
          </p>
        </motion.div>

        <motion.div variants={item}>
          <Tabs defaultValue={defaultTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="auto-reply" className="gap-2">
                <Bot className="w-4 h-4 hidden sm:block" />
                Auto-Reply
              </TabsTrigger>
              <TabsTrigger value="instagram" className="gap-2">
                <Instagram className="w-4 h-4 hidden sm:block" />
                Instagram
              </TabsTrigger>
              <TabsTrigger value="personality" className="gap-2">
                <Sparkles className="w-4 h-4 hidden sm:block" />
                AI Personality
              </TabsTrigger>
              <TabsTrigger value="account" className="gap-2">
                <User className="w-4 h-4 hidden sm:block" />
                Account
              </TabsTrigger>
            </TabsList>

            {/* Auto-Reply Tab */}
            <TabsContent value="auto-reply" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    Auto-Reply Settings
                  </CardTitle>
                  <CardDescription>
                    Configure how your AI responds to customer messages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-reply">Enable Auto-Reply</Label>
                      <p className="text-sm text-muted-foreground">
                        AI will automatically respond to incoming DMs
                      </p>
                    </div>
                    <Switch
                      id="auto-reply"
                      checked={autoReplyEnabled}
                      onCheckedChange={setAutoReplyEnabled}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Start replying at
                      </Label>
                      <Select value={startHour} onValueChange={setStartHour}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {hours.map((hour) => (
                            <SelectItem key={hour.value} value={hour.value}>
                              {hour.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Stop replying at
                      </Label>
                      <Select value={endHour} onValueChange={setEndHour}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {hours.map((hour) => (
                            <SelectItem key={hour.value} value={hour.value}>
                              {hour.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Response Tone</Label>
                    <Select value={responseTone} onValueChange={setResponseTone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Include product links in responses</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically include links when mentioning products
                        </p>
                      </div>
                      <Switch checked={includeLinks} onCheckedChange={setIncludeLinks} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Include product images in responses</Label>
                        <p className="text-sm text-muted-foreground">
                          Send product images when relevant
                        </p>
                      </div>
                      <Switch checked={includeImages} onCheckedChange={setIncludeImages} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Custom AI Instructions (Advanced)</Label>
                    <Textarea
                      placeholder="Add any specific instructions for the AI..."
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button onClick={() => handleSave('auto-reply')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Instagram Tab */}
            <TabsContent value="instagram" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Instagram className="w-5 h-5" />
                    Instagram Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your connected Instagram business page
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className={cn(
                    'p-6 rounded-xl border-2 transition-all',
                    isConnected ? 'border-success/30 bg-success/5' : 'border-warning/30 bg-warning/5'
                  )}>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xl">
                          {user?.instagram_page_name?.charAt(0) || 'I'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">
                            {isConnected ? user?.instagram_page_name : 'No Page Connected'}
                          </h3>
                          {isConnected ? (
                            <Badge variant="secondary" className="bg-success/20 text-success border-0">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Connected
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-warning/20 text-warning border-0">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Disconnected
                            </Badge>
                          )}
                        </div>
                        {isConnected && (
                          <p className="text-sm text-muted-foreground">
                            Last synced: 2 minutes ago
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleConnectFacebook}>
                      {isConnected ? 'Change Instagram Page' : 'Connect Instagram Page'}
                    </Button>
                    {isConnected && (
                      <>
                        <Button variant="outline" onClick={handleSync}>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Sync Now
                        </Button>
                        <Button variant="outline" className="text-destructive hover:text-destructive">
                          Disconnect Page
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI Personality Tab */}
            <TabsContent value="personality" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    AI Personality
                  </CardTitle>
                  <CardDescription>
                    Customize how your AI chatbot communicates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Business Name
                      </Label>
                      <Input
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Your Business Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Industry / Category</Label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="fashion">Fashion</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                          <SelectItem value="beauty">Beauty</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Brand Voice Description</Label>
                    <Textarea
                      value={brandVoice}
                      onChange={(e) => setBrandVoice(e.target.value)}
                      placeholder="Describe how your brand communicates (e.g., 'Warm, helpful, and professional with a touch of playfulness')"
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Personality Preset</Label>
                    <div className="grid gap-3">
                      {personalityPresets.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => setSelectedPreset(preset.id)}
                          className={cn(
                            'p-4 rounded-xl border-2 text-left transition-all',
                            selectedPreset === preset.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          )}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{preset.title}</h4>
                            {selectedPreset === preset.id && (
                              <CheckCircle className="w-5 h-5 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {preset.description}
                          </p>
                          <div className="p-3 rounded-lg bg-muted/50 text-sm">
                            <div className="flex items-start gap-2">
                              <MessageSquare className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                              <p className="italic text-muted-foreground">{preset.preview}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={() => handleSave('personality')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Personality
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Account Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input value={user?.email || ''} disabled className="bg-muted" />
                  </div>

                  <Button variant="outline">
                    Change Password
                  </Button>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email updates about your automation
                        </p>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Desktop Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Show browser notifications for new messages
                        </p>
                      </div>
                      <Switch
                        checked={desktopNotifications}
                        onCheckedChange={setDesktopNotifications}
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleSave('account')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible actions - proceed with caution
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full sm:w-auto">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Account</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove all your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button variant="outline" onClick={logout} className="w-full sm:w-auto">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}
