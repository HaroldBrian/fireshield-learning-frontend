import { useState, useEffect, useCallback } from 'react';
import { learnerService } from '@/services/learnerService';
import { 
  Learner, 
  LearnerProfile, 
  Document, 
  Certification,
  CourseEnrollment,
  Certificate,
  LearnerProgress
} from '@/types/learner';
import toast from 'react-hot-toast';

export const useLearnerProfile = () => {
  const [learner, setLearner] = useState<Learner | null>(null);
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [learnerData, profileData] = await Promise.all([
        learnerService.getLearnerProfile(),
        learnerService.getDetailedProfile()
      ]);
      setLearner(learnerData);
      setProfile(profileData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement du profil';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (data: any): Promise<boolean> => {
    try {
      const updatedLearner = await learnerService.updateLearnerProfile(data);
      setLearner(updatedLearner);
      toast.success('Profil mis à jour avec succès');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';
      toast.error(errorMessage);
      return false;
    }
  };

  const updateDetailedProfile = async (data: any): Promise<boolean> => {
    try {
      const updatedProfile = await learnerService.updateDetailedProfile(data);
      setProfile(updatedProfile);
      toast.success('Profil détaillé mis à jour avec succès');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';
      toast.error(errorMessage);
      return false;
    }
  };

  return {
    learner,
    profile,
    loading,
    error,
    updateProfile,
    updateDetailedProfile,
    refetch: fetchProfile
  };
};

export const useLearnerDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await learnerService.getDocuments();
      setDocuments(data);
    } catch (err) {
      toast.error('Erreur lors du chargement des documents');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const uploadDocument = async (file: File, type: string): Promise<boolean> => {
    try {
      setUploading(true);
      const newDocument = await learnerService.uploadDocument(file, type);
      setDocuments(prev => [...prev, newDocument]);
      toast.success('Document téléchargé avec succès');
      return true;
    } catch (err) {
      toast.error('Erreur lors du téléchargement du document');
      return false;
    } finally {
      setUploading(false);
    }
  };

  const deleteDocument = async (documentId: string): Promise<boolean> => {
    try {
      await learnerService.deleteDocument(documentId);
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      toast.success('Document supprimé avec succès');
      return true;
    } catch (err) {
      toast.error('Erreur lors de la suppression du document');
      return false;
    }
  };

  return {
    documents,
    loading,
    uploading,
    uploadDocument,
    deleteDocument,
    refetch: fetchDocuments
  };
};

export const useLearnerCertifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCertifications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await learnerService.getCertifications();
      setCertifications(data);
    } catch (err) {
      toast.error('Erreur lors du chargement des certifications');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  const addCertification = async (certification: Omit<Certification, 'id'>): Promise<boolean> => {
    try {
      const newCertification = await learnerService.addCertification(certification);
      setCertifications(prev => [...prev, newCertification]);
      toast.success('Certification ajoutée avec succès');
      return true;
    } catch (err) {
      toast.error('Erreur lors de l\'ajout de la certification');
      return false;
    }
  };

  const updateCertification = async (id: string, data: Partial<Certification>): Promise<boolean> => {
    try {
      const updatedCertification = await learnerService.updateCertification(id, data);
      setCertifications(prev => prev.map(cert => cert.id === id ? updatedCertification : cert));
      toast.success('Certification mise à jour avec succès');
      return true;
    } catch (err) {
      toast.error('Erreur lors de la mise à jour de la certification');
      return false;
    }
  };

  const deleteCertification = async (id: string): Promise<boolean> => {
    try {
      await learnerService.deleteCertification(id);
      setCertifications(prev => prev.filter(cert => cert.id !== id));
      toast.success('Certification supprimée avec succès');
      return true;
    } catch (err) {
      toast.error('Erreur lors de la suppression de la certification');
      return false;
    }
  };

  return {
    certifications,
    loading,
    addCertification,
    updateCertification,
    deleteCertification,
    refetch: fetchCertifications
  };
};

export const useLearnerEnrollments = () => {
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrollments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await learnerService.getEnrollments();
      setEnrollments(data);
    } catch (err) {
      toast.error('Erreur lors du chargement des inscriptions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  return {
    enrollments,
    loading,
    refetch: fetchEnrollments
  };
};

export const useLearnerProgress = (courseId?: string) => {
  const [progress, setProgress] = useState<LearnerProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      const data = courseId 
        ? await learnerService.getCourseProgress(courseId)
        : await learnerService.getProgress();
      setProgress(data);
    } catch (err) {
      toast.error('Erreur lors du chargement des progrès');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const updateProgress = async (progressData: {
    courseId: string;
    moduleId: string;
    lessonId: string;
    progress: number;
    timeSpent: number;
  }): Promise<boolean> => {
    try {
      const updatedProgress = await learnerService.updateProgress(progressData);
      setProgress(prev => {
        const index = prev.findIndex(p => 
          p.courseId === progressData.courseId && 
          p.moduleId === progressData.moduleId && 
          p.lessonId === progressData.lessonId
        );
        if (index >= 0) {
          const newProgress = [...prev];
          newProgress[index] = updatedProgress;
          return newProgress;
        }
        return [...prev, updatedProgress];
      });
      return true;
    } catch (err) {
      toast.error('Erreur lors de la mise à jour des progrès');
      return false;
    }
  };

  return {
    progress,
    loading,
    updateProgress,
    refetch: fetchProgress
  };
};

export const useLearnerCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCertificates = useCallback(async () => {
    try {
      setLoading(true);
      const data = await learnerService.getCertificates();
      setCertificates(data);
    } catch (err) {
      toast.error('Erreur lors du chargement des certificats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const downloadCertificate = async (certificateId: string): Promise<boolean> => {
    try {
      const blob = await learnerService.downloadCertificate(certificateId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${certificateId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Certificat téléchargé avec succès');
      return true;
    } catch (err) {
      toast.error('Erreur lors du téléchargement du certificat');
      return false;
    }
  };

  return {
    certificates,
    loading,
    downloadCertificate,
    refetch: fetchCertificates
  };
};