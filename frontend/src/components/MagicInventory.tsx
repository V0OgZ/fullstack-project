import React, { useState, useMemo } from 'react';
import { ALL_MAGIC_OBJECTS, MAGIC_OBJECTS_STATS, MagicObject } from '../data/magicObjects';
import './MagicInventory.css';

interface MagicInventoryProps {
  playerInventory?: string[];
  equippedItems?: Record<string, string>;
  onEquipItem?: (itemId: string) => void;
  onUnequipItem?: (itemId: string) => void;
  onUseItem?: (itemId: string) => void;
  playerGold?: number;
  playerLevel?: number;
}

const MagicInventory: React.FC<MagicInventoryProps> = ({
  playerInventory = [],
  equippedItems = {},
  onEquipItem,
  onUnequipItem,
  onUseItem,
  playerGold = 0,
  playerLevel = 1
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [showOnlyOwned, setShowOnlyOwned] = useState(false);
  const [layoutVertical, setLayoutVertical] = useState(true);

  // Compute tab categories
  const tabs = [
    { id: 'all', name: 'Tous', icon: '🎒' },
    { id: 'equipped', name: 'Équipé', icon: '⚔️' },
    { id: 'weapon', name: 'Armes', icon: '⚔️' },
    { id: 'armor', name: 'Armures', icon: '🛡️' },
    { id: 'accessory', name: 'Accessoires', icon: '💍' },
    { id: 'artifact', name: 'Artefacts', icon: '⭐' },
    { id: 'temporal', name: 'Temporel', icon: '⏰' },
    { id: 'consumable', name: 'Consommables', icon: '🧪' },
    { id: 'resource', name: 'Ressources', icon: '💰' }
  ];

  // Filter and sort objects
  const filteredObjects = useMemo(() => {
    let objects = [...ALL_MAGIC_OBJECTS];

    // Filter by active tab
    if (activeTab === 'equipped') {
      objects = objects.filter(obj => Object.values(equippedItems).includes(obj.id));
    } else if (activeTab !== 'all') {
      objects = objects.filter(obj => obj.type === activeTab);
    }

    // Filter by rarity
    if (selectedRarity !== 'all') {
      objects = objects.filter(obj => obj.rarity === selectedRarity);
    }

    // Filter by type
    if (selectedType !== 'all') {
      objects = objects.filter(obj => obj.type === selectedType);
    }

    // Filter by ownership
    if (showOnlyOwned) {
      objects = objects.filter(obj => playerInventory.includes(obj.id));
    }

    // Sort objects
    objects.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'value':
          return b.value - a.value;
        case 'rarity':
          const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'temporal'];
          return rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity);
        default:
          return 0;
      }
    });

    return objects;
  }, [activeTab, selectedRarity, selectedType, showOnlyOwned, sortBy, playerInventory, equippedItems]);

  const isItemOwned = (itemId: string) => playerInventory.includes(itemId);
  const isItemEquipped = (itemId: string) => Object.values(equippedItems).includes(itemId);
  const canEquipItem = (item: MagicObject) => 
    !item.requiresLevel || playerLevel >= item.requiresLevel;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#9CA3AF';
      case 'uncommon': return '#10B981';
      case 'rare': return '#3B82F6';
      case 'epic': return '#8B5CF6';
      case 'legendary': return '#F59E0B';
      case 'temporal': return '#EC4899';
      default: return '#9CA3AF';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return '⚪';
      case 'uncommon': return '🟢';
      case 'rare': return '🔵';
      case 'epic': return '🟣';
      case 'legendary': return '🟡';
      case 'temporal': return '🌸';
      default: return '⚪';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weapon': return '⚔️';
      case 'armor': return '🛡️';
      case 'accessory': return '💍';
      case 'artifact': return '⭐';
      case 'temporal': return '⏰';
      case 'consumable': return '🧪';
      case 'resource': return '💰';
      default: return '❓';
    }
  };

  const handleEquipItem = (itemId: string) => {
    if (onEquipItem) {
      onEquipItem(itemId);
    }
  };

  const handleUnequipItem = (itemId: string) => {
    if (onUnequipItem) {
      onUnequipItem(itemId);
    }
  };

  const handleUseItem = (itemId: string) => {
    if (onUseItem) {
      onUseItem(itemId);
    }
  };

  return (
    <div className="magic-inventory">
      <button 
        className="layout-toggle"
        onClick={() => setLayoutVertical(!layoutVertical)}
        title={layoutVertical ? "Passer aux onglets horizontaux" : "Passer aux onglets verticaux"}
      >
        {layoutVertical ? '📋 Horizontal' : '📑 Vertical'}
      </button>

      <div className="inventory-header">
        <h2>Inventaire Magique</h2>
        <div className="inventory-stats">
          <span>📦 {filteredObjects.length} objets</span>
          <span>⚔️ {Object.keys(equippedItems).length} équipés</span>
          <span>💰 {playerGold} or</span>
          <span>📈 Niv. {playerLevel}</span>
        </div>
      </div>

      <div className="inventory-layout">
        {/* Sidebar with tabs */}
        <div className="inventory-sidebar">
          <div className={`inventory-tabs ${layoutVertical ? '' : 'horizontal'}`}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.name}
              </button>
            ))}
          </div>

          <div className="inventory-filters">
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              title="Filtrer par rareté"
            >
              <option value="all">Toutes raretés</option>
              <option value="common">Commun</option>
              <option value="uncommon">Inhabituel</option>
              <option value="rare">Rare</option>
              <option value="epic">Épique</option>
              <option value="legendary">Légendaire</option>
              <option value="temporal">Temporel</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              title="Filtrer par type"
            >
              <option value="all">Tous types</option>
              <option value="weapon">Armes</option>
              <option value="armor">Armures</option>
              <option value="accessory">Accessoires</option>
              <option value="artifact">Artefacts</option>
              <option value="temporal">Temporel</option>
              <option value="consumable">Consommables</option>
              <option value="resource">Ressources</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              title="Trier par"
            >
              <option value="name">Nom</option>
              <option value="value">Valeur</option>
              <option value="rarity">Rareté</option>
            </select>

            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={showOnlyOwned}
                onChange={(e) => setShowOnlyOwned(e.target.checked)}
              />
              Seulement possédés
            </label>
          </div>
        </div>

        {/* Main content area */}
        <div className="inventory-main">
          {filteredObjects.length === 0 ? (
            <div className="empty-inventory">
              <h3>Aucun objet trouvé</h3>
              <p>Ajustez vos filtres ou explorez le monde pour trouver des objets magiques !</p>
            </div>
          ) : (
            <div className="objects-grid">
              {filteredObjects.map(object => {
                const owned = isItemOwned(object.id);
                const equipped = isItemEquipped(object.id);
                const canEquip = canEquipItem(object);
                const unavailable = !owned && !canEquip;

                return (
                  <div
                    key={object.id}
                    className={`object-card ${object.rarity} ${equipped ? 'equipped' : ''} ${unavailable ? 'unavailable' : ''}`}
                  >
                    <div className="object-header">
                      <div className="object-icon">
                        {getTypeIcon(object.type)}
                      </div>
                      <div className="object-rarity" style={{ color: getRarityColor(object.rarity) }}>
                        {getRarityIcon(object.rarity)}
                      </div>
                      {equipped && <span className="equipped-badge">Équipé</span>}
                      {object.temporal && <span className="temporal-badge">Temporel</span>}
                    </div>

                    <h3 className="object-name">{object.name}</h3>
                    <p className="object-description">{object.description}</p>

                    <div className="object-effects">
                      {object.effects.attack && <span>⚔️ +{object.effects.attack}</span>}
                      {object.effects.defense && <span>🛡️ +{object.effects.defense}</span>}
                      {object.effects.knowledge && <span>📚 +{object.effects.knowledge}</span>}
                      {object.effects.spellPower && <span>🔮 +{object.effects.spellPower}</span>}
                      {object.effects.movementPoints && <span>🏃 +{object.effects.movementPoints}</span>}
                      {object.effects.mana && <span>💙 +{object.effects.mana}</span>}
                      {object.effects.temporalMana && <span>⏰ +{object.effects.temporalMana}</span>}
                      {object.effects.experience && <span>📈 +{object.effects.experience}</span>}
                      {object.effects.gold && <span>💰 +{object.effects.gold}</span>}
                    </div>

                    <div className="object-value">💰 {object.value.toLocaleString()} or</div>

                    {object.effects.specialEffect && (
                      <div className="special-effect">
                        <strong>Effet spécial:</strong> {object.effects.specialEffect}
                      </div>
                    )}

                    <div className="object-details">
                      <div className="details-grid">
                        <div>Type: {object.type}</div>
                        <div>Rareté: {object.rarity}</div>
                        {object.slot && <div>Slot: {object.slot}</div>}
                        {object.requiresLevel && <div>Niveau: {object.requiresLevel}</div>}
                      </div>

                      <div className="object-actions">
                        {owned && !equipped && object.slot && (
                          <button
                            className="equip-btn"
                            onClick={() => handleEquipItem(object.id)}
                            disabled={!canEquip}
                          >
                            Équiper
                          </button>
                        )}
                        {equipped && (
                          <button
                            className="unequip-btn"
                            onClick={() => handleUnequipItem(object.id)}
                          >
                            Déséquiper
                          </button>
                        )}
                        {owned && object.type === 'consumable' && (
                          <button
                            className="use-btn"
                            onClick={() => handleUseItem(object.id)}
                          >
                            Utiliser
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="library-stats">
        <h3>Statistiques de la Bibliothèque</h3>
        <div className="stats-grid">
          <div>Total: {MAGIC_OBJECTS_STATS.total}</div>
          <div>Temporel: {MAGIC_OBJECTS_STATS.temporal}</div>
          <div>Armes: {MAGIC_OBJECTS_STATS.weapons}</div>
          <div>Armures: {MAGIC_OBJECTS_STATS.armor}</div>
          <div>Accessoires: {MAGIC_OBJECTS_STATS.accessories}</div>
          <div>Légendaire: {MAGIC_OBJECTS_STATS.legendary}</div>
          <div>Consommables: {MAGIC_OBJECTS_STATS.consumables}</div>
          <div>Commun: {MAGIC_OBJECTS_STATS.byRarity.common}</div>
          <div>Inhabituel: {MAGIC_OBJECTS_STATS.byRarity.uncommon}</div>
          <div>Rare: {MAGIC_OBJECTS_STATS.byRarity.rare}</div>
          <div>Épique: {MAGIC_OBJECTS_STATS.byRarity.epic}</div>
          <div>Légendaire: {MAGIC_OBJECTS_STATS.byRarity.legendary}</div>
          <div>Temporel: {MAGIC_OBJECTS_STATS.byRarity.temporal}</div>
        </div>
      </div>
    </div>
  );
};

export default MagicInventory; 