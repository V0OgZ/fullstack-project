// 🎨 Hero Portrait Component - Flare Pack Integration
// ================================================================
// Composant React pour afficher les portraits de héros badass
// Utilise le Flare Portrait Pack pour des portraits qui imposent

import React, { useState, useEffect } from 'react';
import { heroPortraitService } from '../services/heroPortraitService';

interface HeroPortraitProps {
  heroName: string;
  portraitId?: string; // Nouveau champ pour spécifier le portrait indépendamment de la classe
  gender?: 'm' | 'f';
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const HeroPortrait: React.FC<HeroPortraitProps> = ({
  heroName,
  portraitId,
  gender,
  size = 'medium',
  showTooltip = false,
  className = '',
  onClick,
  style = {}
}) => {
  const [portraitUrl, setPortraitUrl] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [metadata, setMetadata] = useState<any>(null);

  // Obtenir les dimensions selon la taille
  const getSizeStyle = () => {
    const sizes = {
      small: { width: '48px', height: '48px' },
      medium: { width: '100px', height: '100px' },
      large: { width: '128px', height: '128px' }
    };
    return sizes[size];
  };

  // Charger le portrait
  useEffect(() => {
    const loadPortrait = async () => {
      try {
        // Utiliser portraitId si fourni, sinon utiliser heroName
        const portraitKey = portraitId || heroName;
        const url = heroPortraitService.getHeroPortrait(portraitKey, gender);
        const meta = heroPortraitService.getPortraitMetadata(portraitKey);
        
        setPortraitUrl(url);
        setMetadata(meta);
        
        // Précharger l'image
        await heroPortraitService.preloadPortrait(portraitKey);
        setIsLoaded(true);
      } catch (error) {
        console.warn(`Failed to load portrait for ${portraitId || heroName}:`, error);
        setHasError(true);
      }
    };

    loadPortrait();
  }, [heroName, portraitId, gender]);

  // Gestion du clic
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // Gestion d'erreur de chargement d'image
  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  // Gestion du succès de chargement
  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  // Styles combinés
  const combinedStyle = {
    ...getSizeStyle(),
    ...style
  };

  // Classe CSS combinée
  const combinedClassName = `hero-portrait ${size} ${className} ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''}`;

  return (
    <div 
      className={combinedClassName}
      style={{
        ...combinedStyle,
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '2px solid #D4AF37',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        background: '#1a1a2e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease'
      }}
      onClick={handleClick}
      title={showTooltip ? `${heroName} (${metadata?.style})` : undefined}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.borderColor = '#FFD700';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.borderColor = '#D4AF37';
        }
      }}
    >
      {/* Portrait principal */}
      {!hasError && portraitUrl && (
        <img
          src={portraitUrl}
          alt={`${heroName} portrait`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}

      {/* Fallback en cas d'erreur */}
      {hasError && (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: size === 'large' ? '48px' : size === 'medium' ? '36px' : '24px',
            background: 'linear-gradient(45deg, #2a2a3e, #1a1a2e)',
            color: '#D4AF37'
          }}
        >
          {getHeroEmoji(heroName)}
        </div>
      )}

      {/* Indicateur de chargement */}
      {!isLoaded && !hasError && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            border: '2px solid #D4AF37',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
        />
      )}

      {/* Overlay pour les effets */}
      {onClick && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(212, 175, 55, 0.1)',
            opacity: 0,
            transition: 'opacity 0.3s ease'
          }}
          className="portrait-overlay"
        />
      )}
    </div>
  );
};

// Fonction utilitaire pour obtenir l'emoji de fallback
const getHeroEmoji = (heroName: string): string => {
  const emojiMap: { [key: string]: string } = {
    'WARRIOR': '⚔️',
    'KNIGHT': '🛡️',
    'PALADIN': '✨',
    'BARBARIAN': '🪓',
    'MAGE': '🔮',
    'WIZARD': '🧙',
    'NECROMANCER': '💀',
    'DRUID': '🌿',
    'ARCHER': '🏹',
    'RANGER': '🌲',
    'ROGUE': '🗡️',
    'ASSASSIN': '🔪',
    'CLERIC': '⛪',
    'PRIEST': '📿'
  };
  
  return emojiMap[heroName.toUpperCase()] || '👤';
};

export default HeroPortrait;

// Export du composant et des types
export type { HeroPortraitProps };

// Composant wrapper pour les cas d'usage courants
export const SmallHeroPortrait: React.FC<Omit<HeroPortraitProps, 'size'>> = (props) => (
  <HeroPortrait {...props} size="small" />
);

export const MediumHeroPortrait: React.FC<Omit<HeroPortraitProps, 'size'>> = (props) => (
  <HeroPortrait {...props} size="medium" />
);

export const LargeHeroPortrait: React.FC<Omit<HeroPortraitProps, 'size'>> = (props) => (
  <HeroPortrait {...props} size="large" />
);

// Styles CSS à ajouter dans le fichier CSS global
const portraitStyles = `
@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.hero-portrait:hover .portrait-overlay {
  opacity: 1 !important;
}

.hero-portrait.loaded {
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

.hero-portrait.error {
  border-color: #ff6b6b;
}
`;

// Injecter les styles dans le DOM
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = portraitStyles;
  document.head.appendChild(styleElement);
} 