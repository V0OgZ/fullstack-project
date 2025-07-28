package com.example.demo.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "buildings")
public class Building {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "building_id", unique = true, nullable = false)
    private String buildingId;
    
    @Column(name = "castle_id", nullable = false)
    private String castleId;
    
    @Column(name = "player_id", nullable = false)
    private String playerId;
    
    @Column(name = "game_id", nullable = false)
    private String gameId;
    
    @Column(name = "building_type", nullable = false)
    private String buildingType;
    
    @Column(name = "level", nullable = false)
    private Integer level;
    
    @Column(name = "max_level", nullable = false)
    private Integer maxLevel;
    
    @Column(name = "position_x", nullable = false)
    private Integer positionX;
    
    @Column(name = "position_y", nullable = false)
    private Integer positionY;
    
    @Column(name = "construction_started", nullable = false)
    private LocalDateTime constructionStarted;
    
    @Column(name = "construction_completed")
    private LocalDateTime constructionCompleted;
    
    @Column(name = "is_constructed", nullable = false)
    private Boolean isConstructed;
    
    @Column(name = "construction_time", nullable = false)
    private Integer constructionTime; // in seconds
    
    // Resource costs for current level
    @Column(name = "gold_cost", nullable = false)
    private Integer goldCost;
    
    @Column(name = "wood_cost")
    private Integer woodCost;
    
    @Column(name = "stone_cost")
    private Integer stoneCost;
    
    @Column(name = "ore_cost")
    private Integer oreCost;
    
    @Column(name = "crystal_cost")
    private Integer crystalCost;
    
    @Column(name = "gems_cost")
    private Integer gemsCost;
    
    @Column(name = "sulfur_cost")
    private Integer sulfurCost;
    
    // Building effects
    @Column(name = "daily_gold_bonus")
    private Integer dailyGoldBonus;
    
    @Column(name = "daily_resource_bonus")
    private Integer dailyResourceBonus;
    
    @Column(name = "unit_production_bonus")
    private Integer unitProductionBonus;
    
    @Column(name = "defense_bonus")
    private Integer defenseBonus;
    
    @Column(name = "morale_bonus")
    private Integer moraleBonus;
    
    @Column(name = "luck_bonus")
    private Integer luckBonus;
    
    // Unit recruitment for military buildings
    @ElementCollection
    @CollectionTable(name = "building_unit_types", joinColumns = @JoinColumn(name = "building_id"))
    @Column(name = "unit_type")
    private List<String> recruitableUnits;
    
    @Column(name = "weekly_growth")
    private Integer weeklyGrowth;
    
    @Column(name = "current_units_available")
    private Integer currentUnitsAvailable;
    
    @Column(name = "last_recruitment_reset")
    private LocalDateTime lastRecruitmentReset;
    
    // Spell-related for magic buildings
    @ElementCollection
    @CollectionTable(name = "building_spells", joinColumns = @JoinColumn(name = "building_id"))
    @Column(name = "spell_id")
    private List<String> availableSpells;
    
    @Column(name = "spell_power_bonus")
    private Integer spellPowerBonus;
    
    @Column(name = "mana_regeneration_bonus")
    private Integer manaRegenerationBonus;
    
    // Constructors
    public Building() {
        this.recruitableUnits = new ArrayList<>();
        this.availableSpells = new ArrayList<>();
        this.level = 1;
        this.maxLevel = 5;
        this.isConstructed = false;
        this.constructionStarted = LocalDateTime.now();
        this.currentUnitsAvailable = 0;
        this.lastRecruitmentReset = LocalDateTime.now();
    }
    
    public Building(String buildingId, String castleId, String playerId, String gameId,
                   String buildingType, Integer positionX, Integer positionY) {
        this();
        this.buildingId = buildingId;
        this.castleId = castleId;
        this.playerId = playerId;
        this.gameId = gameId;
        this.buildingType = buildingType;
        this.positionX = positionX;
        this.positionY = positionY;
        
        // Set default values based on building type
        setBuildingDefaults();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getBuildingId() { return buildingId; }
    public void setBuildingId(String buildingId) { this.buildingId = buildingId; }
    
    public String getCastleId() { return castleId; }
    public void setCastleId(String castleId) { this.castleId = castleId; }
    
    public String getPlayerId() { return playerId; }
    public void setPlayerId(String playerId) { this.playerId = playerId; }
    
    public String getGameId() { return gameId; }
    public void setGameId(String gameId) { this.gameId = gameId; }
    
    public String getBuildingType() { return buildingType; }
    public void setBuildingType(String buildingType) { this.buildingType = buildingType; }
    
    public Integer getLevel() { return level; }
    public void setLevel(Integer level) { this.level = level; }
    
    public Integer getMaxLevel() { return maxLevel; }
    public void setMaxLevel(Integer maxLevel) { this.maxLevel = maxLevel; }
    
    public Integer getPositionX() { return positionX; }
    public void setPositionX(Integer positionX) { this.positionX = positionX; }
    
    public Integer getPositionY() { return positionY; }
    public void setPositionY(Integer positionY) { this.positionY = positionY; }
    
    public LocalDateTime getConstructionStarted() { return constructionStarted; }
    public void setConstructionStarted(LocalDateTime constructionStarted) { this.constructionStarted = constructionStarted; }
    
    public LocalDateTime getConstructionCompleted() { return constructionCompleted; }
    public void setConstructionCompleted(LocalDateTime constructionCompleted) { this.constructionCompleted = constructionCompleted; }
    
    public Boolean getIsConstructed() { return isConstructed; }
    public void setIsConstructed(Boolean isConstructed) { this.isConstructed = isConstructed; }
    
    public Integer getConstructionTime() { return constructionTime; }
    public void setConstructionTime(Integer constructionTime) { this.constructionTime = constructionTime; }
    
    public Integer getGoldCost() { return goldCost; }
    public void setGoldCost(Integer goldCost) { this.goldCost = goldCost; }
    
    public Integer getWoodCost() { return woodCost; }
    public void setWoodCost(Integer woodCost) { this.woodCost = woodCost; }
    
    public Integer getStoneCost() { return stoneCost; }
    public void setStoneCost(Integer stoneCost) { this.stoneCost = stoneCost; }
    
    public Integer getOreCost() { return oreCost; }
    public void setOreCost(Integer oreCost) { this.oreCost = oreCost; }
    
    public Integer getCrystalCost() { return crystalCost; }
    public void setCrystalCost(Integer crystalCost) { this.crystalCost = crystalCost; }
    
    public Integer getGemsCost() { return gemsCost; }
    public void setGemsCost(Integer gemsCost) { this.gemsCost = gemsCost; }
    
    public Integer getSulfurCost() { return sulfurCost; }
    public void setSulfurCost(Integer sulfurCost) { this.sulfurCost = sulfurCost; }
    
    public Integer getDailyGoldBonus() { return dailyGoldBonus; }
    public void setDailyGoldBonus(Integer dailyGoldBonus) { this.dailyGoldBonus = dailyGoldBonus; }
    
    public Integer getDailyResourceBonus() { return dailyResourceBonus; }
    public void setDailyResourceBonus(Integer dailyResourceBonus) { this.dailyResourceBonus = dailyResourceBonus; }
    
    public Integer getUnitProductionBonus() { return unitProductionBonus; }
    public void setUnitProductionBonus(Integer unitProductionBonus) { this.unitProductionBonus = unitProductionBonus; }
    
    public Integer getDefenseBonus() { return defenseBonus; }
    public void setDefenseBonus(Integer defenseBonus) { this.defenseBonus = defenseBonus; }
    
    public Integer getMoraleBonus() { return moraleBonus; }
    public void setMoraleBonus(Integer moraleBonus) { this.moraleBonus = moraleBonus; }
    
    public Integer getLuckBonus() { return luckBonus; }
    public void setLuckBonus(Integer luckBonus) { this.luckBonus = luckBonus; }
    
    public List<String> getRecruitableUnits() { return recruitableUnits; }
    public void setRecruitableUnits(List<String> recruitableUnits) { this.recruitableUnits = recruitableUnits; }
    
    public Integer getWeeklyGrowth() { return weeklyGrowth; }
    public void setWeeklyGrowth(Integer weeklyGrowth) { this.weeklyGrowth = weeklyGrowth; }
    
    public Integer getCurrentUnitsAvailable() { return currentUnitsAvailable; }
    public void setCurrentUnitsAvailable(Integer currentUnitsAvailable) { this.currentUnitsAvailable = currentUnitsAvailable; }
    
    public LocalDateTime getLastRecruitmentReset() { return lastRecruitmentReset; }
    public void setLastRecruitmentReset(LocalDateTime lastRecruitmentReset) { this.lastRecruitmentReset = lastRecruitmentReset; }
    
    public List<String> getAvailableSpells() { return availableSpells; }
    public void setAvailableSpells(List<String> availableSpells) { this.availableSpells = availableSpells; }
    
    public Integer getSpellPowerBonus() { return spellPowerBonus; }
    public void setSpellPowerBonus(Integer spellPowerBonus) { this.spellPowerBonus = spellPowerBonus; }
    
    public Integer getManaRegenerationBonus() { return manaRegenerationBonus; }
    public void setManaRegenerationBonus(Integer manaRegenerationBonus) { this.manaRegenerationBonus = manaRegenerationBonus; }
    
    // Helper methods
    public boolean canUpgrade() {
        return level < maxLevel && isConstructed;
    }
    
    public boolean isUnderConstruction() {
        return !isConstructed && constructionStarted != null;
    }
    
    public void addRecruitableUnit(String unitType) {
        if (!recruitableUnits.contains(unitType)) {
            recruitableUnits.add(unitType);
        }
    }
    
    public void resetWeeklyGrowth() {
        this.currentUnitsAvailable = weeklyGrowth;
        this.lastRecruitmentReset = LocalDateTime.now();
    }
    
    public void completeConstruction() {
        this.isConstructed = true;
        this.constructionCompleted = LocalDateTime.now();
    }
    
    public void upgradeLevel() {
        if (canUpgrade()) {
            this.level++;
            setBuildingDefaults(); // Recalculate bonuses for new level
        }
    }
    
    private void setBuildingDefaults() {
        switch (buildingType) {
            case "town_hall":
                setTownHallDefaults();
                break;
            case "barracks":
                setBarracksDefaults();
                break;
            case "archery_range":
                setArcheryRangeDefaults();
                break;
            case "magic_guild":
                setMagicGuildDefaults();
                break;
            case "marketplace":
                setMarketplaceDefaults();
                break;
            case "blacksmith":
                setBlacksmithDefaults();
                break;
            case "tavern":
                setTavernDefaults();
                break;
            case "castle_walls":
                setCastleWallsDefaults();
                break;
            default:
                setGenericDefaults();
        }
    }
    
    private void setTownHallDefaults() {
        this.maxLevel = 5;
        this.constructionTime = 120; // 2 minutes
        this.goldCost = 2000 + (level * 1000);
        this.woodCost = 10 + (level * 5);
        this.stoneCost = 10 + (level * 5);
        this.dailyGoldBonus = 500 + (level * 250);
        this.defenseBonus = level * 2;
    }
    
    private void setBarracksDefaults() {
        this.maxLevel = 3;
        this.constructionTime = 60; // 1 minute
        this.goldCost = 1000 + (level * 500);
        this.woodCost = 20 + (level * 10);
        this.stoneCost = 5 + (level * 5);
        this.unitProductionBonus = level * 2;
        this.weeklyGrowth = 10 + (level * 5);
        this.recruitableUnits.add("castle_pikeman_basic");
        if (level >= 2) this.recruitableUnits.add("castle_pikeman_upgraded");
        if (level >= 3) this.recruitableUnits.add("castle_pikeman_champion");
    }
    
    private void setArcheryRangeDefaults() {
        this.maxLevel = 3;
        this.constructionTime = 60;
        this.goldCost = 1500 + (level * 750);
        this.woodCost = 30 + (level * 15);
        this.stoneCost = 10 + (level * 5);
        this.unitProductionBonus = level * 2;
        this.weeklyGrowth = 8 + (level * 4);
        this.recruitableUnits.add("castle_archer_basic");
        if (level >= 2) this.recruitableUnits.add("castle_archer_upgraded");
        if (level >= 3) this.recruitableUnits.add("castle_archer_champion");
    }
    
    private void setMagicGuildDefaults() {
        this.maxLevel = 5;
        this.constructionTime = 90;
        this.goldCost = 3000 + (level * 1500);
        this.crystalCost = 5 + (level * 3);
        this.gemsCost = 3 + (level * 2);
        this.sulfurCost = 3 + (level * 2);
        this.spellPowerBonus = level * 3;
        this.manaRegenerationBonus = level * 2;
        // Add spells based on level
        if (level >= 1) this.availableSpells.add("magic_arrow");
        if (level >= 2) this.availableSpells.add("bless");
        if (level >= 3) this.availableSpells.add("fireball");
        if (level >= 4) this.availableSpells.add("lightning_bolt");
        if (level >= 5) this.availableSpells.add("meteor_shower");
    }
    
    private void setMarketplaceDefaults() {
        this.maxLevel = 2;
        this.constructionTime = 45;
        this.goldCost = 500 + (level * 250);
        this.woodCost = 15 + (level * 10);
        this.stoneCost = 5 + (level * 5);
        this.dailyGoldBonus = 200 + (level * 100);
        this.dailyResourceBonus = level * 2;
    }
    
    private void setBlacksmithDefaults() {
        this.maxLevel = 2;
        this.constructionTime = 45;
        this.goldCost = 1000 + (level * 500);
        this.oreCost = 10 + (level * 5);
        this.stoneCost = 5 + (level * 5);
        this.unitProductionBonus = level * 3;
        this.defenseBonus = level * 2;
    }
    
    private void setTavernDefaults() {
        this.maxLevel = 2;
        this.constructionTime = 30;
        this.goldCost = 300 + (level * 150);
        this.woodCost = 10 + (level * 5);
        this.moraleBonus = level * 2;
        this.luckBonus = level * 1;
    }
    
    private void setCastleWallsDefaults() {
        this.maxLevel = 3;
        this.constructionTime = 120;
        this.goldCost = 2000 + (level * 1000);
        this.stoneCost = 50 + (level * 25);
        this.oreCost = 20 + (level * 10);
        this.defenseBonus = level * 10;
    }
    
    private void setGenericDefaults() {
        this.maxLevel = 3;
        this.constructionTime = 60;
        this.goldCost = 1000 + (level * 500);
        this.woodCost = 10 + (level * 5);
        this.stoneCost = 10 + (level * 5);
    }
} 