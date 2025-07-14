import React, { useState, useEffect } from 'react';
import { PoliticalAdvisor, PoliticalEvent, PoliticalChoice } from '../types/game';
import { BackendPoliticalAdvisorService } from '../services/backendPoliticalAdvisorService';
import './PoliticalAdvisorPanel.css';

interface PoliticalAdvisorPanelProps {
  currentReputation: any;
  currentTurn: number;
  onEventDecision?: (eventId: string, choiceId: string) => void;
}

const PoliticalAdvisorPanel: React.FC<PoliticalAdvisorPanelProps> = ({
  currentReputation,
  currentTurn,
  onEventDecision
}) => {
  const [advisors, setAdvisors] = useState<PoliticalAdvisor[]>([]);
  const [currentEvent, setCurrentEvent] = useState<PoliticalEvent | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState(false);

  // Initialize advisors from backend
  useEffect(() => {
    const initializeAdvisors = async () => {
      try {
        const isAvailable = await BackendPoliticalAdvisorService.isBackendAvailable();
        setBackendAvailable(isAvailable);
        
        if (isAvailable) {
          const backendAdvisors = await BackendPoliticalAdvisorService.getPoliticalAdvisors();
          setAdvisors(backendAdvisors);
        }
      } catch (error) {
        console.error('Error initializing advisors:', error);
        setBackendAvailable(false);
      }
    };

    initializeAdvisors();
  }, []);

  // Generate random events periodically using backend
  useEffect(() => {
    if (!backendAvailable) return;

    // DISABLED: Too many requests causing backend to crash
    // const eventTimer = setInterval(async () => {
    //   if (!currentEvent && Math.random() < 0.3) { // 30% chance each interval
    //     try {
    //       const newEvent = await BackendPoliticalAdvisorService.generateRandomPoliticalEvent(
    //         currentReputation, 
    //         currentTurn
    //       );
    //       if (newEvent) {
    //         setCurrentEvent(newEvent);
    //         console.log('🏛️ New political event from backend:', newEvent.title);
    //       }
    //     } catch (error) {
    //       console.error('Error generating political event:', error);
    //     }
    //   }
    // }, 10000); // Check every 10 seconds

    // return () => clearInterval(eventTimer);
  }, [currentEvent, currentReputation, currentTurn, backendAvailable]);

  const handleDecision = async (choiceId: string) => {
    if (!currentEvent || !backendAvailable) return;

    const choice = currentEvent.choices.find(c => c.id === choiceId);
    if (!choice) return;

    try {
      // Update advisor opinions using backend
      const updatedAdvisors = await BackendPoliticalAdvisorService.updateAdvisorOpinions(advisors, choice);
      setAdvisors(updatedAdvisors);

      // Notify parent component
      onEventDecision?.(currentEvent.id, choiceId);

      // Clear current event
      setCurrentEvent(null);
      setSelectedChoice(null);

      console.log('📊 Political decision made via backend:', choice.text);
    } catch (error) {
      console.error('Error handling decision:', error);
    }
  };

  const getOpinionColor = (opinion: number): string => {
    if (opinion > 50) return '#4CAF50'; // Green
    if (opinion > 0) return '#FFC107';  // Yellow
    if (opinion > -50) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const getOpinionText = (opinion: number): string => {
    if (opinion > 50) return 'Strongly Supports';
    if (opinion > 0) return 'Supports';
    if (opinion > -50) return 'Neutral';
    return 'Opposes';
  };

  // Show fallback message if backend is not available
  if (!backendAvailable) {
    return (
      <div className="political-advisor-panel">
        <div className="panel-header">
          <h3>🏛️ Political Council</h3>
          <div className="backend-status offline">
            Backend AI Service Offline
          </div>
        </div>
        <div className="fallback-message">
          <p>Political advisor system requires backend AI service.</p>
          <p>Please ensure the backend is running on port 8080.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="political-advisor-panel">
      <div className="panel-header">
        <h3>🏛️ Political Council</h3>
        <div className="backend-status online">
          Backend AI Service Online
        </div>
      </div>
      
      {/* Advisors List */}
      <div className="advisors-list">
        <h4>Your Advisors</h4>
        {advisors.map(advisor => (
          <div key={advisor.id} className="advisor-card">
            <div className="advisor-header">
              <span className="advisor-avatar">{advisor.avatar}</span>
              <div className="advisor-info">
                <div className="advisor-name">{advisor.name}</div>
                <div className="advisor-role">{advisor.role}</div>
              </div>
            </div>
            <div className="advisor-opinion">
              <div className="opinion-bar">
                <div 
                  className="opinion-fill"
                  style={{ 
                    width: `${Math.max(0, (advisor.opinion + 100) / 2)}%`,
                    backgroundColor: getOpinionColor(advisor.opinion)
                  }}
                />
              </div>
              <span className="opinion-text" style={{ color: getOpinionColor(advisor.opinion) }}>
                {getOpinionText(advisor.opinion)} ({advisor.opinion > 0 ? '+' : ''}{advisor.opinion})
              </span>
            </div>
            <div className="advisor-influence">
              Influence: {advisor.influence}%
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
                    <button 
                      className="recommendations-toggle"
                      onClick={() => setShowRecommendations(!showRecommendations)}
                    >
                      {showRecommendations ? '🔼 Hide' : '🔽 Show'} Advisor Recommendations
                    </button>
                    
                    {showRecommendations && (
                      <div className="advisor-recommendations">
                        {Object.entries(choice.advisorRecommendations || {}).map(([advisorId, recommendation]) => {
                          const advisor = advisors.find(a => a.id === advisorId);
                          if (!advisor) return null;
                          
                          return (
                            <div key={advisorId} className="recommendation">
                              <span className="advisor-name">{advisor.name}:</span>
                              <span className={`recommendation-level ${recommendation}`}>
                                {recommendation.replace('_', ' ')}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    <button
                      className="decision-button"
                      onClick={() => handleDecision(choice.id)}
                    >
                      Make This Decision
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Political Stability Indicator */}
      <div className="stability-indicator">
        <h4>📊 Political Stability</h4>
        <div className="stability-info">
          <div className="stability-bar">
            <div 
              className="stability-fill"
              style={{ 
                width: `${(advisors.reduce((sum, a) => sum + a.opinion, 0) / advisors.length + 100) / 2}%`,
                backgroundColor: '#4CAF50'
              }}
            />
          </div>
          <span className="stability-text">
            {advisors.length > 0 ? 
              `${Math.round((advisors.reduce((sum, a) => sum + a.opinion, 0) / advisors.length + 100) / 2)}% Stable` : 
              'No data'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default PoliticalAdvisorPanel; 