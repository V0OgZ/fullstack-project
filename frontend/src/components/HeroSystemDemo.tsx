// 🎮 Composant de démonstration du système de héros unifié
// Teste les portraits, montures et drapeaux

import React, { useState, useEffect } from 'react';
import { heroSpriteService } from '../services/heroSpriteService';
import { getPlayerColorConfig, getAvailablePlayerColors } from '../constants/playerColors';
import { getAllHeroes, createCompleteHero } from '../data/heroes';
import { PlayerColor, MountType } from '../types/game';
import './HeroSystemDemo.css';

const HeroSystemDemo: React.FC = () => {
  const [selectedHero, setSelectedHero] = useState<string>('Arthur');
  const [selectedColor, setSelectedColor] = useState<PlayerColor>('blue');
  const [selectedMount, setSelectedMount] = useState<MountType>('horse');
  const [heroes, setHeroes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHeroes = async () => {
      try {
        const allHeroes = getAllHeroes();
        setHeroes(allHeroes);
        setLoading(false);
      } catch (error) {
        console.error('Error loading heroes:', error);
        setLoading(false);
      }
    };

    loadHeroes();
  }, []);

  const handleHeroChange = (heroName: string) => {
    setSelectedHero(heroName);
  };

  const handleColorChange = (color: PlayerColor) => {
    setSelectedColor(color);
  };

  const handleMountChange = (mount: MountType) => {
    setSelectedMount(mount);
  };

  const createTestHero = () => {
    try {
      const hero = createCompleteHero(selectedHero, 'test_player', selectedColor);
      hero.mountType = selectedMount;
      return hero;
    } catch (error) {
      console.error('Error creating test hero:', error);
      return null;
    }
  };

  const testHero = createTestHero();

  if (loading) {
    return <div className="hero-demo-loading">Chargement du système de héros...</div>;
  }

  return (
    <div className="hero-system-demo">
      <h2>🎮 Démonstration du Système de Héros Unifié</h2>
      
      <div className="hero-demo-controls">
        <div className="control-group">
          <label>Héros:</label>
          <select 
            value={selectedHero} 
            onChange={(e) => handleHeroChange(e.target.value)}
            className="hero-select"
          >
            {heroes.map(hero => (
              <option key={hero.name} value={hero.name}>
                {hero.name} ({hero.class})
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Couleur du joueur:</label>
          <div className="color-buttons">
            {getAvailablePlayerColors().map(color => {
              const config = getPlayerColorConfig(color);
              return (
                <button
                  key={color}
                  className={`color-button ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: config.hex }}
                  onClick={() => handleColorChange(color)}
                  title={config.name}
                >
                  {config.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="control-group">
          <label>Monture:</label>
          <select 
            value={selectedMount} 
            onChange={(e) => handleMountChange(e.target.value as MountType)}
            className="mount-select"
          >
            <option value="none">Aucune</option>
            <option value="horse">Cheval</option>
            <option value="pegasus">Pégase</option>
            <option value="griffin">Griffon</option>
            <option value="dragon">Dragon</option>
            <option value="unicorn">Licorne</option>
          </select>
        </div>
      </div>

      {testHero && (
        <div className="hero-demo-display">
          <div className="hero-preview">
            <h3>Prévisualisation du Héros</h3>
            
            <div className="hero-info">
              <div className="hero-portrait-section">
                <h4>Portrait</h4>
                <div className="hero-portrait">
                  <HeroPortrait heroName={testHero.name} heroClass={testHero.class} />
                </div>
              </div>

              <div className="hero-details">
                <h4>Détails</h4>
                <div className="hero-stats">
                  <p><strong>Nom:</strong> {testHero.name}</p>
                  <p><strong>Classe:</strong> {testHero.class}</p>
                  <p><strong>Niveau:</strong> {testHero.level}</p>
                  <p><strong>Couleur:</strong> {getPlayerColorConfig(testHero.playerColor).name}</p>
                  <p><strong>Monture:</strong> {testHero.mountType}</p>
                </div>
              </div>

              <div className="hero-sprites">
                <h4>Sprites</h4>
                <div className="sprite-display">
                  <div className="sprite-item">
                    <h5>Portrait</h5>
                    <img 
                      src={heroSpriteService.getHeroPortrait(testHero.name).path}
                      alt="Portrait"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  
                  <div className="sprite-item">
                    <h5>Sprite carte</h5>
                    <img 
                      src={heroSpriteService.getHeroSprite(testHero.name).path}
                      alt="Sprite"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  
                  {testHero.mountType && testHero.mountType !== 'none' && (
                    <div className="sprite-item">
                      <h5>Monture</h5>
                      <img 
                        src={heroSpriteService.getMountSprite(testHero.mountType).path}
                        alt="Mount"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="sprite-item">
                    <h5>Drapeau</h5>
                    <img 
                      src={heroSpriteService.getFlagSprite(testHero.playerColor).path}
                      alt="Flag"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="hero-demo-info">
        <h3>Informations du Système</h3>
        <div className="system-stats">
          <p><strong>Héros disponibles:</strong> {heroes.length}</p>
          <p><strong>Couleurs disponibles:</strong> {getAvailablePlayerColors().length}</p>
          <p><strong>Cache d'images:</strong> {heroSpriteService.getCacheStats().cached} images</p>
        </div>
      </div>
    </div>
  );
};

// Composant de portrait réutilisable
const HeroPortrait: React.FC<{ heroName: string; heroClass: string }> = ({ heroName, heroClass }) => {
  const [portrait, setPortrait] = React.useState<any | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    
    const loadHeroPortrait = async () => {
      try {
        const portraitInfo = heroSpriteService.getHeroPortrait(heroName);
        const image = await heroSpriteService.loadHeroPortrait(heroName);
        
        if (isMounted) {
          setPortrait({
            url: portraitInfo.path,
            fallback: portraitInfo.fallback,
            type: 'local'
          });
        }
      } catch (error) {
        console.error('Error loading hero portrait:', error);
        if (isMounted) {
          setPortrait({
            url: '/assets/heroes/warrior.png',
            fallback: '🛡️',
            type: 'local'
          });
        }
      }
    };

    loadHeroPortrait();
    
    return () => {
      isMounted = false;
    };
  }, [heroName, heroClass]);

  if (!portrait) {
    return <div className="portrait-loading">Chargement...</div>;
  }

  return (
    <div className="hero-portrait-container">
      <img
        src={portrait.url}
        alt={heroName}
        className="hero-portrait-image"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const container = target.parentNode as HTMLElement;
          const fallbackImg = container.querySelector('.hero-portrait-fallback') as HTMLElement;
          if (fallbackImg) fallbackImg.style.display = 'block';
        }}
      />
      <img
        src={portrait.fallback}
        alt={heroName}
        className="hero-portrait-fallback"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default HeroSystemDemo;