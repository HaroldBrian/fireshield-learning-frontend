import { Enrollment } from './enrollment.types';

// Types basés sur la table payments
export type PaymentMethod = 'stripe' | 'paypal' | 'bank_transfer';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Payment {
  id: number;
  enrollment_id: number;
  payment_method: PaymentMethod;
  payment_date: string;
  reference: string;
  amount: number; // DECIMAL(10,2)
  status?: PaymentStatus;
  // Relations
  enrollment?: Enrollment;
}

// Types pour le traitement des paiements
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  payment_method: PaymentMethod;
  client_secret?: string; // Pour Stripe
}

export interface PaymentData {
  enrollment_id: number;
  payment_method: PaymentMethod;
  amount: number;
  payment_intent_id?: string;
}

// Types pour les factures
export interface Invoice {
  id: string;
  payment_id: number;
  invoice_number: string;
  issued_date: string;
  due_date: string;
  amount: number;
  tax_amount?: number;
  total_amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  pdf_url?: string;
}