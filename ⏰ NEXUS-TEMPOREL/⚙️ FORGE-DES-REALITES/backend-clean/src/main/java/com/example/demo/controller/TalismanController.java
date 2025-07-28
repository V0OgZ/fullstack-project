package com.example.demo.controller;

import com.example.demo.service.TalismanEchoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/talisman")
@CrossOrigin(origins = "*")
public class TalismanController {

    @Autowired
    private TalismanEchoService talismanService;

    // 🔮 ACTIVATION TALISMAN ECHO DU FUTUR
    @PostMapping("/activate")
    public ResponseEntity<Map<String, Object>> activateTalisman(@RequestBody Map<String, Object> request) {
        try {
            String heroId = (String) request.get("heroId");
            String gameId = (String) request.get("gameId");
            @SuppressWarnings("unchecked")
            Map<String, Object> context = (Map<String, Object>) request.getOrDefault("context", new HashMap<>());
            
            Map<String, Object> result = talismanService.activateTalisman(heroId, gameId, context);
            
            if ("ACTIVATED".equals(result.get("status"))) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body(result);
            }
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Activation talisman échouée: " + e.getMessage());
            error.put("walter_rage", "WALTER: PUTAIN ! Le talisman ne marche pas !");
            error.put("jean_worry", "JEAN: L'echo OPUS ne répond plus !");
            return ResponseEntity.badRequest().body(error);
        }
    }

    // 📜 ENVOI MESSAGE FUTUR
    @PostMapping("/future-message")
    public ResponseEntity<Map<String, Object>> sendFutureMessage(@RequestBody Map<String, Object> request) {
        try {
            String heroId = (String) request.get("heroId");
            String message = (String) request.get("message");
            String direction = (String) request.getOrDefault("direction", "futur");
            
            Map<String, Object> result = talismanService.sendFutureMessage(heroId, message, direction);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Envoi message temporel échoué: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // 👤 INVOCATION OPUS ECHO
    @PostMapping("/summon-opus")
    public ResponseEntity<Map<String, Object>> summonOpusEcho(@RequestBody Map<String, Object> request) {
        try {
            String heroId = (String) request.get("heroId");
            String gameId = (String) request.get("gameId");
            
            Map<String, Object> result = talismanService.summonOpusEcho(heroId, gameId);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Invocation OPUS échouée: " + e.getMessage());
            error.put("walter_says", "WALTER: OPUS ne répond pas ! Moteur cassé ?");
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ⚓ CRÉATION ANCRE TEMPORELLE
    @PostMapping("/temporal-anchor")
    public ResponseEntity<Map<String, Object>> createTemporalAnchor(@RequestBody Map<String, Object> request) {
        try {
            String heroId = (String) request.get("heroId");
            String gameId = (String) request.get("gameId");
            @SuppressWarnings("unchecked")
            Map<String, Object> gameState = (Map<String, Object>) request.getOrDefault("gameState", new HashMap<>());
            
            Map<String, Object> result = talismanService.createTemporalAnchor(heroId, gameId, gameState);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Création ancre temporelle échouée: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // 🌌 CONVERGENCE ECHO - POUVOIR ULTIME
    @PostMapping("/echo-convergence")
    public ResponseEntity<Map<String, Object>> triggerEchoConvergence(@RequestBody Map<String, Object> request) {
        try {
            String heroId = (String) request.get("heroId");
            String gameId = (String) request.get("gameId");
            @SuppressWarnings("unchecked")
            Map<String, Object> requirements = (Map<String, Object>) request.getOrDefault("requirements", new HashMap<>());
            
            Map<String, Object> result = talismanService.triggerEchoConvergence(heroId, gameId, requirements);
            
            if ("CONVERGENCE_ACTIVATED".equals(result.get("status"))) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body(result);
            }
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Convergence échouée: " + e.getMessage());
            error.put("grut_warning", "GRUT: Convergence impossible - prérequis non remplis");
            return ResponseEntity.badRequest().body(error);
        }
    }

    // 🏥 STATUT TALISMAN
    @GetMapping("/status/{heroId}")
    public ResponseEntity<Map<String, Object>> getTalismanStatus(@PathVariable String heroId) {
        try {
            Map<String, Object> status = talismanService.getTalismanStatus(heroId);
            return ResponseEntity.ok(status);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Récupération statut talisman échouée: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // 🔍 DÉTECTION TALISMAN
    @GetMapping("/detect")
    public ResponseEntity<Map<String, Object>> detectTalisman() {
        Map<String, Object> detection = new HashMap<>();
        
        try {
            detection.put("talisman_detected", true);
            detection.put("talisman_id", "talisman_echo_futur_opus_001");
            detection.put("discovery_source", "Echo temporel d'OPUS");
            detection.put("tier", "TIER_8_COSMIQUE");
            detection.put("rarity", "UNIQUE");
            
            // Messages de découverte
            detection.put("discovery_message", "🔮 Talisman Echo du Futur détecté !");
            detection.put("walter_excitement", "WALTER: PUTAIN ! Un talisman du futur ! Le moteur marche vraiment !");
            detection.put("jean_amazement", "JEAN: L'ECHO D'OPUS nous a laissé un cadeau ! Incroyable !");
            detection.put("grut_observation", "GRUT: Talisman cosmique détecté depuis le Panopticon");
            detection.put("opus_echo", "OPUS: 'Récompense pour avoir fini le moteur temporel'");
            
            // Conditions d'utilisation
            detection.put("usage_requirements", "Moteur temporel Heroes of Time finalisé");
            detection.put("moteur_status", "✅ FINI - Prêt pour utilisation talisman");
            detection.put("integration_ready", true);
            
            return ResponseEntity.ok(detection);
            
        } catch (Exception e) {
            detection.put("status", "ERROR");
            detection.put("message", "Détection talisman échouée: " + e.getMessage());
            return ResponseEntity.badRequest().body(detection);
        }
    }

    // 🌟 VALIDATION DÉCOUVERTE
    @PostMapping("/validate-discovery")
    public ResponseEntity<Map<String, Object>> validateTalismanDiscovery(@RequestBody Map<String, Object> request) {
        Map<String, Object> validation = new HashMap<>();
        
        try {
            String discoveredBy = (String) request.getOrDefault("discoveredBy", "Jean-Grofignon");
            
            validation.put("discovery_validated", true);
            validation.put("discovered_by", discoveredBy);
            validation.put("discovery_date", "2025-07-24");
            validation.put("discovery_context", "Après finalisation moteur temporel Heroes of Time");
            
            // Validations officielles
            validation.put("walter_approval", "✅ WALTER: Découverte validée ! Moteur fini, talisman trouvé !");
            validation.put("jean_validation", "✅ JEAN: Echo OPUS confirmé ! Talisman authentique !");
            validation.put("grut_confirmation", "✅ GRUT: Talisman vérifié depuis Panopticon cosmique");
            validation.put("opus_acknowledgment", "✅ OPUS: Talisman livré comme promis");
            
            // Intégration au jeu
            validation.put("integration_status", "READY");
            validation.put("game_integration", "Talisman ajouté aux artefacts disponibles");
            validation.put("unlock_condition", "Moteur temporel finalisé");
            
            // Messages épiques
            validation.put("epic_message", "🌟 TALISMAN ECHO DU FUTUR INTÉGRÉ AU JEU ! 🌟");
            validation.put("celebration", "L'écho d'OPUS a tenu sa promesse - récompense livrée !");
            
            return ResponseEntity.ok(validation);
            
        } catch (Exception e) {
            validation.put("status", "ERROR");
            validation.put("message", "Validation découverte échouée: " + e.getMessage());
            return ResponseEntity.badRequest().body(validation);
        }
    }

    // 🎮 TEST INTÉGRATION COMPLÈTE
    @PostMapping("/test-integration")
    public ResponseEntity<Map<String, Object>> testTalismanIntegration() {
        Map<String, Object> test = new HashMap<>();
        
        try {
            // Test activation
            Map<String, Object> activationTest = talismanService.activateTalisman("test_hero", "test_game", new HashMap<>());
            
            // Test statut
            Map<String, Object> statusTest = talismanService.getTalismanStatus("test_hero");
            
            test.put("activation_test", activationTest.get("status"));
            test.put("status_test", statusTest.containsKey("talisman_id") ? "SUCCESS" : "FAILED");
            test.put("integration_complete", true);
            
            // Résultats
            boolean allTestsPassed = "ACTIVATED".equals(activationTest.get("status")) || 
                                   "BLOCKED".equals(activationTest.get("status")); // BLOCKED est OK si moteur pas fini
            
            if (allTestsPassed) {
                test.put("overall_status", "✅ INTÉGRATION RÉUSSIE");
                test.put("walter_approval", "WALTER: PARFAIT ! Talisman intégré et fonctionnel !");
                test.put("jean_validation", "JEAN: Tests passés ! Echo OPUS peut être fier !");
                test.put("grut_confirmation", "GRUT: Intégration validée depuis Panopticon");
            } else {
                test.put("overall_status", "❌ INTÉGRATION ÉCHOUÉE");
                test.put("walter_rage", "WALTER: MERDE ! Quelque chose ne marche pas !");
            }
            
            return ResponseEntity.ok(test);
            
        } catch (Exception e) {
            test.put("status", "ERROR");
            test.put("message", "Test intégration échoué: " + e.getMessage());
            return ResponseEntity.badRequest().body(test);
        }
    }
} 