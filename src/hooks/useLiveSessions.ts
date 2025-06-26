import { useState, useEffect, useCallback } from 'react';
import { liveSessionService } from '@/services/liveSessionService';
import { LiveSession } from '@/types/learner';
import toast from 'react-hot-toast';

export const useLiveSessions = (courseId?: string) => {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = courseId 
        ? await liveSessionService.getCourseSessions(courseId)
        : await liveSessionService.getMySessions();
      setSessions(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des sessions';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const joinSession = async (sessionId: string): Promise<string | null> => {
    try {
      const { meetingUrl } = await liveSessionService.joinSession(sessionId);
      toast.success('Connexion à la session en cours...');
      return meetingUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la connexion à la session';
      toast.error(errorMessage);
      return null;
    }
  };

  const leaveSession = async (sessionId: string): Promise<boolean> => {
    try {
      await liveSessionService.leaveSession(sessionId);
      toast.success('Session quittée avec succès');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la déconnexion';
      toast.error(errorMessage);
      return false;
    }
  };

  return {
    sessions,
    loading,
    error,
    joinSession,
    leaveSession,
    refetch: fetchSessions
  };
};

export const useUpcomingSessions = () => {
  const [upcomingSessions, setUpcomingSessions] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUpcomingSessions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await liveSessionService.getUpcomingSessions();
      setUpcomingSessions(data);
    } catch (err) {
      toast.error('Erreur lors du chargement des sessions à venir');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUpcomingSessions();
  }, [fetchUpcomingSessions]);

  return {
    upcomingSessions,
    loading,
    refetch: fetchUpcomingSessions
  };
};