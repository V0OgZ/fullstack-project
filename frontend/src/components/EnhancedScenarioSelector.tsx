import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { ApiService } from '../services/api';
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

interface BackendScenario {
  id: number;
  scenarioId: string;
  name: string;
  description: string;
  difficulty: string;
  maxPlayers: number;
  estimatedDuration?: string;
  isActive: boolean;
}

const EnhancedScenarioSelector: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('%c[EnhancedScenarioSelector] Component rendered', 'color: blue; font-weight: bold');

  // Load scenarios from backend API
  const loadScenarios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Initialize default scenarios first
      await ApiService.initializeDefaultScenarios();
      
      // Then load all scenarios from backend
      const backendScenarios = await ApiService.getAllScenarios();
      
      // Convert backend scenarios to EnhancedScenarioSelector format
      const enhancedScenarios: Scenario[] = backendScenarios.map((scenario: BackendScenario) => ({
        id: scenario.scenarioId,
        name: scenario.name,
        description: scenario.description,
        longDescription: scenario.description,
        difficulty: scenario.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard' | 'expert',
        features: ['Backend Loaded', 'Dynamic Content', 'Real-time Data'],
        icon: scenario.scenarioId === 'conquest-classic' ? '⚔️' : 
              scenario.scenarioId === 'temporal-rift' ? '🔮' : 
              scenario.scenarioId === 'multiplayer-arena' ? '🌐' : '🎮',
        backgroundImage: scenario.scenarioId === 'conquest-classic' ? 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)' :
                        scenario.scenarioId === 'temporal-rift' ? 'linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)' :
                        scenario.scenarioId === 'multiplayer-arena' ? 'linear-gradient(135deg, #FF5722 0%, #F44336 100%)' :
                        'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
        estimatedTime: scenario.estimatedDuration || '1-2 hours',
        playerCount: `${scenario.maxPlayers} players`,
        unlocked: scenario.isActive
      }));
      
      setScenarios(enhancedScenarios);
    } catch (err) {
      setError('Failed to load scenarios from backend');
      console.error('Error loading scenarios:', err);
      
      // Fallback to hardcoded scenarios if backend fails
      const fallbackScenarios: Scenario[] = [
        {
          id: 'conquest-classic',
          name: t('classicConquest'),
          description: t('classicDescription'),
          longDescription: 'Experience the classic Heroes of Might and Magic gameplay with this balanced conquest scenario. Perfect for new players and veterans alike.',
          difficulty: 'easy',
          features: ['Balanced Gameplay', 'All Castles', 'Standard Victory'],
          icon: '⚔️',
          backgroundImage: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
          estimatedTime: '1-2 hours',
          playerCount: '2-6 players',
          unlocked: true
        }
      ];
      setScenarios(fallbackScenarios);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadScenarios();
  }, [loadScenarios]);

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

  const handleScenarioClick = (scenarioId: string) => {
    console.log('%c[EnhancedScenarioSelector] Scenario clicked:', 'color: green; font-weight: bold', scenarioId);
    setSelectedScenario(scenarioId);
    
    // Navigate to the game immediately when clicking on a scenario
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario && scenario.unlocked) {
      console.log(`[SELECTOR] Navigating to game for scenario: ${scenarioId}`);
      window.location.href = `/game/${scenarioId}`;
    } else {
      console.log(`[SELECTOR] Scenario ${scenarioId} is locked or not found`);
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
          {loading && (
            <div className="loading-message">
              <div className="loading-spinner"></div>
              <p>Loading scenarios from backend...</p>
            </div>
          )}
          {error && (
            <div className="error-message">
              <p>⚠️ {error}</p>
              <button onClick={loadScenarios} className="retry-button">Retry</button>
            </div>
          )}
          {!loading && !error && (
            <div className="scenarios-grid">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                data-testid={`scenario-card-${scenario.id}`}
                className={`scenario-card ${!scenario.unlocked ? 'locked' : ''} ${selectedScenario === scenario.id ? 'selected' : ''}`}
                style={{ background: scenario.backgroundImage }}
                onMouseEnter={() => {
                  console.log('%c[EnhancedScenarioSelector] Mouse enter scenario:', 'color: cyan', scenario.id);
                  setSelectedScenario(scenario.id);
                }}
                onMouseLeave={() => {
                  console.log('%c[EnhancedScenarioSelector] Mouse leave scenario:', 'color: cyan', scenario.id);
                  setSelectedScenario(null);
                }}
                onClick={() => handleScenarioClick(scenario.id)}
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
                      <Link 
                        to={`/game/${scenario.id}`}
                        data-testid={`play-button-${scenario.id}`}
                        className={`play-button ${!scenario.unlocked ? 'disabled' : ''}`}
                        onClick={(e) => {
                          console.log(`[SELECTOR] --- Play button clicked for scenario: ${scenario.id} ---`);
                          console.log(`[SELECTOR] Button href: ${e.currentTarget.getAttribute('href')}`);
                          try {
                            if (!scenario.unlocked) {
                              console.log(`[SELECTOR] Scenario is LOCKED. Preventing navigation.`);
                              e.preventDefault();
                            } else {
                              console.log(`[SELECTOR] Scenario is UNLOCKED. Proceeding with navigation to /game/${scenario.id}`);
                            }
                          } catch (err) {
                            console.error('[SELECTOR] Error in click handler:', err);
                          }
                        }}
                      >
                        <span className="button-icon">🎮</span>
                        {t('startGame')}
                      </Link>
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
          )}
        </section>
      </main>
    </div>
  );
};

export default EnhancedScenarioSelector; 