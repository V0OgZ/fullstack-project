import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import EnhancedScenarioSelector from './components/EnhancedScenarioSelector';
import OfflineAvatarTest from './components/OfflineAvatarTest';
import HexagonalTestPage from './components/HexagonalTestPage';
import InterfaceTestPage from './components/InterfaceTestPage';
import { 
  TestTrueHeroesInterface, 
  TestSimpleGameInterface, 
  TestModernGameInterface, 
  TestSimpleModernInterface 
} from './pages/TestPages';
import { 
  TestTrueHeroesInterface_v1, 
  TestTrueHeroesInterface_v2, 
  TestTrueHeroesInterface_v3 
} from './pages/HistoricalTestPages';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<InterfaceTestPage />} />
          <Route path="/old-home" element={<EnhancedScenarioSelector />} />
          <Route path="/game/:scenarioId" element={<Game />} />
          <Route path="/multiplayer" element={<Game />} />
          <Route path="/demo" element={<Game />} />
          <Route path="/offline-avatar-test" element={<OfflineAvatarTest />} />
          <Route path="/hexagon-test" element={<HexagonalTestPage />} />
          
          {/* Routes de test pour les interfaces */}
          <Route path="/test/true-heroes" element={<TestTrueHeroesInterface />} />
          <Route path="/test/true-heroes-v1" element={<TestTrueHeroesInterface_v1 />} />
          <Route path="/test/true-heroes-v2" element={<TestTrueHeroesInterface_v2 />} />
          <Route path="/test/true-heroes-v3" element={<TestTrueHeroesInterface_v3 />} />
          <Route path="/test/simple-game" element={<TestSimpleGameInterface />} />
          <Route path="/test/modern-game" element={<TestModernGameInterface />} />
          <Route path="/test/simple-modern" element={<TestSimpleModernInterface />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
