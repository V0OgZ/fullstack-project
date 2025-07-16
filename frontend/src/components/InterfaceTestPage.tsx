import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InterfaceTestPage.css';

const InterfaceTestPage: React.FC = () => {
  const navigate = useNavigate();

  const testVersions = [
    {
      id: 'true-heroes',
      name: '🎮 TrueHeroesInterface',
      description: 'Version principale avec boutons de contrôle',
      route: '/test/true-heroes',
      color: '#4CAF50'
    },
    {
      id: 'simple-game',
      name: '🎯 SimpleGameInterface',
      description: 'Interface simple avec sidebar',
      route: '/test/simple-game',
      color: '#2196F3'
    },
    {
      id: 'modern-game',
      name: '✨ ModernGameInterface',
      description: 'Interface moderne avec animations',
      route: '/test/modern-game',
      color: '#9C27B0'
    },
    {
      id: 'simple-modern',
      name: '🎨 SimpleModernInterface',
      description: 'Interface moderne simplifiée',
      route: '/test/simple-modern',
      color: '#FF9800'
    },
    {
      id: 'current-game',
      name: '🔄 Current Game Route',
      description: 'Route actuelle /game/conquest-classic',
      route: '/game/conquest-classic',
      color: '#F44336'
    }
  ];

  const handleTestVersion = (route: string) => {
    console.log(`🔍 Testing interface version: ${route}`);
    navigate(route);
  };

  return (
    <div className="interface-test-page">
      <div className="test-header">
        <h1>🧪 Interface Diagnostic Tool</h1>
        <p>Testez les différentes versions de l'interface pour identifier laquelle fonctionne</p>
      </div>

      <div className="test-grid">
        {testVersions.map((version) => (
          <button
            key={version.id}
            className="test-button"
            style={{ '--button-color': version.color } as React.CSSProperties}
            onClick={() => handleTestVersion(version.route)}
          >
            <div className="test-button-icon">
              {version.name.split(' ')[0]}
            </div>
            <div className="test-button-content">
              <h3>{version.name}</h3>
              <p>{version.description}</p>
            </div>
            <div className="test-button-arrow">→</div>
          </button>
        ))}
      </div>

      <div className="test-info">
        <h2>🔍 Instructions de test</h2>
        <ol>
          <li>Cliquez sur chaque bouton pour tester l'interface</li>
          <li>Vérifiez si vous voyez :</li>
          <ul>
            <li>✅ Boutons de contrôle au centre (📋 ⚔️ 🎒 🏰)</li>
            <li>✅ Bouton Epic Content (🧟)</li>
            <li>✅ Bouton End Turn (⭐)</li>
            <li>✅ Panel droit fonctionnel</li>
          </ul>
          <li>Notez quelle version fonctionne correctement</li>
        </ol>
      </div>

      <div className="test-debug">
        <h3>🐛 Debug Info</h3>
        <p>URL actuelle : {window.location.pathname}</p>
        <p>Timestamp : {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default InterfaceTestPage; 