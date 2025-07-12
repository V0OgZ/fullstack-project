// Heroes of Time and Magic - Temporal Game Page
// The revolutionary spacetime strategy game

import React, { useEffect, useState } from 'react';
import { TemporalInterface } from '../components/TemporalInterface';
import { useTemporalStore, useCurrentPlayer, useGameLoop, useEntropyMonitor } from '../store/useTemporalStore';
import { Player, Position } from '../types/game';
import { SpacetimePosition, TemporalSpellType, ActionPlan } from '../types/temporal';
import './TemporalGame.css';

/**
 * Main temporal game page component
 */
const TemporalGame: React.FC = () => {
  const {
    gameState,
    initializeGame,
    planAction,
    castSpell,
    setSelectedZone,
    pause,
    resume,
    isPaused,
    setGameSpeed,
    gameSpeed,
    reset
  } = useTemporalStore();

  const currentPlayer = useCurrentPlayer();
  const { startGameLoop } = useGameLoop();
  const entropyMonitor = useEntropyMonitor();

  const [isInitialized, setIsInitialized] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Initialize game when component mounts
  useEffect(() => {
    if (!isInitialized) {
      initializeTemporalGame();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Start game loop
  useEffect(() => {
    if (isInitialized && gameState.players.length > 0) {
      startGameLoop();
    }
  }, [isInitialized, gameState.players.length, startGameLoop]);

  const initializeTemporalGame = () => {
    // Create demo players for the temporal game
    const players: Player[] = [
      {
        id: 'player1',
        username: 'Temporal Master',
        email: 'temporal@master.com',
        color: '#00ffff',
        heroes: [{
          id: 'hero1',
          name: 'Chronos',
          position: { x: 10, y: 10 },
          level: 1,
          experience: 0,
          movementPoints: 10,
          maxMovementPoints: 10,
          stats: {
            attack: 5,
            defense: 3,
            knowledge: 8,
            spellPower: 7
          },
          units: [],
          inventory: [],
          playerId: 'player1'
        }],
        resources: {
          gold: 1000,
          wood: 500,
          stone: 300,
          mana: 200
        },
        isActive: true
      },
      {
        id: 'player2',
        username: 'Space Weaver',
        email: 'space@weaver.com',
        color: '#ff00ff',
        heroes: [{
          id: 'hero2',
          name: 'Aether',
          position: { x: 20, y: 20 },
          level: 1,
          experience: 0,
          movementPoints: 10,
          maxMovementPoints: 10,
          stats: {
            attack: 4,
            defense: 4,
            knowledge: 7,
            spellPower: 8
          },
          units: [],
          inventory: [],
          playerId: 'player2'
        }],
        resources: {
          gold: 1000,
          wood: 500,
          stone: 300,
          mana: 200
        },
        isActive: true
      }
    ];

    initializeGame(players);
    console.log('🎮 Temporal Game initialized with demo players!');
  };

  const handlePlanAction = (action: Omit<ActionPlan, 'id' | 'playerId' | 'plannedAt' | 'status'>) => {
    if (!currentPlayer) return;
    
    try {
      // Add playerId to the action before passing it
      const actionWithPlayer = { ...action, playerId: currentPlayer.id };
      planAction(currentPlayer.id, actionWithPlayer);
      console.log(`✨ Action planned by ${currentPlayer.username}:`, action);
    } catch (error) {
      console.error('Failed to plan action:', error);
    }
  };

  const handleCastSpell = (spellType: TemporalSpellType, target: SpacetimePosition) => {
    if (!currentPlayer) return;
    
    try {
      castSpell(currentPlayer.id, spellType, target);
      console.log(`🔮 Spell cast by ${currentPlayer.username}:`, spellType, 'at', target);
    } catch (error) {
      console.error('Failed to cast spell:', error);
    }
  };

  const handleSelectZone = (position: SpacetimePosition) => {
    setSelectedZone(position);
    console.log('📍 Zone selected:', position);
  };

  const currentPlayerPosition: Position = currentPlayer?.heroes[0]?.position || { x: 0, y: 0 };

  if (!isInitialized) {
    return (
      <div className="temporal-game-loading">
        <div className="loading-spinner">⏳</div>
        <h2>Initializing Temporal Engine...</h2>
        <p>Preparing spacetime for strategic warfare</p>
      </div>
    );
  }

  return (
    <div className="temporal-game">
      {/* Header */}
      <header className="temporal-header">
        <div className="game-title">
          <h1>⚡ Heroes of Time and Magic ⚡</h1>
          <p className="subtitle">Revolutionary Spacetime Strategy</p>
        </div>
        
        <div className="game-controls">
          <button 
            className={`control-btn ${isPaused ? 'paused' : 'playing'}`}
            onClick={isPaused ? resume : pause}
          >
            {isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
          
          <div className="speed-control">
            <label>Speed: {gameSpeed}x</label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={gameSpeed}
              onChange={(e) => setGameSpeed(parseFloat(e.target.value))}
            />
          </div>
          
          <button className="stats-btn" onClick={() => setShowStats(!showStats)}>
            📊 Stats
          </button>
          
          <button className="reset-btn" onClick={reset}>
            🔄 Reset
          </button>
        </div>
      </header>

      {/* Player Info */}
      <div className="player-info">
        <div className="current-player">
          <h3>Current Player: {currentPlayer?.username}</h3>
          <div className="player-resources">
            <span>Gold: {currentPlayer?.resources.gold}</span>
            <span>Mana: {currentPlayer?.resources.mana}</span>
            <span>Wood: {currentPlayer?.resources.wood}</span>
            <span>Stone: {currentPlayer?.resources.stone}</span>
          </div>
        </div>
        
        <div className="game-status">
          <span>Turn: {gameState.currentTime}</span>
          <span>Players: {gameState.players.length}</span>
          <span>Active Actions: {gameState.activeActions.length}</span>
          <span>Conflicts: {gameState.activeConflicts.length}</span>
        </div>
      </div>

      {/* Entropy Monitor */}
      <div className={`entropy-monitor ${entropyMonitor.isEntropyDangerous ? 'dangerous' : ''} ${entropyMonitor.isCritical ? 'critical' : ''}`}>
        <div className="entropy-header">
          <h4>🌀 Entropy Monitor</h4>
          <span className="entropy-value">{entropyMonitor.globalEntropyPercent.toFixed(1)}%</span>
        </div>
        <div className="entropy-bar">
          <div 
            className="entropy-fill"
            style={{ width: `${entropyMonitor.globalEntropyPercent}%` }}
          />
        </div>
        <div className="entropy-trend">
          Trend: {entropyMonitor.trend} 
          {entropyMonitor.isCritical && <span className="critical-warning">⚠️ CRITICAL!</span>}
        </div>
      </div>

      {/* Main Temporal Interface */}
      <main className="temporal-main">
        <TemporalInterface
          gameState={gameState}
          currentPlayerPosition={currentPlayerPosition}
          onPlanAction={handlePlanAction}
          onCastSpell={handleCastSpell}
          onSelectZone={handleSelectZone}
        />
      </main>

      {/* Stats Panel */}
      {showStats && (
        <div className="stats-panel">
          <div className="stats-content">
            <h3>📊 Game Statistics</h3>
            <button className="close-stats" onClick={() => setShowStats(false)}>×</button>
            
            <div className="stats-grid">
              <div className="stat-card">
                <h4>Game State</h4>
                <div className="stat-list">
                  <div>Game ID: {gameState.gameId.substring(0, 8)}...</div>
                  <div>Current Time: {gameState.currentTime}</div>
                  <div>Max Time: {gameState.maxTime}</div>
                  <div>Speed: {gameSpeed}x</div>
                </div>
              </div>
              
              <div className="stat-card">
                <h4>Actions</h4>
                <div className="stat-list">
                  <div>Active: {gameState.activeActions.length}</div>
                  <div>Planned: {gameState.activeActions.filter(a => a.status === 'PLANNED').length}</div>
                  <div>Executing: {gameState.activeActions.filter(a => a.status === 'EXECUTING').length}</div>
                  <div>Completed: {gameState.activeActions.filter(a => a.status === 'COMPLETED').length}</div>
                </div>
              </div>
              
              <div className="stat-card">
                <h4>Spells & Conflicts</h4>
                <div className="stat-list">
                  <div>Active Spells: {gameState.activeSpells.length}</div>
                  <div>Temporal Barriers: {gameState.activeBarriers.length}</div>
                  <div>Conflicts: {gameState.activeConflicts.length}</div>
                  <div>Predictions: {gameState.futurePredictions.length}</div>
                </div>
              </div>
              
              <div className="stat-card">
                <h4>Entropy</h4>
                <div className="stat-list">
                  <div>Global: {entropyMonitor.globalEntropy.toFixed(2)}</div>
                  <div>Trend: {entropyMonitor.trend}</div>
                  <div>Dangerous: {entropyMonitor.isEntropyDangerous ? 'Yes' : 'No'}</div>
                  <div>Critical: {entropyMonitor.isCritical ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Button */}
      <div className="help-button">
        <button className="help-btn" title="How to Play">
          ❓
        </button>
      </div>
    </div>
  );
};

export default TemporalGame; 