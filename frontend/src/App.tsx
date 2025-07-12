import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';

const GameSelector: React.FC = () => {
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
        <p>Choose your adventure scenario</p>
      </header>
      
      <div className="game-options">
        <Link to="/game/conquete-classique" className="game-option classic">
          <div className="game-icon">🏰</div>
          <h2>Classic Conquest</h2>
          <p>Introduction scenario - Traditional Heroes gameplay</p>
          <div className="game-features">
            <span>⚔️ Turn-based combat</span>
            <span>🏰 Castle capture</span>
            <span>🗺️ Hexagonal maps</span>
          </div>
          <div className="difficulty-indicator easy">EASY</div>
        </Link>
        
        <Link to="/game/mystique-temporel" className="game-option temporal">
          <div className="game-icon">🔮</div>
          <h2>Mystical Conquest</h2>
          <p>Advanced scenario with magical and temporal objects</p>
          <div className="game-features">
            <span>🔮 Temporal objects</span>
            <span>⚡ Advanced magic</span>
            <span>🌀 Mystical portals</span>
          </div>
          <div className="difficulty-indicator hard">ADVANCED</div>
        </Link>

        <Link to="/game/multiplayer-arena" className="game-option multiplayer">
          <div className="game-icon">🌐</div>
          <h2>Multiplayer Arena</h2>
          <p>Compete against other players in real-time battles</p>
          <div className="game-features">
            <span>🏆 Ranked matches</span>
            <span>👥 2-8 players</span>
            <span>⚡ Real-time strategy</span>
          </div>
          <div className="difficulty-indicator multiplayer">COMPETITIVE</div>
        </Link>
      </div>
      
      <div className="rotating-tips">
        <div className="tip-display" key={currentTip}>
          <strong>{tips[currentTip]}</strong>
        </div>
      </div>
      
      <footer className="selector-footer">
        <p>Built with React & TypeScript</p>
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
            path="/" 
            element={<GameSelector />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
