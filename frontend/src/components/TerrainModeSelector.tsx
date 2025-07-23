import React from 'react';
import './TerrainModeSelector.css';

export type TerrainMode = 'canvas2d' | 'pixi';

interface TerrainModeInfo {
  id: TerrainMode;
  name: string;
  icon: string;
  description: string;
  performance: string;
}

const TERRAIN_MODES: TerrainModeInfo[] = [
  {
    id: 'canvas2d',
    name: 'Canvas 2D',
    icon: '🖼️',
    description: 'Stable, compatible, facile à déboguer',
    performance: 'CPU · 400 tuiles'
  },
  {
    id: 'pixi',
    name: 'PIXI.js',
    icon: '⚡',
    description: 'Performance GPU, animations fluides',
    performance: 'GPU · 1000+ tuiles'
  }
];

interface TerrainModeSelectorProps {
  currentMode: TerrainMode;
  onModeChange: (mode: TerrainMode) => void;
  disabled?: boolean;
}

const TerrainModeSelector: React.FC<TerrainModeSelectorProps> = ({
  currentMode,
  onModeChange,
  disabled = false
}) => {
  return (
    <div className="terrain-mode-selector">
      <h4>🗺️ Mode de rendu terrain</h4>
      <div className="mode-options">
        {TERRAIN_MODES.map(mode => (
          <button
            key={mode.id}
            className={`mode-option ${currentMode === mode.id ? 'active' : ''}`}
            onClick={() => onModeChange(mode.id)}
            disabled={disabled}
          >
            <div className="mode-icon">{mode.icon}</div>
            <div className="mode-info">
              <div className="mode-name">{mode.name}</div>
              <div className="mode-description">{mode.description}</div>
              <div className="mode-performance">{mode.performance}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TerrainModeSelector; 