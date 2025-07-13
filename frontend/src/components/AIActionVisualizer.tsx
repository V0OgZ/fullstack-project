import React, { useState, useEffect, useCallback } from 'react';
import './AIActionVisualizer.css';

interface AIDecision {
  decisionId: string;
  decisionType: 'move' | 'attack' | 'build' | 'recruit' | 'cast_spell' | 'collect';
  decisionRationale: string;
  decisionParameters: any;
  decisionTimestamp: string;
  decisionOutcome: 'success' | 'failure' | 'pending';
  decisionScore: number;
  aiPlayerId: string;
  aiPlayerName: string;
}

interface AIGoal {
  goalId: string;
  goalType: 'expand' | 'defend' | 'attack' | 'economic' | 'research';
  goalPriority: number;
  goalDescription: string;
  goalTarget: string;
  goalProgress: number;
  goalStatus: 'active' | 'completed' | 'failed' | 'paused';
}

interface AIPlayer {
  aiPlayerId: string;
  playerName: string;
  difficultyLevel: string;
  aiPersonality: string;
  aggressionLevel: number;
  economicFocus: number;
  militaryFocus: number;
  currentGoals: AIGoal[];
  recentDecisions: AIDecision[];
  isActive: boolean;
  isTurnActive: boolean;
}

interface AIActionVisualizerProps {
  gameId: string;
  isVisible: boolean;
  onClose?: () => void;
}

const AIActionVisualizer: React.FC<AIActionVisualizerProps> = ({ 
  gameId, 
  isVisible, 
  onClose 
}) => {
  const [aiPlayers, setAiPlayers] = useState<AIPlayer[]>([]);
  const [selectedAI, setSelectedAI] = useState<string | null>(null);
  const [recentActions, setRecentActions] = useState<AIDecision[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'decisions' | 'goals' | 'personality'>('decisions');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch AI players and their data
  const fetchAIData = useCallback(async () => {
    if (!gameId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Get AI players for this game
      const response = await fetch(`http://localhost:8080/api/ai/players/${gameId}`);
      if (!response.ok) throw new Error('Failed to fetch AI players');
      
      const players: AIPlayer[] = await response.json();
      setAiPlayers(players);
      
      // Get recent AI actions across all players
      const actionsResponse = await fetch(`http://localhost:8080/api/ai/recent-actions/${gameId}`);
      if (actionsResponse.ok) {
        const actions: AIDecision[] = await actionsResponse.json();
        setRecentActions(actions);
      }
      
      // Auto-select first active AI if none selected
      if (!selectedAI && players.length > 0) {
        const activeAI = players.find(p => p.isTurnActive) || players[0];
        setSelectedAI(activeAI.aiPlayerId);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch AI data');
      console.error('Error fetching AI data:', err);
    } finally {
      setLoading(false);
    }
  }, [gameId, selectedAI]);

  // Auto-refresh effect
  useEffect(() => {
    if (!isVisible || !autoRefresh) return;
    
    fetchAIData();
    const interval = setInterval(fetchAIData, 3000); // Refresh every 3 seconds
    
    return () => clearInterval(interval);
  }, [isVisible, autoRefresh, fetchAIData]);

  // Initial load
  useEffect(() => {
    if (isVisible) {
      fetchAIData();
    }
  }, [isVisible, fetchAIData]);

  const getSelectedAIPlayer = (): AIPlayer | null => {
    return aiPlayers.find(p => p.aiPlayerId === selectedAI) || null;
  };

  const getDecisionIcon = (type: string): string => {
    switch (type) {
      case 'move': return '🚶';
      case 'attack': return '⚔️';
      case 'build': return '🏗️';
      case 'recruit': return '👥';
      case 'cast_spell': return '✨';
      case 'collect': return '💎';
      default: return '🤖';
    }
  };

  const getGoalIcon = (type: string): string => {
    switch (type) {
      case 'expand': return '🌍';
      case 'defend': return '🛡️';
      case 'attack': return '⚔️';
      case 'economic': return '💰';
      case 'research': return '📚';
      default: return '🎯';
    }
  };

  const getPersonalityColor = (personality: string): string => {
    switch (personality) {
      case 'aggressive': return '#ff4444';
      case 'defensive': return '#4444ff';
      case 'economic': return '#44ff44';
      case 'balanced': return '#ffaa44';
      default: return '#888888';
    }
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'normal': return '#FFC107';
      case 'hard': return '#FF9800';
      case 'expert': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const selectedPlayer = getSelectedAIPlayer();

  if (!isVisible) return null;

  return (
    <div className="ai-action-visualizer">
      <div className="ai-visualizer-header">
        <h2>🤖 AI Action Visualizer</h2>
        <div className="header-controls">
          <button 
            className={`refresh-btn ${autoRefresh ? 'active' : ''}`}
            onClick={() => setAutoRefresh(!autoRefresh)}
            title={autoRefresh ? 'Disable auto-refresh' : 'Enable auto-refresh'}
          >
            {autoRefresh ? '🔄' : '⏸️'}
          </button>
          <button className="manual-refresh-btn" onClick={fetchAIData} disabled={loading}>
            {loading ? '⏳' : '🔄'}
          </button>
          {onClose && (
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      <div className="ai-visualizer-content">
        {/* AI Players List */}
        <div className="ai-players-sidebar">
          <h3>AI Players</h3>
          <div className="ai-players-list">
            {aiPlayers.map(player => (
              <div
                key={player.aiPlayerId}
                className={`ai-player-card ${selectedAI === player.aiPlayerId ? 'selected' : ''} ${player.isTurnActive ? 'active-turn' : ''}`}
                onClick={() => setSelectedAI(player.aiPlayerId)}
              >
                <div className="ai-player-header">
                  <div className="ai-player-name">{player.playerName}</div>
                  <div 
                    className="ai-difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(player.difficultyLevel) }}
                  >
                    {player.difficultyLevel}
                  </div>
                </div>
                <div className="ai-player-info">
                  <div 
                    className="ai-personality"
                    style={{ color: getPersonalityColor(player.aiPersonality) }}
                  >
                    {player.aiPersonality}
                  </div>
                  <div className="ai-status">
                    {player.isTurnActive ? '🎯 Active' : player.isActive ? '⏳ Waiting' : '😴 Inactive'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Details Panel */}
        <div className="ai-details-panel">
          {selectedPlayer ? (
            <>
              <div className="ai-details-header">
                <h3>{selectedPlayer.playerName}</h3>
                <div className="ai-tabs">
                  <button 
                    className={`tab-btn ${activeTab === 'decisions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('decisions')}
                  >
                    🧠 Decisions
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'goals' ? 'active' : ''}`}
                    onClick={() => setActiveTab('goals')}
                  >
                    🎯 Goals
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'personality' ? 'active' : ''}`}
                    onClick={() => setActiveTab('personality')}
                  >
                    🧬 Personality
                  </button>
                </div>
              </div>

              <div className="ai-details-content">
                {activeTab === 'decisions' && (
                  <div className="ai-decisions-tab">
                    <h4>Recent Decisions</h4>
                    <div className="decisions-list">
                      {selectedPlayer.recentDecisions.length === 0 ? (
                        <div className="no-data">No recent decisions available</div>
                      ) : (
                        selectedPlayer.recentDecisions.map(decision => (
                          <div key={decision.decisionId} className="decision-item">
                            <div className="decision-header">
                              <div className="decision-icon">
                                {getDecisionIcon(decision.decisionType)}
                              </div>
                              <div className="decision-info">
                                <div className="decision-type">
                                  {decision.decisionType.toUpperCase()}
                                </div>
                                <div className="decision-time">
                                  {formatTimestamp(decision.decisionTimestamp)}
                                </div>
                              </div>
                              <div className={`decision-outcome ${decision.decisionOutcome}`}>
                                {decision.decisionOutcome === 'success' ? '✅' : 
                                 decision.decisionOutcome === 'failure' ? '❌' : '⏳'}
                              </div>
                            </div>
                            <div className="decision-rationale">
                              <strong>Reasoning:</strong> {decision.decisionRationale}
                            </div>
                            <div className="decision-score">
                              <strong>Confidence:</strong> {decision.decisionScore}/10
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'goals' && (
                  <div className="ai-goals-tab">
                    <h4>Current Goals</h4>
                    <div className="goals-list">
                      {selectedPlayer.currentGoals.length === 0 ? (
                        <div className="no-data">No active goals</div>
                      ) : (
                        selectedPlayer.currentGoals.map(goal => (
                          <div key={goal.goalId} className="goal-item">
                            <div className="goal-header">
                              <div className="goal-icon">
                                {getGoalIcon(goal.goalType)}
                              </div>
                              <div className="goal-info">
                                <div className="goal-description">{goal.goalDescription}</div>
                                <div className="goal-target">Target: {goal.goalTarget}</div>
                              </div>
                              <div className="goal-priority">
                                Priority: {goal.goalPriority}/10
                              </div>
                            </div>
                            <div className="goal-progress">
                              <div className="progress-bar">
                                <div 
                                  className="progress-fill"
                                  style={{ width: `${goal.goalProgress}%` }}
                                />
                              </div>
                              <div className="progress-text">
                                {goal.goalProgress}% Complete
                              </div>
                            </div>
                            <div className={`goal-status ${goal.goalStatus}`}>
                              {goal.goalStatus.toUpperCase()}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'personality' && (
                  <div className="ai-personality-tab">
                    <h4>AI Personality Profile</h4>
                    <div className="personality-stats">
                      <div className="stat-item">
                        <div className="stat-label">Aggression Level</div>
                        <div className="stat-bar">
                          <div 
                            className="stat-fill aggression"
                            style={{ width: `${selectedPlayer.aggressionLevel * 10}%` }}
                          />
                        </div>
                        <div className="stat-value">{selectedPlayer.aggressionLevel}/10</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">Economic Focus</div>
                        <div className="stat-bar">
                          <div 
                            className="stat-fill economic"
                            style={{ width: `${selectedPlayer.economicFocus * 10}%` }}
                          />
                        </div>
                        <div className="stat-value">{selectedPlayer.economicFocus}/10</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">Military Focus</div>
                        <div className="stat-bar">
                          <div 
                            className="stat-fill military"
                            style={{ width: `${selectedPlayer.militaryFocus * 10}%` }}
                          />
                        </div>
                        <div className="stat-value">{selectedPlayer.militaryFocus}/10</div>
                      </div>
                    </div>
                    <div className="personality-description">
                      <strong>Personality Type:</strong> {selectedPlayer.aiPersonality}
                      <br />
                      <strong>Difficulty Level:</strong> {selectedPlayer.difficultyLevel}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="no-ai-selected">
              <div className="no-ai-message">
                Select an AI player to view their actions and decisions
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Actions Feed */}
      <div className="recent-actions-feed">
        <h4>🔄 Live Action Feed</h4>
        <div className="actions-feed">
          {recentActions.length === 0 ? (
            <div className="no-actions">No recent AI actions</div>
          ) : (
            recentActions.slice(0, 5).map(action => (
              <div key={action.decisionId} className="action-feed-item">
                <div className="action-icon">{getDecisionIcon(action.decisionType)}</div>
                <div className="action-text">
                  <strong>{action.aiPlayerName}</strong> {action.decisionType} - {action.decisionRationale}
                </div>
                <div className="action-time">{formatTimestamp(action.decisionTimestamp)}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AIActionVisualizer; 