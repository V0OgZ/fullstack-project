import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { PoliticalAdvisor, PoliticalEvent, PoliticalChoice, Reputation } from '../types/game';
import './PoliticalSystem.css';

interface PoliticalSystemProps {
  isVisible: boolean;
  onClose: () => void;
}

const PoliticalSystem: React.FC<PoliticalSystemProps> = ({ isVisible, onClose }) => {
  const { 
    currentPlayer
  } = useGameStore();

  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showAdvisorDetails, setShowAdvisorDetails] = useState<string | null>(null);

  // Données de démonstration pour les conseillers
  const demoAdvisors: PoliticalAdvisor[] = [
    {
      id: 'military_advisor',
      name: 'Général Volkov',
      role: 'military',
      opinion: 75,
      influence: 85,
      personality: 'aggressive',
      avatar: '🎖️'
    },
    {
      id: 'economic_advisor',
      name: 'Dr. Petrov',
      role: 'economic',
      opinion: -20,
      influence: 70,
      personality: 'cautious',
      avatar: '📊'
    },
    {
      id: 'diplomatic_advisor',
      name: 'Ambassadeur Kozlov',
      role: 'diplomatic',
      opinion: 45,
      influence: 60,
      personality: 'opportunistic',
      avatar: '🤝'
    },
    {
      id: 'scientific_advisor',
      name: 'Prof. Ivanova',
      role: 'scientific',
      opinion: 10,
      influence: 55,
      personality: 'idealistic',
      avatar: '🔬'
    }
  ];

  // Événement politique de démonstration
  const demoEvent: PoliticalEvent = {
    id: 'border_crisis',
    type: 'crisis',
    title: 'Crise Frontalière',
    description: 'Des tensions montent à la frontière nord. Les forces ennemies se massent près de nos territoires. Nos espions rapportent une possible invasion imminente. Comment réagissons-nous ?',
    choices: [
      {
        id: 'military_response',
        text: 'Mobiliser nos forces et préparer une réponse militaire',
        consequences: {
          reputation: -10,
          resources: { gold: -500, mana: -100 },
          advisorOpinions: { 'military_advisor': 30, 'diplomatic_advisor': -20 },
          futureEvents: ['military_escalation']
        },
        advisorRecommendations: {
          'military_advisor': 'strongly_support',
          'economic_advisor': 'oppose',
          'diplomatic_advisor': 'strongly_oppose',
          'scientific_advisor': 'neutral'
        }
      },
      {
        id: 'diplomatic_solution',
        text: 'Envoyer des diplomates pour négocier',
        consequences: {
          reputation: 15,
          resources: { gold: -200 },
          advisorOpinions: { 'diplomatic_advisor': 25, 'military_advisor': -15 },
          futureEvents: ['diplomatic_summit']
        },
        advisorRecommendations: {
          'military_advisor': 'oppose',
          'economic_advisor': 'support',
          'diplomatic_advisor': 'strongly_support',
          'scientific_advisor': 'support'
        }
      },
      {
        id: 'economic_pressure',
        text: 'Imposer des sanctions économiques',
        consequences: {
          reputation: 5,
          resources: { gold: -300, wood: -100 },
          advisorOpinions: { 'economic_advisor': 20, 'military_advisor': -10 },
          futureEvents: ['trade_war']
        },
        advisorRecommendations: {
          'military_advisor': 'neutral',
          'economic_advisor': 'strongly_support',
          'diplomatic_advisor': 'support',
          'scientific_advisor': 'neutral'
        }
      },
      {
        id: 'scientific_approach',
        text: 'Développer de nouvelles technologies défensives',
        consequences: {
          reputation: 8,
          resources: { gold: -400, mana: -200 },
          advisorOpinions: { 'scientific_advisor': 35, 'military_advisor': 10 },
          futureEvents: ['tech_breakthrough']
        },
        advisorRecommendations: {
          'military_advisor': 'support',
          'economic_advisor': 'neutral',
          'diplomatic_advisor': 'neutral',
          'scientific_advisor': 'strongly_support'
        }
      }
    ],
    deadline: new Date(Date.now() + 3 * 60 * 1000).toISOString(), // 3 minutes
    severity: 'high',
    consequences: ['La décision affectera nos relations internationales', 'Impact sur l\'économie à long terme']
  };

  const demoReputation: Reputation = {
    international: 45,
    domestic: 60,
    military: 75,
    economic: 30,
    diplomatic: 55
  };

  const getAdvisorRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'strongly_support': return '#4CAF50';
      case 'support': return '#8BC34A';
      case 'neutral': return '#FFC107';
      case 'oppose': return '#FF9800';
      case 'strongly_oppose': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getAdvisorRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'strongly_support': return 'Fortement Favorable';
      case 'support': return 'Favorable';
      case 'neutral': return 'Neutre';
      case 'oppose': return 'Défavorable';
      case 'strongly_oppose': return 'Fortement Défavorable';
      default: return 'Inconnu';
    }
  };

  const handleChoiceSelection = (choiceId: string) => {
    setSelectedChoice(choiceId);
  };

  const handleConfirmChoice = () => {
    if (selectedChoice && demoEvent) {
      const choice = demoEvent.choices.find(c => c.id === selectedChoice);
      if (choice) {
        // Appliquer les conséquences (simulation)
        console.log('Choix politique:', selectedChoice);
        onClose();
      }
    }
  };

  const formatTimeRemaining = (deadline: string) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expiré';
    
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Utiliser les données de démonstration
  const advisors = demoAdvisors;
  const event = demoEvent;
  const rep = demoReputation;

  if (!isVisible) return null;

  return (
    <div className="political-system-overlay">
      <div className="political-system-modal">
        <div className="modal-header">
          <h2>🏛️ Conseil Politique</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="modal-content">
          {/* Réputation actuelle */}
          <div className="reputation-panel">
            <h3>📊 Réputation</h3>
            <div className="reputation-bars">
              <div className="reputation-item">
                <span>International:</span>
                <div className="reputation-bar">
                  <div 
                    className="reputation-fill" 
                    style={{ 
                      width: `${Math.max(0, rep.international + 100) / 2}%`,
                      backgroundColor: rep.international > 0 ? '#4CAF50' : '#F44336'
                    }}
                  />
                  <span className="reputation-value">{rep.international}</span>
                </div>
              </div>
              <div className="reputation-item">
                <span>Domestique:</span>
                <div className="reputation-bar">
                  <div 
                    className="reputation-fill" 
                    style={{ 
                      width: `${Math.max(0, rep.domestic + 100) / 2}%`,
                      backgroundColor: rep.domestic > 0 ? '#4CAF50' : '#F44336'
                    }}
                  />
                  <span className="reputation-value">{rep.domestic}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conseillers */}
          <div className="advisors-panel">
            <h3>👥 Conseillers</h3>
            <div className="advisors-grid">
              {advisors.map(advisor => (
                <div 
                  key={advisor.id} 
                  className={`advisor-card ${showAdvisorDetails === advisor.id ? 'selected' : ''}`}
                  onClick={() => setShowAdvisorDetails(showAdvisorDetails === advisor.id ? null : advisor.id)}
                >
                  <div className="advisor-avatar">{advisor.avatar}</div>
                  <div className="advisor-info">
                    <div className="advisor-name">{advisor.name}</div>
                    <div className="advisor-role">{advisor.role}</div>
                    <div className="advisor-opinion" style={{ 
                      color: advisor.opinion > 0 ? '#4CAF50' : advisor.opinion < 0 ? '#F44336' : '#FFC107'
                    }}>
                      Opinion: {advisor.opinion > 0 ? '+' : ''}{advisor.opinion}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Événement politique actuel */}
          <div className="event-panel">
            <div className="event-header">
              <h3>⚡ {event.title}</h3>
              <div className={`event-severity ${event.severity}`}>
                {event.severity.toUpperCase()}
              </div>
              <div className="event-timer">
                ⏱️ {formatTimeRemaining(event.deadline)}
              </div>
            </div>
            
            <div className="event-description">
              {event.description}
            </div>

            {/* Choix disponibles */}
            <div className="choices-panel">
              <h4>Choix disponibles:</h4>
              {event.choices.map(choice => (
                <div 
                  key={choice.id} 
                  className={`choice-card ${selectedChoice === choice.id ? 'selected' : ''}`}
                  onClick={() => handleChoiceSelection(choice.id)}
                >
                  <div className="choice-text">{choice.text}</div>
                  
                  {/* Recommandations des conseillers */}
                  <div className="advisor-recommendations">
                    {advisors.map(advisor => (
                      <div 
                        key={advisor.id} 
                        className="advisor-recommendation"
                        style={{ 
                          color: getAdvisorRecommendationColor(choice.advisorRecommendations[advisor.id])
                        }}
                      >
                        {advisor.avatar} {getAdvisorRecommendationText(choice.advisorRecommendations[advisor.id])}
                      </div>
                    ))}
                  </div>

                  {/* Conséquences prévues */}
                  <div className="consequences">
                    <div className="consequence-item">
                      📈 Réputation: {choice.consequences.reputation > 0 ? '+' : ''}{choice.consequences.reputation}
                    </div>
                    {Object.entries(choice.consequences.resources).map(([resource, amount]) => (
                      <div key={resource} className="consequence-item">
                        💰 {resource}: {amount && amount > 0 ? '+' : ''}{amount}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bouton de confirmation */}
            <div className="action-buttons">
              <button 
                className="confirm-button"
                onClick={handleConfirmChoice}
                disabled={!selectedChoice}
              >
                Confirmer la Décision
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticalSystem; 