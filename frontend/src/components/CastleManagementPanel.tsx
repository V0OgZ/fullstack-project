import React, { useState, useEffect } from 'react';
import { ApiService } from '../services/api';
import { useTranslation } from '../i18n';

interface Building {
  id: string;
  buildingId: string;
  buildingType: string;
  buildingName: string;
  level: number;
  isConstructed: boolean;
  constructionStartTime: string;
  constructionDuration: number;
  upgradeCost: number;
  goldCost: number;
  woodCost: number;
  stoneCost: number;
  recruitableUnits: string[];
  currentUnitsAvailable: number;
  weeklyGrowth: number;
  dailyGoldBonus: number;
  dailyResourceBonus: number;
  availableSpells: string[];
}

interface CastleManagementPanelProps {
  castleId: string;
  playerId: string;
  gameId: string;
  playerResources: {
    gold: number;
    wood: number;
    stone: number;
    mana: number;
  };
  onResourceChange?: (resources: any) => void;
}

const CastleManagementPanel: React.FC<CastleManagementPanelProps> = ({
  castleId,
  playerId,
  gameId,
  playerResources,
  onResourceChange
}) => {
  const { t } = useTranslation();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [availableUnits, setAvailableUnits] = useState<{[key: string]: number}>({});
  const [castleBonuses, setCastleBonuses] = useState<{[key: string]: number}>({});

  // Load castle buildings
  useEffect(() => {
    const loadCastleData = async () => {
      setLoading(true);
      try {
        const [buildingsData, unitsData, bonusesData] = await Promise.all([
          ApiService.getBuildingsByCastle(castleId),
          ApiService.getAvailableUnitsForRecruitment(castleId),
          ApiService.getCastleBonuses(castleId)
        ]);

        setBuildings(buildingsData);
        setAvailableUnits(unitsData);
        setCastleBonuses(bonusesData);
        setError(null);
      } catch (err) {
        setError('Failed to load castle data');
        console.error('Error loading castle data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (castleId) {
      loadCastleData();
    }
  }, [castleId]);

  // Check for completed construction every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await ApiService.checkAndCompleteReadyBuildings(gameId);
        // Reload buildings to get updated status
        const buildingsData = await ApiService.getBuildingsByCastle(castleId);
        setBuildings(buildingsData);
      } catch (err) {
        console.error('Error checking construction:', err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [gameId, castleId]);

  const handleStartConstruction = async (buildingType: string) => {
    try {
      const result = await ApiService.startConstructionWithResources({
        gameId,
        playerId,
        castleId,
        buildingType
      });

      if (result.success) {
        // Update buildings list
        const buildingsData = await ApiService.getBuildingsByCastle(castleId);
        setBuildings(buildingsData);
        
        // Update player resources
        if (onResourceChange && result.updatedResources) {
          onResourceChange(result.updatedResources);
        }
      } else {
        setError(result.message || 'Failed to start construction');
      }
    } catch (err) {
      setError('Failed to start construction');
      console.error('Error starting construction:', err);
    }
  };

  const handleUpgradeBuilding = async (buildingId: string) => {
    try {
      const result = await ApiService.upgradeBuilding(buildingId, {
        playerId,
        gameId
      });

      if (result.success) {
        // Update buildings list
        const buildingsData = await ApiService.getBuildingsByCastle(castleId);
        setBuildings(buildingsData);
        
        // Update player resources
        if (onResourceChange && result.updatedResources) {
          onResourceChange(result.updatedResources);
        }
      } else {
        setError(result.message || 'Failed to upgrade building');
      }
    } catch (err) {
      setError('Failed to upgrade building');
      console.error('Error upgrading building:', err);
    }
  };

  const handleRecruitUnits = async (buildingId: string, unitType: string, quantity: number) => {
    try {
      const result = await ApiService.recruitUnits(buildingId, {
        playerId,
        gameId,
        unitType,
        quantity
      });

      if (result.success) {
        // Update available units
        const unitsData = await ApiService.getAvailableUnitsForRecruitment(castleId);
        setAvailableUnits(unitsData);
        
        // Update player resources
        if (onResourceChange && result.updatedResources) {
          onResourceChange(result.updatedResources);
        }
      } else {
        setError(result.message || 'Failed to recruit units');
      }
    } catch (err) {
      setError('Failed to recruit units');
      console.error('Error recruiting units:', err);
    }
  };

  const getBuildingStatusText = (building: Building) => {
    if (building.isConstructed) {
      return `Level ${building.level} - Constructed`;
    } else {
      const constructionTime = new Date(building.constructionStartTime).getTime();
      const now = Date.now();
      const elapsed = now - constructionTime;
      const remaining = Math.max(0, building.constructionDuration - elapsed);
      
      if (remaining <= 0) {
        return 'Ready to Complete';
      } else {
        const minutes = Math.ceil(remaining / (1000 * 60));
        return `Under Construction (${minutes}m remaining)`;
      }
    }
  };

  const canAffordBuilding = (building: Building) => {
    return playerResources.gold >= building.goldCost &&
           playerResources.wood >= building.woodCost &&
           playerResources.stone >= building.stoneCost;
  };

  const getAvailableBuildingTypes = () => {
    const existingTypes = buildings.map(b => b.buildingType);
    const allTypes = [
      'town_hall', 'barracks', 'archery_range', 'stable', 'workshop',
      'mage_tower', 'tavern', 'market', 'castle_gate', 'moat',
      'walls', 'citadel', 'resource_silo', 'brotherhood_of_sword'
    ];
    return allTypes.filter(type => !existingTypes.includes(type));
  };

  if (loading) {
    return (
      <div className="castle-management-panel">
        <div className="loading-message">
          <div className="loading-spinner"></div>
          <p>{t('loading')}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="castle-management-panel">
      <div className="panel-header">
        <h3>🏰 Castle Management</h3>
        {error && <div className="error-message">{error}</div>}
      </div>

      {/* Castle Bonuses */}
      <div className="castle-bonuses">
        <h4>Castle Bonuses</h4>
        <div className="bonuses-grid">
          <div className="bonus-item">
            <span>💰 Daily Gold:</span>
            <span>+{castleBonuses.dailyGold || 0}</span>
          </div>
          <div className="bonus-item">
            <span>🛡️ Defense:</span>
            <span>+{castleBonuses.defense || 0}</span>
          </div>
          <div className="bonus-item">
            <span>⚡ Spell Power:</span>
            <span>+{castleBonuses.spellPower || 0}</span>
          </div>
        </div>
      </div>

      {/* Existing Buildings */}
      <div className="existing-buildings">
        <h4>Existing Buildings</h4>
        <div className="buildings-grid">
          {buildings.map(building => (
            <div key={building.id} className="building-card">
              <div className="building-header">
                <h5>{building.buildingName}</h5>
                <span className={`building-status ${building.isConstructed ? 'constructed' : 'under-construction'}`}>
                  {getBuildingStatusText(building)}
                </span>
              </div>
              
              <div className="building-details">
                <div className="building-info">
                  <p>Type: {building.buildingType}</p>
                  {building.isConstructed && (
                    <>
                      <p>Level: {building.level}</p>
                      {building.dailyGoldBonus > 0 && (
                        <p>Daily Gold: +{building.dailyGoldBonus}</p>
                      )}
                      {building.recruitableUnits.length > 0 && (
                        <p>Recruits: {building.recruitableUnits.join(', ')}</p>
                      )}
                    </>
                  )}
                </div>
                
                <div className="building-actions">
                  {building.isConstructed ? (
                    <>
                      <button 
                        className="upgrade-btn"
                        onClick={() => handleUpgradeBuilding(building.id)}
                        disabled={!canAffordBuilding(building)}
                      >
                        Upgrade (Level {building.level + 1})
                      </button>
                      
                      {building.recruitableUnits.length > 0 && (
                        <div className="recruitment-section">
                          <h6>Recruit Units</h6>
                          {building.recruitableUnits.map(unitType => (
                            <div key={unitType} className="unit-recruitment">
                              <span>{unitType}</span>
                              <span>Available: {availableUnits[unitType] || 0}</span>
                              <button
                                className="recruit-btn"
                                onClick={() => handleRecruitUnits(building.id, unitType, 1)}
                                disabled={(availableUnits[unitType] || 0) === 0}
                              >
                                Recruit 1
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <button 
                      className="complete-btn"
                      onClick={() => ApiService.completeConstruction(building.id)}
                    >
                      Complete Construction
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Buildings to Construct */}
      <div className="available-buildings">
        <h4>Available Buildings</h4>
        <div className="buildings-grid">
          {getAvailableBuildingTypes().map(buildingType => (
            <div key={buildingType} className="building-card available">
              <div className="building-header">
                <h5>{buildingType.replace('_', ' ').toUpperCase()}</h5>
                <span className="building-status available">Available</span>
              </div>
              
              <div className="building-details">
                <div className="building-cost">
                  <p>Cost: 💰{1000} 🪵{500} 🪨{300}</p>
                </div>
                
                <div className="building-actions">
                  <button 
                    className="construct-btn"
                    onClick={() => handleStartConstruction(buildingType)}
                    disabled={playerResources.gold < 1000 || playerResources.wood < 500 || playerResources.stone < 300}
                  >
                    Start Construction
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Player Resources */}
      <div className="player-resources">
        <h4>Resources</h4>
        <div className="resources-grid">
          <div className="resource-item">
            <span>💰 Gold:</span>
            <span>{playerResources.gold}</span>
          </div>
          <div className="resource-item">
            <span>🪵 Wood:</span>
            <span>{playerResources.wood}</span>
          </div>
          <div className="resource-item">
            <span>🪨 Stone:</span>
            <span>{playerResources.stone}</span>
          </div>
          <div className="resource-item">
            <span>🔮 Mana:</span>
            <span>{playerResources.mana}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastleManagementPanel; 