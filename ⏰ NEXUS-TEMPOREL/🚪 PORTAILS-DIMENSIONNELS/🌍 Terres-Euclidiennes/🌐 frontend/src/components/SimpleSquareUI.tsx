import React, { useState } from 'react';
import './SimpleSquareUI.css';

interface SimpleSquareUIProps {
  heroName?: string;
  worldName?: string;
  health?: number;
  maxHealth?: number;
  energy?: number;
  maxEnergy?: number;
}

const SimpleSquareUI: React.FC<SimpleSquareUIProps> = ({
  heroName = "Héros",
  worldName = "Valisson",
  health = 100,
  maxHealth = 100,
  energy = 50,
  maxEnergy = 50
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="simple-square-container">
      <div className="main-square" onClick={() => setIsExpanded(!isExpanded)}>
        {/* Section Héros */}
        <div className="hero-section">
          <div className="hero-icon">⚔️</div>
          <div className="hero-name">{heroName}</div>
        </div>

        {/* Barres de stats */}
        <div className="stats-section">
          <div className="stat-bar">
            <div className="stat-icon">❤️</div>
            <div className="bar-container">
              <div 
                className="bar-fill health-fill" 
                style={{width: `${(health/maxHealth)*100}%`}}
              />
            </div>
            <div className="stat-value">{health}</div>
          </div>

          <div className="stat-bar">
            <div className="stat-icon">✨</div>
            <div className="bar-container">
              <div 
                className="bar-fill energy-fill" 
                style={{width: `${(energy/maxEnergy)*100}%`}}
              />
            </div>
            <div className="stat-value">{energy}</div>
          </div>
        </div>

        {/* Monde actuel */}
        <div className="world-section">
          <div className="world-icon">🌍</div>
          <div className="world-name">{worldName}</div>
        </div>
      </div>

      {/* Actions rapides (visible si étendu) */}
      {isExpanded && (
        <div className="quick-actions">
          <button className="action-btn">🗡️ Attaquer</button>
          <button className="action-btn">🛡️ Défendre</button>
          <button className="action-btn">🌀 Transcender</button>
          <button className="action-btn">📜 Inventaire</button>
        </div>
      )}
    </div>
  );
};

export default SimpleSquareUI;