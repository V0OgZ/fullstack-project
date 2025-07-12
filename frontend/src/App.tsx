import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import { useGameStore } from './store/useGameStore';

const App: React.FC = () => {
  const { currentGame, isLoading, error } = useGameStore();

  // For now, we'll show a demo game interface
  // In a real app, you'd have proper authentication and game selection
  const demoGameId = 'demo-game-1';

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
            path="/" 
            element={<Navigate to={`/game/${demoGameId}`} replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
