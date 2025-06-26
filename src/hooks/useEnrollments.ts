import { useState, useEffect, useCallback } from 'react';
import { courseEnrollmentService } from '@/services/courseEnrollmentService';
import { CourseEnrollment, Payment } from '@/types/learner';
import toast from 'react-hot-toast';

export const useEnrollments = (filters?: any) => {
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnrollments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await courseEnrollmentService.getMyEnrollments(filters);
      setEnrollments(data.enrollments);
      setPagination({
        total: data.total,
        page: data.page,
        totalPages: data.totalPages
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des inscriptions';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const enrollInCourse = async (courseId: string): Promise<boolean> => {
    try {
      const newEnrollment = await courseEnrollmentService.createEnrollment(courseId);
      setEnrollments(prev => [...prev, newEnrollment]);
      toast.success('Inscription créée avec succès');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'inscription';
      toast.error(errorMessage);
      return false;
    }
  };

  const cancelEnrollment = async (enrollmentId: string, reason?: string): Promise<boolean> => {
    try {
      const updatedEnrollment = await courseEnrollmentService.cancelEnrollment(enrollmentId, reason);
      setEnrollments(prev => prev.map(enrollment => 
        enrollment.id === enrollmentId ? updatedEnrollment : enrollment
      ));
      toast.success('Inscription annulée avec succès');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'annulation';
      toast.error(errorMessage);
      return false;
    }
  };

  return {
    enrollments,
    pagination,
    loading,
    error,
    enrollInCourse,
    cancelEnrollment,
    refetch: fetchEnrollments
  };
};

export const usePayments = () => {
  const [loading, setLoading] = useState(false);

  const createStripePayment = async (enrollmentId: string): Promise<string | null> => {
    try {
      setLoading(true);
      const { clientSecret } = await courseEnrollmentService.createStripePaymentIntent(enrollmentId);
      return clientSecret;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la création du paiement';
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async (paymentIntentId: string): Promise<Payment | null> => {
    try {
      setLoading(true);
      const payment = await courseEnrollmentService.confirmStripePayment(paymentIntentId);
      toast.success('Paiement confirmé avec succès');
      return payment;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la confirmation du paiement';
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = async (invoiceId: string): Promise<boolean> => {
    try {
      const blob = await courseEnrollmentService.downloadInvoice(invoiceId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Facture téléchargée avec succès');
      return true;
    } catch (err) {
      toast.error('Erreur lors du téléchargement de la facture');
      return false;
    }
  };

  return {
    loading,
    createStripePayment,
    confirmPayment,
    downloadInvoice
  };
};