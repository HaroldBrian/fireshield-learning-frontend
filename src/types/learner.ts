// Types pour le module Apprenant
export interface Learner {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  bio?: string;
  avatar?: string;
  isEmailVerified: boolean;
  provider: 'email' | 'google' | 'facebook';
  createdAt: string;
  updatedAt: string;
}

export interface LearnerProfile {
  id: string;
  learnerId: string;
  bio?: string;
  documents: Document[];
  certifications: Certification[];
  preferences: LearnerPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedAt: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface LearnerPreferences {
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisible: boolean;
    showProgress: boolean;
  };
}

export interface CourseEnrollment {
  id: string;
  courseId: string;
  learnerId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'active' | 'completed' | 'cancelled';
  enrolledAt: string;
  startDate?: string;
  completedAt?: string;
  progress: number;
  grade?: number;
  certificate?: Certificate;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string;
}

export interface Certificate {
  id: string;
  enrollmentId: string;
  certificateNumber: string;
  issuedAt: string;
  url: string;
  isValid: boolean;
}

export interface LearnerProgress {
  courseId: string;
  moduleId: string;
  lessonId: string;
  progress: number;
  timeSpent: number;
  lastAccessedAt: string;
  completed: boolean;
  score?: number;
}

export interface Assessment {
  id: string;
  courseId: string;
  title: string;
  type: 'quiz' | 'exam' | 'assignment';
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
  maxAttempts: number;
}

export interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'essay' | 'fill_blank';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  explanation?: string;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  learnerId: string;
  answers: Answer[];
  score: number;
  passed: boolean;
  startedAt: string;
  completedAt?: string;
  timeSpent: number;
}

export interface Answer {
  questionId: string;
  answer: string | string[];
  isCorrect: boolean;
  points: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  courseId?: string;
  subject: string;
  content: string;
  isRead: boolean;
  sentAt: string;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'course_reminder' | 'payment_due' | 'result_available' | 'new_resource' | 'message';
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface LiveSession {
  id: string;
  courseId: string;
  title: string;
  description: string;
  instructorId: string;
  scheduledAt: string;
  duration: number;
  meetingUrl: string;
  recordingUrl?: string;
  isRecorded: boolean;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  participants: SessionParticipant[];
}

export interface SessionParticipant {
  id: string;
  userId: string;
  joinedAt?: string;
  leftAt?: string;
  duration: number;
  isPresent: boolean;
}

export interface Payment {
  id: string;
  enrollmentId: string;
  amount: number;
  currency: string;
  method: 'stripe' | 'paypal' | 'mobile_money';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
  completedAt?: string;
  invoice?: Invoice;
}

export interface Invoice {
  id: string;
  paymentId: string;
  invoiceNumber: string;
  amount: number;
  tax: number;
  total: number;
  issuedAt: string;
  dueDate: string;
  url: string;
}