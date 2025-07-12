import React, { useState, useMemo } from 'react';
import { useTranslation } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import ModernGameRenderer from './ModernGameRenderer';

const SimpleGameInterface: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [activeTab, setActiveTab] = useState<'heroes' | 'map' | 'structures'>('heroes');
  
  const { 
    currentGame, 
    currentPlayer, 
    selectedTile,
    map,
    endTurn,
    nextPlayer 
  } = useGameStore();

  // Get selected tile info
  const selectedTileInfo = useMemo(() => {
    if (!selectedTile || !map || !map[selectedTile.y] || !map[selectedTile.y][selectedTile.x]) {
      return null;
    }
    return map[selectedTile.y][selectedTile.x];
  }, [selectedTile, map]);

  // Get all structures owned by current player
  const playerStructures = useMemo(() => {
    if (!map || !currentPlayer) return [];
    const structures = [];
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const tile = map[y][x];
        if (tile.structure && tile.structure.owner === currentPlayer.id) {
          structures.push({ ...tile.structure, position: { x, y } });
        }
      }
    }
    return structures;
  }, [map, currentPlayer]);

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
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid #404040', 
            borderTop: '3px solid #00d4ff', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p>{t('loading')}</p>
        </div>
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

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#1a1a1a',
      color: 'white',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Header Simple */}
      <div style={{
        height: '70px',
        background: '#2a2a2a',
        borderBottom: '1px solid #404040',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: '600', 
            margin: 0, 
            color: '#00d4ff' 
          }}>
            Heroes Reforged
          </h1>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            color: '#b0b0b0', 
            fontSize: '14px' 
          }}>
            <span>{t('turn')} {currentGame.currentTurn}</span>
            <span style={{ color: '#606060' }}>•</span>
            <span>{currentPlayer.username}</span>
          </div>
        </div>

        {/* Resources */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '8px 16px', 
            background: '#333333', 
            borderRadius: '8px', 
            border: '1px solid #404040' 
          }}>
            <span style={{ fontSize: '18px' }}>💰</span>
            <span style={{ 
              fontWeight: '600', 
              color: '#ffffff', 
              fontFamily: 'JetBrains Mono, monospace' 
            }}>
              {currentPlayer.resources.gold}
            </span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '8px 16px', 
            background: '#333333', 
            borderRadius: '8px', 
            border: '1px solid #404040' 
          }}>
            <span style={{ fontSize: '18px' }}>🪵</span>
            <span style={{ 
              fontWeight: '600', 
              color: '#ffffff', 
              fontFamily: 'JetBrains Mono, monospace' 
            }}>
              {currentPlayer.resources.wood}
            </span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '8px 16px', 
            background: '#333333', 
            borderRadius: '8px', 
            border: '1px solid #404040' 
          }}>
            <span style={{ fontSize: '18px' }}>🗿</span>
            <span style={{ 
              fontWeight: '600', 
              color: '#ffffff', 
              fontFamily: 'JetBrains Mono, monospace' 
            }}>
              {currentPlayer.resources.stone}
            </span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '8px 16px', 
            background: '#333333', 
            borderRadius: '8px', 
            border: '1px solid #404040' 
          }}>
            <span style={{ fontSize: '18px' }}>💎</span>
            <span style={{ 
              fontWeight: '600', 
              color: '#ffffff', 
              fontFamily: 'JetBrains Mono, monospace' 
            }}>
              {currentPlayer.resources.mana}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            onClick={handleEndTurn}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '14px',
              background: '#00d4ff',
              color: '#1a1a1a',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#00b8e6';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#00d4ff';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {currentGame.gameMode === 'hotseat' ? t('nextPlayer') : t('endTurn')}
          </button>
          
          <div style={{ 
            display: 'flex', 
            background: '#333333', 
            borderRadius: '6px', 
            overflow: 'hidden', 
            border: '1px solid #404040' 
          }}>
            <button 
              onClick={() => setLanguage('fr')}
              style={{
                padding: '8px 12px',
                background: language === 'fr' ? '#00d4ff' : 'transparent',
                border: 'none',
                color: language === 'fr' ? '#1a1a1a' : '#b0b0b0',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              🇫🇷 FR
            </button>
            <button 
              onClick={() => setLanguage('en')}
              style={{
                padding: '8px 12px',
                background: language === 'en' ? '#00d4ff' : 'transparent',
                border: 'none',
                color: language === 'en' ? '#1a1a1a' : '#b0b0b0',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              🇬🇧 EN
            </button>
            <button 
              onClick={() => setLanguage('ru')}
              style={{
                padding: '8px 12px',
                background: language === 'ru' ? '#00d4ff' : 'transparent',
                border: 'none',
                color: language === 'ru' ? '#1a1a1a' : '#b0b0b0',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              🇷🇺 RU
            </button>
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        {/* Map - 80% de l'écran */}
        <div style={{ 
          flex: 1, 
          background: '#0f0f0f', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <ModernGameRenderer width={1200} height={800} />
        </div>

        {/* Enhanced Side Panel */}
        {showSidePanel && (
          <div style={{
            width: '380px',
            background: '#2a2a2a',
            borderLeft: '1px solid #404040',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0
          }}>
            {/* Header with tabs */}
            <div style={{
              padding: '16px 20px 0 20px',
              borderBottom: '1px solid #404040'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#ffffff' 
                }}>
                  Game Info
                </h3>
                <button 
                  onClick={() => setShowSidePanel(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#b0b0b0',
                    fontSize: '20px',
                    cursor: 'pointer',
                    padding: '5px',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#404040';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.color = '#b0b0b0';
                  }}
                >
                  ×
                </button>
              </div>

              {/* Tab Navigation */}
              <div style={{
                display: 'flex',
                gap: '4px',
                marginBottom: '16px'
              }}>
                {(['heroes', 'map', 'structures'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: activeTab === tab ? '#00d4ff' : '#333333',
                      border: '1px solid #404040',
                      borderRadius: '6px',
                      color: activeTab === tab ? '#1a1a1a' : '#b0b0b0',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      if (activeTab !== tab) {
                        e.currentTarget.style.background = '#3a3a3a';
                        e.currentTarget.style.color = '#ffffff';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (activeTab !== tab) {
                        e.currentTarget.style.background = '#333333';
                        e.currentTarget.style.color = '#b0b0b0';
                      }
                    }}
                  >
                    {tab === 'heroes' ? '⚔️ Heroes' : tab === 'map' ? '🗺️ Map' : '🏰 Structures'}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div style={{ 
              flex: 1, 
              padding: '16px', 
              overflowY: 'auto' 
            }}>
              {/* Heroes Tab */}
              {activeTab === 'heroes' && (
                <div>
                  {currentPlayer.heroes.map(hero => (
                    <div 
                      key={hero.id} 
                      style={{
                        background: '#333333',
                        borderRadius: '8px',
                        padding: '16px',
                        marginBottom: '12px',
                        border: '1px solid #404040',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#3a3a3a';
                        e.currentTarget.style.borderColor = '#00d4ff';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = '#333333';
                        e.currentTarget.style.borderColor = '#404040';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '12px'
                      }}>
                        <span style={{ 
                          fontWeight: '600', 
                          color: '#ffffff', 
                          fontSize: '16px' 
                        }}>
                          {hero.name}
                        </span>
                        <span style={{
                          background: '#00d4ff',
                          color: '#1a1a1a',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          Niv. {hero.level}
                        </span>
                      </div>
                      
                      {/* Hero Stats */}
                      <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '8px',
                        marginBottom: '12px'
                      }}>
                        <div style={{ background: '#404040', padding: '6px', borderRadius: '4px' }}>
                          <div style={{ fontSize: '10px', color: '#b0b0b0' }}>Attack</div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>
                            {hero.stats.attack}
                          </div>
                        </div>
                        <div style={{ background: '#404040', padding: '6px', borderRadius: '4px' }}>
                          <div style={{ fontSize: '10px', color: '#b0b0b0' }}>Defense</div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>
                            {hero.stats.defense}
                          </div>
                        </div>
                        <div style={{ background: '#404040', padding: '6px', borderRadius: '4px' }}>
                          <div style={{ fontSize: '10px', color: '#b0b0b0' }}>Knowledge</div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>
                            {hero.stats.knowledge}
                          </div>
                        </div>
                        <div style={{ background: '#404040', padding: '6px', borderRadius: '4px' }}>
                          <div style={{ fontSize: '10px', color: '#b0b0b0' }}>Spell Power</div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>
                            {hero.stats.spellPower}
                          </div>
                        </div>
                      </div>

                      {/* Basic Info */}
                      <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '4px',
                        fontSize: '12px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#b0b0b0' }}>Position:</span>
                          <span style={{ color: '#ffffff', fontWeight: '500' }}>
                            ({hero.position.x}, {hero.position.y})
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#b0b0b0' }}>Movement:</span>
                          <span style={{ color: '#ffffff', fontWeight: '500' }}>
                            {hero.movementPoints}/{hero.maxMovementPoints}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#b0b0b0' }}>Experience:</span>
                          <span style={{ color: '#ffffff', fontWeight: '500' }}>
                            {hero.experience}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#b0b0b0' }}>Units:</span>
                          <span style={{ color: '#ffffff', fontWeight: '500' }}>
                            {hero.units.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Map Tab */}
              {activeTab === 'map' && (
                <div>
                  {selectedTileInfo ? (
                    <div style={{
                      background: '#333333',
                      borderRadius: '8px',
                      padding: '16px',
                      border: '1px solid #404040',
                      marginBottom: '16px'
                    }}>
                      <h4 style={{ margin: '0 0 12px 0', color: '#ffffff' }}>
                        Selected Tile
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#b0b0b0' }}>Position:</span>
                          <span style={{ color: '#ffffff', fontWeight: '500' }}>
                            ({selectedTile?.x}, {selectedTile?.y})
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#b0b0b0' }}>Terrain:</span>
                          <span style={{ color: '#ffffff', fontWeight: '500' }}>
                            {selectedTileInfo.terrain}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#b0b0b0' }}>Movement Cost:</span>
                          <span style={{ color: '#ffffff', fontWeight: '500' }}>
                            {selectedTileInfo.movementCost}
                          </span>
                        </div>
                        {selectedTileInfo.hero && (
                          <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #404040' }}>
                            <div style={{ color: '#00d4ff', fontWeight: '600' }}>
                              Hero: {selectedTileInfo.hero.name}
                            </div>
                          </div>
                        )}
                        {selectedTileInfo.creature && (
                          <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #404040' }}>
                            <div style={{ color: '#ff6b6b', fontWeight: '600' }}>
                              Creature: {selectedTileInfo.creature.name}
                            </div>
                          </div>
                        )}
                        {selectedTileInfo.structure && (
                          <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #404040' }}>
                            <div style={{ color: '#4ecdc4', fontWeight: '600' }}>
                              Structure: {selectedTileInfo.structure.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#b0b0b0' }}>
                              Owner: {selectedTileInfo.structure.owner || 'None'}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      background: '#333333',
                      borderRadius: '8px',
                      padding: '16px',
                      border: '1px solid #404040',
                      textAlign: 'center',
                      color: '#b0b0b0'
                    }}>
                      Click on a tile to see its information
                    </div>
                  )}
                </div>
              )}

              {/* Structures Tab */}
              {activeTab === 'structures' && (
                <div>
                  {playerStructures.length > 0 ? (
                    playerStructures.map(structure => (
                      <div 
                        key={structure.id}
                        style={{
                          background: '#333333',
                          borderRadius: '8px',
                          padding: '16px',
                          marginBottom: '12px',
                          border: '1px solid #404040',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '8px'
                        }}>
                          <span style={{ 
                            fontWeight: '600', 
                            color: '#ffffff', 
                            fontSize: '14px' 
                          }}>
                            {structure.name}
                          </span>
                          <span style={{
                            background: '#4ecdc4',
                            color: '#1a1a1a',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: '600'
                          }}>
                            Lv. {structure.level}
                          </span>
                        </div>
                        
                        <div style={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: '4px',
                          fontSize: '12px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#b0b0b0' }}>Type:</span>
                            <span style={{ color: '#ffffff', fontWeight: '500' }}>
                              {structure.type}
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#b0b0b0' }}>Position:</span>
                            <span style={{ color: '#ffffff', fontWeight: '500' }}>
                              ({structure.position.x}, {structure.position.y})
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#b0b0b0' }}>Health:</span>
                            <span style={{ color: '#ffffff', fontWeight: '500' }}>
                              {structure.health}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{
                      background: '#333333',
                      borderRadius: '8px',
                      padding: '16px',
                      border: '1px solid #404040',
                      textAlign: 'center',
                      color: '#b0b0b0'
                    }}>
                      No structures owned
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bouton pour rouvrir le panel */}
        {!showSidePanel && (
          <button 
            onClick={() => setShowSidePanel(true)}
            style={{
              position: 'absolute',
              top: '50%',
              right: '20px',
              transform: 'translateY(-50%)',
              background: '#2a2a2a',
              border: '1px solid #404040',
              borderRadius: '8px',
              padding: '12px',
              color: '#00d4ff',
              cursor: 'pointer',
              fontSize: '20px',
              transition: 'all 0.2s ease',
              zIndex: 10
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#333333';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#2a2a2a';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ⚔️
          </button>
        )}
      </div>
    </div>
  );
};

export default SimpleGameInterface; 