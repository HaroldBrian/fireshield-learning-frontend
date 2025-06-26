import { User } from './user.types';
import { CourseSession } from './course.types';

// Types basés sur les tables evaluations et questions
export interface Evaluation {
  id: number;
  session_id: number;
  user_id: number;
  score: number; // FLOAT - Note /20 ou % selon système
  comment?: string;
  created_at: string;
  // Relations
  session?: CourseSession;
  user?: User;
}

export interface Question {
  id: number;
  quiz_id: number;
  question_text: string;
  correct_answer: string;
  // Relations
  quiz?: Quiz;
  options?: QuestionOption[];
}

// Types étendus pour les quiz (pas dans le schéma mais nécessaires)
export type QuestionType = 'multiple_choice' | 'single_choice' | 'true_false' | 'text';

export interface Quiz {
  id: number;
  title: string;
  description?: string;
  course_id?: number;
  session_id?: number;
  passing_score: number;
  time_limit?: number; // en minutes
  created_at: string;
  updated_at: string;
  // Relations
  questions?: QuizQuestion[];
  results?: QuizResult[];
}

export interface QuizQuestion {
  id: number;
  quiz_id: number;
  question_text: string;
  type: QuestionType;
  options: string[]; // JSON array
  correct_answer: string | string[]; // Peut être multiple pour les cases à cocher
  points: number;
  order_index: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  is_correct: boolean;
}

export interface QuizAnswer {
  question_id: number;
  answer: string | string[];
}

export interface QuizSubmission {
  quiz_id: number;
  answers: QuizAnswer[];
  started_at?: string;
  submitted_at: string;
}

export interface QuizResult {
  id: number;
  quiz_id: number;
  user_id: number;
  score: number;
  total_points: number;
  percentage: number;
  passed: boolean;
  answers: QuizAnswer[];
  started_at: string;
  submitted_at: string;
  // Relations
  quiz?: Quiz;
  user?: User;
}