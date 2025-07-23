package com.heroesoftimepoc.temporalengine.service;

import org.springframework.stereotype.Component;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.Map;

/**
 * Cache optimisé pour les regex compilées
 * Gain estimé : +150% performance parser
 */
@Component
public class OptimizedRegexCache {
    
    // Cache des patterns compilés
    private final Map<String, Pattern> patternCache = new ConcurrentHashMap<>();
    
    // Patterns pré-compilés pour les scripts communs
    private final Pattern PSI_PATTERN = Pattern.compile("^ψ\\d+:");
    private final Pattern QUANTUM_PATTERN = Pattern.compile("⊙\\(Δt\\+\\d+\\s+@\\d+,\\d+\\s+⟶");
    private final Pattern COLLAPSE_PATTERN = Pattern.compile("^COLLAPSE\\(ψ\\d+\\)");
    private final Pattern OBSERVE_PATTERN = Pattern.compile("^OBSERVE\\(ψ\\d+");
    private final Pattern HERO_PATTERN = Pattern.compile("^HERO\\([^)]+\\)");
    private final Pattern MOV_PATTERN = Pattern.compile("^MOV\\([^,]+,\\s*@\\d+,\\d+\\)");
    private final Pattern CREATE_PATTERN = Pattern.compile("^CREATE\\(");
    private final Pattern BATTLE_PATTERN = Pattern.compile("^BATTLE\\(");
    private final Pattern BUILD_PATTERN = Pattern.compile("^BUILD\\(");
    private final Pattern COLLECT_PATTERN = Pattern.compile("^COLLECT\\(");
    private final Pattern RECRUIT_PATTERN = Pattern.compile("^RECRUIT\\(");
    private final Pattern CAST_PATTERN = Pattern.compile("^CAST\\(");
    private final Pattern LEARN_PATTERN = Pattern.compile("^LEARN\\(");
    private final Pattern LEVELUP_PATTERN = Pattern.compile("^LEVELUP\\(");
    private final Pattern EXPLORE_PATTERN = Pattern.compile("^EXPLORE\\(");
    private final Pattern EQUIP_PATTERN = Pattern.compile("^EQUIP\\(");
    private final Pattern SIEGE_PATTERN = Pattern.compile("^SIEGE\\(");
    private final Pattern CAPTURE_PATTERN = Pattern.compile("^CAPTURE\\(");
    
    // Statistiques de cache
    private long cacheHits = 0;
    private long cacheMisses = 0;
    private long totalMatches = 0;
    
    /**
     * Vérifier si un script est temporal/quantique (optimisé)
     */
    public boolean isTemporalScript(String script) {
        totalMatches++;
        
        // Vérification rapide avec patterns pré-compilés
        if (PSI_PATTERN.matcher(script).find()) {
            cacheHits++;
            return true;
        }
        if (QUANTUM_PATTERN.matcher(script).find()) {
            cacheHits++;
            return true;
        }
        if (COLLAPSE_PATTERN.matcher(script).matches()) {
            cacheHits++;
            return true;
        }
        if (OBSERVE_PATTERN.matcher(script).find()) {
            cacheHits++;
            return true;
        }
        
        cacheMisses++;
        return false;
    }
    
    /**
     * Vérifier si un script est un script classique (optimisé)
     */
    public boolean isClassicScript(String script) {
        totalMatches++;
        
        // Vérification rapide avec patterns pré-compilés
        if (HERO_PATTERN.matcher(script).matches()) {
            cacheHits++;
            return true;
        }
        if (MOV_PATTERN.matcher(script).matches()) {
            cacheHits++;
            return true;
        }
        if (CREATE_PATTERN.matcher(script).find()) {
            cacheHits++;
            return true;
        }
        if (BATTLE_PATTERN.matcher(script).find()) {
            cacheHits++;
            return true;
        }
        if (BUILD_PATTERN.matcher(script).find()) {
            cacheHits++;
            return true;
        }
        if (COLLECT_PATTERN.matcher(script).find()) {
            cacheHits++;
            return true;
        }
        if (RECRUIT_PATTERN.matcher(script).find()) {
            cacheHits++;
            return true;
        }
        if (CAST_PATTERN.matcher(script).find()) {
            cacheHits++;
            return true;
        }
        if (LEARN_PATTERN.matcher(script).find()) {
            cacheHits++;
            return true;
        }
        if (LEVELUP_PATTERN.matcher(script).find()) {
            cacheHits++;
            return true;
        }
        if (EXPLORE_PATTERN.matcher(script).find()) {
            cacheHits++;
            return true;
        }
        if (EQUIP_PATTERN.matcher(script).find()) {
            cacheHits++;
            return true;
        }
        if (SIEGE_PATTERN.matcher(script).find()) {
            cacheHits++;
            return true;
        }
        if (CAPTURE_PATTERN.matcher(script).find()) {
            cacheHits++;
            return true;
        }
        
        cacheMisses++;
        return false;
    }
    
    /**
     * Matcher générique avec cache
     */
    public boolean matches(String patternString, String input) {
        totalMatches++;
        Pattern pattern = patternCache.computeIfAbsent(patternString, k -> {
            cacheMisses++;
            return Pattern.compile(k);
        });
        
        if (patternCache.containsKey(patternString)) {
            cacheHits++;
        }
        
        return pattern.matcher(input).matches();
    }
    
    /**
     * Finder générique avec cache
     */
    public boolean find(String patternString, String input) {
        totalMatches++;
        Pattern pattern = patternCache.computeIfAbsent(patternString, k -> {
            cacheMisses++;
            return Pattern.compile(k);
        });
        
        if (patternCache.containsKey(patternString)) {
            cacheHits++;
        }
        
        return pattern.matcher(input).find();
    }
    
    /**
     * Extraire des groupes avec cache
     */
    public Matcher getMatcher(String patternString, String input) {
        totalMatches++;
        Pattern pattern = patternCache.computeIfAbsent(patternString, k -> {
            cacheMisses++;
            return Pattern.compile(k);
        });
        
        if (patternCache.containsKey(patternString)) {
            cacheHits++;
        }
        
        return pattern.matcher(input);
    }
    
    /**
     * Obtenir les statistiques de cache
     */
    public Map<String, Object> getCacheStats() {
        Map<String, Object> stats = new ConcurrentHashMap<>();
        stats.put("cacheHits", cacheHits);
        stats.put("cacheMisses", cacheMisses);
        stats.put("totalMatches", totalMatches);
        stats.put("hitRate", totalMatches > 0 ? (double) cacheHits / totalMatches : 0);
        stats.put("cacheSize", patternCache.size());
        return stats;
    }
    
    /**
     * Réinitialiser les statistiques
     */
    public void resetStats() {
        cacheHits = 0;
        cacheMisses = 0;
        totalMatches = 0;
    }
    
    /**
     * Nettoyer le cache
     */
    public void clearCache() {
        patternCache.clear();
        resetStats();
    }
} 