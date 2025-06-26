import { User } from "./user.types";
import { CourseSession } from "./course.types";

// Types basés sur les tables enrollments et learner_progress
export type EnrollmentStatus = "pending" | "confirmed" | "canceled";

export interface Enrollment {
  id: number;
  user_id: number;
  session_id: number;
  status: EnrollmentStatus;
  created_at: string;
  // Relations
  user?: User;
  session?: CourseSession;
  progress?: LearnerProgress[];
  certificate?: Certificate;
}

export interface LearnerProgress {
  id: number;
  user_id: number;
  content_id: number;
  completed: boolean;
  completed_at?: string;
  // Relations
  user?: User;
  content?: import("./course.types").CourseContent;
}

export interface Certificate {
  id: number;
  enrollment_id: number;
  certificate_url: string;
  issued_at: string;
  // Relations
  enrollment?: Enrollment;
}

// Types pour les statistiques de progression
export interface ProgressStats {
  total_contents: number;
  completed_contents: number;
  progress_percentage: number;
  estimated_completion_date?: string;
}

// Types pour les réponses API
export interface EnrollmentResponse {
  enrollment: Enrollment;
  progress: ProgressStats;
}
