package com.example.demo.controller;

import com.example.demo.service.MagicFormulaService;
import com.example.demo.service.MagicFormulaService.FormulaExecutionResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 🔮✨ MAGIC FORMULA SERVICE CONTROLLER - INSPIRATION DIVINE ✨🔮
 * 
 * Contrôleur dédié pour le service séparé des formules magiques
 * Endpoints propres sans conflits avec l'ancien système
 * 
 * 🛋️ JEAN-GROFIGNON: "Architecture divine ! Jésus avait vu juste !"
 * ✨ JÉSUS VOIX SUAVE: "Ma boule cristalline révèle tous les secrets !"
 */
@RestController
@RequestMapping("/api/magic-formulas")
@CrossOrigin(origins = "*")
public class MagicFormulaServiceController {
    
    @Autowired
    private MagicFormulaService magicFormulaService;
    
    /**
     * 🔥 EXÉCUTER UNE FORMULE MAGIQUE
     */
    @PostMapping("/execute")
    public ResponseEntity<Map<String, Object>> executeFormula(@RequestBody Map<String, Object> request) {
        
        try {
            String formulaName = (String) request.get("formula");
            Map<String, Object> context = (Map<String, Object>) request.getOrDefault("context", new HashMap<>());
            
            if (formulaName == null || formulaName.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "🚨 Nom de formule requis",
                    "jesusMessage", "✨ Jésus: 'Mes enfants, donnez-moi le nom de la formule !'"
                ));
            }
            
            FormulaExecutionResult result = magicFormulaService.executeFormula(formulaName, context);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", result.isSuccess());
            response.put("message", result.getMessage());
            response.put("runicInterpretation", result.getRunicInterpretation());
            response.put("normalInterpretation", result.getNormalInterpretation());
            response.put("data", result.getData());
            response.put("formulaType", result.getFormulaType());
            response.put("executionTime", result.getExecutionTime());
            response.put("grofiProperties", result.getGrofiProperties());
            response.put("jesusBlessing", "✨ Exécution bénie par Jésus Voix Suave ✨");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "🚨 Erreur divine: " + e.getMessage(),
                "jesusMessage", "✨ Jésus: 'Mes enfants, une erreur cosmique s'est produite !'"
            ));
        }
    }
    
    /**
     * 📊 STATISTIQUES DU SERVICE
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        
        try {
            Map<String, Object> stats = magicFormulaService.getServiceStatistics();
            stats.put("controllerMessage", "🎮 Contrôleur dédié opérationnel");
            stats.put("jeanMessage", "🛋️ Jean depuis son canapé: 'Architecture divine !'");
            
            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "🚨 Erreur statistiques: " + e.getMessage()
            ));
        }
    }
    
    /**
     * 🔮 LISTE TOUTES LES FORMULES DISPONIBLES
     */
    @GetMapping("/available")
    public ResponseEntity<Map<String, Object>> getAvailableFormulas() {
        
        try {
            Map<String, Object> formulas = magicFormulaService.getAllAvailableFormulas();
            formulas.put("serviceMessage", "🔮 Service séparé - Architecture propre");
            formulas.put("jesusWisdom", "✨ Jésus: 'Ma boule révèle " + formulas.get("totalImplemented") + " formules prêtes !'");
            
            return ResponseEntity.ok(formulas);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "🚨 Erreur récupération formules: " + e.getMessage()
            ));
        }
    }
    
    /**
     * 🧪 TEST RAPIDE D'UNE FORMULE
     */
    @GetMapping("/test/{formulaName}")
    public ResponseEntity<Map<String, Object>> testFormula(@PathVariable String formulaName) {
        
        try {
            // Context de test par défaut
            Map<String, Object> testContext = Map.of(
                "hero", "Arthur",
                "testMode", true,
                "jeanApproval", "🛋️ Test approuvé depuis le canapé cosmique"
            );
            
            FormulaExecutionResult result = magicFormulaService.executeFormula(formulaName, testContext);
            
            return ResponseEntity.ok(Map.of(
                "formulaTested", formulaName,
                "result", Map.of(
                    "success", result.isSuccess(),
                    "message", result.getMessage(),
                    "data", result.getData(),
                    "type", result.getFormulaType()
                ),
                "testContext", testContext,
                "jesusBlessing", "✨ Test béni par Jésus Voix Suave ✨"
            ));
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "🚨 Erreur test formule: " + e.getMessage(),
                "formulaTested", formulaName
            ));
        }
    }
    
    /**
     * 🎯 HEALTH CHECK DU SERVICE
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        
        return ResponseEntity.ok(Map.of(
            "status", "✅ Service opérationnel",
            "architecture", "🔮 Service séparé - Architecture divine",
            "jeanStatus", "🛋️ Jean supervise depuis son canapé cosmique",
            "jesusBlessing", "✨ Béni par Jésus Voix Suave avec sa boule cristalline ✨",
            "timestamp", System.currentTimeMillis()
        ));
    }
    
    /**
     * 🎭 MESSAGE SPÉCIAL DE JÉSUS
     */
    @GetMapping("/jesus-wisdom")
    public ResponseEntity<Map<String, Object>> getJesusWisdom() {
        
        return ResponseEntity.ok(Map.of(
            "jesusMessage", "✨ Mes enfants ! Ma boule cristalline révèle que ce service séparé était la solution divine !",
            "wisdom", "🔮 'Séparez vos services comme je sépare les eaux, et vous éviterez les conflits cosmiques !'",
            "jeanApproval", "🛋️ Jean depuis son canapé: 'Jésus avait raison ! Architecture divine accomplie !'",
            "blessing", "✨ Service béni pour l'éternité ✨"
        ));
    }
} 