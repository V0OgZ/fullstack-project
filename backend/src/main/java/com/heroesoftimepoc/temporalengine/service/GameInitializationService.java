package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.model.GameTile;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.repository.GameTileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * 🗺️ GAME INITIALIZATION SERVICE - Initialisation des parties Heroes of Time
 * 
 * Service responsable de :
 * - Initialisation de la carte (tuiles)
 * - Placement des ressources de base
 * - Configuration du terrain
 * - Préparation de l'économie initiale
 * 
 * @author Memento - La Mémoire Vivante
 * @version 1.0 - Implémentation autonome
 */
@Service
@Transactional
public class GameInitializationService {
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private GameTileRepository gameTileRepository;
    
    private final Random random = new Random();
    
    // Types de terrain avec leurs probabilités
    private static final String[] TERRAIN_TYPES = {
        "grass", "forest", "mountain", "water", "swamp", "desert", "hills"
    };
    
    private static final double[] TERRAIN_PROBABILITIES = {
        0.4, 0.2, 0.15, 0.1, 0.05, 0.05, 0.05
    };
    
    /**
     * Initialiser complètement une partie nouvellement créée
     */
    public void initializeGame(Game game) {
        // 1. Initialiser la carte avec les tuiles
        initializeGameMap(game);
        
        // 2. Placer des ressources naturelles
        placeNaturalResources(game);
        
        // 3. Sauvegarder les modifications
        gameRepository.save(game);
    }
    
    /**
     * Initialiser la carte avec toutes les tuiles
     */
    private void initializeGameMap(Game game) {
        List<GameTile> tiles = new ArrayList<>();
        
        int mapWidth = game.getMapWidth();
        int mapHeight = game.getMapHeight();
        
        for (int x = 0; x < mapWidth; x++) {
            for (int y = 0; y < mapHeight; y++) {
                GameTile tile = createTile(x, y, game);
                tiles.add(tile);
            }
        }
        
        // Sauvegarder toutes les tuiles
        gameTileRepository.saveAll(tiles);
        
        // Associer les tuiles au jeu
        game.setTiles(tiles);
    }
    
    /**
     * Créer une tuile individuelle avec terrain approprié
     */
    private GameTile createTile(int x, int y, Game game) {
        String terrain = generateTerrain(x, y, game.getMapWidth(), game.getMapHeight());
        
        GameTile tile = new GameTile(x, y, terrain);
        tile.setGame(game);
        
        // Configurer les propriétés de base selon le terrain
        configureTileProperties(tile, terrain);
        
        return tile;
    }
    
    /**
     * Générer le type de terrain pour une position donnée
     */
    private String generateTerrain(int x, int y, int mapWidth, int mapHeight) {
        // Logique simple de génération de terrain
        double centerX = mapWidth / 2.0;
        double centerY = mapHeight / 2.0;
        double distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        double maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
        double normalizedDistance = distanceFromCenter / maxDistance;
        
        // Plus on s'éloigne du centre, plus le terrain devient difficile
        if (normalizedDistance > 0.8) {
            return random.nextDouble() < 0.6 ? "mountain" : "desert";
        } else if (normalizedDistance > 0.6) {
            return random.nextDouble() < 0.4 ? "forest" : "hills";
        } else if (normalizedDistance > 0.3) {
            return random.nextDouble() < 0.2 ? "water" : 
                   random.nextDouble() < 0.3 ? "forest" : "grass";
        } else {
            // Centre de la carte - principalement herbe
            return random.nextDouble() < 0.8 ? "grass" : "forest";
        }
    }
    
    /**
     * Configurer les propriétés d'une tuile selon son terrain
     */
    private void configureTileProperties(GameTile tile, String terrain) {
        switch (terrain) {
            case "grass":
                tile.setMovementCost(1);
                tile.setDefenseBonus(0);
                break;
            case "forest":
                tile.setMovementCost(2);
                tile.setDefenseBonus(1);
                break;
            case "mountain":
                tile.setMovementCost(3);
                tile.setDefenseBonus(3);
                break;
            case "water":
                tile.setMovementCost(1);
                tile.setDefenseBonus(0);
                break;
            case "swamp":
                tile.setMovementCost(3);
                tile.setDefenseBonus(0);
                break;
            case "desert":
                tile.setMovementCost(2);
                tile.setDefenseBonus(0);
                break;
            case "hills":
                tile.setMovementCost(2);
                tile.setDefenseBonus(2);
                break;
            default:
                tile.setMovementCost(1);
                tile.setDefenseBonus(0);
                break;
        }
    }
    
    /**
     * Placer des ressources naturelles sur la carte
     */
    private void placeNaturalResources(Game game) {
        List<GameTile> tiles = game.getTiles();
        
        // Calculer le nombre de ressources à placer (environ 10% de la carte)
        int totalTiles = tiles.size();
        int resourceTiles = Math.max(1, totalTiles / 10);
        
        // Types de ressources à placer
        String[] resourceBuildings = {
            "GOLD_MINE", "SAWMILL", "STONE_QUARRY", 
            "GEM_MINE", "MERCURY_POOL", "SULFUR_DUNE", "CRYSTAL_CAVERN"
        };
        
        // Probabilités de chaque type de ressource
        double[] resourceProbabilities = {0.3, 0.2, 0.2, 0.1, 0.07, 0.07, 0.06};
        
        for (int i = 0; i < resourceTiles; i++) {
            GameTile tile = tiles.get(random.nextInt(tiles.size()));
            
            // Ne pas placer de ressource sur une tuile qui en a déjà une
            if (tile.hasBuilding()) {
                continue;
            }
            
            // Choisir un type de ressource selon les probabilités
            String resourceType = chooseWeightedRandom(resourceBuildings, resourceProbabilities);
            
            // Vérifier que le terrain est compatible
            if (isTerrainCompatibleWithResource(tile.getTerrain(), resourceType)) {
                tile.buildStructure(resourceType, "neutral");
                gameTileRepository.save(tile);
            }
        }
    }
    
    /**
     * Choisir un élément aléatoirement selon des poids
     */
    private String chooseWeightedRandom(String[] options, double[] weights) {
        double totalWeight = 0;
        for (double weight : weights) {
            totalWeight += weight;
        }
        
        double randomValue = random.nextDouble() * totalWeight;
        double currentWeight = 0;
        
        for (int i = 0; i < options.length; i++) {
            currentWeight += weights[i];
            if (randomValue <= currentWeight) {
                return options[i];
            }
        }
        
        return options[0]; // Fallback
    }
    
    /**
     * Vérifier si un terrain est compatible avec un type de ressource
     */
    private boolean isTerrainCompatibleWithResource(String terrain, String resourceType) {
        switch (resourceType) {
            case "GOLD_MINE":
                return terrain.equals("mountain") || terrain.equals("hills");
            case "SAWMILL":
                return terrain.equals("forest");
            case "STONE_QUARRY":
                return terrain.equals("mountain") || terrain.equals("hills");
            case "GEM_MINE":
                return terrain.equals("mountain");
            case "MERCURY_POOL":
                return terrain.equals("swamp") || terrain.equals("water");
            case "SULFUR_DUNE":
                return terrain.equals("desert") || terrain.equals("mountain");
            case "CRYSTAL_CAVERN":
                return terrain.equals("mountain") || terrain.equals("hills");
            default:
                return true;
        }
    }
    
    /**
     * Initialiser les métadonnées économiques d'un joueur
     */
    public void initializePlayerEconomy(Game game, String playerId) {
        // Ressources de départ pour un nouveau joueur
        game.getMetadata().put(playerId + "_GOLD", 10000);
        game.getMetadata().put(playerId + "_WOOD", 30);
        game.getMetadata().put(playerId + "_STONE", 30);
        game.getMetadata().put(playerId + "_GEMS", 15);
        game.getMetadata().put(playerId + "_MERCURY", 10);
        game.getMetadata().put(playerId + "_SULFUR", 10);
        game.getMetadata().put(playerId + "_CRYSTAL", 10);
        game.getMetadata().put(playerId + "_TEMPORAL_ENERGY", 100);
        game.getMetadata().put(playerId + "_CHRONOS_CRYSTAL", 5);
        
        gameRepository.save(game);
    }
} 