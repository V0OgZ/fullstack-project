package com.example.demo.service;

import com.example.demo.model.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * 💎 SERVICE DE PICKUP - HEROES OF TIME
 * 
 * Gère le système de ramassage d'objets droppés par les créatures
 * et les coffres au trésor dans le monde.
 * 
 * MEMENTO: "Chaque objet ramassé est un fragment de l'histoire"
 */
@Service
public class PickupService {
    
    private static final double PICKUP_RANGE = 2.0; // Distance de ramassage automatique
    private static final int PICKUP_LIFETIME = 300; // 5 minutes avant disparition
    
    // Map gameId -> List of pickups
    private final Map<String, List<Pickup>> gamePickups = new ConcurrentHashMap<>();
    
    @Autowired
    private GameService gameService;
    
    /**
     * 🎲 Fait apparaître un pickup sur la map
     */
    public void spawnPickup(String gameId, Position position, String itemId, int quantity) {
        Pickup pickup = new Pickup(
            UUID.randomUUID().toString(),
            itemId,
            quantity,
            position,
            System.currentTimeMillis()
        );
        
        gamePickups.computeIfAbsent(gameId, k -> new ArrayList<>()).add(pickup);
        
        // Notification visuelle
        Map<String, Object> event = new HashMap<>();
        event.put("type", "PICKUP_SPAWNED");
        event.put("pickup", pickup);
        event.put("position", position);
        // gameService.broadcastEvent(gameId, event);
    }
    
    /**
     * 🎯 Spawn multiple pickups from creature drops
     */
    public void spawnCreatureDrops(String gameId, Position position, List<Drop> drops) {
        for (Drop drop : drops) {
            if (Math.random() < drop.chance) {
                int quantity = drop.getRandomQuantity();
                spawnPickup(gameId, position, drop.itemId, quantity);
            }
        }
    }
    
    /**
     * 🔍 Vérifie et ramasse automatiquement les objets proches
     */
    public List<PickupResult> checkPickups(String gameId, String heroId, Position heroPosition) {
        List<Pickup> pickups = gamePickups.get(gameId);
        if (pickups == null) return Collections.emptyList();
        
        List<PickupResult> results = new ArrayList<>();
        List<Pickup> toRemove = new ArrayList<>();
        
        for (Pickup pickup : pickups) {
            double distance = calculateDistance(heroPosition, pickup.position);
            
            if (distance <= PICKUP_RANGE) {
                // Ramassage !
                PickupResult result = applyPickup(heroId, pickup);
                results.add(result);
                toRemove.add(pickup);
            }
        }
        
        // Retirer les objets ramassés
        pickups.removeAll(toRemove);
        
        // Nettoyer les vieux pickups
        cleanOldPickups(gameId);
        
        return results;
    }
    
    /**
     * 💫 Applique l'effet du pickup sur le héros
     */
    private PickupResult applyPickup(String heroId, Pickup pickup) {
        PickupResult result = new PickupResult();
        result.itemId = pickup.itemId;
        result.quantity = pickup.quantity;
        result.heroId = heroId;
        
        // Appliquer l'effet selon le type d'objet
        switch (getItemType(pickup.itemId)) {
            case "HEALTH":
                result.effect = "heal";
                result.value = pickup.quantity * 10; // 10 HP par potion
                // gameService.healHero(heroId, result.value);
                break;
                
            case "MANA":
                result.effect = "mana_restore";
                result.value = pickup.quantity * 20; // 20 MP par cristal
                // gameService.restoreMana(heroId, result.value);
                break;
                
            case "BUFF":
                result.effect = "buff_applied";
                result.buffType = getBuffType(pickup.itemId);
                result.duration = 60; // 60 secondes
                // gameService.applyBuff(heroId, result.buffType, result.duration);
                break;
                
            case "RESOURCE":
                result.effect = "resource_gained";
                // gameService.addResource(heroId, pickup.itemId, pickup.quantity);
                break;
                
            case "ARTIFACT":
                result.effect = "artifact_acquired";
                result.isRare = true;
                // gameService.giveArtifact(heroId, pickup.itemId);
                break;
        }
        
        result.message = formatPickupMessage(pickup);
        return result;
    }
    
    /**
     * 🧹 Nettoie les vieux pickups
     */
    private void cleanOldPickups(String gameId) {
        List<Pickup> pickups = gamePickups.get(gameId);
        if (pickups == null) return;
        
        long now = System.currentTimeMillis();
        pickups.removeIf(pickup -> 
            (now - pickup.spawnTime) > PICKUP_LIFETIME * 1000
        );
    }
    
    /**
     * 📏 Calcule la distance entre deux positions
     */
    private double calculateDistance(Position p1, Position p2) {
        double dx = p1.getX() - p2.getX();
        double dy = p1.getY() - p2.getY();
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    /**
     * 🎨 Obtient les pickups visibles pour le rendu
     */
    public List<Pickup> getVisiblePickups(String gameId, Position center, double viewRadius) {
        List<Pickup> pickups = gamePickups.get(gameId);
        if (pickups == null) return Collections.emptyList();
        
        return pickups.stream()
            .filter(pickup -> calculateDistance(center, pickup.position) <= viewRadius)
            .collect(Collectors.toList());
    }
    
    // Helpers
    private String getItemType(String itemId) {
        if (itemId.contains("potion")) return "HEALTH";
        if (itemId.contains("cristal") || itemId.contains("mana")) return "MANA";
        if (itemId.contains("buff")) return "BUFF";
        if (itemId.contains("artefact") || itemId.contains("artifact")) return "ARTIFACT";
        return "RESOURCE";
    }
    
    private String getBuffType(String itemId) {
        if (itemId.contains("force")) return "STRENGTH";
        if (itemId.contains("vitesse")) return "SPEED";
        if (itemId.contains("defense")) return "DEFENSE";
        return "GENERIC";
    }
    
    private String formatPickupMessage(Pickup pickup) {
        return String.format("+ %d %s", pickup.quantity, 
            pickup.itemId.replace("_", " "));
    }
    
    // Inner classes
    public static class Pickup {
        public String id;
        public String itemId;
        public int quantity;
        public Position position;
        public long spawnTime;
        
        public Pickup(String id, String itemId, int quantity, Position position, long spawnTime) {
            this.id = id;
            this.itemId = itemId;
            this.quantity = quantity;
            this.position = position;
            this.spawnTime = spawnTime;
        }
    }
    
    public static class Drop {
        public String itemId;
        public double chance;
        public String quantityRange;
        
        public int getRandomQuantity() {
            if (quantityRange.contains("-")) {
                String[] parts = quantityRange.split("-");
                int min = Integer.parseInt(parts[0]);
                int max = Integer.parseInt(parts[1]);
                return min + (int)(Math.random() * (max - min + 1));
            }
            return Integer.parseInt(quantityRange);
        }
    }
    
    public static class PickupResult {
        public String itemId;
        public int quantity;
        public String heroId;
        public String effect;
        public int value;
        public String buffType;
        public int duration;
        public boolean isRare;
        public String message;
    }
}