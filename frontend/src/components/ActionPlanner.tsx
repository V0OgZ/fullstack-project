import React, { useState } from 'react';
import { GameAction, Hero, Position, MapObject } from '../types/game';
import { useGameStore } from '../store/useGameStore';
import { GAME_ICONS } from '../constants/gameIcons';

interface ActionPlannerProps {
  selectedHero?: Hero;
  pendingActions: GameAction[];
  onActionPlanned: () => void;
}

const ActionPlanner: React.FC<ActionPlannerProps> = ({
  selectedHero,
  pendingActions,
  onActionPlanned,
}) => {
  const { moveHero, attackTarget, collectResource, cancelAction } = useGameStore();
  const [selectedAction, setSelectedAction] = useState<GameAction | null>(null);
  const [isPlanning, setIsPlanning] = useState(false);

  const handleMoveAction = async (targetPosition: Position) => {
    if (!selectedHero) return;
    
    setIsPlanning(true);
    try {
      await moveHero(selectedHero.id, targetPosition);
      onActionPlanned();
    } catch (error) {
      console.error('Failed to plan move action:', error);
    } finally {
      setIsPlanning(false);
    }
  };

  const handleAttackAction = async (targetId: string) => {
    if (!selectedHero) return;
    
    setIsPlanning(true);
    try {
      await attackTarget(selectedHero.id, targetId);
      onActionPlanned();
    } catch (error) {
      console.error('Failed to plan attack action:', error);
    } finally {
      setIsPlanning(false);
    }
  };

  const handleCollectAction = async (objectId: string) => {
    if (!selectedHero) return;
    
    setIsPlanning(true);
    try {
      await collectResource(selectedHero.id, objectId);
      onActionPlanned();
    } catch (error) {
      console.error('Failed to plan collect action:', error);
    } finally {
      setIsPlanning(false);
    }
  };

  const handleCancelAction = async (actionId: string) => {
    try {
      await cancelAction(actionId);
      onActionPlanned();
    } catch (error) {
      console.error('Failed to cancel action:', error);
    }
  };

  const getActionIcon = (action: GameAction): string => {
    const icons = {
      move: GAME_ICONS.ACTION_MOVE,
      attack: GAME_ICONS.ACTION_ATTACK,
      collect: GAME_ICONS.ACTION_COLLECT,
      recruit: GAME_ICONS.ACTION_RECRUIT,
      build: GAME_ICONS.ACTION_BUILD,
    };
    return icons[action.type] || GAME_ICONS.UI_INFO;
  };

  const getActionDescription = (action: GameAction): string => {
    switch (action.type) {
      case 'move':
        return `Se déplacer vers (${action.targetPosition?.x}, ${action.targetPosition?.y})`;
      case 'attack':
        return `Attaquer ${action.targetId}`;
      case 'collect':
        return `Collecter ${action.targetId}`;
      case 'recruit':
        return `Recruter des unités`;
      case 'build':
        return `Construire ${action.targetId}`;
      default:
        return 'Action inconnue';
    }
  };

  const formatTime = (timeString: string): string => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusClass = (status: GameAction['status']): string => {
    const statusClasses = {
      pending: 'status-waiting',
      executing: 'status-active',
      completed: 'status-active',
      cancelled: 'status-error',
    };
    return statusClasses[status] || 'status-waiting';
  };

  if (!selectedHero) {
    return (
      <div className="action-planner">
        <h3 className="action-planner-title">Planificateur d'Actions</h3>
        <p className="text-light opacity-80">Sélectionnez un héros pour planifier des actions</p>
      </div>
    );
  }

  return (
    <div className="action-planner">
      <h3 className="action-planner-title">Planificateur d'Actions</h3>
      
      {/* Hero info */}
      <div className="hero-info">
        <h4 className="hero-name">{selectedHero.name}</h4>
        <div className="hero-stats">
          <div>Niveau {selectedHero.level} • Points de mouvement: {selectedHero.movementPoints}/{selectedHero.maxMovementPoints}</div>
          <div>Position: ({selectedHero.position.x}, {selectedHero.position.y})</div>
        </div>
      </div>

      {/* Action timeline */}
      <div className="pending-actions">
        <h4 className="title-small">Actions Planifiées</h4>
        {pendingActions.length === 0 ? (
          <p className="text-light opacity-80 text-sm">Aucune action planifiée</p>
        ) : (
          <div className="space-y-2">
            {pendingActions
              .filter(action => action.heroId === selectedHero.id)
              .sort((a, b) => new Date(a.executionTime).getTime() - new Date(b.executionTime).getTime())
              .map(action => (
                <div
                  key={action.id}
                  className="action-item"
                >
                  <div className="action-icon">{getActionIcon(action)}</div>
                  <div className="action-details">
                    <div className="action-description">{getActionDescription(action)}</div>
                    <div className="action-time">
                      Exécution: {formatTime(action.executionTime)}
                    </div>
                  </div>
                  {action.status === 'pending' && (
                    <button
                      onClick={() => handleCancelAction(action.id)}
                      className="action-cancel"
                    >
                      {GAME_ICONS.UI_CLOSE}
                    </button>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div>
        <h4 className="title-small">Actions Rapides</h4>
        <div className="quick-actions">
          <button
            className="quick-action-btn"
            disabled={isPlanning || selectedHero.movementPoints === 0}
            onClick={() => setSelectedAction({ type: 'move' } as GameAction)}
          >
            {GAME_ICONS.ACTION_MOVE} Déplacer
          </button>
          <button
            className="quick-action-btn"
            disabled={isPlanning}
            onClick={() => setSelectedAction({ type: 'attack' } as GameAction)}
          >
            {GAME_ICONS.ACTION_ATTACK} Attaquer
          </button>
          <button
            className="quick-action-btn"
            disabled={isPlanning}
            onClick={() => setSelectedAction({ type: 'collect' } as GameAction)}
          >
            {GAME_ICONS.ACTION_COLLECT} Collecter
          </button>
          <button
            className="quick-action-btn"
            disabled={isPlanning}
            onClick={() => setSelectedAction({ type: 'recruit' } as GameAction)}
          >
            {GAME_ICONS.ACTION_RECRUIT} Recruter
          </button>
        </div>
      </div>

      {/* Action instructions */}
      {selectedAction && (
        <div className="hero-info">
          <p className="text-light">
            {selectedAction.type === 'move' && 'Cliquez sur une case de la carte pour vous déplacer'}
            {selectedAction.type === 'attack' && 'Cliquez sur un ennemi pour l\'attaquer'}
            {selectedAction.type === 'collect' && 'Cliquez sur un objet pour le collecter'}
            {selectedAction.type === 'recruit' && 'Sélectionnez le type d\'unité à recruter'}
          </p>
          <button
            onClick={() => setSelectedAction(null)}
            className="btn"
            style={{ marginTop: '10px', fontSize: '12px', padding: '8px 16px' }}
          >
            {GAME_ICONS.UI_CLOSE} Annuler
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionPlanner; 