import { ApiResponse, HealthResponse } from '../types/api';

const API_BASE_URL = 'http://localhost:8080/api';

export class ApiService {
  private static async makeRequest<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  static async getHello(): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>('/hello');
  }

  static async getHealth(): Promise<HealthResponse> {
    return this.makeRequest<HealthResponse>('/health');
  }

  static async checkBackendStatus(): Promise<boolean> {
    try {
      await this.getHealth();
      return true;
    } catch {
      return false;
    }
  }
} 