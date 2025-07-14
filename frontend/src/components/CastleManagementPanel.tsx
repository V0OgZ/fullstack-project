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

  // Load castle data
  useEffect(() => {
    const loadCastleData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load player buildings
        const buildingsResponse = await ApiService.getPlayerBuildings(gameId, playerId);
        setBuildings(buildingsResponse || []);

        // Load available units for recruitment
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
          }
        }
        setUnitDetails(unitDetailsMap);

      } catch (err) {
        console.error('Error loading castle data:', err);
        setError('Failed to load castle data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadCastleData();
  }, [gameId, playerId]);

  const handleRecruitUnit = async (unitType: string, buildingId: string, quantity: number = 1) => {
    try {
      const recruitKey = `${unitType}-${buildingId}`;
      setRecruiting(prev => ({ ...prev, [recruitKey]: true }));
      setError(null);

      // Call backend to recruit units
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
      } else {
        setError(response.message || 'Failed to recruit units');
      }
    } catch (err) {
      console.error('Error recruiting units:', err);
      setError('Failed to recruit units. Please try again.');
    } finally {
      setRecruiting(prev => ({ ...prev, [`${unitType}-${buildingId}`]: false }));
    }
  };

  const getUnitIcon = (unitType: string): string => {
    const iconMap: Record<string, string> = {
      'peasant': '🧑‍🌾',
      'archer': '🏹',
      'pikeman': '🛡️',
      'swordsman': '⚔️',
      'cavalry': '🐎',
      'knight': '♞',
      'angel': '👼',
      'skeleton': '💀',
      'zombie': '🧟',
      'vampire': '🧛',
      'lich': '👻',
      'dragon': '🐉',
      'phoenix': '🔥',
      'unicorn': '🦄',
      'griffin': '🦅',
      'hydra': '🐍',
      'minotaur': '🐂',
      'centaur': '🏹',
      'dwarf': '⚒️',
      'elf': '🧝',
      'orc': '👹',
      'goblin': '👺',
      'troll': '🧌',
      'giant': '👥',
      'elemental': '🔥',
      'golem': '🗿',
      'sprite': '🧚',
      'pegasus': '🦄',
      'roc': '🦅',
      'genie': '🧞',
      'efreet': '🔥',
      'naga': '🐍',
      'titan': '⚡',
      'behemoth': '🦏',
      'wyvern': '🐉',
      'manticore': '🦁',
      'medusa': '🐍',
      'basilisk': '🦎',
      'gorgon': '🐂',
      'cyclops': '👁️'
    };
    
    return iconMap[unitType.toLowerCase()] || '⚔️';
  };

  const getBuildingIcon = (buildingType: string): string => {
    const iconMap: Record<string, string> = {
      'castle': '🏰',
      'barracks': '🏚️',
      'archery_range': '🏹',
      'stable': '🐎',
      'workshop': '🔨',
      'mage_tower': '🗼',
      'cathedral': '⛪',
      'graveyard': '⚰️',
      'necropolis': '💀',
      'crypt': '🏚️',
      'bone_yard': '☠️',
      'mausoleum': '⚱️',
      'library': '📚',
      'laboratory': '🧪',
      'altar': '🛐',
      'temple': '🕌',
      'shrine': '⛩️',
      'monastery': '🏛️',
      'citadel': '🏰',
      'fort': '🏰',
      'keep': '🏰',
      'tower': '🗼',
      'wall': '🧱',
      'gate': '🚪',
      'moat': '🌊',
      'bridge': '🌉',
      'mine': '⛏️',
      'sawmill': '🪚',
      'quarry': '🪨',
      'marketplace': '🏪',
      'tavern': '🍺',
      'blacksmith': '🔨',
      'armory': '🛡️',
      'treasury': '💰',
      'bank': '🏦',
      'guild': '🏛️',
      'academy': '🎓',
      'observatory': '🔭',
      'lighthouse': '🗼'
    };
    
    return iconMap[buildingType.toLowerCase()] || '🏢';
  };

  if (loading) {
    return (
      <div className="castle-management-panel">
        <div className="panel-header">
          <h3>🏰 Castle Management</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading castle data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="castle-management-panel">
        <div className="panel-header">
          <h3>🏰 Castle Management</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="error-content">
          <p className="error-message">{error}</p>
          <button 
            className="retry-btn" 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="castle-management-panel">
      <div className="panel-header">
        <h3>🏰 Castle Management</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="castle-content">
        {/* Player Resources */}
        <div className="resources-section">
          <h4>💰 Resources</h4>
          <div className="resources-grid">
            <div className="resource-item">
              <span className="resource-icon">💰</span>
              <span className="resource-amount">{currentPlayer?.resources?.gold || 0}</span>
            </div>
            <div className="resource-item">
              <span className="resource-icon">🪵</span>
              <span className="resource-amount">{currentPlayer?.resources?.wood || 0}</span>
            </div>
            <div className="resource-item">
              <span className="resource-icon">🪨</span>
              <span className="resource-amount">{currentPlayer?.resources?.stone || 0}</span>
            </div>
          </div>
        </div>

        {/* Buildings */}
        <div className="buildings-section">
          <h4>🏗️ Buildings ({buildings.length})</h4>
          <div className="buildings-grid">
            {buildings.map(building => (
              <div key={building.buildingId} className="building-card">
                <div className="building-header">
                  <span className="building-icon">{getBuildingIcon(building.type)}</span>
                  <span className="building-name">{building.name}</span>
                  <span className="building-level">Lvl {building.level}</span>
                </div>
                <div className="building-info">
                  <div className="building-status">
                    {building.isConstructed ? (
                      <span className="status-built">✅ Built</span>
                    ) : (
                      <span className="status-building">🔧 Building...</span>
                    )}
                  </div>
                  {building.recruitableUnits && building.recruitableUnits.length > 0 && (
                    <div className="building-units">
                      <div className="units-available">
                        Available: {building.currentUnitsAvailable}/{building.maxUnitsAvailable}
                      </div>
                      <div className="recruitable-units">
                        {building.recruitableUnits.map(unitType => (
                          <span key={unitType} className="unit-type">
                            {getUnitIcon(unitType)} {unitType}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unit Recruitment */}
        <div className="recruitment-section">
          <h4>⚔️ Unit Recruitment</h4>
          <div className="units-grid">
            {Object.entries(availableUnits).map(([unitType, available]) => {
              const unit = unitDetails[unitType];
              const recruitableBuildings = buildings.filter(b => 
                b.recruitableUnits?.includes(unitType) && b.isConstructed
              );
              
              if (available === 0 || recruitableBuildings.length === 0) {
                return null;
              }

              return (
                <div key={unitType} className="unit-card">
                  <div className="unit-header">
                    <span className="unit-icon">{getUnitIcon(unitType)}</span>
                    <span className="unit-name">{unit?.name || unitType}</span>
                    <span className="unit-available">×{available}</span>
                  </div>
                  
                  {unit && (
                    <div className="unit-stats">
                      <div className="stat-row">
                        <span>⚔️ {unit.attack}</span>
                        <span>🛡️ {unit.defense}</span>
                        <span>❤️ {unit.health}</span>
                      </div>
                      <div className="stat-row">
                        <span>💥 {unit.minDamage}-{unit.maxDamage}</span>
                        <span>🏃 {unit.speed}</span>
                        <span>⭐ {unit.aiValue}</span>
                      </div>
                      <div className="unit-cost">
                        <span className="cost-gold">💰 {unit.goldCost}</span>
                        <span className="cost-growth">📈 {unit.growth}/week</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="recruitment-actions">
                    {recruitableBuildings.map(building => (
                      <button
                        key={building.buildingId}
                        className="recruit-btn"
                        onClick={() => handleRecruitUnit(unitType, building.buildingId, 1)}
                        disabled={
                          recruiting[`${unitType}-${building.buildingId}`] || 
                          available === 0 ||
                          (currentPlayer?.resources?.gold || 0) < (unit?.goldCost || 0)
                        }
                      >
                        {recruiting[`${unitType}-${building.buildingId}`] ? (
                          '🔄 Recruiting...'
                        ) : (
                          `Recruit from ${building.name}`
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          
          {Object.keys(availableUnits).length === 0 && (
            <div className="no-units">
              <p>No units available for recruitment.</p>
              <p>Build more structures to recruit units!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CastleManagementPanel; 