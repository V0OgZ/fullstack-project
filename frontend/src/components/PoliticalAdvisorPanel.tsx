import React, { useState, useEffect } from 'react';
import { PoliticalAdvisor, PoliticalEvent, Reputation } from '../types/game';
import { PoliticalAdvisorService, POLITICAL_ADVISORS } from '../services/politicalAdvisorService';
import './PoliticalAdvisorPanel.css';

interface PoliticalAdvisorPanelProps {
  currentReputation: Reputation;
  currentTurn: number;
  onEventDecision?: (eventId: string, choiceId: string) => void;
}

const PoliticalAdvisorPanel: React.FC<PoliticalAdvisorPanelProps> = ({
  currentReputation,
  currentTurn,
  onEventDecision
}) => {
  const [advisors, setAdvisors] = useState<PoliticalAdvisor[]>(POLITICAL_ADVISORS);
  const [currentEvent, setCurrentEvent] = useState<PoliticalEvent | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Generate random events periodically
  useEffect(() => {
    const eventTimer = setInterval(() => {
      if (!currentEvent && Math.random() < 0.3) { // 30% chance each interval
        const newEvent = PoliticalAdvisorService.generateRandomPoliticalEvent(
          currentReputation, 
          currentTurn
        );
        setCurrentEvent(newEvent);
        console.log('🏛️ New political event:', newEvent.title);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(eventTimer);
  }, [currentEvent, currentReputation, currentTurn]);

  const handleDecision = (choiceId: string) => {
    if (!currentEvent) return;

    const choice = currentEvent.choices.find(c => c.id === choiceId);
    if (!choice) return;

    // Update advisor opinions
    const updatedAdvisors = PoliticalAdvisorService.updateAdvisorOpinions(advisors, choice);
    setAdvisors(updatedAdvisors);

    // Notify parent component
    onEventDecision?.(currentEvent.id, choiceId);

    // Clear current event
    setCurrentEvent(null);
    setSelectedChoice(null);

    console.log('📊 Political decision made:', choice.text);
  };

  const getOpinionColor = (opinion: number): string => {
    if (opinion > 50) return '#4CAF50'; // Green
    if (opinion > 0) return '#FFC107';  // Yellow
    if (opinion > -50) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const getPersonalityIcon = (personality: string): string => {
    switch (personality) {
      case 'aggressive': return '⚔️';
      case 'cautious': return '🛡️';
      case 'opportunistic': return '💰';
      case 'idealistic': return '⭐';
      default: return '👤';
    }
  };

  const stability = PoliticalAdvisorService.calculatePoliticalStability(advisors);

  return (
    <div className="political-advisor-panel">
      <div className="panel-header">
        <h3>🏛️ Political Advisors</h3>
        <div className="stability-indicator">
          <span>Stability: </span>
          <div 
            className={`stability-bar ${stability.riskLevel}`}
            style={{ width: `${stability.stability}%` }}
          >
            {Math.round(stability.stability)}%
          </div>
        </div>
      </div>

      {/* Advisor Cards */}
      <div className="advisors-grid">
        {advisors.map(advisor => (
          <div key={advisor.id} className="advisor-card">
            <div className="advisor-header">
              <span className="advisor-avatar">{advisor.avatar}</span>
              <div className="advisor-info">
                <div className="advisor-name">{advisor.name}</div>
                <div className="advisor-role">{advisor.role}</div>
              </div>
              <div className="advisor-personality">
                {getPersonalityIcon(advisor.personality)}
              </div>
            </div>
            
            <div className="advisor-stats">
              <div className="stat">
                <label>Opinion:</label>
                <div 
                  className="opinion-bar"
                  style={{ 
                    backgroundColor: getOpinionColor(advisor.opinion),
                    width: `${Math.abs(advisor.opinion)}%` 
                  }}
                >
                  {advisor.opinion > 0 ? '+' : ''}{advisor.opinion}
                </div>
              </div>
              <div className="stat">
                <label>Influence:</label>
                <div className="influence-bar" style={{ width: `${advisor.influence}%` }}>
                  {advisor.influence}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Current Political Event */}
      {currentEvent && (
        <div className="political-event">
          <div className="event-header">
            <h4>📢 {currentEvent.title}</h4>
            <span className={`severity ${currentEvent.severity}`}>
              {currentEvent.severity.toUpperCase()}
            </span>
          </div>
          
          <p className="event-description">{currentEvent.description}</p>
          
          <div className="event-choices">
            {currentEvent.choices.map(choice => (
              <div key={choice.id} className="choice-option">
                <button
                  className={`choice-button ${selectedChoice === choice.id ? 'selected' : ''}`}
                  onClick={() => setSelectedChoice(choice.id)}
                >
                  {choice.text}
                </button>
                
                {selectedChoice === choice.id && (
                  <div className="choice-details">
                    <div className="consequences">
                      <h5>Consequences:</h5>
                      <ul>
                        <li>Reputation: {choice.consequences.reputation > 0 ? '+' : ''}{choice.consequences.reputation}</li>
                        {choice.consequences.resources.gold && (
                          <li>Gold: {choice.consequences.resources.gold > 0 ? '+' : ''}{choice.consequences.resources.gold}</li>
                        )}
                      </ul>
                    </div>
                    
                    {showRecommendations && (
                      <div className="advisor-recommendations">
                        <h5>Advisor Recommendations:</h5>
                        {Object.entries(choice.advisorRecommendations).map(([advisorId, recommendation]) => {
                          const advisor = advisors.find(a => a.id === advisorId);
                          return (
                            <div key={advisorId} className="recommendation">
                              <span className="advisor-name">{advisor?.name}:</span>
                              <span className={`recommendation-level ${recommendation}`}>
                                {recommendation.replace('_', ' ')}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    <div className="choice-actions">
                      <button
                        className="toggle-recommendations"
                        onClick={() => setShowRecommendations(!showRecommendations)}
                      >
                        {showRecommendations ? 'Hide' : 'Show'} Recommendations
                      </button>
                      <button
                        className="confirm-choice"
                        onClick={() => handleDecision(choice.id)}
                      >
                        Confirm Decision
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stability Warnings */}
      {stability.concerns.length > 0 && (
        <div className="stability-warnings">
          <h4>⚠️ Political Concerns:</h4>
          <ul>
            {stability.concerns.map((concern, index) => (
              <li key={index}>{concern}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PoliticalAdvisorPanel; 