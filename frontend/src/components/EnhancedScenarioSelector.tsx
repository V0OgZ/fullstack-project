import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { useGameStore } from '../store/useGameStore'; // Import the store
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
  const { t, language, setLanguage } = useTranslation();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const navigate = useNavigate();
  const loadGame = useGameStore((state) => state.loadGame); // Get the loadGame action

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
      name: t('epicCampaign'),
      description: t('epicCampaignDescription'),
      longDescription: 'Follow the legendary heroes through an epic campaign spanning multiple kingdoms and timelines. Each victory unlocks new scenarios and reveals more of the overarching story.',
      difficulty: 'medium',
      features: [
        t('storyDrivenGameplay'),
        t('characterDevelopment'),
        t('unlockableContent'),
        t('multipleEndings'),
        t('cinematicCutscenes'),
        t('saveProgress')
      ],
      icon: '📖',
      backgroundImage: 'linear-gradient(135deg, #8B4513 0%, #654321 100%)',
      estimatedTime: '2-4 hours',
      playerCount: '1 player',
      unlocked: false
    }
  ];

  const handleScenarioSelect = async (scenarioId: string) => {
    if (scenarioId === 'multiplayer-arena') {
      navigate('/multiplayer');
    } else {
      try {
        await loadGame(scenarioId);
        // The navigation will be handled by the component that observes the game state
      } catch (error) {
        console.error("Failed to load scenario:", error);
        // Optionally, show an error message to the user
      }
    }
  };


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
      <div className="language-switch">
        <button 
          className={`lang-btn ${language === 'fr' ? 'active' : ''}`}
          onClick={() => setLanguage('fr')}
        >
          🇫🇷 FR
        </button>
        <button 
          className={`lang-btn ${language === 'en' ? 'active' : ''}`}
          onClick={() => setLanguage('en')}
        >
          🇺🇸 EN
        </button>
        <button 
          className={`lang-btn ${language === 'ru' ? 'active' : ''}`}
          onClick={() => setLanguage('ru')}
        >
          🇷🇺 RU
        </button>
      </div>

      {/* Game Title */}
      <div className="game-title-header">
        <h1 className="main-game-title">🎮 Heroes of Time ⚔️</h1>
      </div>

      <main className="selector-main">
        <section className="scenarios-section game-options">
          <h2 className="section-title">{t('availableAdventures')}</h2>
          <div className="scenarios-grid">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                data-testid={`scenario-card-${scenario.id}`}
                className={`scenario-card ${!scenario.unlocked ? 'locked' : ''} ${selectedScenario === scenario.id ? 'selected' : ''}`}
                style={{ background: scenario.backgroundImage }}
                onMouseEnter={() => setSelectedScenario(scenario.id)}
                onMouseLeave={() => setSelectedScenario(null)}
              >
                {!scenario.unlocked && (
                  <div className="lock-overlay">
                    <div className="lock-icon">🔒</div>
                    <div className="lock-text">{t('comingSoon')}</div>
                  </div>
                )}
                
                <div className="scenario-content">
                  <div className="scenario-header">
                    <div className="scenario-icon-large game-icon">{scenario.icon}</div>
                  </div>
                  
                  <div className="scenario-body">
                    <h3 className="scenario-title">{scenario.name}</h3>
                    <p className="scenario-description">{scenario.description}</p>
                    
                    <div className="scenario-meta-info">
                      <div 
                        className="difficulty-badge difficulty-indicator"
                        style={{ backgroundColor: getDifficultyColor(scenario.difficulty) }}
                      >
                        {getDifficultyLabel(scenario.difficulty)}
                      </div>
                      <div className="scenario-time">{scenario.estimatedTime}</div>
                    </div>
                    
                    <div className="scenario-features">
                      {scenario.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="feature-tag">{feature}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="scenario-actions">
                    {scenario.unlocked ? (
                      <button 
                        onClick={() => handleScenarioSelect(scenario.id)}
                        className="play-button"
                        data-testid={`play-button-${scenario.id}`}
                      >
                        <span className="button-icon">🎮</span>
                        {t('startGame')}
                      </button>
                    ) : (
                      <button className="play-button disabled" disabled>
                        <span className="button-icon">🔒</span>
                        {t('scenarioLocked')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default EnhancedScenarioSelector; 