import type { Conversation, Message } from '@/types';

export type ConvChannel = 'instagram';
export type ConvStatus = 'open' | 'resolved';
export type ConvAssignee = 'me' | 'unassigned';
export type ConvAiStatus = 'replied' | 'failed' | 'not_handled';

export interface MockConversation extends Conversation {
  channel: ConvChannel;
  status: ConvStatus;
  assignee: ConvAssignee;
  ai_status: ConvAiStatus;
  needs_attention?: boolean;
  handle?: string;
}

const now = Date.now();
const iso = (mAgo: number) => new Date(now - mAgo * 60_000).toISOString();

const mkMsgs = (rows: Array<[Message['role'], string, number]>): Message[] =>
  rows.map(([role, content, mAgo], i) => ({
    id: `m-${i}-${mAgo}`,
    role,
    content,
    timestamp: iso(mAgo),
  }));

export const mockConversations: MockConversation[] = [
  {
    id: 'c1',
    sender_name: 'Maria Kovacs',
    handle: '@maria.k',
    channel: 'instagram',
    status: 'open',
    assignee: 'unassigned',
    ai_status: 'failed',
    needs_attention: true,
    unread_count: 2,
    is_resolved: false,
    last_message: 'Do you ship the linen set to Germany?',
    last_interaction_at: iso(6),
    message_count: 4,
    messages: mkMsgs([
      ['user', 'Hi! Loved the last drop 💛', 60 * 26],
      ['assistant', 'Thanks so much, Maria! Anything I can help you find?', 60 * 26 - 2],
      ['user', 'Yes — is the linen set restocked?', 60 * 2],
      ['user', 'Do you ship the linen set to Germany?', 6],
    ]),
  },
  {
    id: 'c2',
    sender_name: 'Jordan Lee',
    handle: '@jordan.lee',
    channel: 'instagram',
    status: 'open',
    assignee: 'me',
    ai_status: 'replied',
    unread_count: 0,
    is_resolved: false,
    last_message: 'Perfect, thanks for the quick reply!',
    last_interaction_at: iso(34),
    message_count: 5,
    messages: mkMsgs([
      ['user', 'Do you have the black hoodie in M?', 60 * 3],
      ['assistant', 'Yes, in stock — want me to send the link?', 60 * 3 - 1],
      ['user', 'Please.', 60 * 2],
      ['assistant', 'Here you go: conveero.shop/hoodie-black-m', 60 * 2 - 1],
      ['user', 'Perfect, thanks for the quick reply!', 34],
    ]),
  },
  {
    id: 'c3',
    sender_name: 'Priya Shah',
    handle: '@priyashah',
    channel: 'instagram',
    status: 'open',
    assignee: 'unassigned',
    ai_status: 'replied',
    unread_count: 1,
    is_resolved: false,
    last_message: 'Any discount for first order?',
    last_interaction_at: iso(120),
    message_count: 2,
    messages: mkMsgs([
      ['assistant', 'Welcome! 👋 Let me know if you have any questions.', 60 * 2 + 1],
      ['user', 'Any discount for first order?', 120],
    ]),
  },
  {
    id: 'c4',
    sender_name: 'Sam Whitaker',
    handle: '@samw',
    channel: 'instagram',
    status: 'resolved',
    assignee: 'me',
    ai_status: 'replied',
    unread_count: 0,
    is_resolved: true,
    last_message: 'Great, appreciate it!',
    last_interaction_at: iso(60 * 26),
    message_count: 3,
    messages: mkMsgs([
      ['user', 'Order arrived, love it.', 60 * 27],
      ['assistant', 'So glad to hear it, Sam! 🙌', 60 * 26 + 5],
      ['user', 'Great, appreciate it!', 60 * 26],
    ]),
  },
  {
    id: 'c5',
    sender_name: 'Elena Rossi',
    handle: '@elena.r',
    channel: 'instagram',
    status: 'open',
    assignee: 'unassigned',
    ai_status: 'not_handled',
    unread_count: 3,
    is_resolved: false,
    last_message: 'Hello? Still waiting on my refund…',
    last_interaction_at: iso(15),
    message_count: 3,
    needs_attention: true,
    messages: mkMsgs([
      ['user', 'I returned the parcel last week.', 60 * 24],
      ['user', 'Any update on the refund?', 60 * 2],
      ['user', 'Hello? Still waiting on my refund…', 15],
    ]),
  },
];
