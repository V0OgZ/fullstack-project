// 🎮 EpicView Component - Asset Browser for Heroes of Time
// ================================================================
// Interface pour parcourir tous les contenus disponibles
// Héros, créatures, bâtiments, objets - tout en un seul endroit

import React, { useState, useEffect } from 'react';
import './EpicView.css';
import { DRAGON_ROUGE, DRAGON_ROUGE_CONFIG } from '../data/dragonRouge';

interface EpicViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const EpicView: React.FC<EpicViewProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'heroes' | 'creatures' | 'buildings' | 'objects'>('heroes');
  const [heroAssets, setHeroAssets] = useState<any[]>([]);
  const [creatureAssets, setCreatureAssets] = useState<any[]>([]);
  const [buildingAssets, setBuildingAssets] = useState<any[]>([]);
  const [objectAssets, setObjectAssets] = useState<any[]>([]);

  // Charge les assets au montage
  useEffect(() => {
    if (isOpen) {
      loadAssets();
    }
  }, [isOpen]);

  const loadAssets = async () => {
    try {
      // Heroes avec portraits Flare
      const heroList = [
        { id: 'arthur', name: 'Arthur', image: '/assets/heroes/portraits/flare/arthur.png', class: 'Knight' },
        { id: 'morgana', name: 'Morgana', image: '/assets/heroes/portraits/flare/morgana.png', class: 'Sorceress' },
        { id: 'merlin', name: 'Merlin', image: '/assets/heroes/portraits/flare/merlin.png', class: 'Wizard' },
        { id: 'warrior', name: 'Warrior', image: '/assets/heroes/portraits/flare/warrior.png', class: 'Warrior' },
        { id: 'mage', name: 'Mage', image: '/assets/heroes/portraits/flare/mage.png', class: 'Mage' },
        { id: 'archer', name: 'Archer', image: '/assets/heroes/portraits/flare/archer.png', class: 'Archer' },
        { id: 'rogue', name: 'Rogue', image: '/assets/heroes/portraits/flare/rogue.png', class: 'Rogue' },
        { id: 'paladin', name: 'Paladin', image: '/assets/heroes/portraits/flare/paladin.png', class: 'Paladin' },
        { id: 'berserker', name: 'Berserker', image: '/assets/heroes/portraits/flare/berserker.png', class: 'Berserker' },
        { id: 'cleric', name: 'Cleric', image: '/assets/heroes/portraits/flare/cleric.png', class: 'Cleric' },
        { id: 'druid', name: 'Druid', image: '/assets/heroes/portraits/flare/druid.png', class: 'Druid' },
        { id: 'necromancer', name: 'Necromancer', image: '/assets/heroes/portraits/flare/necromancer.png', class: 'Necromancer' },
        { id: 'ranger', name: 'Ranger', image: '/assets/heroes/portraits/flare/ranger.png', class: 'Ranger' },
        { id: 'sorcerer', name: 'Sorcerer', image: '/assets/heroes/portraits/flare/sorcerer.png', class: 'Sorcerer' },
        { id: 'monk', name: 'Monk', image: '/assets/heroes/portraits/flare/monk.png', class: 'Monk' },
        { id: 'barbarian', name: 'Barbarian', image: '/assets/heroes/portraits/flare/barbarian.png', class: 'Barbarian' },
        { id: 'assassin', name: 'Assassin', image: '/assets/heroes/portraits/flare/assassin.png', class: 'Assassin' },
        { id: 'enchanter', name: 'Enchanter', image: '/assets/heroes/portraits/flare/enchanter.png', class: 'Enchanter' },
        { id: 'witch', name: 'Witch', image: '/assets/heroes/portraits/flare/witch.png', class: 'Witch' },
        { id: 'shaman', name: 'Shaman', image: '/assets/heroes/portraits/flare/shaman.png', class: 'Shaman' },
        { id: 'templar', name: 'Templar', image: '/assets/heroes/portraits/flare/templar.png', class: 'Templar' },
        { id: 'dark_knight', name: 'Dark Knight', image: '/assets/heroes/portraits/flare/dark_knight.png', class: 'Dark Knight' },
        { id: 'battle_mage', name: 'Battle Mage', image: '/assets/heroes/portraits/flare/battle_mage.png', class: 'Battle Mage' }
      ];

      // Créatures avec le dragon rouge sauvegardé + autres
      const creatureList = [
        DRAGON_ROUGE, // Dragon rouge sauvegardé !
        { id: 'cyclops', name: 'Cyclops', image: '/assets/creatures/cyclops.png', tier: 6 },
        { id: 'demon', name: 'Demon', image: '/assets/creatures/demon.png', tier: 5 },
        { id: 'dragon_young', name: 'Young Dragon', image: '/assets/creatures/dragon_young.png', tier: 4 },
        { id: 'elementals', name: 'Elemental', image: '/assets/creatures/elementals.png', tier: 3 },
        { id: 'ghost', name: 'Ghost', image: '/assets/creatures/ghost.png', tier: 2 },
        { id: 'gorgon', name: 'Gorgon', image: '/assets/creatures/gorgon.png', tier: 5 },
        { id: 'harpy', name: 'Harpy', image: '/assets/creatures/harpy.png', tier: 3 },
        { id: 'hydra', name: 'Hydra', image: '/assets/creatures/hydra.png', tier: 6 },
        { id: 'imp', name: 'Imp', image: '/assets/creatures/imp.png', tier: 1 },
        { id: 'lava_beast', name: 'Lava Beast', image: '/assets/creatures/lava_beast.png', tier: 4 },
        { id: 'mermaid', name: 'Mermaid', image: '/assets/creatures/mermaid.png', tier: 2 },
        { id: 'minotaur', name: 'Minotaur', image: '/assets/creatures/minotaur.png', tier: 4 },
        { id: 'phoenix', name: 'Phoenix', image: '/assets/creatures/phoenix.png', tier: 7 },
        { id: 'shadow', name: 'Shadow', image: '/assets/creatures/shadow.png', tier: 3 },
        { id: 'skeleton', name: 'Skeleton', image: '/assets/creatures/skeleton.png', tier: 1 },
        { id: 'slime', name: 'Slime', image: '/assets/creatures/slime.png', tier: 1 },
        { id: 'spider', name: 'Giant Spider', image: '/assets/creatures/spider.png', tier: 2 },
        { id: 'troll', name: 'Troll', image: '/assets/creatures/troll.png', tier: 3 },
        { id: 'unicorn', name: 'Unicorn', image: '/assets/creatures/unicorn.png', tier: 5 },
        { id: 'vampire', name: 'Vampire', image: '/assets/creatures/vampire.png', tier: 4 },
        { id: 'werewolf', name: 'Werewolf', image: '/assets/creatures/werewolf.png', tier: 3 },
        { id: 'wyvern', name: 'Wyvern', image: '/assets/creatures/wyvern.png', tier: 5 },
        { id: 'yeti', name: 'Yeti', image: '/assets/creatures/yeti.png', tier: 4 },
        { id: 'zombie', name: 'Zombie', image: '/assets/creatures/zombie.png', tier: 1 },
        { id: 'acid_blob', name: 'Acid Blob', image: '/assets/creatures/acid_blob.png', tier: 2 },
        { id: 'beholder', name: 'Beholder', image: '/assets/creatures/beholder.png', tier: 6 },
        { id: 'chimera', name: 'Chimera', image: '/assets/creatures/chimera.png', tier: 6 }
      ];

      // Buildings (placeholders pour l'instant)
      const buildingList = [
        { id: 'castle', name: 'Castle', image: '', description: 'Main fortress' },
        { id: 'farm', name: 'Farm', image: '', description: 'Produces food' },
        { id: 'mine', name: 'Mine', image: '', description: 'Produces gold' },
        { id: 'barracks', name: 'Barracks', image: '', description: 'Trains units' },
        { id: 'mage_tower', name: 'Mage Tower', image: '', description: 'Research spells' },
        { id: 'market', name: 'Market', image: '', description: 'Trade resources' }
      ];

      // Objects magiques (avec emojis en attendant les assets)
      const objectList = [
        { 
          id: 'sword_excalibur', 
          name: 'Excalibur', 
          image: '', 
          emoji: '⚔️',
          description: 'Épée légendaire +5 Attaque, +2 Charisme',
          type: 'weapon',
          bonus: '+5 ATK, +2 CHA'
        },
        { 
          id: 'shield_dragon', 
          name: 'Bouclier du Dragon', 
          image: '', 
          emoji: '🛡️',
          description: 'Bouclier en écailles +3 Défense, Résistance Feu',
          type: 'armor',
          bonus: '+3 DEF, Résistance Feu'
        },
        { 
          id: 'ring_power', 
          name: 'Anneau de Pouvoir', 
          image: '', 
          emoji: '💍',
          description: 'Anneau mystique +2 tous les stats',
          type: 'accessory',
          bonus: '+2 Toutes Stats'
        },
        { 
          id: 'potion_life', 
          name: 'Potion de Vie', 
          image: '', 
          emoji: '🧪',
          description: 'Restaure 100 HP instantanément',
          type: 'consumable',
          bonus: '+100 HP'
        },
        { 
          id: 'scroll_fireball', 
          name: 'Parchemin Boule de Feu', 
          image: '', 
          emoji: '📜',
          description: 'Lance Boule de Feu (50 dégâts)',
          type: 'spell',
          bonus: '50 dégâts feu'
        },
        { 
          id: 'orb_wisdom', 
          name: 'Orbe de Sagesse', 
          image: '', 
          emoji: '🔮',
          description: 'Orbe magique +10 Mana, +3 Connaissance',
          type: 'artifact',
          bonus: '+10 MANA, +3 CON'
        },
        { 
          id: 'boots_speed', 
          name: 'Bottes de Vitesse', 
          image: '', 
          emoji: '👢',
          description: 'Bottes enchantées +2 Vitesse',
          type: 'armor',
          bonus: '+2 VIT'
        },
        { 
          id: 'crown_kings', 
          name: 'Couronne des Rois', 
          image: '', 
          emoji: '👑',
          description: 'Couronne royale +5 Leadership',
          type: 'artifact',
          bonus: '+5 LEAD'
        },
        { 
          id: 'amulet_life', 
          name: 'Amulette de Vie', 
          image: '', 
          emoji: '🔱',
          description: 'Amulette divine +50 HP max',
          type: 'accessory',
          bonus: '+50 HP max'
        },
        { 
          id: 'staff_archmage', 
          name: 'Bâton de l\'Archimage', 
          image: '', 
          emoji: '🪄',
          description: 'Bâton légendaire +8 Pouvoir Magique',
          type: 'weapon',
          bonus: '+8 MAG'
        },
        { 
          id: 'tome_knowledge', 
          name: 'Tome de Connaissance', 
          image: '', 
          emoji: '📚',
          description: 'Livre ancien +1 niveau permanent',
          type: 'consumable',
          bonus: '+1 Niveau'
        },
        { 
          id: 'gem_dragon', 
          name: 'Gemme du Dragon', 
          image: '', 
          emoji: '💎',
          description: 'Gemme rare +1000 Or par tour',
          type: 'artifact',
          bonus: '+1000 Or/tour'
        }
      ];

      setHeroAssets(heroList);
      setCreatureAssets(creatureList);
      setBuildingAssets(buildingList);
      setObjectAssets(objectList);
    } catch (error) {
      console.error('Error loading assets:', error);
    }
  };

  const renderCard = (asset: any, type: string) => {
    const isSpecial = asset.id === 'dragon-rouge';
    
    return (
      <div 
        key={asset.id} 
        className={`epic-view-card ${isSpecial ? 'dragon-rouge-special' : ''}`}
        style={isSpecial ? { 
          borderColor: DRAGON_ROUGE_CONFIG.borderColor,
          background: `linear-gradient(135deg, ${DRAGON_ROUGE_CONFIG.backgroundColor} 0%, rgba(40, 0, 0, 0.9) 100%)` 
        } : {}}
      >
        <div className="epic-view-card-title" style={isSpecial ? { color: DRAGON_ROUGE_CONFIG.color } : {}}>
          {isSpecial && DRAGON_ROUGE_CONFIG.emoji} {asset.name}
        </div>
        
        {asset.image || asset.spriteUrl ? (
          <img 
            src={asset.image || asset.spriteUrl} 
            alt={asset.name}
            className="epic-view-card-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = 'epic-view-card-fallback';
              fallback.textContent = getAssetEmoji(type, asset);
              target.parentNode?.appendChild(fallback);
            }}
          />
        ) : (
          <div className="epic-view-card-fallback">
            {getAssetEmoji(type, asset)}
          </div>
        )}
        
        <div className="epic-view-card-info">
          {type === 'heroes' && asset.class && (
            <div>Classe: {asset.class}</div>
          )}
          {type === 'creatures' && asset.tier && (
            <div>Tier: {asset.tier}</div>
          )}
          {type === 'creatures' && asset.attack && (
            <div>⚔️ {asset.attack} | 🛡️ {asset.defense} | 💓 {asset.health}</div>
          )}
          {asset.description && (
            <div className="epic-view-card-description">{asset.description}</div>
          )}
        </div>
      </div>
    );
  };

  const getAssetEmoji = (type: string, asset: any) => {
    if (type === 'heroes') return '🦸';
    if (type === 'creatures') {
      if (asset.id === 'dragon-rouge') return '🐉';
      if (asset.name.includes('Dragon')) return '🐲';
      if (asset.name.includes('Phoenix')) return '🔥';
      return '👹';
    }
    if (type === 'buildings') return '🏰';
    if (type === 'objects') {
      // Utilise l'emoji spécifique de l'objet s'il existe
      return asset.emoji || '⚔️';
    }
    return '❓';
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'heroes':
        return (
          <div>
            <div className="epic-view-section-title">🦸 Héros Légendaires</div>
            <div className="epic-view-grid">
              {heroAssets.map(asset => renderCard(asset, 'heroes'))}
            </div>
          </div>
        );
      case 'creatures':
        return (
          <div>
            <div className="epic-view-section-title">👹 Créatures Épiques</div>
            <div className="epic-view-grid">
              {creatureAssets.map(asset => renderCard(asset, 'creatures'))}
            </div>
          </div>
        );
      case 'buildings':
        return (
          <div>
            <div className="epic-view-section-title">🏰 Bâtiments</div>
            <div className="epic-view-placeholder">
              <div className="epic-view-placeholder-icon">🏗️</div>
              <p>Bâtiments à venir...</p>
            </div>
          </div>
        );
      case 'objects':
        return (
          <div>
            <div className="epic-view-section-title">⚔️ Objets Magiques</div>
            <div className="epic-view-grid">
              {objectAssets.map(asset => (
                <div key={asset.id} className="epic-view-card">
                  <div className="epic-view-card-title">
                    {asset.emoji} {asset.name}
                  </div>
                  {asset.image || asset.spriteUrl ? (
                    <img 
                      src={asset.image || asset.spriteUrl} 
                      alt={asset.name}
                      className="epic-view-card-image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'epic-view-card-fallback';
                        fallback.textContent = asset.emoji;
                        target.parentNode?.appendChild(fallback);
                      }}
                    />
                  ) : (
                    <div className="epic-view-card-fallback">
                      {asset.emoji}
                    </div>
                  )}
                  <div className="epic-view-card-info">
                    <div>{asset.description}</div>
                    <div>Bonus: {asset.bonus}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="epic-view-overlay" onClick={onClose}>
      <div className="epic-view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="epic-view-header">
          <h2 className="epic-view-title">🎮 Contenu Épique - Heroes of Time</h2>
          <button className="epic-view-close" onClick={onClose}>
            ✕ Fermer
          </button>
        </div>
        
        <div className="epic-view-tabs">
          <button
            className={`epic-view-tab ${activeTab === 'heroes' ? 'active' : ''}`}
            onClick={() => setActiveTab('heroes')}
          >
            🦸 Héros ({heroAssets.length})
          </button>
          <button
            className={`epic-view-tab ${activeTab === 'creatures' ? 'active' : ''}`}
            onClick={() => setActiveTab('creatures')}
          >
            👹 Créatures ({creatureAssets.length})
          </button>
          <button
            className={`epic-view-tab ${activeTab === 'buildings' ? 'active' : ''}`}
            onClick={() => setActiveTab('buildings')}
          >
            🏰 Bâtiments ({buildingAssets.length})
          </button>
          <button
            className={`epic-view-tab ${activeTab === 'objects' ? 'active' : ''}`}
            onClick={() => setActiveTab('objects')}
          >
            ⚔️ Objets ({objectAssets.length})
          </button>
        </div>
        
        <div className="epic-view-content">
          {getTabContent()}
        </div>
      </div>
    </div>
  );
};

export default EpicView; 