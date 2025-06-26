import { User } from './user.types';

// Types basés sur la table notifications
export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'course' | 'quiz' | 'message';

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type?: NotificationType;
  is_read: boolean;
  sent_at: string;
  // Relations
  user?: User;
  // Données additionnelles
  action_url?: string;
  metadata?: Record<string, any>;
}

// Types pour la création de notifications
export interface CreateNotificationData {
  user_id: number;
  title: string;
  message: string;
  type?: NotificationType;
  action_url?: string;
  metadata?: Record<string, any>;
}

// Types pour les réponses API
export interface NotificationsResponse {
  notifications: Notification[];
  unread_count: number;
  total: number;
}