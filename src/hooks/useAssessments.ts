import { useState, useEffect, useCallback } from 'react';
import { assessmentService } from '@/services/assessmentService';
import { Assessment, AssessmentAttempt, Answer } from '@/types/learner';
import toast from 'react-hot-toast';

export const useAssessments = (courseId?: string) => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssessments = useCallback(async () => {
    if (!courseId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await assessmentService.getCourseAssessments(courseId);
      setAssessments(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des évaluations';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchAssessments();
  }, [fetchAssessments]);

  return {
    assessments,
    loading,
    error,
    refetch: fetchAssessments
  };
};

export const useAssessmentAttempt = () => {
  const [currentAttempt, setCurrentAttempt] = useState<AssessmentAttempt | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const startAssessment = async (assessmentId: string): Promise<boolean> => {
    try {
      setLoading(true);
      const attempt = await assessmentService.startAssessment(assessmentId);
      setCurrentAttempt(attempt);
      toast.success('Évaluation démarrée');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du démarrage de l\'évaluation';
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const submitAssessment = async (
    assessmentId: string, 
    answers: Answer[], 
    timeSpent: number
  ): Promise<AssessmentAttempt | null> => {
    try {
      setSubmitting(true);
      const result = await assessmentService.submitAssessment({
        assessmentId,
        answers,
        timeSpent
      });
      setCurrentAttempt(result);
      toast.success('Évaluation soumise avec succès');
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la soumission';
      toast.error(errorMessage);
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  const getAttemptResults = async (attemptId: string) => {
    try {
      setLoading(true);
      const results = await assessmentService.getAttemptResults(attemptId);
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des résultats';
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    currentAttempt,
    loading,
    submitting,
    startAssessment,
    submitAssessment,
    getAttemptResults
  };
};

export const useMyAttempts = (assessmentId?: string) => {
  const [attempts, setAttempts] = useState<AssessmentAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAttempts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await assessmentService.getMyAttempts(assessmentId);
      setAttempts(data);
    } catch (err) {
      toast.error('Erreur lors du chargement des tentatives');
    } finally {
      setLoading(false);
    }
  }, [assessmentId]);

  useEffect(() => {
    fetchAttempts();
  }, [fetchAttempts]);

  return {
    attempts,
    loading,
    refetch: fetchAttempts
  };
};