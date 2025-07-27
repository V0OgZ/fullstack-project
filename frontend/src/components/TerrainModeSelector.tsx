import React from 'react';

interface TerrainModeSelectorProps {
  currentMode: string;
  onModeChange: (mode: string) => void;
  disabled?: boolean;
}

const TerrainModeSelector: React.FC<TerrainModeSelectorProps> = ({
  currentMode,
  onModeChange,
  disabled = false
}) => {
  return (
    <div className="terrain-mode-selector">
      <select 
        value={currentMode} 
        onChange={(e) => onModeChange(e.target.value)}
        disabled={disabled}
      >
        <option value="normal">Normal</option>
        <option value="fog">Fog of War</option>
        <option value="strategic">Strategic</option>
      </select>
    </div>
  );
};

export default TerrainModeSelector; 