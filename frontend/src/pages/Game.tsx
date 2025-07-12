import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TrueHeroesInterface from '../components/TrueHeroesInterface';
import { useTranslation } from '../i18n';

const Game: React.FC = () => {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const { t } = useTranslation();
  const [scenarioType, setScenarioType] = useState<'classique' | 'mystique'>('classique');

  useEffect(() => {
    // Déterminer le type de scénario
    if (scenarioId === 'mystique-temporel') {
      setScenarioType('mystique');
      console.log('🔮 Loading Mystique scenario with temporal objects...');
    } else {
      setScenarioType('classique');
      console.log('🏰 Loading Classic scenario...');
    }
  }, [scenarioId]);

  if (!scenarioId) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1a1a',
        color: 'white'
      }}>
        <h2>❌ Scénario non trouvé</h2>
      </div>
    );
  }

  return (
    <div className="game-page">
      {/* Utiliser la même interface Heroes pour les deux scénarios */}
      <TrueHeroesInterface 
        playerCount={2} 
        scenarioType={scenarioType}
        scenarioId={scenarioId}
      />
    </div>
  );
};

export default Game; 