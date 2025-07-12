import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import ModernGameRenderer from './ModernGameRenderer';

const SimpleGameInterface: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const [showSidePanel, setShowSidePanel] = useState(true);
  
  const { 
    currentGame, 
    currentPlayer, 
    endTurn,
    nextPlayer 
  } = useGameStore();

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

        {/* Side Panel - Simple */}
        {showSidePanel && (
          <div style={{
            width: '320px',
            background: '#2a2a2a',
            borderLeft: '1px solid #404040',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0
          }}>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #404040',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h3 style={{ 
                margin: 0, 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#ffffff' 
              }}>
                {t('myHeroes')}
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

            <div style={{ 
              flex: 1, 
              padding: '20px', 
              overflowY: 'auto' 
            }}>
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
                  
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '6px' 
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '13px'
                    }}>
                      <span style={{ color: '#b0b0b0' }}>Position:</span>
                      <span style={{ 
                        color: '#ffffff', 
                        fontWeight: '500', 
                        fontFamily: 'JetBrains Mono, monospace' 
                      }}>
                        ({hero.position.x}, {hero.position.y})
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '13px'
                    }}>
                      <span style={{ color: '#b0b0b0' }}>MP:</span>
                      <span style={{ 
                        color: '#ffffff', 
                        fontWeight: '500', 
                        fontFamily: 'JetBrains Mono, monospace' 
                      }}>
                        {hero.movementPoints}/{hero.maxMovementPoints}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '13px'
                    }}>
                      <span style={{ color: '#b0b0b0' }}>Unités:</span>
                      <span style={{ 
                        color: '#ffffff', 
                        fontWeight: '500', 
                        fontFamily: 'JetBrains Mono, monospace' 
                      }}>
                        {hero.units.length}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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