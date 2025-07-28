package com.example.demo.service;

import com.example.demo.model.ArenaWorld;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * ArenaWorldService - Service de gestion du monde unique de l'arène
 * Gère l'instanciation, la persistance et l'état du monde arène
 */
@Service
public class ArenaWorldService {
    
    private final Map<String, ArenaWorld> arenaWorlds = new ConcurrentHashMap<>();
    private static final String MAIN_ARENA_ID = "ARENA_WORLD";
    
    public ArenaWorldService() {
        // Créer le monde arène principal au démarrage
        initializeMainArena();
    }
    
    private void initializeMainArena() {
        ArenaWorld mainArena = new ArenaWorld();
        arenaWorlds.put(MAIN_ARENA_ID, mainArena);
        System.out.println("[ARENA] Monde arène principal initialisé: " + MAIN_ARENA_ID);
    }
    
    /**
     * Récupère le monde arène principal
     */
    public ArenaWorld getMainArena() {
        ArenaWorld arena = arenaWorlds.get(MAIN_ARENA_ID);
        if (arena == null) {
            // Recréer si nécessaire
            initializeMainArena();
            arena = arenaWorlds.get(MAIN_ARENA_ID);
        }
        arena.updateLastUsed();
        return arena;
    }
    
    /**
     * Récupère l'état complet du monde arène
     */
    public Map<String, Object> getArenaWorldState() {
        ArenaWorld arena = getMainArena();
        Map<String, Object> state = new HashMap<>();
        
        state.put("id", arena.getId());
        state.put("name", arena.getName());
        state.put("type", arena.getType());
        state.put("terrain", arena.getTerrain());
        state.put("observers", arena.getObservers());
        state.put("currentBattle", arena.getCurrentBattle());
        state.put("settings", arena.getSettings());
        state.put("active", arena.isActive());
        state.put("isInBattle", arena.isInBattle());
        state.put("lastUsed", arena.getLastUsed());
        
        return state;
    }
    
    /**
     * Démarre un nouveau combat dans l'arène
     */
    public Map<String, Object> startBattle(Map<String, Object> battleConfig) {
        ArenaWorld arena = getMainArena();
        
        // Vérifier si un combat est déjà en cours
        if (arena.isInBattle()) {
            throw new RuntimeException("Un combat est déjà en cours dans l'arène");
        }
        
        // Valider la configuration du combat
        validateBattleConfig(battleConfig);
        
        // Démarrer le combat
        arena.startBattle(battleConfig);
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("battleId", battleConfig.get("battleId"));
        result.put("startTime", arena.getCurrentBattle().get("startTime"));
        result.put("message", "Combat démarré dans l'arène interdimensionnelle!");
        
        System.out.println("[ARENA] Combat démarré: " + battleConfig.get("battleId"));
        
        return result;
    }
    
    /**
     * Termine le combat en cours
     */
    public Map<String, Object> endBattle() {
        ArenaWorld arena = getMainArena();
        
        if (!arena.isInBattle()) {
            throw new RuntimeException("Aucun combat en cours dans l'arène");
        }
        
        Map<String, Object> battleResult = new HashMap<>(arena.getCurrentBattle());
        arena.endBattle();
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("battleResult", battleResult);
        result.put("message", "Combat terminé! L'arène est prête pour le prochain défi!");
        
        System.out.println("[ARENA] Combat terminé");
        
        return result;
    }
    
    /**
     * Réinitialise complètement l'arène
     */
    public Map<String, Object> resetArena() {
        ArenaWorld arena = getMainArena();
        arena.resetArena();
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "Arène réinitialisée! Prête pour de nouveaux défis interdimensionnels!");
        
        System.out.println("[ARENA] Arène réinitialisée");
        
        return result;
    }
    
    /**
     * Met à jour les paramètres de l'arène
     */
    public Map<String, Object> updateArenaSettings(Map<String, Object> newSettings) {
        ArenaWorld arena = getMainArena();
        
        // Merger les nouveaux paramètres avec les existants
        Map<String, Object> currentSettings = arena.getSettings();
        currentSettings.putAll(newSettings);
        arena.setSettings(currentSettings);
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("settings", currentSettings);
        result.put("message", "Paramètres de l'arène mis à jour!");
        
        return result;
    }
    
    /**
     * Récupère les héros disponibles pour l'arène (niveau 1)
     */
    public List<Map<String, Object>> getAvailableArenaHeroes() {
        List<Map<String, Object>> heroes = new ArrayList<>();
        
        // Faction Arthur
        heroes.add(createArenaHero("arthur", "Arthur Pendragon", "ARTHUR_FACTION", 1, "Frappe Temporelle"));
        heroes.add(createArenaHero("merlin", "Merlin", "ARTHUR_FACTION", 1, "Portail Temporel"));
        heroes.add(createArenaHero("lysandrel", "Lysandrel", "ARTHUR_FACTION", 1, "Bouclier Causal"));
        
        // Faction Ragnar
        heroes.add(createArenaHero("ragnar", "Ragnar le Briseur", "RAGNAR_FACTION", 1, "Rage Immortelle"));
        heroes.add(createArenaHero("bjorn", "Bjorn", "RAGNAR_FACTION", 1, "Assaut Multitemporel"));
        heroes.add(createArenaHero("astrid", "Astrid", "RAGNAR_FACTION", 1, "Flèche Quantique"));
        
        // Faction Temporelle
        heroes.add(createArenaHero("memento", "Memento", "TEMPORAL_FACTION", 1, "Tatouages Évolutifs"));
        heroes.add(createArenaHero("the_dude", "The Dude", "TEMPORAL_FACTION", 1, "Zen Absolu"));
        heroes.add(createArenaHero("jean_grofignon", "Jean-Grofignon", "TEMPORAL_FACTION", 1, "Création Paresseuse"));
        
        return heroes;
    }
    
    private Map<String, Object> createArenaHero(String id, String name, String faction, int level, String spell) {
        Map<String, Object> hero = new HashMap<>();
        hero.put("id", id);
        hero.put("name", name);
        hero.put("faction", faction);
        hero.put("level", level);
        hero.put("availableSpell", spell);
        hero.put("arenaReady", true);
        hero.put("stats", createBasicStats());
        return hero;
    }
    
    private Map<String, Object> createBasicStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("health", 100);
        stats.put("mana", 50);
        stats.put("attack", 25);
        stats.put("defense", 20);
        stats.put("speed", 15);
        return stats;
    }
    
    private void validateBattleConfig(Map<String, Object> battleConfig) {
        if (battleConfig == null) {
            throw new RuntimeException("Configuration de combat manquante");
        }
        
        if (!battleConfig.containsKey("battleId")) {
            battleConfig.put("battleId", "battle_" + System.currentTimeMillis());
        }
        
        if (!battleConfig.containsKey("mode")) {
            battleConfig.put("mode", "CLASSIC");
        }
        
        if (!battleConfig.containsKey("heroes")) {
            throw new RuntimeException("Aucun héros spécifié pour le combat");
        }
    }
    
    /**
     * Récupère les statistiques de l'arène
     */
    public Map<String, Object> getArenaStats() {
        ArenaWorld arena = getMainArena();
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("totalBattles", 0); // TODO: Implémenter le comptage
        stats.put("uptime", System.currentTimeMillis() - arena.getCreatedAt());
        stats.put("lastUsed", arena.getLastUsed());
        stats.put("isActive", arena.isActive());
        stats.put("currentStatus", arena.isInBattle() ? "IN_BATTLE" : "READY");
        
        return stats;
    }
    
    /**
     * Vérifie si l'arène est prête pour un nouveau combat
     */
    public boolean isArenaReady() {
        ArenaWorld arena = getMainArena();
        return arena.isActive() && !arena.isInBattle();
    }
}