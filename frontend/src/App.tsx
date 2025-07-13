import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import LanguageSelector from './components/LanguageSelector';
// import ScenarioSelector from './components/ScenarioSelector'; // Hidden for now
import { useTranslation } from './i18n';

const GameSelector: React.FC = () => {
  const { t } = useTranslation();
  
  // Random tips that rotate one by one
  const tips = [
    "💡 Both scenarios use the same game interface",
    "🔮 The Mystical scenario adds special objects on the map that you can discover!",
    "🎮 Real-time multiplayer sessions - Play with friends via WebSocket connections",
    "🏰 8 different castle types with unique units and specializations",
    "⚔️ Advanced combat system with tactical positioning on hexagonal battlefields",
    "🧙‍♂️ 30+ magical artifacts including temporal objects that manipulate time",
    "🌍 Dynamic resource management - Gold, Wood, Stone, Mana, and more",
    "🏛️ Political intrigue system with advisors and diplomatic consequences",
    "🎯 Comprehensive game save system - Never lose your progress",
    "🔮 ZFC (Zone de Causalité) - Revolutionary async gameplay mechanics",
    "⚡ Use hotkeys for faster gameplay and strategic advantage",
    "🌟 Discover hidden treasures and ancient artifacts across the map",
    "🔥 Epic boss battles await in the deepest dungeons",
    "🏆 Multiplayer tournaments with seasonal rankings and rewards"
  ];

  const [currentTip, setCurrentTip] = useState(0);

  // Rotate tips every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div className="game-selector">
      <header className="selector-header">
        <h1>🎮 Heroes of Time 🎮</h1>
        <p>{t('chooseScenario')}</p>
        <LanguageSelector />
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
          <button data-testid="start-game-button" className="start-game-btn">
            {t('startGame')}
          </button>
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
          <button data-testid="start-game-button" className="start-game-btn">
            {t('startGame')}
          </button>
        </Link>

        <Link to="/game/multiplayer-arena" className="game-option multiplayer">
          <div className="game-icon">🌐</div>
          <h2>{t('multiplayerArena')}</h2>
          <p>{t('multiplayerArenaDescription')}</p>
          <div className="game-features">
            <span>🏆 {t('rankedMatches')}</span>
            <span>👥 {t('playersRange')}</span>
            <span>⚡ {t('realTimeStrategy')}</span>
          </div>
          <div className="difficulty-indicator multiplayer">{t('competitive')}</div>
          <button data-testid="start-game-button" className="start-game-btn">
            {t('startGame')}
          </button>
        </Link>
      </div>
      
      <div className="rotating-tips">
        <div className="tip-display" key={currentTip}>
          <strong>{tips[currentTip]}</strong>
        </div>
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
      <div className="App" data-testid="app-container">
        <Routes>
          {/* Scenario Selector - Hidden for now, can be restored later */}
          {/* <Route 
            path="/scenarios" 
            element={<ScenarioSelector />} 
          /> */}
          <Route 
            path="/game/:scenarioId" 
            element={<Game />} 
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
