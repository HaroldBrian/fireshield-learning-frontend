import { User } from './user.types';

// Types pour l'authentification
export interface AuthResponse {
  user: User;
  token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SocialAuthRequest {
  provider: 'google' | 'facebook';
  access_token: string;
  provider_id: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ConfirmResetPasswordRequest {
  token: string;
  new_password: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: number;
}

// Types pour le contexte d'authentification
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  loginWithSocial: (data: SocialAuthRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  confirmResetPassword: (data: ConfirmResetPasswordRequest) => Promise<void>;
  verifyOTP: (data: VerifyOTPRequest) => Promise<void>;
}

// Types pour les tokens JWT
export interface JWTPayload {
  sub: number; // user id
  email: string;
  role: string;
  iat: number;
  exp: number;
}