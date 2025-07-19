package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.PsiState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Parser étendu pour la grammaire quantique GROFI
 * Supporte les nouveaux symboles : †[...], Π[...], Ω[...], Λ[...], Σ[...], ↯
 * Compatible avec le TemporalScriptParser existant
 */
@Service
public class ExtendedTemporalScriptParser {
    
    @Autowired
    private TemporalScriptParser baseParser;
    
    // ========================================
    // NOUVEAUX PATTERNS GROFI
    // ========================================
    
    // †[...] : Rollback/annulation
    private static final Pattern ROLLBACK_PATTERN = Pattern.compile("†\\[([^\\]]+)\\]");
    private static final Pattern ROLLBACK_RANGE_PATTERN = Pattern.compile("†\\[Δt(-\\d+)\\s+TO\\s+Δt(-\\d+)\\]");
    private static final Pattern ROLLBACK_ALL_PATTERN = Pattern.compile("†\\[ALL\\]");
    
    // Π[...] : Condition logique étendue
    private static final Pattern CONDITION_EXTENDED_PATTERN = Pattern.compile("Π\\[([^\\]]+)\\]");
    private static final Pattern CONDITION_IF_THEN_PATTERN = Pattern.compile("Π\\[IF\\s+([^\\]]+)\\s+THEN\\s+([^\\]]+)\\]");
    
    // Ω[...] : Réalité effondrée
    private static final Pattern COLLAPSED_REALITY_PATTERN = Pattern.compile("Ω\\[([^\\]]+)\\]");
    private static final Pattern OMEGA_ONE_PATTERN = Pattern.compile("Ω\\[ONE\\]");
    private static final Pattern OMEGA_STATE_PATTERN = Pattern.compile("Ω\\[STATE:([^\\]]+)\\]");
    
    // Λ[...] : Instabilité système
    private static final Pattern SYSTEM_INSTABILITY_PATTERN = Pattern.compile("Λ\\[([^\\]]+)\\]");
    private static final Pattern LAMBDA_LEVEL_PATTERN = Pattern.compile("Λ\\[LEVEL:(\\d+)\\]");
    
    // Σ[...] : Stress global
    private static final Pattern GLOBAL_STRESS_PATTERN = Pattern.compile("Σ\\[([^\\]]+)\\]");
    private static final Pattern SIGMA_VALUE_PATTERN = Pattern.compile("Σ\\[VALUE:(\\d+(?:\\.\\d+)?)\\]");
    
    // ↯ : Erreur/effondrement critique
    private static final Pattern CRITICAL_ERROR_PATTERN = Pattern.compile("↯");
    private static final Pattern CRITICAL_WITH_MESSAGE_PATTERN = Pattern.compile("↯\\(([^)]+)\\)");
    
    // Superposition récursive : ψ[ψ[ψ[action]]]
    private static final Pattern RECURSIVE_PSI_PATTERN = Pattern.compile("ψ\\[(ψ\\[[^\\]]*\\])\\]");
    private static final Pattern DEEP_RECURSIVE_PSI_PATTERN = Pattern.compile("ψ\\[(ψ\\[(ψ\\[[^\\]]*\\])\\])\\]");
    
    // Collapse total : ⊙ ψ[ALL] ⇒ Ω[ONE]
    private static final Pattern TOTAL_COLLAPSE_PATTERN = Pattern.compile("⊙\\s+ψ\\[ALL\\]\\s*⇒\\s*Ω\\[ONE\\]");
    
    // GROFI Ultimate Power patterns
    private static final Pattern GROFI_ULTIMATE_PATTERN = Pattern.compile("ψ†\\[FREEZE\\s+\\{([^}]+)\\}\\]\\s*⊙\\s*HERO\\(([^)]+)\\)");
    
    /**
     * Parser une ligne de script avec la grammaire étendue GROFI
     */
    public ExtendedScriptResult parseExtendedScript(String scriptLine) {
        ExtendedScriptResult result = new ExtendedScriptResult();
        result.originalScript = scriptLine;
        
        try {
            // 1. Vérifier d'abord les patterns GROFI spéciaux
            if (parseGrofiUltimatePower(scriptLine, result)) {
                return result;
            }
            
            // 2. Vérifier les nouveaux symboles GROFI
            if (parseRollbackCommand(scriptLine, result)) {
                return result;
            }
            
            if (parseExtendedCondition(scriptLine, result)) {
                return result;
            }
            
            if (parseCollapsedReality(scriptLine, result)) {
                return result;
            }
            
            if (parseSystemInstability(scriptLine, result)) {
                return result;
            }
            
            if (parseGlobalStress(scriptLine, result)) {
                return result;
            }
            
            if (parseCriticalError(scriptLine, result)) {
                return result;
            }
            
            // 3. Vérifier superposition récursive
            if (parseRecursivePsi(scriptLine, result)) {
                return result;
            }
            
            // 4. Vérifier collapse total
            if (parseTotalCollapse(scriptLine, result)) {
                return result;
            }
            
            // 5. Fallback vers le parser de base
            if (baseParser.isTemporalScript(scriptLine)) {
                PsiState psiState = baseParser.parseTemporalScript(scriptLine);
                if (psiState != null) {
                    result.success = true;
                    result.type = "BASE_TEMPORAL";
                    result.psiState = psiState;
                    return result;
                }
            }
            
            // 6. Script de base classique
            TemporalScriptParser.ScriptCommand command = baseParser.parseBasicScript(scriptLine);
            if (command != null) {
                result.success = true;
                result.type = "BASE_CLASSIC";
                result.basicCommand = command;
                return result;
            }
            
            result.success = false;
            result.error = "Script non reconnu par la grammaire étendue";
            
        } catch (Exception e) {
            result.success = false;
            result.error = "Erreur parsing grammaire étendue: " + e.getMessage();
        }
        
        return result;
    }
    
    /**
     * Parser les Ultimate Powers GROFI
     */
    private boolean parseGrofiUltimatePower(String scriptLine, ExtendedScriptResult result) {
        Matcher matcher = GROFI_ULTIMATE_PATTERN.matcher(scriptLine);
        if (matcher.find()) {
            String freezeTarget = matcher.group(1);
            String heroName = matcher.group(2);
            
            result.success = true;
            result.type = "GROFI_ULTIMATE";
            result.parameters.put("freezeTarget", freezeTarget);
            result.parameters.put("heroName", heroName);
            result.parameters.put("ultimateName", "Collapse Override");
            result.description = "Ultimate Power: Collapse Override - Freeze " + freezeTarget;
            
            return true;
        }
        return false;
    }
    
    /**
     * Parser les commandes de rollback †[...]
     */
    private boolean parseRollbackCommand(String scriptLine, ExtendedScriptResult result) {
        // Rollback range: †[Δt-5 TO Δt-1]
        Matcher rangeMatcher = ROLLBACK_RANGE_PATTERN.matcher(scriptLine);
        if (rangeMatcher.find()) {
            int startDelta = Integer.parseInt(rangeMatcher.group(1));
            int endDelta = Integer.parseInt(rangeMatcher.group(2));
            
            result.success = true;
            result.type = "ROLLBACK_RANGE";
            result.parameters.put("startDelta", startDelta);
            result.parameters.put("endDelta", endDelta);
            result.description = "Rollback range from Δt" + startDelta + " to Δt" + endDelta;
            
            return true;
        }
        
        // Rollback all: †[ALL]
        Matcher allMatcher = ROLLBACK_ALL_PATTERN.matcher(scriptLine);
        if (allMatcher.find()) {
            result.success = true;
            result.type = "ROLLBACK_ALL";
            result.description = "Rollback all temporal states";
            
            return true;
        }
        
        // Rollback général: †[content]
        Matcher rollbackMatcher = ROLLBACK_PATTERN.matcher(scriptLine);
        if (rollbackMatcher.find()) {
            String content = rollbackMatcher.group(1);
            
            result.success = true;
            result.type = "ROLLBACK";
            result.parameters.put("content", content);
            result.description = "Rollback: " + content;
            
            return true;
        }
        
        return false;
    }
    
    /**
     * Parser les conditions étendues Π[...]
     */
    private boolean parseExtendedCondition(String scriptLine, ExtendedScriptResult result) {
        // IF-THEN condition: Π[IF condition THEN action]
        Matcher ifThenMatcher = CONDITION_IF_THEN_PATTERN.matcher(scriptLine);
        if (ifThenMatcher.find()) {
            String condition = ifThenMatcher.group(1);
            String action = ifThenMatcher.group(2);
            
            result.success = true;
            result.type = "CONDITION_IF_THEN";
            result.parameters.put("condition", condition);
            result.parameters.put("action", action);
            result.description = "Conditional: IF " + condition + " THEN " + action;
            
            return true;
        }
        
        // Condition générale: Π[content]
        Matcher conditionMatcher = CONDITION_EXTENDED_PATTERN.matcher(scriptLine);
        if (conditionMatcher.find()) {
            String content = conditionMatcher.group(1);
            
            result.success = true;
            result.type = "CONDITION";
            result.parameters.put("content", content);
            result.description = "Condition: " + content;
            
            return true;
        }
        
        return false;
    }
    
    /**
     * Parser la réalité effondrée Ω[...]
     */
    private boolean parseCollapsedReality(String scriptLine, ExtendedScriptResult result) {
        // Ω[ONE]
        if (OMEGA_ONE_PATTERN.matcher(scriptLine).find()) {
            result.success = true;
            result.type = "COLLAPSED_REALITY_ONE";
            result.description = "Collapsed reality: ONE state remains";
            
            return true;
        }
        
        // Ω[STATE:name]
        Matcher stateMatcher = OMEGA_STATE_PATTERN.matcher(scriptLine);
        if (stateMatcher.find()) {
            String stateName = stateMatcher.group(1);
            
            result.success = true;
            result.type = "COLLAPSED_REALITY_STATE";
            result.parameters.put("stateName", stateName);
            result.description = "Collapsed reality: State " + stateName;
            
            return true;
        }
        
        // Ω[general]
        Matcher omegaMatcher = COLLAPSED_REALITY_PATTERN.matcher(scriptLine);
        if (omegaMatcher.find()) {
            String content = omegaMatcher.group(1);
            
            result.success = true;
            result.type = "COLLAPSED_REALITY";
            result.parameters.put("content", content);
            result.description = "Collapsed reality: " + content;
            
            return true;
        }
        
        return false;
    }
    
    /**
     * Parser l'instabilité système Λ[...]
     */
    private boolean parseSystemInstability(String scriptLine, ExtendedScriptResult result) {
        // Λ[LEVEL:n]
        Matcher levelMatcher = LAMBDA_LEVEL_PATTERN.matcher(scriptLine);
        if (levelMatcher.find()) {
            int level = Integer.parseInt(levelMatcher.group(1));
            
            result.success = true;
            result.type = "SYSTEM_INSTABILITY_LEVEL";
            result.parameters.put("level", level);
            result.description = "System instability level: " + level;
            
            return true;
        }
        
        // Λ[general]
        Matcher lambdaMatcher = SYSTEM_INSTABILITY_PATTERN.matcher(scriptLine);
        if (lambdaMatcher.find()) {
            String content = lambdaMatcher.group(1);
            
            result.success = true;
            result.type = "SYSTEM_INSTABILITY";
            result.parameters.put("content", content);
            result.description = "System instability: " + content;
            
            return true;
        }
        
        return false;
    }
    
    /**
     * Parser le stress global Σ[...]
     */
    private boolean parseGlobalStress(String scriptLine, ExtendedScriptResult result) {
        // Σ[VALUE:n.n]
        Matcher valueMatcher = SIGMA_VALUE_PATTERN.matcher(scriptLine);
        if (valueMatcher.find()) {
            double value = Double.parseDouble(valueMatcher.group(1));
            
            result.success = true;
            result.type = "GLOBAL_STRESS_VALUE";
            result.parameters.put("value", value);
            result.description = "Global stress value: " + value;
            
            return true;
        }
        
        // Σ[general]
        Matcher sigmaMatcher = GLOBAL_STRESS_PATTERN.matcher(scriptLine);
        if (sigmaMatcher.find()) {
            String content = sigmaMatcher.group(1);
            
            result.success = true;
            result.type = "GLOBAL_STRESS";
            result.parameters.put("content", content);
            result.description = "Global stress: " + content;
            
            return true;
        }
        
        return false;
    }
    
    /**
     * Parser les erreurs critiques ↯
     */
    private boolean parseCriticalError(String scriptLine, ExtendedScriptResult result) {
        // ↯(message)
        Matcher messageMatcher = CRITICAL_WITH_MESSAGE_PATTERN.matcher(scriptLine);
        if (messageMatcher.find()) {
            String message = messageMatcher.group(1);
            
            result.success = true;
            result.type = "CRITICAL_ERROR_MESSAGE";
            result.parameters.put("message", message);
            result.description = "Critical error: " + message;
            
            return true;
        }
        
        // ↯
        if (CRITICAL_ERROR_PATTERN.matcher(scriptLine).find()) {
            result.success = true;
            result.type = "CRITICAL_ERROR";
            result.description = "Critical error/collapse";
            
            return true;
        }
        
        return false;
    }
    
    /**
     * Parser les superpositions récursives ψ[ψ[ψ[...]]]
     */
    private boolean parseRecursivePsi(String scriptLine, ExtendedScriptResult result) {
        // Détecter la profondeur de récursion
        int depth = 0;
        String temp = scriptLine;
        
        while (temp.contains("ψ[")) {
            depth++;
            temp = temp.replaceFirst("ψ\\[", "");
            if (depth > 5) break; // Limite de sécurité
        }
        
        if (depth > 1) {
            result.success = true;
            result.type = "RECURSIVE_PSI";
            result.parameters.put("depth", depth);
            result.parameters.put("content", scriptLine);
            result.description = "Recursive ψ-state (depth: " + depth + ")";
            
            return true;
        }
        
        return false;
    }
    
    /**
     * Parser le collapse total ⊙ ψ[ALL] ⇒ Ω[ONE]
     */
    private boolean parseTotalCollapse(String scriptLine, ExtendedScriptResult result) {
        if (TOTAL_COLLAPSE_PATTERN.matcher(scriptLine).find()) {
            result.success = true;
            result.type = "TOTAL_COLLAPSE";
            result.description = "Total collapse: All ψ-states → One reality";
            
            return true;
        }
        
        return false;
    }
    
    /**
     * Vérifier si un script utilise la grammaire étendue
     */
    public boolean isExtendedScript(String scriptLine) {
        return scriptLine.contains("†[") || 
               scriptLine.contains("Π[") || 
               scriptLine.contains("Ω[") || 
               scriptLine.contains("Λ[") || 
               scriptLine.contains("Σ[") || 
               scriptLine.contains("↯") ||
               scriptLine.contains("ψ[ψ[") ||
               scriptLine.contains("ψ†[");
    }
    
    /**
     * Classe de résultat pour le parsing étendu
     */
    public static class ExtendedScriptResult {
        public boolean success = false;
        public String type;
        public String originalScript;
        public String description;
        public String error;
        public Map<String, Object> parameters = new HashMap<>();
        
        // Compatibilité avec le système existant
        public PsiState psiState;
        public TemporalScriptParser.ScriptCommand basicCommand;
        
        @Override
        public String toString() {
            return String.format("ExtendedScriptResult{success=%s, type='%s', description='%s'}", 
                                success, type, description);
        }
    }
} 