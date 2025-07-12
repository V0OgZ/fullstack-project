import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';

const GameSelector: React.FC = () => {
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
      </div>
      
      <div className="scenario-explanation">
        <p>💡 <strong>Both scenarios use the same game interface</strong></p>
        <p>The Mystical scenario adds special objects on the map that you can discover!</p>
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
