import api from '@/lib/api';
import { 
  Quiz, 
  QuizQuestion,
  QuizSubmission, 
  QuizResult, 
  ApiResponse 
} from '@/types';

export const quizService = {
  // Récupérer un quiz
  getQuiz: async (id: number): Promise<Quiz> => {
    const response = await api.get<ApiResponse<Quiz>>(`/quizzes/${id}`);
    return response.data.data;
  },

  // Récupérer les questions d'un quiz
  getQuizQuestions: async (quizId: number): Promise<QuizQuestion[]> => {
    const response = await api.get<ApiResponse<QuizQuestion[]>>(`/quizzes/${quizId}/questions`);
    return response.data.data;
  },

  // Commencer un quiz (pour le timing)
  startQuiz: async (quizId: number): Promise<{ started_at: string }> => {
    const response = await api.post<ApiResponse<{ started_at: string }>>(`/quizzes/${quizId}/start`);
    return response.data.data;
  },

  // Soumettre un quiz
  submitQuiz: async (submission: QuizSubmission): Promise<QuizResult> => {
    const response = await api.post<ApiResponse<QuizResult>>('/quizzes/submit', submission);
    return response.data.data;
  },

  // Récupérer le résultat d'un quiz
  getQuizResult: async (quizId: number): Promise<QuizResult> => {
    const response = await api.get<ApiResponse<QuizResult>>(`/quizzes/${quizId}/result`);
    return response.data.data;
  },

  // Récupérer tous les résultats de l'utilisateur
  getUserQuizResults: async (): Promise<QuizResult[]> => {
    const response = await api.get<ApiResponse<QuizResult[]>>('/quizzes/results');
    return response.data.data;
  },

  // Récupérer les quiz d'un cours
  getCourseQuizzes: async (courseId: number): Promise<Quiz[]> => {
    const response = await api.get<ApiResponse<Quiz[]>>(`/courses/${courseId}/quizzes`);
    return response.data.data;
  },

  // Récupérer les statistiques d'un quiz
  getQuizStats: async (quizId: number): Promise<{
    total_attempts: number;
    average_score: number;
    pass_rate: number;
    completion_rate: number;
  }> => {
    const response = await api.get<ApiResponse<any>>(`/quizzes/${quizId}/stats`);
    return response.data.data;
  },
};