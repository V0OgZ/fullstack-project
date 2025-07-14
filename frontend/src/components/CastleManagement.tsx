import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import { CASTLE_TYPES, BUILDING_TYPES, Building } from '../types/castle';
import './CastleManagement.css';

interface CastleManagementProps {
  castleId: string;
  isVisible: boolean;
  onClose: () => void;
}

interface CastleData {
  id: string;
  name: string;
  type: string;
  level: number;
  buildings: { [buildingId: string]: number };
  resources: {
    gold: number;
    wood: number;
    stone: number;
    mana: number;
  };
  garrison: any[];
  dailyIncome: {
    gold: number;
    wood: number;
    stone: number;
    mana: number;
  };
}

const CastleManagement: React.FC<CastleManagementProps> = ({ castleId, isVisible, onClose }) => {
  const { t } = useTranslation();
  const { currentPlayer } = useGameStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'buildings' | 'recruitment' | 'upgrades'>('overview');
  const [castle, setCastle] = useState<CastleData | null>(null);

  useEffect(() => {
    // Mock castle data - in real app, this would come from the backend
    if (castleId && currentPlayer) {
      const mockCastle: CastleData = {
        id: castleId,
        name: 'Castle Stormwind',
        type: 'castle',
        level: 3,
        buildings: {
          'town_hall': 2,
          'barracks': 1,
          'archery_range': 1,
          'griffin_tower': 1,
          'marketplace': 1,
          'tavern': 1
        },
        resources: currentPlayer.resources,
        garrison: [],
        dailyIncome: {
          gold: 2000,
          wood: 10,
          stone: 5,
          mana: 2
        }
      };
      setCastle(mockCastle);
    }
  }, [castleId, currentPlayer]);

  const availableBuildings = BUILDING_TYPES.filter(building => {
    if (!castle) return false;
    
    // Filter by castle type
    if (building.castle !== castle.type) return false;
    
    // Check if building is already at max level
    const currentLevel = castle.buildings[building.id] || 0;
    if (currentLevel >= building.maxLevel) return false;
    
    // Check prerequisites
    return building.prerequisites.every(prereq => 
      castle.buildings[prereq] && castle.buildings[prereq] > 0
    );
  });

  const handleBuildingConstruct = async (building: Building) => {
    if (!castle || !currentPlayer) return;
    
    const cost = building.cost;
    const canAfford = 
      currentPlayer.resources.gold >= (cost.gold || 0) &&
      (currentPlayer.resources.wood || 0) >= (cost.wood || 0) &&
      (currentPlayer.resources.stone || 0) >= (cost.stone || 0);
    
    if (canAfford) {
      try {
        // Call backend API for construction
        const response = await fetch('/api/games/demo-game/buildings/construct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            playerId: currentPlayer.id,
            castleId: castle.id,
            buildingType: building.id,
            positionX: Math.floor(Math.random() * 10) + 1, // Random position for demo
            positionY: Math.floor(Math.random() * 10) + 1,
          }),
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('Construction started:', result);
          
          // Update local state for immediate feedback
          setCastle(prev => prev ? {
            ...prev,
            buildings: {
              ...prev.buildings,
              [building.id]: (prev.buildings[building.id] || 0) + 1
            }
          } : null);
        } else {
          const error = await response.json();
          console.error('Construction failed:', error.message);
        }
      } catch (error) {
        console.error('Error constructing building:', error);
      }
    }
  };

  const handleBuildingUpgrade = async (building: Building) => {
    if (!castle) return;
    
    const currentLevel = castle.buildings[building.id] || 0;
    
    try {
      // Call backend API for upgrade
      const response = await fetch(`/api/games/demo-game/buildings/${building.id}/upgrade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerId: currentPlayer?.id,
          targetLevel: currentLevel + 1,
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Upgrade started:', result);
        
        // Update local state for immediate feedback
        setCastle(prev => prev ? {
          ...prev,
          buildings: {
            ...prev.buildings,
            [building.id]: currentLevel + 1
          }
        } : null);
      } else {
        const error = await response.json();
        console.error('Upgrade failed:', error.message);
      }
    } catch (error) {
      console.error('Error upgrading building:', error);
    }
  };

  if (!isVisible || !castle) return null;

  const castleType = CASTLE_TYPES[castle.type as keyof typeof CASTLE_TYPES];

  return (
    <div className="castle-management-overlay">
      <div className="castle-management-modal">
        <div className="castle-header">
          <div className="castle-title">
            <h2>{castle.name}</h2>
            <div className="castle-type">
              <span className="castle-icon">🏰</span>
              <span>{castleType?.name || 'Unknown'}</span>
              <span className="castle-level">Level {castle.level}</span>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="castle-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="tab-icon">🏰</span>
            {t('overview')}
          </button>
          <button 
            className={`tab-button ${activeTab === 'buildings' ? 'active' : ''}`}
            onClick={() => setActiveTab('buildings')}
          >
            <span className="tab-icon">🏗️</span>
            {t('buildings')}
          </button>
          <button 
            className={`tab-button ${activeTab === 'recruitment' ? 'active' : ''}`}
            onClick={() => setActiveTab('recruitment')}
          >
            <span className="tab-icon">⚔️</span>
            {t('recruitment')}
          </button>
          <button 
            className={`tab-button ${activeTab === 'upgrades' ? 'active' : ''}`}
            onClick={() => setActiveTab('upgrades')}
          >
            <span className="tab-icon">⬆️</span>
            {t('upgrades')}
          </button>
        </div>

        <div className="castle-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="castle-stats">
                <div className="stat-card">
                  <h3>{t('dailyIncome')}</h3>
                  <div className="income-grid">
                    <div className="income-item">
                      <span className="income-icon">💰</span>
                      <span className="income-value">+{castle.dailyIncome.gold}</span>
                    </div>
                    <div className="income-item">
                      <span className="income-icon">🪵</span>
                      <span className="income-value">+{castle.dailyIncome.wood}</span>
                    </div>
                    <div className="income-item">
                      <span className="income-icon">🪨</span>
                      <span className="income-value">+{castle.dailyIncome.stone}</span>
                    </div>
                    <div className="income-item">
                      <span className="income-icon">🔮</span>
                      <span className="income-value">+{castle.dailyIncome.mana}</span>
                    </div>
                  </div>
                </div>

                <div className="stat-card">
                  <h3>{t('castleSpecialty')}</h3>
                  <p>{castleType?.specialty || 'Unknown specialty'}</p>
                  <div className="specialty-bonuses">
                    <div className="bonus-item">
                      <span className="bonus-icon">⚔️</span>
                      <span>+10% {t('attack')}</span>
                    </div>
                    <div className="bonus-item">
                      <span className="bonus-icon">🛡️</span>
                      <span>+5% {t('defense')}</span>
                    </div>
                  </div>
                </div>

                <div className="stat-card">
                  <h3>{t('garrison')}</h3>
                  <div className="garrison-slots">
                    {[...Array(7)].map((_, index) => (
                      <div key={index} className="garrison-slot">
                        <div className="unit-icon">🛡️</div>
                        <div className="unit-count">0</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'buildings' && (
            <div className="buildings-tab">
              <div className="buildings-grid">
                <div className="current-buildings">
                  <h3>{t('currentBuildings')}</h3>
                  <div className="building-list">
                    {Object.entries(castle.buildings).map(([buildingId, level]) => {
                      const building = BUILDING_TYPES.find(b => b.id === buildingId);
                      if (!building) return null;
                      
                      return (
                        <div key={buildingId} className="building-item">
                          <div className="building-info">
                            <div className="building-icon">🏗️</div>
                            <div className="building-details">
                              <div className="building-name">{building.name}</div>
                              <div className="building-level">Level {level}</div>
                            </div>
                          </div>
                          <div className="building-actions">
                            {level < building.maxLevel && (
                              <button 
                                className="upgrade-button"
                                onClick={() => handleBuildingUpgrade(building)}
                              >
                                {t('upgrade')}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="available-buildings">
                  <h3>{t('availableBuildings')}</h3>
                  <div className="building-list">
                    {availableBuildings.map(building => (
                      <div key={building.id} className="building-item constructable">
                        <div className="building-info">
                          <div className="building-icon">🏗️</div>
                          <div className="building-details">
                            <div className="building-name">{building.name}</div>
                            <div className="building-description">{building.description}</div>
                            <div className="building-cost">
                              {building.cost.gold && (
                                <span className="cost-item">
                                  <span className="cost-icon">💰</span>
                                  <span>{building.cost.gold}</span>
                                </span>
                              )}
                              {building.cost.wood && (
                                <span className="cost-item">
                                  <span className="cost-icon">🪵</span>
                                  <span>{building.cost.wood}</span>
                                </span>
                              )}
                              {building.cost.stone && (
                                <span className="cost-item">
                                  <span className="cost-icon">🪨</span>
                                  <span>{building.cost.stone}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="building-actions">
                          <button 
                            className="construct-button"
                            onClick={() => handleBuildingConstruct(building)}
                          >
                            {t('construct')}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recruitment' && (
            <div className="recruitment-tab">
              <h3>{t('recruitUnits')}</h3>
              <div className="recruitment-grid">
                {[
                  { id: 'pikeman', name: 'Pikeman', cost: 60, available: 14, icon: '🛡️' },
                  { id: 'archer', name: 'Archer', cost: 100, available: 9, icon: '🏹' },
                  { id: 'griffin', name: 'Griffin', cost: 200, available: 5, icon: '🦅' },
                  { id: 'swordsman', name: 'Swordsman', cost: 300, available: 4, icon: '⚔️' }
                ].map(unit => (
                  <div key={unit.id} className="recruitment-card">
                    <div className="unit-icon">{unit.icon}</div>
                    <div className="unit-info">
                      <div className="unit-name">{unit.name}</div>
                      <div className="unit-cost">💰 {unit.cost}</div>
                      <div className="unit-available">{t('available')}: {unit.available}</div>
                    </div>
                    <div className="recruitment-controls">
                      <input 
                        type="number" 
                        min="0" 
                        max={unit.available} 
                        defaultValue="1"
                        className="recruit-input"
                      />
                      <button className="recruit-button">
                        {t('recruit')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'upgrades' && (
            <div className="upgrades-tab">
              <h3>{t('castleUpgrades')}</h3>
              <div className="upgrades-grid">
                <div className="upgrade-card">
                  <div className="upgrade-icon">🏰</div>
                  <div className="upgrade-info">
                    <div className="upgrade-name">{t('castleWalls')}</div>
                    <div className="upgrade-description">{t('improvesCastleDefense')}</div>
                    <div className="upgrade-cost">
                      <span className="cost-item">💰 5000</span>
                      <span className="cost-item">🪨 50</span>
                    </div>
                  </div>
                  <button className="upgrade-button">{t('upgrade')}</button>
                </div>

                <div className="upgrade-card">
                  <div className="upgrade-icon">🔮</div>
                  <div className="upgrade-info">
                    <div className="upgrade-name">{t('magicGuild')}</div>
                    <div className="upgrade-description">{t('unlocksPowerfulSpells')}</div>
                    <div className="upgrade-cost">
                      <span className="cost-item">💰 8000</span>
                      <span className="cost-item">🪵 30</span>
                    </div>
                  </div>
                  <button className="upgrade-button">{t('upgrade')}</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CastleManagement; 