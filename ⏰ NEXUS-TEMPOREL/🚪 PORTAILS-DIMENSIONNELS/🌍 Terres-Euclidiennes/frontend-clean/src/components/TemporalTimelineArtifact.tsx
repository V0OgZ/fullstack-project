import React, { useState, useEffect } from 'react';
import './TemporalTimelineArtifact.css';

interface Timeline {
  id: string;
  name: string;
  version: string;
  description: string;
  icon: string;
  active: boolean;
  component?: React.ComponentType<any>;
}

interface TemporalTimelineArtifactProps {
  onTimelineChange: (timelineId: string) => void;
  currentTimeline: string;
}

const TemporalTimelineArtifact: React.FC<TemporalTimelineArtifactProps> = ({
  onTimelineChange,
  currentTimeline
}) => {
  const [isActivated, setIsActivated] = useState(false);
  const [energyLevel, setEnergyLevel] = useState(100);

  // Configuration des timelines disponibles
  const timelines: Timeline[] = [
    {
      id: 'main',
      name: 'Timeline Principale',
      version: 'v4.0 - Heroes of Time',
      description: 'Interface principale avec Epic Content Viewer, dark fantasy theme',
      icon: '🏛️',
      active: true
    },
    {
      id: 'enhanced',
      name: 'Timeline Améliorée', 
      version: 'v3.5 - Enhanced Interface',
      description: 'Interface avec terrain renderer et système hexagonal',
      icon: '🎮',
      active: true
    },
    {
      id: 'legacy_v1',
      name: 'Timeline Historique v1',
      version: 'v1.0 - Goldorak Era',
      description: 'Première version avec easter egg Goldorak',
      icon: '🤖',
      active: false
    },
    {
      id: 'legacy_v2', 
      name: 'Timeline Historique v2',
      version: 'v2.0 - Retro System',
      description: 'Version avec système rétro et fonctionnalités avancées',
      icon: '🚀',
      active: false
    },
    {
      id: 'temporal',
      name: 'Timeline Temporale',
      version: 'vX.0 - Temporal Interface',
      description: 'Interface temporelle avec contrôles de chronologie',
      icon: '⏰',
      active: false
    }
  ];

  // Animation de l'artefact
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyLevel(prev => {
        const newLevel = prev - 1;
        return newLevel <= 0 ? 100 : newLevel;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleActivateArtifact = () => {
    setIsActivated(!isActivated);
  };

  const handleTimelineSelect = (timelineId: string) => {
    const timeline = timelines.find(t => t.id === timelineId);
    if (timeline) {
      onTimelineChange(timelineId);
      setIsActivated(false);
    }
  };

  const currentTimelineData = timelines.find(t => t.id === currentTimeline);

  return (
    <div className="temporal-artifact-container">
      {/* Artefact Central */}
      <div 
        className={`temporal-artifact ${isActivated ? 'activated' : ''}`}
        onClick={handleActivateArtifact}
        title="Artefact de Cohabitation Temporelle"
      >
        <div className="artifact-core">
          <div className="energy-ring" style={{
            transform: `rotate(${(100 - energyLevel) * 3.6}deg)`
          }}>
            <div className="energy-particles"></div>
          </div>
          <div className="artifact-symbol">⧖</div>
        </div>
        
        <div className="artifact-info">
          <div className="artifact-name">Nexus Temporel</div>
          <div className="artifact-power">Énergie: {energyLevel}%</div>
        </div>
      </div>

      {/* Timeline Selector */}
      {isActivated && (
        <div className="timeline-selector">
          <div className="selector-header">
            <h3>🌌 Cohabitation des Timelines</h3>
            <p>Sélectionnez la timeline à explorer</p>
          </div>

          <div className="current-timeline">
            <div className="current-indicator">Timeline Actuelle:</div>
            <div className="timeline-card active">
              <span className="timeline-icon">{currentTimelineData?.icon}</span>
              <div className="timeline-details">
                <div className="timeline-name">{currentTimelineData?.name}</div>
                <div className="timeline-version">{currentTimelineData?.version}</div>
              </div>
            </div>
          </div>

          <div className="timelines-grid">
            {timelines.filter(t => t.id !== currentTimeline).map(timeline => (
              <div
                key={timeline.id}
                className={`timeline-card ${timeline.active ? 'available' : 'dormant'}`}
                onClick={() => timeline.active && handleTimelineSelect(timeline.id)}
                title={timeline.description}
              >
                <span className="timeline-icon">{timeline.icon}</span>
                <div className="timeline-details">
                  <div className="timeline-name">{timeline.name}</div>
                  <div className="timeline-version">{timeline.version}</div>
                  <div className="timeline-status">
                    {timeline.active ? '✅ Disponible' : '🔒 Dormante'}
                  </div>
                </div>
                
                {timeline.active && (
                  <div className="timeline-actions">
                    <button className="activate-btn">
                      Basculer
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="artifact-controls">
            <button 
              className="close-artifact-btn"
              onClick={() => setIsActivated(false)}
            >
              Fermer le Nexus
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemporalTimelineArtifact; 