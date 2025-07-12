import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import SimpleGameInterface from './SimpleGameInterface';
import MagicInventory from './MagicInventory';
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
            {scenarioType === 'mystique' ? '🔮 Chargement du monde mystique...' : '🏰 Chargement du monde classique...'}
          </h2>
          <p>
            {scenarioType === 'mystique' 
              ? 'Préparation des objets magiques et temporels...' 
              : 'Préparation des héros et des châteaux...'}
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
          {scenarioType === 'mystique' ? '🔮 Conquête Mystique' : '🏰 Conquête Classique'}
        </div>
        {scenarioType === 'mystique' && (
          <button 
            className="magic-inventory-toggle"
            onClick={() => setShowMagicInventory(!showMagicInventory)}
            title="Inventaire Magique"
          >
            🎒 Inventaire Magique
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
        <div className="mystical-enhancements">
          <div className="temporal-indicator">
            <span>⏰</span>
            <div className="temporal-info">
              <small>Objets temporels disponibles</small>
              <div className="temporal-count">
                {/* TODO: Get actual temporal objects count */}
                {Math.floor(Math.random() * 5) + 1}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrueHeroesInterface; 