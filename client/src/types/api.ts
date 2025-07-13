export interface ApiResponse {
  message: string;
  timestamp: string;
  javaVersion: string;
  springVersion: string;
}

export interface HealthResponse {
  status: string;
}

export interface SystemStatus {
  frontend: {
    status: 'running' | 'error';
    technology: string;
  };
  backend: {
    status: 'UP' | 'DOWN';
    technology: string;
  };
} 