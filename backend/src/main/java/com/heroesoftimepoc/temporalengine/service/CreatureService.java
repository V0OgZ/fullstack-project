package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.model.GameTile;
import com.heroesoftimepoc.temporalengine.websocket.QuantumEventBroadcaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * 🐉 CREATURE SERVICE - HEROES OF TIME
 * ===================================
 * Manages all creatures from Quantum Fireflies to Legendary Dragons
 * Implements creature abilities, quantum effects, and temporal interactions
 */
@Service
public class CreatureService {

    @Autowired
    private QuantumEventBroadcaster broadcaster;

    // 🎯 CREATURE DEFINITIONS
    private static final Map<String, CreatureDefinition> CREATURES = new HashMap<>();
    
    static {
        // 🧚‍♀️ TIER 1: BASIC QUANTUM CREATURES
        CREATURES.put("quantum_wisp", new CreatureDefinition(
            "quantum_wisp", "🧚‍♀️ Luciole Quantique", 1, "COMMON",
            25, 4, 2, 8, 50,
            Arrays.asList("coherence_field", "phase_shift"),
            "Une luciole éthérée qui manipule les phases quantiques"
        ));
        
        CREATURES.put("probability_spider", new CreatureDefinition(
            "probability_spider", "🕷️ Araignée des Probabilités", 1, "COMMON",
            35, 6, 3, 6, 60,
            Arrays.asList("probability_web", "quantum_bite"),
            "Araignée qui tisse des toiles dans l'espace des probabilités"
        ));
        
        CREATURES.put("quantum_spider", new CreatureDefinition(
            "quantum_spider", "🕷️ Araignée Quantique", 1, "COMMON",
            25, 8, 6, 10, 40,
            Arrays.asList("quantum_web", "probability_bite", "quantum_leap"),
            "Araignées évoluant dans l'espace quantique (essaim de 5)"
        ));
        
        // 🔥 NEW MINOR CREATURES
        CREATURES.put("temporal_firefly", new CreatureDefinition(
            "temporal_firefly", "✨ Luciole Temporelle", 1, "COMMON",
            15, 2, 1, 12, 30,
            Arrays.asList("time_blink", "temporal_light"),
            "Petite luciole qui clignote entre les moments temporels"
        ));
        
        CREATURES.put("phase_moth", new CreatureDefinition(
            "phase_moth", "🦋 Papillon de Phase", 1, "COMMON",
            20, 3, 2, 9, 35,
            Arrays.asList("phase_flutter", "reality_dust"),
            "Papillon qui vole entre les phases de la réalité"
        ));
        
        CREATURES.put("quantum_beetle", new CreatureDefinition(
            "quantum_beetle", "🪲 Scarabée Quantique", 1, "COMMON",
            30, 5, 4, 5, 45,
            Arrays.asList("probability_shell", "quantum_burrow"),
            "Scarabée avec carapace probabiliste"
        ));
        
        CREATURES.put("time_mite", new CreatureDefinition(
            "time_mite", "🦟 Acarien Temporel", 1, "COMMON",
            10, 1, 1, 15, 20,
            Arrays.asList("temporal_bite", "time_swarm"),
            "Minuscule parasite temporel (essaim de 10)"
        ));
        
        // ⚔️ TIER 2: ADVANCED CREATURES
        CREATURES.put("quantum_knight", new CreatureDefinition(
            "quantum_knight", "⚔️ Chevalier Quantique", 2, "RARE",
            80, 12, 10, 4, 100,
            Arrays.asList("superposition_charge", "quantum_armor"),
            "Chevalier avec armure et attaques en états multiples"
        ));
        
        CREATURES.put("phase_dragon", new CreatureDefinition(
            "phase_dragon", "🐲 Dragon de Phase", 2, "RARE",
            150, 20, 15, 6, 200,
            Arrays.asList("phase_breath", "interference_wings"),
            "Dragon ancien maître des phases quantiques"
        ));
        
        CREATURES.put("temporal_elemental", new CreatureDefinition(
            "temporal_elemental", "⚡ Élémentaire Temporel", 2, "MYTHIC",
            150, 12, 10, 8, 250,
            Arrays.asList("temporal_bolt", "time_distortion", "temporal_split"),
            "Élémentaire natif du temps, maître des distorsions"
        ));
        
        // 🔥 NEW INTERMEDIATE CREATURES
        CREATURES.put("quantum_cat", new CreatureDefinition(
            "quantum_cat", "🐱 Chat Quantique", 2, "RARE",
            45, 8, 5, 11, 80,
            Arrays.asList("schrodinger_state", "quantum_pounce"),
            "Chat existant dans plusieurs états simultanément"
        ));
        
        CREATURES.put("probability_owl", new CreatureDefinition(
            "probability_owl", "🦉 Chouette des Probabilités", 2, "RARE",
            60, 10, 7, 9, 90,
            Arrays.asList("future_sight", "probability_hoot"),
            "Chouette qui voit les probabilités futures"
        ));
        
        CREATURES.put("temporal_fox", new CreatureDefinition(
            "temporal_fox", "🦊 Renard Temporel", 2, "RARE",
            55, 9, 6, 13, 85,
            Arrays.asList("time_dash", "temporal_cunning"),
            "Renard rusé qui se déplace dans le temps"
        ));
        
        // 💀 TIER 3: EPIC CREATURES
        CREATURES.put("quantum_lich", new CreatureDefinition(
            "quantum_lich", "💀 Liche Quantique", 3, "EPIC",
            200, 25, 20, 5, 300,
            Arrays.asList("death_superposition", "quantum_necromancy", "interference_nova"),
            "Liche transcendant la mort via superposition quantique"
        ));
        
        CREATURES.put("amplitude_elemental", new CreatureDefinition(
            "amplitude_elemental", "⚡ Élémentaire d'Amplitude", 3, "EPIC",
            120, 18, 12, 8, 250,
            Arrays.asList("amplitude_shift", "resonance_attack", "coherence_shield"),
            "Être d'énergie pure qui manipule les amplitudes"
        ));
        
        CREATURES.put("phantom_warriors", new CreatureDefinition(
            "phantom_warriors", "👻 Guerriers Fantômes", 3, "ELITE",
            40, 10, 8, 4, 100,
            Arrays.asList("phantom_strike", "temporal_phase", "phantom_multiplication"),
            "Guerriers morts-vivants existant dans le plan temporel (groupe de 3)"
        ));
        
        // 🔥 TIER 4: LEGENDARY CREATURES
        CREATURES.put("quantum_phoenix", new CreatureDefinition(
            "quantum_phoenix", "🔥 Phénix Quantique", 4, "LEGENDARY",
            300, 35, 25, 10, 400,
            Arrays.asList("quantum_rebirth", "interference_flames", "phase_flight"),
            "Phénix légendaire maître des cycles quantiques"
        ));
        
        CREATURES.put("probability_archon", new CreatureDefinition(
            "probability_archon", "👑 Archonte des Probabilités", 4, "LEGENDARY",
            400, 30, 30, 7, 500,
            Arrays.asList("probability_control", "certainty_field", "quantum_judgment"),
            "Être cosmique gouvernant les lois quantiques"
        ));
        
        // 🐲 EXISTING CREATURES
        CREATURES.put("dragon_rouge", new CreatureDefinition(
            "dragon_rouge", "🐲 Dragon Rouge", 4, "LEGENDARY",
            200, 15, 12, 6, 150,
            Arrays.asList("fire_breath", "temporal_roar", "dragon_fury"),
            "Dragon ancien gardien d'artefacts temporels"
        ));
        
        // 🌑 SPECIAL CREATURES
        CREATURES.put("void_fragments", new CreatureDefinition(
            "void_fragments", "🌌 Fragments du Vide", 3, "EPIC",
            80, 15, 5, 12, 200,
            Arrays.asList("void_touch", "reality_fracture"),
            "Fragments d'univers détruit, très dangereux"
        ));
        
        CREATURES.put("shadow_minions", new CreatureDefinition(
            "shadow_minions", "🌑 Serviteurs d'Ombre", 2, "RARE",
            35, 8, 3, 10, 70,
            Arrays.asList("shadow_blend", "illusion_strike"),
            "Créatures d'ombre spécialisées dans l'illusion"
        ));
    }

    // 🎮 CREATE CREATURE
    public boolean createCreature(Game game, String creatureId, int x, int y) {
        CreatureDefinition def = CREATURES.get(creatureId);
        if (def == null) {
            return false;
        }

        GameTile tile = game.getTile(x, y);
        if (tile == null) {
            return false;
        }

        // Create creature instance
        CreatureInstance creature = new CreatureInstance(def, x, y);
        
        // Add to game (you'll need to add this to your Game model)
        // game.addCreature(creature);
        
        // Broadcast creature creation
        broadcaster.broadcastGameEvent(game, "CREATURE_SPAWNED", 
            String.format("%s spawned at (%d,%d)", def.name, x, y), creature);
            
        return true;
    }

    // ✨ USE CREATURE ABILITY
    public boolean useCreatureAbility(Game game, String creatureId, String abilityName, 
                                    int targetX, int targetY) {
        // Find creature in game
        // CreatureInstance creature = game.findCreature(creatureId);
        
        CreatureDefinition def = CREATURES.get(creatureId);
        if (def == null || !def.abilities.contains(abilityName)) {
            return false;
        }

        // Execute ability based on type
        Map<String, Object> effectData = executeAbility(game, creatureId, abilityName, targetX, targetY);
        
        // Broadcast ability usage
        broadcaster.broadcastCreatureAbility(game, creatureId, abilityName,
            getAbilityDescription(abilityName), effectData);
            
        return true;
    }

    // 🌟 EXECUTE ABILITY
    private Map<String, Object> executeAbility(Game game, String creatureId, String abilityName, 
                                             int targetX, int targetY) {
        Map<String, Object> effectData = new HashMap<>();
        
        switch (abilityName) {
            // 🧚‍♀️ QUANTUM WISP ABILITIES
            case "coherence_field":
                effectData.put("type", "coherence_field");
                effectData.put("radius", 1);
                effectData.put("amplitudeBonus", 0.1);
                effectData.put("duration", 3);
                break;
                
            case "phase_shift":
                effectData.put("type", "phase_shift");
                effectData.put("phaseShift", 0.785); // 45 degrees
                effectData.put("duration", 3);
                break;
                
            // 🕷️ SPIDER ABILITIES
            case "probability_web":
                effectData.put("type", "probability_web");
                effectData.put("radius", 2);
                effectData.put("probabilityModifier", 0.2);
                effectData.put("duration", 5);
                break;
                
            case "quantum_bite":
                effectData.put("type", "quantum_bite");
                effectData.put("amplitudes", Arrays.asList(
                    Map.of("real", 0.8, "imaginary", 0.0),
                    Map.of("real", 0.0, "imaginary", 0.6)
                ));
                break;
                
            // ✨ TEMPORAL FIREFLY ABILITIES
            case "time_blink":
                effectData.put("type", "time_blink");
                effectData.put("temporalShift", 1); // 1 day forward/backward
                effectData.put("duration", 2);
                break;
                
            case "temporal_light":
                effectData.put("type", "temporal_light");
                effectData.put("reveals", "temporal_anomalies");
                effectData.put("range", 3);
                break;
                
            // 🦋 PHASE MOTH ABILITIES
            case "phase_flutter":
                effectData.put("type", "phase_flutter");
                effectData.put("phaseJump", true);
                effectData.put("confusionChance", 0.3);
                break;
                
            case "reality_dust":
                effectData.put("type", "reality_dust");
                effectData.put("probabilityDistortion", 0.15);
                effectData.put("area", "3x3");
                break;
                
            // 🐱 QUANTUM CAT ABILITIES
            case "schrodinger_state":
                effectData.put("type", "schrodinger_state");
                effectData.put("states", Arrays.asList("alive", "dead", "sleeping"));
                effectData.put("probability", 0.33);
                break;
                
            case "quantum_pounce":
                effectData.put("type", "quantum_pounce");
                effectData.put("superpositionAttack", true);
                effectData.put("damage", "variable");
                break;
                
            default:
                effectData.put("type", "unknown");
                effectData.put("message", "Ability not implemented yet");
        }
        
        return effectData;
    }

    // 📖 GET ABILITY DESCRIPTION
    private String getAbilityDescription(String abilityName) {
        return switch (abilityName) {
            case "coherence_field" -> "Stabilise les amplitudes quantiques dans un rayon de 1 case";
            case "phase_shift" -> "Modifie la phase des attaques de 45 degrés";
            case "probability_web" -> "Modifie les probabilités dans un rayon de 2 cases";
            case "quantum_bite" -> "Morsure avec superposition de dégâts";
            case "time_blink" -> "Clignote entre les moments temporels";
            case "temporal_light" -> "Révèle les anomalies temporelles";
            case "phase_flutter" -> "Vol entre les phases de la réalité";
            case "reality_dust" -> "Saupoudre de la poussière de réalité";
            case "schrodinger_state" -> "Existe dans plusieurs états simultanément";
            case "quantum_pounce" -> "Bond quantique avec attaque superposée";
            default -> "Capacité mystérieuse";
        };
    }

    // 📋 GET ALL CREATURES
    public Map<String, CreatureDefinition> getAllCreatures() {
        return new HashMap<>(CREATURES);
    }

    // 🔍 GET CREATURE BY ID
    public CreatureDefinition getCreature(String creatureId) {
        return CREATURES.get(creatureId);
    }

    // 🎯 GET CREATURES BY TIER
    public List<CreatureDefinition> getCreaturesByTier(int tier) {
        return CREATURES.values().stream()
            .filter(creature -> creature.tier == tier)
            .toList();
    }

    // 🌟 CREATURE DEFINITION CLASS
    public static class CreatureDefinition {
        public final String id;
        public final String name;
        public final int tier;
        public final String rarity;
        public final int health;
        public final int attack;
        public final int defense;
        public final int speed;
        public final int temporalEnergy;
        public final List<String> abilities;
        public final String description;

        public CreatureDefinition(String id, String name, int tier, String rarity,
                                int health, int attack, int defense, int speed, int temporalEnergy,
                                List<String> abilities, String description) {
            this.id = id;
            this.name = name;
            this.tier = tier;
            this.rarity = rarity;
            this.health = health;
            this.attack = attack;
            this.defense = defense;
            this.speed = speed;
            this.temporalEnergy = temporalEnergy;
            this.abilities = new ArrayList<>(abilities);
            this.description = description;
        }
    }

    // 🎮 CREATURE INSTANCE CLASS
    public static class CreatureInstance {
        public final CreatureDefinition definition;
        public final int x;
        public final int y;
        public int currentHealth;
        public int currentEnergy;
        public final Map<String, Object> state;

        public CreatureInstance(CreatureDefinition definition, int x, int y) {
            this.definition = definition;
            this.x = x;
            this.y = y;
            this.currentHealth = definition.health;
            this.currentEnergy = definition.temporalEnergy;
            this.state = new HashMap<>();
        }
    }
}