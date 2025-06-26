import api from '@/lib/api';
import { 
  Notification, 
  NotificationsResponse,
  CreateNotificationData,
  ApiResponse 
} from '@/types';

export const notificationService = {
  // Récupérer les notifications de l'utilisateur
  getNotifications: async (page = 1, limit = 20): Promise<NotificationsResponse> => {
    const response = await api.get<ApiResponse<NotificationsResponse>>(`/notifications?page=${page}&limit=${limit}`);
    return response.data.data;
  },

  // Marquer une notification comme lue
  markAsRead: async (notificationId: number): Promise<void> => {
    await api.put<ApiResponse<void>>(`/notifications/${notificationId}/read`);
  },

  // Marquer toutes les notifications comme lues
  markAllAsRead: async (): Promise<void> => {
    await api.put<ApiResponse<void>>('/notifications/read-all');
  },

  // Supprimer une notification
  deleteNotification: async (notificationId: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/notifications/${notificationId}`);
  },

  // Récupérer le nombre de notifications non lues
  getUnreadCount: async (): Promise<{ count: number }> => {
    const response = await api.get<ApiResponse<{ count: number }>>('/notifications/unread-count');
    return response.data.data;
  },

  // Créer une notification (admin/système)
  createNotification: async (data: CreateNotificationData): Promise<Notification> => {
    const response = await api.post<ApiResponse<Notification>>('/notifications', data);
    return response.data.data;
  },

  // Configurer les préférences de notification
  updatePreferences: async (preferences: {
    email_notifications: boolean;
    push_notifications: boolean;
    course_updates: boolean;
    quiz_reminders: boolean;
    message_notifications: boolean;
  }): Promise<void> => {
    await api.put<ApiResponse<void>>('/notifications/preferences', preferences);
  },

  // Récupérer les préférences de notification
  getPreferences: async (): Promise<{
    email_notifications: boolean;
    push_notifications: boolean;
    course_updates: boolean;
    quiz_reminders: boolean;
    message_notifications: boolean;
  }> => {
    const response = await api.get<ApiResponse<any>>('/notifications/preferences');
    return response.data.data;
  },
};