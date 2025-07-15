import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import ModernGameRenderer, { ModernGameRendererRef } from './ModernGameRenderer';
import CastleManagementPanel from './CastleManagementPanel';
import EpicContentViewer from './EpicContentViewer';
import { getHeroFallbackImage, getHeroInfo } from '../utils/heroAssets';
import { Position } from '../types/game';
import './TrueHeroesInterface.css';
import heroDisplayService from '../services/heroDisplayService';

interface TrueHeroesInterfaceProps {
  playerCount: number;
  scenarioType: 'classique' | 'mystique' | 'multiplayer';
  scenarioId: string;
}

const TrueHeroesInterface: React.FC<TrueHeroesInterfaceProps> = ({ scenarioId, scenarioType }) => {
  const { t } = useTranslation();
  const { 
    currentGame, 
    currentPlayer, 
    isLoading, 
    error,
    endTurn,
    updateVision
  } = useGameStore();
  
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);
  const [rightPanelContent, setRightPanelContent] = useState<'scenario' | 'hero' | 'castle'>('scenario');
  const [showEpicContent, setShowEpicContent] = useState(false);
  const mapRendererRef = useRef<ModernGameRendererRef>(null);

  // Fonction pour sélectionner un héros (gardée pour compatibilité future)
  // const handleHeroSelect = (heroId: string | null) => {
  //   setSelectedHeroId(heroId);
  //   if (heroId) {
  //     setRightPanelContent('hero');
  //   } else {
  //     setRightPanelContent('scenario');
  //   }
  // };

  const handleHeroesClick = () => {
    if (!currentPlayer?.heroes || currentPlayer.heroes.length === 0) {
      // Si pas de héros, garder le panneau scénario avec les infos de map
      setRightPanelContent('scenario');
      setSelectedHeroId(null);
      return;
    }

    let targetHero;

    // Si aucun héros n'est sélectionné, sélectionner le premier
    if (!selectedHeroId) {
      targetHero = currentPlayer.heroes[0];
      console.log('🎯 Auto-selecting first hero:', targetHero.name, 'ID:', targetHero.id);
    } else {
      // Sinon, cycler au héros suivant
      const currentIndex = currentPlayer.heroes.findIndex(hero => hero.id === selectedHeroId);
      const nextIndex = (currentIndex + 1) % currentPlayer.heroes.length;
      targetHero = currentPlayer.heroes[nextIndex];
      console.log('🔄 Cycling to next hero:', targetHero.name, 'ID:', targetHero.id);
    }

    setSelectedHeroId(targetHero.id);
    setRightPanelContent('hero');

    console.log('✅ Hero selected for movement:', targetHero.name, 'at position:', targetHero.position);

    // Centrer la carte sur le héros (sera implémenté dans ModernGameRenderer)
    if (mapRendererRef.current && mapRendererRef.current.centerOnPosition) {
      mapRendererRef.current.centerOnPosition(targetHero.position);
    }
  };

  const handleCastleClick = () => {
    setRightPanelContent('castle');
  };

  const selectedHero = currentPlayer?.heroes?.find(hero => hero.id === selectedHeroId);

  const handleMapClick = (position: Position) => {
    console.log('🗺️ Map clicked at position:', position);
    console.log('👤 Current selectedHeroId:', selectedHeroId);
    console.log('🎯 selectedHero object:', selectedHero);
    
    if (selectedHero) {
      console.log('✅ Moving hero:', selectedHero.name, 'from', selectedHero.position, 'to position:', position);
      useGameStore.getState().moveHero(selectedHero.id, position);
    } else {
      console.log('❌ No hero selected for movement - auto-selecting first hero');
      
      // Auto-sélectionner le premier héros si aucun n'est sélectionné
      if (currentPlayer?.heroes && currentPlayer.heroes.length > 0) {
        const firstHero = currentPlayer.heroes[0];
        setSelectedHeroId(firstHero.id);
        console.log('🎯 Auto-selected hero:', firstHero.name, 'trying to move to:', position);
        
        // Attendre que le state soit mis à jour avant de déplacer
        setTimeout(() => {
          useGameStore.getState().moveHero(firstHero.id, position);
        }, 100);
      }
    }
  };

  // Update vision when game loads or current player changes
  useEffect(() => {
    if (currentPlayer?.id) {
      updateVision(currentPlayer.id);
    }
  }, [currentPlayer?.id, updateVision]);

  // Mettre à jour le titre de la page de façon dynamique selon le contexte
  useEffect(() => {
    let title = 'Heroes of Time';
    
    // Titre basé sur le contexte du panneau actuel
    if (rightPanelContent === 'scenario') {
      title = 'Heroes of Time - Scenario';
    } else if (rightPanelContent === 'hero') {
      title = 'Heroes of Time - Hero Management';
    } else if (rightPanelContent === 'castle') {
      title = 'Heroes of Time - Castle Management';
    }
    
    document.title = title;
    
    // Restaurer le titre original quand on quitte le composant
    return () => {
      document.title = 'Heroes of Time';
    };
  }, [scenarioId, rightPanelContent, selectedHero]);

  // Auto-sélectionner le premier héros quand on ouvre le panneau héros
  useEffect(() => {
    if (rightPanelContent === 'hero' && currentPlayer?.heroes && currentPlayer.heroes.length > 0 && !selectedHeroId) {
      const firstHero = currentPlayer.heroes[0];
      setSelectedHeroId(firstHero.id);
      console.log('🎯 Auto-selecting first hero on panel open:', firstHero.name);
    }
  }, [rightPanelContent, currentPlayer?.heroes, selectedHeroId]); // Fixed dependencies

  // Reusable component to display hero portrait with async loading
  const HeroPortrait: React.FC<{ heroName: string; heroClass: string }> = ({ heroName, heroClass }) => {
    const [portrait, setPortrait] = React.useState<any | null>(null);

    React.useEffect(() => {
      let isMounted = true;
      heroDisplayService
        .getHeroPortrait(heroName, heroClass)
        .then((result) => {
          if (isMounted) setPortrait(result);
        })
        .catch((err) => console.error('❌ Error loading hero portrait:', err));
      return () => {
        isMounted = false;
      };
    }, [heroName, heroClass]);

    if (!portrait) {
      return <div style={{ width: '100%', height: '120px', background: '#333', borderRadius: '8px' }} />;
    }

    return (
      <div className="hero-portrait-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
        <img
          src={portrait.url}
          alt={heroName}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', zIndex: 2 }}
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
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
            zIndex: 1,
            display: 'none',
          }}
        />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="true-heroes-interface loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading {scenarioType} scenario...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="true-heroes-interface error">
        <div className="error-content">
          <h2>Error Loading Game</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  if (!currentGame || !currentPlayer) {
    return (
      <div className="true-heroes-interface error">
        <div className="error-content">
          <h2>No Game Data</h2>
          <p>Unable to load game state.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="true-heroes-interface">
      
      {/* Header avec informations du jeu */}
      <div className="game-header">
        <div className="header-info">
          <div className="game-title">
            <h1>Heroes of Time</h1>
            <span className="scenario-badge">{scenarioType}</span>
            {scenarioId && (
              <span className="map-name">🗺️ {scenarioId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
            )}
          </div>
          <div className="player-info">
            <span className="player-name">{currentPlayer.username}</span>
            <div className="resources">
              <span className="gold">💰 {currentPlayer.resources?.gold || 0}</span>
              <span className="wood">🪵 {currentPlayer.resources?.wood || 0}</span>
              <span className="stone">🪨 {currentPlayer.resources?.stone || 0}</span>
            </div>
          </div>
        </div>
        
        <div className="header-controls">
          {/* Control buttons simplified */}
          <div className="control-buttons">
            <button 
              className={`control-btn ${rightPanelContent === 'hero' ? 'active' : ''}`}
              onClick={handleHeroesClick}
              disabled={!currentPlayer?.heroes || currentPlayer.heroes.length === 0}
              title={t('tooltip.heroes')}
            >
              <span className="btn-icon">⚔️</span>
            </button>
            
            {/* Remove Inventory button */}
            {/* <button 
              className={`control-btn ${rightPanelContent === 'inventory' ? 'active' : ''}`}
              onClick={handleInventoryClick}
              title={t('tooltip.inventory')}
            >
              <span className="btn-icon">🎒</span>
            </button> */}
            
            <button 
              className={`control-btn ${rightPanelContent === 'castle' ? 'active' : ''}`}
              onClick={handleCastleClick}
              title={t('tooltip.castle')}
            >
              <span className="btn-icon">🏰</span>
            </button>

            <button 
              className={`control-btn ${showEpicContent ? 'active' : ''}`}
              onClick={() => setShowEpicContent(true)}
              title="🎮 Contenu Épique - Créatures, Héros et Bâtiments"
            >
              <span className="btn-icon">🐉</span>
            </button>

            <button 
              className="end-turn-btn"
              onClick={() => {
                try {
                  endTurn();
                } catch (error) {
                  console.error('Error ending turn:', error);
                }
              }}
              title={currentGame?.gameMode === 'hotseat' ? t('nextPlayer') : t('tooltip.endTurn')}
            >
              <span className="btn-icon">
                {currentGame?.gameMode === 'hotseat' ? '👤' : '⭐'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="game-main">
        {/* Left side: Game Map */}
        <div className="map-container">
          <ModernGameRenderer 
            width={1200} 
            height={800} 
            onTileClick={handleMapClick}
            ref={mapRendererRef}
          />
        </div>

        {/* Right side: Dynamic Panel */}
        <div className="right-panel visible">
          {rightPanelContent === 'scenario' && (
            <div className="panel-content scenario-panel">
              <div className="panel-header">
                <h3>🎮 Scenario Info</h3>
              </div>
              
              <div className="scenario-details">
                <div className="scenario-overview">
                  <div className="scenario-name">
                    <span className="scenario-icon">🏰</span>
                    <span className="scenario-title">{scenarioId ? scenarioId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Conquest Classic'}</span>
                  </div>
                  <div className="scenario-type">
                    <span className="type-badge">{scenarioType}</span>
                  </div>
                </div>

                <div className="game-info">
                  <div className="info-item">
                    <span className="info-label">🎯 Turn:</span>
                    <span className="info-value">{currentGame?.currentTurn || 1}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">👑 Current Player:</span>
                    <span className="info-value">{currentPlayer?.username}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">🌍 Map Size:</span>
                    <span className="info-value">{currentGame?.map?.width || 20}x{currentGame?.map?.height || 20}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">⚔️ Game Mode:</span>
                    <span className="info-value">{currentGame?.gameMode || 'Standard'}</span>
                  </div>
                </div>

                <div className="objectives">
                  <h4>🎯 Objectives</h4>
                  <div className="objective-item">
                    <span className="objective-icon">🏆</span>
                    <span className="objective-text">Control the Temporal Nexus</span>
                  </div>
                  <div className="objective-item">
                    <span className="objective-icon">🌀</span>
                    <span className="objective-text">Close 3 temporal rifts</span>
                  </div>
                  <div className="objective-item">
                    <span className="objective-icon">⚔️</span>
                    <span className="objective-text">Defeat the Temporal Guardian</span>
                  </div>
                </div>

                <div className="quick-stats">
                  <h4>📊 Quick Stats</h4>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon">⚔️</div>
                      <div className="stat-info">
                        <div className="stat-number">{currentPlayer?.heroes?.length || 0}</div>
                        <div className="stat-label">Heroes</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">🏰</div>
                      <div className="stat-info">
                        <div className="stat-number">{currentGame?.map?.objects?.filter(obj => obj.type === 'city').length || 1}</div>
                        <div className="stat-label">Castles</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">🗺️</div>
                      <div className="stat-info">
                        <div className="stat-number">{currentGame?.map?.tiles?.length || 400}</div>
                        <div className="stat-label">Tiles</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">💰</div>
                      <div className="stat-info">
                        <div className="stat-number">{currentPlayer?.resources?.gold || 0}</div>
                        <div className="stat-label">Gold</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {rightPanelContent === 'hero' && selectedHero && (
            <div className="panel-content hero-panel">
              <div className="panel-header">
                <h3>⚔️ {selectedHero.name}</h3>
                <button 
                  className="close-panel-btn"
                  onClick={() => setRightPanelContent('scenario')}
                >
                  ×
                </button>
              </div>
              
              <div className="hero-details">
                <div className="hero-portrait">
                  <div className="hero-image">
                    <HeroPortrait heroName={selectedHero.name} heroClass={selectedHero.class || 'Warrior'} />
                  </div>
                  <div className="hero-basic-info">
                    <h3 className="hero-name">{selectedHero.name}</h3>
                    <div className="hero-class">
                      {(() => {
                        const heroInfo = getHeroInfo(selectedHero.name.toUpperCase());
                        return heroInfo.class;
                      })()}
                    </div>
                    <div className="hero-description">
                      {(() => {
                        const heroInfo = getHeroInfo(selectedHero.name.toUpperCase());
                        return heroInfo.description;
                      })()}
                    </div>
                  </div>
                </div>
                
                <div className="hero-stats">
                  <div className="stat-row">
                    <div className="stat-item">
                      <span className="stat-label">⚔️ Attack:</span>
                      <span className="stat-value">{selectedHero.stats?.attack || 0}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">🛡️ Defense:</span>
                      <span className="stat-value">{selectedHero.stats?.defense || 0}</span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <div className="stat-item">
                      <span className="stat-label">🔮 Spell Power:</span>
                      <span className="stat-value">{selectedHero.stats?.spellPower || 0}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">📚 Knowledge:</span>
                      <span className="stat-value">{selectedHero.stats?.knowledge || 0}</span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <div className="stat-item">
                      <span className="stat-label">❤️ Health:</span>
                      <span className="stat-value">{selectedHero.stats?.health || 100}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">💙 Mana:</span>
                      <span className="stat-value">{selectedHero.stats?.mana || 20}</span>
                    </div>
                  </div>
                </div>
                
                {selectedHero.skills && selectedHero.skills.length > 0 && (
                  <div className="hero-skills">
                    <h4>🎯 Skills:</h4>
                    <div className="skills-list">
                      {selectedHero.skills.map((skill, index) => (
                        <span key={index} className="skill-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedHero.spells && selectedHero.spells.length > 0 && (
                  <div className="hero-spells">
                    <h4>✨ Spells:</h4>
                    <div className="spells-list">
                      {selectedHero.spells.map((spell, index) => (
                        <span key={index} className="spell-badge">{spell}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="hero-actions">
                  <button 
                    className="action-button"
                    onClick={() => {
                      // Action pour lancer un sort
                      console.log('Cast spell with hero:', selectedHero.name);
                    }}
                  >
                    🔮 Cast Spell
                  </button>
                </div>

                {/* Objets équipés directement dans le panneau héros */}
                <div className="hero-equipped-items">
                  <h4>🎒 Equipped Items:</h4>
                  <div className="equipped-slots">
                    <div className="equipment-slot">
                      <span className="slot-icon">⚔️</span>
                      <div className="slot-item">Magic Sword</div>
                    </div>
                    <div className="equipment-slot">
                      <span className="slot-icon">🛡️</span>
                      <div className="slot-item">Dragon Scale</div>
                    </div>
                    <div className="equipment-slot">
                      <span className="slot-icon">💍</span>
                      <div className="slot-item">Power Ring</div>
                    </div>
                    <div className="equipment-slot">
                      <span className="slot-icon">👑</span>
                      <div className="slot-item">Crown of Wisdom</div>
                    </div>
                  </div>
                  <div className="equipment-bonuses">
                    <h5>Bonuses:</h5>
                    <div className="bonus-list">
                      <span>+15 Attack</span>
                      <span>+12 Defense</span>
                      <span>+8 Spell Power</span>
                      <span>+200 Movement</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Remove inventory panel */}
          {/* {rightPanelContent === 'inventory' && (
            <div className="panel-content inventory-panel">
              <div className="panel-header">
                <h3>🎒 Equipped Items</h3>
                <button 
                  className="close-panel-btn"
                  onClick={() => setRightPanelContent('scenario')}
                >
                  ×
                </button>
              </div>
              
              <div className="equipped-items">
                <div className="equipment-slots">
                  <div className="equipment-slot">
                    <div className="slot-icon">⚔️</div>
                    <div className="slot-label">Weapon</div>
                    <div className="slot-item">Magic Sword</div>
                  </div>
                  <div className="equipment-slot">
                    <div className="slot-icon">🛡️</div>
                    <div className="slot-label">Armor</div>
                    <div className="slot-item">Dragon Scale</div>
                  </div>
                  <div className="equipment-slot">
                    <div className="slot-icon">💍</div>
                    <div className="slot-label">Ring</div>
                    <div className="slot-item">Power Ring</div>
                  </div>
                  <div className="equipment-slot">
                    <div className="slot-icon">👑</div>
                    <div className="slot-label">Helmet</div>
                    <div className="slot-item">Crown of Wisdom</div>
                  </div>
                </div>
                
                <div className="inventory-stats">
                  <h4>📊 Bonuses</h4>
                  <div className="bonus-item">+15 Attack</div>
                  <div className="bonus-item">+12 Defense</div>
                  <div className="bonus-item">+8 Spell Power</div>
                  <div className="bonus-item">+200 Movement</div>
                </div>
              </div>
            </div>
          )} */}

          {rightPanelContent === 'castle' && (
            <CastleManagementPanel
              gameId={currentGame.id}
              playerId={currentPlayer.id}
              onClose={() => setRightPanelContent('scenario')}
            />
          )}
        </div>
      </div>
      
      {/* Epic Content Viewer Modal */}
      <EpicContentViewer 
        isVisible={showEpicContent}
        onClose={() => setShowEpicContent(false)}
      />
    </div>
  );
};

export default TrueHeroesInterface; 