import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import EnhancedScenarioSelector from './components/EnhancedScenarioSelector';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<EnhancedScenarioSelector />} />
          <Route path="/game/:scenarioId" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
