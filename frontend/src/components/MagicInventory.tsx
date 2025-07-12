import React, { useState, useMemo } from 'react';
import { ALL_MAGIC_OBJECTS, MAGIC_OBJECTS_STATS, MagicObject } from '../data/magicObjects';
import { useTranslation } from '../i18n';
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
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [showOnlyOwned, setShowOnlyOwned] = useState(false);
  const [layoutVertical, setLayoutVertical] = useState(true);

  // Compute tab categories
  const tabs = [
    { id: 'all', name: t('all'), icon: '🎒' },
    { id: 'equipped', name: t('equipped'), icon: '⚔️' },
    { id: 'weapon', name: t('weapons'), icon: '⚔️' },
    { id: 'armor', name: t('armor'), icon: '🛡️' },
    { id: 'accessory', name: t('accessories'), icon: '💍' },
    { id: 'artifact', name: t('artifacts'), icon: '⭐' },
    { id: 'temporal', name: t('temporal'), icon: '⏰' },
    { id: 'consumable', name: t('consumables'), icon: '🧪' },
    { id: 'resource', name: t('resources'), icon: '💰' }
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
        <h2>{t('magicInventoryTitle')}</h2>
        <div className="inventory-stats">
          <span>📦 {filteredObjects.length} {t('objects')}</span>
          <span>⚔️ {Object.keys(equippedItems).length} {t('equipped')}</span>
          <span>💰 {playerGold} {t('gold')}</span>
          <span>📈 {t('level')} {playerLevel}</span>
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
              title={t('filterByRarity')}
            >
              <option value="all">{t('allRarities')}</option>
              <option value="common">{t('common')}</option>
              <option value="uncommon">{t('uncommon')}</option>
              <option value="rare">{t('rare')}</option>
              <option value="epic">{t('epic')}</option>
              <option value="legendary">{t('legendary')}</option>
              <option value="temporal">{t('temporal')}</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              title={t('filterByType')}
            >
              <option value="all">{t('allTypes')}</option>
              <option value="weapon">{t('weapons')}</option>
              <option value="armor">{t('armor')}</option>
              <option value="accessory">{t('accessories')}</option>
              <option value="artifact">{t('artifacts')}</option>
              <option value="temporal">{t('temporal')}</option>
              <option value="consumable">{t('consumables')}</option>
              <option value="resource">{t('resources')}</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              title={t('sortBy')}
            >
              <option value="name">{t('sortByName')}</option>
              <option value="value">{t('sortByValue')}</option>
              <option value="rarity">{t('sortByRarity')}</option>
            </select>

            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={showOnlyOwned}
                onChange={(e) => setShowOnlyOwned(e.target.checked)}
              />
              {t('onlyOwned')}
            </label>
          </div>
        </div>

        {/* Main content area */}
        <div className="inventory-main">
          {filteredObjects.length === 0 ? (
            <div className="empty-inventory">
              <h3>{t('noItemsFound')}</h3>
              <p>{t('adjustFiltersOrExplore')}</p>
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
                      {equipped && <span className="equipped-badge">{t('equipped')}</span>}
                      {object.temporal && <span className="temporal-badge">{t('temporal')}</span>}
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

                    <div className="object-value">💰 {object.value.toLocaleString()} {t('gold')}</div>

                    {object.effects.specialEffect && (
                      <div className="special-effect">
                        <strong>{t('specialEffect')}:</strong> {object.effects.specialEffect}
                      </div>
                    )}

                    <div className="object-details">
                      <div className="details-grid">
                        <div>{t('type')}: {object.type}</div>
                        <div>{t('rarity')}: {object.rarity}</div>
                        {object.slot && <div>{t('slot')}: {object.slot}</div>}
                        {object.requiresLevel && <div>{t('requiresLevel')}: {object.requiresLevel}</div>}
                      </div>

                      <div className="object-actions">
                        {owned && !equipped && object.slot && (
                          <button
                            className="equip-btn"
                            onClick={() => handleEquipItem(object.id)}
                            disabled={!canEquip}
                          >
                            {t('equipItem')}
                          </button>
                        )}
                        {equipped && (
                          <button
                            className="unequip-btn"
                            onClick={() => handleUnequipItem(object.id)}
                          >
                            {t('unequipItem')}
                          </button>
                        )}
                        {owned && object.type === 'consumable' && (
                          <button
                            className="use-btn"
                            onClick={() => handleUseItem(object.id)}
                          >
                            {t('useItem')}
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
        <h3>{t('libraryStatsTitle')}</h3>
        <div className="stats-grid">
          <div>{t('total')}: {MAGIC_OBJECTS_STATS.total}</div>
          <div>{t('temporal')}: {MAGIC_OBJECTS_STATS.temporal}</div>
          <div>{t('weapons')}: {MAGIC_OBJECTS_STATS.weapons}</div>
          <div>{t('armor')}: {MAGIC_OBJECTS_STATS.armor}</div>
          <div>{t('accessories')}: {MAGIC_OBJECTS_STATS.accessories}</div>
          <div>{t('legendary')}: {MAGIC_OBJECTS_STATS.legendary}</div>
          <div>{t('consumables')}: {MAGIC_OBJECTS_STATS.consumables}</div>
          <div>{t('common')}: {MAGIC_OBJECTS_STATS.byRarity.common}</div>
          <div>{t('uncommon')}: {MAGIC_OBJECTS_STATS.byRarity.uncommon}</div>
          <div>{t('rare')}: {MAGIC_OBJECTS_STATS.byRarity.rare}</div>
          <div>{t('epic')}: {MAGIC_OBJECTS_STATS.byRarity.epic}</div>
          <div>{t('legendary')}: {MAGIC_OBJECTS_STATS.byRarity.legendary}</div>
          <div>{t('temporal')}: {MAGIC_OBJECTS_STATS.byRarity.temporal}</div>
        </div>
      </div>
    </div>
  );
};

export default MagicInventory; 