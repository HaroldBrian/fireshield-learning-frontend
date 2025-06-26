import axios from "axios";
import Cookies from "js-cookie";
import { ApiResponse, PaginatedResponse, ApiError } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:7000";

// Configuration axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      Cookies.remove("auth-token");
      // if (typeof window !== "undefined") {
      //   window.location.href = "/auth/sign-in";
      // }
    }

    // Transformer l'erreur en format standardisé
    const apiError: ApiError = {
      message:
        error.response?.data?.message ||
        error.message ||
        "Une erreur est survenue",
      status: error.response?.status || 500,
      code: error.response?.data?.code,
      details: error.response?.data?.details,
    };

    return Promise.reject(apiError);
  }
);

export default api;

// Helpers pour les types de réponse
export const createApiResponse = <T>(
  data: T,
  message = "Success",
  status = 200
): ApiResponse<T> => ({
  data,
  message,
  status,
  success: status >= 200 && status < 300,
});

export const createPaginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResponse<T> => ({
  data,
  total,
  page,
  limit,
  total_pages: Math.ceil(total / limit),
  has_next: page * limit < total,
  has_prev: page > 1,
});
