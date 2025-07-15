import React from 'react';
import { useGameStore } from '../store/useGameStore';

const DebugTerrainVision: React.FC = () => {
  const { map, selectedHero, movementRange, currentPlayer } = useGameStore();

  // Count tiles by visibility state
  let visibleCount = 0;
  let exploredCount = 0;
  let unknownCount = 0;
  
  if (map && map.length > 0) {
    map.forEach(row => {
      row.forEach(tile => {
        if (tile.isVisible) visibleCount++;
        else if (tile.isExplored) exploredCount++;
        else unknownCount++;
      });
    });
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 1000,
      maxWidth: '300px'
    }}>
      <h4 style={{ margin: '0 0 10px 0' }}>🔍 Terrain & Vision Debug</h4>
      
      <div>Map loaded: {map && map.length > 0 ? '✅' : '❌'}</div>
      <div>Map size: {map ? `${map.length}x${map[0]?.length || 0}` : 'N/A'}</div>
      
      <hr style={{ margin: '10px 0' }} />
      
      <div>Current player: {currentPlayer?.username || 'None'}</div>
      <div>Heroes: {currentPlayer?.heroes?.length || 0}</div>
      
      <hr style={{ margin: '10px 0' }} />
      
      <div>Selected hero: {selectedHero?.name || 'None'}</div>
      <div>Movement range tiles: {movementRange.length}</div>
      
      <hr style={{ margin: '10px 0' }} />
      
      <h5 style={{ margin: '5px 0' }}>Visibility Stats:</h5>
      <div>🟢 Visible: {visibleCount}</div>
      <div>🟡 Explored: {exploredCount}</div>
      <div>⚫ Unknown: {unknownCount}</div>
      
      <hr style={{ margin: '10px 0' }} />
      
      <div style={{ fontSize: '10px', opacity: 0.7 }}>
        Features: Bitmask terrain, Movement highlights, Fog of war
      </div>
    </div>
  );
};

export default DebugTerrainVision; 