import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import ModernGameRenderer from '../components/ModernGameRenderer';
import ActionPlanner from '../components/ActionPlanner';
import CreditsModal from '../components/CreditsModal';
import ZFCVisualizer from '../components/ZFCVisualizer';
import TimelineViewer from '../components/TimelineViewer';
import PoliticalSystem from '../components/PoliticalSystem';
import LanguageSelector from '../components/LanguageSelector';
import { Hero, MapObject } from '../types/game';
import { GAME_ICONS } from '../constants/gameIcons';
import { generateHexMap } from '../utils/hexMapGenerator';
import { useTranslation } from '../i18n';

const Game: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { t } = useTranslation();
  const {
    currentGame,
    currentPlayer,
    pendingActions,
    isLoading,
    error,
    map,
    setMap,
    loadGame,
    refreshGameState,
    endTurn,
    switchPlayer,
    nextPlayer,
  } = useGameStore();

  const [selectedHero, setSelectedHero] = useState<Hero | undefined>();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showCredits, setShowCredits] = useState(false);
  const [showZFC, setShowZFC] = useState(true);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showPoliticalSystem, setShowPoliticalSystem] = useState(false);

  useEffect(() => {
    if (gameId) {
      loadGame(gameId);
    }
  }, [gameId, loadGame]);

  // Initialize the hexagonal map
  useEffect(() => {
    if (map.length === 0) {
      const hexMap = generateHexMap({ width: 12, height: 10 });
      setMap(hexMap);
    }
  }, [map.length, setMap]);

  useEffect(() => {
    if (currentGame) {
      // Auto-refresh every 30 seconds
      const interval = setInterval(() => {
        refreshGameState();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [currentGame, refreshGameState]);

  const handleTileClick = (tile: { x: number; y: number }) => {
    if (selectedAction === 'move' && selectedHero) {
      // Handle move action
      console.log('Moving hero to:', { x: tile.x, y: tile.y });
      setSelectedAction(null);
    }
  };

  const handleHeroClick = (hero: Hero) => {
    setSelectedHero(hero);
  };

  const handleObjectClick = (object: MapObject) => {
    if (selectedAction === 'collect' && selectedHero) {
      // Handle collect action
      console.log('Collecting object:', object);
      setSelectedAction(null);
    }
  };

  const handleActionPlanned = () => {
    refreshGameState();
  };

  const handleEndTurn = async () => {
    if (currentGame) {
      if (currentGame.gameMode === 'hotseat') {
        nextPlayer();
      } else {
        await endTurn();
      }
    }
  };

  const handlePlayerSwitch = (playerId: string) => {
    switchPlayer(playerId);
  };

  if (isLoading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#1a1a1a',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid rgba(255,255,255,0.1)', 
            borderTop: '4px solid #0078d4', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#1a1a1a',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#d13438', fontSize: '18px', marginBottom: '16px' }}>{t('error')}</div>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!currentGame || !currentPlayer) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#1a1a1a',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p>{t('gameNotFound')}</p>
        </div>
      </div>
    );
  }

  const allHeroes = currentGame.players.flatMap(player => player.heroes);
  const playerHeroes = currentPlayer.heroes;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header moderne */}
      <div className="game-header">
        <div>
          <h1 className="game-title">{currentGame.name}</h1>
          <p className="game-subtitle">
            {t('turn')} {currentGame.currentTurn} • {t('player')}: {currentPlayer.username}
          </p>
        </div>
        <div className="resources">
          <div className="resource-item">
            <span className="resource-icon">{GAME_ICONS.RESOURCE_GOLD}</span>
            {currentPlayer.resources.gold}
          </div>
          <div className="resource-item">
            <span className="resource-icon">{GAME_ICONS.RESOURCE_WOOD}</span>
            {currentPlayer.resources.wood}
          </div>
          <div className="resource-item">
            <span className="resource-icon">{GAME_ICONS.RESOURCE_STONE}</span>
            {currentPlayer.resources.stone}
          </div>
          <div className="resource-item">
            <span className="resource-icon">{GAME_ICONS.RESOURCE_CRYSTAL}</span>
            {currentPlayer.resources.mana}
          </div>
          <button onClick={handleEndTurn} className="btn">
            {currentGame.gameMode === 'hotseat' ? GAME_ICONS.GAME_FAST_FORWARD : GAME_ICONS.GAME_STOP} 
            {currentGame.gameMode === 'hotseat' ? t('nextPlayer') : t('endTurn')}
          </button>
          <button onClick={() => setShowCredits(true)} className="btn credits-btn">
            📜 {t('credits')}
          </button>
          <button onClick={() => setShowZFC(!showZFC)} className="btn zfc-btn">
            {showZFC ? `👁️ ${t('hideZFC')}` : `👁️ ${t('showZFC')}`}
          </button>
          <button onClick={() => setShowTimeline(!showTimeline)} className="btn timeline-btn">
            {showTimeline ? `📋 ${t('hideTimeline')}` : `📋 ${t('showTimeline')}`}
          </button>
          <button onClick={() => setShowPoliticalSystem(true)} className="btn political-btn">
            🏛️ {t('politicalCouncil')}
          </button>
          <LanguageSelector />
        </div>
      </div>

      {/* Container principal - fullscreen */}
      <div className="game-container">
        {/* Carte en arrière-plan */}
        <div className="map-background">
          <ModernGameRenderer width={1200} height={800} />
          <ZFCVisualizer isVisible={showZFC} />
        </div>

        {/* Interface flottante moderne */}
        <div className="floating-ui">
          {/* Mode Hot Seat */}
          {currentGame.gameMode === 'hotseat' && (
            <div className="ui-panel hotseat-mode">
              <div className="hotseat-header">
                <div className="current-player-info">
                  <div className="player-avatar">
                    {currentPlayer.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="player-details">
                    <div className="player-name">{currentPlayer.username}</div>
                    <div className="player-turn-indicator">Tour actuel</div>
                  </div>
                  <div className="turn-badge">ACTIF</div>
                </div>
              </div>
            </div>
          )}

          {/* Action planner */}
          <div className="ui-panel action-planner">
            <div className="panel-title">Actions</div>
            <ActionPlanner
              selectedHero={selectedHero}
              pendingActions={pendingActions}
              onActionPlanned={handleActionPlanned}
            />
          </div>

          {/* Timeline Viewer */}
          {showTimeline && (
            <div className="ui-panel timeline-panel">
              <TimelineViewer isVisible={showTimeline} />
            </div>
          )}

          {/* Héros du joueur */}
          <div className="ui-panel player-heroes">
            <div className="panel-title">Mes Héros</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {playerHeroes.map(hero => (
                <div
                  key={hero.id}
                  className={`hero-card ${
                    selectedHero?.id === hero.id ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedHero(hero)}
                >
                  <div className="hero-card-header">
                    <div className="hero-card-name">{hero.name}</div>
                    <div className="hero-card-stats">
                      {GAME_ICONS.HERO_WARRIOR} Niv. {hero.level}
                    </div>
                  </div>
                  <div className="hero-stats">
                    <div>Position: ({hero.position.x}, {hero.position.y})</div>
                    <div>MP: {hero.movementPoints}/{hero.maxMovementPoints}</div>
                    <div>Unités: {hero.units.length}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <CreditsModal isOpen={showCredits} onClose={() => setShowCredits(false)} />
      
      {/* Système politique */}
      <PoliticalSystem 
        isVisible={showPoliticalSystem} 
        onClose={() => setShowPoliticalSystem(false)} 
      />
    </div>
  );
};

export default Game; 