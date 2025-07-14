import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import ModernGameRenderer from './ModernGameRenderer';
import HeroDisplay from './HeroDisplay';
import UnitDisplay from './UnitDisplay';
import './SimpleModernInterface.css';
import { Hero, Position } from '../types/game';
import { ApiService } from '../services/api';

const SimpleModernInterface: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  
  const { 
    currentGame, 
    currentPlayer, 
    isLoading, 
    error,
    endTurn,
    nextPlayer
  } = useGameStore();

  // Mettre à jour le titre de la page
  useEffect(() => {
    if (currentGame?.id) {
      const mapName = currentGame.id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
      document.title = `Heroes of Time - ${mapName}`;
    }
    
    return () => {
      document.title = 'Heroes of Time';
    };
  }, [currentGame?.id]);

  if (!currentGame || !currentPlayer) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>{t('loading')}</p>
      </div>
    );
  }

  const handleEndTurn = () => {
    if (currentGame.gameMode === 'hotseat') {
      nextPlayer();
    } else {
      endTurn();
    }
  };

  const handleTileClick = (coord: Position) => {
    if (selectedHero) {
      ApiService.moveHero(selectedHero.id, coord)
        .then(() => {
          useGameStore.getState().refreshGameState();
          setSelectedHero(null);
        })
        .catch((error: any) => console.error('Failed to move hero:', error));
    }
  };

  return (
    <div className="game-layout">
      {/* Header Simple */}
      <header className="game-header">
        <div className="header-left">
          <h1 className="game-title">Heroes of Time</h1>
          <div className="game-info">
            <span>{t('turn')} {currentGame.currentTurn}</span>
            <span className="separator">•</span>
            <span>{currentPlayer.username}</span>
          </div>
        </div>

        <div className="header-center">
          <div className="resources">
            <div className="resource">
              <span className="resource-icon">💰</span>
              <span className="resource-value">{currentPlayer.resources.gold}</span>
            </div>
            <div className="resource">
              <span className="resource-icon">🪵</span>
              <span className="resource-value">{currentPlayer.resources.wood}</span>
            </div>
            <div className="resource">
              <span className="resource-icon">🗿</span>
              <span className="resource-value">{currentPlayer.resources.stone}</span>
            </div>
            <div className="resource">
              <span className="resource-icon">💎</span>
              <span className="resource-value">{currentPlayer.resources.mana}</span>
            </div>
          </div>
        </div>

        <div className="header-right">
          <button className="btn btn-primary" onClick={handleEndTurn}>
            {currentGame.gameMode === 'hotseat' ? t('nextPlayer') : t('endTurn')}
          </button>
          
          <div className="language-selector">
            <button 
              className={`lang-btn ${language === 'fr' ? 'active' : ''}`}
              onClick={() => setLanguage('fr')}
            >
              🇫🇷 FR
            </button>
            <button 
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              🇬🇧 EN
            </button>
            <button 
              className={`lang-btn ${language === 'ru' ? 'active' : ''}`}
              onClick={() => setLanguage('ru')}
            >
              🇷🇺 RU
            </button>
          </div>
        </div>
      </header>

      {/* Contenu Principal */}
      <main className="game-main">
        {/* Map - 80% de l'écran */}
        <div className="map-area">
          <ModernGameRenderer 
            width={1200} 
            height={800} 
            onTileClick={handleTileClick}
          />
        </div>

        {/* Side Panel - Simple et efficace */}
        {showSidePanel && (
          <aside className="side-panel">
            <div className="panel-header">
              <h3>{t('myHeroes')}</h3>
              <button 
                className="panel-toggle"
                onClick={() => setShowSidePanel(false)}
              >
                ×
              </button>
            </div>

            <div className="heroes-list">
              {currentPlayer.heroes.map(hero => (
                <div key={hero.id} className={`hero-card ${selectedHero?.id === hero.id ? 'selected' : ''}`}
                  onClick={() => setSelectedHero(hero)}
                >
                  <div className="hero-header">
                    <HeroDisplay 
                      heroType={hero.name.toLowerCase().includes('mage') ? 'mage' : 
                               hero.name.toLowerCase().includes('archer') ? 'archer' : 
                               hero.name.toLowerCase().includes('paladin') ? 'paladin' : 'warrior'} 
                      size={48} 
                      showName={false}
                    />
                    <div>
                      <span className="hero-name">{hero.name}</span>
                      <span className="hero-level">Niv. {hero.level}</span>
                    </div>
                  </div>
                  <div className="hero-stats">
                    <div className="stat">
                      <span className="stat-label">Position:</span>
                      <span className="stat-value">({hero.position.x}, {hero.position.y})</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">MP:</span>
                      <span className="stat-value">{hero.movementPoints}/{hero.maxMovementPoints}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Unités:</span>
                      <span className="stat-value">{hero.units.length}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Graphics Showcase Section */}
            <div className="graphics-showcase" style={{marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px'}}>
              <h4 style={{margin: '0 0 10px 0', color: '#333'}}>🎨 LPC Graphics Showcase</h4>
              
              <div style={{marginBottom: '15px'}}>
                <h5 style={{margin: '0 0 5px 0', fontSize: '12px', color: '#666'}}>Heroes:</h5>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                  <HeroDisplay heroType="warrior" size={64} />
                  <HeroDisplay heroType="mage" size={64} />
                  <HeroDisplay heroType="archer" size={64} />
                  <HeroDisplay heroType="paladin" size={64} />
                </div>
              </div>

              <div>
                <h5 style={{margin: '0 0 5px 0', fontSize: '12px', color: '#666'}}>Units:</h5>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                  <UnitDisplay unitType="knight" />
                  <UnitDisplay unitType="archer" />
                  <UnitDisplay unitType="skeleton" />
                  <UnitDisplay unitType="undead" />
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Bouton pour rouvrir le panel */}
        {!showSidePanel && (
          <button 
            className="panel-opener"
            onClick={() => setShowSidePanel(true)}
          >
            ⚔️
          </button>
        )}
      </main>
    </div>
  );
};

export default SimpleModernInterface; 