import React, { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';
import { useTranslation } from '../i18n';
import TerrainModeSelector, { TerrainMode } from './TerrainModeSelector';
import GoldorakEasterEgg from './GoldorakEasterEgg';
import { useRetroKonami } from '../utils/retro-konami';
import './TrueHeroesInterface.css';
import './EnhancedSidebarPanels.css';

interface TrueHeroesInterfaceProps {
  onNavigate: (page: string) => void;
}

const TrueHeroesInterface: React.FC<TrueHeroesInterfaceProps> = ({ onNavigate }) => {
  const { 
    currentGame, 
    currentPlayer, 
    selectedHero,
    endTurn,
    isLoading,
    error
  } = useGameStore();
  
  // États existants
  const [activePanel, setActivePanel] = useState<'scenario' | 'hero' | 'castle' | 'inventory' | 'script' | 'epic'>('scenario');
  const [testMode, setTestMode] = useState(false);
  
  // NOUVEAU: État pour le mode terrain hybride
  const [terrainMode, setTerrainMode] = useState<TerrainMode>('canvas2d');
  
  // NOUVEAU: État pour Goldorak Easter Egg
  const [showGoldorakEasterEgg, setShowGoldorakEasterEgg] = useState(false);

  // NOUVEAU: États pour le script editor
  const [scriptContent, setScriptContent] = useState<string>('');
  const [scriptResults, setScriptResults] = useState<string>('');

  // Templates de script
  const SCRIPT_TEMPLATES = {
    hero: `// 🧙 Create and manage heroes
const newHero = createHero("Lysander", "Knight", 5);
console.log("Created hero:", newHero);

// Move hero to position
moveHero(newHero.id, 10, 15);
console.log("Hero moved to (10, 15)");`,
    
    castle: `// 🏰 Castle management
buildCastle(5, 5, "human");
console.log("Castle built at (5, 5)");

// Recruit units
recruitUnit("castle1", "peasant", 50);
recruitUnit("castle1", "archer", 25);
console.log("Units recruited");`,
    
    combat: `// ⚔️ Combat simulation
const hero1 = createHero("Arthur", "Knight", 10);
const hero2 = createHero("Morgana", "Sorceress", 8);

console.log("Combat between:", hero1.name, "vs", hero2.name);
console.log("Winner: TBD");`
  };

  // Fonction d'exécution de script
  const executeScript = useCallback(() => {
    try {
      setScriptResults('🔄 Executing script...\n');
      
      // Mock execution context
      const scriptContext = {
        createHero: (name: string, heroClass: string, level: number) => ({
          id: `hero_${Date.now()}`,
          name,
          class: heroClass,
          level,
          stats: { attack: level * 2, defense: level * 2 }
        }),
        moveHero: (heroId: string, x: number, y: number) => {
          return `Hero ${heroId} moved to (${x}, ${y})`;
        },
        buildCastle: (x: number, y: number, type: string) => {
          return `${type} castle built at (${x}, ${y})`;
        },
        recruitUnit: (castleId: string, unitType: string, count: number) => {
          return `Recruited ${count} ${unitType}s at ${castleId}`;
        },
        endTurn: () => {
          if (currentGame?.id) {
            endTurn();
          }
          return 'Turn ended';
        },
        getGameState: () => ({
          turn: currentGame?.turn || 1,
          player: currentPlayer?.name || 'Player 1',
          heroes: mockHeroes.length
        })
      };

      // Execute script in context
      const func = new Function(...Object.keys(scriptContext), `
        ${scriptContent}
        return "✅ Script executed successfully";
      `);
      
      const result = func(...Object.values(scriptContext));
      setScriptResults(prev => prev + result + '\n');
      
    } catch (error) {
      setScriptResults(prev => prev + `❌ Error: ${error}\n`);
    }
  }, [scriptContent, currentGame?.id, currentPlayer?.name, endTurn, mockHeroes.length]);

  // Load default game on component mount
  useEffect(() => {
    // Initialization logic here
    setScriptContent(SCRIPT_TEMPLATES.hero);
  }, []);

  const handleEndTurn = useCallback(() => {
    if (currentGame?.id) {
      endTurn();
    }
  }, [currentGame?.id, endTurn]);

  // Loading state
  if (isLoading) {
    return (
      <div className="true-heroes-interface loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>Loading Heroes of Time...</h2>
          <p>Preparing your epic adventure</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="true-heroes-interface error">
        <div className="error-content">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Mock epic content data
  const mockEpicContent = [
    {
      id: 'dragon1',
      name: 'Ancient Dragon',
      type: 'Creature',
      rarity: 'Legendary',
      description: 'A powerful ancient dragon with devastating breath attacks',
      icon: '🐉',
      stats: { attack: 30, defense: 25, health: 200 }
    },
    {
      id: 'excalibur',
      name: 'Excalibur',
      type: 'Artifact',
      rarity: 'Legendary',
      description: 'The legendary sword of kings',
      icon: '⚔️',
      bonus: '+10 Attack, +5 Morale'
    },
    {
      id: 'phoenix',
      name: 'Phoenix',
      type: 'Creature',
      rarity: 'Epic',
      description: 'Mystical bird that resurrects from ashes',
      icon: '🔥',
      stats: { attack: 18, defense: 15, health: 120 }
    }
  ];

  // Mock hero data for better visuals
  const mockHeroes = [
    {
      id: 'hero1',
      name: 'Lysander',
      class: 'Knight',
      level: 5,
      stats: { attack: 8, defense: 12, power: 3, knowledge: 5 }
    },
    {
      id: 'hero2',
      name: 'Aria',
      class: 'Sorceress',
      level: 7,
      stats: { attack: 4, defense: 6, power: 15, knowledge: 18 }
    }
  ];

  // Enhanced hero panel component
  const EnhancedHeroDisplay = ({ hero, isSelected, onSelect }: any) => (
    <div 
      className={`hero-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(hero)}
    >
      <div className="hero-avatar">⚔️</div>
      <div className="hero-info">
        <div className="hero-name">{hero.name}</div>
        <div className="hero-class">{hero.class} - Level {hero.level}</div>
        <div className="hero-stats">
          <span className="hero-stat">⚔️ {hero.stats.attack}</span>
          <span className="hero-stat">🛡️ {hero.stats.defense}</span>
          <span className="hero-stat">⚡ {hero.stats.power}</span>
          <span className="hero-stat">📚 {hero.stats.knowledge}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="true-heroes-interface">
      <div className="game-layout">
        {/* Main game area */}
        <div className="game-map-container">
          {!testMode ? (
            <div className="modern-game-renderer">
              <div className="map-placeholder">
                <h2>🗺️ Heroes of Time</h2>
                <p>Epic Map Rendering Engine</p>
                <div className="map-stats">
                  <div>🎯 Turn: {currentGame?.turn || 1}</div>
                  <div>👤 Player: {currentPlayer?.name || 'Player 1'}</div>
                  <div>⚔️ Heroes: {mockHeroes.length}</div>
                  <div>💰 Gold: {currentPlayer?.resources?.gold || 1500}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="test-mode-placeholder">
              <h3>🧪 Test Mode</h3>
              <p>Map désactivée pour tester l'interface</p>
              <button onClick={() => setTestMode(false)}>
                Réactiver la map
              </button>
            </div>
          )}
        </div>

        {/* Right side - Enhanced Sidebar */}
        <div className="right-sidebar">
          <div className="sidebar-header">
            <div className="game-info">
              <span className="turn-counter">Turn {currentGame?.turn || 1}</span>
              <span className="resources">💰 {currentPlayer?.resources?.gold || 1500}</span>
            </div>
            <div className="sidebar-controls">
              <button 
                className={`sidebar-tab ${activePanel === 'scenario' ? 'active' : ''}`}
                onClick={() => setActivePanel('scenario')}
                title="Scenario"
              >
                🏔️
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'hero' ? 'active' : ''}`}
                onClick={() => setActivePanel('hero')}
                title="Hero"
              >
                ⚔️
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'castle' ? 'active' : ''}`}
                onClick={() => setActivePanel('castle')}
                title="Castle"
              >
                🏰
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'inventory' ? 'active' : ''}`}
                onClick={() => setActivePanel('inventory')}
                title="Inventory"
              >
                🎒
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'script' ? 'active' : ''}`}
                onClick={() => setActivePanel('script')}
                title="Script Editor"
              >
                🧪
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'epic' ? 'active' : ''}`}
                onClick={() => setActivePanel('epic')}
                title="Epic Content"
              >
                🌟
              </button>
            </div>
          </div>

          <div className="sidebar-content">
            {activePanel === 'scenario' && (
              <div className="panel-content scenario-panel">
                <div className="panel-header">
                  <h3>🏔️ Scenario</h3>
                </div>
                <div className="scenario-info">
                  <h4>{currentGame?.scenario || 'Conquest Classic'}</h4>
                  <p>Welcome to Heroes of Time!</p>
                  
                  {/* Sélecteur de mode terrain */}
                  <TerrainModeSelector 
                    currentMode={terrainMode}
                    onModeChange={setTerrainMode}
                    disabled={isLoading}
                  />
                  
                  <div className="scenario-stats">
                    <div>Turn: {currentGame?.turn || 1}</div>
                    <div>Player: {currentPlayer?.name || 'Player 1'}</div>
                    <div>Heroes: {mockHeroes.length}</div>
                    <div>Gold: {currentPlayer?.resources?.gold || 1500}</div>
                  </div>
                  
                  {/* Contrôles du jeu */}
                  <div className="game-controls">
                    <button 
                      className="end-turn-btn"
                      onClick={handleEndTurn}
                      disabled={isLoading}
                    >
                      ⭐ End Turn
                    </button>
                    <button 
                      className="test-mode-btn"
                      onClick={() => setTestMode(!testMode)}
                    >
                      🔧 Test Mode
                    </button>
                  </div>

                  {/* Goldorak Easter Egg */}
                  <div className="easter-egg-section">
                    <button
                      className="goldorak-btn"
                      onClick={() => setShowGoldorakEasterEgg(true)}
                    >
                      🚀 Goldorak Easter Egg
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activePanel === 'hero' && (
              <div className="panel-content hero-panel">
                <div className="panel-header">
                  <h3>⚔️ Heroes</h3>
                </div>
                <div className="heroes-list">
                  {mockHeroes.map((hero) => (
                    <EnhancedHeroDisplay
                      key={hero.id}
                      hero={hero}
                      isSelected={selectedHero?.id === hero.id}
                      onSelect={(hero: any) => console.log('Hero selected:', hero)}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {activePanel === 'castle' && (
              <div className="panel-content castle-panel">
                <div className="panel-header">
                  <h3>🏰 Castle</h3>
                </div>
                <div className="enhanced-panel">
                  <h4>Castle Management</h4>
                  <div className="castle-stats">
                    <div>📊 Population: 2,450</div>
                    <div>🏭 Buildings: 12</div>
                    <div>⚔️ Garrison: 500</div>
                    <div>🛡️ Defense: 85%</div>
                  </div>
                  <div className="castle-actions">
                    <button className="action-btn">Build Structure</button>
                    <button className="action-btn">Recruit Army</button>
                    <button className="action-btn">Manage Resources</button>
                  </div>
                </div>
              </div>
            )}
            
            {activePanel === 'inventory' && (
              <div className="panel-content inventory-panel">
                <div className="panel-header">
                  <h3>🎒 Inventory</h3>
                </div>
                <div className="enhanced-panel">
                  <h4>Hero Equipment</h4>
                  <div className="equipment-grid">
                    <div className="equipment-slot">
                      <div className="slot-icon">⚔️</div>
                      <div className="slot-name">Weapon</div>
                      <div className="slot-item">Sword of Valor</div>
                    </div>
                    <div className="equipment-slot">
                      <div className="slot-icon">🛡️</div>
                      <div className="slot-name">Shield</div>
                      <div className="slot-item">Shield of Protection</div>
                    </div>
                    <div className="equipment-slot">
                      <div className="slot-icon">👑</div>
                      <div className="slot-name">Helmet</div>
                      <div className="slot-item">Crown of Wisdom</div>
                    </div>
                    <div className="equipment-slot">
                      <div className="slot-icon">💍</div>
                      <div className="slot-name">Ring</div>
                      <div className="slot-item">Ring of Power</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SCRIPT EDITOR INTÉGRÉ */}
            {activePanel === 'script' && (
              <div className="panel-content script-panel">
                <div className="panel-header">
                  <h3>🧪 Script Editor</h3>
                </div>
                <div className="script-editor-container">
                  <div className="script-editor-toolbar">
                    <button className="script-btn" onClick={() => setScriptContent(SCRIPT_TEMPLATES.hero)}>New Hero</button>
                    <button className="script-btn" onClick={() => setScriptContent(SCRIPT_TEMPLATES.castle)}>New Castle</button>
                    <button className="script-btn" onClick={() => setScriptContent(SCRIPT_TEMPLATES.combat)}>Combat</button>
                    <button className="script-btn" onClick={() => executeScript()}>▶️ Run</button>
                    <button className="script-btn" onClick={() => setScriptResults('')}>🗑️ Clear</button>
                  </div>
                  <textarea 
                    className="script-textarea"
                    placeholder="Enter your Heroes of Time script here..."
                    value={scriptContent}
                    onChange={(e) => setScriptContent(e.target.value)}
                  />
                  {scriptResults && (
                    <div className="script-results">
                      <h4>📋 Results:</h4>
                      <pre>{scriptResults}</pre>
                    </div>
                  )}
                  <div className="script-help">
                    <h4>⚡ Available Commands:</h4>
                    <div className="command-list">
                      <div className="command-item">
                        <strong>createHero(name, class, level)</strong> - Create a new hero
                      </div>
                      <div className="command-item">
                        <strong>moveHero(heroId, x, y)</strong> - Move hero to position
                      </div>
                      <div className="command-item">
                        <strong>buildCastle(x, y, type)</strong> - Build castle at position
                      </div>
                      <div className="command-item">
                        <strong>recruitUnit(castleId, unitType, count)</strong> - Recruit units
                      </div>
                      <div className="command-item">
                        <strong>endTurn()</strong> - End current player turn
                      </div>
                      <div className="command-item">
                        <strong>getGameState()</strong> - Get current game state
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EPIC CONTENT INTÉGRÉ */}
            {activePanel === 'epic' && (
              <div className="panel-content epic-panel">
                <div className="panel-header">
                  <h3>🌟 Epic Content</h3>
                </div>
                <div className="epic-content-grid">
                  {mockEpicContent.map((item) => (
                    <div key={item.id} className="epic-item">
                      <div className="epic-item-icon">{item.icon}</div>
                      <div className="epic-item-name">{item.name}</div>
                      <div className="epic-item-description">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Goldorak Easter Egg */}
      {showGoldorakEasterEgg && (
        <GoldorakEasterEgg
          isActive={showGoldorakEasterEgg}
          onClose={() => setShowGoldorakEasterEgg(false)}
        />
      )}
    </div>
  );
};

export default TrueHeroesInterface; 