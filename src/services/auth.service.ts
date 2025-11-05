import { apiClient } from "./api";
import { API_ENDPOINTS } from "@/constants/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
    return response.data;
  },

  register: async (data: SignupData) => {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, data);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get(API_ENDPOINTS.ME);
    return response.data;
  },

  logout: async () => {
    try {
      await apiClient.post(API_ENDPOINTS.LOGOUT);
    } finally {
      localStorage.removeItem("zse_training_token");
    }
  },
};
