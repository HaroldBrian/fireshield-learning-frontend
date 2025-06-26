// Types basés sur les tables courses, course_sessions, course_contents
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type SessionStatus = 'planned' | 'ongoing' | 'completed' | 'canceled';
export type ContentType = 'pdf' | 'video' | 'quiz' | 'url' | 'text';

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  level: CourseLevel;
  price: number; // DECIMAL(10,2)
  duration: string; // VARCHAR(50) - ex: "4 semaines"
  thumbnail_url?: string;
  category?: string;
  created_at: string;
  updated_at: string;
  // Relations
  sessions?: CourseSession[];
  contents?: CourseContent[];
  enrollments?: Enrollment[];
}

export interface CourseSession {
  id: number;
  course_id: number;
  trainer_id: number;
  start_date: string; // DATE
  end_date: string; // DATE
  location: string; // Salle ou lien visioconf
  status: SessionStatus;
  // Relations
  course?: Course;
  trainer?: User;
  enrollments?: Enrollment[];
}

export interface CourseContent {
  id: number;
  course_id: number;
  type: ContentType;
  title: string;
  content_url?: string; // URL ou contenu textuel
  order_index: number;
  // Relations
  course?: Course;
  progress?: LearnerProgress[];
}

// Types pour les filtres et recherche
export interface CourseFilters {
  search?: string;
  category?: string;
  level?: CourseLevel;
  price_min?: number;
  price_max?: number;
  page?: number;
  limit?: number;
}

// Types pour les réponses API
export interface CoursesResponse {
  data: Course[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}