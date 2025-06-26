import api from '@/lib/api';
import { 
  Message, 
  Conversation,
  MessageThread,
  SendMessageData, 
  ApiResponse 
} from '@/types';

export const messageService = {
  // Récupérer les conversations
  getConversations: async (): Promise<Conversation[]> => {
    const response = await api.get<ApiResponse<Conversation[]>>('/messages/conversations');
    return response.data.data;
  },

  // Récupérer les messages d'une conversation
  getMessages: async (conversationId: string): Promise<MessageThread> => {
    const response = await api.get<ApiResponse<MessageThread>>(`/messages/conversations/${conversationId}`);
    return response.data.data;
  },

  // Envoyer un message
  sendMessage: async (data: SendMessageData): Promise<Message> => {
    const response = await api.post<ApiResponse<Message>>('/messages', data);
    return response.data.data;
  },

  // Marquer un message comme lu
  markAsRead: async (messageId: number): Promise<void> => {
    await api.put<ApiResponse<void>>(`/messages/${messageId}/read`);
  },

  // Marquer tous les messages d'une conversation comme lus
  markConversationAsRead: async (conversationId: string): Promise<void> => {
    await api.put<ApiResponse<void>>(`/messages/conversations/${conversationId}/read`);
  },

  // Récupérer le nombre de messages non lus
  getUnreadCount: async (): Promise<{ count: number }> => {
    const response = await api.get<ApiResponse<{ count: number }>>('/messages/unread-count');
    return response.data.data;
  },

  // Supprimer un message
  deleteMessage: async (messageId: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/messages/${messageId}`);
  },

  // Rechercher dans les messages
  searchMessages: async (query: string): Promise<Message[]> => {
    const response = await api.get<ApiResponse<Message[]>>(`/messages/search?q=${encodeURIComponent(query)}`);
    return response.data.data;
  },
};