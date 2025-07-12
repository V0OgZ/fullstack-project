import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import TemporalGame from './pages/TemporalGame';

const GameSelector: React.FC = () => {
  return (
    <div className="game-selector">
      <header className="selector-header">
        <h1>🎮 Heroes Reforged Universe 🎮</h1>
        <p>Choose your strategic adventure</p>
      </header>
      
      <div className="game-options">
        <Link to="/game/demo-game-1" className="game-option classic">
          <div className="game-icon">🏰</div>
          <h2>Heroes Reforged</h2>
          <p>Classic turn-based strategy with async shadow modes</p>
          <div className="game-features">
            <span>✨ ZFC Shadow Actions</span>
            <span>🏛️ Perestroika Politics</span>
            <span>🗺️ Hexagonal Maps</span>
          </div>
        </Link>
        
        <Link to="/temporal" className="game-option temporal">
          <div className="game-icon">⚡</div>
          <h2>Heroes of Time and Magic</h2>
          <p>Revolutionary spacetime strategy - plan actions across time dimensions</p>
          <div className="game-features">
            <span>🕐 Temporal Planning</span>
            <span>🌀 Entropy System</span>
            <span>⚔️ Spacetime Conflicts</span>
          </div>
        </Link>
      </div>
      
      <footer className="selector-footer">
        <p>Built with cutting-edge React & TypeScript</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* Google Fonts pour Cinzel */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        
        <Routes>
          <Route 
            path="/game/:gameId" 
            element={<Game />} 
          />
          <Route 
            path="/temporal" 
            element={<TemporalGame />} 
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
