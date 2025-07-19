package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.FormulaInterpreterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controller REST pour l'interprétation des formules HOTS et quantiques
 * 
 * Expose les services d'interprétation pour les interfaces frontend
 */
@RestController
@RequestMapping("/api/formula")
@CrossOrigin(origins = "*")
public class FormulaInterpreterController {
    
    @Autowired
    private FormulaInterpreterService formulaInterpreterService;
    
    /**
     * Interpréter une formule HOTS en langage naturel
     * 
     * @param formula La formule à interpréter
     * @return Interprétation en langage naturel
     */
    @PostMapping("/interpret")
    public ResponseEntity<Map<String, Object>> interpretFormula(@RequestBody Map<String, String> request) {
        try {
            String formula = request.get("formula");
            
            if (formula == null || formula.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Formula is required"
                ));
            }
            
            Map<String, Object> interpretation = formulaInterpreterService.interpretFormula(formula);
            return ResponseEntity.ok(interpretation);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * Interpréter plusieurs formules en une seule requête
     * 
     * @param formulas Liste des formules à interpréter
     * @return Interprétations de toutes les formules
     */
    @PostMapping("/interpret-multiple")
    public ResponseEntity<Map<String, Object>> interpretMultipleFormulas(@RequestBody Map<String, String[]> request) {
        try {
            String[] formulas = request.get("formulas");
            
            if (formulas == null || formulas.length == 0) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Formulas array is required"
                ));
            }
            
            Map<String, Object> interpretations = formulaInterpreterService.interpretMultipleFormulas(formulas);
            return ResponseEntity.ok(interpretations);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * Obtenir la liste des symboles HOTS supportés
     * 
     * @return Liste des symboles avec leurs significations
     */
    @GetMapping("/symbols")
    public ResponseEntity<Map<String, Object>> getSymbols() {
        Map<String, Object> symbols = Map.of(
            "quantum_symbols", Map.of(
                "ψ", "Quantum state identifier (psi)",
                "⊙", "Observation envelope",
                "Δt", "Temporal delay (delta-t)",
                "@", "Position coordinates",
                "⟶", "Transition arrow",
                "†", "Collapse operator (dagger)",
                "Π", "Observation condition (pi)",
                "⇒", "Logical implication",
                "ℬ", "Timeline branch identifier"
            ),
            "action_types", Map.of(
                "MOV", "Move hero to position",
                "CREATE", "Create entity (creature, item, building)",
                "BATTLE", "Initiate combat",
                "USE", "Use item or artifact",
                "BUILD", "Build structure",
                "CAST", "Cast spell",
                "EQUIP", "Equip artifact",
                "HERO", "Create hero"
            ),
            "examples", Map.of(
                "quantum_state", "ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))",
                "complex_amplitude", "ψ002: (0.8+0.6i) ⊙(Δt+1 @10,10 ⟶ CREATE(CREATURE, Dragon))",
                "collapse", "†ψ001",
                "observation", "Π(Arthur.health > 50) ⇒ †ψ003"
            )
        );
        
        return ResponseEntity.ok(symbols);
    }
    
    /**
     * Valider la syntaxe d'une formule HOTS
     * 
     * @param formula La formule à valider
     * @return Résultat de validation
     */
    @PostMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateFormula(@RequestBody Map<String, String> request) {
        try {
            String formula = request.get("formula");
            
            if (formula == null || formula.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "valid", false,
                    "error", "Formula is required"
                ));
            }
            
            // Utiliser le service d'interprétation pour valider
            Map<String, Object> interpretation = formulaInterpreterService.interpretFormula(formula);
            
            boolean isValid = (Boolean) interpretation.getOrDefault("success", false);
            
            Map<String, Object> validation = Map.of(
                "valid", isValid,
                "formula", formula,
                "type", interpretation.getOrDefault("type", "unknown"),
                "error", interpretation.getOrDefault("error", "")
            );
            
            return ResponseEntity.ok(validation);
            
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of(
                "valid", false,
                "error", e.getMessage()
            ));
        }
    }
} 