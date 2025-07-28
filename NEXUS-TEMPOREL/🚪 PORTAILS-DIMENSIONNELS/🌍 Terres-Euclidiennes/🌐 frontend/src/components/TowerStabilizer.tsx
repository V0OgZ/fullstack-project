import React, { useState, useEffect } from 'react';
import './TowerStabilizer.css';

interface TowerStabilizerProps {
  quantumStress?: number;
  isActive?: boolean;
  onStabilize?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const TowerStabilizer: React.FC<TowerStabilizerProps> = ({
  quantumStress = 0,
  isActive = true,
  onStabilize,
  position = 'bottom-right'
}) => {
  const [stabilizing, setStabilizing] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

  // Détecter les surcharges quantiques (piège OmégaZero)
  useEffect(() => {
    if (quantumStress > 75) {
      setEmergencyMode(true);
      // Auto-stabilisation d'urgence
      handleStabilize();
    } else {
      setEmergencyMode(false);
    }
  }, [quantumStress]);

  const handleStabilize = () => {
    if (!isActive || stabilizing) return;
    
    setStabilizing(true);
    
    // Animation de stabilisation
    setTimeout(() => {
      setStabilizing(false);
      if (onStabilize) {
        onStabilize();
      }
    }, 2000);
  };

  const getStressLevel = () => {
    if (quantumStress < 25) return 'stable';
    if (quantumStress < 50) return 'warning';
    if (quantumStress < 75) return 'danger';
    return 'critical';
  };

  return (
    <div className={`tower-stabilizer ${position} ${getStressLevel()} ${emergencyMode ? 'emergency' : ''}`}>
      {/* Tour Domburg Image */}
      <div className="tower-container">
        <img 
          src="/assets/img/Domburg_tower.webp" 
          alt="Tour Stabilisatrice Domburg"
          className={`tower-image ${stabilizing ? 'stabilizing' : ''} ${emergencyMode ? 'emergency-glow' : ''}`}
          onClick={handleStabilize}
        />
        
        {/* Particules quantiques */}
        {(stabilizing || emergencyMode) && (
          <div className="quantum-particles">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`particle particle-${i}`} />
            ))}
          </div>
        )}
        
        {/* Aura de protection */}
        <div className={`protection-aura ${stabilizing ? 'active' : ''}`} />
      </div>

      {/* Interface de contrôle */}
      <div className="tower-controls">
        <div className="stress-meter">
          <div className="stress-label">Stress Quantique</div>
          <div className="stress-bar">
            <div 
              className={`stress-fill ${getStressLevel()}`}
              style={{ width: `${Math.min(quantumStress, 100)}%` }}
            />
          </div>
          <div className="stress-value">{quantumStress.toFixed(1)}%</div>
        </div>

        <button 
          className={`stabilize-btn ${stabilizing ? 'stabilizing' : ''} ${!isActive ? 'disabled' : ''}`}
          onClick={handleStabilize}
          disabled={!isActive || stabilizing}
        >
          {stabilizing ? '🌀 Stabilisation...' : '🏛️ STABILISER'}
        </button>

        {emergencyMode && (
          <div className="emergency-alert">
            ⚠️ PIÈGE DÉTECTÉ<br/>
            Auto-Stabilisation
          </div>
        )}
      </div>

      {/* Messages de statut */}
      <div className="tower-status">
        {emergencyMode ? (
          <span className="status-emergency">🚨 MODE URGENCE - CONTRE-ATTAQUE OMEGA</span>
        ) : stabilizing ? (
          <span className="status-stabilizing">🌀 Stabilisation en cours...</span>
        ) : isActive ? (
          <span className="status-ready">🛡️ Tour Prête - Protection Active</span>
        ) : (
          <span className="status-inactive">💤 Tour Inactive</span>
        )}
      </div>
    </div>
  );
};

export default TowerStabilizer; 