import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import LanguageSelector from './LanguageSelector';
import './EnhancedScenarioSelector.css';

interface Scenario {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  features: string[];
  icon: string;
  backgroundImage: string;
  estimatedTime: string;
  playerCount: string;
  unlocked: boolean;
}

const EnhancedScenarioSelector: React.FC = () => {
  const { t } = useTranslation();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [currentTip, setCurrentTip] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 'conquete-classique',
      name: t('classicConquest'),
      description: t('classicDescription'),
      longDescription: 'Experience the timeless strategy gameplay that defined the genre. Build your kingdom, recruit mighty armies, and conquer enemy territories in this classic turn-based strategy experience.',
      difficulty: 'easy',
      features: [
        t('turnBasedCombat'),
        t('captureBuildings'),
        t('hexagonalMaps'),
        'Resource Management',
        'Hero Development',
        'Tactical Combat'
      ],
      icon: '🏰',
      backgroundImage: 'linear-gradient(135deg, #2d5a87 0%, #1e3a5f 100%)',
      estimatedTime: '30-60 min',
      playerCount: '1-2 players',
      unlocked: true
    },
    {
      id: 'mystique-temporel',
      name: t('mysticalConquest'),
      description: t('mysticalDescription'),
      longDescription: 'Dive into a world where time itself becomes your greatest weapon. Discover temporal artifacts, manipulate causality, and master the mysterious Zone of Temporal Causality system.',
      difficulty: 'hard',
      features: [
        t('temporalObjects'),
        t('advancedMagic'),
        t('mysticPortals'),
        'ZFC System',
        'Time Manipulation',
        'Quantum Strategy'
      ],
      icon: '🔮',
      backgroundImage: 'linear-gradient(135deg, #4a1a4a 0%, #2d1b3d 100%)',
      estimatedTime: '45-90 min',
      playerCount: '1-2 players',
      unlocked: true
    },
    {
      id: 'multiplayer-arena',
      name: t('multiplayerArena'),
      description: t('multiplayerArenaDescription'),
      longDescription: 'Challenge players from around the world in intense real-time battles. Form alliances, betray enemies, and prove your strategic supremacy in the ultimate multiplayer experience.',
      difficulty: 'expert',
      features: [
        t('rankedMatches'),
        t('realTimeStrategy'),
        'Global Leaderboards',
        'Clan System',
        'Tournament Mode',
        'Spectator Mode'
      ],
      icon: '🌐',
      backgroundImage: 'linear-gradient(135deg, #1a4a2e 0%, #0d2818 100%)',
      estimatedTime: '20-45 min',
      playerCount: '2-8 players',
      unlocked: true
    },
    {
      id: 'campaign-mode',
      name: 'Epic Campaign',
      description: 'Embark on an epic journey through interconnected scenarios with a rich storyline.',
      longDescription: 'Follow the legendary heroes through an epic campaign spanning multiple kingdoms and timelines. Each victory unlocks new scenarios and reveals more of the overarching story.',
      difficulty: 'medium',
      features: [
        'Story-driven Gameplay',
        'Character Development',
        'Unlockable Content',
        'Multiple Endings',
        'Cinematic Cutscenes',
        'Save Progress'
      ],
      icon: '📚',
      backgroundImage: 'linear-gradient(135deg, #8b4513 0%, #5d2f0a 100%)',
      estimatedTime: '2-4 hours',
      playerCount: '1 player',
      unlocked: false
    }
  ];

  const tips = [
    "💡 Each scenario offers unique gameplay mechanics and challenges",
    "🔮 Mystical scenarios introduce time manipulation and quantum strategy",
    "🎮 Multiplayer supports both real-time and turn-based modes",
    "🏰 Classic mode is perfect for learning the core game mechanics",
    "⚡ Quick Arena matches are great for competitive play",
    "🌟 Campaign mode tells an epic story across multiple scenarios",
    "🎯 Different difficulty levels cater to all skill levels",
    "🔥 Master one scenario before moving to the next for best experience"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [tips.length]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'hard': return '#f44336';
      case 'expert': return '#9c27b0';
      default: return '#757575';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return t('easy');
      case 'medium': return 'Medium';
      case 'hard': return t('advanced');
      case 'expert': return 'Expert';
      default: return 'Unknown';
    }
  };

  return (
    <div className="enhanced-scenario-selector">
      {/* Header */}
      <header className="selector-header">
        <div className="title-section">
          <h1 className="game-title">
            <span className="title-icon">⚔️</span>
            Heroes of Time
            <span className="title-icon">🏰</span>
          </h1>
          <p className="subtitle">{t('chooseScenario')}</p>
        </div>
        <div className="header-controls">
          <LanguageSelector />
        </div>
      </header>

      {/* Main Content */}
      <main className="selector-main">
        {/* Scenarios Grid */}
        <section className="scenarios-section">
          <h2 className="section-title">Available Adventures</h2>
          <div className="scenarios-grid">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className={`scenario-card ${!scenario.unlocked ? 'locked' : ''} ${selectedScenario === scenario.id ? 'selected' : ''}`}
                style={{ background: scenario.backgroundImage }}
                onMouseEnter={() => setSelectedScenario(scenario.id)}
                onMouseLeave={() => setSelectedScenario(null)}
              >
                {!scenario.unlocked && (
                  <div className="lock-overlay">
                    <div className="lock-icon">🔒</div>
                    <div className="lock-text">Coming Soon</div>
                  </div>
                )}
                
                <div className="scenario-content">
                  <div className="scenario-header">
                    <div className="scenario-icon">{scenario.icon}</div>
                    <div className="scenario-meta">
                      <div 
                        className="difficulty-badge"
                        style={{ backgroundColor: getDifficultyColor(scenario.difficulty) }}
                      >
                        {getDifficultyLabel(scenario.difficulty)}
                      </div>
                      <div className="player-count">{scenario.playerCount}</div>
                    </div>
                  </div>

                  <div className="scenario-info">
                    <h3 className="scenario-name">{scenario.name}</h3>
                    <p className="scenario-description">{scenario.description}</p>
                    
                    <div className="scenario-features">
                      {scenario.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                      {scenario.features.length > 3 && (
                        <span className="feature-tag more">
                          +{scenario.features.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="scenario-details">
                      <div className="detail-item">
                        <span className="detail-icon">⏱️</span>
                        <span>{scenario.estimatedTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="scenario-actions">
                    <button
                      className="details-button"
                      onClick={() => setShowDetails(true)}
                      disabled={!scenario.unlocked}
                    >
                      <span className="button-icon">ℹ️</span>
                      Details
                    </button>
                    
                    {scenario.unlocked ? (
                      <Link 
                        to={`/game/${scenario.id}`} 
                        className="play-button"
                        data-testid="start-game-button"
                      >
                        <span className="button-icon">🎮</span>
                        {t('startGame')}
                      </Link>
                    ) : (
                      <button className="play-button disabled" disabled>
                        <span className="button-icon">🔒</span>
                        Locked
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="tips-section">
          <div className="tip-container">
            <div className="tip-icon">💡</div>
            <div className="tip-content">
              <div className="tip-text" key={currentTip}>
                {tips[currentTip]}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="selector-footer">
        <div className="footer-content">
          <p>{t('builtWith')}</p>
          <div className="footer-links">
            <a href="#" className="footer-link">About</a>
            <a href="#" className="footer-link">Help</a>
            <a href="#" className="footer-link">Community</a>
          </div>
        </div>
      </footer>

      {/* Scenario Details Modal */}
      {showDetails && selectedScenario && (
        <div className="details-modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="details-modal" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const scenario = scenarios.find(s => s.id === selectedScenario);
              if (!scenario) return null;
              
              return (
                <>
                  <div className="modal-header">
                    <div className="modal-title">
                      <span className="modal-icon">{scenario.icon}</span>
                      {scenario.name}
                    </div>
                    <button 
                      className="modal-close"
                      onClick={() => setShowDetails(false)}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="modal-content">
                    <div className="modal-description">
                      {scenario.longDescription}
                    </div>
                    
                    <div className="modal-features">
                      <h4>Features:</h4>
                      <div className="features-grid">
                        {scenario.features.map((feature, index) => (
                          <div key={index} className="feature-item">
                            <span className="feature-bullet">✓</span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="modal-stats">
                      <div className="stat-item">
                        <span className="stat-label">Difficulty:</span>
                        <span 
                          className="stat-value"
                          style={{ color: getDifficultyColor(scenario.difficulty) }}
                        >
                          {getDifficultyLabel(scenario.difficulty)}
                        </span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Duration:</span>
                        <span className="stat-value">{scenario.estimatedTime}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Players:</span>
                        <span className="stat-value">{scenario.playerCount}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="modal-actions">
                    {scenario.unlocked ? (
                      <Link 
                        to={`/game/${scenario.id}`} 
                        className="modal-play-button"
                      >
                        <span className="button-icon">🎮</span>
                        Start Adventure
                      </Link>
                    ) : (
                      <button className="modal-play-button disabled" disabled>
                        <span className="button-icon">🔒</span>
                        Coming Soon
                      </button>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedScenarioSelector; 