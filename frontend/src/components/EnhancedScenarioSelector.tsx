import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
  isMultiplayer: boolean;
}

const EnhancedScenarioSelector: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getBackgroundForScenario = (id: string): string => {
    switch(id) {
      case 'conquest-classic': return 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
      case 'temporal-rift': return 'linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)';
      case 'multiplayer-arena': return 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
      case 'dragon-campaign': return 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)';
      default: return 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)';
    }
  };

  const getIconForScenario = (id: string): string => {
    switch(id) {
      case 'conquest-classic': return '⚔️';
      case 'temporal-rift': return '🔮';
      case 'multiplayer-arena': return '🌐';
      case 'dragon-campaign': return '🐉';
      default: return '🎮';
    }
  };

  console.log('%c[EnhancedScenarioSelector] Component rendered', 'color: blue; font-weight: bold');

  // Load scenarios from backend API
  const loadScenarios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load all scenarios from backend with current language
      const backendScenarios = await ApiService.getAllScenarios(language);
      
      // Transform backend scenarios and add missing translations
      const scenarios: Scenario[] = backendScenarios.map((scenario: any) => ({
        id: scenario.scenarioId || scenario.id,
        name: scenario.name || scenario.scenarioId || scenario.id,
        description: scenario.description || '',
        longDescription: scenario.description || '',
        difficulty: (scenario.difficulty?.toLowerCase() || 'medium') as 'easy' | 'medium' | 'hard' | 'expert',
        features: [
          scenario.mapWidth && scenario.mapHeight 
            ? `📏 ${scenario.mapWidth}×${scenario.mapHeight}`
            : `🗺️ ${scenario.mapSize || 'Standard'}`,
          scenario.victoryCondition 
            ? `�� ${scenario.victoryCondition}`
            : '🏆 Elimination victory',
          scenario.turnLimit 
            ? `⏳ ${scenario.turnLimit} turns`
            : '♾️ Unlimited turns',
          scenario.maxPlayers > 1 
            ? `👥 ${scenario.maxPlayers} players`
            : '👤 Solo'
        ],
        icon: getIconForScenario(scenario.scenarioId || scenario.id),
        backgroundImage: getBackgroundForScenario(scenario.scenarioId || scenario.id),
        estimatedTime: scenario.estimatedDuration || '1-2 hours',
        playerCount: `${scenario.maxPlayers || 1} players`,
        unlocked: scenario.isActive !== false && scenario.unlocked !== false,
        isMultiplayer: scenario.playerMode === 'multiplayer' || scenario.isMultiplayer === true
      }));

      console.log('%c[EnhancedScenarioSelector] Transformed scenarios:', 'color: blue', scenarios);
      
      setScenarios(scenarios);
      console.log('%c[EnhancedScenarioSelector] Loaded scenarios:', 'color: green; font-weight: bold', scenarios);
    } catch (err) {
      setError('Failed to load scenarios from backend');
      console.error('Error loading scenarios:', err);
      
      // Fallback to hardcoded scenarios if backend fails
      const fallbackScenarios: Scenario[] = [
        {
          id: 'conquest-classic',
          name: t('scenarios.conquest-classic.name'),
          description: t('scenarios.conquest-classic.description'),
          longDescription: t('scenarios.conquest-classic.description'),
          difficulty: 'easy',
          features: ['📏 30×30', '🏆 Conquest', '⏳ 200 turns'],
          icon: '⚔️',
          backgroundImage: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
          estimatedTime: '1-2 hours',
          playerCount: '2-6 players',
          unlocked: true,
          isMultiplayer: true
        },
        {
          id: 'dragon-campaign',
          name: t('scenarios.dragon-campaign.name'),
          description: t('scenarios.dragon-campaign.description'),
          longDescription: t('scenarios.dragon-campaign.description'),
          difficulty: 'expert',
          features: ['📏 50×50', '🐲 Epic bosses', '⏳ 500 turns'],
          icon: '🐉',
          backgroundImage: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          estimatedTime: '3-5 hours',
          playerCount: '1-2 players',
          unlocked: false,
          isMultiplayer: false
        }
      ];
      setScenarios(fallbackScenarios);
    } finally {
      setLoading(false);
    }
  }, [t, language]);

  useEffect(() => {
    loadScenarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]); // Only reload when language changes

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
    switch (difficulty.toLowerCase()) {
      case 'easy': return t('easy');
      case 'normal':
      case 'medium': return t('intermediate');
      case 'hard': return t('advanced');
      case 'expert': return t('expert');
      default: return t('intermediate'); // Par défaut "intermediate" au lieu de "unknown"
    }
  };

  const handleScenarioClick = (scenarioId: string) => {
    console.log('%c[EnhancedScenarioSelector] Scenario clicked:', 'color: green; font-weight: bold', scenarioId);
    setSelectedScenario(scenarioId);
    
    // Navigate to the game immediately when clicking on a scenario
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario && scenario.unlocked) {
      if (scenario.isMultiplayer) {
        console.log(`[SELECTOR] Multiplayer scenario detected, navigating to multiplayer lobby`);
        navigate('/multiplayer');
      } else {
        console.log(`[SELECTOR] Single player scenario, navigating to game: ${scenarioId}`);
        navigate(`/game/${scenarioId}`);
      }
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
        {/* Demo button removed per request */}
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
                className={`scenario-card ${scenario.id === selectedScenario ? 'selected' : ''} ${scenario.unlocked ? '' : 'locked'} ${scenario.isMultiplayer ? 'multiplayer' : ''}`}
                style={{ background: scenario.backgroundImage }}
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
                    <h3 className="scenario-title">
                      {scenario.name.startsWith('scenarios.') ? t(scenario.name as any) : scenario.name}
                    </h3>
                    <p className="scenario-description">
                      {scenario.description.startsWith('scenarios.') ? t(scenario.description as any) : scenario.description}
                    </p>
                    
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