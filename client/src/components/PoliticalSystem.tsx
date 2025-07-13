// 🏛️ Heroes of Time - Phase 4: Complete Perestroika Political System Interface
// Revolutionary political simulation with 4 specialized advisors and dynamic crisis events

import React, { useState, useEffect } from 'react';
import { 
  Advisor, 
  CrisisEvent, 
  CrisisDecision, 
  ReputationSystem, 
  PoliticalSystemState,
  ADVISORS,
  ALL_CRISIS_EVENTS,
  MILITARY_CRISES,
  ECONOMIC_CRISES,
  DIPLOMATIC_CRISES,
  SCIENTIFIC_CRISES
} from '../types/political';
import './PoliticalSystem.css';

interface PoliticalSystemProps {
  gameState: any;
  onDecisionMade: (crisisId: string, decisionId: string) => void;
}

const PoliticalSystem: React.FC<PoliticalSystemProps> = ({ gameState, onDecisionMade }) => {
  const [politicalState, setPoliticalState] = useState<PoliticalSystemState>({
    advisors: ADVISORS.map(advisor => ({
      ...advisor,
      relationships: {
        'general_volkov': 0,
        'dr_petrova': 0,
        'ambassador_kozlov': 0,
        'prof_ivanova': 0
      }
    })),
    currentCrisis: null,
    crisisHistory: [],
    reputation: {
      international: 50,
      domestic: 50,
      military: 50,
      economic: 50,
      diplomatic: 50,
      scientific: 50
    },
    reputationHistory: [],
    advisorInfluenceHistory: {},
    decisionHistory: [],
    turnsUntilNextCrisis: 3,
    crisisQueue: []
  });

  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState<CrisisDecision | null>(null);

  // Initialize advisor relationships
  useEffect(() => {
    const initializeRelationships = () => {
      const updatedAdvisors = politicalState.advisors.map(advisor => ({
        ...advisor,
        relationships: {
          'general_volkov': advisor.id === 'general_volkov' ? 0 : 
            advisor.id === 'dr_petrova' ? -20 : 
            advisor.id === 'ambassador_kozlov' ? 10 : -10,
          'dr_petrova': advisor.id === 'dr_petrova' ? 0 :
            advisor.id === 'general_volkov' ? -20 :
            advisor.id === 'ambassador_kozlov' ? 30 : 40,
          'ambassador_kozlov': advisor.id === 'ambassador_kozlov' ? 0 :
            advisor.id === 'general_volkov' ? 10 :
            advisor.id === 'dr_petrova' ? 30 : 20,
          'prof_ivanova': advisor.id === 'prof_ivanova' ? 0 :
            advisor.id === 'general_volkov' ? -10 :
            advisor.id === 'dr_petrova' ? 40 : 20
        }
      }));
      
      setPoliticalState(prev => ({
        ...prev,
        advisors: updatedAdvisors
      }));
    };

    initializeRelationships();
  }, []);

  // Generate crisis events
  useEffect(() => {
    const generateCrisis = () => {
      if (politicalState.turnsUntilNextCrisis <= 0 && !politicalState.currentCrisis) {
        const availableCrises = ALL_CRISIS_EVENTS.filter(crisis => 
          !politicalState.crisisHistory.some(resolved => resolved.id === crisis.id)
        );
        
        if (availableCrises.length > 0) {
          const randomCrisis = availableCrises[Math.floor(Math.random() * availableCrises.length)];
          setPoliticalState(prev => ({
            ...prev,
            currentCrisis: randomCrisis,
            turnsUntilNextCrisis: Math.floor(Math.random() * 5) + 3
          }));
          setShowCrisisModal(true);
        }
      }
    };

    generateCrisis();
  }, [politicalState.turnsUntilNextCrisis, politicalState.currentCrisis]);

  const handleDecisionMade = (decisionId: string) => {
    if (!politicalState.currentCrisis) return;

    const decision = politicalState.currentCrisis.decisions.find(d => d.id === decisionId);
    if (!decision) return;

    // Apply decision effects
    const updatedReputation = { ...politicalState.reputation };
    decision.immediateEffects.forEach(effect => {
      if (effect.type === 'reputation' && Math.random() < effect.probability) {
        updatedReputation[effect.target as keyof ReputationSystem] += effect.value;
      }
    });

    // Update advisor moods based on their support
    const updatedAdvisors = politicalState.advisors.map(advisor => {
      const support = politicalState.currentCrisis!.decisions.find(d => d.id === decisionId)?.advisorSupport[advisor.id] || 0;
      const moodChange = support > 50 ? 'pleased' : support < -50 ? 'angry' : 'neutral';
      
      return {
        ...advisor,
        mood: {
          ...advisor.mood,
          current: moodChange as any,
          factors: [`Decision: ${decision.title}`]
        }
      };
    });

    setPoliticalState(prev => ({
      ...prev,
      currentCrisis: null,
      crisisHistory: [...prev.crisisHistory, prev.currentCrisis!],
      reputation: updatedReputation,
      advisors: updatedAdvisors,
      decisionHistory: [...prev.decisionHistory, {
        crisisId: prev.currentCrisis!.id,
        decisionId,
        outcome: decision.title
      }]
    }));

    setShowCrisisModal(false);
    setSelectedDecision(null);
    onDecisionMade(politicalState.currentCrisis.id, decisionId);
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'pleased': return '#2ECC71';
      case 'neutral': return '#95A5A6';
      case 'concerned': return '#F39C12';
      case 'angry': return '#E74C3C';
      case 'furious': return '#8E44AD';
      default: return '#95A5A6';
    }
  };

  const getInfluenceBarColor = (influence: number) => {
    if (influence >= 80) return '#E74C3C';
    if (influence >= 60) return '#F39C12';
    if (influence >= 40) return '#F1C40F';
    return '#95A5A6';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor': return '#3498DB';
      case 'moderate': return '#F39C12';
      case 'major': return '#E74C3C';
      case 'catastrophic': return '#8E44AD';
      default: return '#95A5A6';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'military': return '🎖️';
      case 'economic': return '💰';
      case 'diplomatic': return '🤝';
      case 'scientific': return '🔬';
      default: return '⚡';
    }
  };

  return (
    <div className="political-system">
      <div className="political-header">
        <h2>🏛️ Political Council - Perestroika System</h2>
        <div className="crisis-countdown">
          <span>Next Crisis: {politicalState.turnsUntilNextCrisis} turns</span>
        </div>
      </div>

      {/* Reputation Display */}
      <div className="reputation-panel">
        <h3>📊 National Reputation</h3>
        <div className="reputation-bars">
          {Object.entries(politicalState.reputation).map(([type, value]) => (
            <div key={type} className="reputation-bar">
              <label>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
              <div className="bar-container">
                <div 
                  className="bar-fill"
                  style={{ 
                    width: `${Math.max(0, (value + 100) / 2)}%`,
                    backgroundColor: value > 0 ? '#2ECC71' : '#E74C3C'
                  }}
                />
                <span className="bar-value">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advisors Panel */}
      <div className="advisors-panel">
        <h3>👥 The Inner Circle</h3>
        <div className="advisors-grid">
          {politicalState.advisors.map(advisor => (
            <div 
              key={advisor.id}
              className={`advisor-card ${selectedAdvisor?.id === advisor.id ? 'selected' : ''}`}
              onClick={() => setSelectedAdvisor(selectedAdvisor?.id === advisor.id ? null : advisor)}
            >
              <div className="advisor-portrait">
                <div className="advisor-avatar">{advisor.name.split(' ')[0][0]}</div>
                <div 
                  className="advisor-mood"
                  style={{ backgroundColor: getMoodColor(advisor.mood.current) }}
                  title={`Mood: ${advisor.mood.current}`}
                />
              </div>
              
              <div className="advisor-info">
                <h4>{advisor.name}</h4>
                <p className="advisor-role">{advisor.type.charAt(0).toUpperCase() + advisor.type.slice(1)} Advisor</p>
                
                <div className="advisor-influence">
                  <span>Influence: {advisor.influence}%</span>
                  <div className="influence-bar">
                    <div 
                      className="influence-fill"
                      style={{ 
                        width: `${advisor.influence}%`,
                        backgroundColor: getInfluenceBarColor(advisor.influence)
                      }}
                    />
                  </div>
                </div>
                
                <div className="advisor-personality">
                  <span>Aggression: {advisor.personality.aggression}</span>
                  <span>Caution: {advisor.personality.caution}</span>
                  <span>Loyalty: {advisor.personality.loyalty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Advisor Details */}
      {selectedAdvisor && (
        <div className="advisor-details">
          <h3>📋 {selectedAdvisor.name} - Detailed Profile</h3>
          <div className="advisor-detail-content">
            <div className="advisor-biography">
              <h4>Biography</h4>
              <p>{selectedAdvisor.biography}</p>
            </div>
            
            <div className="advisor-expertise">
              <h4>Expertise</h4>
              <div className="expertise-tags">
                {selectedAdvisor.expertise.map(skill => (
                  <span key={skill} className="expertise-tag">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="advisor-relationships">
              <h4>Relationships with Other Advisors</h4>
              <div className="relationships-grid">
                {Object.entries(selectedAdvisor.relationships).map(([advisorId, relationship]) => {
                  const otherAdvisor = politicalState.advisors.find(a => a.id === advisorId);
                  if (!otherAdvisor || advisorId === selectedAdvisor.id) return null;
                  
                  return (
                    <div key={advisorId} className="relationship-item">
                      <span>{otherAdvisor.name.split(' ')[0]}</span>
                      <div className="relationship-bar">
                        <div 
                          className="relationship-fill"
                          style={{ 
                            width: `${(relationship + 100) / 2}%`,
                            backgroundColor: relationship > 0 ? '#2ECC71' : '#E74C3C'
                          }}
                        />
                      </div>
                      <span>{relationship > 0 ? '+' : ''}{relationship}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Crisis History */}
      <div className="crisis-history">
        <h3>📜 Crisis History</h3>
        <div className="crisis-timeline">
          {politicalState.crisisHistory.length === 0 ? (
            <p>No crises resolved yet.</p>
          ) : (
            politicalState.crisisHistory.map((crisis, index) => (
              <div key={crisis.id} className="crisis-history-item">
                <div className="crisis-icon">{getCategoryIcon(crisis.category)}</div>
                <div className="crisis-summary">
                  <h4>{crisis.title}</h4>
                  <p className="crisis-category">{crisis.category} crisis</p>
                  <span className={`crisis-severity ${crisis.severity}`}>
                    {crisis.severity}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Current Crisis Modal */}
      {showCrisisModal && politicalState.currentCrisis && (
        <div className="crisis-modal-overlay">
          <div className="crisis-modal">
            <div className="crisis-header">
              <h2>
                {getCategoryIcon(politicalState.currentCrisis.category)} {politicalState.currentCrisis.title}
              </h2>
              <span 
                className={`crisis-severity ${politicalState.currentCrisis.severity}`}
                style={{ color: getSeverityColor(politicalState.currentCrisis.severity) }}
              >
                {politicalState.currentCrisis.severity.toUpperCase()}
              </span>
            </div>
            
            <div className="crisis-content">
              <div className="crisis-description">
                <p>{politicalState.currentCrisis.description}</p>
                <div className="crisis-background">
                  <h4>Background Information</h4>
                  <p>{politicalState.currentCrisis.backgroundInfo}</p>
                </div>
              </div>
              
              <div className="crisis-decisions">
                <h3>Decision Options</h3>
                <div className="decisions-grid">
                  {politicalState.currentCrisis.decisions.map(decision => (
                    <div 
                      key={decision.id}
                      className={`decision-card ${selectedDecision?.id === decision.id ? 'selected' : ''}`}
                      onClick={() => setSelectedDecision(decision)}
                    >
                      <h4>{decision.title}</h4>
                      <p>{decision.description}</p>
                      
                      <div className="decision-risk">
                        <span className={`risk-level ${decision.riskLevel}`}>
                          Risk: {decision.riskLevel}
                        </span>
                        <span className="success-chance">
                          Success: {Math.round(decision.probability * 100)}%
                        </span>
                      </div>
                      
                      <div className="advisor-support">
                        <h5>Advisor Support</h5>
                        <div className="support-grid">
                          {Object.entries(decision.advisorSupport).map(([advisorId, support]) => {
                            const advisor = politicalState.advisors.find(a => a.id === advisorId);
                            if (!advisor) return null;
                            
                            return (
                              <div key={advisorId} className="support-item">
                                <span>{advisor.name.split(' ')[0]}</span>
                                <div className="support-bar">
                                  <div 
                                    className="support-fill"
                                    style={{ 
                                      width: `${(support + 100) / 2}%`,
                                      backgroundColor: support > 0 ? '#2ECC71' : '#E74C3C'
                                    }}
                                  />
                                </div>
                                <span>{support > 0 ? '+' : ''}{support}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="crisis-actions">
              <button
                className="crisis-cancel-btn"
                onClick={() => setShowCrisisModal(false)}
              >
                Delay Decision
              </button>
              <button
                className="crisis-confirm-btn"
                onClick={() => selectedDecision && handleDecisionMade(selectedDecision.id)}
                disabled={!selectedDecision}
              >
                Confirm Decision
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Advisor Recommendations Panel */}
      {politicalState.currentCrisis && (
        <div className="advisor-recommendations">
          <h3>🗣️ Advisor Recommendations</h3>
          <div className="recommendations-grid">
            {politicalState.advisors.map(advisor => {
              const reaction = politicalState.currentCrisis!.advisorReactions[advisor.id];
              if (!reaction) return null;
              
              return (
                <div key={advisor.id} className="recommendation-card">
                  <div className="recommendation-header">
                    <h4>{advisor.name}</h4>
                    <span className="advisor-type">{advisor.type}</span>
                  </div>
                  
                  <div className="recommendation-content">
                    <blockquote>"{reaction.recommendation}"</blockquote>
                    
                    <div className="reasoning">
                      <h5>Reasoning:</h5>
                      <ul>
                        {reaction.reasoning.map((reason, index) => (
                          <li key={index}>{reason}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {reaction.warnings.length > 0 && (
                      <div className="warnings">
                        <h5>⚠️ Warnings:</h5>
                        <ul>
                          {reaction.warnings.map((warning, index) => (
                            <li key={index}>{warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PoliticalSystem; 