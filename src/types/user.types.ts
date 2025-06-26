// Types basés sur la table users et auth_providers
export type UserRole = 'admin' | 'trainer' | 'learner';
export type AuthProvider = 'email' | 'google' | 'facebook';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Optionnel car pas toujours retourné
  avatar_url?: string;
  role: UserRole;
  bio?: string;
  certifications?: string; // JSON string ou texte
  otp?: number;
  created_at: string;
  updated_at: string;
}

export interface AuthProviderData {
  id: number;
  user_id: number;
  provider: AuthProvider;
  provider_id: string;
}

export interface UserProfile {
  id: number;
  user_id: number;
  phone?: string;
  address?: string;
  date_of_birth?: string;
  bio?: string;
  certifications?: Certification[];
  documents?: UserDocument[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date_issued: string;
  expiry_date?: string;
  credential_id?: string;
  url?: string;
}

export interface UserDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploaded_at: string;
}

// Types pour les formulaires
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
  phone?: string;
  bio?: string;
  address?: string;
  date_of_birth?: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
}