// Heroes of Time and Magic - Temporal Interface
// Revolutionary spacetime strategy UI

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  SpacetimePosition, 
  ActionPlan, 
  TemporalZone, 
  ZoneState, 
  TemporalSpellType, 
  TemporalActionType,
  TemporalConflict,
  TemporalGameState,
  EntropyLevel
} from '../types/temporal';
import { Position } from '../types/game';
import './TemporalInterface.css';

interface TemporalInterfaceProps {
  gameState: TemporalGameState;
  currentPlayerPosition: Position;
  onPlanAction: (action: Omit<ActionPlan, 'id' | 'playerId' | 'plannedAt' | 'status'>) => void;
  onCastSpell: (spell: TemporalSpellType, target: SpacetimePosition) => void;
  onSelectZone: (position: SpacetimePosition) => void;
}

/**
 * Main temporal interface component
 */
export const TemporalInterface: React.FC<TemporalInterfaceProps> = ({
  gameState,
  currentPlayerPosition,
  onPlanAction,
  onCastSpell,
  onSelectZone
}) => {
  const [selectedTime, setSelectedTime] = useState(gameState.currentTime);
  const [selectedZone, setSelectedZone] = useState<SpacetimePosition | null>(null);
  const [planningMode, setPlanningMode] = useState<TemporalActionType | null>(null);
  const [spellMode, setSpellMode] = useState<TemporalSpellType | null>(null);
  const [viewRange, setViewRange] = useState(10);
  const [showPredictions, setShowPredictions] = useState(true);
  const [showConflicts, setShowConflicts] = useState(true);

  // Timeline control
  const timelineRef = useRef<HTMLDivElement>(null);
  const maxTime = gameState.currentTime + 50; // Show 50 turns into future
  const minTime = Math.max(0, gameState.currentTime - 20); // Show 20 turns into past

  // Zone click handler
  const handleZoneClick = useCallback((x: number, y: number) => {
    const position: SpacetimePosition = { x, y, t: selectedTime };
    setSelectedZone(position);
    onSelectZone(position);

    // Handle action planning
    if (planningMode) {
      const currentPlayer = gameState.players.find(p => p.id === gameState.currentActivePlayer);
      const heroId = currentPlayer?.heroes[0]?.id || 'hero1';
      
      const action = {
        heroId,
        type: planningMode,
        fromPosition: { x: currentPlayerPosition.x, y: currentPlayerPosition.y, t: gameState.currentTime },
        toPosition: position,
        startsAt: Math.max(gameState.currentTime + 1, selectedTime),
        endsAt: Math.max(gameState.currentTime + 2, selectedTime + 1)
      };
      onPlanAction(action);
      setPlanningMode(null);
    } else if (!spellMode) {
      // If no planning mode, default to MOVE action
      const currentPlayer = gameState.players.find(p => p.id === gameState.currentActivePlayer);
      const heroId = currentPlayer?.heroes[0]?.id || 'hero1';
      
      const moveAction = {
        heroId,
        type: 'MOVE' as TemporalActionType,
        fromPosition: { x: currentPlayerPosition.x, y: currentPlayerPosition.y, t: gameState.currentTime },
        toPosition: position,
        startsAt: Math.max(gameState.currentTime + 1, selectedTime),
        endsAt: Math.max(gameState.currentTime + 2, selectedTime + 1)
      };
      onPlanAction(moveAction);
    }

    // Handle spell casting
    if (spellMode) {
      onCastSpell(spellMode, position);
      setSpellMode(null);
    }
  }, [selectedTime, planningMode, spellMode, currentPlayerPosition, gameState.currentTime, onPlanAction, onCastSpell, onSelectZone]);

  return (
    <div className="temporal-interface">
      {/* Timeline Control */}
      <div className="timeline-section">
        <div className="timeline-header">
          <h3>Spacetime Timeline</h3>
          <div className="timeline-info">
            <span>Current Time: {gameState.currentTime}</span>
            <span>Selected Time: {selectedTime}</span>
            <span>Status: {selectedTime < gameState.currentTime ? 'PAST' : selectedTime === gameState.currentTime ? 'PRESENT' : 'FUTURE'}</span>
          </div>
        </div>
        
        <div className="timeline-controls">
          <button 
            className="time-nav-btn"
            onClick={() => setSelectedTime(Math.max(minTime, selectedTime - 1))}
            disabled={selectedTime <= minTime}
          >
            ← Previous
          </button>
          
          <div className="timeline-slider" ref={timelineRef}>
            <input
              type="range"
              min={minTime}
              max={maxTime}
              value={selectedTime}
              onChange={(e) => setSelectedTime(parseInt(e.target.value))}
              className="timeline-input"
            />
            <div className="timeline-markers">
              {Array.from({ length: Math.min(21, maxTime - minTime) }, (_, i) => {
                const time = minTime + i * Math.ceil((maxTime - minTime) / 20);
                const isCurrent = time === gameState.currentTime;
                const isSelected = time === selectedTime;
                return (
                  <div 
                    key={time}
                    className={`timeline-marker ${isCurrent ? 'current' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </div>
                );
              })}
            </div>
          </div>
          
          <button 
            className="time-nav-btn"
            onClick={() => setSelectedTime(Math.min(maxTime, selectedTime + 1))}
            disabled={selectedTime >= maxTime}
          >
            Next →
          </button>
        </div>
      </div>

      <div className="interface-body">
        {/* Zone Visualization */}
        <div className="zone-section">
          <div className="zone-header">
            <h3>Spacetime Map - T={selectedTime}</h3>
            <div className="zone-controls">
              <label>
                <input
                  type="checkbox"
                  checked={showPredictions}
                  onChange={(e) => setShowPredictions(e.target.checked)}
                />
                Show Predictions
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={showConflicts}
                  onChange={(e) => setShowConflicts(e.target.checked)}
                />
                Show Conflicts
              </label>
              <select 
                value={viewRange} 
                onChange={(e) => setViewRange(parseInt(e.target.value))}
              >
                <option value={8}>8x8 View</option>
                <option value={12}>12x12 View</option>
                <option value={16}>16x16 View</option>
                <option value={20}>20x20 View</option>
              </select>
            </div>
          </div>

          <ZoneGrid
            gameState={gameState}
            centerPosition={currentPlayerPosition}
            viewRange={viewRange}
            timeSlice={selectedTime}
            selectedZone={selectedZone}
            showPredictions={showPredictions}
            showConflicts={showConflicts}
            onZoneClick={handleZoneClick}
          />
          
          {/* Hero Info Panel */}
          <div className="hero-info-panel">
            <HeroInfoDisplay 
              gameState={gameState} 
              currentPlayerPosition={currentPlayerPosition}
            />
          </div>
        </div>

        {/* Right Panels */}
        <div className="right-panels">
          {/* Action Planning */}
          <div className="action-section">
            <ActionPlanner
              gameState={gameState}
              selectedZone={selectedZone}
              planningMode={planningMode}
              onSetPlanningMode={setPlanningMode}
              onPlanAction={onPlanAction}
            />
          </div>

          {/* Spell Interface */}
          <div className="spell-section">
            <TemporalSpellInterface
              gameState={gameState}
              selectedZone={selectedZone}
              spellMode={spellMode}
              onSetSpellMode={setSpellMode}
              onCastSpell={onCastSpell}
            />
          </div>
        </div>
      </div>

      {/* Zone Details Panel */}
      {selectedZone && (
        <ZoneDetailsPanel
          zone={selectedZone}
          gameState={gameState}
          onClose={() => setSelectedZone(null)}
        />
      )}

      {/* Conflict Resolution */}
      {showConflicts && gameState.activeConflicts.length > 0 && (
        <ConflictPanel
          conflicts={gameState.activeConflicts}
          gameState={gameState}
        />
      )}
    </div>
  );
};

/**
 * Zone grid showing spacetime map
 */
interface ZoneGridProps {
  gameState: TemporalGameState;
  centerPosition: Position;
  viewRange: number;
  timeSlice: number;
  selectedZone: SpacetimePosition | null;
  showPredictions: boolean;
  showConflicts: boolean;
  onZoneClick: (x: number, y: number) => void;
}

const ZoneGrid: React.FC<ZoneGridProps> = ({
  gameState,
  centerPosition,
  viewRange,
  timeSlice,
  selectedZone,
  showPredictions,
  showConflicts,
  onZoneClick
}) => {
  const getZoneState = (x: number, y: number): ZoneState => {
    const position: SpacetimePosition = { x, y, t: timeSlice };
    const positionKey = `${x},${y},${timeSlice}`;
    
    // Check if zone exists in game state
    const zone = gameState.mapZones[positionKey];
    return zone?.state || 'STABLE';
  };

  const getZoneEntropy = (x: number, y: number): EntropyLevel => {
    const position: SpacetimePosition = { x, y, t: timeSlice };
    const positionKey = `${x},${y},${timeSlice}`;
    
    const zone = gameState.mapZones[positionKey];
    return zone?.entropy || 'NONE';
  };

  const hasActions = (x: number, y: number): boolean => {
    return gameState.activeActions.some(action => {
      const samePosition = action.toPosition.x === x && action.toPosition.y === y;
      const sameTime = Math.abs(action.startsAt - timeSlice) <= 1;
      return samePosition && sameTime;
    });
  };

  const hasConflicts = (x: number, y: number): boolean => {
    return gameState.activeConflicts.some(conflict => 
      conflict.zone.x === x && conflict.zone.y === y && 
      Math.abs(conflict.zone.t - timeSlice) <= 1
    );
  };

  const getHeroAtPosition = (x: number, y: number) => {
    for (const player of gameState.players) {
      for (const hero of player.heroes) {
        if (hero.position.x === x && hero.position.y === y) {
          return { hero, player };
        }
      }
    }
    return null;
  };

  const getCastleAtPosition = (x: number, y: number) => {
    // Simulate some castles for demo
    const castles = [
      { x: 15, y: 15, owner: 'player1', level: 2 },
      { x: 25, y: 25, owner: 'player2', level: 1 },
      { x: 10, y: 30, owner: null, level: 1 }
    ];
    return castles.find(castle => castle.x === x && castle.y === y);
  };

  const getObjectAtPosition = (x: number, y: number) => {
    // Simulate some objects for demo
    const objects = [
      { x: 12, y: 18, type: 'treasure', icon: '💰' },
      { x: 20, y: 12, type: 'artifact', icon: '⚡' },
      { x: 18, y: 28, type: 'mine', icon: '⛏️' },
      { x: 8, y: 22, type: 'portal', icon: '🌀' }
    ];
    return objects.find(obj => obj.x === x && obj.y === y);
  };

  const zones = [];
  for (let y = centerPosition.y - viewRange; y <= centerPosition.y + viewRange; y++) {
    for (let x = centerPosition.x - viewRange; x <= centerPosition.x + viewRange; x++) {
      const zoneState = getZoneState(x, y);
      const entropy = getZoneEntropy(x, y);
      const hasAction = hasActions(x, y);
      const hasConflict = hasConflicts(x, y);
      const isSelected = selectedZone?.x === x && selectedZone?.y === y;
      const isCenter = x === centerPosition.x && y === centerPosition.y;
      
      // Check for entities at this position
      const heroData = getHeroAtPosition(x, y);
      const castle = getCastleAtPosition(x, y);
      const object = getObjectAtPosition(x, y);

      // Determine main content to display
      let mainContent = null;
      let extraClasses = '';
      
      if (heroData) {
        mainContent = <div className="hero-icon" style={{ color: heroData.player.color }}>🏃</div>;
        extraClasses += ' has-hero';
      } else if (castle) {
        mainContent = <div className="castle-icon" style={{ color: castle.owner ? '#ffd700' : '#666' }}>🏰</div>;
        extraClasses += ' has-castle';
      } else if (object) {
        mainContent = <div className="object-icon">{object.icon}</div>;
        extraClasses += ' has-object';
      }

      zones.push(
        <div
          key={`${x},${y}`}
          className={`zone-cell ${zoneState.toLowerCase()} entropy-${entropy.toLowerCase()} ${
            hasAction ? 'has-action' : ''
          } ${hasConflict && showConflicts ? 'has-conflict' : ''} ${
            isSelected ? 'selected' : ''
          } ${isCenter ? 'center' : ''} ${extraClasses}`}
          onClick={() => onZoneClick(x, y)}
          title={`Zone (${x},${y}) at T=${timeSlice}\nState: ${zoneState}\nEntropy: ${entropy}${
            heroData ? `\nHero: ${heroData.hero.name} (${heroData.player.username})` : ''
          }${castle ? `\nCastle: Level ${castle.level}${castle.owner ? ` (${castle.owner})` : ' (Neutral)'}` : ''
          }${object ? `\nObject: ${object.type}` : ''
          }${hasAction ? '\nHas planned actions' : ''
          }${hasConflict ? '\nHas conflicts' : ''}`}
        >
          <div className="zone-coords">{x},{y}</div>
          {mainContent}
          {hasAction && <div className="action-indicator">⚡</div>}
          {hasConflict && showConflicts && <div className="conflict-indicator">⚔️</div>}
          {isCenter && <div className="center-indicator">🎯</div>}
        </div>
      );
    }
  }

  return (
    <div 
      className="zone-grid"
      style={{
        gridTemplateColumns: `repeat(${viewRange * 2 + 1}, 1fr)`,
        gridTemplateRows: `repeat(${viewRange * 2 + 1}, 1fr)`
      }}
    >
      {zones}
    </div>
  );
};

/**
 * Action planning interface
 */
interface ActionPlannerProps {
  gameState: TemporalGameState;
  selectedZone: SpacetimePosition | null;
  planningMode: TemporalActionType | null;
  onSetPlanningMode: (mode: TemporalActionType | null) => void;
  onPlanAction: (action: Omit<ActionPlan, 'id' | 'playerId' | 'plannedAt' | 'status'>) => void;
}

const ActionPlanner: React.FC<ActionPlannerProps> = ({
  gameState,
  selectedZone,
  planningMode,
  onSetPlanningMode,
  onPlanAction
}) => {
  const actionTypes: TemporalActionType[] = [
    'MOVE', 'LOOT', 'ATTACK', 'CAST_SPELL', 'BUILD', 'EXPLORE', 'ANCHOR', 'RETREAT'
  ];

  const getActionDescription = (type: TemporalActionType): string => {
    const descriptions: Record<TemporalActionType, string> = {
      MOVE: 'Move hero to target location',
      LOOT: 'Loot objects or treasures',
      ATTACK: 'Attack enemy units or structures',
      CAST_SPELL: 'Cast a spell at target location',
      BUILD: 'Build structures or fortifications',
      EXPLORE: 'Explore unknown areas',
      ANCHOR: 'Anchor action to prevent interference',
      RETREAT: 'Retreat from current position'
    };
    return descriptions[type];
  };

  return (
    <div className="action-planner">
      <h3>Action Planning</h3>
      
      {selectedZone && (
        <div className="selected-zone-info">
          <strong>Target Zone:</strong> ({selectedZone.x}, {selectedZone.y}) at T={selectedZone.t}
        </div>
      )}

      <div className="action-buttons">
        {actionTypes.map(type => (
          <button
            key={type}
            className={`action-btn ${planningMode === type ? 'active' : ''}`}
            onClick={() => onSetPlanningMode(planningMode === type ? null : type)}
            title={getActionDescription(type)}
          >
            {type.replace('_', ' ')}
          </button>
        ))}
      </div>

      {planningMode && (
        <div className="planning-instructions">
          <strong>Planning Mode: {planningMode.replace('_', ' ')}</strong>
          <p>Click on a zone to plan this action</p>
        </div>
      )}

      <div className="planned-actions">
        <h4>Planned Actions</h4>
        <div className="actions-list">
          {gameState.activeActions.map(action => (
            <div key={action.id} className={`action-item ${action.status.toLowerCase()}`}>
              <span className="action-type">{action.type}</span>
              <span className="action-coords">
                ({action.toPosition.x}, {action.toPosition.y})
              </span>
              <span className="action-time">T={action.startsAt}</span>
              <span className="action-status">{action.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Temporal spell interface
 */
interface TemporalSpellInterfaceProps {
  gameState: TemporalGameState;
  selectedZone: SpacetimePosition | null;
  spellMode: TemporalSpellType | null;
  onSetSpellMode: (mode: TemporalSpellType | null) => void;
  onCastSpell: (spell: TemporalSpellType, target: SpacetimePosition) => void;
}

const TemporalSpellInterface: React.FC<TemporalSpellInterfaceProps> = ({
  gameState,
  selectedZone,
  spellMode,
  onSetSpellMode,
  onCastSpell
}) => {
  const spellTypes: TemporalSpellType[] = [
    'VISION_FUTURE', 'ANCRAGE_TEMPOREL', 'RETOUR_ARRIERE', 'ACCELERATION',
    'MUR_CAUSALITE', 'FAILLE_TEMPORELLE', 'EMPATHIE_CAUSALE', 'SONDE_TEMPORELLE',
    'STABILISATION', 'CORRUPTION_ACTIVE'
  ];

  const getSpellDescription = (type: TemporalSpellType): string => {
    const descriptions: Record<TemporalSpellType, string> = {
      VISION_FUTURE: 'See what will happen at target location',
      ANCRAGE_TEMPOREL: 'Lock actions to prevent interference',
      RETOUR_ARRIERE: 'Undo actions in target zone',
      ACCELERATION: 'Speed up time for selected units',
      MUR_CAUSALITE: 'Create temporal barrier',
      FAILLE_TEMPORELLE: 'Create chaos zone with entropy',
      EMPATHIE_CAUSALE: 'Detect enemy plans nearby',
      SONDE_TEMPORELLE: 'Take snapshot of future state',
      STABILISATION: 'Reduce entropy in target zone',
      CORRUPTION_ACTIVE: 'Increase entropy in enemy zone'
    };
    return descriptions[type];
  };

  return (
    <div className="spell-interface">
      <h3>Temporal Spells</h3>
      
      <div className="spell-buttons">
        {spellTypes.map(type => (
          <button
            key={type}
            className={`spell-btn ${spellMode === type ? 'active' : ''}`}
            onClick={() => onSetSpellMode(spellMode === type ? null : type)}
            title={getSpellDescription(type)}
          >
            {type.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {spellMode && (
        <div className="spell-instructions">
          <strong>Casting: {spellMode.replace(/_/g, ' ')}</strong>
          <p>{getSpellDescription(spellMode)}</p>
          <p>Click on a zone to cast this spell</p>
        </div>
      )}

      <div className="active-spells">
        <h4>Active Spells</h4>
        <div className="spells-list">
          {gameState.activeSpells.map(spell => (
            <div key={spell.id} className="spell-item">
              <span className="spell-type">{spell.type.replace(/_/g, ' ')}</span>
              <span className="spell-coords">
                ({spell.targetZone.x}, {spell.targetZone.y})
              </span>
              <span className="spell-duration">
                Duration: {spell.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Zone details panel
 */
interface ZoneDetailsPanelProps {
  zone: SpacetimePosition;
  gameState: TemporalGameState;
  onClose: () => void;
}

const ZoneDetailsPanel: React.FC<ZoneDetailsPanelProps> = ({
  zone,
  gameState,
  onClose
}) => {
  const zoneKey = `${zone.x},${zone.y},${zone.t}`;
  const zoneData = gameState.mapZones[zoneKey];

  return (
    <div className="zone-details-panel">
      <div className="panel-header">
        <h3>Zone Details</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="zone-info">
        <div className="info-row">
          <strong>Position:</strong> ({zone.x}, {zone.y}) at T={zone.t}
        </div>
        <div className="info-row">
          <strong>State:</strong> {zoneData?.state || 'STABLE'}
        </div>
        <div className="info-row">
          <strong>Entropy:</strong> {zoneData?.entropy || 'NONE'}
        </div>
        {zoneData?.occupiedBy && zoneData.occupiedBy.length > 0 && (
          <div className="info-row">
            <strong>Occupied by:</strong> {zoneData.occupiedBy.join(', ')}
          </div>
        )}
      </div>

      <div className="zone-actions">
        <h4>Actions in this zone:</h4>
        <div className="actions-list">
          {gameState.activeActions
            .filter(action => action.toPosition.x === zone.x && action.toPosition.y === zone.y)
            .map(action => (
              <div key={action.id} className="action-item">
                <span>{action.type}</span>
                <span>T={action.startsAt}-{action.endsAt}</span>
                <span>{action.status}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Conflict resolution panel
 */
interface ConflictPanelProps {
  conflicts: TemporalConflict[];
  gameState: TemporalGameState;
}

const ConflictPanel: React.FC<ConflictPanelProps> = ({ conflicts, gameState }) => {
  return (
    <div className="conflict-panel">
      <h3>Active Conflicts</h3>
      <div className="conflicts-list">
        {conflicts.map(conflict => (
          <div key={conflict.id} className="conflict-item">
            <div className="conflict-header">
              <strong>Conflict at ({conflict.zone.x}, {conflict.zone.y})</strong>
              <span className="conflict-status">{conflict.status}</span>
            </div>
            <div className="conflict-players">
              Players: {conflict.involvedPlayers.join(', ')}
            </div>
            <div className="conflict-actions">
              Actions: {conflict.conflictingActions.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Hero information display
 */
interface HeroInfoDisplayProps {
  gameState: TemporalGameState;
  currentPlayerPosition: Position;
}

const HeroInfoDisplay: React.FC<HeroInfoDisplayProps> = ({ gameState, currentPlayerPosition }) => {
  const currentPlayer = gameState.players.find(p => p.id === gameState.currentActivePlayer);
  const currentHero = currentPlayer?.heroes[0];

  if (!currentHero) return null;

  return (
    <div className="hero-info-display">
      <h4>🏃 Current Hero</h4>
      
      <div className="hero-details">
        <div className="hero-name">
          <strong>{currentHero.name}</strong>
          <span className="hero-level">Level {currentHero.level}</span>
        </div>
        
        <div className="hero-position">
          <span>📍 Position: ({currentHero.position.x}, {currentHero.position.y})</span>
          <span>⚡ Movement: {currentHero.movementPoints}/{currentHero.maxMovementPoints}</span>
        </div>
        
        <div className="hero-stats">
          <div className="stat-row">
            <span>⚔️ Attack: {currentHero.stats.attack}</span>
            <span>🛡️ Defense: {currentHero.stats.defense}</span>
          </div>
          <div className="stat-row">
            <span>📚 Knowledge: {currentHero.stats.knowledge}</span>
            <span>✨ Spell Power: {currentHero.stats.spellPower}</span>
          </div>
        </div>
        
        <div className="hero-experience">
          <div className="exp-bar-container">
            <div className="exp-label">Experience: {currentHero.experience}</div>
            <div className="exp-bar">
              <div 
                className="exp-fill" 
                style={{ width: `${(currentHero.experience % 1000) / 10}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="hero-actions">
          <button className="hero-action-btn" title="View Inventory">
            🎒 Inventory ({currentHero.inventory.length})
          </button>
          <button className="hero-action-btn" title="View Units">
            ⚔️ Army ({currentHero.units.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemporalInterface; 