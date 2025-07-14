import React from 'react';

interface UnitDisplayProps {
  unitType: 'knight' | 'archer' | 'skeleton' | 'undead';
  size?: number;
  showName?: boolean;
  onClick?: () => void;
}

const UnitDisplay: React.FC<UnitDisplayProps> = ({ 
  unitType, 
  size = 48, 
  showName = true, 
  onClick 
}) => {
  // Real graphics paths to our downloaded LPC sprites
  const unitGraphics = {
    knight: '/assets/units/knight.gif',
    archer: '/assets/units/archer.gif',
    skeleton: '/assets/units/skeleton.png',
    undead: '/assets/units/undead.png'
  };

  const unitNames = {
    knight: 'Knight',
    archer: 'Archer',
    skeleton: 'Skeleton',
    undead: 'Undead'
  };

  const unitStats = {
    knight: 'ATK: 8, DEF: 9, HP: 35',
    archer: 'ATK: 6, DEF: 3, HP: 15',
    skeleton: 'ATK: 5, DEF: 4, HP: 6',
    undead: 'ATK: 7, DEF: 5, HP: 20'
  };

  return (
    <div 
      className="unit-display" 
      onClick={onClick}
      style={{
        display: 'inline-block',
        textAlign: 'center',
        cursor: onClick ? 'pointer' : 'default',
        margin: '4px',
        padding: '6px',
        border: '1px solid #666',
        borderRadius: '6px',
        backgroundColor: '#f9f9f9',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = '#e8e8e8';
          e.currentTarget.style.borderColor = '#888';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#f9f9f9';
        e.currentTarget.style.borderColor = '#666';
      }}
    >
      <div style={{ marginBottom: '4px' }}>
        <img 
          src={unitGraphics[unitType]}
          alt={unitNames[unitType]}
          style={{
            width: size,
            height: size,
            imageRendering: 'pixelated',
            objectFit: 'cover',
            border: '1px solid #aaa',
            borderRadius: '3px'
          }}
          onError={(e) => {
            // Fallback if image doesn't load
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'block';
          }}
        />
        <div 
          style={{ 
            display: 'none',
            width: size,
            height: size,
            backgroundColor: '#ddd',
            border: '1px solid #aaa',
            borderRadius: '3px',
            fontSize: '20px',
            lineHeight: `${size}px`,
            textAlign: 'center'
          }}
        >
          {unitType === 'knight' ? '🛡️' : 
           unitType === 'archer' ? '🏹' : 
           unitType === 'skeleton' ? '💀' : '🧟'}
        </div>
      </div>
      
      {showName && (
        <div>
          <div style={{ 
            fontWeight: 'bold', 
            fontSize: '12px',
            color: '#333'
          }}>
            {unitNames[unitType]}
          </div>
          <div style={{ 
            fontSize: '10px',
            color: '#666',
            marginTop: '1px'
          }}>
            {unitStats[unitType]}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitDisplay; 