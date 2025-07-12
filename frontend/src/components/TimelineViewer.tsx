import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { TimelineAction } from '../types/game';
import './TimelineViewer.css';

interface TimelineViewerProps {
  isVisible: boolean;
}

const TimelineViewer: React.FC<TimelineViewerProps> = ({ isVisible }) => {
  const { currentGame, validateAction, updateTimelineAction } = useGameStore();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  if (!isVisible || !currentGame) return null;

  const timeline = currentGame.timeline || [];
  const pendingActions = timeline.filter(action => action.status === 'PENDING');
  const confirmedActions = timeline.filter(action => action.status === 'CONFIRMED');
  const lockedActions = timeline.filter(action => action.status === 'LOCKED');

  const handleValidateAction = async (actionId: string) => {
    await validateAction(actionId);
  };

  const handleDiscardAction = (actionId: string) => {
    updateTimelineAction(actionId, 'DISCARDED');
  };

  const getActionIcon = (type: string): string => {
    switch (type) {
      case 'move': return '👤';
      case 'attack': return '⚔️';
      case 'collect': return '💎';
      case 'recruit': return '🏰';
      case 'build': return '🔨';
      case 'spell': return '✨';
      default: return '❓';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'PENDING': return '#FFA500';
      case 'CONFIRMED': return '#4CAF50';
      case 'DISCARDED': return '#F44336';
      case 'LOCKED': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'PENDING': return 'En attente';
      case 'CONFIRMED': return 'Confirmé';
      case 'DISCARDED': return 'Annulé';
      case 'LOCKED': return 'Verrouillé';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="timeline-viewer">
      <div className="timeline-header">
        <h3>Timeline des Actions</h3>
        <div className="timeline-stats">
          <span className="stat pending">{pendingActions.length} En attente</span>
          <span className="stat confirmed">{confirmedActions.length} Confirmés</span>
          <span className="stat locked">{lockedActions.length} Verrouillés</span>
        </div>
      </div>

      <div className="timeline-content">
        {timeline.length === 0 ? (
          <div className="empty-timeline">
            <p>Aucune action dans la timeline</p>
          </div>
        ) : (
          <div className="timeline-list">
            {timeline.map((action) => (
              <div
                key={action.id}
                className={`timeline-item ${action.status.toLowerCase()} ${selectedAction === action.id ? 'selected' : ''}`}
                onClick={() => setSelectedAction(action.id)}
              >
                <div className="action-header">
                  <div className="action-icon">
                    {getActionIcon(action.action.type)}
                  </div>
                  <div className="action-info">
                    <div className="action-type">
                      {action.action.type.toUpperCase()}
                    </div>
                    <div className="action-player">
                      Joueur {action.playerId}
                    </div>
                  </div>
                  <div 
                    className="action-status"
                    style={{ backgroundColor: getStatusColor(action.status) }}
                  >
                    {getStatusText(action.status)}
                  </div>
                </div>

                <div className="action-details">
                  <div className="action-target">
                    {action.action.targetPosition && (
                      <span>→ ({action.action.targetPosition.x}, {action.action.targetPosition.y})</span>
                    )}
                    {action.action.targetId && (
                      <span>→ Cible: {action.action.targetId}</span>
                    )}
                  </div>
                  <div className="action-time">
                    {new Date(action.originTimestamp).toLocaleTimeString()}
                  </div>
                </div>

                {action.status === 'PENDING' && (
                  <div className="action-controls">
                    <button
                      className="btn-validate"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleValidateAction(action.id);
                      }}
                    >
                      ✅ Valider
                    </button>
                    <button
                      className="btn-discard"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDiscardAction(action.id);
                      }}
                    >
                      ❌ Annuler
                    </button>
                  </div>
                )}

                {selectedAction === action.id && (
                  <div className="action-zfc">
                    <h4>Zone de Causalité</h4>
                    <div className="zfc-info">
                      <p><strong>Rayon:</strong> {action.zfc.radius}</p>
                      <p><strong>Cases atteignables:</strong> {action.zfc.reachableTiles.length}</p>
                      <p><strong>Téléportation:</strong> {action.zfc.includesTeleport ? 'Oui' : 'Non'}</p>
                      <p><strong>Valide jusqu'au tour:</strong> {action.zfc.validUntil}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineViewer; 