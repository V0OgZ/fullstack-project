import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import BackendTester from './components/BackendTester';
import MultiplayerSessionManager from './components/MultiplayerSessionManager';
import { useTranslation } from './i18n';

const GameSelector: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="game-selector">
      <header className="selector-header">
        <h1>🎮 Heroes Reforged 🎮</h1>
        <p>{t('chooseScenario')}</p>
      </header>
      
      <div className="game-options">
        <Link to="/game/conquete-classique" className="game-option classic">
          <div className="game-icon">🏰</div>
          <h2>{t('classicConquest')}</h2>
          <p>{t('classicDescription')}</p>
          <div className="game-features">
            <span>⚔️ {t('turnBasedCombat')}</span>
            <span>🏰 {t('captureBuildings')}</span>
            <span>🗺️ {t('hexagonalMaps')}</span>
          </div>
          <div className="difficulty-indicator easy">{t('easy')}</div>
        </Link>
        
        <Link to="/game/mystique-temporel" className="game-option temporal">
          <div className="game-icon">🔮</div>
          <h2>{t('mysticalConquest')}</h2>
          <p>{t('mysticalDescription')}</p>
          <div className="game-features">
            <span>🔮 {t('temporalObjects')}</span>
            <span>⚡ {t('advancedMagic')}</span>
            <span>🌀 {t('mysticPortals')}</span>
          </div>
          <div className="difficulty-indicator hard">{t('advanced')}</div>
        </Link>
      </div>
      
      <div className="scenario-explanation">
        <p>💡 <strong>{t('sameInterface')}</strong></p>
        <p>{t('mysticalAddsObjects')}</p>
      </div>
      
      <div className="backend-test-section">
        <Link to="/backend-test" className="backend-test-link">
          🔧 {t('testBackendConnection')}
        </Link>
      </div>
      
      <footer className="selector-footer">
        <p>{t('builtWith')}</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/game/:scenarioId" 
            element={<Game />} 
          />
          <Route 
            path="/backend-test" 
            element={<BackendTester />} 
          />
          <Route 
            path="/multiplayer" 
            element={<MultiplayerSessionManager onSessionJoined={(sessionId: string) => console.log('Joined session:', sessionId)} onError={(error: string) => console.error(error)} />} 
          />
          <Route 
            path="/" 
            element={<GameSelector />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
