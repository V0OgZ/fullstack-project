package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.model.GameTile;
import com.heroesoftimepoc.temporalengine.model.Hero;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.repository.GameTileRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 🏰 GAMEMASTER SERVICE - Classe Centrale pour l'Économie Heroes of Time
 * 
 * Inspiré de Heroes of Might and Magic 3, ce service gère :
 * - Ressources : GOLD, WOOD, STONE, GEMS, MERCURY, SULFUR, CRYSTAL
 * - Production automatique par tour
 * - Validation des coûts avant construction/recrutement
 * - Revenus des mines, scieries, châteaux
 * - Commerce et échange de ressources
 * 
 * @author Memento - La Mémoire Vivante
 * @version 1.0 - Implémentation autonome
 */
@Service
@Transactional
public class GameMasterService {
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private GameTileRepository gameTileRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    // ============================
    // CONSTANTES ÉCONOMIQUES H3
    // ============================
    
    public enum ResourceType {
        GOLD("Gold", "💰"),
        WOOD("Wood", "🌲"), 
        STONE("Stone", "🪨"),
        GEMS("Gems", "💎"),
        MERCURY("Mercury", "☿️"),
        SULFUR("Sulfur", "🔥"),
        CRYSTAL("Crystal", "💠"),
        // Ressources temporelles spéciales
        TEMPORAL_ENERGY("Temporal Energy", "⚡"),
        CHRONOS_CRYSTAL("Chronos Crystal", "🔮");
        
        private final String displayName;
        private final String emoji;
        
        ResourceType(String displayName, String emoji) {
            this.displayName = displayName;
            this.emoji = emoji;
        }
        
        public String getDisplayName() { return displayName; }
        public String getEmoji() { return emoji; }
    }
    
    // Coûts de construction des bâtiments
    private static final Map<String, Map<ResourceType, Integer>> BUILDING_COSTS = new HashMap<>();
    static {
        // Bâtiments de base H3
        BUILDING_COSTS.put("CASTLE", Map.of(
            ResourceType.GOLD, 2500,
            ResourceType.WOOD, 20,
            ResourceType.STONE, 20
        ));
        
        BUILDING_COSTS.put("FORTRESS", Map.of(
            ResourceType.GOLD, 5000,
            ResourceType.WOOD, 20,
            ResourceType.STONE, 20,
            ResourceType.GEMS, 10
        ));
        
        BUILDING_COSTS.put("WATCHTOWER", Map.of(
            ResourceType.GOLD, 1500,
            ResourceType.WOOD, 10,
            ResourceType.STONE, 10
        ));
        
        BUILDING_COSTS.put("TEMPLE", Map.of(
            ResourceType.GOLD, 3000,
            ResourceType.WOOD, 5,
            ResourceType.STONE, 5,
            ResourceType.GEMS, 5
        ));
        
        BUILDING_COSTS.put("MAGIC_GUILD", Map.of(
            ResourceType.GOLD, 5000,
            ResourceType.WOOD, 5,
            ResourceType.STONE, 5,
            ResourceType.MERCURY, 5,
            ResourceType.SULFUR, 5
        ));
        
        // Bâtiments temporels spéciaux
        BUILDING_COSTS.put("TEMPORAL_ANCHOR", Map.of(
            ResourceType.GOLD, 10000,
            ResourceType.CRYSTAL, 20,
            ResourceType.TEMPORAL_ENERGY, 50
        ));
        
        BUILDING_COSTS.put("NEXUS_GATE", Map.of(
            ResourceType.GOLD, 15000,
            ResourceType.MERCURY, 15,
            ResourceType.CHRONOS_CRYSTAL, 10
        ));
        
        BUILDING_COSTS.put("CHRONO_TOWER", Map.of(
            ResourceType.GOLD, 8000,
            ResourceType.STONE, 25,
            ResourceType.TEMPORAL_ENERGY, 30
        ));
    }
    
    // Production par tour des bâtiments
    private static final Map<String, Map<ResourceType, Integer>> BUILDING_PRODUCTION = new HashMap<>();
    static {
        BUILDING_PRODUCTION.put("GOLD_MINE", Map.of(ResourceType.GOLD, 1000));
        BUILDING_PRODUCTION.put("SAWMILL", Map.of(ResourceType.WOOD, 7));
        BUILDING_PRODUCTION.put("STONE_QUARRY", Map.of(ResourceType.STONE, 7));
        BUILDING_PRODUCTION.put("GEM_MINE", Map.of(ResourceType.GEMS, 3));
        BUILDING_PRODUCTION.put("MERCURY_POOL", Map.of(ResourceType.MERCURY, 1));
        BUILDING_PRODUCTION.put("SULFUR_DUNE", Map.of(ResourceType.SULFUR, 1));
        BUILDING_PRODUCTION.put("CRYSTAL_CAVERN", Map.of(ResourceType.CRYSTAL, 1));
        
        // Production temporelle
        BUILDING_PRODUCTION.put("TEMPORAL_ANCHOR", Map.of(ResourceType.TEMPORAL_ENERGY, 10));
        BUILDING_PRODUCTION.put("CHRONOS_TOWER", Map.of(ResourceType.CHRONOS_CRYSTAL, 2));
    }
    
    // Chaînes de prérequis
    private static final Map<String, List<String>> BUILDING_PREREQUISITES = new HashMap<>();
    static {
        BUILDING_PREREQUISITES.put("FORTRESS", List.of("CASTLE"));
        BUILDING_PREREQUISITES.put("MAGIC_GUILD", List.of("TEMPLE"));
        BUILDING_PREREQUISITES.put("NEXUS_GATE", List.of("TEMPORAL_ANCHOR"));
        BUILDING_PREREQUISITES.put("CHRONO_TOWER", List.of("WATCHTOWER", "TEMPORAL_ANCHOR"));
    }
    
    // ============================
    // GESTION DES RESSOURCES
    // ============================
    
    /**
     * Obtenir les ressources actuelles d'un joueur
     */
    public Map<ResourceType, Integer> getPlayerResources(Long gameId, String playerId) {
        Optional<Game> gameOpt = gameRepository.findById(gameId);
        if (!gameOpt.isPresent()) {
            return new HashMap<>();
        }
        
        Game game = gameOpt.get();
        Map<ResourceType, Integer> resources = new HashMap<>();
        
        // Initialiser avec les ressources de base
        for (ResourceType type : ResourceType.values()) {
            resources.put(type, getStoredResource(game, playerId, type));
        }
        
        return resources;
    }
    
    /**
     * Obtenir une ressource spécifique stockée
     */
    private Integer getStoredResource(Game game, String playerId, ResourceType resourceType) {
        // Pour l'instant, utiliser les métadonnées du jeu
        // Dans une implémentation complète, cela viendrait d'une table Player
        String key = playerId + "_" + resourceType.name();
        return game.getMetadata().getOrDefault(key, getDefaultResourceAmount(resourceType));
    }
    
    /**
     * Définir une ressource stockée
     */
    private void setStoredResource(Game game, String playerId, ResourceType resourceType, Integer amount) {
        String key = playerId + "_" + resourceType.name();
        game.getMetadata().put(key, amount);
        gameRepository.save(game);
    }
    
    /**
     * Montants de ressources par défaut
     */
    private Integer getDefaultResourceAmount(ResourceType resourceType) {
        switch (resourceType) {
            case GOLD: return 10000;
            case WOOD: return 20;
            case STONE: return 20;
            case GEMS: return 10;
            case MERCURY: return 5;
            case SULFUR: return 5;
            case CRYSTAL: return 5;
            case TEMPORAL_ENERGY: return 100;
            case CHRONOS_CRYSTAL: return 3;
            default: return 0;
        }
    }
    
    // ============================
    // VALIDATION DES COÛTS
    // ============================
    
    /**
     * Vérifier si un joueur peut se permettre un coût
     */
    public ValidationResult canAfford(Long gameId, String playerId, Map<ResourceType, Integer> cost) {
        Map<ResourceType, Integer> playerResources = getPlayerResources(gameId, playerId);
        
        List<String> missingResources = new ArrayList<>();
        
        for (Map.Entry<ResourceType, Integer> entry : cost.entrySet()) {
            ResourceType resource = entry.getKey();
            Integer required = entry.getValue();
            Integer available = playerResources.getOrDefault(resource, 0);
            
            if (available < required) {
                missingResources.add(String.format("%s %s (need %d, have %d)", 
                    resource.getEmoji(), resource.getDisplayName(), required, available));
            }
        }
        
        return new ValidationResult(missingResources.isEmpty(), missingResources);
    }
    
    /**
     * Consommer des ressources
     */
    public boolean consumeResources(Long gameId, String playerId, Map<ResourceType, Integer> cost) {
        ValidationResult validation = canAfford(gameId, playerId, cost);
        if (!validation.isValid()) {
            return false;
        }
        
        Optional<Game> gameOpt = gameRepository.findById(gameId);
        if (!gameOpt.isPresent()) {
            return false;
        }
        
        Game game = gameOpt.get();
        
        // Consommer les ressources
        for (Map.Entry<ResourceType, Integer> entry : cost.entrySet()) {
            ResourceType resource = entry.getKey();
            Integer currentAmount = getStoredResource(game, playerId, resource);
            Integer newAmount = currentAmount - entry.getValue();
            setStoredResource(game, playerId, resource, newAmount);
        }
        
        return true;
    }
    
    // ============================
    // CONSTRUCTION DE BÂTIMENTS
    // ============================
    
    /**
     * Construire un bâtiment
     */
    public BuildResult buildStructure(Long gameId, String playerId, String buildingType, int x, int y) {
        Optional<Game> gameOpt = gameRepository.findById(gameId);
        if (!gameOpt.isPresent()) {
            return new BuildResult(false, "Game not found", null);
        }
        
        Game game = gameOpt.get();
        GameTile tile = game.getTileAt(x, y);
        if (tile == null) {
            return new BuildResult(false, "Tile not found at position (" + x + ", " + y + ")", null);
        }
        
        // Vérifier si la tuile est libre
        if (tile.hasBuilding()) {
            return new BuildResult(false, "Tile already has a building: " + tile.getBuildingType(), null);
        }
        
        // Vérifier les prérequis
        ValidationResult prerequisiteCheck = checkBuildingPrerequisites(game, playerId, buildingType);
        if (!prerequisiteCheck.isValid()) {
            return new BuildResult(false, "Prerequisites not met: " + 
                String.join(", ", prerequisiteCheck.getErrors()), null);
        }
        
        // Vérifier le coût
        Map<ResourceType, Integer> cost = BUILDING_COSTS.get(buildingType);
        if (cost == null) {
            return new BuildResult(false, "Unknown building type: " + buildingType, null);
        }
        
        ValidationResult affordabilityCheck = canAfford(gameId, playerId, cost);
        if (!affordabilityCheck.isValid()) {
            return new BuildResult(false, "Cannot afford building. Missing: " + 
                String.join(", ", affordabilityCheck.getErrors()), null);
        }
        
        // Consommer les ressources
        if (!consumeResources(gameId, playerId, cost)) {
            return new BuildResult(false, "Failed to consume resources", null);
        }
        
        // Construire le bâtiment
        tile.buildStructure(buildingType, playerId);
        gameTileRepository.save(tile);
        
        return new BuildResult(true, "Building " + buildingType + " constructed successfully", 
            new BuildingInfo(buildingType, playerId, x, y));
    }
    
    /**
     * Vérifier les prérequis de construction
     */
    private ValidationResult checkBuildingPrerequisites(Game game, String playerId, String buildingType) {
        List<String> prerequisites = BUILDING_PREREQUISITES.get(buildingType);
        if (prerequisites == null || prerequisites.isEmpty()) {
            return new ValidationResult(true, List.of());
        }
        
        List<String> missingPrerequisites = new ArrayList<>();
        
        for (String prerequisite : prerequisites) {
            boolean hasPrerequisite = game.getTiles().stream()
                .anyMatch(tile -> prerequisite.equals(tile.getBuildingType()) && 
                         playerId.equals(tile.getBuildingOwner()));
            
            if (!hasPrerequisite) {
                missingPrerequisites.add(prerequisite);
            }
        }
        
        return new ValidationResult(missingPrerequisites.isEmpty(), missingPrerequisites);
    }
    
    // ============================
    // PRODUCTION AUTOMATIQUE
    // ============================
    
    /**
     * Traiter la production de ressources pour un tour
     */
    public ProductionResult processResourceProduction(Long gameId, String playerId) {
        Optional<Game> gameOpt = gameRepository.findById(gameId);
        if (!gameOpt.isPresent()) {
            return new ProductionResult(false, "Game not found", Map.of());
        }
        
        Game game = gameOpt.get();
        Map<ResourceType, Integer> totalProduction = new HashMap<>();
        
        // Calculer la production de tous les bâtiments du joueur
        for (GameTile tile : game.getTiles()) {
            if (tile.hasBuilding() && playerId.equals(tile.getBuildingOwner())) {
                String buildingType = tile.getBuildingType();
                Map<ResourceType, Integer> buildingProduction = BUILDING_PRODUCTION.get(buildingType);
                
                if (buildingProduction != null) {
                    for (Map.Entry<ResourceType, Integer> entry : buildingProduction.entrySet()) {
                        totalProduction.merge(entry.getKey(), entry.getValue(), Integer::sum);
                    }
                }
            }
        }
        
        // Ajouter la production de base (château principal)
        totalProduction.put(ResourceType.GOLD, totalProduction.getOrDefault(ResourceType.GOLD, 0) + 1000);
        totalProduction.put(ResourceType.WOOD, totalProduction.getOrDefault(ResourceType.WOOD, 0) + 2);
        totalProduction.put(ResourceType.STONE, totalProduction.getOrDefault(ResourceType.STONE, 0) + 2);
        
        // Appliquer la production
        for (Map.Entry<ResourceType, Integer> entry : totalProduction.entrySet()) {
            ResourceType resource = entry.getKey();
            Integer currentAmount = getStoredResource(game, playerId, resource);
            Integer newAmount = currentAmount + entry.getValue();
            setStoredResource(game, playerId, resource, newAmount);
        }
        
        return new ProductionResult(true, "Resources produced successfully", totalProduction);
    }
    
    // ============================
    // COMMERCE ET ÉCHANGE
    // ============================
    
    /**
     * Échanger des ressources
     */
    public TradeResult tradeResources(Long gameId, String playerId, 
                                    ResourceType fromResource, Integer fromAmount,
                                    ResourceType toResource, Integer toAmount) {
        
        // Taux de change basiques (inspirés de H3)
        Map<ResourceType, Double> exchangeRates = Map.of(
            ResourceType.WOOD, 1.0,
            ResourceType.STONE, 1.0, 
            ResourceType.GEMS, 2.0,
            ResourceType.MERCURY, 3.0,
            ResourceType.SULFUR, 3.0,
            ResourceType.CRYSTAL, 3.0,
            ResourceType.TEMPORAL_ENERGY, 5.0,
            ResourceType.CHRONOS_CRYSTAL, 10.0
        );
        
        double fromValue = fromAmount * exchangeRates.getOrDefault(fromResource, 1.0);
        double toValue = toAmount * exchangeRates.getOrDefault(toResource, 1.0);
        
        // Vérifier si l'échange est équitable (avec une marge de 10%)
        if (Math.abs(fromValue - toValue) > fromValue * 0.1) {
            return new TradeResult(false, "Unfair trade. Value difference too high", null);
        }
        
        // Vérifier si le joueur a assez de ressources
        ValidationResult affordability = canAfford(gameId, playerId, Map.of(fromResource, fromAmount));
        if (!affordability.isValid()) {
            return new TradeResult(false, "Cannot afford trade: " + 
                String.join(", ", affordability.getErrors()), null);
        }
        
        // Effectuer l'échange
        Optional<Game> gameOpt = gameRepository.findById(gameId);
        if (!gameOpt.isPresent()) {
            return new TradeResult(false, "Game not found", null);
        }
        
        Game game = gameOpt.get();
        
        // Retirer les ressources données
        Integer currentFrom = getStoredResource(game, playerId, fromResource);
        setStoredResource(game, playerId, fromResource, currentFrom - fromAmount);
        
        // Ajouter les ressources reçues
        Integer currentTo = getStoredResource(game, playerId, toResource);
        setStoredResource(game, playerId, toResource, currentTo + toAmount);
        
        TradeInfo tradeInfo = new TradeInfo(fromResource, fromAmount, toResource, toAmount);
        return new TradeResult(true, "Trade completed successfully", tradeInfo);
    }
    
    // ============================
    // CLASSES DE RÉSULTAT
    // ============================
    
    public static class ValidationResult {
        private final boolean valid;
        private final List<String> errors;
        
        public ValidationResult(boolean valid, List<String> errors) {
            this.valid = valid;
            this.errors = errors;
        }
        
        public boolean isValid() { return valid; }
        public List<String> getErrors() { return errors; }
    }
    
    public static class BuildResult {
        private final boolean success;
        private final String message;
        private final BuildingInfo buildingInfo;
        
        public BuildResult(boolean success, String message, BuildingInfo buildingInfo) {
            this.success = success;
            this.message = message;
            this.buildingInfo = buildingInfo;
        }
        
        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public BuildingInfo getBuildingInfo() { return buildingInfo; }
    }
    
    public static class BuildingInfo {
        private final String type;
        private final String owner;
        private final int x, y;
        
        public BuildingInfo(String type, String owner, int x, int y) {
            this.type = type;
            this.owner = owner;
            this.x = x;
            this.y = y;
        }
        
        public String getType() { return type; }
        public String getOwner() { return owner; }
        public int getX() { return x; }
        public int getY() { return y; }
    }
    
    public static class ProductionResult {
        private final boolean success;
        private final String message;
        private final Map<ResourceType, Integer> production;
        
        public ProductionResult(boolean success, String message, Map<ResourceType, Integer> production) {
            this.success = success;
            this.message = message;
            this.production = production;
        }
        
        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public Map<ResourceType, Integer> getProduction() { return production; }
    }
    
    public static class TradeResult {
        private final boolean success;
        private final String message;
        private final TradeInfo tradeInfo;
        
        public TradeResult(boolean success, String message, TradeInfo tradeInfo) {
            this.success = success;
            this.message = message;
            this.tradeInfo = tradeInfo;
        }
        
        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public TradeInfo getTradeInfo() { return tradeInfo; }
    }
    
    public static class TradeInfo {
        private final ResourceType fromResource;
        private final Integer fromAmount;
        private final ResourceType toResource;
        private final Integer toAmount;
        
        public TradeInfo(ResourceType fromResource, Integer fromAmount, 
                        ResourceType toResource, Integer toAmount) {
            this.fromResource = fromResource;
            this.fromAmount = fromAmount;
            this.toResource = toResource;
            this.toAmount = toAmount;
        }
        
        public ResourceType getFromResource() { return fromResource; }
        public Integer getFromAmount() { return fromAmount; }
        public ResourceType getToResource() { return toResource; }
        public Integer getToAmount() { return toAmount; }
    }
} 