import { authApi, suppliersApi, apiUtils } from './api';
import { ApiUser, AuthResponse } from '@/types/api';

export class AuthService {
  // Regular user authentication
  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await authApi.login({ email, password });
      apiUtils.setAuthToken(response.token);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async register(userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Promise<AuthResponse> {
    try {
      const response = await authApi.register(userData);
      apiUtils.setAuthToken(response.token);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Supplier authentication
  static async supplierLogin(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await suppliersApi.login({ email, password });
      apiUtils.setAuthToken(response.token);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async supplierRegister(supplierData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone?: string;
    address?: string;
  }): Promise<AuthResponse> {
    try {
      const response = await suppliersApi.register(supplierData);
      apiUtils.setAuthToken(response.token);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Common auth methods
  static async logout(): Promise<void> {
    try {
      await authApi.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error);
    } finally {
      apiUtils.removeAuthToken();
    }
  }

  static async getCurrentUser(): Promise<ApiUser> {
    try {
      const response = await authApi.me();
      return response.data;
    } catch (error) {
      // If token is invalid, clear it
      apiUtils.removeAuthToken();
      throw error;
    }
  }

  static isAuthenticated(): boolean {
    return apiUtils.isAuthenticated();
  }

  static getToken(): string | null {
    return apiUtils.getAuthToken();
  }

  // Auto-logout when token expires
  static setupTokenRefresh(): void {
    // Check token validity every 30 minutes
    setInterval(async () => {
      if (this.isAuthenticated()) {
        try {
          await this.getCurrentUser();
        } catch (error) {
          console.warn('Token expired, logging out');
          this.logout();
          // Redirect to login page
          window.location.href = '/login';
        }
      }
    }, 30 * 60 * 1000); // 30 minutes
  }
}

// Initialize token refresh checking
if (typeof window !== 'undefined') {
  AuthService.setupTokenRefresh();
}