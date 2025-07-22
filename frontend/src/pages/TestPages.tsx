import React from 'react';
import TrueHeroesInterface from '../components/TrueHeroesInterface';
import SimpleGameInterface from '../components/SimpleGameInterface';
import ModernGameInterface from '../components/ModernGameInterface';
import SimpleModernInterface from '../components/SimpleModernInterface';

// Page de test pour TrueHeroesInterface
export const TestTrueHeroesInterface: React.FC = () => {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontFamily: 'monospace'
      }}>
        🧪 TEST: TrueHeroesInterface (Version fixée)
      </div>
      <TrueHeroesInterface />
    </div>
  );
};

// Page de test pour SimpleGameInterface
export const TestSimpleGameInterface: React.FC = () => {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontFamily: 'monospace'
      }}>
        🧪 TEST: SimpleGameInterface
      </div>
      <SimpleGameInterface scenarioId="conquest-classic" />
    </div>
  );
};

// Page de test pour ModernGameInterface
export const TestModernGameInterface: React.FC = () => {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontFamily: 'monospace'
      }}>
        🧪 TEST: ModernGameInterface
      </div>
      <ModernGameInterface />
    </div>
  );
};

// Page de test pour SimpleModernInterface
export const TestSimpleModernInterface: React.FC = () => {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontFamily: 'monospace'
      }}>
        🧪 TEST: SimpleModernInterface
      </div>
      <SimpleModernInterface />
    </div>
  );
}; 