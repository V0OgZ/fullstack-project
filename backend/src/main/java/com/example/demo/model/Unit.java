package com.example.demo.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "units")
public class Unit {
    
    @Id
    private String id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String castle;
    
    @Column(nullable = false)
    private Integer tier;
    
    @Column(nullable = false)
    private String variant;
    
    // Stats
    @Column(nullable = false)
    private Integer attack;
    
    @Column(nullable = false)
    private Integer defense;
    
    @Column(nullable = false)
    private Integer health;
    
    @Column(nullable = false)
    private Integer minDamage;
    
    @Column(nullable = false)
    private Integer maxDamage;
    
    @Column(nullable = false)
    private Integer speed;
    
    @Column
    private Integer shots;
    
    // Costs
    @Column
    private Integer goldCost;
    
    @Column
    private Integer woodCost;
    
    @Column
    private Integer stoneCost;
    
    @Column
    private Integer oreCost;
    
    @Column
    private Integer crystalCost;
    
    @Column
    private Integer gemsCost;
    
    @Column
    private Integer sulfurCost;
    
    @Column(nullable = false)
    private Integer growth;
    
    @Column(nullable = false)
    private Integer aiValue;
    
    @ElementCollection
    @CollectionTable(name = "unit_abilities", joinColumns = @JoinColumn(name = "unit_id"))
    private List<String> abilities;
    
    // Constructors
    public Unit() {}
    
    public Unit(String id, String name, String castle, Integer tier, String variant,
                Integer attack, Integer defense, Integer health, Integer minDamage, Integer maxDamage,
                Integer speed, Integer growth, Integer aiValue) {
        this.id = id;
        this.name = name;
        this.castle = castle;
        this.tier = tier;
        this.variant = variant;
        this.attack = attack;
        this.defense = defense;
        this.health = health;
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.speed = speed;
        this.growth = growth;
        this.aiValue = aiValue;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getCastle() { return castle; }
    public void setCastle(String castle) { this.castle = castle; }
    
    public Integer getTier() { return tier; }
    public void setTier(Integer tier) { this.tier = tier; }
    
    public String getVariant() { return variant; }
    public void setVariant(String variant) { this.variant = variant; }
    
    public Integer getAttack() { return attack; }
    public void setAttack(Integer attack) { this.attack = attack; }
    
    public Integer getDefense() { return defense; }
    public void setDefense(Integer defense) { this.defense = defense; }
    
    public Integer getHealth() { return health; }
    public void setHealth(Integer health) { this.health = health; }
    
    public Integer getMinDamage() { return minDamage; }
    public void setMinDamage(Integer minDamage) { this.minDamage = minDamage; }
    
    public Integer getMaxDamage() { return maxDamage; }
    public void setMaxDamage(Integer maxDamage) { this.maxDamage = maxDamage; }
    
    public Integer getSpeed() { return speed; }
    public void setSpeed(Integer speed) { this.speed = speed; }
    
    public Integer getShots() { return shots; }
    public void setShots(Integer shots) { this.shots = shots; }
    
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
    
    public Integer getGrowth() { return growth; }
    public void setGrowth(Integer growth) { this.growth = growth; }
    
    public Integer getAiValue() { return aiValue; }
    public void setAiValue(Integer aiValue) { this.aiValue = aiValue; }
    
    public List<String> getAbilities() { return abilities; }
    public void setAbilities(List<String> abilities) { this.abilities = abilities; }
} 