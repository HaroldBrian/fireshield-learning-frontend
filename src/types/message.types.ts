import { User } from './user.types';

// Types basés sur la table messages
export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  read: boolean;
  sent_at: string;
  // Relations
  sender?: User;
  receiver?: User;
}

export interface Conversation {
  id: string;
  participants: User[];
  last_message?: Message;
  unread_count: number;
  updated_at: string;
}

// Types pour l'envoi de messages
export interface SendMessageData {
  receiver_id: number;
  content: string;
}

export interface MessageThread {
  conversation_id: string;
  messages: Message[];
  participant: User;
}