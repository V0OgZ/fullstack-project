import React, { useState, useEffect } from 'react';
import './FordTimelinePanel.css';

interface Timeline {
  id: number;
  name: string;
  paradoxRisk: number;
  temporalStability: number;
  affectedRadius: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  color: string;
  description: string;
}

interface CombatResult {
  won: boolean;
  damage: number;
  survived: boolean;
  message: string;
}

const FordTimelinePanel: React.FC = () => {
  const [currentTimeline, setCurrentTimeline] = useState<number>(1);
  const [combatResults, setCombatResults] = useState<Map<number, CombatResult>>(new Map());
  const [totalWins, setTotalWins] = useState<number>(0);
  const [isIncarnated, setIsIncarnated] = useState<boolean>(false);
  const [fordMessage, setFordMessage] = useState<string>("Click 'Incarnate' to enter the park...");

  const timelines: Timeline[] = [
    {
      id: 1,
      name: "Timeline Alpha",
      paradoxRisk: 0.2,
      temporalStability: 0.9,
      affectedRadius: 3.0,
      difficulty: 'Easy',
      color: '#4CAF50',
      description: "Stable reality, low paradox risk"
    },
    {
      id: 2,
      name: "Timeline Beta", 
      paradoxRisk: 0.8,
      temporalStability: 0.4,
      affectedRadius: 6.5,
      difficulty: 'Extreme',
      color: '#F44336',
      description: "Chaotic reality, high paradox risk"
    },
    {
      id: 3,
      name: "Timeline Gamma",
      paradoxRisk: 0.45,
      temporalStability: 0.75,
      affectedRadius: 4.2,
      difficulty: 'Medium',
      color: '#FF9800',
      description: "Balanced reality, moderate stability"
    },
    {
      id: 4,
      name: "Timeline Delta",
      paradoxRisk: 0.15,
      temporalStability: 0.95,
      affectedRadius: 2.8,
      difficulty: 'Easy',
      color: '#2196F3',
      description: "Ultra-stable, minimal paradox"
    },
    {
      id: 5,
      name: "Timeline Epsilon",
      paradoxRisk: 0.7,
      temporalStability: 0.3,
      affectedRadius: 8.0,
      difficulty: 'Hard',
      color: '#9C27B0',
      description: "Unstable reality, wide effect radius"
    },
    {
      id: 6,
      name: "Timeline Zeta",
      paradoxRisk: 0.35,
      temporalStability: 0.8,
      affectedRadius: 3.5,
      difficulty: 'Medium',
      color: '#00BCD4',
      description: "Moderate paradox, good stability"
    },
    {
      id: 7,
      name: "Timeline Eta",
      paradoxRisk: 0.9,
      temporalStability: 0.1,
      affectedRadius: 12.0,
      difficulty: 'Extreme',
      color: '#795548',
      description: "Reality breakdown imminent"
    },
    {
      id: 8,
      name: "Timeline Theta",
      paradoxRisk: 0.25,
      temporalStability: 0.85,
      affectedRadius: 4.0,
      difficulty: 'Easy',
      color: '#607D8B',
      description: "Stable quantum state"
    }
  ];

  const getCurrentTimeline = () => timelines.find(t => t.id === currentTimeline)!;

  const calculateCombatSuccess = (timeline: Timeline): boolean => {
    // Walter's Algorithm: paradoxRisk < 0.3 AND temporalStability > 0.7 = Combat possible
    const walterCondition = timeline.paradoxRisk < 0.3 && timeline.temporalStability > 0.7;
    
    // Add some randomness for realism
    const randomFactor = Math.random();
    const successChance = walterCondition ? 0.8 : 0.2;
    
    return randomFactor < successChance;
  };

  const handleIncarnation = () => {
    setIsIncarnated(true);
    setFordMessage("You're in the park now. Choose your timeline wisely...");
  };

  const handleTimelineSwitch = (timelineId: number) => {
    if (!isIncarnated) {
      setFordMessage("You must incarnate first to access the timelines.");
      return;
    }
    
    setCurrentTimeline(timelineId);
    const timeline = timelines.find(t => t.id === timelineId)!;
    setFordMessage(`Switched to ${timeline.name}. ${timeline.description}`);
  };

  const handleCombat = () => {
    if (!isIncarnated) {
      setFordMessage("Incarnation required before combat.");
      return;
    }

    const timeline = getCurrentTimeline();
    const success = calculateCombatSuccess(timeline);
    
    const result: CombatResult = {
      won: success,
      damage: Math.floor(Math.random() * 100) + 50,
      survived: success,
      message: success 
        ? `Victory in ${timeline.name}! The quantum formulas favored you.`
        : `Defeated in ${timeline.name}. The paradox risk was too high.`
    };

    const newResults = new Map(combatResults);
    newResults.set(currentTimeline, result);
    setCombatResults(newResults);

    if (success && !combatResults.has(currentTimeline)) {
      setTotalWins(prev => prev + 1);
    }

    // Ford's response
    if (success) {
      if (totalWins + 1 === 8) {
        setFordMessage("Perfect. You've mastered all timelines. The park recognizes you as worthy. Here are your 10 cosmic spells.");
      } else {
        setFordMessage(`Ford nods approvingly. ${8 - (totalWins + 1)} timelines remain.`);
      }
    } else {
      setFordMessage("Ford: The park is unforgiving. Learn from this failure.");
    }
  };

  const getTimelineStatusIcon = (timelineId: number) => {
    const result = combatResults.get(timelineId);
    if (!result) return '⚪';
    return result.won ? '✅' : '❌';
  };

  const getFordReward = () => {
    if (totalWins === 8) {
      return "🌟 FORD'S REWARD: 10 Cosmic Spells Unlocked!";
    } else if (totalWins >= 6) {
      return `🔮 Progress: ${totalWins}/8 - Ford is impressed`;
    } else if (totalWins >= 3) {
      return `⚡ Progress: ${totalWins}/8 - You're learning`;
    } else {
      return `🎭 Progress: ${totalWins}/8 - Ford watches silently`;
    }
  };

  return (
    <div className="ford-timeline-panel">
      <div className="panel-header">
        <h2>🎭 Ford's Timeline Mastery</h2>
        <p className="ford-subtitle">"Welcome to the park. Now prove you understand it."</p>
      </div>

      <div className="incarnation-section">
        <button 
          className={`incarnation-btn ${isIncarnated ? 'incarnated' : ''}`}
          onClick={handleIncarnation}
          disabled={isIncarnated}
        >
          {isIncarnated ? '✅ Incarnated' : '🎭 Incarnate into Park'}
        </button>
        <div className="ford-message">{fordMessage}</div>
      </div>

      <div className="timeline-grid">
        {timelines.map(timeline => (
          <div 
            key={timeline.id}
            className={`timeline-card ${currentTimeline === timeline.id ? 'active' : ''} ${timeline.difficulty.toLowerCase()}`}
            style={{ borderColor: timeline.color }}
            onClick={() => handleTimelineSwitch(timeline.id)}
          >
            <div className="timeline-header">
              <span className="timeline-status">{getTimelineStatusIcon(timeline.id)}</span>
              <h3 style={{ color: timeline.color }}>{timeline.name}</h3>
              <span className={`difficulty-badge ${timeline.difficulty.toLowerCase()}`}>
                {timeline.difficulty}
              </span>
            </div>
            
            <div className="quantum-formulas">
              <div className="formula-row">
                <span className="formula-label">paradoxRisk:</span>
                <span className={`formula-value ${timeline.paradoxRisk < 0.3 ? 'safe' : 'danger'}`}>
                  {timeline.paradoxRisk.toFixed(2)}
                </span>
              </div>
              <div className="formula-row">
                <span className="formula-label">temporalStability:</span>
                <span className={`formula-value ${timeline.temporalStability > 0.7 ? 'safe' : 'danger'}`}>
                  {timeline.temporalStability.toFixed(2)}
                </span>
              </div>
              <div className="formula-row">
                <span className="formula-label">affectedRadius:</span>
                <span className="formula-value">{timeline.affectedRadius.toFixed(1)}</span>
              </div>
            </div>

            <p className="timeline-description">{timeline.description}</p>
            
            {combatResults.has(timeline.id) && (
              <div className="combat-result">
                <p className={combatResults.get(timeline.id)!.won ? 'victory' : 'defeat'}>
                  {combatResults.get(timeline.id)!.message}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="combat-section">
        <div className="current-timeline-info">
          <h3>Current: {getCurrentTimeline().name}</h3>
          <div className="walter-analysis">
            <h4>⚡ Walter's Combat Analysis:</h4>
            <p className={getCurrentTimeline().paradoxRisk < 0.3 && getCurrentTimeline().temporalStability > 0.7 ? 'favorable' : 'unfavorable'}>
              {getCurrentTimeline().paradoxRisk < 0.3 && getCurrentTimeline().temporalStability > 0.7 
                ? "✅ FAVORABLE: Low paradox risk, high stability - Combat recommended"
                : "⚠️ UNFAVORABLE: High risk or low stability - Combat dangerous"
              }
            </p>
          </div>
        </div>

        <button 
          className="combat-btn"
          onClick={handleCombat}
          disabled={!isIncarnated}
        >
          ⚔️ Engage Combat
        </button>
      </div>

      <div className="progress-section">
        <div className="reward-status">
          <h3>{getFordReward()}</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(totalWins / 8) * 100}%` }}
            ></div>
          </div>
          <p>{totalWins}/8 Timelines Mastered</p>
        </div>

        {totalWins === 8 && (
          <div className="cosmic-spells">
            <h4>🌟 COSMIC SPELLS UNLOCKED:</h4>
            <div className="spell-list">
              <span>🌀 Reality Collapse</span>
              <span>⏰ Time Fracture</span>
              <span>🔗 Quantum Entanglement</span>
              <span>🌌 Dimensional Rift</span>
              <span>⚡ Entropy Acceleration</span>
              <span>🔄 Causal Loop Break</span>
              <span>👻 Void Summon</span>
              <span>📝 Reality Rewrite</span>
              <span>🌪️ Cosmic Storm</span>
              <span>❌ Existence Nullify</span>
            </div>
          </div>
        )}
      </div>

      <div className="ford-quote">
        <p>"The difference between a game and reality is that reality changes you when you touch it."</p>
        <cite>- Dr. Robert Ford</cite>
      </div>
    </div>
  );
};

export default FordTimelinePanel; 