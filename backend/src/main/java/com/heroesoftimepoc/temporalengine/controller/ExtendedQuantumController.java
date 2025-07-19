package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.ExtendedTemporalEngineService;
import com.heroesoftimepoc.temporalengine.service.ExtendedTemporalScriptParser;
import com.heroesoftimepoc.temporalengine.service.ExtendedTemporalScriptParser.ExtendedScriptResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller REST pour les fonctionnalités quantiques étendues GROFI
 * Compatible avec l'API existante
 */
@RestController
@RequestMapping("/api/quantum/extended")
@CrossOrigin(origins = "*")
public class ExtendedQuantumController {
    
    @Autowired
    private ExtendedTemporalEngineService extendedTemporalEngine;
    
    @Autowired
    private ExtendedTemporalScriptParser extendedParser;
    
    /**
     * Exécuter un script avec la grammaire quantique étendue GROFI
     * POST /api/quantum/extended/games/{gameId}/execute
     */
    @PostMapping("/games/{gameId}/execute")
    public ResponseEntity<Map<String, Object>> executeExtendedScript(
            @PathVariable Long gameId,
            @RequestBody Map<String, String> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String script = request.get("script");
            if (script == null || script.trim().isEmpty()) {
                response.put("success", false);
                response.put("error", "Script requis");
                return ResponseEntity.badRequest().body(response);
            }
            
            Map<String, Object> result = extendedTemporalEngine.executeExtendedScript(gameId, script);
            
            // Ajouter des métadonnées sur l'exécution
            result.put("extendedGrammar", true);
            result.put("originalScript", script);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur exécution script étendu: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Parser un script avec la grammaire étendue (sans exécution)
     * POST /api/quantum/extended/parse
     */
    @PostMapping("/parse")
    public ResponseEntity<Map<String, Object>> parseExtendedScript(
            @RequestBody Map<String, String> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String script = request.get("script");
            if (script == null || script.trim().isEmpty()) {
                response.put("success", false);
                response.put("error", "Script requis");
                return ResponseEntity.badRequest().body(response);
            }
            
            ExtendedScriptResult parseResult = extendedParser.parseExtendedScript(script);
            
            response.put("success", parseResult.success);
            response.put("type", parseResult.type);
            response.put("description", parseResult.description);
            response.put("parameters", parseResult.parameters);
            response.put("originalScript", parseResult.originalScript);
            response.put("isExtended", extendedParser.isExtendedScript(script));
            
            if (!parseResult.success) {
                response.put("error", parseResult.error);
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur parsing script étendu: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Tester les Ultimate Powers GROFI
     * POST /api/quantum/extended/games/{gameId}/ultimate
     */
    @PostMapping("/games/{gameId}/ultimate")
    public ResponseEntity<Map<String, Object>> testUltimatePower(
            @PathVariable Long gameId,
            @RequestBody Map<String, String> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String heroName = request.get("heroName");
            String ultimateType = request.getOrDefault("ultimateType", "collapse_override");
            
            String script;
            switch (ultimateType) {
                case "collapse_override":
                    script = "ψ†[FREEZE {all.timeline.superposition}] ⊙ HERO(" + heroName + ")";
                    break;
                case "zen_superposition":
                    script = "Π[ZEN_STATE] ⇒ Ω[PEACEFUL]";
                    break;
                default:
                    response.put("success", false);
                    response.put("error", "Type d'Ultimate Power non supporté: " + ultimateType);
                    return ResponseEntity.badRequest().body(response);
            }
            
            Map<String, Object> result = extendedTemporalEngine.executeExtendedScript(gameId, script);
            result.put("ultimateType", ultimateType);
            result.put("generatedScript", script);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur test Ultimate Power: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Exécuter un rollback étendu
     * POST /api/quantum/extended/games/{gameId}/rollback
     */
    @PostMapping("/games/{gameId}/rollback")
    public ResponseEntity<Map<String, Object>> executeRollback(
            @PathVariable Long gameId,
            @RequestBody Map<String, Object> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String rollbackType = (String) request.getOrDefault("type", "all");
            String script;
            
            switch (rollbackType) {
                case "all":
                    script = "†[ALL]";
                    break;
                case "range":
                    Integer start = (Integer) request.get("startDelta");
                    Integer end = (Integer) request.get("endDelta");
                    if (start == null || end == null) {
                        response.put("success", false);
                        response.put("error", "startDelta et endDelta requis pour rollback range");
                        return ResponseEntity.badRequest().body(response);
                    }
                    script = "†[Δt" + start + " TO Δt" + end + "]";
                    break;
                case "custom":
                    String content = (String) request.get("content");
                    if (content == null) {
                        response.put("success", false);
                        response.put("error", "content requis pour rollback custom");
                        return ResponseEntity.badRequest().body(response);
                    }
                    script = "†[" + content + "]";
                    break;
                default:
                    response.put("success", false);
                    response.put("error", "Type de rollback non supporté: " + rollbackType);
                    return ResponseEntity.badRequest().body(response);
            }
            
            Map<String, Object> result = extendedTemporalEngine.executeExtendedScript(gameId, script);
            result.put("rollbackType", rollbackType);
            result.put("generatedScript", script);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur rollback étendu: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Déclencher un collapse total
     * POST /api/quantum/extended/games/{gameId}/total-collapse
     */
    @PostMapping("/games/{gameId}/total-collapse")
    public ResponseEntity<Map<String, Object>> executeTotalCollapse(@PathVariable Long gameId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String script = "⊙ ψ[ALL] ⇒ Ω[ONE]";
            
            Map<String, Object> result = extendedTemporalEngine.executeExtendedScript(gameId, script);
            result.put("generatedScript", script);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur total collapse: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Tester la grammaire quantique étendue
     * GET /api/quantum/extended/test
     */
    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> testExtendedGrammar() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Map<String, Object> tests = new HashMap<>();
            
            // Test des différents symboles
            String[] testScripts = {
                "†[ALL]",
                "†[Δt-5 TO Δt-1]",
                "Π[IF hero.health > 50 THEN heal]",
                "Ω[ONE]",
                "Λ[LEVEL:3]",
                "Σ[VALUE:0.8]",
                "↯",
                "↯(Critical system failure)",
                "ψ[ψ[action]]",
                "⊙ ψ[ALL] ⇒ Ω[ONE]",
                "ψ†[FREEZE {all.timeline.superposition}] ⊙ HERO(Jean-Grofignon)"
            };
            
            for (String script : testScripts) {
                ExtendedScriptResult parseResult = extendedParser.parseExtendedScript(script);
                tests.put(script, Map.of(
                    "success", parseResult.success,
                    "type", parseResult.type,
                    "description", parseResult.description,
                    "isExtended", extendedParser.isExtendedScript(script)
                ));
            }
            
            response.put("success", true);
            response.put("extendedGrammarTest", "GROFI Extended Quantum Grammar");
            response.put("supportedSymbols", Map.of(
                "†[...]", "Rollback/annulation",
                "Π[...]", "Condition logique étendue", 
                "Ω[...]", "Réalité effondrée",
                "Λ[...]", "Instabilité système",
                "Σ[...]", "Stress global",
                "↯", "Erreur critique",
                "ψ[ψ[...]]", "Superposition récursive",
                "ψ†[...]", "Ultimate Powers GROFI"
            ));
            response.put("tests", tests);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur test grammaire étendue: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
} 