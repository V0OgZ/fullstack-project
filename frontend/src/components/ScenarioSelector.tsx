import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../services/api';
import { useTranslation } from '../i18n';
import './ScenarioSelector.css';

interface Scenario {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  mapSize: string;
  playerCount: number;
  type: 'SINGLE_PLAYER' | 'MULTIPLAYER' | 'CAMPAIGN';
  objectives: Array<{
    id: string;
    description: string;
    type: string;
    isCompleted: boolean;
  }>;
  estimatedDuration: string;
  rewards: string[];
  isActive: boolean;
  campaignOrder?: number;
}

const ScenarioSelector: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'single' | 'multiplayer' | 'campaign'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'>('all');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadScenarios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Initialize default scenarios first
      await ApiService.initializeDefaultScenarios();
      
      // Then load all scenarios
      const response = await ApiService.getAllScenarios();
      setScenarios(response);
    } catch (err) {
      setError('Failed to load scenarios');
      console.error('Error loading scenarios:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadScenarios();
  }, [loadScenarios]);

  const initializeDefaultScenarios = async () => {
    try {
      setLoading(true);
      await ApiService.initializeDefaultScenarios();
      await loadScenarios();
    } catch (err) {
      console.error('Failed to initialize scenarios:', err);
      setError('Failed to initialize scenarios.');
    }
  };

  const startScenario = async (scenario: Scenario) => {
    try {
      if (scenario.type === 'MULTIPLAYER') {
        navigate('/multiplayer');
      } else {
        // For single player and campaign scenarios
        const scenarioId = scenario.id;
        navigate(`/game/${scenarioId}`);
      }
    } catch (err) {
      console.error('Failed to start scenario:', err);
      setError('Failed to start scenario.');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER': return '#4CAF50';
      case 'INTERMEDIATE': return '#FF9800';
      case 'EXPERT': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'SINGLE_PLAYER': return '🏰';
      case 'MULTIPLAYER': return '🌐';
      case 'CAMPAIGN': return '📚';
      default: return '🎮';
    }
  };

  if (loading) {
    return (
      <div className="scenario-selector-loading">
        <div className="loading-spinner"></div>
        <p>{t('loading')}...</p>
      </div>
    );
  }

  return (
    <div className="scenario-selector">
      <div className="scenario-header">
        <h1 className="scenario-title">
          🎯 {t('selectScenario')}
        </h1>
        <p className="scenario-subtitle">
          {t('chooseYourAdventure')}
        </p>
      </div>

      {error && (
        <div className="error-message">
          <span>❌ {error}</span>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {scenarios.length === 0 && !loading && (
        <div className="no-scenarios">
          <p>{t('noScenariosAvailable')}</p>
          <button 
            onClick={initializeDefaultScenarios}
            className="initialize-button"
          >
            🔄 {t('initializeScenarios')}
          </button>
        </div>
      )}

      <div className="scenario-filters">
        <div className="filter-group">
          <label>{t('category')}:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value as any)}
          >
            <option value="all">{t('allScenarios')}</option>
            <option value="single">{t('singlePlayer')}</option>
            <option value="multiplayer">{t('multiplayer')}</option>
            <option value="campaign">{t('campaign')}</option>
          </select>
        </div>

        <div className="filter-group">
          <label>{t('difficulty')}:</label>
          <select 
            value={selectedDifficulty} 
            onChange={(e) => setSelectedDifficulty(e.target.value as any)}
          >
            <option value="all">{t('allDifficulties')}</option>
            <option value="BEGINNER">{t('beginner')}</option>
            <option value="INTERMEDIATE">{t('intermediate')}</option>
            <option value="EXPERT">{t('expert')}</option>
          </select>
        </div>
      </div>

      <div className="scenarios-grid">
        {scenarios.map((scenario) => (
          <div 
            key={scenario.id} 
            className={`scenario-card ${selectedScenario?.id === scenario.id ? 'selected' : ''}`}
            onClick={() => setSelectedScenario(scenario)}
          >
            <div className="scenario-card-header">
              <div className="scenario-type">
                {getTypeIcon(scenario.type)} {scenario.type.replace('_', ' ')}
              </div>
              <div 
                className="scenario-difficulty"
                style={{ backgroundColor: getDifficultyColor(scenario.difficulty) }}
              >
                {scenario.difficulty}
              </div>
            </div>

            <h3 className="scenario-name">{scenario.name}</h3>
            <p className="scenario-description">{scenario.description}</p>

            <div className="scenario-details">
              <div className="scenario-detail">
                <span className="detail-label">🗺️ {t('mapSize')}:</span>
                <span className="detail-value">{scenario.mapSize}</span>
              </div>
              <div className="scenario-detail">
                <span className="detail-label">👥 {t('players')}:</span>
                <span className="detail-value">{scenario.playerCount}</span>
              </div>
              <div className="scenario-detail">
                <span className="detail-label">⏱️ {t('duration')}:</span>
                <span className="detail-value">{scenario.estimatedDuration}</span>
              </div>
            </div>

            <div className="scenario-objectives">
              <h4>{t('objectives')}:</h4>
              <ul>
                {scenario.objectives.slice(0, 3).map((objective) => (
                  <li key={objective.id} className={objective.isCompleted ? 'completed' : ''}>
                    {objective.isCompleted ? '✅' : '🎯'} {objective.description}
                  </li>
                ))}
              </ul>
            </div>

            <div className="scenario-rewards">
              <h4>{t('rewards')}:</h4>
              <div className="rewards-list">
                {scenario.rewards.map((reward, index) => (
                  <span key={index} className="reward-tag">
                    🏆 {reward}
                  </span>
                ))}
              </div>
            </div>

            <button 
              className="start-scenario-button"
              onClick={(e) => {
                e.stopPropagation();
                startScenario(scenario);
              }}
              disabled={!scenario.isActive}
            >
              {scenario.isActive ? `🚀 ${t('startScenario')}` : `🔒 ${t('scenarioLocked')}`}
            </button>
          </div>
        ))}
      </div>

      {selectedScenario && (
        <div className="scenario-detail-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedScenario.name}</h2>
              <button 
                className="close-button"
                onClick={() => setSelectedScenario(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <p className="scenario-full-description">
                {selectedScenario.description}
              </p>
              
              <div className="full-objectives">
                <h3>{t('allObjectives')}:</h3>
                <ul>
                  {selectedScenario.objectives.map((objective) => (
                    <li key={objective.id} className={objective.isCompleted ? 'completed' : ''}>
                      {objective.isCompleted ? '✅' : '🎯'} {objective.description}
                      <span className="objective-type">({objective.type})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="start-scenario-button-large"
                onClick={() => startScenario(selectedScenario)}
                disabled={!selectedScenario.isActive}
              >
                {selectedScenario.isActive ? `🚀 ${t('startScenario')}` : `🔒 ${t('scenarioLocked')}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioSelector; 