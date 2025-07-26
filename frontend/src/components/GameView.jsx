import React, { useState, useEffect, useRef } from 'react';
import './GameView.css';

const GameView = ({ gameState, onAction }) => {
  const [viewMode, setViewMode] = useState('tactical');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const canvasRef = useRef(null);

  // WALTER: "GESTION DU ZOOM À LA MOLETTE !"
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = zoomLevel * delta;
    
    // Transition automatique selon le zoom
    if (newZoom < 0.3 && viewMode === 'tactical') {
      transitionToStrategic();
    } else if (newZoom > 3 && viewMode === 'strategic') {
      transitionToTactical();
    }
    
    setZoomLevel(Math.max(0.1, Math.min(10, newZoom)));
  };

  // Transition fluide entre les vues
  const transitionToStrategic = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setViewMode('strategic');
      setZoomLevel(1);
      setIsTransitioning(false);
    }, 500);
  };

  const transitionToTactical = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setViewMode('tactical');
      setZoomLevel(1);
      setIsTransitioning(false);
    }, 500);
  };

  // Raccourci TAB pour changer de vue
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        if (viewMode === 'tactical') {
          transitionToStrategic();
        } else {
          transitionToTactical();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [viewMode]);

  // Menu radial pour construction (vue stratégique)
  const showRadialMenu = (tile, e) => {
    if (viewMode !== 'strategic') return;
    
    const menu = document.createElement('div');
    menu.className = 'radial-menu';
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;
    
    const buildings = [
      { icon: '🏰', type: 'castle', name: 'Château' },
      { icon: '⛏️', type: 'mine', name: 'Mine' },
      { icon: '🏹', type: 'tower', name: 'Tour' },
      { icon: '🏠', type: 'house', name: 'Maison' }
    ];
    
    buildings.forEach((building, index) => {
      const button = document.createElement('button');
      button.className = 'radial-button';
      button.innerHTML = `${building.icon}<span>${building.name}</span>`;
      button.style.transform = `rotate(${index * 90}deg) translateX(60px) rotate(-${index * 90}deg)`;
      button.onclick = () => {
        onAction({ type: 'BUILD', building: building.type, tile });
        document.body.removeChild(menu);
      };
      menu.appendChild(button);
    });
    
    document.body.appendChild(menu);
    
    // Fermer le menu en cliquant ailleurs
    setTimeout(() => {
      document.addEventListener('click', () => {
        if (document.body.contains(menu)) {
          document.body.removeChild(menu);
        }
      }, { once: true });
    }, 100);
  };

  // Rendu de la vue tactique (combat)
  const renderTacticalView = () => {
    return (
      <div className="tactical-view" style={{ transform: `scale(${zoomLevel})` }}>
        <div className="hex-grid">
          {gameState.battleGrid && gameState.battleGrid.map((row, y) => (
            <div key={y} className="hex-row">
              {row.map((tile, x) => (
                <div 
                  key={`${x}-${y}`} 
                  className={`hex-tile ${tile.type}`}
                  onClick={() => onAction({ type: 'MOVE', x, y })}
                >
                  {tile.unit && (
                    <div className="unit">
                      <span className="unit-icon">{tile.unit.icon}</span>
                      <div className="unit-health">{tile.unit.health}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Rendu de la vue stratégique (monde)
  const renderStrategicView = () => {
    return (
      <div className="strategic-view" style={{ transform: `scale(${zoomLevel})` }}>
        <div className="world-map">
          {gameState.worldMap && gameState.worldMap.regions.map((region) => (
            <div 
              key={region.id} 
              className={`region ${region.owner}`}
              style={{ 
                left: `${region.x}px`, 
                top: `${region.y}px`,
                width: `${region.width}px`,
                height: `${region.height}px`
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                showRadialMenu(region, e);
              }}
              onDoubleClick={() => {
                if (region.hasBattle) {
                  transitionToTactical();
                }
              }}
            >
              {region.castle && <span className="structure">🏰</span>}
              {region.mine && <span className="structure">⛏️</span>}
              {region.hero && <span className="hero-marker">{region.hero.icon}</span>}
              <div className="region-name">{region.name}</div>
            </div>
          ))}
          
          {/* Connexions entre régions */}
          {gameState.worldMap && gameState.worldMap.connections.map((conn, idx) => (
            <svg key={idx} className="connection-line">
              <line 
                x1={conn.from.x} 
                y1={conn.from.y} 
                x2={conn.to.x} 
                y2={conn.to.y}
                stroke="#444"
                strokeWidth="2"
                strokeDasharray={conn.type === 'portal' ? "5,5" : ""}
              />
            </svg>
          ))}
        </div>
      </div>
    );
  };

  // Interface spéciale Tour de Dolburd
  const renderDolburdTransition = () => {
    if (!gameState.dolburdActive) return null;
    
    return (
      <div className="dolburd-transition">
        <div className="cosmic-panel">
          <h2>🌀 TOUR DE DOLBURD</h2>
          <p>Changement de perspective initié...</p>
          <div className="reality-tear"></div>
          <button onClick={() => {
            onAction({ type: 'UNLOCK_STRATEGIC_VIEW' });
            transitionToStrategic();
          }}>
            Embrasser la Vision Cosmique
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="game-view" onWheel={handleWheel}>
      {/* Vue principale */}
      <div className={`view-container ${isTransitioning ? 'transitioning' : ''}`}>
        {viewMode === 'tactical' ? renderTacticalView() : renderStrategicView()}
      </div>

      {/* Éléments persistants */}
      <div className="persistent-ui">
        {/* Barre de ressources */}
        <div className="resource-bar">
          <span>💰 {gameState.resources?.gold || 0}</span>
          <span>🪵 {gameState.resources?.wood || 0}</span>
          <span>💎 {gameState.resources?.gems || 0}</span>
        </div>

        {/* Portrait du héros */}
        <div className="hero-portrait">
          {gameState.currentHero && (
            <>
              <img src={gameState.currentHero.portrait} alt={gameState.currentHero.name} />
              <div className="hero-stats">
                <div>⚔️ {gameState.currentHero.attack}</div>
                <div>🛡️ {gameState.currentHero.defense}</div>
                <div>🔮 {gameState.currentHero.magic}</div>
              </div>
            </>
          )}
        </div>

        {/* Mini-map */}
        <div className="minimap">
          <canvas ref={canvasRef} width="200" height="150" />
          <div className="view-indicator">{viewMode === 'tactical' ? '⚔️' : '🗺️'}</div>
        </div>

        {/* Indicateur de vue */}
        <div className="view-mode-indicator">
          <span>Mode: {viewMode === 'tactical' ? 'Combat' : 'Stratégique'}</span>
          <span className="hint">TAB pour changer</span>
        </div>
      </div>

      {/* Transition spéciale Dolburd */}
      {renderDolburdTransition()}
    </div>
  );
};

export default GameView;