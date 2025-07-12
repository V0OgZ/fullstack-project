import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import SimpleGameInterface from './SimpleGameInterface';
import MagicInventory from './MagicInventory';
import { useTranslation } from '../i18n';
import './TrueHeroesInterface.css';

interface TrueHeroesInterfaceProps {
  playerCount: number;
  scenarioType: 'classique' | 'mystique';
  scenarioId: string;
}

const TrueHeroesInterface: React.FC<TrueHeroesInterfaceProps> = ({
  playerCount,
  scenarioType,
  scenarioId
}) => {
  const { currentPlayer, loadGame } = useGameStore();
  const { t } = useTranslation();
  const [showMagicInventory, setShowMagicInventory] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize game when component mounts
  useEffect(() => {
    const initGame = async () => {
      if (!isInitialized) {
        console.log(`🎮 Initializing ${scenarioType} scenario...`);
        
        // Load game with scenario ID
        await loadGame(scenarioId);
        
        setIsInitialized(true);
      }
    };

    initGame();
  }, [scenarioId, scenarioType, loadGame, isInitialized]);

  // Handle equipping magical items
  const handleEquipItem = (itemId: string) => {
    console.log(`🔮 Equipping item: ${itemId}`);
    // TODO: Implement item equipping logic with backend
  };

  const handleUnequipItem = (itemId: string) => {
    console.log(`📤 Unequipping item: ${itemId}`);
    // TODO: Implement item unequipping logic with backend
  };

  const handleUseItem = (itemId: string) => {
    console.log(`🧪 Using item: ${itemId}`);
    // TODO: Implement item usage logic with backend
  };

  if (!isInitialized) {
    return (
      <div className="true-heroes-loading">
        <div className="loading-content">
          <div className="spinner"></div>
          <h2>
            {scenarioType === 'mystique' ? `🔮 ${t('loading')}` : `🏰 ${t('loading')}`}
          </h2>
          <p>
            {t('loading')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="true-heroes-interface">
      {/* Scenario indicator */}
      <div className="scenario-indicator">
        <div className={`scenario-badge ${scenarioType}`}>
          {scenarioType === 'mystique' ? `🔮 ${t('mysticalConquest')}` : `🏰 ${t('classicConquest')}`}
        </div>
        {scenarioType === 'mystique' && (
          <button 
            className="magic-inventory-toggle"
            onClick={() => setShowMagicInventory(!showMagicInventory)}
            title={t('magicInventoryTitle')}
          >
            🎒 {t('magicInventoryTitle')}
          </button>
        )}
      </div>

      {/* Main game interface */}
      <div className="main-interface">
        <SimpleGameInterface />
      </div>

      {/* Magic inventory overlay for mystical scenario */}
      {scenarioType === 'mystique' && showMagicInventory && (
        <div className="magic-inventory-overlay">
          <div className="magic-inventory-container">
            <button 
              className="close-inventory"
              onClick={() => setShowMagicInventory(false)}
            >
              ✕
            </button>
            <MagicInventory
              playerInventory={[]}
              equippedItems={{}}
              onEquipItem={handleEquipItem}
              onUnequipItem={handleUnequipItem}
              onUseItem={handleUseItem}
              playerGold={currentPlayer?.resources?.gold || 0}
              playerLevel={currentPlayer?.heroes?.[0]?.level || 1}
            />
          </div>
        </div>
      )}

      {/* Scenario-specific UI enhancements */}
      {scenarioType === 'mystique' && (
        <div className="mystical-overlay">
          <div className="temporal-effects">
            {/* Subtle mystical effects */}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrueHeroesInterface; 