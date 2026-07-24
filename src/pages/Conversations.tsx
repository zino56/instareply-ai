import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Send,
  Bot,
  CheckCircle,
  MoreVertical,
  ArrowLeft,
  User,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { api } from '@/lib/api';
import type { Conversation, Message } from '@/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow, format } from 'date-fns';

export default function Conversations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(searchParams.get('id') || null);
  const [newMessage, setNewMessage] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await api.getConversations();
        setConversations(Array.isArray(data) ? data : data?.data || []);
      } catch {
        setConversations([]);
      }
      setLoading(false);
    };
    load();
  }, []);

  const selectedConversation = conversations.find((c) => c.id === selectedId);

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages]);

  const filteredConversations = conversations.filter((conv) =>
    conv.sender_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.last_message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectConversation = (id: string) => {
    setSelectedId(id);
    setSearchParams({ id });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedId) return;
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedId
          ? { ...conv, messages: [...(conv.messages || []), newMsg], message_count: conv.message_count + 1, last_message: newMessage, last_interaction_at: new Date().toISOString() }
          : conv
      )
    );
    setNewMessage('');
  };

  const showConversationList = !isMobileView || !selectedId;
  const showConversationDetail = !isMobileView || selectedId;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] flex bg-background">
      {/* Conversation List */}
      <AnimatePresence mode="wait">
        {showConversationList && (
          <motion.div
            initial={isMobileView ? { x: -100, opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className={cn('border-r border-border bg-card flex flex-col', isMobileView ? 'w-full' : 'w-80 lg:w-96')}
          >
            <div className="p-4 border-b border-border/70">
              <h2 className="text-[15px] font-semibold mb-3 text-foreground tracking-tight md:tracking-[-0.01em]">Conversations</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.75} />
                <Input placeholder="Search conversations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9 text-[13px]" />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredConversations.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No conversations found</div>
                ) : (
                  filteredConversations.map((conv) => (
                    <button key={conv.id} onClick={() => handleSelectConversation(conv.id)} className={cn('w-full text-left', selectedId === conv.id ? 'conversation-item-active' : 'conversation-item')}>
                      <Avatar className="h-12 w-12 flex-shrink-0"><AvatarFallback className="bg-secondary text-secondary-foreground">{conv.sender_name?.charAt(0) || '?'}</AvatarFallback></Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm truncate">{conv.sender_name}</span>
                          {conv.last_interaction_at && <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{formatDistanceToNow(new Date(conv.last_interaction_at), { addSuffix: false })}</span>}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate pr-2">{conv.last_message}</p>
                          {(conv.unread_count || 0) > 0 && <Badge className="badge-unread flex-shrink-0">{conv.unread_count}</Badge>}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conversation Detail */}
      <AnimatePresence mode="wait">
        {showConversationDetail && (
          <motion.div initial={isMobileView ? { x: 100, opacity: 0 } : false} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="h-16 px-4 border-b border-border flex items-center justify-between bg-card">
                  <div className="flex items-center gap-3">
                    {isMobileView && (
                      <Button variant="ghost" size="icon" onClick={() => { setSelectedId(null); setSearchParams({}); }}>
                        <ArrowLeft className="w-5 h-5" />
                      </Button>
                    )}
                    <Avatar className="h-10 w-10"><AvatarFallback className="bg-secondary text-secondary-foreground">{selectedConversation.sender_name?.charAt(0) || '?'}</AvatarFallback></Avatar>
                    <div>
                      <p className="font-semibold">{selectedConversation.sender_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedConversation.is_resolved ? <span className="flex items-center gap-1 text-success"><CheckCircle className="w-3 h-3" /> Resolved</span> : 'Active conversation'}
                      </p>
                    </div>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-4 bg-muted/30">
                  <div className="space-y-4 max-w-3xl mx-auto">
                    {(selectedConversation.messages || []).map((message) => (
                      <motion.div key={message.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn('flex gap-2', message.role === 'assistant' ? 'justify-end' : 'justify-start')}>
                        {message.role === 'user' && <Avatar className="h-8 w-8 flex-shrink-0"><AvatarFallback className="bg-secondary text-secondary-foreground text-xs"><User className="w-4 h-4" /></AvatarFallback></Avatar>}
                        <div className="space-y-1 max-w-[80%]">
                          <div className={cn(message.role === 'assistant' ? 'message-bubble-sent' : 'message-bubble-received')}>{message.content}</div>
                          <div className={cn('flex items-center gap-1.5 text-xs text-muted-foreground', message.role === 'assistant' ? 'justify-end' : 'justify-start')}>
                            {message.role === 'assistant' && <Bot className="w-3 h-3" />}
                            <span>{format(new Date(message.timestamp), 'HH:mm')}</span>
                          </div>
                        </div>
                        {message.role === 'assistant' && <Avatar className="h-8 w-8 flex-shrink-0"><AvatarFallback className="bg-primary text-primary-foreground text-xs"><Bot className="w-4 h-4" /></AvatarFallback></Avatar>}
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="p-4 border-t border-border bg-card">
                  <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2 max-w-3xl mx-auto">
                    <Input placeholder="Type a message (manual reply)..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1" />
                    <Button type="submit" disabled={!newMessage.trim()}><Send className="w-4 h-4" /></Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageSquareIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Select a conversation</p>
                  <p className="text-sm">Choose a conversation from the list to view messages</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MessageSquareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  );
}
