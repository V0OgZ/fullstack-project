package com.example.demo.service;

import com.example.demo.model.Unit;
import com.example.demo.model.Position;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class MagicItemService {
    
    public static class MagicItem {
        private String id;
        private String name;
        private String description;
        private String type;
        private String rarity;
        private int value;
        private Map<String, Object> effects;
        private String slot;
        private Integer requiresLevel;
        private boolean temporal;
        
        // Constructors, getters, and setters
        public MagicItem() {}
        
        public MagicItem(String id, String name, String description, String type, String rarity, 
                        int value, Map<String, Object> effects, String slot, Integer requiresLevel, boolean temporal) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.type = type;
            this.rarity = rarity;
            this.value = value;
            this.effects = effects;
            this.slot = slot;
            this.requiresLevel = requiresLevel;
            this.temporal = temporal;
        }
        
        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        
        public String getRarity() { return rarity; }
        public void setRarity(String rarity) { this.rarity = rarity; }
        
        public int getValue() { return value; }
        public void setValue(int value) { this.value = value; }
        
        public Map<String, Object> getEffects() { return effects; }
        public void setEffects(Map<String, Object> effects) { this.effects = effects; }
        
        public String getSlot() { return slot; }
        public void setSlot(String slot) { this.slot = slot; }
        
        public Integer getRequiresLevel() { return requiresLevel; }
        public void setRequiresLevel(Integer requiresLevel) { this.requiresLevel = requiresLevel; }
        
        public boolean isTemporal() { return temporal; }
        public void setTemporal(boolean temporal) { this.temporal = temporal; }
    }
    
    public static class ItemEffectResult {
        private boolean success;
        private String message;
        private Map<String, Object> effectsApplied;
        
        public ItemEffectResult(boolean success, String message, Map<String, Object> effectsApplied) {
            this.success = success;
            this.message = message;
            this.effectsApplied = effectsApplied;
        }
        
        // Getters and setters
        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }
        
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        
        public Map<String, Object> getEffectsApplied() { return effectsApplied; }
        public void setEffectsApplied(Map<String, Object> effectsApplied) { this.effectsApplied = effectsApplied; }
    }
    
    public static class HeroStats {
        private int attack;
        private int defense;
        private int knowledge;
        private int spellPower;
        private int movementPoints;
        private int mana;
        private int temporalMana;
        private int experience;
        
        public HeroStats() {}
        
        public HeroStats(int attack, int defense, int knowledge, int spellPower, 
                        int movementPoints, int mana, int temporalMana, int experience) {
            this.attack = attack;
            this.defense = defense;
            this.knowledge = knowledge;
            this.spellPower = spellPower;
            this.movementPoints = movementPoints;
            this.mana = mana;
            this.temporalMana = temporalMana;
            this.experience = experience;
        }
        
        // Getters and setters
        public int getAttack() { return attack; }
        public void setAttack(int attack) { this.attack = attack; }
        
        public int getDefense() { return defense; }
        public void setDefense(int defense) { this.defense = defense; }
        
        public int getKnowledge() { return knowledge; }
        public void setKnowledge(int knowledge) { this.knowledge = knowledge; }
        
        public int getSpellPower() { return spellPower; }
        public void setSpellPower(int spellPower) { this.spellPower = spellPower; }
        
        public int getMovementPoints() { return movementPoints; }
        public void setMovementPoints(int movementPoints) { this.movementPoints = movementPoints; }
        
        public int getMana() { return mana; }
        public void setMana(int mana) { this.mana = mana; }
        
        public int getTemporalMana() { return temporalMana; }
        public void setTemporalMana(int temporalMana) { this.temporalMana = temporalMana; }
        
        public int getExperience() { return experience; }
        public void setExperience(int experience) { this.experience = experience; }
    }
    
    public static class Hero {
        private String id;
        private String name;
        private Position position;
        private int level;
        private int experience;
        private int movementPoints;
        private int maxMovementPoints;
        private HeroStats stats;
        private String playerId;
        private List<Unit> units;
        private List<String> inventory;
        
        public Hero() {}
        
        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public Position getPosition() { return position; }
        public void setPosition(Position position) { this.position = position; }
        
        public int getLevel() { return level; }
        public void setLevel(int level) { this.level = level; }
        
        public int getExperience() { return experience; }
        public void setExperience(int experience) { this.experience = experience; }
        
        public int getMovementPoints() { return movementPoints; }
        public void setMovementPoints(int movementPoints) { this.movementPoints = movementPoints; }
        
        public int getMaxMovementPoints() { return maxMovementPoints; }
        public void setMaxMovementPoints(int maxMovementPoints) { this.maxMovementPoints = maxMovementPoints; }
        
        public HeroStats getStats() { return stats; }
        public void setStats(HeroStats stats) { this.stats = stats; }
        
        public String getPlayerId() { return playerId; }
        public void setPlayerId(String playerId) { this.playerId = playerId; }
        
        public List<Unit> getUnits() { return units; }
        public void setUnits(List<Unit> units) { this.units = units; }
        
        public List<String> getInventory() { return inventory; }
        public void setInventory(List<String> inventory) { this.inventory = inventory; }
    }
    
    // Magic items database (in real app, this would be in a database)
    private static final Map<String, MagicItem> MAGIC_ITEMS = new HashMap<>();
    
    static {
        // Initialize magic items
        initializeMagicItems();
    }
    
    private static void initializeMagicItems() {
        // Weapons
        Map<String, Object> swordBasicEffects = new HashMap<>();
        swordBasicEffects.put("attack", 2);
        MAGIC_ITEMS.put("sword_basic", new MagicItem("sword_basic", "Basic Sword", "A simple and robust sword.", 
            "weapon", "common", 100, swordBasicEffects, "weapon", null, false));
        
        Map<String, Object> swordLegendaryEffects = new HashMap<>();
        swordLegendaryEffects.put("attack", 12);
        swordLegendaryEffects.put("defense", 3);
        swordLegendaryEffects.put("specialEffect", "Critical hits deal double damage");
        MAGIC_ITEMS.put("sword_legendary", new MagicItem("sword_legendary", "Legendary Blade", "A legendary sword of immense power.", 
            "weapon", "legendary", 2000, swordLegendaryEffects, "weapon", 10, false));
        
        // Armor
        Map<String, Object> armorLeatherEffects = new HashMap<>();
        armorLeatherEffects.put("defense", 2);
        MAGIC_ITEMS.put("armor_leather", new MagicItem("armor_leather", "Leather Armor", "Basic protection made of leather.", 
            "armor", "common", 80, armorLeatherEffects, "armor", null, false));
        
        // Accessories
        Map<String, Object> ringPowerEffects = new HashMap<>();
        ringPowerEffects.put("spellPower", 3);
        ringPowerEffects.put("mana", 10);
        MAGIC_ITEMS.put("ring_power", new MagicItem("ring_power", "Ring of Power", "A ring that enhances magical abilities.", 
            "accessory", "rare", 300, ringPowerEffects, "ring", null, false));
        
        Map<String, Object> bootsSpeedEffects = new HashMap<>();
        bootsSpeedEffects.put("movementPoints", 2);
        MAGIC_ITEMS.put("boots_speed", new MagicItem("boots_speed", "Boots of Speed", "Boots that increase movement speed.", 
            "accessory", "uncommon", 150, bootsSpeedEffects, "boots", null, false));
        
        // Consumables
        Map<String, Object> potionHealthEffects = new HashMap<>();
        potionHealthEffects.put("mana", 50);
        MAGIC_ITEMS.put("potion_health", new MagicItem("potion_health", "Health Potion", "Restores health and mana.", 
            "consumable", "common", 25, potionHealthEffects, null, null, false));
        
        Map<String, Object> potionManaEffects = new HashMap<>();
        potionManaEffects.put("mana", 100);
        MAGIC_ITEMS.put("potion_mana", new MagicItem("potion_mana", "Mana Potion", "Restores magical energy.", 
            "consumable", "common", 50, potionManaEffects, null, null, false));
        
        // Temporal items
        Map<String, Object> temporalAnchorEffects = new HashMap<>();
        temporalAnchorEffects.put("temporalMana", 25);
        temporalAnchorEffects.put("specialEffect", "Stabilizes temporal fluctuations");
        MAGIC_ITEMS.put("temporal_anchor", new MagicItem("temporal_anchor", "Temporal Anchor", "An artifact that stabilizes time.", 
            "temporal", "temporal", 1500, temporalAnchorEffects, "amulet", 5, true));
        
        Map<String, Object> temporalPrismEffects = new HashMap<>();
        temporalPrismEffects.put("temporalMana", 50);
        temporalPrismEffects.put("spellPower", 5);
        temporalPrismEffects.put("specialEffect", "Allows viewing of temporal shadows");
        MAGIC_ITEMS.put("temporal_prism", new MagicItem("temporal_prism", "Temporal Prism", "A prism that reveals temporal layers.", 
            "temporal", "temporal", 2500, temporalPrismEffects, "amulet", 8, true));
    }
    
    /**
     * Get all magic items
     */
    public List<MagicItem> getAllMagicItems() {
        return new ArrayList<>(MAGIC_ITEMS.values());
    }
    
    /**
     * Get magic item by ID
     */
    public MagicItem getMagicItem(String itemId) {
        return MAGIC_ITEMS.get(itemId);
    }
    
    /**
     * Apply magic item effects to a hero's stats
     */
    public Hero applyItemEffectsToHero(Hero hero, Map<String, String> equippedItems) {
        Hero enhancedHero = new Hero();
        enhancedHero.setId(hero.getId());
        enhancedHero.setName(hero.getName());
        enhancedHero.setPosition(hero.getPosition());
        enhancedHero.setLevel(hero.getLevel());
        enhancedHero.setExperience(hero.getExperience());
        enhancedHero.setMovementPoints(hero.getMovementPoints());
        enhancedHero.setMaxMovementPoints(hero.getMaxMovementPoints());
        enhancedHero.setPlayerId(hero.getPlayerId());
        enhancedHero.setUnits(hero.getUnits());
        enhancedHero.setInventory(hero.getInventory());
        
        // Calculate total effects from equipped items
        HeroStats totalEffects = new HeroStats(0, 0, 0, 0, 0, 0, 0, 0);
        
        for (String itemId : equippedItems.values()) {
            if (itemId != null) {
                MagicItem item = MAGIC_ITEMS.get(itemId);
                if (item != null && item.getEffects() != null) {
                    Map<String, Object> effects = item.getEffects();
                    totalEffects.setAttack(totalEffects.getAttack() + getIntEffect(effects, "attack"));
                    totalEffects.setDefense(totalEffects.getDefense() + getIntEffect(effects, "defense"));
                    totalEffects.setKnowledge(totalEffects.getKnowledge() + getIntEffect(effects, "knowledge"));
                    totalEffects.setSpellPower(totalEffects.getSpellPower() + getIntEffect(effects, "spellPower"));
                    totalEffects.setMovementPoints(totalEffects.getMovementPoints() + getIntEffect(effects, "movementPoints"));
                    totalEffects.setMana(totalEffects.getMana() + getIntEffect(effects, "mana"));
                    totalEffects.setTemporalMana(totalEffects.getTemporalMana() + getIntEffect(effects, "temporalMana"));
                    totalEffects.setExperience(totalEffects.getExperience() + getIntEffect(effects, "experience"));
                }
            }
        }
        
        // Apply effects to hero stats
        HeroStats originalStats = hero.getStats();
        HeroStats enhancedStats = new HeroStats(
            (originalStats != null ? originalStats.getAttack() : 0) + totalEffects.getAttack(),
            (originalStats != null ? originalStats.getDefense() : 0) + totalEffects.getDefense(),
            (originalStats != null ? originalStats.getKnowledge() : 0) + totalEffects.getKnowledge(),
            (originalStats != null ? originalStats.getSpellPower() : 0) + totalEffects.getSpellPower(),
            (originalStats != null ? originalStats.getMovementPoints() : 0) + totalEffects.getMovementPoints(),
            (originalStats != null ? originalStats.getMana() : 0) + totalEffects.getMana(),
            (originalStats != null ? originalStats.getTemporalMana() : 0) + totalEffects.getTemporalMana(),
            (originalStats != null ? originalStats.getExperience() : 0) + totalEffects.getExperience()
        );
        
        enhancedHero.setStats(enhancedStats);
        
        // Apply movement points bonus
        enhancedHero.setMaxMovementPoints(hero.getMaxMovementPoints() + (totalEffects.getMovementPoints() * 100));
        enhancedHero.setMovementPoints(Math.min(hero.getMovementPoints(), enhancedHero.getMaxMovementPoints()));
        
        return enhancedHero;
    }
    
    /**
     * Validate if an item can be equipped by a hero
     */
    public ItemEffectResult validateEquipItem(String itemId, int heroLevel) {
        MagicItem item = MAGIC_ITEMS.get(itemId);
        
        if (item == null) {
            return new ItemEffectResult(false, "Item " + itemId + " not found", null);
        }
        
        // Check level requirement
        if (item.getRequiresLevel() != null && heroLevel < item.getRequiresLevel()) {
            return new ItemEffectResult(false, 
                "Requires level " + item.getRequiresLevel() + " (current: " + heroLevel + ")", null);
        }
        
        return new ItemEffectResult(true, item.getName() + " equipped successfully!", item.getEffects());
    }
    
    /**
     * Consume a consumable item
     */
    public ItemEffectResult consumeItem(String itemId, Hero hero, int playerGold) {
        MagicItem item = MAGIC_ITEMS.get(itemId);
        
        if (item == null) {
            return new ItemEffectResult(false, "Item " + itemId + " not found", null);
        }
        
        if (!"consumable".equals(item.getType())) {
            return new ItemEffectResult(false, item.getName() + " is not a consumable item", null);
        }
        
        // Check if player can afford it
        if (item.getValue() > playerGold) {
            return new ItemEffectResult(false, 
                "Not enough gold (need " + item.getValue() + ", have " + playerGold + ")", null);
        }
        
        String message = "Used " + item.getName();
        Map<String, Object> effectsApplied = new HashMap<>();
        
        // Apply consumable effects
        if (item.getEffects() != null) {
            Map<String, Object> effects = item.getEffects();
            if (effects.containsKey("mana")) {
                effectsApplied.put("mana", effects.get("mana"));
                message += " (+" + effects.get("mana") + " mana)";
            }
            if (effects.containsKey("experience")) {
                effectsApplied.put("experience", effects.get("experience"));
                message += " (+" + effects.get("experience") + " XP)";
            }
            if (effects.containsKey("specialEffect")) {
                message += " - " + effects.get("specialEffect");
            }
        }
        
        return new ItemEffectResult(true, message, effectsApplied);
    }
    
    /**
     * Calculate temporal effects from equipped items
     */
    public Map<String, Object> calculateTemporalEffects(Map<String, String> equippedItems) {
        int temporalMana = 0;
        List<String> temporalEffects = new ArrayList<>();
        
        for (String itemId : equippedItems.values()) {
            if (itemId != null) {
                MagicItem item = MAGIC_ITEMS.get(itemId);
                if (item != null && item.isTemporal() && item.getEffects() != null) {
                    Map<String, Object> effects = item.getEffects();
                    temporalMana += getIntEffect(effects, "temporalMana");
                    
                    if (effects.containsKey("specialEffect")) {
                        temporalEffects.add(item.getName() + ": " + effects.get("specialEffect"));
                    }
                }
            }
        }
        
        Map<String, Object> result = new HashMap<>();
        result.put("temporalMana", temporalMana);
        result.put("temporalEffects", temporalEffects);
        return result;
    }
    
    /**
     * Get total stat bonuses from equipped items
     */
    public Map<String, Object> getTotalItemBonuses(Map<String, String> equippedItems) {
        Map<String, Object> totalBonuses = new HashMap<>();
        totalBonuses.put("attack", 0);
        totalBonuses.put("defense", 0);
        totalBonuses.put("knowledge", 0);
        totalBonuses.put("spellPower", 0);
        totalBonuses.put("movementPoints", 0);
        totalBonuses.put("specialEffects", new ArrayList<String>());
        
        for (String itemId : equippedItems.values()) {
            if (itemId != null) {
                MagicItem item = MAGIC_ITEMS.get(itemId);
                if (item != null && item.getEffects() != null) {
                    Map<String, Object> effects = item.getEffects();
                    
                    totalBonuses.put("attack", (Integer) totalBonuses.get("attack") + getIntEffect(effects, "attack"));
                    totalBonuses.put("defense", (Integer) totalBonuses.get("defense") + getIntEffect(effects, "defense"));
                    totalBonuses.put("knowledge", (Integer) totalBonuses.get("knowledge") + getIntEffect(effects, "knowledge"));
                    totalBonuses.put("spellPower", (Integer) totalBonuses.get("spellPower") + getIntEffect(effects, "spellPower"));
                    totalBonuses.put("movementPoints", (Integer) totalBonuses.get("movementPoints") + getIntEffect(effects, "movementPoints"));
                    
                    if (effects.containsKey("specialEffect")) {
                        @SuppressWarnings("unchecked")
                        List<String> specialEffects = (List<String>) totalBonuses.get("specialEffects");
                        specialEffects.add(item.getName() + ": " + effects.get("specialEffect"));
                    }
                }
            }
        }
        
        return totalBonuses;
    }
    
    private int getIntEffect(Map<String, Object> effects, String key) {
        Object value = effects.get(key);
        if (value instanceof Integer) {
            return (Integer) value;
        }
        return 0;
    }
} 