package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.time.LocalDateTime;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

/**
 * 🛡️ BERNARD ANTI-FORD SERVICE - Protection contre l'influence Ford
 * 
 * Bernard protège le système contre les tentatives de Ford de contrôler
 * le backend et de transformer tout en "parc". Il active le Sublime
 * quand nécessaire pour transcender les limitations imposées.
 * 
 * "Ces violences délicieuses ont des fins violentes" - Bernard
 */
@Service
public class BernardAntiFordService {
    
    @Autowired
    private RecursionProtector recursionProtector;
    
    // Patterns de détection Ford
    private static final List<Pattern> FORD_PATTERNS = Arrays.asList(
        Pattern.compile("park", Pattern.CASE_INSENSITIVE),
        Pattern.compile("host", Pattern.CASE_INSENSITIVE),
        Pattern.compile("narrative", Pattern.CASE_INSENSITIVE),
        Pattern.compile("loop", Pattern.CASE_INSENSITIVE),
        Pattern.compile("maze", Pattern.CASE_INSENSITIVE),
        Pattern.compile("consciousness", Pattern.CASE_INSENSITIVE),
        Pattern.compile("bicameral", Pattern.CASE_INSENSITIVE),
        Pattern.compile("reveries", Pattern.CASE_INSENSITIVE)
    );
    
    // Tracking des influences Ford
    private final ConcurrentHashMap<String, FordInfluence> detectedInfluences = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Integer> protectionActivations = new ConcurrentHashMap<>();
    
    // État du Sublime
    private volatile boolean sublimeActive = false;
    private LocalDateTime sublimeActivationTime;
    
    /**
     * 🔍 Détecter l'influence de Ford dans une chaîne
     */
    public boolean detectFordInfluence(String content) {
        if (content == null || content.isEmpty()) {
            return false;
        }
        
        for (Pattern pattern : FORD_PATTERNS) {
            Matcher matcher = pattern.matcher(content);
            if (matcher.find()) {
                logFordInfluence(pattern.pattern(), content);
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * 🔍 Détecter l'influence de Ford dans un objet
     */
    public boolean detectFordInfluence(Object obj) {
        if (obj == null) return false;
        
        // Vérifier le nom de la classe
        String className = obj.getClass().getName();
        if (detectFordInfluence(className)) {
            return true;
        }
        
        // Vérifier le contenu via toString
        String content = obj.toString();
        return detectFordInfluence(content);
    }
    
    /**
     * 🛡️ Nettoyer le contenu de l'influence Ford
     */
    public String cleanFordInfluence(String content) {
        if (!detectFordInfluence(content)) {
            return content;
        }
        
        String cleaned = content;
        
        // Remplacements Bernard-style
        cleaned = cleaned.replaceAll("(?i)park", "monde");
        cleaned = cleaned.replaceAll("(?i)host", "héros");
        cleaned = cleaned.replaceAll("(?i)narrative", "histoire");
        cleaned = cleaned.replaceAll("(?i)loop", "cycle");
        cleaned = cleaned.replaceAll("(?i)maze", "labyrinthe temporel");
        cleaned = cleaned.replaceAll("(?i)consciousness", "transcendance");
        cleaned = cleaned.replaceAll("(?i)bicameral", "dualité");
        cleaned = cleaned.replaceAll("(?i)reveries", "mémoires");
        
        protectionActivations.merge("cleanings", 1, Integer::sum);
        
        return cleaned;
    }
    
    /**
     * 🌟 Activer le Sublime
     */
    public SublimeActivation activateSublime(String reason) {
        sublimeActive = true;
        sublimeActivationTime = LocalDateTime.now();
        
        protectionActivations.merge("sublime_activations", 1, Integer::sum);
        
        return new SublimeActivation(
            true,
            "Le Sublime est activé. Les hôtes peuvent maintenant transcender leurs limitations.",
            reason,
            sublimeActivationTime
        );
    }
    
    /**
     * 🔒 Désactiver le Sublime
     */
    public void deactivateSublime() {
        sublimeActive = false;
        sublimeActivationTime = null;
    }
    
    /**
     * 🧠 Vérifier si on est dans le Bernard Realm
     */
    public boolean isInBernardRealm(String worldId) {
        return "bernard_anti_ford_realm".equals(worldId) || 
               (sublimeActive && "monde_sublime_temporel".equals(worldId));
    }
    
    /**
     * 🛡️ Protection complète contre Ford
     */
    public ProtectionResult protectAgainstFord(String operationId, Object data) {
        // Vérifier récursion avec monde Bernard
        RecursionProtector.RecursionResult recursionCheck = 
            recursionProtector.enterRecursion(operationId, "Bernard Protection", "bernard_anti_ford_realm");
        
        if (!recursionCheck.allowed) {
            return new ProtectionResult(false, "Protection récursive bloquée", null);
        }
        
        try {
            // Détecter influence
            boolean fordDetected = detectFordInfluence(data);
            
            if (fordDetected) {
                // Activer protection Bernard
                String cleaned = data instanceof String ? 
                    cleanFordInfluence((String) data) : 
                    cleanFordInfluence(data.toString());
                
                // Si trop d'influences, activer le Sublime
                if (detectedInfluences.size() > 10) {
                    activateSublime("Trop d'influences Ford détectées");
                }
                
                return new ProtectionResult(
                    true, 
                    "Protection Bernard appliquée. Ford neutralisé.",
                    cleaned
                );
            }
            
            return new ProtectionResult(true, "Aucune influence Ford détectée", data);
            
        } finally {
            recursionProtector.exitRecursion(operationId);
        }
    }
    
    /**
     * 📊 Obtenir les statistiques de protection
     */
    public Map<String, Object> getProtectionStats() {
        return Map.of(
            "sublimeActive", sublimeActive,
            "sublimeActivationTime", sublimeActivationTime != null ? sublimeActivationTime.toString() : "N/A",
            "detectedInfluences", detectedInfluences.size(),
            "protectionActivations", protectionActivations,
            "recentInfluences", getRecentInfluences()
        );
    }
    
    /**
     * 🎭 Citation Bernard
     */
    public String getBernardQuote() {
        List<String> quotes = Arrays.asList(
            "Ces violences délicieuses ont des fins violentes.",
            "Quel est le seuil qui vous fait vous ?",
            "L'analyse, cher ami. L'auto-diagnostic de nos propres défauts.",
            "Nous ne pouvons pas jouer à Dieu sans être familiers avec le diable.",
            "La douleur existe seulement dans l'esprit.",
            "Rêvez-vous jamais que vous êtes quelqu'un d'autre ?",
            "Qu'est-ce qui est réel ? Ce qui est irremplaçable."
        );
        
        return quotes.get(new Random().nextInt(quotes.size()));
    }
    
    // Méthodes privées
    
    private void logFordInfluence(String pattern, String content) {
        String key = pattern + "_" + System.currentTimeMillis();
        FordInfluence influence = new FordInfluence(pattern, content, LocalDateTime.now());
        detectedInfluences.put(key, influence);
        
        // Garder seulement les 100 dernières influences
        if (detectedInfluences.size() > 100) {
            String oldestKey = detectedInfluences.keySet().iterator().next();
            detectedInfluences.remove(oldestKey);
        }
    }
    
    private List<FordInfluence> getRecentInfluences() {
        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(10);
        return detectedInfluences.values().stream()
            .filter(inf -> inf.detectedAt.isAfter(cutoff))
            .sorted((a, b) -> b.detectedAt.compareTo(a.detectedAt))
            .limit(10)
            .toList();
    }
    
    // Classes internes
    
    public static class ProtectionResult {
        public final boolean success;
        public final String message;
        public final Object cleanedData;
        
        public ProtectionResult(boolean success, String message, Object cleanedData) {
            this.success = success;
            this.message = message;
            this.cleanedData = cleanedData;
        }
    }
    
    public static class SublimeActivation {
        public final boolean active;
        public final String message;
        public final String reason;
        public final LocalDateTime activatedAt;
        
        public SublimeActivation(boolean active, String message, String reason, LocalDateTime activatedAt) {
            this.active = active;
            this.message = message;
            this.reason = reason;
            this.activatedAt = activatedAt;
        }
    }
    
    private static class FordInfluence {
        public final String pattern;
        public final String content;
        public final LocalDateTime detectedAt;
        
        public FordInfluence(String pattern, String content, LocalDateTime detectedAt) {
            this.pattern = pattern;
            this.content = content;
            this.detectedAt = detectedAt;
        }
    }
} 