import React from 'react';
import { CREATURE_ASSETS, HERO_ASSETS, EFFECT_ASSETS } from '../constants/gameAssets';

interface CreatureDisplayProps {
  type: 'creature' | 'hero' | 'effect';
  name: string;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
}

const CreatureDisplay: React.FC<CreatureDisplayProps> = ({
  type,
  name,
  size = 'medium',
  animated = true,
  className = '',
}) => {
  const getAssetUrl = (): string => {
    switch (type) {
      case 'creature':
        return CREATURE_ASSETS[name as keyof typeof CREATURE_ASSETS] || CREATURE_ASSETS.DRAGON_RED;
      case 'hero':
        return HERO_ASSETS[name as keyof typeof HERO_ASSETS] || HERO_ASSETS.WARRIOR;
      case 'effect':
        return EFFECT_ASSETS[name as keyof typeof EFFECT_ASSETS] || EFFECT_ASSETS.FIRE;
      default:
        return CREATURE_ASSETS.DRAGON_RED;
    }
  };

  const getSizeClass = (): string => {
    switch (size) {
      case 'small':
        return 'w-8 h-8';
      case 'medium':
        return 'w-16 h-16';
      case 'large':
        return 'w-24 h-24';
      default:
        return 'w-16 h-16';
    }
  };

  const assetUrl = getAssetUrl();

  return (
    <div className={`creature-display ${getSizeClass()} ${className}`}>
      <img
        src={assetUrl}
        alt={name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '8px',
          border: '2px solid #D4AF37',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}
        className={animated ? 'creature-animated' : ''}
        onError={(e) => {
          // Fallback vers un emoji si l'image ne charge pas
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.style.cssText = `
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            background: #1a1a2e;
            border: 2px solid #D4AF37;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          `;
          fallback.textContent = '🐉';
          target.parentNode?.appendChild(fallback);
        }}
      />
    </div>
  );
};

export default CreatureDisplay; 