// Types génériques pour les réponses API
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, any>;
}

// Types pour les filtres génériques
export interface BaseFilters {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  search?: string;
}

// Types pour les métadonnées de réponse
export interface ResponseMetadata {
  timestamp: string;
  request_id: string;
  version: string;
}

// Types pour les requêtes avec fichiers
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mime_type: string;
}

// Types pour les statistiques
export interface DashboardStats {
  total_courses: number;
  active_enrollments: number;
  completed_courses: number;
  certificates_earned: number;
  total_learning_hours: number;
  average_progress: number;
}

// Types pour les paramètres de requête
export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}