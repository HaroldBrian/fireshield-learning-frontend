import { apiClient } from '@/utils';
import { 
  Learner, 
  LearnerProfile, 
  CourseEnrollment, 
  LearnerProgress,
  Certificate,
  Document,
  Certification
} from '@/types/learner';

export interface CreateLearnerData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  provider?: 'email' | 'google' | 'facebook';
}

export interface UpdateLearnerData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  bio?: string;
  avatar?: string;
}

export interface UpdateProfileData {
  bio?: string;
  preferences?: {
    language?: string;
    notifications?: {
      email?: boolean;
      push?: boolean;
      sms?: boolean;
    };
    privacy?: {
      profileVisible?: boolean;
      showProgress?: boolean;
    };
  };
}

class LearnerService {
  private readonly endpoint = '/learners';

  // Gestion du profil apprenant
  async createLearner(data: CreateLearnerData): Promise<Learner> {
    return await apiClient.create(`${this.endpoint}/register`, data);
  }

  async getLearnerProfile(): Promise<Learner> {
    return await apiClient.getAll(`${this.endpoint}/profile`);
  }

  async updateLearnerProfile(data: UpdateLearnerData): Promise<Learner> {
    return await apiClient.patch(`${this.endpoint}/profile`, data);
  }

  async getDetailedProfile(): Promise<LearnerProfile> {
    return await apiClient.getAll(`${this.endpoint}/profile/detailed`);
  }

  async updateDetailedProfile(data: UpdateProfileData): Promise<LearnerProfile> {
    return await apiClient.patch(`${this.endpoint}/profile/detailed`, data);
  }

  // Gestion des documents
  async uploadDocument(file: File, type: string): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    return await apiClient.create(`${this.endpoint}/documents`, formData);
  }

  async getDocuments(): Promise<Document[]> {
    return await apiClient.getAll(`${this.endpoint}/documents`);
  }

  async deleteDocument(documentId: string): Promise<void> {
    return await apiClient.deleteById(`${this.endpoint}/documents/${documentId}`);
  }

  // Gestion des certifications
  async addCertification(certification: Omit<Certification, 'id'>): Promise<Certification> {
    return await apiClient.create(`${this.endpoint}/certifications`, certification);
  }

  async getCertifications(): Promise<Certification[]> {
    return await apiClient.getAll(`${this.endpoint}/certifications`);
  }

  async updateCertification(id: string, data: Partial<Certification>): Promise<Certification> {
    return await apiClient.patch(`${this.endpoint}/certifications/${id}`, data);
  }

  async deleteCertification(id: string): Promise<void> {
    return await apiClient.deleteById(`${this.endpoint}/certifications/${id}`);
  }

  // Gestion des inscriptions
  async getEnrollments(): Promise<CourseEnrollment[]> {
    return await apiClient.getAll(`${this.endpoint}/enrollments`);
  }

  async getEnrollmentById(id: string): Promise<CourseEnrollment> {
    return await apiClient.getById(`${this.endpoint}/enrollments`, id);
  }

  async enrollInCourse(courseId: string): Promise<CourseEnrollment> {
    return await apiClient.create(`${this.endpoint}/enrollments`, { courseId });
  }

  async cancelEnrollment(enrollmentId: string): Promise<void> {
    return await apiClient.patch(`${this.endpoint}/enrollments/${enrollmentId}/cancel`, {});
  }

  // Suivi des progrès
  async getProgress(): Promise<LearnerProgress[]> {
    return await apiClient.getAll(`${this.endpoint}/progress`);
  }

  async getCourseProgress(courseId: string): Promise<LearnerProgress[]> {
    return await apiClient.getAll(`${this.endpoint}/progress/course/${courseId}`);
  }

  async updateProgress(progressData: {
    courseId: string;
    moduleId: string;
    lessonId: string;
    progress: number;
    timeSpent: number;
  }): Promise<LearnerProgress> {
    return await apiClient.patch(`${this.endpoint}/progress`, progressData);
  }

  // Certificats
  async getCertificates(): Promise<Certificate[]> {
    return await apiClient.getAll(`${this.endpoint}/certificates`);
  }

  async downloadCertificate(certificateId: string): Promise<Blob> {
    return await apiClient.getAll(`${this.endpoint}/certificates/${certificateId}/download`);
  }

  // Authentification sociale
  async loginWithGoogle(token: string): Promise<{ learner: Learner; accessToken: string }> {
    return await apiClient.create('/auth/google', { token });
  }

  async loginWithFacebook(token: string): Promise<{ learner: Learner; accessToken: string }> {
    return await apiClient.create('/auth/facebook', { token });
  }
}

export const learnerService = new LearnerService();