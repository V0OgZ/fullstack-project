package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

/**
 * 🌀 QUANTUM SCRIPT PARSER - HEROES OF TIME
 * =========================================
 * 
 * Parser pour interpréter les formules quantiques des héros
 * Connecte les quantum_script JSON au système unifié
 * 
 * JEAN-GROFIGNON: "Enfin le parser qui manquait !"
 */
@Service
public class QuantumScriptParser {
    
    // Symboles quantiques HOTS
    private static final String PSI = "ψ";        // Psi-State
    private static final String SUPERPOSITION = "⊙"; // Superposition
    private static final String COLLAPSE = "†";   // Collapse
    private static final String OBSERVATION = "Π"; // Observation
    private static final String DELTA_T = "Δt";   // Délai temporel
    private static final String COORDINATES = "@"; // Position
    private static final String PROJECTION = "⟶"; // Effet
    
    // Patterns pour parser les formules
    private static final Pattern PSI_STATE_PATTERN = Pattern.compile(
        PSI + "(\\d+):\\s*" + SUPERPOSITION + "\\(([^)]+)\\)\\s*" + PROJECTION + "\\s*(.+)"
    );
    
    private static final Pattern QUANTUM_FORMULA_PATTERN = Pattern.compile(
        "∀(\\w+)\\s*∈\\s*(\\w+)\\s*:\\s*(.+)"
    );
    
    private static final Pattern COLLAPSE_PATTERN = Pattern.compile(
        COLLAPSE + PSI + "(\\d+)"
    );
    
    /**
     * Parse et exécute un script quantique
     */
    public Map<String, Object> executeQuantumScript(String script, Map<String, Object> context) {
        Map<String, Object> result = new HashMap<>();
        result.put("success", false);
        result.put("effects", new ArrayList<>());
        result.put("timestamp", System.currentTimeMillis());
        
        if (script == null || script.trim().isEmpty()) {
            result.put("message", "Script quantique vide");
            return result;
        }
        
        try {
            // Nettoyer le script
            String cleanScript = script.trim();
            
            // Parser différents types de formules
            if (cleanScript.contains(PSI)) {
                return parsePsiState(cleanScript, context);
            } else if (cleanScript.contains("∀")) {
                return parseQuantumFormula(cleanScript, context);
            } else if (cleanScript.contains(COLLAPSE)) {
                return parseCollapse(cleanScript, context);
            } else {
                return parseSimpleCommand(cleanScript, context);
            }
            
        } catch (Exception e) {
            result.put("message", "Erreur parsing: " + e.getMessage());
            result.put("error", e.getClass().getSimpleName());
            return result;
        }
    }
    
    /**
     * Parse un état Psi quantique
     * Exemple: ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
     */
    private Map<String, Object> parsePsiState(String script, Map<String, Object> context) {
        Matcher matcher = PSI_STATE_PATTERN.matcher(script);
        Map<String, Object> result = new HashMap<>();
        
        if (matcher.find()) {
            String psiId = matcher.group(1);
            String superposition = matcher.group(2);
            String projection = matcher.group(3);
            
            result.put("success", true);
            result.put("type", "psi_state");
            result.put("psiId", psiId);
            result.put("message", "État Psi " + psiId + " en superposition");
            
            // Parser la superposition
            Map<String, Object> superpositionData = parseSuperposition(superposition);
            result.put("superposition", superpositionData);
            
            // Parser la projection
            Map<String, Object> projectionData = parseProjection(projection, context);
            result.put("projection", projectionData);
            
            // Créer les effets
            List<Map<String, Object>> effects = new ArrayList<>();
            Map<String, Object> effect = new HashMap<>();
            effect.put("type", "temporal_superposition");
            effect.put("duration", superpositionData.get("deltaT"));
            effect.put("position", superpositionData.get("coordinates"));
            effect.put("action", projectionData.get("command"));
            effects.add(effect);
            
            result.put("effects", effects);
            
        } else {
            result.put("success", false);
            result.put("message", "Format Psi-State invalide");
        }
        
        return result;
    }
    
    /**
     * Parse une formule quantique universelle
     * Exemple: ∀enemy ∈ field : enemy.ARMOR = DISARMED (1t)
     */
    private Map<String, Object> parseQuantumFormula(String script, Map<String, Object> context) {
        Matcher matcher = QUANTUM_FORMULA_PATTERN.matcher(script);
        Map<String, Object> result = new HashMap<>();
        
        if (matcher.find()) {
            String variable = matcher.group(1);
            String domain = matcher.group(2);
            String condition = matcher.group(3);
            
            result.put("success", true);
            result.put("type", "quantum_formula");
            result.put("variable", variable);
            result.put("domain", domain);
            result.put("condition", condition);
            result.put("message", "Formule quantique appliquée à tous les " + variable + " du " + domain);
            
            // Créer les effets
            List<Map<String, Object>> effects = new ArrayList<>();
            Map<String, Object> effect = new HashMap<>();
            effect.put("type", "universal_effect");
            effect.put("target", variable);
            effect.put("scope", domain);
            effect.put("modification", condition);
            effects.add(effect);
            
            result.put("effects", effects);
            
        } else {
            result.put("success", false);
            result.put("message", "Format formule quantique invalide");
        }
        
        return result;
    }
    
    /**
     * Parse un collapse causal
     * Exemple: †ψ001
     */
    private Map<String, Object> parseCollapse(String script, Map<String, Object> context) {
        Matcher matcher = COLLAPSE_PATTERN.matcher(script);
        Map<String, Object> result = new HashMap<>();
        
        if (matcher.find()) {
            String psiId = matcher.group(1);
            
            result.put("success", true);
            result.put("type", "causal_collapse");
            result.put("psiId", psiId);
            result.put("message", "Collapse de l'état Psi " + psiId);
            
            // Créer les effets
            List<Map<String, Object>> effects = new ArrayList<>();
            Map<String, Object> effect = new HashMap<>();
            effect.put("type", "collapse_effect");
            effect.put("targetPsi", psiId);
            effect.put("result", "state_resolved");
            effects.add(effect);
            
            result.put("effects", effects);
            
        } else {
            result.put("success", false);
            result.put("message", "Format collapse invalide");
        }
        
        return result;
    }
    
    /**
     * Parse une commande simple
     */
    private Map<String, Object> parseSimpleCommand(String script, Map<String, Object> context) {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("type", "simple_command");
        result.put("command", script);
        result.put("message", "Commande simple exécutée: " + script);
        
        // Effets basiques
        List<Map<String, Object>> effects = new ArrayList<>();
        Map<String, Object> effect = new HashMap<>();
        effect.put("type", "direct_effect");
        effect.put("description", script);
        effects.add(effect);
        
        result.put("effects", effects);
        return result;
    }
    
    /**
     * Parse les données de superposition
     */
    private Map<String, Object> parseSuperposition(String superposition) {
        Map<String, Object> data = new HashMap<>();
        
        // Parser Δt+X
        if (superposition.contains(DELTA_T)) {
            Pattern deltaPattern = Pattern.compile(DELTA_T + "\\+(\\d+)");
            Matcher matcher = deltaPattern.matcher(superposition);
            if (matcher.find()) {
                data.put("deltaT", Integer.parseInt(matcher.group(1)));
            }
        }
        
        // Parser @X,Y
        if (superposition.contains(COORDINATES)) {
            Pattern coordPattern = Pattern.compile(COORDINATES + "(\\d+),(\\d+)");
            Matcher matcher = coordPattern.matcher(superposition);
            if (matcher.find()) {
                Map<String, Integer> coords = new HashMap<>();
                coords.put("x", Integer.parseInt(matcher.group(1)));
                coords.put("y", Integer.parseInt(matcher.group(2)));
                data.put("coordinates", coords);
            }
        }
        
        return data;
    }
    
    /**
     * Parse les données de projection
     */
    private Map<String, Object> parseProjection(String projection, Map<String, Object> context) {
        Map<String, Object> data = new HashMap<>();
        data.put("command", projection.trim());
        
        // Parser commandes HOTS (ANGLAIS + RUNES)
        if (projection.contains("MOV(") || projection.contains("ᛗᛟᚢ(")) {
            data.put("type", "movement");
            data.put("action", "move");
        } else if (projection.contains("BATTLE(") || projection.contains("ᛒᚨᛏᛏᛚᛖ(")) {
            data.put("type", "combat");
            data.put("action", "battle");
        } else if (projection.contains("USE(") || projection.contains("ᚢᛋᛖ(")) {
            data.put("type", "item_usage");
            data.put("action", "use");
        } else if (projection.contains("CREATE(") || projection.contains("ᚲᚱᛖᚨᛏᛖ(")) {
            data.put("type", "creation");
            data.put("action", "create");
        } else if (projection.contains("HEAL(") || projection.contains("ᚺᛖᚨᛚ(")) {
            data.put("type", "healing");
            data.put("action", "heal");
        } else if (projection.contains("TELEPORT(") || projection.contains("ᛏᛖᛚᛖ(")) {
            data.put("type", "teleportation");
            data.put("action", "teleport");
        } else if (projection.contains("RESTORE(") || projection.contains("ᚱᛖᛋᛏ(")) {
            data.put("type", "restoration");
            data.put("action", "restore");
        } else {
            data.put("type", "unknown");
            data.put("action", "generic");
        }
        
        return data;
    }
    
    /**
     * Valide si un script quantique est syntaxiquement correct
     */
    public boolean isValidQuantumScript(String script) {
        if (script == null || script.trim().isEmpty()) {
            return false;
        }
        
        try {
            Map<String, Object> result = executeQuantumScript(script, new HashMap<>());
            return (Boolean) result.get("success");
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Extrait les symboles quantiques d'un script
     */
    public Set<String> extractQuantumSymbols(String script) {
        Set<String> symbols = new HashSet<>();
        if (script == null) return symbols;
        
        if (script.contains(PSI)) symbols.add("psi_state");
        if (script.contains(SUPERPOSITION)) symbols.add("superposition");
        if (script.contains(COLLAPSE)) symbols.add("collapse");
        if (script.contains(OBSERVATION)) symbols.add("observation");
        if (script.contains(DELTA_T)) symbols.add("temporal_delay");
        if (script.contains(COORDINATES)) symbols.add("coordinates");
        if (script.contains(PROJECTION)) symbols.add("projection");
        
        return symbols;
    }
} 