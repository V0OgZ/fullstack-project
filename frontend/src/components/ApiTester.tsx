import React, { useState } from 'react';
import { ApiResponse } from '../types/api';
import { ApiService } from '../services/api';

const ApiTester: React.FC = () => {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApiData = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await ApiService.getHello();
      setApiData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch API data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-section">
      <h2>Backend API Test</h2>
      <button 
        onClick={fetchApiData}
        disabled={loading}
        className="api-button"
      >
        {loading ? 'Loading...' : 'Fetch API Data'}
      </button>

      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}

      {apiData && (
        <div className="api-response">
          <h3>API Response:</h3>
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiTester; 