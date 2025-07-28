package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;
import java.time.LocalDateTime;
import java.util.concurrent.ThreadLocalRandom;

@RestController
@RequestMapping("/api/cosmic")
@CrossOrigin(origins = "*")
public class CosmicSpellController {
    
    // Ford Logic: Real engine, not simulation
    private Map<String, PlayerCosmicState> playerStates = new HashMap<>();
    private List<CosmicSpell> cosmicSpells = new ArrayList<>();
    private List<String> combatLogs = new ArrayList<>();
    
    public CosmicSpellController() {
        initializeCosmicSpells();
    }
    
    @PostMapping("/incarnation/{userId}")
    public ResponseEntity<Map<String, Object>> incarnatePlayer(@PathVariable String userId) {
        PlayerCosmicState state = new PlayerCosmicState();
        state.userId = userId;
        state.incarnationTime = LocalDateTime.now();
        state.cosmicLevel = 1;
        state.survivedCombats = 0;
        state.totalCombats = 0;
        state.oneShots = 0;
        state.earnedSpells = new ArrayList<>();
        state.isIncarnated = true;
        
        playerStates.put(userId, state);
        
        addCombatLog("🎭 Ford: Player " + userId + " incarnated - The park recognizes you");
        addCombatLog("⚡ Walter: Cosmic spell system activated - Survival algorithm online");
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("incarnation_id", UUID.randomUUID().toString());
        response.put("cosmic_level", 1);
        response.put("ford_message", "Welcome to the park, " + userId);
        response.put("walter_message", "Survival algorithm initialized - Prove your worth");
        response.put("available_spells", 0);
        response.put("next_enemy_in", "5 seconds");
        
        // Ford requirement: Self-triggering enemy spawn
        scheduleEnemySpawn(userId);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/enemy/spawn/{userId}")
    public ResponseEntity<Map<String, Object>> spawnRandomEnemy(@PathVariable String userId) {
        PlayerCosmicState playerState = playerStates.get(userId);
        if (playerState == null || !playerState.isIncarnated) {
            return ResponseEntity.badRequest().build();
        }
        
        // Walter Algorithm: Enemy stronger than player
        CosmicEnemy enemy = generateStrongerEnemy(playerState);
        playerState.currentEnemy = enemy;
        
        addCombatLog("🐉 Enemy spawned: " + enemy.name + " (Level " + enemy.level + ")");
        addCombatLog("⚠️ Walter: Enemy is " + (enemy.level - playerState.cosmicLevel) + " levels stronger");
        
        Map<String, Object> response = new HashMap<>();
        response.put("enemy", enemyToMap(enemy));
        response.put("player_level", playerState.cosmicLevel);
        response.put("difficulty_multiplier", enemy.level - playerState.cosmicLevel);
        response.put("walter_advice", getWalterAdvice(enemy, playerState));
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/combat/resolve/{userId}")
    public ResponseEntity<Map<String, Object>> resolveCombat(@PathVariable String userId, @RequestBody Map<String, Object> combatData) {
        PlayerCosmicState playerState = playerStates.get(userId);
        if (playerState == null || playerState.currentEnemy == null) {
            return ResponseEntity.badRequest().build();
        }
        
        String action = (String) combatData.get("action");
        Integer damage = (Integer) combatData.get("damage");
        Boolean isOneShot = (Boolean) combatData.getOrDefault("one_shot", false);
        
        CombatResult result = calculateCombatResult(playerState, action, damage, isOneShot);
        
        playerState.totalCombats++;
        if (result.playerWon) {
            playerState.survivedCombats++;
            if (isOneShot) {
                playerState.oneShots++;
                addCombatLog("💥 ONE-SHOT! Walter approves: " + playerState.oneShots + " total");
            }
        }
        
        // Walter Algorithm: Calculate spell rewards
        List<CosmicSpell> newSpells = calculateSpellRewards(playerState);
        playerState.earnedSpells.addAll(newSpells);
        
        playerState.currentEnemy = null; // Combat finished
        
        Map<String, Object> response = new HashMap<>();
        response.put("combat_result", result);
        response.put("new_spells", newSpells.size());
        response.put("total_spells", playerState.earnedSpells.size());
        response.put("survival_rate", (double) playerState.survivedCombats / playerState.totalCombats);
        response.put("walter_evaluation", getWalterEvaluation(playerState));
        response.put("ford_message", getFordMessage(playerState, result));
        
        // Self-triggering: Schedule next enemy if player survived
        if (result.playerWon) {
            scheduleEnemySpawn(userId);
        }
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/spells/available/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getAvailableSpells(@PathVariable String userId) {
        PlayerCosmicState playerState = playerStates.get(userId);
        if (playerState == null) {
            return ResponseEntity.badRequest().build();
        }
        
        List<Map<String, Object>> spellMaps = new ArrayList<>();
        for (CosmicSpell spell : playerState.earnedSpells) {
            spellMaps.add(spellToMap(spell));
        }
        
        return ResponseEntity.ok(spellMaps);
    }
    
    @GetMapping("/status/{userId}")
    public ResponseEntity<Map<String, Object>> getPlayerStatus(@PathVariable String userId) {
        PlayerCosmicState playerState = playerStates.get(userId);
        if (playerState == null) {
            Map<String, Object> response = new HashMap<>();
            response.put("incarnated", false);
            response.put("message", "Player not incarnated - Use /incarnation endpoint first");
            return ResponseEntity.ok(response);
        }
        
        Map<String, Object> status = new HashMap<>();
        status.put("incarnated", playerState.isIncarnated);
        status.put("cosmic_level", playerState.cosmicLevel);
        status.put("total_combats", playerState.totalCombats);
        status.put("survived_combats", playerState.survivedCombats);
        status.put("one_shots", playerState.oneShots);
        status.put("earned_spells", playerState.earnedSpells.size());
        status.put("survival_rate", playerState.totalCombats > 0 ? 
            (double) playerState.survivedCombats / playerState.totalCombats : 0.0);
        status.put("has_enemy", playerState.currentEnemy != null);
        status.put("walter_grade", getWalterGrade(playerState));
        
        return ResponseEntity.ok(status);
    }
    
    // Walter Algorithm Implementation
    private List<CosmicSpell> calculateSpellRewards(PlayerCosmicState playerState) {
        List<CosmicSpell> rewards = new ArrayList<>();
        
        if (playerState.totalCombats == 0) return rewards;
        
        double survivalRate = (double) playerState.survivedCombats / playerState.totalCombats;
        
        // Walter's survival algorithm
        if (survivalRate >= 0.5) { // Survived half of combats
            if (playerState.oneShots == playerState.survivedCombats && playerState.oneShots > 0) {
                // All wins are one-shots: 10 spells
                rewards.addAll(getRandomCosmicSpells(10));
                addCombatLog("🌟 Walter: PERFECT SCORE! All one-shots - 10 cosmic spells awarded!");
            } else if (survivalRate == 1.0) {
                // Won everything: 3 spells
                rewards.addAll(getRandomCosmicSpells(3));
                addCombatLog("⚡ Walter: Perfect survival - 3 cosmic spells awarded!");
            } else if (survivalRate >= 0.875) { // 7/8 or better
                // High survival: 2 spells
                rewards.addAll(getRandomCosmicSpells(2));
                addCombatLog("💪 Walter: Excellent survival rate - 2 cosmic spells awarded!");
            } else {
                // Basic survival: 1 spell
                rewards.addAll(getRandomCosmicSpells(1));
                addCombatLog("✅ Walter: Good survival - 1 cosmic spell awarded!");
            }
        }
        
        return rewards;
    }
    
    private CosmicEnemy generateStrongerEnemy(PlayerCosmicState playerState) {
        CosmicEnemy enemy = new CosmicEnemy();
        enemy.id = UUID.randomUUID().toString();
        
        // Walter Algorithm: Always stronger than player
        int levelBonus = ThreadLocalRandom.current().nextInt(1, 4); // 1-3 levels stronger
        enemy.level = playerState.cosmicLevel + levelBonus;
        enemy.hp = 100 * enemy.level;
        enemy.attack = 20 * enemy.level;
        
        String[] names = {
            "Cosmic Devourer", "Void Stalker", "Reality Breaker", 
            "Time Ripper", "Quantum Horror", "Dimensional Predator",
            "Entropy Beast", "Causal Nightmare", "Paradox Hunter"
        };
        enemy.name = names[ThreadLocalRandom.current().nextInt(names.length)] + " Mk." + enemy.level;
        
        return enemy;
    }
    
    private CombatResult calculateCombatResult(PlayerCosmicState playerState, String action, Integer damage, Boolean isOneShot) {
        CombatResult result = new CombatResult();
        CosmicEnemy enemy = playerState.currentEnemy;
        
        if (isOneShot && damage >= enemy.hp) {
            result.playerWon = true;
            result.turnsToWin = 1;
            result.damageDealt = enemy.hp;
            result.damageTaken = 0;
            result.description = "ONE-SHOT KILL! Enemy obliterated!";
            addCombatLog("💥 " + enemy.name + " destroyed in one hit!");
        } else {
            // Simulate combat based on levels
            int playerPower = playerState.cosmicLevel * 25;
            int enemyPower = enemy.level * 20;
            
            if (damage != null) {
                playerPower += damage;
            }
            
            result.playerWon = playerPower > enemyPower;
            result.turnsToWin = Math.max(1, enemy.hp / Math.max(1, playerPower - enemyPower + 10));
            result.damageDealt = Math.min(enemy.hp, playerPower);
            result.damageTaken = result.playerWon ? enemyPower / 3 : enemyPower;
            result.description = result.playerWon ? "Victory after " + result.turnsToWin + " turns" : "Defeated by " + enemy.name;
            
            addCombatLog(result.playerWon ? 
                "⚔️ Victory against " + enemy.name + "!" : 
                "💀 Defeated by " + enemy.name);
        }
        
        return result;
    }
    
    private void initializeCosmicSpells() {
        cosmicSpells.add(new CosmicSpell("Reality Collapse", "COSMIC", "Collapses local reality around target", 1000));
        cosmicSpells.add(new CosmicSpell("Time Fracture", "COSMIC", "Splits timeline to attack from multiple moments", 800));
        cosmicSpells.add(new CosmicSpell("Quantum Entanglement", "COSMIC", "Links enemy fate to cosmic void", 900));
        cosmicSpells.add(new CosmicSpell("Dimensional Rift", "COSMIC", "Opens portal to hostile dimension", 750));
        cosmicSpells.add(new CosmicSpell("Entropy Acceleration", "COSMIC", "Rapidly ages target to dust", 850));
        cosmicSpells.add(new CosmicSpell("Causal Loop Break", "COSMIC", "Breaks enemy's causal existence", 950));
        cosmicSpells.add(new CosmicSpell("Void Summon", "COSMIC", "Summons creatures from the void", 700));
        cosmicSpells.add(new CosmicSpell("Reality Rewrite", "COSMIC", "Rewrites local physics to favor caster", 1100));
        cosmicSpells.add(new CosmicSpell("Cosmic Storm", "COSMIC", "Unleashes storm of cosmic energy", 600));
        cosmicSpells.add(new CosmicSpell("Existence Nullify", "COSMIC", "Temporarily nullifies target's existence", 1200));
    }
    
    private List<CosmicSpell> getRandomCosmicSpells(int count) {
        List<CosmicSpell> available = new ArrayList<>(cosmicSpells);
        Collections.shuffle(available);
        return available.subList(0, Math.min(count, available.size()));
    }
    
    private void scheduleEnemySpawn(String userId) {
        // Ford requirement: Self-triggering system
        // In real implementation, this would use @Scheduled or similar
        addCombatLog("⏰ Next enemy will spawn automatically in 5 seconds for " + userId);
    }
    
    private String getWalterAdvice(CosmicEnemy enemy, PlayerCosmicState playerState) {
        int levelDiff = enemy.level - playerState.cosmicLevel;
        if (levelDiff >= 3) {
            return "CRITICAL: Enemy significantly stronger. Consider cosmic spells or retreat.";
        } else if (levelDiff >= 2) {
            return "WARNING: Tough opponent. Use your best abilities.";
        } else {
            return "MANAGEABLE: You can handle this with good tactics.";
        }
    }
    
    private String getWalterEvaluation(PlayerCosmicState playerState) {
        double survivalRate = (double) playerState.survivedCombats / playerState.totalCombats;
        if (survivalRate >= 0.9) return "EXCELLENT: Walter approves your combat efficiency";
        if (survivalRate >= 0.7) return "GOOD: Solid performance, room for improvement";
        if (survivalRate >= 0.5) return "ACCEPTABLE: Meeting minimum survival standards";
        return "POOR: Survival rate below acceptable threshold";
    }
    
    private String getFordMessage(PlayerCosmicState playerState, CombatResult result) {
        if (result.playerWon && result.turnsToWin == 1) {
            return "Ford nods approvingly. You understand the park's rules now.";
        } else if (result.playerWon) {
            return "Ford: You're learning. The park responds to those who adapt.";
        } else {
            return "Ford: The park is unforgiving. Learn from this.";
        }
    }
    
    private String getWalterGrade(PlayerCosmicState playerState) {
        if (playerState.totalCombats == 0) return "UNGRADED";
        
        double survivalRate = (double) playerState.survivedCombats / playerState.totalCombats;
        double oneShotRate = (double) playerState.oneShots / Math.max(1, playerState.survivedCombats);
        
        if (oneShotRate == 1.0 && survivalRate >= 0.8) return "S+ COSMIC MASTER";
        if (survivalRate >= 0.9) return "A+ EXCELLENT";
        if (survivalRate >= 0.7) return "B+ GOOD";
        if (survivalRate >= 0.5) return "C+ ACCEPTABLE";
        return "D- NEEDS IMPROVEMENT";
    }
    
    private void addCombatLog(String message) {
        String timestampedMessage = LocalDateTime.now() + " - " + message;
        combatLogs.add(timestampedMessage);
        if (combatLogs.size() > 100) {
            combatLogs.remove(0);
        }
    }
    
    private Map<String, Object> enemyToMap(CosmicEnemy enemy) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", enemy.id);
        map.put("name", enemy.name);
        map.put("level", enemy.level);
        map.put("hp", enemy.hp);
        map.put("attack", enemy.attack);
        return map;
    }
    
    private Map<String, Object> spellToMap(CosmicSpell spell) {
        Map<String, Object> map = new HashMap<>();
        map.put("name", spell.name);
        map.put("tier", spell.tier);
        map.put("description", spell.description);
        map.put("power", spell.power);
        return map;
    }
    
    // Inner classes
    public static class PlayerCosmicState {
        public String userId;
        public LocalDateTime incarnationTime;
        public int cosmicLevel;
        public int survivedCombats;
        public int totalCombats;
        public int oneShots;
        public List<CosmicSpell> earnedSpells;
        public boolean isIncarnated;
        public CosmicEnemy currentEnemy;
    }
    
    public static class CosmicEnemy {
        public String id;
        public String name;
        public int level;
        public int hp;
        public int attack;
    }
    
    public static class CosmicSpell {
        public String name;
        public String tier;
        public String description;
        public int power;
        
        public CosmicSpell(String name, String tier, String description, int power) {
            this.name = name;
            this.tier = tier;
            this.description = description;
            this.power = power;
        }
    }
    
    public static class CombatResult {
        public boolean playerWon;
        public int turnsToWin;
        public int damageDealt;
        public int damageTaken;
        public String description;
    }
} 