import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';

const GameSelector: React.FC = () => {
  return (
    <div className="game-selector">
      <header className="selector-header">
        <h1>🎮 Heroes Reforged 🎮</h1>
        <p>Choisissez votre scénario d'aventure</p>
      </header>
      
      <div className="game-options">
        <Link to="/game/conquete-classique" className="game-option classic">
          <div className="game-icon">🏰</div>
          <h2>Conquête Classique</h2>
          <p>Scénario d'introduction - Heroes traditionnel</p>
          <div className="game-features">
            <span>⚔️ Combat au tour par tour</span>
            <span>🏰 Capture des châteaux</span>
            <span>🗺️ Cartes hexagonales</span>
          </div>
          <div className="difficulty-indicator easy">FACILE</div>
        </Link>
        
        <Link to="/game/mystique-temporel" className="game-option temporal">
          <div className="game-icon">🔮</div>
          <h2>Conquête Mystique</h2>
          <p>Scénario avancé avec objets magiques et temporels</p>
          <div className="game-features">
            <span>🔮 Objets temporels</span>
            <span>⚡ Magie avancée</span>
            <span>🌀 Portails mystiques</span>
          </div>
          <div className="difficulty-indicator hard">AVANCÉ</div>
        </Link>
      </div>
      
      <div className="scenario-explanation">
        <p>💡 <strong>Les deux scénarios utilisent la même interface de jeu</strong></p>
        <p>Le scénario Mystique ajoute des objets spéciaux sur la carte que vous pouvez découvrir !</p>
      </div>
      
      <footer className="selector-footer">
        <p>Construit avec React & TypeScript</p>
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
