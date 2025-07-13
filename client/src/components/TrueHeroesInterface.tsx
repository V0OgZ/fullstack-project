import React, { useState, useEffect, useMemo } from 'react';
import { useGameStore } from '../store/useGameStore';
import SimpleGameInterface from './SimpleGameInterface';
import MagicInventory from './MagicInventory';
import { useTranslation } from '../i18n';
import './TrueHeroesInterface.css';

interface TrueHeroesInterfaceProps {
  playerCount: number;
  scenarioType: 'classique' | 'mystique' | 'multiplayer';
  scenarioId: string;
}

const TrueHeroesInterface: React.FC<TrueHeroesInterfaceProps> = ({
  playerCount,
  scenarioType,
  scenarioId
}) => {
  const { 
    currentPlayer, 
    loadGame, 
    playerInventory,
    equippedItems,
    equipItem,
    unequipItem,
    consumeItem,
    getEnhancedHero
  } = useGameStore();
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
    if (!currentPlayer?.heroes?.[0]) {
      console.log('❌ No hero available to equip item');
      return;
    }

    const heroId = currentPlayer.heroes[0].id;
    
    // Determine slot based on item type
    // This is a simplified version - you might want more sophisticated slot detection
    const slotMapping: { [key: string]: string } = {
      'sword_': 'weapon',
      'armor_': 'armor', 
      'ring_': 'ring',
      'boots_': 'boots',
      'amulet_': 'amulet',
      'cape_': 'cape',
      'crown_': 'helmet',
      'staff_': 'weapon'
    };

    let slot = 'weapon'; // default
    for (const [prefix, slotType] of Object.entries(slotMapping)) {
      if (itemId.startsWith(prefix)) {
        slot = slotType;
        break;
      }
    }

    const success = equipItem(heroId, itemId, slot);
    if (success) {
      console.log(`🔮 Equipped ${itemId} to ${slot} slot`);
    }
  };

  const handleUnequipItem = (itemId: string) => {
    if (!currentPlayer?.heroes?.[0]) return;

    const heroId = currentPlayer.heroes[0].id;
    const heroEquippedItems = equippedItems[heroId];
    
    if (!heroEquippedItems) return;

    // Find which slot the item is in
    for (const [slot, equippedItemId] of Object.entries(heroEquippedItems)) {
      if (equippedItemId === itemId) {
        const success = unequipItem(heroId, slot);
        if (success) {
          console.log(`📤 Unequipped ${itemId} from ${slot} slot`);
        }
        break;
      }
    }
  };

  const handleUseItem = (itemId: string) => {
    if (!currentPlayer?.heroes?.[0]) return;

    const heroId = currentPlayer.heroes[0].id;
    const success = consumeItem(itemId, heroId);
    if (success) {
      console.log(`🧪 Used ${itemId}`);
    }
  };

  // Get current equipped items for the active hero (convert to expected format)
  const currentEquippedItems = useMemo(() => {
    if (!currentPlayer?.heroes?.[0]) return {};
    
    const heroEquipped = equippedItems[currentPlayer.heroes[0].id] || {};
    
    // Convert EquippedItems to Record<string, string>
    const convertedItems: Record<string, string> = {};
    Object.entries(heroEquipped).forEach(([slot, itemId]) => {
      if (itemId) {
        convertedItems[slot] = itemId;
      }
    });
    
    return convertedItems;
  }, [currentPlayer, equippedItems]);

  if (!isInitialized) {
    return (
      <div className="true-heroes-loading">
        <div className="loading-content">
          <div className="spinner"></div>
          <h2>
            {scenarioType === 'mystique' ? `🔮 ${t('loading')}` : 
             scenarioType === 'multiplayer' ? `🌐 ${t('loading')}` : 
             `🏰 ${t('loading')}`}
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
          {scenarioType === 'mystique' ? `🔮 ${t('mysticalConquest')}` : 
           scenarioType === 'multiplayer' ? `🌐 ${t('multiplayerArena')}` : 
           `🏰 ${t('classicConquest')}`}
        </div>
        {(scenarioType === 'mystique' || scenarioType === 'multiplayer') && (
          <button 
            className="magic-inventory-toggle"
            onClick={() => setShowMagicInventory(!showMagicInventory)}
            title={t('magicInventoryTitle')}
          >
            🎒 {t('magicInventoryTitle')} ({playerInventory.length})
          </button>
        )}
      </div>

      {/* Main game interface */}
      <div className="main-interface">
        <SimpleGameInterface scenarioId={scenarioId} />
      </div>

      {/* Magic inventory overlay for mystical and multiplayer scenarios */}
      {(scenarioType === 'mystique' || scenarioType === 'multiplayer') && showMagicInventory && (
        <div className="magic-inventory-overlay">
          <div className="magic-inventory-container">
            <button 
              className="close-inventory"
              onClick={() => setShowMagicInventory(false)}
            >
              ✕
            </button>
            <MagicInventory
              playerInventory={playerInventory}
              equippedItems={currentEquippedItems}
              onEquipItem={handleEquipItem}
              onUnequipItem={handleUnequipItem}
              onUseItem={handleUseItem}
              playerGold={currentPlayer?.resources?.gold || 0}
              playerLevel={currentPlayer?.heroes?.[0]?.level || 1}
            />
          </div>
        </div>
      )}

      {/* Enhanced hero display with item effects */}
      {currentPlayer?.heroes?.[0] && (
        <div className="hero-enhancement-display" style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '8px',
          fontSize: '12px',
          maxWidth: '200px'
        }}>
          <h4>🦸 Enhanced Stats</h4>
          {(() => {
            const hero = currentPlayer.heroes[0];
            const enhanced = getEnhancedHero(hero.id);
            if (!enhanced) return null;
            
            return (
              <div>
                <div>⚔️ Attack: {hero.stats.attack} → {enhanced.stats.attack}</div>
                <div>🛡️ Defense: {hero.stats.defense} → {enhanced.stats.defense}</div>
                <div>📚 Knowledge: {hero.stats.knowledge} → {enhanced.stats.knowledge}</div>
                <div>🔮 Spell Power: {hero.stats.spellPower} → {enhanced.stats.spellPower}</div>
                <div>🏃 Movement: {hero.movementPoints}/{hero.maxMovementPoints} → {enhanced.movementPoints}/{enhanced.maxMovementPoints}</div>
              </div>
            );
          })()}
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
      
      {/* Multiplayer-specific UI enhancements */}
      {scenarioType === 'multiplayer' && (
        <div className="multiplayer-overlay">
          <div className="multiplayer-indicators">
            <div className="player-list">
              <h4>🏆 Players ({playerCount})</h4>
              <div className="online-players">
                {Array.from({ length: playerCount }, (_, i) => (
                  <div key={i} className="player-indicator">
                    <span className="player-status online"></span>
                    Player {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrueHeroesInterface; 