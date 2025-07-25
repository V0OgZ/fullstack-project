import React, { useState, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import './HeroFPV.css';

interface HeroFPVProps {
  heroId: string;
  worldId: string;
}

export const HeroFPV: React.FC<HeroFPVProps> = ({ heroId, worldId }) => {
  const { currentPlayer, worldState } = useGameState();
  const [heroExpression, setHeroExpression] = useState('neutral');
  const [environmentClass, setEnvironmentClass] = useState('');
  
  useEffect(() => {
    // Synchroniser avec l'état du monde
    const worldFormula = worldState.worlds[worldId]?.world_formula;
    if (worldFormula) {
      setEnvironmentClass(`world-${worldId.toLowerCase()}`);
    }
  }, [worldId, worldState]);
  
  const handleAction = (action: string) => {
    // Ford: "N'exécute jamais un script sans savoir s'il va t'observer"
    console.log(`[FORD OBSERVER] Action: ${action} by ${heroId}`);
    setHeroExpression('action');
    setTimeout(() => setHeroExpression('neutral'), 1000);
  };
  
  return (
    <div className={`hero-fpv ${environmentClass}`}>
      <div className="fpv-header">
        <h3>{currentPlayer.name}</h3>
        <div className="hero-stats">
          <span>❤️ {currentPlayer.health}</span>
          <span>⚔️ {currentPlayer.attack}</span>
          <span>🛡️ {currentPlayer.defense}</span>
        </div>
      </div>
      
      <div className="fpv-viewport">
        <div className="hero-portrait">
          <img 
            src={`/assets/heroes/${heroId}_${heroExpression}.png`}
            alt={currentPlayer.name}
            className="hero-image"
          />
          <div className="expression-overlay" />
        </div>
        
        <div className="environment-view">
          <div className="world-effects" />
          <div className="interactive-elements">
            {/* Éléments interactifs du monde */}
          </div>
        </div>
      </div>
      
      <div className="fpv-dialogue">
        <p className="ford-wisdom">
          "Tu ne peux pas échouer si tu sais qui tu es dans le monde."
        </p>
      </div>
      
      <div className="fpv-actions">
        <button onClick={() => handleAction('move')}>Move</button>
        <button onClick={() => handleAction('interact')}>Interact</button>
        <button onClick={() => handleAction('cast')}>Cast Spell</button>
      </div>
    </div>
  );
};

export default HeroFPV;