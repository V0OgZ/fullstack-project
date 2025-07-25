package com.example.demo.controller;

import com.example.demo.service.GameService;
import com.example.demo.service.GameStateService;
import com.example.demo.service.QuantumStressMonitor;
import com.example.demo.service.RecursionProtector;
import com.example.demo.model.Panopticon6DView;
import com.example.demo.model.ObservationRequest;
import com.example.demo.model.ObservationResult;
import com.example.demo.model.AlertRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 🏛️ PANOPTICON CONTROLLER - VISION 6D OPUS
 * ==========================================
 * 
 * Contrôleur pour le Panopticon 6D selon les spécifications d'OPUS.
 * Gère la visualisation des 6 dimensions : t, x, y, ψ, Σ, S, 𝕽
 * 
 * OPUS: "Le Panopticon voit tout, mais ne révèle que ce que l'observateur peut comprendre"
 * STATUS: ✅ CRÉÉ selon specs OPUS 4ème visite
 */
@RestController
@RequestMapping("/api/panopticon")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8001"})
public class PanopticonController {
    
    @Autowired
    private GameService gameService;
    
    @Autowired
    private GameStateService gameStateService;
    
    @Autowired
    private QuantumStressMonitor quantumStressMonitor;
    
    @Autowired
    private RecursionProtector recursionProtector;
    
    /**
     * 🌐 Vue 6D complète d'un monde
     * Dimensions: t(temps), x,y,z(espace), ψ(causalité), Σ(superposition), S(entropie), 𝕽(récursivité)
     */
    @GetMapping("/view/{worldId}")
    public ResponseEntity<Panopticon6DView> getWorldView(@PathVariable String worldId) {
        try {
            Panopticon6DView view = new Panopticon6DView();
            
            // Vérifier la profondeur de récursion
            recursionProtector.enterRecursion(worldId);
            
            try {
                // Dimensions spatiales et temporelles (t, x, y, z)
                view.setTimelines(gameService.getTimelinesForWorld(worldId));
                view.setZones(gameService.getActiveZones(worldId));
                
                // Dimensions quantiques (ψ, Σ, S)
                view.setCausalityLinks(calculateCausality(worldId));
                view.setSuperpositions(calculateSuperpositions(worldId));
                view.setEntropyMap(calculateEntropy(worldId));
                
                // Dimension récursive (𝕽)
                view.setRecursionDepth(recursionProtector.getRecursionDepth(worldId));
                view.setRecursionLayers(getRecursionLayers(worldId));
                
                // Métadonnées 6D complètes
                Map<String, Object> dimensionalData = new HashMap<>();
                dimensionalData.put("t", view.getTimelines().stream().map(t -> t.getCurrentTurn()).collect(Collectors.toList()));
                dimensionalData.put("x", view.getZones().stream().map(z -> z.getX()).collect(Collectors.toList()));
                dimensionalData.put("y", view.getZones().stream().map(z -> z.getY()).collect(Collectors.toList()));
                dimensionalData.put("z", view.getZones().stream().map(z -> z.getZ()).collect(Collectors.toList()));
                dimensionalData.put("ψ", view.getCausalityLinks().size());
                dimensionalData.put("Σ", view.getSuperpositions().size());
                dimensionalData.put("S", calculateAverageEntropy(view.getEntropyMap()));
                dimensionalData.put("𝕽", view.getRecursionDepth());
                
                view.setDimensionalData(dimensionalData);
                
                // Alertes et monitoring
                view.setQuantumAlerts(quantumStressMonitor.getActiveAlerts(worldId));
                view.setSystemMetrics(quantumStressMonitor.getSystemMetrics());
                
                return ResponseEntity.ok(view);
                
            } finally {
                recursionProtector.exitRecursion(worldId);
            }
            
        } catch (RecursionLimitException e) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .body(createErrorView("Recursion limit exceeded: " + e.getMessage()));
        } catch (Exception e) {
            quantumStressMonitor.fireQuantumDisturbanceEvent("PANOPTICON_ERROR", 
                "Error generating 6D view for world " + worldId + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorView("Quantum disturbance detected: " + e.getMessage()));
        }
    }
    
    /**
     * 👁️ Observer un état quantique (peut causer un collapse)
     */
    @PostMapping("/observe")
    public ResponseEntity<ObservationResult> observeState(@RequestBody ObservationRequest request) {
        ObservationResult result = new ObservationResult();
        
        try {
            // Enregistrer l'observation pour monitoring
            quantumStressMonitor.recordObservation(request.getInstanceId(), request.getObserverId());
            
            // Vérifier si l'observation cause un collapse
            if (gameStateService.isInSuperposition(request.getInstanceId())) {
                if (request.isSimulateOnly()) {
                    result.setSimulated(true);
                    result.setPossibleOutcomes(gameStateService.simulateCollapse(request.getInstanceId()));
                } else {
                    result.setCollapsed(true);
                    result.setNewState(gameStateService.collapseState(request.getInstanceId(), request.getObserverId()));
                    
                    // Déclencher événement de collapse
                    quantumStressMonitor.fireQuantumDisturbanceEvent("QUANTUM_COLLAPSE", 
                        "State collapsed by observer " + request.getObserverId());
                }
            } else {
                result.setProjectedState(gameStateService.getProjectedState(request.getInstanceId()));
            }
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            quantumStressMonitor.fireQuantumDisturbanceEvent("OBSERVATION_ERROR", 
                "Error during observation: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ObservationResult.error("Observation failed: " + e.getMessage()));
        }
    }
    
    /**
     * 🚨 Déclencher une alerte quantique manuelle
     */
    @PostMapping("/trigger-alert")
    public ResponseEntity<Map<String, Object>> triggerAlert(@RequestBody AlertRequest request) {
        try {
            // Vérifications de sécurité selon specs OPUS
            if (recursionProtector.getCurrentDepth() > 4) {
                quantumStressMonitor.fireQuantumDisturbanceEvent(
                    "RECURSION_OVERFLOW", 
                    "Recursion depth exceeded safe limit of 4"
                );
            }
            
            // Traitement selon le type d'alerte
            Map<String, Object> response = new HashMap<>();
            response.put("alertId", UUID.randomUUID().toString());
            response.put("type", request.getAlertType());
            response.put("timestamp", new Date());
            
            switch (request.getAlertType()) {
                case "SOURCE_REUSE":
                    response = handleSourceReuseAlert(request);
                    break;
                case "DIMENSIONAL_BREACH":
                    response = handleDimensionalBreachAlert(request);
                    break;
                case "QUANTUM_OVERLOAD":
                    response = handleQuantumOverloadAlert(request);
                    break;
                default:
                    quantumStressMonitor.fireQuantumDisturbanceEvent(request.getAlertType(), 
                        request.getMessage());
                    response.put("handled", true);
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Alert processing failed: " + e.getMessage()));
        }
    }
    
    /**
     * 🌐 Obtenir le graphe des connexions interdimensionnelles
     */
    @GetMapping("/multiverse-graph")
    public ResponseEntity<Map<String, Object>> getMultiverseGraph() {
        try {
            Map<String, Object> graph = new HashMap<>();
            
            // Récupérer tous les mondes virtuels (dimension M)
            List<String> virtualWorlds = gameService.getAllVirtualWorlds();
            graph.put("worlds", virtualWorlds);
            
            // Connexions entre mondes
            List<Map<String, Object>> connections = new ArrayList<>();
            for (int i = 0; i < virtualWorlds.size() - 1; i++) {
                Map<String, Object> connection = new HashMap<>();
                connection.put("from", virtualWorlds.get(i));
                connection.put("to", virtualWorlds.get(i + 1));
                connection.put("stability", 0.7 + Math.random() * 0.3);
                connection.put("type", "QUANTUM_BRIDGE");
                connections.add(connection);
            }
            graph.put("connections", connections);
            
            // Métadonnées multiverselles
            graph.put("dimensionCount", 6);
            graph.put("activeRecursions", recursionProtector.getActiveRecursions());
            graph.put("quantumStress", quantumStressMonitor.getCurrentStressLevel());
            
            return ResponseEntity.ok(graph);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Multiverse graph generation failed: " + e.getMessage()));
        }
    }
    
    // ========================================
    // MÉTHODES PRIVÉES DE CALCUL
    // ========================================
    
    private List<Map<String, Object>> calculateCausality(String worldId) {
        // Calcul des liens causaux (dimension ψ)
        List<Map<String, Object>> causalLinks = new ArrayList<>();
        
        // Récupérer les actions causales du monde
        // TODO: Intégrer avec WorldStateGraphController existant
        
        return causalLinks;
    }
    
    private List<Map<String, Object>> calculateSuperpositions(String worldId) {
        // Calcul des superpositions quantiques (dimension Σ)
        List<Map<String, Object>> superpositions = new ArrayList<>();
        
        // Identifier les états non-effondrés
        // TODO: Intégrer avec le système quantique existant
        
        return superpositions;
    }
    
    private Map<String, Double> calculateEntropy(String worldId) {
        // Calcul de l'entropie ontologique (dimension S)
        Map<String, Double> entropyMap = new HashMap<>();
        
        // Calculer la complexité/instabilité par zone
        // TODO: Implémenter algorithme d'entropie
        
        return entropyMap;
    }
    
    private List<Map<String, Object>> getRecursionLayers(String worldId) {
        // Récupérer les couches de récursion (dimension 𝕽)
        List<Map<String, Object>> layers = new ArrayList<>();
        
        int depth = recursionProtector.getRecursionDepth(worldId);
        for (int i = 0; i < depth; i++) {
            Map<String, Object> layer = new HashMap<>();
            layer.put("level", i);
            layer.put("worldId", worldId + "-R" + i);
            layer.put("stability", 1.0 - (i * 0.2)); // Stabilité décroissante
            layers.add(layer);
        }
        
        return layers;
    }
    
    private double calculateAverageEntropy(Map<String, Double> entropyMap) {
        return entropyMap.values().stream()
            .mapToDouble(Double::doubleValue)
            .average()
            .orElse(0.0);
    }
    
    private Panopticon6DView createErrorView(String errorMessage) {
        Panopticon6DView errorView = new Panopticon6DView();
        errorView.setError(true);
        errorView.setErrorMessage(errorMessage);
        return errorView;
    }
    
    private Map<String, Object> handleSourceReuseAlert(AlertRequest request) {
        // Traitement spécial pour réutilisation de Source
        quantumStressMonitor.recordSourceUsage(request.getInstanceId(), "SOURCE");
        
        Map<String, Object> response = new HashMap<>();
        response.put("alertId", UUID.randomUUID().toString());
        response.put("type", "SOURCE_REUSE");
        response.put("action", "TEMPORAL_LAG_ACTIVATED");
        response.put("handled", true);
        
        return response;
    }
    
    private Map<String, Object> handleDimensionalBreachAlert(AlertRequest request) {
        // Traitement pour rupture dimensionnelle
        Map<String, Object> response = new HashMap<>();
        response.put("alertId", UUID.randomUUID().toString());
        response.put("type", "DIMENSIONAL_BREACH");
        response.put("action", "DIMENSION_SEALED");
        response.put("handled", true);
        
        return response;
    }
    
    private Map<String, Object> handleQuantumOverloadAlert(AlertRequest request) {
        // Traitement pour surcharge quantique
        Map<String, Object> response = new HashMap<>();
        response.put("alertId", UUID.randomUUID().toString());
        response.put("type", "QUANTUM_OVERLOAD");
        response.put("action", "SYSTEM_THROTTLED");
        response.put("handled", true);
        
        return response;
    }
} 