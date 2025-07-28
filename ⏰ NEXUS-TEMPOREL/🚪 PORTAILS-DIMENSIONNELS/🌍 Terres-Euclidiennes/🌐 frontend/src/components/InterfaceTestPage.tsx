import React from 'react';
import { Link } from 'react-router-dom';
import SimpleSquareUI from './SimpleSquareUI';

const InterfaceTestPage: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
      minHeight: '100vh',
      color: '#f5f5f5'
    }}>
      <h1 style={{ color: '#e94560', textAlign: 'center', marginBottom: '30px' }}>
        🎮 Heroes of Time - Interface Test Center
      </h1>
      
      {/* SimpleSquareUI intégré avec données de test */}
      <SimpleSquareUI 
        heroName="Arthur"
        worldName="Valisson"
        health={85}
        maxHealth={100}
        energy={42}
        maxEnergy={50}
      />
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginTop: '20px'
      }}>
        <div style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '20px', 
          borderRadius: '10px',
          border: '1px solid #e94560'
        }}>
          <h3>🎯 Interface Tests</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/test/true-heroes" style={{ color: '#3498db', textDecoration: 'none' }}>✨ True Heroes Interface</Link></li>
            <li><Link to="/test/simple-game" style={{ color: '#3498db', textDecoration: 'none' }}>🎮 Simple Game Interface</Link></li>
            <li><Link to="/test/modern-game" style={{ color: '#3498db', textDecoration: 'none' }}>🚀 Modern Game Interface</Link></li>
            <li><Link to="/test/simple-modern" style={{ color: '#3498db', textDecoration: 'none' }}>💎 Simple Modern Interface</Link></li>
          </ul>
        </div>
        
        <div style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '20px', 
          borderRadius: '10px',
          border: '1px solid #e94560'
        }}>
          <h3>🧪 Specialized Tests</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/hexagon-test" style={{ color: '#3498db', textDecoration: 'none' }}>🔷 Hexagonal Grid Test</Link></li>
            <li><Link to="/offline-avatar-test" style={{ color: '#3498db', textDecoration: 'none' }}>🖼️ Offline Avatar Test</Link></li>
          </ul>
        </div>

        <div style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '20px', 
          borderRadius: '10px',
          border: '1px solid #e94560'
        }}>
          <h3>🎯 Live Game</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/game/conquest-classic" style={{ color: '#3498db', textDecoration: 'none' }}>⚔️ Conquest Classic</Link></li>
            <li><Link to="/multiplayer" style={{ color: '#3498db', textDecoration: 'none' }}>👥 Multiplayer</Link></li>
            <li><Link to="/demo" style={{ color: '#3498db', textDecoration: 'none' }}>🎮 Demo Mode</Link></li>
          </ul>
        </div>
        
        <div style={{ 
          background: 'rgba(233, 69, 96, 0.2)', 
          padding: '20px', 
          borderRadius: '10px',
          border: '1px solid #e94560'
        }}>
          <h3>✨ SimpleSquareUI Demo</h3>
          <p>L'interface "petit carré" est maintenant intégrée ! 👉</p>
          <p>✅ Design 300x300px élégant</p>
          <p>✅ Stats animées (santé/énergie)</p>
          <p>✅ Actions rapides au clic</p>
          <p>✅ Position fixe en bas à droite</p>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '30px', 
        textAlign: 'center', 
        opacity: 0.7 
      }}>
        <p>🌟 Heroes of Time - Interface Testing Environment</p>
        <p>Backend API: <span style={{ color: '#2ecc71' }}>http://localhost:8080</span></p>
      </div>
    </div>
  );
};

export default InterfaceTestPage; 