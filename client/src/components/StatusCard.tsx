import React from 'react';
import { HealthResponse } from '../types/api';

interface StatusCardProps {
  healthStatus: HealthResponse | null;
}

const StatusCard: React.FC<StatusCardProps> = ({ healthStatus }) => {
  return (
    <div className="status-section">
      <h2>System Status</h2>
      <div className="status-grid">
        <div className="status-item">
          <span className="status-label">Frontend:</span>
          <span className="status-value success">React + TypeScript ✅</span>
        </div>
        <div className="status-item">
          <span className="status-label">Backend:</span>
          <span className={`status-value ${healthStatus?.status === 'UP' ? 'success' : 'error'}`}>
            Spring Boot + Java 21 {healthStatus?.status === 'UP' ? '✅' : '❌'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard; 