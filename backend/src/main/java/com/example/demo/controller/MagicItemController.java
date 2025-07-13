package com.example.demo.controller;

import com.example.demo.service.MagicItemService;
import com.example.demo.service.MagicItemService.MagicItem;
import com.example.demo.service.MagicItemService.Hero;
import com.example.demo.service.MagicItemService.ItemEffectResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/magic-items")
@CrossOrigin(origins = "*")
public class MagicItemController {

    @Autowired
    private MagicItemService magicItemService;

    /**
     * Get all magic items
     */
    @GetMapping
    public ResponseEntity<List<MagicItem>> getAllMagicItems() {
        List<MagicItem> items = magicItemService.getAllMagicItems();
        return ResponseEntity.ok(items);
    }

    /**
     * Get magic item by ID
     */
    @GetMapping("/{itemId}")
    public ResponseEntity<MagicItem> getMagicItem(@PathVariable String itemId) {
        MagicItem item = magicItemService.getMagicItem(itemId);
        if (item == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(item);
    }

    /**
     * Apply item effects to hero
     */
    @PostMapping("/apply-effects")
    public ResponseEntity<Hero> applyItemEffects(@RequestBody Map<String, Object> request) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> heroData = (Map<String, Object>) request.get("hero");
            @SuppressWarnings("unchecked")
            Map<String, String> equippedItems = (Map<String, String>) request.get("equippedItems");
            
            // Convert hero data to Hero object
            Hero hero = convertMapToHero(heroData);
            
            Hero enhancedHero = magicItemService.applyItemEffectsToHero(hero, equippedItems);
            return ResponseEntity.ok(enhancedHero);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Validate item equipping
     */
    @PostMapping("/validate-equip")
    public ResponseEntity<ItemEffectResult> validateEquipItem(@RequestBody Map<String, Object> request) {
        try {
            String itemId = (String) request.get("itemId");
            Integer heroLevel = (Integer) request.get("heroLevel");
            
            ItemEffectResult result = magicItemService.validateEquipItem(itemId, heroLevel);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Consume item
     */
    @PostMapping("/consume")
    public ResponseEntity<ItemEffectResult> consumeItem(@RequestBody Map<String, Object> request) {
        try {
            String itemId = (String) request.get("itemId");
            @SuppressWarnings("unchecked")
            Map<String, Object> heroData = (Map<String, Object>) request.get("hero");
            Integer playerGold = (Integer) request.get("playerGold");
            
            Hero hero = convertMapToHero(heroData);
            ItemEffectResult result = magicItemService.consumeItem(itemId, hero, playerGold);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Calculate temporal effects
     */
    @PostMapping("/temporal-effects")
    public ResponseEntity<Map<String, Object>> calculateTemporalEffects(@RequestBody Map<String, String> equippedItems) {
        try {
            Map<String, Object> result = magicItemService.calculateTemporalEffects(equippedItems);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get total item bonuses
     */
    @PostMapping("/total-bonuses")
    public ResponseEntity<Map<String, Object>> getTotalItemBonuses(@RequestBody Map<String, String> equippedItems) {
        try {
            Map<String, Object> result = magicItemService.getTotalItemBonuses(equippedItems);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Helper method to convert Map to Hero object
    private Hero convertMapToHero(Map<String, Object> heroData) {
        Hero hero = new Hero();
        hero.setId((String) heroData.get("id"));
        hero.setName((String) heroData.get("name"));
        hero.setLevel((Integer) heroData.get("level"));
        hero.setExperience((Integer) heroData.get("experience"));
        hero.setMovementPoints((Integer) heroData.get("movementPoints"));
        hero.setMaxMovementPoints((Integer) heroData.get("maxMovementPoints"));
        hero.setPlayerId((String) heroData.get("playerId"));
        
        // Convert position
        if (heroData.containsKey("position")) {
            @SuppressWarnings("unchecked")
            Map<String, Object> posData = (Map<String, Object>) heroData.get("position");
            com.example.demo.model.Position position = new com.example.demo.model.Position();
            position.setX((Integer) posData.get("x"));
            position.setY((Integer) posData.get("y"));
            hero.setPosition(position);
        }
        
        // Convert stats
        if (heroData.containsKey("stats")) {
            @SuppressWarnings("unchecked")
            Map<String, Object> statsData = (Map<String, Object>) heroData.get("stats");
            MagicItemService.HeroStats stats = new MagicItemService.HeroStats();
            stats.setAttack((Integer) statsData.getOrDefault("attack", 0));
            stats.setDefense((Integer) statsData.getOrDefault("defense", 0));
            stats.setKnowledge((Integer) statsData.getOrDefault("knowledge", 0));
            stats.setSpellPower((Integer) statsData.getOrDefault("spellPower", 0));
            stats.setMovementPoints((Integer) statsData.getOrDefault("movementPoints", 0));
            stats.setMana((Integer) statsData.getOrDefault("mana", 0));
            stats.setTemporalMana((Integer) statsData.getOrDefault("temporalMana", 0));
            stats.setExperience((Integer) statsData.getOrDefault("experience", 0));
            hero.setStats(stats);
        }
        
        return hero;
    }
} 