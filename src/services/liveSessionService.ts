import { apiClient } from '@/utils';
import { LiveSession, SessionParticipant } from '@/types/learner';

class LiveSessionService {
  private readonly endpoint = '/live-sessions';

  async getCourseSessions(courseId: string): Promise<LiveSession[]> {
    return await apiClient.getAll(`${this.endpoint}/course/${courseId}`);
  }

  async getSessionById(id: string): Promise<LiveSession> {
    return await apiClient.getById(this.endpoint, id);
  }

  async joinSession(sessionId: string): Promise<{ meetingUrl: string; token: string }> {
    return await apiClient.create(`${this.endpoint}/${sessionId}/join`, {});
  }

  async leaveSession(sessionId: string): Promise<void> {
    return await apiClient.patch(`${this.endpoint}/${sessionId}/leave`, {});
  }

  async getSessionParticipants(sessionId: string): Promise<SessionParticipant[]> {
    return await apiClient.getAll(`${this.endpoint}/${sessionId}/participants`);
  }

  async getSessionRecording(sessionId: string): Promise<{ recordingUrl: string }> {
    return await apiClient.getAll(`${this.endpoint}/${sessionId}/recording`);
  }

  async getMySessions(): Promise<LiveSession[]> {
    return await apiClient.getAll(`${this.endpoint}/my-sessions`);
  }

  async getUpcomingSessions(): Promise<LiveSession[]> {
    return await apiClient.getAll(`${this.endpoint}/upcoming`);
  }
}

export const liveSessionService = new LiveSessionService();