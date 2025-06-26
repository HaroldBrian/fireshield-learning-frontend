import { apiClient } from "@/utils";
import { CourseEnrollment, Payment, Invoice } from "@/types/learner";

export interface EnrollmentFilters {
  status?: string;
  user_id?: number;
  session_id?: number;
  page?: number;
  limit?: number;
}

export interface PaymentData {
  enrollmentId: string;
  method: "stripe" | "paypal" | "mobile_money";
  amount: number;
  currency: string;
}

class CourseEnrollmentService {
  private readonly endpoint = "/enrollments";

  async createEnrollment(courseId: string): Promise<CourseEnrollment> {
    return await apiClient.create(this.endpoint, { courseId });
  }

  async getMyEnrollments(filters?: EnrollmentFilters): Promise<{
    enrollments: CourseEnrollment[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const queryParams = filters
      ? new URLSearchParams(filters as any).toString()
      : "";
    const url = queryParams
      ? `${this.endpoint}/my?${queryParams}`
      : `${this.endpoint}/my`;
    return await apiClient.getAll(url);
  }

  async getEnrollmentById(id: string): Promise<CourseEnrollment> {
    return await apiClient.getById(this.endpoint, id);
  }

  async cancelEnrollment(
    id: string,
    reason?: string
  ): Promise<CourseEnrollment> {
    return await apiClient.patch(`${this.endpoint}/${id}/cancel`, { reason });
  }

  // Paiements
  async createPayment(paymentData: PaymentData): Promise<Payment> {
    return await apiClient.create("/payments", paymentData);
  }

  async getPaymentStatus(paymentId: string): Promise<Payment> {
    return await apiClient.getById("/payments", paymentId);
  }

  async getInvoice(paymentId: string): Promise<Invoice> {
    return await apiClient.getAll(`/payments/${paymentId}/invoice`);
  }

  async downloadInvoice(invoiceId: string): Promise<Blob> {
    return await apiClient.getAll(`/invoices/${invoiceId}/download`);
  }

  // Stripe Payment Intent
  async createStripePaymentIntent(
    enrollmentId: string
  ): Promise<{ clientSecret: string }> {
    return await apiClient.create("/payments/stripe/create-intent", {
      enrollmentId,
    });
  }

  async confirmStripePayment(paymentIntentId: string): Promise<Payment> {
    return await apiClient.create("/payments/stripe/confirm", {
      paymentIntentId,
    });
  }
}

export const courseEnrollmentService = new CourseEnrollmentService();
