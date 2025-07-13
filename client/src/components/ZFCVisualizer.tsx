import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { ZoneOfCausality, ShadowAction } from '../types/game';
import { useTranslation } from '../i18n';
import './ZFCVisualizer.css';

interface ZFCVisualizerProps {
  isVisible: boolean;
}

const ZFCVisualizer: React.FC<ZFCVisualizerProps> = ({ isVisible }) => {
  const { visibleZFCs, shadowActions, lockedZones, map } = useGameStore();
  const { t } = useTranslation();

  if (!isVisible || !map.length) return null;

  return (
    <div className="zfc-visualizer">
      {/* Zones de Causalité */}
      {visibleZFCs.map((zfc, index) => (
        <div key={`zfc-${zfc.playerId}-${index}`} className="zfc-zone">
          {zfc.reachableTiles.map((tile, tileIndex) => (
            <div
              key={`zfc-tile-${tile.x}-${tile.y}`}
              className="zfc-tile"
              style={{
                left: `${tile.x * 90 + (tile.y % 2) * 45}px`,
                top: `${tile.y * 78}px`,
                backgroundColor: getZFCColor(zfc.playerId),
                opacity: 0.3,
                border: `2px solid ${getZFCColor(zfc.playerId)}`,
              }}
            />
          ))}
          <div className="zfc-center" style={{
            left: `${zfc.center.x * 90 + (zfc.center.y % 2) * 45}px`,
            top: `${zfc.center.y * 78}px`,
            backgroundColor: getZFCColor(zfc.playerId),
          }}>
            <span className="zfc-radius">{zfc.radius}</span>
          </div>
        </div>
      ))}

      {/* Zones verrouillées */}
      {lockedZones.map((zone, index) => (
        <div
          key={`locked-${zone.x}-${zone.y}`}
          className="locked-zone"
          style={{
            left: `${zone.x * 90 + (zone.y % 2) * 45}px`,
            top: `${zone.y * 78}px`,
          }}
        >
          <div className="locked-indicator">🔒</div>
        </div>
      ))}

      {/* Actions en ombre */}
      {shadowActions.map((shadow) => (
        <div
          key={shadow.actionId}
          className="shadow-action"
          style={{
            left: shadow.position ? `${shadow.position.x * 90 + (shadow.position.y % 2) * 45}px` : '0px',
            top: shadow.position ? `${shadow.position.y * 78}px` : '0px',
            opacity: shadow.opacity,
          }}
        >
          <div className="shadow-indicator">
            {getShadowIcon(shadow.type)}
          </div>
        </div>
      ))}

      {/* Légende */}
      <div className="zfc-legend">
        <h4>Zones de Causalité</h4>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#4CAF50' }}></div>
          <span>{t('player')} 1</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#F44336' }}></div>
          <span>{t('player')} 2</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#FF9800' }}></div>
          <span>Zone Verrouillée</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#9C27B0' }}></div>
          <span>Action en Ombre</span>
        </div>
      </div>
    </div>
  );
};

const getZFCColor = (playerId: string): string => {
  // Couleurs différentes pour chaque joueur
  const colors = ['#4CAF50', '#F44336', '#2196F3', '#FF9800', '#9C27B0', '#607D8B'];
  const playerIndex = parseInt(playerId.replace(/\D/g, '')) || 0;
  return colors[playerIndex % colors.length];
};

const getShadowIcon = (type: string): string => {
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

export default ZFCVisualizer; 