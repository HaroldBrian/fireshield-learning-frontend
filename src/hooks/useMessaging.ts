import { useState, useEffect, useCallback } from 'react';
import { messagingService } from '@/services/messagingService';
import { Message, Notification } from '@/types/learner';
import toast from 'react-hot-toast';

export const useMessages = (filters?: any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await messagingService.getMessages(filters);
      setMessages(data.messages);
      setPagination({
        total: data.total,
        page: data.page,
        totalPages: data.totalPages
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des messages';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const sendMessage = async (data: {
    receiverId: string;
    courseId?: string;
    subject: string;
    content: string;
    attachments?: File[];
  }): Promise<boolean> => {
    try {
      const newMessage = await messagingService.sendMessage(data);
      setMessages(prev => [newMessage, ...prev]);
      toast.success('Message envoyé avec succès');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'envoi du message';
      toast.error(errorMessage);
      return false;
    }
  };

  const markAsRead = async (messageId: string): Promise<boolean> => {
    try {
      const updatedMessage = await messagingService.markAsRead(messageId);
      setMessages(prev => prev.map(msg => msg.id === messageId ? updatedMessage : msg));
      return true;
    } catch (err) {
      toast.error('Erreur lors du marquage comme lu');
      return false;
    }
  };

  const deleteMessage = async (messageId: string): Promise<boolean> => {
    try {
      await messagingService.deleteMessage(messageId);
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      toast.success('Message supprimé avec succès');
      return true;
    } catch (err) {
      toast.error('Erreur lors de la suppression du message');
      return false;
    }
  };

  return {
    messages,
    pagination,
    loading,
    error,
    sendMessage,
    markAsRead,
    deleteMessage,
    refetch: fetchMessages
  };
};

export const useConversation = (userId: string, courseId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConversation = useCallback(async () => {
    try {
      setLoading(true);
      const data = await messagingService.getConversation(userId, courseId);
      setMessages(data);
    } catch (err) {
      toast.error('Erreur lors du chargement de la conversation');
    } finally {
      setLoading(false);
    }
  }, [userId, courseId]);

  useEffect(() => {
    fetchConversation();
  }, [fetchConversation]);

  return {
    messages,
    loading,
    refetch: fetchConversation
  };
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await messagingService.getNotifications();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.isRead).length);
    } catch (err) {
      toast.error('Erreur lors du chargement des notifications');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (notificationId: string): Promise<boolean> => {
    try {
      const updatedNotification = await messagingService.markNotificationAsRead(notificationId);
      setNotifications(prev => prev.map(n => n.id === notificationId ? updatedNotification : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
      return true;
    } catch (err) {
      toast.error('Erreur lors du marquage comme lu');
      return false;
    }
  };

  const markAllAsRead = async (): Promise<boolean> => {
    try {
      await messagingService.markAllNotificationsAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success('Toutes les notifications ont été marquées comme lues');
      return true;
    } catch (err) {
      toast.error('Erreur lors du marquage de toutes les notifications');
      return false;
    }
  };

  const deleteNotification = async (notificationId: string): Promise<boolean> => {
    try {
      await messagingService.deleteNotification(notificationId);
      const notification = notifications.find(n => n.id === notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      if (notification && !notification.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      toast.success('Notification supprimée avec succès');
      return true;
    } catch (err) {
      toast.error('Erreur lors de la suppression de la notification');
      return false;
    }
  };

  return {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refetch: fetchNotifications
  };
};