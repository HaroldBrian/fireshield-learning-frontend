import { apiClient } from '@/utils';
import { Assessment, AssessmentAttempt, Answer } from '@/types/learner';

export interface SubmitAssessmentData {
  assessmentId: string;
  answers: Answer[];
  timeSpent: number;
}

class AssessmentService {
  private readonly endpoint = '/assessments';

  async getCourseAssessments(courseId: string): Promise<Assessment[]> {
    return await apiClient.getAll(`${this.endpoint}/course/${courseId}`);
  }

  async getAssessmentById(id: string): Promise<Assessment> {
    return await apiClient.getById(this.endpoint, id);
  }

  async startAssessment(assessmentId: string): Promise<AssessmentAttempt> {
    return await apiClient.create(`${this.endpoint}/${assessmentId}/start`, {});
  }

  async submitAssessment(data: SubmitAssessmentData): Promise<AssessmentAttempt> {
    return await apiClient.create(`${this.endpoint}/${data.assessmentId}/submit`, {
      answers: data.answers,
      timeSpent: data.timeSpent
    });
  }

  async getMyAttempts(assessmentId?: string): Promise<AssessmentAttempt[]> {
    const url = assessmentId 
      ? `${this.endpoint}/attempts?assessmentId=${assessmentId}`
      : `${this.endpoint}/attempts`;
    return await apiClient.getAll(url);
  }

  async getAttemptById(attemptId: string): Promise<AssessmentAttempt> {
    return await apiClient.getById(`${this.endpoint}/attempts`, attemptId);
  }

  async getAttemptResults(attemptId: string): Promise<{
    attempt: AssessmentAttempt;
    correctAnswers: Answer[];
    feedback: string[];
  }> {
    return await apiClient.getAll(`${this.endpoint}/attempts/${attemptId}/results`);
  }
}

export const assessmentService = new AssessmentService();