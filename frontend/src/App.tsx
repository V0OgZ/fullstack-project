import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import EnhancedScenarioSelector from './components/EnhancedScenarioSelector';
import OfflineAvatarTest from './components/OfflineAvatarTest';
import HexagonalTestPage from './components/HexagonalTestPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<EnhancedScenarioSelector />} />
          <Route path="/game/:scenarioId" element={<Game />} />
          <Route path="/multiplayer" element={<Game />} />
          <Route path="/demo" element={<Game />} />
          <Route path="/offline-avatar-test" element={<OfflineAvatarTest />} />
          <Route path="/hexagon-test" element={<HexagonalTestPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
