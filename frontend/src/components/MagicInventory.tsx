import React, { useState } from 'react';
import { MagicObject, ALL_MAGIC_OBJECTS, getObjectsByType, getObjectsByRarity, MAGIC_OBJECTS_STATS } from '../data/magicObjects';
import './MagicInventory.css';

interface MagicInventoryProps {
  heroId: string;
  heroName: string;
  equippedItems?: string[]; // IDs des objets équipés
  inventory?: string[]; // IDs des objets dans l'inventaire
  onEquipItem?: (itemId: string) => void;
  onUnequipItem?: (itemId: string) => void;
  onUseItem?: (itemId: string) => void;
}

const MagicInventory: React.FC<MagicInventoryProps> = ({
  heroId,
  heroName,
  equippedItems = [],
  inventory = [],
  onEquipItem,
  onUnequipItem,
  onUseItem
}) => {
  const [selectedTab, setSelectedTab] = useState<'equipped' | 'inventory' | 'all'>('inventory');
  const [filterType, setFilterType] = useState<MagicObject['type'] | 'all'>('all');
  const [filterRarity, setFilterRarity] = useState<MagicObject['rarity'] | 'all'>('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  // Obtenir les objets équipés
  const equippedObjects = equippedItems.map(id => ALL_MAGIC_OBJECTS.find(obj => obj.id === id)).filter(Boolean) as MagicObject[];
  
  // Obtenir les objets de l'inventaire
  const inventoryObjects = inventory.map(id => ALL_MAGIC_OBJECTS.find(obj => obj.id === id)).filter(Boolean) as MagicObject[];
  
  // Filtrer selon l'onglet sélectionné
  let displayedObjects: MagicObject[] = [];
  switch (selectedTab) {
    case 'equipped':
      displayedObjects = equippedObjects;
      break;
    case 'inventory':
      displayedObjects = inventoryObjects;
      break;
    case 'all':
      displayedObjects = ALL_MAGIC_OBJECTS;
      break;
  }

  // Appliquer les filtres
  if (filterType !== 'all') {
    displayedObjects = displayedObjects.filter(obj => obj.type === filterType);
  }
  if (filterRarity !== 'all') {
    displayedObjects = displayedObjects.filter(obj => obj.rarity === filterRarity);
  }

  const getRarityColor = (rarity: MagicObject['rarity']): string => {
    switch (rarity) {
      case 'common': return '#9CA3AF';
      case 'uncommon': return '#10B981';
      case 'rare': return '#3B82F6';
      case 'epic': return '#8B5CF6';
      case 'legendary': return '#F59E0B';
      case 'temporal': return '#EC4899';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: MagicObject['type']): string => {
    switch (type) {
      case 'weapon': return '⚔️';
      case 'armor': return '🛡️';
      case 'accessory': return '💍';
      case 'artifact': return '🏆';
      case 'consumable': return '🧪';
      case 'temporal': return '🌀';
      case 'resource': return '💰';
      default: return '❓';
    }
  };

  const isEquipped = (itemId: string): boolean => equippedItems.includes(itemId);
  const isInInventory = (itemId: string): boolean => inventory.includes(itemId);

  return (
    <div className="magic-inventory">
      <div className="inventory-header">
        <h2>🎒 Inventaire Magique - {heroName}</h2>
        <div className="inventory-stats">
          <span>📦 Objets: {inventory.length}</span>
          <span>⚡ Équipés: {equippedItems.length}</span>
          <span>💎 Valeur: {[...inventory, ...equippedItems].reduce((total, id) => {
            const obj = ALL_MAGIC_OBJECTS.find(o => o.id === id);
            return total + (obj?.value || 0);
          }, 0).toLocaleString()}💰</span>
        </div>
      </div>

      {/* Onglets */}
      <div className="inventory-tabs">
        <button 
          className={`tab ${selectedTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setSelectedTab('inventory')}
        >
          🎒 Inventaire ({inventory.length})
        </button>
        <button 
          className={`tab ${selectedTab === 'equipped' ? 'active' : ''}`}
          onClick={() => setSelectedTab('equipped')}
        >
          ⚡ Équipé ({equippedItems.length})
        </button>
        <button 
          className={`tab ${selectedTab === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedTab('all')}
        >
          📚 Bibliothèque ({ALL_MAGIC_OBJECTS.length})
        </button>
      </div>

      {/* Filtres */}
      <div className="inventory-filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value as any)}>
          <option value="all">Tous types</option>
          <option value="weapon">⚔️ Armes</option>
          <option value="armor">🛡️ Armures</option>
          <option value="accessory">💍 Accessoires</option>
          <option value="artifact">🏆 Artefacts</option>
          <option value="temporal">🌀 Temporels</option>
          <option value="consumable">🧪 Consommables</option>
          <option value="resource">💰 Ressources</option>
        </select>

        <select value={filterRarity} onChange={(e) => setFilterRarity(e.target.value as any)}>
          <option value="all">Toutes raretés</option>
          <option value="common">⚪ Commun</option>
          <option value="uncommon">🟢 Peu commun</option>
          <option value="rare">🔵 Rare</option>
          <option value="epic">🟣 Épique</option>
          <option value="legendary">🟡 Légendaire</option>
          <option value="temporal">🟠 Temporel</option>
        </select>
      </div>

      {/* Grille d'objets */}
      <div className="objects-grid">
        {displayedObjects.map(object => (
          <div 
            key={object.id} 
            className={`object-card ${object.rarity} ${isEquipped(object.id) ? 'equipped' : ''} ${!isInInventory(object.id) && !isEquipped(object.id) && selectedTab !== 'all' ? 'unavailable' : ''}`}
            onClick={() => setShowDetails(showDetails === object.id ? null : object.id)}
          >
            <div className="object-header">
              <span className="object-icon">{getTypeIcon(object.type)}</span>
              <span className="object-rarity" style={{ color: getRarityColor(object.rarity) }}>
                ●
              </span>
              {isEquipped(object.id) && <span className="equipped-badge">⚡</span>}
              {object.temporal && <span className="temporal-badge">🌀</span>}
            </div>
            
            <h3 className="object-name">{object.name}</h3>
            <p className="object-description">{object.description}</p>
            
            <div className="object-effects">
              {object.effects.attack && <span>⚔️ +{object.effects.attack}</span>}
              {object.effects.defense && <span>🛡️ +{object.effects.defense}</span>}
              {object.effects.knowledge && <span>📚 +{object.effects.knowledge}</span>}
              {object.effects.spellPower && <span>🔮 +{object.effects.spellPower}</span>}
              {object.effects.mana && <span>💙 +{object.effects.mana}</span>}
              {object.effects.temporalMana && <span>🌀 +{object.effects.temporalMana}</span>}
              {object.effects.movementPoints && <span>👟 {object.effects.movementPoints > 0 ? '+' : ''}{object.effects.movementPoints}</span>}
            </div>

            <div className="object-value">
              💰 {object.value.toLocaleString()}
            </div>

            {/* Actions */}
            {(isInInventory(object.id) || isEquipped(object.id)) && (
              <div className="object-actions">
                {isEquipped(object.id) ? (
                  <button 
                    className="unequip-btn"
                    onClick={(e) => { e.stopPropagation(); onUnequipItem?.(object.id); }}
                  >
                    📤 Déséquiper
                  </button>
                ) : isInInventory(object.id) && (
                  <>
                    {object.type === 'consumable' ? (
                      <button 
                        className="use-btn"
                        onClick={(e) => { e.stopPropagation(); onUseItem?.(object.id); }}
                      >
                        🧪 Utiliser
                      </button>
                    ) : (
                      <button 
                        className="equip-btn"
                        onClick={(e) => { e.stopPropagation(); onEquipItem?.(object.id); }}
                      >
                        ⚡ Équiper
                      </button>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Détails étendus */}
            {showDetails === object.id && (
              <div className="object-details">
                <hr />
                <div className="details-grid">
                  <div><strong>Type:</strong> {object.type}</div>
                  <div><strong>Rareté:</strong> {object.rarity}</div>
                  <div><strong>Slot:</strong> {object.slot || 'N/A'}</div>
                  {object.requiresLevel && <div><strong>Niveau requis:</strong> {object.requiresLevel}</div>}
                </div>
                {object.effects.specialEffect && (
                  <div className="special-effect">
                    <strong>Effet spécial:</strong> {object.effects.specialEffect}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {displayedObjects.length === 0 && (
        <div className="empty-inventory">
          <h3>Aucun objet trouvé</h3>
          <p>Essayez de changer les filtres ou d'explorer la carte pour trouver des objets magiques !</p>
        </div>
      )}

      {/* Statistiques de la bibliothèque */}
      {selectedTab === 'all' && (
        <div className="library-stats">
          <h3>📊 Statistiques de la Bibliothèque</h3>
          <div className="stats-grid">
            <div>🎯 Total: {MAGIC_OBJECTS_STATS.total}</div>
            <div>🌀 Temporels: {MAGIC_OBJECTS_STATS.temporal}</div>
            <div>⚔️ Armes: {MAGIC_OBJECTS_STATS.weapons}</div>
            <div>🛡️ Armures: {MAGIC_OBJECTS_STATS.armor}</div>
            <div>💍 Accessoires: {MAGIC_OBJECTS_STATS.accessories}</div>
            <div>🏆 Légendaires: {MAGIC_OBJECTS_STATS.legendary}</div>
            <div>🧪 Consommables: {MAGIC_OBJECTS_STATS.consumables}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MagicInventory; 