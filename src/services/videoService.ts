import api from '@/lib/api';
import { 
  VideoSession, 
  VideoParticipant,
  DailyRoom,
  DailyRoomConfig,
  ApiResponse 
} from '@/types';

export const videoService = {
  // Récupérer les sessions vidéo de l'utilisateur
  getUserSessions: async (): Promise<VideoSession[]> => {
    const response = await api.get<ApiResponse<VideoSession[]>>('/video-sessions/user');
    return response.data.data;
  },

  // Récupérer une session vidéo
  getSession: async (sessionId: number): Promise<VideoSession> => {
    const response = await api.get<ApiResponse<VideoSession>>(`/video-sessions/${sessionId}`);
    return response.data.data;
  },

  // Rejoindre une session
  joinSession: async (sessionId: number): Promise<{ meeting_url: string }> => {
    const response = await api.post<ApiResponse<{ meeting_url: string }>>(`/video-sessions/${sessionId}/join`);
    return response.data.data;
  },

  // Quitter une session
  leaveSession: async (sessionId: number): Promise<void> => {
    await api.post<ApiResponse<void>>(`/video-sessions/${sessionId}/leave`);
  },

  // Créer une room Daily.co
  createDailyRoom: async (sessionId: number, config?: Partial<DailyRoomConfig>): Promise<DailyRoom> => {
    const response = await api.post<ApiResponse<DailyRoom>>(`/video-sessions/${sessionId}/daily-room`, config);
    return response.data.data;
  },

  // Récupérer l'historique des sessions
  getSessionHistory: async (): Promise<VideoSession[]> => {
    const response = await api.get<ApiResponse<VideoSession[]>>('/video-sessions/history');
    return response.data.data;
  },

  // Récupérer les participants d'une session
  getSessionParticipants: async (sessionId: number): Promise<VideoParticipant[]> => {
    const response = await api.get<ApiResponse<VideoParticipant[]>>(`/video-sessions/${sessionId}/participants`);
    return response.data.data;
  },

  // Enregistrer la présence à une session
  recordAttendance: async (sessionId: number, duration: number): Promise<void> => {
    await api.post<ApiResponse<void>>(`/video-sessions/${sessionId}/attendance`, { duration });
  },

  // Récupérer les sessions à venir
  getUpcomingSessions: async (): Promise<VideoSession[]> => {
    const response = await api.get<ApiResponse<VideoSession[]>>('/video-sessions/upcoming');
    return response.data.data;
  },
};