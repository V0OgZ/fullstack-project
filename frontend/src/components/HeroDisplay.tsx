import React from 'react';

interface HeroDisplayProps {
  heroType: 'warrior' | 'mage' | 'archer' | 'paladin';
  size?: number;
  showName?: boolean;
  onClick?: () => void;
}

const HeroDisplay: React.FC<HeroDisplayProps> = ({ 
  heroType, 
  size = 64, 
  showName = true, 
  onClick 
}) => {
  // Real graphics paths to our downloaded LPC sprites
  const heroGraphics = {
    warrior: '/assets/heroes/warrior.png',
    mage: '/assets/heroes/mage.png', 
    archer: '/assets/heroes/archer.png',
    paladin: '/assets/heroes/paladin.png'
  };

  const heroNames = {
    warrior: 'Warrior',
    mage: 'Mage',
    archer: 'Archer', 
    paladin: 'Paladin'
  };

  const heroDescriptions = {
    warrior: 'Strong melee fighter',
    mage: 'Master of magic spells',
    archer: 'Expert ranged combatant',
    paladin: 'Holy warrior and healer'
  };

  return (
    <div 
      className="hero-display" 
      onClick={onClick}
      style={{
        display: 'inline-block',
        textAlign: 'center',
        cursor: onClick ? 'pointer' : 'default',
        margin: '8px',
        padding: '8px',
        border: '2px solid #444',
        borderRadius: '8px',
        backgroundColor: '#f5f5f5',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = '#e0e0e0';
          e.currentTarget.style.borderColor = '#666';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#f5f5f5';
        e.currentTarget.style.borderColor = '#444';
      }}
    >
      <div style={{ marginBottom: '8px' }}>
        <img 
          src={heroGraphics[heroType]}
          alt={heroNames[heroType]}
          style={{
            width: size,
            height: size,
            imageRendering: 'pixelated',
            objectFit: 'cover',
            border: '1px solid #ccc',
            borderRadius: '4px'
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
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '24px',
            lineHeight: `${size}px`,
            textAlign: 'center'
          }}
        >
          {heroType === 'warrior' ? '⚔️' : 
           heroType === 'mage' ? '🧙‍♂️' : 
           heroType === 'archer' ? '🏹' : '🛡️'}
        </div>
      </div>
      
      {showName && (
        <div>
          <div style={{ 
            fontWeight: 'bold', 
            fontSize: '14px',
            color: '#333'
          }}>
            {heroNames[heroType]}
          </div>
          <div style={{ 
            fontSize: '12px',
            color: '#666',
            marginTop: '2px'
          }}>
            {heroDescriptions[heroType]}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroDisplay; 