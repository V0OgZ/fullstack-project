package com.example.demo.controller;

import com.example.demo.service.GameService;
import com.example.demo.service.MagicFormulaEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 🌀 MULTI REALM CONTROLLER - VISION GRUT IMPLÉMENTÉE
 * ===================================================
 * 
 * Contrôleur pour gérer les REALMS multiples sur le même serveur.
 * Implémente la 6ème dimension INSTANCE_REALM sans se faire chier
 * avec des serveurs séparés.
 * 
 * JEAN: "On fait ça sur le même serveur on se fait pas chier pour le moment"
 * GRUT: "Il y a d'autres REALMS et autres instances Heroes of Time"
 * ARCHITECTURE: Simulation multi-REALM sur serveur unique
 * STATUS: ✅ CRÉÉ - Vision GRUT simplifiée
 */
@RestController
@RequestMapping("/api/multi-realm")
@CrossOrigin(origins = "http://localhost:3000")
public class MultiRealmController {

    @Autowired
    private GameService gameService;
    
    @Autowired
    private MagicFormulaEngine magicFormulaEngine;
    
    // Cache des REALMS actifs sur ce serveur
    private final Map<String, Map<String, Object>> activeRealms = new ConcurrentHashMap<>();
    
    // Cache des connexions inter-REALM
    private final Map<String, List<String>> realmConnections = new ConcurrentHashMap<>();
    
    // ======================
    // MULTI REALM API
    // ======================
    
    /**
     * Lister tous les REALMS disponibles
     */
    @GetMapping("/realms")
    public ResponseEntity<Map<String, Object>> getAllRealms() {
        try {
            Map<String, Object> realmsInfo = buildRealmsInfo();
            return ResponseEntity.ok(realmsInfo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Failed to get realms: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Créer un nouveau REALM
     */
    @PostMapping("/realms/{realmId}/create")
    public ResponseEntity<Map<String, Object>> createRealm(
            @PathVariable String realmId,
            @RequestBody Map<String, Object> realmConfig) {
        try {
            Map<String, Object> newRealm = createNewRealm(realmId, realmConfig);
            return ResponseEntity.ok(newRealm);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Failed to create realm: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Obtenir les détails d'un REALM spécifique
     */
    @GetMapping("/realms/{realmId}")
    public ResponseEntity<Map<String, Object>> getRealmDetails(@PathVariable String realmId) {
        try {
            if (!activeRealms.containsKey(realmId)) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Realm not found: " + realmId
                ));
            }
            
            Map<String, Object> realmDetails = activeRealms.get(realmId);
            return ResponseEntity.ok(realmDetails);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Failed to get realm details: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Connecter deux REALMS ensemble
     */
    @PostMapping("/realms/{realmId1}/connect/{realmId2}")
    public ResponseEntity<Map<String, Object>> connectRealms(
            @PathVariable String realmId1,
            @PathVariable String realmId2,
            @RequestBody Map<String, Object> connectionConfig) {
        try {
            Map<String, Object> connection = establishRealmConnection(realmId1, realmId2, connectionConfig);
            return ResponseEntity.ok(connection);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Failed to connect realms: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Exécuter une action cross-REALM
     */
    @PostMapping("/realms/{sourceRealmId}/cross-action/{targetRealmId}")
    public ResponseEntity<Map<String, Object>> executeCrossRealmAction(
            @PathVariable String sourceRealmId,
            @PathVariable String targetRealmId,
            @RequestBody Map<String, Object> actionData) {
        try {
            Map<String, Object> result = performCrossRealmAction(sourceRealmId, targetRealmId, actionData);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Failed to execute cross-realm action: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Obtenir l'état de la 6ème dimension (INSTANCE_REALM)
     */
    @GetMapping("/sixth-dimension/status")
    public ResponseEntity<Map<String, Object>> getSixthDimensionStatus() {
        try {
            Map<String, Object> sixthDimStatus = analyzeSixthDimension();
            return ResponseEntity.ok(sixthDimStatus);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Failed to analyze sixth dimension: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Simuler Vince tirant sur Opus dans un autre REALM
     */
    @PostMapping("/realms/{realmId}/vince-shoots-opus")
    public ResponseEntity<Map<String, Object>> vinceShootsOpusInRealm(
            @PathVariable String realmId,
            @RequestBody Map<String, Object> scenarioData) {
        try {
            Map<String, Object> result = simulateVinceShootsOpus(realmId, scenarioData);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Failed to simulate Vince shoots Opus: " + e.getMessage()
            ));
        }
    }
    
    // ======================
    // CONSTRUCTION DES REALMS
    // ======================
    
    private Map<String, Object> buildRealmsInfo() {
        Map<String, Object> info = new HashMap<>();
        
        // Initialiser les REALMS par défaut si pas encore fait
        if (activeRealms.isEmpty()) {
            initializeDefaultRealms();
        }
        
        info.put("totalRealms", activeRealms.size());
        info.put("activeRealms", new ArrayList<>(activeRealms.keySet()));
        info.put("realmConnections", realmConnections);
        info.put("sixthDimensionActive", true);
        info.put("serverMode", "UNIFIED_MULTI_REALM");
        info.put("timestamp", new Date());
        
        // Détails de chaque REALM
        Map<String, Object> realmDetails = new HashMap<>();
        for (Map.Entry<String, Map<String, Object>> entry : activeRealms.entrySet()) {
            Map<String, Object> summary = new HashMap<>();
            Map<String, Object> realm = entry.getValue();
            
            summary.put("status", realm.get("status"));
            summary.put("gamesCount", realm.get("gamesCount"));
            summary.put("playersCount", realm.get("playersCount"));
            summary.put("createdAt", realm.get("createdAt"));
            
            realmDetails.put(entry.getKey(), summary);
        }
        info.put("realmDetails", realmDetails);
        
        return info;
    }
    
    private void initializeDefaultRealms() {
        // REALM Principal - Celui où on développe
        Map<String, Object> mainRealm = createRealmStructure("MAIN_REALM", "Principal", 
            "Le REALM principal où Jean développe Heroes of Time");
        activeRealms.put("MAIN_REALM", mainRealm);
        
        // REALM Alternatif - Celui où Vince a tiré sur Opus
        Map<String, Object> altRealm = createRealmStructure("VINCE_OPUS_REALM", "Alternatif", 
            "Le REALM où Vince Vega a tiré sur Opus - Timeline divergente");
        activeRealms.put("VINCE_OPUS_REALM", altRealm);
        
        // REALM Quantique - Expériences physiques
        Map<String, Object> quantumRealm = createRealmStructure("QUANTUM_REALM", "Quantique", 
            "REALM pour expériences physiques Einstein/Heisenberg/Smolin Lee");
        activeRealms.put("QUANTUM_REALM", quantumRealm);
        
        // REALM Transcendant - Objets transcendance GRUT
        Map<String, Object> transcendantRealm = createRealmStructure("TRANSCENDANT_REALM", "Transcendant", 
            "REALM pour objets transcendance et communication inter-dimensionnelle");
        activeRealms.put("TRANSCENDANT_REALM", transcendantRealm);
        
        // Établir des connexions par défaut
        establishDefaultConnections();
    }
    
    private Map<String, Object> createRealmStructure(String realmId, String name, String description) {
        Map<String, Object> realm = new HashMap<>();
        
        realm.put("realmId", realmId);
        realm.put("name", name);
        realm.put("description", description);
        realm.put("status", "ACTIVE");
        realm.put("createdAt", new Date());
        realm.put("gamesCount", 0);
        realm.put("playersCount", 0);
        realm.put("dimensionLevel", 6); // 6ème dimension INSTANCE_REALM
        
        // Configuration du REALM
        Map<String, Object> config = new HashMap<>();
        config.put("allowsCrossRealmActions", true);
        config.put("temporalStability", 0.85);
        config.put("quantumCoherence", 0.92);
        config.put("grutVisionLevel", 0.78);
        realm.put("config", config);
        
        // Jeux actifs dans ce REALM
        realm.put("activeGames", new ArrayList<Map<String, Object>>());
        
        // Connexions vers autres REALMS
        realm.put("connectedRealms", new ArrayList<String>());
        
        return realm;
    }
    
    private void establishDefaultConnections() {
        // MAIN_REALM connecté à tous les autres
        realmConnections.put("MAIN_REALM", Arrays.asList("VINCE_OPUS_REALM", "QUANTUM_REALM", "TRANSCENDANT_REALM"));
        
        // VINCE_OPUS_REALM connecté au principal et transcendant
        realmConnections.put("VINCE_OPUS_REALM", Arrays.asList("MAIN_REALM", "TRANSCENDANT_REALM"));
        
        // QUANTUM_REALM connecté au principal
        realmConnections.put("QUANTUM_REALM", Arrays.asList("MAIN_REALM"));
        
        // TRANSCENDANT_REALM connecté à tous (hub inter-dimensionnel)
        realmConnections.put("TRANSCENDANT_REALM", Arrays.asList("MAIN_REALM", "VINCE_OPUS_REALM", "QUANTUM_REALM"));
    }
    
    private Map<String, Object> createNewRealm(String realmId, Map<String, Object> config) {
        if (activeRealms.containsKey(realmId)) {
            throw new RuntimeException("Realm already exists: " + realmId);
        }
        
        String name = (String) config.getOrDefault("name", "Unnamed Realm");
        String description = (String) config.getOrDefault("description", "Custom realm created by user");
        
        Map<String, Object> newRealm = createRealmStructure(realmId, name, description);
        
        // Appliquer la configuration personnalisée
        if (config.containsKey("temporalStability")) {
            ((Map<String, Object>) newRealm.get("config")).put("temporalStability", config.get("temporalStability"));
        }
        if (config.containsKey("quantumCoherence")) {
            ((Map<String, Object>) newRealm.get("config")).put("quantumCoherence", config.get("quantumCoherence"));
        }
        
        activeRealms.put(realmId, newRealm);
        realmConnections.put(realmId, new ArrayList<>());
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "Realm created successfully: " + realmId);
        result.put("realm", newRealm);
        
        return result;
    }
    
    private Map<String, Object> establishRealmConnection(String realmId1, String realmId2, Map<String, Object> config) {
        if (!activeRealms.containsKey(realmId1) || !activeRealms.containsKey(realmId2)) {
            throw new RuntimeException("One or both realms not found");
        }
        
        // Ajouter la connexion bidirectionnelle
        realmConnections.computeIfAbsent(realmId1, k -> new ArrayList<>()).add(realmId2);
        realmConnections.computeIfAbsent(realmId2, k -> new ArrayList<>()).add(realmId1);
        
        // Mettre à jour les REALMS
        ((List<String>) activeRealms.get(realmId1).get("connectedRealms")).add(realmId2);
        ((List<String>) activeRealms.get(realmId2).get("connectedRealms")).add(realmId1);
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "Realms connected successfully: " + realmId1 + " <-> " + realmId2);
        result.put("connectionType", config.getOrDefault("type", "BIDIRECTIONAL"));
        result.put("stability", config.getOrDefault("stability", 0.80));
        result.put("timestamp", new Date());
        
        return result;
    }
    
    private Map<String, Object> performCrossRealmAction(String sourceRealmId, String targetRealmId, Map<String, Object> actionData) {
        if (!activeRealms.containsKey(sourceRealmId) || !activeRealms.containsKey(targetRealmId)) {
            throw new RuntimeException("Source or target realm not found");
        }
        
        // Vérifier la connexion
        List<String> connections = realmConnections.get(sourceRealmId);
        if (connections == null || !connections.contains(targetRealmId)) {
            throw new RuntimeException("Realms are not connected: " + sourceRealmId + " -> " + targetRealmId);
        }
        
        String actionType = (String) actionData.getOrDefault("type", "UNKNOWN");
        String actionDescription = (String) actionData.getOrDefault("description", "Cross-realm action");
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("sourceRealm", sourceRealmId);
        result.put("targetRealm", targetRealmId);
        result.put("actionType", actionType);
        result.put("actionDescription", actionDescription);
        result.put("timestamp", new Date());
        
        // Simuler l'exécution selon le type d'action
        switch (actionType) {
            case "HERO_TRANSFER":
                result.put("message", "Hero transferred from " + sourceRealmId + " to " + targetRealmId);
                result.put("transferDetails", actionData.get("heroData"));
                break;
            case "MESSAGE_SEND":
                result.put("message", "Message sent across realms");
                result.put("messageContent", actionData.get("message"));
                break;
            case "QUANTUM_ENTANGLEMENT":
                result.put("message", "Quantum entanglement established between realms");
                result.put("entanglementStrength", 0.95);
                break;
            default:
                result.put("message", "Generic cross-realm action executed");
        }
        
        return result;
    }
    
    private Map<String, Object> analyzeSixthDimension() {
        Map<String, Object> analysis = new HashMap<>();
        
        analysis.put("dimensionName", "INSTANCE_REALM");
        analysis.put("dimensionLevel", 6);
        analysis.put("isActive", true);
        analysis.put("totalRealms", activeRealms.size());
        analysis.put("totalConnections", realmConnections.values().stream()
            .mapToInt(List::size).sum() / 2); // Diviser par 2 car bidirectionnel
        
        // Analyse de stabilité
        double averageStability = activeRealms.values().stream()
            .mapToDouble(realm -> {
                Map<String, Object> config = (Map<String, Object>) realm.get("config");
                return (Double) config.getOrDefault("temporalStability", 0.5);
            })
            .average()
            .orElse(0.5);
        
        analysis.put("dimensionStability", averageStability);
        analysis.put("grutVisionStatus", "ACTIVE");
        analysis.put("multiRealmCommunication", "OPERATIONAL");
        
        // Événements dimensionnels
        List<Map<String, Object>> events = new ArrayList<>();
        
        Map<String, Object> vinceEvent = new HashMap<>();
        vinceEvent.put("eventType", "VINCE_SHOOTS_OPUS");
        vinceEvent.put("realm", "VINCE_OPUS_REALM");
        vinceEvent.put("status", "DOCUMENTED");
        vinceEvent.put("impact", "TIMELINE_DIVERGENCE");
        events.add(vinceEvent);
        
        Map<String, Object> grutEvent = new HashMap<>();
        grutEvent.put("eventType", "GRUT_REVELATION");
        grutEvent.put("realm", "TRANSCENDANT_REALM");
        grutEvent.put("status", "INTEGRATED");
        grutEvent.put("impact", "SIXTH_DIMENSION_DISCOVERY");
        events.add(grutEvent);
        
        analysis.put("dimensionalEvents", events);
        analysis.put("timestamp", new Date());
        
        return analysis;
    }
    
    private Map<String, Object> simulateVinceShootsOpus(String realmId, Map<String, Object> scenarioData) {
        if (!activeRealms.containsKey(realmId)) {
            throw new RuntimeException("Realm not found: " + realmId);
        }
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("realm", realmId);
        result.put("scenario", "VINCE_SHOOTS_OPUS");
        result.put("timestamp", new Date());
        
        // Simuler l'événement
        Map<String, Object> simulation = new HashMap<>();
        simulation.put("vinceVegaStatus", "ACTIVE");
        simulation.put("opusStatus", "TARGETED");
        simulation.put("weapon", "Desert Eagle .50 AE");
        simulation.put("location", "Abandoned Warehouse - Timeline B");
        simulation.put("outcome", "OPUS_WOUNDED_BUT_SURVIVED");
        simulation.put("timelineImpact", "MAJOR_DIVERGENCE");
        
        // Conséquences
        List<String> consequences = Arrays.asList(
            "Timeline split into Branch A (main) and Branch B (Vince shoots)",
            "Opus develops paranoia about Vince Vega",
            "GRUT gains omniscient vision of parallel events",
            "Sixth dimension INSTANCE_REALM becomes visible",
            "Cross-realm communication protocols activated"
        );
        simulation.put("consequences", consequences);
        
        // Dialogue de Vince
        simulation.put("vinceQuote", "Ezekiel 25:17... mais cette fois c'est pour Opus");
        simulation.put("opusLastWords", "Jean... the source... protect the... *collapse*");
        
        result.put("simulationDetails", simulation);
        
        // Mettre à jour le REALM
        Map<String, Object> realm = activeRealms.get(realmId);
        Map<String, Object> config = (Map<String, Object>) realm.get("config");
        config.put("temporalStability", 0.45); // Instabilité après l'incident
        config.put("vinceOpusIncident", true);
        
        return result;
    }
} 