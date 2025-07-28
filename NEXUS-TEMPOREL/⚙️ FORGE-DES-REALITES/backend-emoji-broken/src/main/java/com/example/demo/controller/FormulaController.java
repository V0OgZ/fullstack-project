package com.example.demo.controller;

import com.example.demo.model.FormulaResult;
import com.example.demo.model.GameContext;
import com.example.demo.service.MagicFormulaEngine;
import com.example.demo.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

/**
 * 🧪 WALTER VIETNAM CONTROLLER - API des Formules Magiques
 * 
 * "Firebase Delta 1970 - Le poste de communication avec l'extérieur !
 * Toutes les demandes d'artillerie magique passent par ici !"
 * - Walter, Opérateur Radio du Code Magique
 */
@RestController
@RequestMapping("/api/formulas")
@CrossOrigin(origins = "*")
public class FormulaController {
    
    @Autowired
    private MagicFormulaEngine magicFormulaEngine;
    
    // 🎖️ WALTER VIETNAM: Temporairement commenté pour éviter les dépendances circulaires
    // @Autowired
    // private GameService gameService;
    
    /**
     * 🔥 EXÉCUTION D'UNE FORMULE MAGIQUE
     */
    @PostMapping("/execute")
    public ResponseEntity<Map<String, Object>> executeFormula(
            @RequestBody Map<String, Object> request) {
        
        try {
            String formula = (String) request.get("formula");
            String gameId = (String) request.getOrDefault("gameId", "test-game");
            
            // 🎖️ WALTER VIETNAM VALIDATION
            if (formula == null || formula.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "🎖️ WALTER: Firebase refuse la mission ! Formule manquante !",
                    "success", false
                ));
            }
            
            // 🧪 CRÉATION DU CONTEXTE DE JEU
            GameContext context = new GameContext(gameId);
            
            // 🔥 EXÉCUTION DE LA FORMULE
            FormulaResult result = magicFormulaEngine.executeFormula(formula, context);
            
            // 📊 RÉPONSE COMPLÈTE
            Map<String, Object> response = new HashMap<>();
            response.put("success", result.isSuccess());
            response.put("message", result.getMessage());
            response.put("data", result.getData());
            response.put("formulaType", result.getFormulaType());
            response.put("executionTime", result.getExecutionTimeMs());
            response.put("walterDiagnostic", context.getWalterDiagnostic());
            
            if (!result.isSuccess()) {
                response.put("errorCode", result.getErrorCode());
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "🎖️ WALTER VIETNAM FLASHBACK: Firebase en panne ! " + e.getMessage(),
                "success", false,
                "walterStatus", "CRITICAL_ERROR"
            ));
        }
    }
    
    /**
     * 🧪 TEST DES 5 FORMULES SIMPLES
     */
    @GetMapping("/test-simple")
    public ResponseEntity<Map<String, Object>> testSimpleFormulas() {
        
        try {
            GameContext context = new GameContext("test-simple-formulas");
            
            // 🔥 TEST DES 5 FORMULES
            Map<String, FormulaResult> results = magicFormulaEngine.testSimpleFormulas(context);
            
            // 📊 COMPILATION DES RÉSULTATS
            Map<String, Object> response = new HashMap<>();
            Map<String, Object> formulaResults = new HashMap<>();
            
            int successCount = 0;
            for (Map.Entry<String, FormulaResult> entry : results.entrySet()) {
                FormulaResult result = entry.getValue();
                formulaResults.put(entry.getKey(), Map.of(
                    "success", result.isSuccess(),
                    "message", result.getMessage(),
                    "data", result.getData(),
                    "type", result.getFormulaType()
                ));
                if (result.isSuccess()) successCount++;
            }
            
            response.put("totalFormulas", results.size());
            response.put("successCount", successCount);
            response.put("successRate", (successCount * 100.0) / results.size());
            response.put("results", formulaResults);
            response.put("walterDiagnostic", context.getWalterDiagnostic());
            response.put("walterApproval", successCount == 5 ? 
                "🎖️ WALTER: Toutes les formules opérationnelles ! Firebase prête au combat !" :
                "🎖️ WALTER: Quelques formules défaillantes ! Maintenance requise !");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "🎖️ WALTER: Test des formules explosé ! " + e.getMessage(),
                "success", false
            ));
        }
    }
    
    /**
     * 📊 DIAGNOSTIC WALTER COMPLET
     */
    @GetMapping("/walter-diagnostic")
    public ResponseEntity<Map<String, Object>> getWalterDiagnostic() {
        
        try {
            Map<String, Object> diagnostic = magicFormulaEngine.getWalterDiagnostic();
            diagnostic.put("walterStatus", "🎖️ WALTER VIETNAM OPERATIONAL");
            diagnostic.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(diagnostic);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "🎖️ WALTER: Diagnostic en panne ! " + e.getMessage(),
                "walterStatus", "VIETNAM_FLASHBACK_TRIGGERED"
            ));
        }
    }
    
    /**
     * 🔮 LISTE DES FORMULES DISPONIBLES
     */
    @GetMapping("/available")
    public ResponseEntity<Map<String, Object>> getAvailableFormulas() {
        
        Map<String, Object> response = new HashMap<>();
        
        // 🧪 FORMULES SIMPLES
        response.put("simpleFormulas", Map.of(
            "MODIFY_ENERGY", "🔋 Modifie l'énergie d'un héros",
            "TELEPORT_HERO", "🌀 Téléporte un héros",
            "HEAL_HERO", "💚 Soigne un héros",
            "DAMAGE_ENEMY", "⚔️ Inflige des dégâts",
            "CREATE_SHIELD", "🛡️ Crée un bouclier protecteur"
        ));
        
        // 🔮 FORMULES RUNIQUES (à venir)
        response.put("runicFormulas", Map.of(
            "status", "🔮 En développement - 40 formules runiques prévues",
            "format", "ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))"
        ));
        
        // 📜 FORMULES JSON ASSETS (à venir)
        response.put("jsonAssetFormulas", Map.of(
            "status", "📜 En développement - 96 formules détectées dans les assets",
            "types", "paradoxRisk, temporalStability, affectedRadius, damage, healing"
        ));
        
        response.put("walterMessage", "🎖️ WALTER: Arsenal magique en cours de déploiement !");
        
        return ResponseEntity.ok(response);
    }
} 