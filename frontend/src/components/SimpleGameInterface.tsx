import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import ModernGameRenderer from './ModernGameRenderer';

interface SimpleGameInterfaceProps {
  scenarioId?: string;
}

const SimpleGameInterface: React.FC<SimpleGameInterfaceProps> = ({ scenarioId = 'demo-game' }) => {
  const { 
    map,
    currentPlayer, 
    selectedTile, 
    loadGame, 
    currentGame,
    endTurn,
    nextPlayer,
    isLoading,
    error
  } = useGameStore();
  const { t } = useTranslation();
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);

  // State for the active tab
  const [activeTab, setActiveTab] = useState<'map' | 'heroes' | 'structures' | 'actions'>('map');

  // Get selected tile info
  const selectedTileInfo = useMemo(() => {
    if (!selectedTile || !map || !map[selectedTile.y] || !map[selectedTile.y][selectedTile.x]) {
      return null;
    }
    return map[selectedTile.y][selectedTile.x];
  }, [selectedTile, map]);

  // Mock data for demonstration - Remove eslint warnings
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const playerStructures = [
    { id: 1, name: 'Castle', type: 'castle', position: { x: 0, y: 0 }, level: 3 },
    { id: 2, name: 'Mine', type: 'mine', position: { x: 2, y: 1 }, level: 2 },
    { id: 3, name: 'Sawmill', type: 'sawmill', position: { x: 1, y: 3 }, level: 1 }
  ];

  // Mock heroes data (use real heroes if available, fallback to mock)
  const mockHeroes = useMemo(() => {
    if (currentPlayer?.heroes && currentPlayer.heroes.length > 0) {
      return currentPlayer.heroes.map(hero => ({
        id: hero.id,
        name: hero.name || 'Unknown Hero',
        class: 'Warrior', // Default class since it's not in Hero type
        level: hero.level || 1,
        position: hero.position || { x: 0, y: 0 },
        stats: hero.stats || { attack: 10, defense: 10, spellPower: 5, knowledge: 5 },
        movementPoints: hero.movementPoints || 1000,
        maxMovementPoints: hero.maxMovementPoints || 1000,
        attack: hero.stats?.attack || 10,
        defense: hero.stats?.defense || 10,
        spellPower: hero.stats?.spellPower || 5,
        knowledge: hero.stats?.knowledge || 5
      }));
    }
    
    // Fallback mock data
    return [
      { 
        id: 'hero1', 
        name: 'Sir Gareth', 
        class: 'Knight', 
        level: 12, 
        position: { x: 0, y: 0 },
        stats: { attack: 18, defense: 15, spellPower: 3, knowledge: 5 },
        movementPoints: 1800,
        maxMovementPoints: 2000,
        attack: 18,
        defense: 15,
        spellPower: 3,
        knowledge: 5
      },
      { 
        id: 'hero2', 
        name: 'Elena the Wise', 
        class: 'Sorceress', 
        level: 10, 
        position: { x: 1, y: 2 },
        stats: { attack: 8, defense: 6, spellPower: 22, knowledge: 18 },
        movementPoints: 1500,
        maxMovementPoints: 1800,
        attack: 8,
        defense: 6,
        spellPower: 22,
        knowledge: 18
      },
      { 
        id: 'hero3', 
        name: 'Thorin Ironbeard', 
        class: 'Barbarian', 
        level: 14, 
        position: { x: 3, y: 1 },
        stats: { attack: 25, defense: 12, spellPower: 1, knowledge: 2 },
        movementPoints: 2200,
        maxMovementPoints: 2400,
        attack: 25,
        defense: 12,
        spellPower: 1,
        knowledge: 2
      }
    ];
  }, [currentPlayer]);

  // Initialize game
  useEffect(() => {
    const initGame = async () => {
      await loadGame(scenarioId);
    };
    initGame();
  }, [loadGame, scenarioId]);

  // Handle end turn
  const handleEndTurn = () => {
    if (currentGame?.gameMode === 'hotseat') {
      nextPlayer();
    } else {
      endTurn();
    }
  };

  // Handle hero selection
  const handleHeroSelect = (heroId: string) => {
    setSelectedHeroId(heroId);
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

  if (error) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#1a1a1a',
        color: '#ff6b6b'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>❌ Error</h2>
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

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#1a1a1a',
      color: 'white',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
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
            ⚔️ Legends of Conquest
          </h1>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            color: '#b0b0b0', 
            fontSize: '14px' 
          }}>
            <span>🎯 {t('turn')} {currentGame.currentTurn}</span>
            <span style={{ color: '#606060' }}>•</span>
            <span>👤 {currentPlayer.username}</span>
          </div>
        </div>

        {/* Resources with cool icons */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', background: '#333333', borderRadius: '8px',
              border: '1px solid #404040'
            }}>
              <span style={{ fontSize: '18px' }}>💰</span>
              <span style={{ fontWeight: '600', color: '#FFD700', fontFamily: 'JetBrains Mono, monospace' }}>
                {currentPlayer.resources?.gold?.toLocaleString() || '0'}
              </span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', background: '#333333', borderRadius: '8px',
              border: '1px solid #404040'
            }}>
              <span style={{ fontSize: '18px' }}>🪵</span>
              <span style={{ fontWeight: '600', color: '#8B4513', fontFamily: 'JetBrains Mono, monospace' }}>
                {currentPlayer.resources?.wood || '0'}
              </span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', background: '#333333', borderRadius: '8px',
              border: '1px solid #404040'
            }}>
              <span style={{ fontSize: '18px' }}>🪨</span>
              <span style={{ fontWeight: '600', color: '#708090', fontFamily: 'JetBrains Mono, monospace' }}>
                {currentPlayer.resources?.stone || '0'}
              </span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', background: '#333333', borderRadius: '8px',
              border: '1px solid #404040'
            }}>
              <span style={{ fontSize: '18px' }}>💎</span>
              <span style={{ fontWeight: '600', color: '#00BFFF', fontFamily: 'JetBrains Mono, monospace' }}>
                {currentPlayer.resources?.mana || '0'}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button style={{
            padding: '10px 20px', border: 'none', borderRadius: '6px',
            fontWeight: '500', cursor: 'pointer', fontSize: '14px',
            background: '#00d4ff', color: '#1a1a1a',
            transition: 'all 0.2s ease'
          }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#00b8e6';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#00d4ff';
              e.currentTarget.style.transform = 'translateY(0px)';
            }}
            onClick={handleEndTurn}
          >
            ⏭️ {t('endTurn')}
          </button>
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
        }} data-testid="game-canvas">
          <ModernGameRenderer width={1200} height={800} />
        </div>

        {/* Enhanced Side Panel - Make it narrower */}
        {showSidePanel && (
          <div style={{
            width: '300px', // Reduced from 380px
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
                {(['heroes', 'actions', 'structures'] as const).map(tab => (
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
                    {tab === 'heroes' ? '⚔️ Heroes' : tab === 'actions' ? '🎯 Actions' : '🏰 Buildings'}
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
                <div style={{ padding: '15px' }}>
                  <h3 style={{ 
                    margin: '0 0 15px 0', 
                    fontSize: '16px', 
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    ⚔️ Heroes of Time ({mockHeroes.length})
                  </h3>
                  {mockHeroes.map(hero => (
                    <div key={hero.id} style={{
                      background: selectedHeroId === hero.id ? '#3a3a3a' : '#333333', 
                      borderRadius: '8px', padding: '12px',
                      marginBottom: '10px', 
                      border: selectedHeroId === hero.id ? '2px solid #FFD700' : '1px solid #404040',
                      transition: 'all 0.2s ease', cursor: 'pointer'
                    }}
                      onClick={() => handleHeroSelect(hero.id)}
                      onMouseOver={(e) => {
                        if (selectedHeroId !== hero.id) {
                          e.currentTarget.style.background = '#3a3a3a';
                          e.currentTarget.style.borderColor = '#FFD700';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (selectedHeroId !== hero.id) {
                          e.currentTarget.style.background = '#333333';
                          e.currentTarget.style.borderColor = '#404040';
                          e.currentTarget.style.transform = 'translateY(0px)';
                        }
                      }}
                    >
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', marginBottom: '8px'
                      }}>
                        <span style={{ 
                          fontWeight: '600', 
                          color: '#ffffff', 
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          🛡️ {hero.name}
                        </span>
                        <span style={{
                          background: '#00d4ff', color: '#1a1a1a',
                          padding: '3px 8px', borderRadius: '4px',
                          fontSize: '11px', fontWeight: '600'
                        }}>
                          ⭐ LVL {hero.level}
                        </span>
                      </div>
                      <div style={{
                        display: 'grid', gridTemplateColumns: '1fr 1fr',
                        gap: '6px', fontSize: '11px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#b0b0b0' }}>⚔️ Attack:</span>
                          <span style={{ color: '#ff6b6b', fontWeight: '500' }}>{hero.attack}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#b0b0b0' }}>🛡️ Defense:</span>
                          <span style={{ color: '#4ecdc4', fontWeight: '500' }}>{hero.defense}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#b0b0b0' }}>📚 Knowledge:</span>
                          <span style={{ color: '#45b7d1', fontWeight: '500' }}>{hero.knowledge}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#b0b0b0' }}>🔮 Spell Power:</span>
                          <span style={{ color: '#9b59b6', fontWeight: '500' }}>{hero.spellPower}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#b0b0b0' }}>🏃 Movement:</span>
                          <span style={{ color: '#f39c12', fontWeight: '500' }}>{hero.movementPoints}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#b0b0b0' }}>📍 Position:</span>
                          <span style={{ color: '#95a5a6', fontWeight: '500' }}>({hero.position.x},{hero.position.y})</span>
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
                <div style={{ padding: '15px' }}>
                  <h3 style={{ 
                    margin: '0 0 15px 0', 
                    fontSize: '16px', 
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    🏰 Your Structures
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{
                      background: '#333333', borderRadius: '8px', padding: '12px',
                      border: '1px solid #404040'
                    }}>
                      <h4 style={{ 
                        margin: '0 0 8px 0', 
                        color: '#e74c3c',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        🏛️ Main Castle
                      </h4>
                      <div style={{ fontSize: '12px', color: '#b0b0b0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span>⭐ Level:</span>
                          <span style={{ color: '#f39c12' }}>3</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span>🛡️ Defense:</span>
                          <span style={{ color: '#2ecc71' }}>85</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>👥 Garrison:</span>
                          <span style={{ color: '#3498db' }}>120 units</span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{
                      background: '#333333', borderRadius: '8px', padding: '12px',
                      border: '1px solid #404040'
                    }}>
                      <h4 style={{ 
                        margin: '0 0 8px 0', 
                        color: '#f39c12',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        ⛏️ Gold Mine
                      </h4>
                      <div style={{ fontSize: '12px', color: '#b0b0b0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span>💰 Production:</span>
                          <span style={{ color: '#f1c40f' }}>+1000/day</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>🔧 Status:</span>
                          <span style={{ color: '#2ecc71' }}>Active</span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{
                      background: '#333333', borderRadius: '8px', padding: '12px',
                      border: '1px solid #404040'
                    }}>
                      <h4 style={{ 
                        margin: '0 0 8px 0', 
                        color: '#27ae60',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        🌲 Sawmill
                      </h4>
                      <div style={{ fontSize: '12px', color: '#b0b0b0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span>🪵 Production:</span>
                          <span style={{ color: '#8B4513' }}>+7/day</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>🔧 Status:</span>
                          <span style={{ color: '#2ecc71' }}>Active</span>
                        </div>
                      </div>
                    </div>
                    
                    <button style={{
                      marginTop: '10px',
                      padding: '10px 15px', background: '#3498db', border: 'none',
                      borderRadius: '6px', color: 'white', cursor: 'pointer',
                      fontWeight: '500', transition: 'all 0.2s ease',
                      display: 'flex', alignItems: 'center', gap: '8px',
                      justifyContent: 'center'
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#2980b9';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = '#3498db';
                        e.currentTarget.style.transform = 'translateY(0px)';
                      }}
                    >
                      🔨 Build New Structure
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'actions' && (
                <div style={{ padding: '15px' }}>
                  <h3 style={{ 
                    margin: '0 0 15px 0', 
                    fontSize: '16px', 
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    🎯 Available Actions
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button style={{
                      padding: '10px 15px', background: '#2ecc71', border: 'none',
                      borderRadius: '6px', color: 'white', cursor: 'pointer',
                      fontWeight: '500', transition: 'all 0.2s ease',
                      display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#27ae60';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = '#2ecc71';
                        e.currentTarget.style.transform = 'translateY(0px)';
                      }}
                    >
                      🚶 Move Hero
                    </button>
                    
                    <button style={{
                      padding: '10px 15px', background: '#e74c3c', border: 'none',
                      borderRadius: '6px', color: 'white', cursor: 'pointer',
                      fontWeight: '500', transition: 'all 0.2s ease',
                      display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#c0392b';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = '#e74c3c';
                        e.currentTarget.style.transform = 'translateY(0px)';
                      }}
                    >
                      ⚔️ Attack Enemy
                    </button>
                    
                    <button style={{
                      padding: '10px 15px', background: '#f39c12', border: 'none',
                      borderRadius: '6px', color: 'white', cursor: 'pointer',
                      fontWeight: '500', transition: 'all 0.2s ease',
                      display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#e67e22';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = '#f39c12';
                        e.currentTarget.style.transform = 'translateY(0px)';
                      }}
                    >
                      💎 Collect Resources
                    </button>
                    
                    <button style={{
                      padding: '10px 15px', background: '#9b59b6', border: 'none',
                      borderRadius: '6px', color: 'white', cursor: 'pointer',
                      fontWeight: '500', transition: 'all 0.2s ease',
                      display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#8e44ad';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = '#9b59b6';
                        e.currentTarget.style.transform = 'translateY(0px)';
                      }}
                    >
                      ✨ Cast Spell
                    </button>
                    
                    <button style={{
                      padding: '10px 15px', background: '#34495e', border: 'none',
                      borderRadius: '6px', color: 'white', cursor: 'pointer',
                      fontWeight: '500', transition: 'all 0.2s ease',
                      display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#2c3e50';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = '#34495e';
                        e.currentTarget.style.transform = 'translateY(0px)';
                      }}
                    >
                      🏰 Build Structure
                    </button>
                  </div>
                  
                  <div style={{ 
                    marginTop: '20px', 
                    padding: '12px', 
                    background: 'rgba(52, 152, 219, 0.1)',
                    border: '1px solid rgba(52, 152, 219, 0.3)',
                    borderRadius: '8px'
                  }}>
                    <h4 style={{ 
                      margin: '0 0 8px 0', 
                      color: '#3498db',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      💡 Quick Tips
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#b0b0b0', lineHeight: '1.4' }}>
                      🎯 Click on a hero first, then choose an action. 
                      ⚡ Use hotkeys for faster gameplay!
                    </p>
                  </div>
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