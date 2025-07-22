import React, { useState } from 'react';
import TrueHeroesInterface from './TrueHeroesInterface';
import './TimelinesDashboard.css';

interface TimelineEntry {
  id: string;
  name: string;
  version: string;
  description: string;
  icon: string;
  screenshot?: string;
  available: boolean;
  component: React.ComponentType<any>;
}

const TimelinesDashboard: React.FC = () => {
  const [currentTimeline, setCurrentTimeline] = useState('main');
  const [showDashboard, setShowDashboard] = useState(false);

  // Configuration des timelines avec leurs composants
  const timelines: TimelineEntry[] = [
    {
      id: 'main',
      name: 'Interface Principale',
      version: 'v4.0 - Heroes of Time',
      description: 'Interface actuelle avec Epic Content Viewer intégré, thème dark fantasy, et artefact temporel',
      icon: '🏛️',
      available: true,
      component: TrueHeroesInterface
    },
    {
      id: 'enhanced',
      name: 'Interface Améliorée',
      version: 'v3.5 - Enhanced Sidebar',
      description: 'Version avec sidebar amélioré et système de panneaux avancés',
      icon: '🎮',
      available: true,
      component: TrueHeroesInterface
    },
    {
      id: 'legacy_goldorak',
      name: 'Ère Goldorak',
      version: 'v1.0 - Goldorak Easter Egg',
      description: 'Version historique avec easter egg Goldorak et interface rétro',
      icon: '🤖',
      available: false,
      component: TrueHeroesInterface
    },
    {
      id: 'legacy_retro',
      name: 'Système Rétro',
      version: 'v2.0 - Retro Interface',
      description: 'Interface avec thème rétro et fonctionnalités vintage',
      icon: '🚀',
      available: false,
      component: TrueHeroesInterface
    }
  ];

  const currentTimelineData = timelines.find(t => t.id === currentTimeline);
  const CurrentComponent = currentTimelineData?.component || TrueHeroesInterface;

  return (
    <div className="timelines-dashboard">
      {/* Bouton Dashboard flottant */}
      <button 
        className="dashboard-toggle"
        onClick={() => setShowDashboard(!showDashboard)}
        title="Ouvrir Dashboard des Timelines"
      >
        🌌
      </button>

      {/* Interface actuelle */}
      <div className="current-interface">
        <CurrentComponent 
          onNavigate={(page: string) => {
            console.log(`[DASHBOARD] Navigation vers: ${page}`);
          }}
        />
      </div>

      {/* Dashboard overlay */}
      {showDashboard && (
        <div className="dashboard-overlay">
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h2>🌌 Heroes of Time - Dashboard des Timelines</h2>
              <button 
                className="close-dashboard"
                onClick={() => setShowDashboard(false)}
              >
                ✕
              </button>
            </div>

            <div className="current-timeline-display">
              <h3>Timeline Active</h3>
              <div className="timeline-preview active">
                <span className="timeline-icon large">{currentTimelineData?.icon}</span>
                <div className="timeline-info">
                  <div className="timeline-name">{currentTimelineData?.name}</div>
                  <div className="timeline-version">{currentTimelineData?.version}</div>
                  <div className="timeline-description">{currentTimelineData?.description}</div>
                </div>
              </div>
            </div>

            <div className="timelines-gallery">
              <h3>Toutes les Timelines</h3>
              <div className="timelines-grid">
                {timelines.map(timeline => (
                  <div
                    key={timeline.id}
                    className={`timeline-preview ${timeline.id === currentTimeline ? 'active' : ''} ${!timeline.available ? 'unavailable' : ''}`}
                    onClick={() => {
                      if (timeline.available) {
                        setCurrentTimeline(timeline.id);
                        setShowDashboard(false);
                      }
                    }}
                  >
                    <div className="timeline-preview-header">
                      <span className="timeline-icon">{timeline.icon}</span>
                      <div className="timeline-status">
                        {timeline.available ? '✅' : '🔒'}
                      </div>
                    </div>
                    
                    <div className="timeline-preview-content">
                      <div className="timeline-name">{timeline.name}</div>
                      <div className="timeline-version">{timeline.version}</div>
                      <div className="timeline-description">{timeline.description}</div>
                    </div>

                    {timeline.available && (
                      <div className="timeline-preview-actions">
                        <button 
                          className={`select-timeline-btn ${timeline.id === currentTimeline ? 'current' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentTimeline(timeline.id);
                            setShowDashboard(false);
                          }}
                        >
                          {timeline.id === currentTimeline ? 'Active' : 'Activer'}
                        </button>
                      </div>
                    )}

                    {!timeline.available && (
                      <div className="timeline-preview-locked">
                        <p>Timeline archivée</p>
                        <small>Sera restaurée prochainement</small>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-footer">
              <div className="dashboard-stats">
                <div>📊 {timelines.length} timelines totales</div>
                <div>✅ {timelines.filter(t => t.available).length} disponibles</div>
                <div>🔒 {timelines.filter(t => !t.available).length} archivées</div>
              </div>
              
              <div className="dashboard-actions">
                <button 
                  className="export-timeline-btn"
                  onClick={() => {
                    console.log('[DASHBOARD] Export timeline configuration');
                    const config = {
                      currentTimeline,
                      availableTimelines: timelines.filter(t => t.available).map(t => t.id),
                      timestamp: new Date().toISOString()
                    };
                    console.log('Timeline Config:', config);
                  }}
                >
                  💾 Exporter Config
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelinesDashboard; 