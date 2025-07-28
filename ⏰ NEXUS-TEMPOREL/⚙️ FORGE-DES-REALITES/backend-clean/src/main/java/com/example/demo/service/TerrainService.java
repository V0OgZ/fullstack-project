package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 🌍 TERRAIN SERVICE UNIFIÉ - HEROES OF TIME
 * 
 * Service intelligent pour génération terrain selon révélations GRUT :
 * - Algorithmes procéduraux (pas de random)
 * - Système trésors HOMM3 complet
 * - Géométrie euclidienne/non-euclidienne
 * - Association terrain ↔ monde/mode
 * 
 * @author OPUS-MEMENTO-CLAUDIUS
 * @version 1.0 - Révolution GRUT
 */
@Service
public class TerrainService {

    @Autowired
    private NonEuclideanGeometryEngine geometryEngine;

    // ======================
    // CONSTANTS HOMM3 STYLE
    // ======================
    
    private static final String[] TERRAIN_TYPES = {
        "grass", "dirt", "forest", "mountain", "water", 
        "sand", "snow", "swamp", "rough", "lava"
    };
    
    private static final String[] TREASURE_TYPES = {
        "gold_pile", "crystal_cavern", "gem_pond", "wood_pile", 
        "ore_mine", "treasure_chest", "artifact_site", "magic_well",
        "mystic_pool", "ancient_ruins", "temporal_nexus"
    };
    
    private static final Map<String, Integer> TERRAIN_MOVEMENT_COSTS = Map.of(
        "grass", 100, "dirt", 100, "forest", 150, "mountain", 9999,
        "water", 9999, "sand", 150, "snow", 150, "swamp", 175,
        "rough", 125, "lava", 200
    );

    // ======================
    // ALGORITHME INTELLIGENT PRINCIPAL
    // ======================
    
    /**
     * Génère une map intelligente selon le mode/monde
     */
    public Map<String, Object> generateIntelligentMap(String worldId, String mode, int width, int height) {
        Map<String, Object> mapData = new HashMap<>();
        mapData.put("worldId", worldId);
        mapData.put("mode", mode);
        mapData.put("width", width);
        mapData.put("height", height);
        mapData.put("generation_type", "intelligent_procedural");
        
        // Étape 1: Génération terrain base selon algorithme Perlin
        String[][] terrainBase = generatePerlinTerrain(width, height, worldId);
        
        // Étape 2: Application règles monde spécifique
        terrainBase = applyWorldRules(terrainBase, worldId, width, height);
        
        // Étape 3: Ajout caractéristiques géologiques
        terrainBase = addGeologicalFeatures(terrainBase, width, height);
        
        // Étape 4: Génération trésors HOMM3 intelligents
        List<Map<String, Object>> treasures = generateHomm3Treasures(terrainBase, width, height);
        
        // Étape 5: Application géométrie (euclidienne/non-euclidienne)
        if (isNonEuclideanWorld(worldId)) {
            terrainBase = applyNonEuclideanTransform(terrainBase, worldId);
        }
        
        // Conversion en format tiles
        List<Map<String, Object>> tiles = convertToTiles(terrainBase, width, height);
        
        mapData.put("tiles", tiles);
        mapData.put("treasures", treasures);
        mapData.put("geometry", isNonEuclideanWorld(worldId) ? "non_euclidean" : "euclidean");
        
        return mapData;
    }

    // ======================
    // ALGORITHMES TERRAIN PROCÉDURAUX
    // ======================
    
    private String[][] generatePerlinTerrain(int width, int height, String worldId) {
        String[][] terrain = new String[height][width];
        
        // Paramètres Perlin selon le monde
        double scale = getWorldScale(worldId);
        int octaves = getWorldOctaves(worldId);
        
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                double noiseValue = generatePerlinNoise(x, y, scale, octaves);
                terrain[y][x] = terrainFromNoise(noiseValue, worldId);
            }
        }
        
        return terrain;
    }
    
    private double generatePerlinNoise(int x, int y, double scale, int octaves) {
        double noise = 0;
        double amplitude = 1;
        double frequency = scale;
        double maxValue = 0;
        
        for (int i = 0; i < octaves; i++) {
            noise += Math.sin(x * frequency) * Math.cos(y * frequency) * amplitude;
            maxValue += amplitude;
            amplitude *= 0.5;
            frequency *= 2;
        }
        
        return noise / maxValue;
    }
    
    private String terrainFromNoise(double noise, String worldId) {
        switch (worldId) {
            case "grofi_forest_world":
                if (noise < -0.4) return "water";
                if (noise < -0.2) return "swamp";
                if (noise < 0.3) return "forest";
                if (noise < 0.6) return "grass";
                return "mountain";
                
            case "temporal_rift_world":
                if (noise < -0.3) return "lava";
                if (noise < 0.0) return "rough";
                if (noise < 0.4) return "grass";
                return "mountain";
                
            case "desert_world":
                if (noise < -0.2) return "water";
                if (noise < 0.5) return "sand";
                if (noise < 0.7) return "rough";
                return "mountain";
                
            default: // Monde classique
                if (noise < -0.3) return "water";
                if (noise < -0.1) return "swamp";
                if (noise < 0.2) return "grass";
                if (noise < 0.4) return "forest";
                return "mountain";
        }
    }

    // ======================
    // RÈGLES MONDE SPÉCIFIQUE
    // ======================
    
    private String[][] applyWorldRules(String[][] terrain, String worldId, int width, int height) {
        switch (worldId) {
            case "grofi_forest_world":
                return addForestClusters(terrain, width, height);
            case "temporal_rift_world":
                return addTemporalRifts(terrain, width, height);
            case "desert_world":
                return addOasis(terrain, width, height);
            default:
                return addBalancedFeatures(terrain, width, height);
        }
    }
    
    private String[][] addForestClusters(String[][] terrain, int width, int height) {
        Random rand = new Random("grofi_forest_world".hashCode()); // Deterministic seed
        
        for (int cluster = 0; cluster < 4; cluster++) {
            int centerX = rand.nextInt(width);
            int centerY = rand.nextInt(height);
            int radius = 3 + rand.nextInt(3);
            
            for (int y = Math.max(0, centerY - radius); y < Math.min(height, centerY + radius); y++) {
                for (int x = Math.max(0, centerX - radius); x < Math.min(width, centerX + radius); x++) {
                    double distance = Math.sqrt((x - centerX) * (x - centerX) + (y - centerY) * (y - centerY));
                    if (distance < radius && rand.nextDouble() < 0.8) {
                        terrain[y][x] = "forest";
                    }
                }
            }
        }
        
        return terrain;
    }
    
    private String[][] addTemporalRifts(String[][] terrain, int width, int height) {
        // Ajouter des zones temporelles spéciales
        int centerX = width / 2;
        int centerY = height / 2;
        
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                double distance = Math.sqrt((x - centerX) * (x - centerX) + (y - centerY) * (y - centerY));
                if (distance < 3) {
                    terrain[y][x] = "temporal_grass";
                } else if (distance < 6 && distance > 4) {
                    terrain[y][x] = "time_rift";
                }
            }
        }
        
        return terrain;
    }
    
    private String[][] addOasis(String[][] terrain, int width, int height) {
        Random rand = new Random("desert_world".hashCode());
        
        // Ajouter 2-3 oasis dans le désert
        for (int oasis = 0; oasis < 3; oasis++) {
            int centerX = rand.nextInt(width);
            int centerY = rand.nextInt(height);
            int radius = 2;
            
            for (int y = Math.max(0, centerY - radius); y < Math.min(height, centerY + radius); y++) {
                for (int x = Math.max(0, centerX - radius); x < Math.min(width, centerX + radius); x++) {
                    double distance = Math.sqrt((x - centerX) * (x - centerX) + (y - centerY) * (y - centerY));
                    if (distance < radius) {
                        terrain[y][x] = "water";
                        if (distance < radius - 1) {
                            terrain[y][x] = "grass";
                        }
                    }
                }
            }
        }
        
        return terrain;
    }
    
    private String[][] addBalancedFeatures(String[][] terrain, int width, int height) {
        // Ajout features équilibrées pour monde classique
        terrain = addMountainRanges(terrain, width, height);
        terrain = addForestPaths(terrain, width, height);
        return terrain;
    }
    
    private String[][] addMountainRanges(String[][] terrain, int width, int height) {
        Random rand = new Random("classic_world".hashCode());
        
        // Chaîne de montagnes diagonale
        int startX = rand.nextInt(width / 3);
        int startY = rand.nextInt(height / 3);
        
        for (int i = 0; i < Math.min(width, height) / 2; i++) {
            int x = startX + i;
            int y = startY + i;
            if (x < width && y < height) {
                terrain[y][x] = "mountain";
            }
        }
        
        return terrain;
    }
    
    private String[][] addForestPaths(String[][] terrain, int width, int height) {
        // Chemins à travers les forêts
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                if (terrain[y][x].equals("forest") && (x + y) % 7 == 0) {
                    terrain[y][x] = "dirt"; // Chemin
                }
            }
        }
        
        return terrain;
    }
    
    private String[][] applyNonEuclideanTransform(String[][] terrain, String worldId) {
        // Transformation géométrique simple pour simulation non-euclidienne
        switch (worldId) {
            case "temporal_rift_world":
                return applyTemporalDistortion(terrain);
            case "grofi_forest_world":
                return applyForestCurvature(terrain);
            default:
                return terrain;
        }
    }
    
    private String[][] applyTemporalDistortion(String[][] terrain) {
        // Distorsion temporelle : certaines zones se répètent
        int height = terrain.length;
        int width = terrain[0].length;
        
        for (int y = height / 4; y < 3 * height / 4; y++) {
            for (int x = width / 4; x < 3 * width / 4; x++) {
                if ((x + y) % 3 == 0) {
                    terrain[y][x] = "temporal_distortion";
                }
            }
        }
        
        return terrain;
    }
    
    private String[][] applyForestCurvature(String[][] terrain) {
        // Courbure forestière : spirales de chemins
        int height = terrain.length;
        int width = terrain[0].length;
        int centerX = width / 2;
        int centerY = height / 2;
        
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                double angle = Math.atan2(y - centerY, x - centerX);
                double distance = Math.sqrt((x - centerX) * (x - centerX) + (y - centerY) * (y - centerY));
                
                if (Math.abs(angle + distance * 0.3) % (Math.PI / 3) < 0.2) {
                    terrain[y][x] = "forest_path";
                }
            }
        }
        
        return terrain;
    }

    // ======================
    // GÉNÉRATION TRÉSORS HOMM3 INTELLIGENTS
    // ======================
    
    private List<Map<String, Object>> generateHomm3Treasures(String[][] terrain, int width, int height) {
        List<Map<String, Object>> treasures = new ArrayList<>();
        Random rand = new Random(Arrays.deepHashCode(terrain)); // Deterministic
        
        // Trésors selon densité terrain
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                String terrainType = terrain[y][x];
                double treasureChance = getTreasureChance(terrainType);
                
                if (rand.nextDouble() < treasureChance) {
                    Map<String, Object> treasure = createIntelligentTreasure(terrainType, x, y, rand);
                    treasures.add(treasure);
                }
            }
        }
        
        // Ajout trésors spéciaux guarantis
        treasures.addAll(addSpecialTreasures(width, height, rand));
        
        return treasures;
    }
    
    private double getTreasureChance(String terrainType) {
        switch (terrainType) {
            case "mountain": return 0.15; // Mines et cavernes
            case "forest": return 0.08;   // Clairières magiques
            case "water": return 0.05;    // Perles et coraux
            case "swamp": return 0.12;    // Artefacts oubliés
            case "desert": return 0.10;   // Ruines antiques
            case "grass": return 0.03;    // Rares trouvailles
            default: return 0.02;
        }
    }
    
    private Map<String, Object> createIntelligentTreasure(String terrainType, int x, int y, Random rand) {
        Map<String, Object> treasure = new HashMap<>();
        treasure.put("x", x);
        treasure.put("y", y);
        treasure.put("terrain_origin", terrainType);
        
        String treasureType = selectTreasureByTerrain(terrainType, rand);
        treasure.put("type", treasureType);
        treasure.put("id", treasureType + "_" + x + "_" + y);
        
        // Récompenses intelligentes selon type
        Map<String, Object> rewards = calculateTreasureRewards(treasureType, terrainType);
        treasure.put("rewards", rewards);
        
        return treasure;
    }
    
    private String selectTreasureByTerrain(String terrainType, Random rand) {
        switch (terrainType) {
            case "mountain":
                return rand.nextBoolean() ? "crystal_cavern" : "ore_mine";
            case "forest":
                return rand.nextBoolean() ? "magic_well" : "ancient_ruins";
            case "water":
                return "mystic_pool";
            case "swamp":
                return "treasure_chest";
            case "desert":
                return "artifact_site";
            default:
                return "gold_pile";
        }
    }
    
    private Map<String, Object> calculateTreasureRewards(String treasureType, String terrainType) {
        Map<String, Object> rewards = new HashMap<>();
        
        switch (treasureType) {
            case "gold_pile":
                rewards.put("gold", 500 + (terrainType.equals("mountain") ? 300 : 0));
                break;
            case "crystal_cavern":
                rewards.put("crystals", 2);
                rewards.put("gems", 1);
                break;
            case "magic_well":
                rewards.put("mana", 5);
                rewards.put("spell_scroll", "random_tier_2");
                break;
            case "artifact_site":
                rewards.put("artifact", "random_minor");
                rewards.put("experience", 1000);
                break;
            default:
                rewards.put("gold", 300);
        }
        
        return rewards;
    }

    // ======================
    // UTILITAIRES MONDE
    // ======================
    
    private double getWorldScale(String worldId) {
        switch (worldId) {
            case "grofi_forest_world": return 0.15;
            case "temporal_rift_world": return 0.25;
            case "desert_world": return 0.1;
            default: return 0.12;
        }
    }
    
    private int getWorldOctaves(String worldId) {
        switch (worldId) {
            case "grofi_forest_world": return 4;
            case "temporal_rift_world": return 6;
            default: return 3;
        }
    }
    
    private boolean isNonEuclideanWorld(String worldId) {
        return worldId.equals("temporal_rift_world") || worldId.equals("grofi_forest_world");
    }

    // ======================
    // CONVERSION DONNÉES
    // ======================
    
    private List<Map<String, Object>> convertToTiles(String[][] terrain, int width, int height) {
        List<Map<String, Object>> tiles = new ArrayList<>();
        
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                Map<String, Object> tile = new HashMap<>();
                tile.put("x", x);
                tile.put("y", y);
                tile.put("terrain", terrain[y][x]);
                tile.put("walkable", isWalkable(terrain[y][x]));
                tile.put("movementCost", TERRAIN_MOVEMENT_COSTS.getOrDefault(terrain[y][x], 100));
                tile.put("visible", false);
                tile.put("explored", false);
                tiles.add(tile);
            }
        }
        
        return tiles;
    }
    
    private boolean isWalkable(String terrainType) {
        return !terrainType.equals("mountain") && !terrainType.equals("water") && !terrainType.equals("lava");
    }

    // ======================
    // API PUBLIQUES
    // ======================
    
    public Map<String, Object> getTerrainInfo(String terrainType) {
        Map<String, Object> info = new HashMap<>();
        info.put("type", terrainType);
        info.put("movementCost", TERRAIN_MOVEMENT_COSTS.getOrDefault(terrainType, 100));
        info.put("walkable", isWalkable(terrainType));
        info.put("treasureChance", getTreasureChance(terrainType));
        return info;
    }
    
    public List<String> getSupportedWorlds() {
        return Arrays.asList(
            "grofi_forest_world", "temporal_rift_world", "desert_world", 
            "classic_world", "mountain_world", "ocean_world"
        );
    }
    
    public Map<String, Object> generateMapPreview(String worldId, int size) {
        return generateIntelligentMap(worldId, "preview", size, size);
    }

    // ======================
    // FEATURES SPÉCIAUX
    // ======================
    
    private String[][] addGeologicalFeatures(String[][] terrain, int width, int height) {
        // Ajout rivières, chaînes montagneuses, etc.
        return addRivers(terrain, width, height);
    }
    
    private String[][] addRivers(String[][] terrain, int width, int height) {
        Random rand = new Random(width * height); // Deterministic
        
        // Rivière horizontale
        int riverY = height / 3 + rand.nextInt(height / 3);
        for (int x = 0; x < width; x++) {
            terrain[riverY][x] = "water";
            if (riverY > 0) terrain[riverY - 1][x] = "grass";
            if (riverY < height - 1) terrain[riverY + 1][x] = "grass";
        }
        
        return terrain;
    }
    
    private List<Map<String, Object>> addSpecialTreasures(int width, int height, Random rand) {
        List<Map<String, Object>> special = new ArrayList<>();
        
        // Dragon Hoard (1 par map)
        Map<String, Object> dragonHoard = new HashMap<>();
        dragonHoard.put("x", width - 3);
        dragonHoard.put("y", height - 3);
        dragonHoard.put("type", "dragon_hoard");
        dragonHoard.put("id", "dragon_hoard_unique");
        dragonHoard.put("rewards", Map.of(
            "gold", 5000,
            "artifact", "random_major",
            "gems", 10,
            "experience", 3000
        ));
        special.add(dragonHoard);
        
        return special;
    }
} 