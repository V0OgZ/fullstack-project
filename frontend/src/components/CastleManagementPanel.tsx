import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import { ApiService } from '../services/api';
import './CastleManagementPanel.css';

interface CastleManagementPanelProps {
  gameId: string;
  playerId: string;
  onClose: () => void;
}

interface Unit {
  id: string;
  name: string;
  castle: string;
  tier: number;
  attack: number;
  defense: number;
  health: number;
  minDamage: number;
  maxDamage: number;
  speed: number;
  goldCost: number;
  growth: number;
  aiValue: number;
}

interface Building {
  id: string;
  buildingId: string;
  name: string;
  type: string;
  level: number;
  castleId: string;
  playerId: string;
  gameId: string;
  constructionTime: number;
  currentUnitsAvailable: number;
  maxUnitsAvailable: number;
  recruitableUnits: string[];
  goldCost: number;
  isConstructed: boolean;
}

const CastleManagementPanel: React.FC<CastleManagementPanelProps> = ({ gameId, playerId, onClose }) => {
  const { t } = useTranslation();
  const { currentPlayer, refreshGameState } = useGameStore();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [availableUnits, setAvailableUnits] = useState<Record<string, number>>({});
  const [unitDetails, setUnitDetails] = useState<Record<string, Unit>>({});
  const [loading, setLoading] = useState(true);
  const [recruiting, setRecruiting] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'buildings' | 'recruit'>('overview');
  const [useRealApi, setUseRealApi] = useState(true);

  // Load real data from backend APIs
  useEffect(() => {
    const loadRealData = async () => {
      if (!useRealApi) {
        loadMockData();
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Load player buildings using existing API
        const buildingsResponse = await ApiService.getPlayerBuildings(gameId, playerId);
        setBuildings(buildingsResponse || []);

        // Load available units using existing API
        const unitsResponse = await ApiService.getAvailableUnits(gameId, playerId);
        setAvailableUnits(unitsResponse || {});

        // Load unit details for all available units
        const unitDetailsMap: Record<string, Unit> = {};
        for (const unitType of Object.keys(unitsResponse || {})) {
          try {
            const unitDetail = await ApiService.getUnitDetails(unitType);
            if (unitDetail) {
              unitDetailsMap[unitType] = unitDetail;
            }
          } catch (err) {
            console.warn(`Failed to load details for unit ${unitType}:`, err);
            // Fallback to mock data for this unit
            unitDetailsMap[unitType] = getMockUnitDetails(unitType);
          }
        }
        setUnitDetails(unitDetailsMap);

        console.log('✅ Loaded real castle data from API');
      } catch (err) {
        console.error('❌ Error loading real castle data:', err);
        setError('Failed to load castle data from API. Using mock data as fallback.');
        setUseRealApi(false);
        loadMockData();
      } finally {
        setLoading(false);
      }
    };

    const loadMockData = () => {
      // Fallback mock data when API is unavailable
      const mockBuildings: Building[] = [
        {
          id: '1',
          buildingId: 'castle-1',
          name: 'Castle',
          type: 'castle',
          level: 1,
          castleId: 'castle-1',
          playerId: playerId,
          gameId: gameId,
          constructionTime: 0,
          currentUnitsAvailable: 14,
          maxUnitsAvailable: 14,
          recruitableUnits: ['peasant', 'archer'],
          goldCost: 0,
          isConstructed: true
        },
        {
          id: '2',
          buildingId: 'barracks-1',
          name: 'Barracks',
          type: 'barracks',
          level: 1,
          castleId: 'castle-1',
          playerId: playerId,
          gameId: gameId,
          constructionTime: 0,
          currentUnitsAvailable: 8,
          maxUnitsAvailable: 8,
          recruitableUnits: ['swordsman', 'pikeman'],
          goldCost: 1000,
          isConstructed: true
        }
      ];

      const mockAvailableUnits: Record<string, number> = {
        'peasant': 14,
        'archer': 9,
        'swordsman': 4,
        'pikeman': 6
      };

      const mockUnitDetails: Record<string, Unit> = {
        'peasant': getMockUnitDetails('peasant'),
        'archer': getMockUnitDetails('archer'),
        'swordsman': getMockUnitDetails('swordsman'),
        'pikeman': getMockUnitDetails('pikeman')
      };

      setBuildings(mockBuildings);
      setAvailableUnits(mockAvailableUnits);
      setUnitDetails(mockUnitDetails);
      setLoading(false);
    };

    loadRealData();
  }, [gameId, playerId, useRealApi]);

  const getMockUnitDetails = (unitType: string): Unit => {
    const mockUnits: Record<string, Unit> = {
      'peasant': {
        id: 'peasant',
        name: 'Peasant',
        castle: 'castle',
        tier: 1,
        attack: 1,
        defense: 1,
        health: 5,
        minDamage: 1,
        maxDamage: 1,
        speed: 3,
        goldCost: 60,
        growth: 14,
        aiValue: 15
      },
      'archer': {
        id: 'archer',
        name: 'Archer',
        castle: 'castle',
        tier: 2,
        attack: 6,
        defense: 3,
        health: 10,
        minDamage: 2,
        maxDamage: 6,
        speed: 4,
        goldCost: 150,
        growth: 9,
        aiValue: 126
      },
      'swordsman': {
        id: 'swordsman',
        name: 'Swordsman',
        castle: 'castle',
        tier: 3,
        attack: 10,
        defense: 12,
        health: 35,
        minDamage: 6,
        maxDamage: 9,
        speed: 5,
        goldCost: 300,
        growth: 4,
        aiValue: 445
      },
      'pikeman': {
        id: 'pikeman',
        name: 'Pikeman',
        castle: 'castle',
        tier: 2,
        attack: 5,
        defense: 9,
        health: 15,
        minDamage: 3,
        maxDamage: 4,
        speed: 4,
        goldCost: 100,
        growth: 6,
        aiValue: 115
      }
    };

    return mockUnits[unitType] || mockUnits['peasant'];
  };

  const handleRecruitUnit = async (unitType: string, buildingId: string, quantity: number = 1) => {
    try {
      const recruitKey = `${unitType}-${buildingId}`;
      setRecruiting(prev => ({ ...prev, [recruitKey]: true }));
      setError(null);

      if (useRealApi) {
        // Try real API first
        const response = await ApiService.recruitUnitsFromGame(gameId, buildingId, {
          playerId,
          unitType,
          quantity
        });

        if (response.success) {
          // Refresh game state to update resources and hero armies
          await refreshGameState();
          
          // Reload castle data to update available units
          const unitsResponse = await ApiService.getAvailableUnits(gameId, playerId);
          setAvailableUnits(unitsResponse || {});
          
          const buildingsResponse = await ApiService.getPlayerBuildings(gameId, playerId);
          setBuildings(buildingsResponse || []);
          
          console.log(`✅ Successfully recruited ${quantity} ${unitType} from ${buildingId}`);
        } else {
          setError(response.message || 'Failed to recruit units');
        }
      } else {
        // Fallback to mock recruitment
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update available units
        setAvailableUnits(prev => ({
          ...prev,
          [unitType]: Math.max(0, (prev[unitType] || 0) - quantity)
        }));

        console.log(`✅ Mock recruitment: ${quantity} ${unitType} from ${buildingId}`);
      }

    } catch (err) {
      console.error('❌ Error recruiting units:', err);
      setError('Failed to recruit units. Please try again.');
    } finally {
      setRecruiting(prev => ({ ...prev, [`${unitType}-${buildingId}`]: false }));
    }
  };

  const getUnitIcon = (unitType: string): string => {
    const iconMap: Record<string, string> = {
      'peasant': '👨‍🌾',
      'archer': '🏹',
      'pikeman': '🛡️',
      'swordsman': '⚔️',
      'cavalry': '🐎',
      'knight': '♞',
      'dragon': '🐉',
      'griffin': '🦅',
      'angel': '👼'
    };
    return iconMap[unitType.toLowerCase()] || '⚔️';
  };

  const getBuildingIcon = (buildingType: string): string => {
    const iconMap: Record<string, string> = {
      'castle': '🏰',
      'barracks': '⚔️',
      'archery_range': '🏹',
      'stable': '🐎',
      'mage_tower': '🗼',
      'cathedral': '⛪',
      'marketplace': '🏪',
      'tavern': '🍺'
    };
    return iconMap[buildingType.toLowerCase()] || '🏢';
  };

  const getDailyIncomeFromBuildings = () => {
    // Calculate income based on actual buildings
    return buildings.reduce((income, building) => {
      const baseIncome = building.isConstructed ? building.level * 100 : 0;
      return {
        gold: income.gold + baseIncome,
        wood: income.wood + (building.type === 'sawmill' ? building.level * 2 : 0),
        stone: income.stone + (building.type === 'quarry' ? building.level * 1 : 0)
      };
    }, { gold: 500, wood: 2, stone: 1 });
  };

  if (loading) {
    return (
      <div className="castle-panel">
        <div className="panel-header">
          <h3>🏰 Castle Management</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="castle-content">
          <div className="loading-message">
            <div className="loading-spinner"></div>
            <p>Loading castle data...</p>
          </div>
        </div>
      </div>
    );
  }

  const dailyIncome = getDailyIncomeFromBuildings();

  return (
    <div className="castle-panel">
      <div className="panel-header">
        <h3>🏰 Castle Management</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      {!useRealApi && (
        <div className="api-status">
          <span className="status-warning">⚠️ Using mock data (API unavailable)</span>
        </div>
      )}

      <div className="castle-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'buildings' ? 'active' : ''}`}
          onClick={() => setActiveTab('buildings')}
        >
          🏗️ Buildings
        </button>
        <button 
          className={`tab-btn ${activeTab === 'recruit' ? 'active' : ''}`}
          onClick={() => setActiveTab('recruit')}
        >
          ⚔️ Recruit
        </button>
      </div>

      <div className="castle-content">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="resources-overview">
              <h4>💰 Resources</h4>
              <div className="resource-list">
                <div className="resource-item">
                  <span>💰 {currentPlayer?.resources?.gold || 0}</span>
                </div>
                <div className="resource-item">
                  <span>🪵 {currentPlayer?.resources?.wood || 0}</span>
                </div>
                <div className="resource-item">
                  <span>🪨 {currentPlayer?.resources?.stone || 0}</span>
                </div>
              </div>
            </div>

            <div className="daily-income">
              <h4>📈 Daily Income</h4>
              <div className="income-list">
                <div className="income-item">💰 +{dailyIncome.gold}</div>
                <div className="income-item">🪵 +{dailyIncome.wood}</div>
                <div className="income-item">🪨 +{dailyIncome.stone}</div>
              </div>
            </div>

            <div className="garrison-overview">
              <h4>🛡️ Garrison</h4>
              <div className="garrison-slots">
                <div className="garrison-slot">👨‍🌾 25</div>
                <div className="garrison-slot">🏹 12</div>
                <div className="garrison-slot">⚔️ 8</div>
                <div className="garrison-slot empty">Empty</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'buildings' && (
          <div className="buildings-content">
            <h4>🏗️ Buildings ({buildings.length})</h4>
            <div className="building-list">
              {buildings.map(building => (
                <div key={building.buildingId} className="building-item">
                  <div className="building-info">
                    <span className="building-icon">{getBuildingIcon(building.type)}</span>
                    <div className="building-details">
                      <div className="building-name">{building.name}</div>
                      <div className="building-status">
                        {building.isConstructed ? '✅ Built' : '🔧 Building...'}
                      </div>
                    </div>
                  </div>
                  <div className="building-level">Lv.{building.level}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recruit' && (
          <div className="recruit-content">
            <h4>⚔️ Available Units</h4>
            <div className="unit-list">
              {Object.entries(availableUnits).map(([unitType, available]) => {
                const unit = unitDetails[unitType];
                const building = buildings.find(b => 
                  b.recruitableUnits?.includes(unitType) && b.isConstructed
                );
                
                if (available === 0 || !building) {
                  return null;
                }

                return (
                  <div key={unitType} className="unit-item">
                    <div className="unit-info">
                      <span className="unit-icon">{getUnitIcon(unitType)}</span>
                      <div className="unit-details">
                        <div className="unit-name">{unit?.name || unitType}</div>
                        <div className="unit-stats">
                          ⚔️{unit?.attack} 🛡️{unit?.defense} ❤️{unit?.health}
                        </div>
                        <div className="unit-cost">💰 {unit?.goldCost} | Available: {available}</div>
                      </div>
                    </div>
                    <button
                      className="recruit-btn"
                      onClick={() => handleRecruitUnit(unitType, building.buildingId, 1)}
                      disabled={
                        recruiting[`${unitType}-${building.buildingId}`] || 
                        available === 0 ||
                        (currentPlayer?.resources?.gold || 0) < (unit?.goldCost || 0)
                      }
                    >
                      {recruiting[`${unitType}-${building.buildingId}`] ? '🔄' : 'Recruit'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CastleManagementPanel; 