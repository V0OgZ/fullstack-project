package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.GameMasterService;
import com.heroesoftimepoc.temporalengine.service.GameMasterService.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 🏰 GAMEMASTER API CONTROLLER - Interface REST pour l'Économie Heroes of Time
 * 
 * Endpoints pour :
 * - Gestion des ressources joueur
 * - Construction de bâtiments
 * - Production automatique
 * - Commerce et échanges
 * 
 * @author Memento - La Mémoire Vivante
 * @version 1.0 - Implémentation autonome
 */
@RestController
@RequestMapping("/api/gamemaster")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8000", "http://localhost:5173", "http://localhost:5174", "http://localhost:8001"})
public class GameMasterController {
    
    @Autowired
    private GameMasterService gameMasterService;
    
    // ============================
    // GESTION DES RESSOURCES
    // ============================
    
    /**
     * Obtenir les ressources d'un joueur
     */
    @GetMapping("/resources/{gameId}/{playerId}")
    public ResponseEntity<Map<String, Object>> getPlayerResources(
            @PathVariable Long gameId, 
            @PathVariable String playerId) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            Map<GameMasterService.ResourceType, Integer> resources = 
                gameMasterService.getPlayerResources(gameId, playerId);
            
            // Convertir en format JSON-friendly
            Map<String, Object> resourcesJson = new HashMap<>();
            for (Map.Entry<GameMasterService.ResourceType, Integer> entry : resources.entrySet()) {
                GameMasterService.ResourceType type = entry.getKey();
                resourcesJson.put(type.name(), Map.of(
                    "amount", entry.getValue(),
                    "displayName", type.getDisplayName(),
                    "emoji", type.getEmoji()
                ));
            }
            
            response.put("success", true);
            response.put("resources", resourcesJson);
            response.put("gameId", gameId);
            response.put("playerId", playerId);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // ============================
    // CONSTRUCTION DE BÂTIMENTS
    // ============================
    
    /**
     * Construire un bâtiment
     */
    @PostMapping("/build/{gameId}")
    public ResponseEntity<Map<String, Object>> buildStructure(
            @PathVariable Long gameId,
            @RequestBody Map<String, Object> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String playerId = (String) request.get("playerId");
            String buildingType = (String) request.get("buildingType");
            Integer x = (Integer) request.get("x");
            Integer y = (Integer) request.get("y");
            
            if (playerId == null || buildingType == null || x == null || y == null) {
                response.put("success", false);
                response.put("error", "Missing required parameters: playerId, buildingType, x, y");
                return ResponseEntity.badRequest().body(response);
            }
            
            BuildResult result = gameMasterService.buildStructure(gameId, playerId, buildingType, x, y);
            
            response.put("success", result.isSuccess());
            response.put("message", result.getMessage());
            
            if (result.isSuccess() && result.getBuildingInfo() != null) {
                BuildingInfo info = result.getBuildingInfo();
                response.put("building", Map.of(
                    "type", info.getType(),
                    "owner", info.getOwner(),
                    "x", info.getX(),
                    "y", info.getY()
                ));
            }
            
            return result.isSuccess() ? 
                ResponseEntity.ok(response) : 
                ResponseEntity.badRequest().body(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Obtenir les coûts de construction
     */
    @GetMapping("/building-costs/{buildingType}")
    public ResponseEntity<Map<String, Object>> getBuildingCosts(@PathVariable String buildingType) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Cette information pourrait être exposée depuis GameMasterService
            // Pour l'instant, retourner une réponse basique
            response.put("success", true);
            response.put("buildingType", buildingType);
            response.put("message", "Building costs endpoint - implementation needed");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // ============================
    // PRODUCTION DE RESSOURCES
    // ============================
    
    /**
     * Traiter la production de ressources pour un tour
     */
    @PostMapping("/production/{gameId}/{playerId}")
    public ResponseEntity<Map<String, Object>> processProduction(
            @PathVariable Long gameId,
            @PathVariable String playerId) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            ProductionResult result = gameMasterService.processResourceProduction(gameId, playerId);
            
            response.put("success", result.isSuccess());
            response.put("message", result.getMessage());
            
            if (result.isSuccess()) {
                Map<String, Object> productionJson = new HashMap<>();
                for (Map.Entry<GameMasterService.ResourceType, Integer> entry : result.getProduction().entrySet()) {
                    GameMasterService.ResourceType type = entry.getKey();
                    productionJson.put(type.name(), Map.of(
                        "amount", entry.getValue(),
                        "displayName", type.getDisplayName(),
                        "emoji", type.getEmoji()
                    ));
                }
                response.put("production", productionJson);
            }
            
            return result.isSuccess() ? 
                ResponseEntity.ok(response) : 
                ResponseEntity.badRequest().body(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // ============================
    // COMMERCE ET ÉCHANGES
    // ============================
    
    /**
     * Échanger des ressources
     */
    @PostMapping("/trade/{gameId}")
    public ResponseEntity<Map<String, Object>> tradeResources(
            @PathVariable Long gameId,
            @RequestBody Map<String, Object> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String playerId = (String) request.get("playerId");
            String fromResourceStr = (String) request.get("fromResource");
            Integer fromAmount = (Integer) request.get("fromAmount");
            String toResourceStr = (String) request.get("toResource");
            Integer toAmount = (Integer) request.get("toAmount");
            
            if (playerId == null || fromResourceStr == null || fromAmount == null || 
                toResourceStr == null || toAmount == null) {
                response.put("success", false);
                response.put("error", "Missing required parameters: playerId, fromResource, fromAmount, toResource, toAmount");
                return ResponseEntity.badRequest().body(response);
            }
            
            GameMasterService.ResourceType fromResource = GameMasterService.ResourceType.valueOf(fromResourceStr);
            GameMasterService.ResourceType toResource = GameMasterService.ResourceType.valueOf(toResourceStr);
            
            TradeResult result = gameMasterService.tradeResources(
                gameId, playerId, fromResource, fromAmount, toResource, toAmount);
            
            response.put("success", result.isSuccess());
            response.put("message", result.getMessage());
            
            if (result.isSuccess() && result.getTradeInfo() != null) {
                TradeInfo info = result.getTradeInfo();
                response.put("trade", Map.of(
                    "from", Map.of(
                        "resource", info.getFromResource().name(),
                        "amount", info.getFromAmount(),
                        "emoji", info.getFromResource().getEmoji()
                    ),
                    "to", Map.of(
                        "resource", info.getToResource().name(),
                        "amount", info.getToAmount(),
                        "emoji", info.getToResource().getEmoji()
                    )
                ));
            }
            
            return result.isSuccess() ? 
                ResponseEntity.ok(response) : 
                ResponseEntity.badRequest().body(response);
            
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("error", "Invalid resource type: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // ============================
    // VALIDATION ET VÉRIFICATION
    // ============================
    
    /**
     * Vérifier si un joueur peut se permettre un coût
     */
    @PostMapping("/can-afford/{gameId}/{playerId}")
    public ResponseEntity<Map<String, Object>> canAfford(
            @PathVariable Long gameId,
            @PathVariable String playerId,
            @RequestBody Map<String, Object> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            @SuppressWarnings("unchecked")
            Map<String, Integer> costMap = (Map<String, Integer>) request.get("cost");
            
            if (costMap == null) {
                response.put("success", false);
                response.put("error", "Missing cost parameter");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Convertir en ResourceType
            Map<GameMasterService.ResourceType, Integer> cost = new HashMap<>();
            for (Map.Entry<String, Integer> entry : costMap.entrySet()) {
                GameMasterService.ResourceType resourceType = GameMasterService.ResourceType.valueOf(entry.getKey());
                cost.put(resourceType, entry.getValue());
            }
            
            ValidationResult result = gameMasterService.canAfford(gameId, playerId, cost);
            
            response.put("success", true);
            response.put("canAfford", result.isValid());
            response.put("errors", result.getErrors());
            
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("error", "Invalid resource type: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // ============================
    // INFORMATIONS GÉNÉRALES
    // ============================
    
    /**
     * Status du GameMaster
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        Map<String, Object> response = new HashMap<>();
        
        response.put("status", "active");
        response.put("service", "GameMaster - Heroes of Time Economy");
        response.put("version", "1.0");
        response.put("author", "Memento - La Mémoire Vivante");
        response.put("features", Map.of(
            "resources", "GOLD, WOOD, STONE, GEMS, MERCURY, SULFUR, CRYSTAL, TEMPORAL_ENERGY, CHRONOS_CRYSTAL",
            "buildings", "CASTLE, FORTRESS, WATCHTOWER, TEMPLE, MAGIC_GUILD, TEMPORAL_ANCHOR, NEXUS_GATE, CHRONO_TOWER",
            "production", "Automatic resource generation per turn",
            "trade", "Resource exchange with fair value validation",
            "validation", "Cost checking and prerequisite verification"
        ));
        response.put("timestamp", System.currentTimeMillis());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Liste des types de ressources disponibles
     */
    @GetMapping("/resource-types")
    public ResponseEntity<Map<String, Object>> getResourceTypes() {
        Map<String, Object> response = new HashMap<>();
        
        Map<String, Object> resourceTypes = new HashMap<>();
        for (GameMasterService.ResourceType type : GameMasterService.ResourceType.values()) {
            resourceTypes.put(type.name(), Map.of(
                "displayName", type.getDisplayName(),
                "emoji", type.getEmoji()
            ));
        }
        
        response.put("success", true);
        response.put("resourceTypes", resourceTypes);
        
        return ResponseEntity.ok(response);
    }
} 