// 🎮 Enhanced Sidebar Panels with Real Assets
// =============================================

import React, { useState, useEffect } from 'react';
import { fetchEpicCreatures, fetchEpicBuildings, EpicCreature, EpicBuilding } from '../services/epicContentAPI';
import { BUILDING_IMAGES } from '../services/buildingImageService';

interface EnhancedHeroPanelProps {
  selectedHero: any;
  heroes: any[];
  onHeroSelect: (hero: any) => void;
  onHeroAction: (action: string) => void;
}

export const EnhancedHeroPanel: React.FC<EnhancedHeroPanelProps> = ({ 
  selectedHero, 
  heroes, 
  onHeroSelect, 
  onHeroAction 
}) => {
  return (
    <div className="enhanced-hero-panel">
      <div className="panel-header">
        <h3>⚔️ Heroes Management</h3>
        <div className="hero-count">{heroes.length}/8</div>
      </div>
      
      <div className="heroes-grid">
        {heroes.map((hero, index) => (
          <div 
            key={hero.id || index}
            className={`hero-card ${selectedHero?.id === hero.id ? 'selected' : ''}`}
            onClick={() => onHeroSelect(hero)}
          >
            <div className="hero-portrait">
              <img 
                src={`/assets/heroes/${hero.name.toLowerCase()}.png`}
                alt={hero.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = 
                    hero.gender === 'female' ? '👸' : '🤴';
                }}
              />
            </div>
            <div className="hero-info">
              <div className="hero-name">{hero.name}</div>
              <div className="hero-level">Lv.{hero.level || 1}</div>
              <div className="hero-class">{hero.class || 'Warrior'}</div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedHero && (
        <div className="hero-details">
          <h4>🎯 Hero Actions</h4>
          <div className="hero-actions">
            <button 
              className="action-btn primary"
              onClick={() => onHeroAction('move')}
            >
              🚶 Move
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => onHeroAction('attack')}
            >
              ⚔️ Attack
            </button>
            <button 
              className="action-btn magic"
              onClick={() => onHeroAction('cast')}
            >
              🔮 Cast Spell
            </button>
            <button 
              className="action-btn utility"
              onClick={() => onHeroAction('collect')}
            >
              💎 Collect
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-row">
              <div className="stat">
                <span className="stat-icon">⚔️</span>
                <span className="stat-value">{selectedHero.attack || 10}</span>
              </div>
              <div className="stat">
                <span className="stat-icon">🛡️</span>
                <span className="stat-value">{selectedHero.defense || 10}</span>
              </div>
              <div className="stat">
                <span className="stat-icon">🔮</span>
                <span className="stat-value">{selectedHero.spellPower || 5}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface EnhancedCastlePanelProps {
  gameId: string;
  playerId: string;
  onAction: (action: string, params?: any) => void;
}

export const EnhancedCastlePanel: React.FC<EnhancedCastlePanelProps> = ({ 
  gameId, 
  playerId, 
  onAction 
}) => {
  const [creatures, setCreatures] = useState<EpicCreature[]>([]);
  const [buildings, setBuildings] = useState<EpicBuilding[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'creatures' | 'buildings'>('overview');

  useEffect(() => {
    const loadCastleData = async () => {
      const [creaturesData, buildingsData] = await Promise.all([
        fetchEpicCreatures(),
        fetchEpicBuildings()
      ]);
      setCreatures(creaturesData.slice(0, 6)); // Limit to 6 for display
      setBuildings(buildingsData.slice(0, 8)); // Limit to 8 for display
    };
    loadCastleData();
  }, []);

  return (
    <div className="enhanced-castle-panel">
      <div className="panel-header">
        <h3>🏰 Castle Management</h3>
        <div className="castle-level">Level 3</div>
      </div>
      
      <div className="castle-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`tab ${activeTab === 'creatures' ? 'active' : ''}`}
          onClick={() => setActiveTab('creatures')}
        >
          🐉 Creatures
        </button>
        <button 
          className={`tab ${activeTab === 'buildings' ? 'active' : ''}`}
          onClick={() => setActiveTab('buildings')}
        >
          🏗️ Buildings
        </button>
      </div>
      
      <div className="castle-content">
        {activeTab === 'overview' && (
          <div className="castle-overview">
            <div className="castle-stats">
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <div className="stat-label">Daily Income</div>
                  <div className="stat-value">2,000 Gold</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⚔️</div>
                <div className="stat-info">
                  <div className="stat-label">Garrison</div>
                  <div className="stat-value">Strong</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🛡️</div>
                <div className="stat-info">
                  <div className="stat-label">Defense</div>
                  <div className="stat-value">85%</div>
                </div>
              </div>
            </div>
            
            <div className="quick-actions">
              <button 
                className="quick-action-btn"
                onClick={() => onAction('resetGrowth')}
              >
                🔄 Reset Growth
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => onAction('viewBonuses')}
              >
                ⭐ View Bonuses
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => onAction('viewSpells')}
              >
                🔮 View Spells
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'creatures' && (
          <div className="creatures-section">
            <div className="creatures-grid">
              {creatures.map((creature) => (
                <div key={creature.id} className="creature-card">
                  <div className="creature-image">
                    <img 
                      src={creature.spriteUrl}
                      alt={creature.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = 
                          getCreatureEmoji(creature.name);
                      }}
                    />
                  </div>
                  <div className="creature-info">
                    <div className="creature-name">{creature.name}</div>
                    <div className="creature-tier">Tier {creature.tier}</div>
                    <div className="creature-stats">
                      <span className="stat">❤️ {creature.health}</span>
                      <span className="stat">⚔️ {creature.attack}</span>
                      <span className="stat">🛡️ {creature.defense}</span>
                    </div>
                    <div className="creature-cost">💰 {creature.cost}</div>
                  </div>
                  <button 
                    className="recruit-btn"
                    onClick={() => onAction('recruit', creature)}
                  >
                    Recruit
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'buildings' && (
          <div className="buildings-section">
            <div className="buildings-grid">
              {buildings.map((building) => (
                <div key={building.id} className="building-card">
                  <div className="building-image">
                    <img 
                      src={building.imageUrl}
                      alt={building.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = 
                          getBuildingEmoji(building.type);
                      }}
                    />
                  </div>
                  <div className="building-info">
                    <div className="building-name">{building.name}</div>
                    <div className="building-type">{building.type}</div>
                    <div className="building-race">{building.race}</div>
                    <div className="building-costs">
                      <span className="cost">🪵 {building.cost.wood}</span>
                      <span className="cost">🪨 {building.cost.stone}</span>
                      <span className="cost">💰 {building.cost.gold}</span>
                    </div>
                    <div className="build-time">⏱️ {building.buildTime} turns</div>
                  </div>
                  <button 
                    className="build-btn"
                    onClick={() => onAction('build', building)}
                  >
                    Build
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface EnhancedInventoryPanelProps {
  selectedHero: any;
  onItemUse: (itemId: string) => void;
}

export const EnhancedInventoryPanel: React.FC<EnhancedInventoryPanelProps> = ({ 
  selectedHero, 
  onItemUse 
}) => {
  const magicItems = [
    { id: 'sword_of_might', name: 'Sword of Might', emoji: '⚔️', rarity: 'epic', description: '+5 Attack' },
    { id: 'shield_of_protection', name: 'Shield of Protection', emoji: '🛡️', rarity: 'rare', description: '+3 Defense' },
    { id: 'ring_of_wisdom', name: 'Ring of Wisdom', emoji: '💍', rarity: 'legendary', description: '+10 Spell Power' },
    { id: 'boots_of_speed', name: 'Boots of Speed', emoji: '👢', rarity: 'common', description: '+2 Movement' },
    { id: 'tome_of_knowledge', name: 'Tome of Knowledge', emoji: '📚', rarity: 'rare', description: '+5 Knowledge' },
    { id: 'dragon_gem', name: 'Dragon Gem', emoji: '💎', rarity: 'legendary', description: '+15 All Stats' }
  ];

  return (
    <div className="enhanced-inventory-panel">
      <div className="panel-header">
        <h3>🎒 Inventory</h3>
        <div className="inventory-count">{magicItems.length}/20</div>
      </div>
      
      {selectedHero ? (
        <div className="inventory-content">
          <div className="hero-equipment">
            <h4>👑 {selectedHero.name}'s Equipment</h4>
            <div className="equipment-slots">
              <div className="equipment-slot weapon">
                <div className="slot-label">Weapon</div>
                <div className="slot-icon">⚔️</div>
              </div>
              <div className="equipment-slot armor">
                <div className="slot-label">Armor</div>
                <div className="slot-icon">🛡️</div>
              </div>
              <div className="equipment-slot accessory">
                <div className="slot-label">Accessory</div>
                <div className="slot-icon">💍</div>
              </div>
            </div>
          </div>
          
          <div className="inventory-items">
            <h4>🎒 Items</h4>
            <div className="items-grid">
              {magicItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`item-card ${item.rarity}`}
                  onClick={() => onItemUse(item.id)}
                >
                  <div className="item-image">
                    <img 
                      src={`/assets/objects/${item.id}.png`}
                      alt={item.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = item.emoji;
                      }}
                    />
                  </div>
                  <div className="item-info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-description">{item.description}</div>
                    <div className={`item-rarity ${item.rarity}`}>
                      {item.rarity.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-hero-selected">
          <p>Select a hero to view inventory</p>
        </div>
      )}
    </div>
  );
};

// Helper functions
function getCreatureEmoji(name: string): string {
  if (name.toLowerCase().includes('dragon')) return '🐉';
  if (name.toLowerCase().includes('knight')) return '⚔️';
  if (name.toLowerCase().includes('griffin')) return '🦅';
  if (name.toLowerCase().includes('wizard')) return '🧙‍♂️';
  if (name.toLowerCase().includes('orc')) return '👹';
  if (name.toLowerCase().includes('skeleton')) return '💀';
  return '🎮';
}

function getBuildingEmoji(type: string): string {
  if (type.toLowerCase().includes('castle')) return '🏰';
  if (type.toLowerCase().includes('military')) return '⚔️';
  if (type.toLowerCase().includes('magic')) return '🔮';
  if (type.toLowerCase().includes('production')) return '🔨';
  return '🏘️';
} 