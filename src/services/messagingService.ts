import { apiClient } from '@/utils';
import { Message, Notification } from '@/types/learner';

export interface SendMessageData {
  receiverId: string;
  courseId?: string;
  subject: string;
  content: string;
  attachments?: File[];
}

export interface MessageFilters {
  courseId?: string;
  isRead?: boolean;
  page?: number;
  limit?: number;
}

class MessagingService {
  private readonly endpoint = '/messages';

  async sendMessage(data: SendMessageData): Promise<Message> {
    const formData = new FormData();
    formData.append('receiverId', data.receiverId);
    formData.append('subject', data.subject);
    formData.append('content', data.content);
    
    if (data.courseId) {
      formData.append('courseId', data.courseId);
    }
    
    if (data.attachments) {
      data.attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });
    }

    return await apiClient.create(this.endpoint, formData);
  }

  async getMessages(filters?: MessageFilters): Promise<{
    messages: Message[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const queryParams = filters ? new URLSearchParams(filters as any).toString() : '';
    const url = queryParams ? `${this.endpoint}?${queryParams}` : this.endpoint;
    return await apiClient.getAll(url);
  }

  async getMessageById(id: string): Promise<Message> {
    return await apiClient.getById(this.endpoint, id);
  }

  async markAsRead(messageId: string): Promise<Message> {
    return await apiClient.patch(`${this.endpoint}/${messageId}/read`, {});
  }

  async deleteMessage(messageId: string): Promise<void> {
    return await apiClient.deleteById(`${this.endpoint}/${messageId}`);
  }

  async getConversation(userId: string, courseId?: string): Promise<Message[]> {
    const url = courseId 
      ? `${this.endpoint}/conversation/${userId}?courseId=${courseId}`
      : `${this.endpoint}/conversation/${userId}`;
    return await apiClient.getAll(url);
  }

  // Notifications
  async getNotifications(): Promise<Notification[]> {
    return await apiClient.getAll('/notifications');
  }

  async markNotificationAsRead(notificationId: string): Promise<Notification> {
    return await apiClient.patch(`/notifications/${notificationId}/read`, {});
  }

  async markAllNotificationsAsRead(): Promise<void> {
    return await apiClient.patch('/notifications/read-all', {});
  }

  async deleteNotification(notificationId: string): Promise<void> {
    return await apiClient.deleteById(`/notifications/${notificationId}`);
  }
}

export const messagingService = new MessagingService();