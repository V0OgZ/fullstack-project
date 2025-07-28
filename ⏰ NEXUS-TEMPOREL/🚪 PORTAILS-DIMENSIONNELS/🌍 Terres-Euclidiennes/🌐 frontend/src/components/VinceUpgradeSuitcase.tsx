import React, { useState, useEffect, useRef } from 'react';
import './VinceUpgradeSuitcase.css';

interface VinceUpgradeSuitcaseProps {
  onSourceUpgrade?: (instanceData: any) => void;
  onTemporalInstance?: (instanceConfig: any) => void;
  grofiLevel?: number;
  isActive?: boolean;
}

const VinceUpgradeSuitcase: React.FC<VinceUpgradeSuitcaseProps> = ({
  onSourceUpgrade,
  onTemporalInstance,
  grofiLevel = 1,
  isActive = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [upgradeProgress, setUpgradeProgress] = useState(0);
  const [temporalInstanceActive, setTemporalInstanceActive] = useState(false);
  const [sourceEnergy, setSourceEnergy] = useState(100);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-activation GROFI SAIYAN LEVEL 2
  useEffect(() => {
    if (grofiLevel >= 2) {
      setIsOpen(true);
      startSourceUpgrade();
    }
  }, [grofiLevel]);

  const startSourceUpgrade = () => {
    if (!isActive || upgradeProgress > 0) return;

    setUpgradeProgress(1);
    
    intervalRef.current = setInterval(() => {
      setUpgradeProgress(prev => {
        const newProgress = prev + 2;
        
        if (newProgress >= 100) {
          clearInterval(intervalRef.current!);
          activateTemporalInstance();
          return 100;
        }
        
        return newProgress;
      });
    }, 50);
  };

  const activateTemporalInstance = () => {
    setTemporalInstanceActive(true);
    
    const instanceConfig = {
      instanceId: `temporal_${Date.now()}`,
      duration: 30000, // 30 secondes
      sourceMultiplier: grofiLevel * 2,
      quantumStabilization: true,
      grufVisionEnabled: true,
      anchorTower: true
    };

    if (onTemporalInstance) {
      onTemporalInstance(instanceConfig);
    }

    // Décompte de l'instance temporaire
    setTimeout(() => {
      setTemporalInstanceActive(false);
      setUpgradeProgress(0);
      setSourceEnergy(100);
    }, 30000);
  };

  const handleManualUpgrade = () => {
    if (upgradeProgress === 100 && !temporalInstanceActive) {
      const upgradeData = {
        sourceLevel: grofiLevel + 1,
        energyBoost: sourceEnergy * (grofiLevel * 0.5),
        temporalAccess: true,
        vinceSignature: true
      };

      if (onSourceUpgrade) {
        onSourceUpgrade(upgradeData);
      }
    }
  };

  const handleEmergencyReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setUpgradeProgress(0);
    setTemporalInstanceActive(false);
    setSourceEnergy(100);
    setIsOpen(false);
  };

  return (
    <div className={`vince-suitcase ${isOpen ? 'open' : 'closed'} ${temporalInstanceActive ? 'temporal-active' : ''} grofi-level-${grofiLevel}`}>
      
      {/* Malette fermée */}
      {!isOpen && (
        <div className="suitcase-closed" onClick={() => setIsOpen(true)}>
          <div className="suitcase-handle" />
          <div className="suitcase-body">
            <div className="vince-logo">V</div>
            <div className="suitcase-locks">
              <div className="lock lock-1" />
              <div className="lock lock-2" />
            </div>
          </div>
          <div className="suitcase-label">VINCE UPGRADE</div>
        </div>
      )}

      {/* Malette ouverte */}
      {isOpen && (
        <div className="suitcase-open">
          <div className="suitcase-lid">
            <div className="lid-interior">
              <div className="vince-signature">
                "Time is just another<br/>
                dimension to hack"<br/>
                <span className="signature">- V. Vega</span>
              </div>
            </div>
          </div>

          <div className="suitcase-interior">
            {/* Interface de contrôle */}
            <div className="control-panel">
              <div className="panel-header">
                🌀 GROFI SAIYAN LEVEL {grofiLevel}
              </div>

              {/* Jauge d'upgrade */}
              <div className="upgrade-section">
                <div className="section-label">SOURCE UPGRADE</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${upgradeProgress}%` }}
                  />
                  <div className="progress-text">{upgradeProgress}%</div>
                </div>
                
                {upgradeProgress === 100 && !temporalInstanceActive && (
                  <button 
                    className="upgrade-btn ready"
                    onClick={handleManualUpgrade}
                  >
                    🚀 ACTIVER UPGRADE
                  </button>
                )}
                
                {upgradeProgress > 0 && upgradeProgress < 100 && (
                  <div className="upgrade-status">
                    ⚡ Préparation en cours...
                  </div>
                )}
              </div>

              {/* Instance temporaire */}
              {temporalInstanceActive && (
                <div className="temporal-section active">
                  <div className="section-label">INSTANCE TEMPORAIRE</div>
                  <div className="temporal-display">
                    <div className="temporal-icon">🌌</div>
                    <div className="temporal-info">
                      <div>Instance Active</div>
                      <div className="temporal-effects">
                        ✅ Source x{grofiLevel * 2}<br/>
                        ✅ Stabilisation Quantique<br/>
                        ✅ Vision GRUT<br/>
                        ✅ Tour d'Ancrage
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Énergie Source */}
              <div className="energy-section">
                <div className="section-label">ÉNERGIE SOURCE</div>
                <div className="energy-display">
                  <div className="energy-bar">
                    <div 
                      className="energy-fill"
                      style={{ width: `${sourceEnergy}%` }}
                    />
                  </div>
                  <div className="energy-value">{sourceEnergy}%</div>
                </div>
              </div>

              {/* Boutons de contrôle */}
              <div className="control-buttons">
                <button 
                  className="control-btn start"
                  onClick={startSourceUpgrade}
                  disabled={upgradeProgress > 0 || !isActive}
                >
                  🌀 DÉMARRER
                </button>
                
                <button 
                  className="control-btn emergency"
                  onClick={handleEmergencyReset}
                >
                  🚨 RESET
                </button>
                
                <button 
                  className="control-btn close"
                  onClick={() => setIsOpen(false)}
                >
                  📦 FERMER
                </button>
              </div>
            </div>

            {/* Compartiments d'outils */}
            <div className="tool-compartments">
              <div className="compartment">
                <div className="tool temporal-anchor">⚓</div>
                <div className="tool-label">Ancrage</div>
              </div>
              <div className="compartment">
                <div className="tool quantum-key">🔑</div>
                <div className="tool-label">Clé Quantique</div>
              </div>
              <div className="compartment">
                <div className="tool source-amplifier">📡</div>
                <div className="tool-label">Amplificateur</div>
              </div>
              <div className="compartment">
                <div className="tool reality-wrench">🔧</div>
                <div className="tool-label">Clé Réalité</div>
              </div>
            </div>
          </div>

          {/* Effets visuels temporels */}
          {temporalInstanceActive && (
            <div className="temporal-effects">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`temporal-particle particle-${i}`} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Indicateur GROFI SAIYAN */}
      {grofiLevel >= 2 && (
        <div className="grofi-indicator">
          <div className="grofi-aura" />
          <div className="grofi-text">
            GROFI SAIYAN LV.{grofiLevel}
          </div>
        </div>
      )}
    </div>
  );
};

export default VinceUpgradeSuitcase; 