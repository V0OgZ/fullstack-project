import React from 'react';
import HexagonalTerrainRenderer from './HexagonalTerrainRenderer';

const HexagonalTestPage: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#1a1a2e', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#FFD700', marginBottom: '20px' }}>
        🔷 Hexagonal Terrain Renderer Test
      </h1>
      
      <div style={{ 
        border: '2px solid #FFD700', 
        borderRadius: '10px', 
        padding: '10px',
        backgroundColor: '#2a2a3e'
      }}>
        <HexagonalTerrainRenderer 
          width={800} 
          height={600} 
        />
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        color: '#FFFFFF',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <h2>🎯 Test Features:</h2>
        <ul style={{ textAlign: 'left', color: '#CCCCCC' }}>
          <li>✅ Perfect hexagonal tiles</li>
          <li>✅ Proper terrain colors</li>
          <li>✅ No gaps between tiles</li>
          <li>✅ Efficient space usage</li>
          <li>✅ Clear hexagonal grid</li>
        </ul>
      </div>
    </div>
  );
};

export default HexagonalTestPage; 