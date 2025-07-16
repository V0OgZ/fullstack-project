import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';
import { ApiService } from '../services/api';
import { useGameStore } from '../store/useGameStore';
import './UnitRecruitment.css';

interface Unit {
  id: string;
  name: string;
  castle: string;
  tier: number;
  variant: string;
  attack: number;
  defense: number;
  health: number;
  minDamage: number;
  maxDamage: number;
  speed: number;
  shots?: number;
  goldCost: number;
  woodCost?: number;
  stoneCost?: number;
  oreCost?: number;
  crystalCost?: number;
  gemsCost?: number;
  sulfurCost?: number;
  growth: number;
  aiValue: number;
  abilities: string[];
  availableQuantity?: number;
}

interface Building {
  buildingId: string;
  buildingType: string;
  level: number;
  recruitableUnits: string[];
  currentUnitsAvailable: number;
  weeklyGrowth: number;
}

interface UnitRecruitmentProps {
  isVisible: boolean;
  onClose: () => void;
  selectedBuilding?: Building;
}

const UnitRecruitment: React.FC<UnitRecruitmentProps> = ({ 
  isVisible, 
  onClose, 
  selectedBuilding 
}) => {
  const { t } = useTranslation();
  const { currentGame, currentPlayer } = useGameStore();
  const [availableUnits, setAvailableUnits] = useState<Unit[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<{ [unitId: string]: number }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isVisible && currentGame && currentPlayer) {
      loadAvailableUnits();
    }
  }, [isVisible, currentGame, currentPlayer]);

  const loadAvailableUnits = async () => {
    if (!currentGame || !currentPlayer) return;

    setLoading(true);
    setError(null);

    try {
      // Mock data for now - replace with actual API call when backend is ready
      const mockUnits = [
        {
          id: 'peasant',
          name: 'Peasant',
          castle: 'castle',
          tier: 1,
          variant: 'basic',
          attack: 1,
          defense: 1,
          health: 1,
          minDamage: 1,
          maxDamage: 1,
          speed: 4,
          goldCost: 10,
          growth: 14,
          aiValue: 15,
          abilities: [],
          availableQuantity: 20
        },
        {
          id: 'archer',
          name: 'Archer',
          castle: 'castle',
          tier: 2,
          variant: 'basic',
          attack: 6,
          defense: 3,
          health: 10,
          minDamage: 2,
          maxDamage: 3,
          speed: 4,
          shots: 24,
          goldCost: 100,
          woodCost: 5,
          growth: 9,
          aiValue: 126,
          abilities: ['ranged'],
          availableQuantity: 15
        },
        {
          id: 'pikeman',
          name: 'Pikeman',
          castle: 'castle',
          tier: 2,
          variant: 'basic',
          attack: 4,
          defense: 5,
          health: 10,
          minDamage: 1,
          maxDamage: 3,
          speed: 4,
          goldCost: 80,
          growth: 9,
          aiValue: 115,
          abilities: ['no_melee_penalty'],
          availableQuantity: 12
        }
      ];
      
      setAvailableUnits(mockUnits);
    } catch (error) {
      console.error('Error loading available units:', error);
      setError('Failed to load available units');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (unitId: string, quantity: number) => {
    const unit = availableUnits.find(u => u.id === unitId);
    if (!unit) return;

    const maxQuantity = unit.availableQuantity || 0;
    const validQuantity = Math.max(0, Math.min(quantity, maxQuantity));
    
    setSelectedUnits(prev => ({
      ...prev,
      [unitId]: validQuantity
    }));
  };

  const calculateTotalCost = () => {
    const costs = {
      gold: 0,
      wood: 0,
      stone: 0
    };

    Object.entries(selectedUnits).forEach(([unitId, quantity]) => {
      const unit = availableUnits.find(u => u.id === unitId);
      if (unit && quantity > 0) {
        costs.gold += (unit.goldCost || 0) * quantity;
        costs.wood += (unit.woodCost || 0) * quantity;
        costs.stone += (unit.stoneCost || 0) * quantity;
      }
    });

    return costs;
  };

  const canAfford = () => {
    if (!currentPlayer) return false;
    
    const costs = calculateTotalCost();
    const resources = currentPlayer.resources;
    
    return (
      resources.gold >= costs.gold &&
      resources.wood >= costs.wood &&
      resources.stone >= costs.stone
    );
  };

  const handleRecruit = async () => {
    if (!currentGame || !currentPlayer || !selectedBuilding) return;

    const unitsToRecruit = Object.entries(selectedUnits).filter(([, quantity]) => quantity > 0);
    if (unitsToRecruit.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      for (const [unitId, quantity] of unitsToRecruit) {
        await ApiService.recruitUnits(selectedBuilding.buildingId, unitId, quantity);
      }

      // Refresh game state
      await useGameStore.getState().refreshGameState();
      
      // Reset selection
      setSelectedUnits({});
      
      // Reload available units
      await loadAvailableUnits();
      
      onClose();
    } catch (error) {
      console.error('Error recruiting units:', error);
      setError('Failed to recruit units');
    } finally {
      setLoading(false);
    }
  };

  const getTierColor = (tier: number) => {
    const colors = {
      1: '#8B4513', // Brown
      2: '#CD853F', // Peru
      3: '#DAA520', // Goldenrod
      4: '#FF6347', // Tomato
      5: '#9370DB', // Medium Purple
      6: '#FF1493', // Deep Pink
      7: '#FFD700'  // Gold
    };
    return colors[tier as keyof typeof colors] || '#888';
  };

  if (!isVisible) return null;

  return (
    <div className="unit-recruitment-overlay">
      <div className="unit-recruitment-modal">
        <div className="recruitment-header">
          <h2>{t('recruitUnits')}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-message">
            <div className="loading-spinner"></div>
            <p>{t('loading')}</p>
          </div>
        ) : (
          <>
            <div className="units-grid">
              {availableUnits.map(unit => (
                <div key={unit.id} className="unit-card">
                  <div className="unit-header">
                    <div className="unit-name">{unit.name}</div>
                    <div 
                      className="unit-tier"
                      style={{ backgroundColor: getTierColor(unit.tier) }}
                    >
                      Tier {unit.tier}
                    </div>
                  </div>

                  <div className="unit-stats">
                    <div className="stat-row">
                      <span>⚔️ {unit.attack}</span>
                      <span>🛡️ {unit.defense}</span>
                      <span>❤️ {unit.health}</span>
                    </div>
                    <div className="stat-row">
                      <span>🗡️ {unit.minDamage}-{unit.maxDamage}</span>
                      <span>⚡ {unit.speed}</span>
                      {unit.shots && <span>🏹 {unit.shots}</span>}
                    </div>
                  </div>

                  <div className="unit-cost">
                    <div className="cost-item">
                      <span className="resource-icon">💰</span>
                      <span>{unit.goldCost}</span>
                    </div>
                    {unit.woodCost && (
                      <div className="cost-item">
                        <span className="resource-icon">🪵</span>
                        <span>{unit.woodCost}</span>
                      </div>
                    )}
                    {unit.oreCost && (
                      <div className="cost-item">
                        <span className="resource-icon">⛏️</span>
                        <span>{unit.oreCost}</span>
                      </div>
                    )}
                  </div>

                  <div className="unit-availability">
                    Available: {unit.availableQuantity || 0}
                  </div>

                  <div className="quantity-selector">
                    <button 
                      onClick={() => handleQuantityChange(unit.id, (selectedUnits[unit.id] || 0) - 1)}
                      disabled={!selectedUnits[unit.id] || selectedUnits[unit.id] <= 0}
                    >
                      -
                    </button>
                    <span className="quantity">{selectedUnits[unit.id] || 0}</span>
                    <button 
                      onClick={() => handleQuantityChange(unit.id, (selectedUnits[unit.id] || 0) + 1)}
                      disabled={(selectedUnits[unit.id] || 0) >= (unit.availableQuantity || 0)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="recruitment-summary">
              <div className="total-cost">
                <h3>Total Cost</h3>
                <div className="cost-breakdown">
                  {Object.entries(calculateTotalCost()).map(([resource, amount]) => {
                    if (amount === 0) return null;
                    
                    const icons = {
                      gold: '💰',
                      wood: '🪵',
                      stone: '🗿',
                      ore: '⛏️',
                      crystal: '💎',
                      gems: '💍',
                      sulfur: '🔥'
                    };
                    
                    return (
                      <div key={resource} className="cost-item">
                        <span className="resource-icon">{icons[resource as keyof typeof icons]}</span>
                        <span>{amount}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="recruitment-actions">
                <button 
                  className="recruit-btn"
                  onClick={handleRecruit}
                  disabled={loading || !canAfford() || Object.values(selectedUnits).every(q => q === 0)}
                >
                  {loading ? 'Recruiting...' : t('recruit')}
                </button>
                <button className="cancel-btn" onClick={onClose}>
                  {t('cancel')}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UnitRecruitment; 