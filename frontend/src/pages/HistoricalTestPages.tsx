import React from 'react';
import TrueHeroesInterface_v1 from '../components/TrueHeroesInterface_v1';
import TrueHeroesInterface_v2 from '../components/TrueHeroesInterface_v2';
import TrueHeroesInterface_v3 from '../components/TrueHeroesInterface_v3';

// Page de test pour TrueHeroesInterface Version 1 (afdeae9 - avec Goldorak)
export const TestTrueHeroesInterface_v1: React.FC = () => {
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
        fontFamily: 'monospace',
        fontSize: '12px'
      }}>
        🧪 TEST: TrueHeroesInterface v1<br/>
        📅 Commit: afdeae9 (avec Goldorak)<br/>
        🎯 Version: Avant les problèmes Epic Content
      </div>
      <TrueHeroesInterface_v1 />
    </div>
  );
};

// Page de test pour TrueHeroesInterface Version 2 (741ff81 - système Goldorak)
export const TestTrueHeroesInterface_v2: React.FC = () => {
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
        fontFamily: 'monospace',
        fontSize: '12px'
      }}>
        🧪 TEST: TrueHeroesInterface v2<br/>
        📅 Commit: 741ff81 (système Goldorak)<br/>
        🎯 Version: Avec système retro
      </div>
      <TrueHeroesInterface_v2 />
    </div>
  );
};

// Page de test pour TrueHeroesInterface Version 3 (dd0100d - refactorée)
export const TestTrueHeroesInterface_v3: React.FC = () => {
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
        fontFamily: 'monospace',
        fontSize: '12px'
      }}>
        🧪 TEST: TrueHeroesInterface v3<br/>
        📅 Commit: dd0100d (refactorée)<br/>
        🎯 Version: Interface game refactorée
      </div>
      <TrueHeroesInterface_v3 />
    </div>
  );
}; 