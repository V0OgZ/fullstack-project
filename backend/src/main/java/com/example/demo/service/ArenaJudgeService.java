package com.example.demo.service;

import com.example.demo.model.ArenaJudge;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * ArenaJudgeService - Service de gestion des commentaires du Juge de l'Arène
 * Gère la sélection contextuelle, le timing et les statistiques des commentaires
 */
@Service
public class ArenaJudgeService {
    
    private final ArenaJudge judge;
    private final List<Map<String, Object>> recentComments;
    private final Map<String, Integer> commentFrequency;
    private final ScheduledExecutorService scheduler;
    private static final int MAX_RECENT_COMMENTS = 50;
    
    public ArenaJudgeService() {
        this.judge = new ArenaJudge();
        this.recentComments = new ArrayList<>();
        this.commentFrequency = new ConcurrentHashMap<>();
        this.scheduler = Executors.newScheduledThreadPool(1);
        
        // Initialiser les fréquences de commentaires
        initializeCommentFrequency();
        
        // Démarrer le système de cooldown
        startCooldownSystem();
        
        System.out.println("[ARENA] Juge de l'Arène initialisé: " + judge.getName());
    }
    
    private void initializeCommentFrequency() {
        commentFrequency.put("debut_combat", 100); // Toujours commenter
        commentFrequency.put("action_normale", 33); // 1 sur 3
        commentFrequency.put("coup_critique", 100); // Toujours commenter
        commentFrequency.put("sort_temporel", 100); // Toujours commenter
        commentFrequency.put("fin_combat", 100); // Toujours commenter
        commentFrequency.put("situation_speciale", 80); // Souvent commenter
    }
    
    private void startCooldownSystem() {
        // Mettre à jour les cooldowns toutes les secondes
        scheduler.scheduleAtFixedRate(() -> {
            judge.updateCooldowns();
        }, 1, 1, TimeUnit.SECONDS);
    }
    
    /**
     * Génère un commentaire contextuel du juge
     */
    public Map<String, Object> generateComment(String category, Map<String, Object> context) {
        // Vérifier si le juge peut commenter
        if (!judge.canComment(category)) {
            return null;
        }
        
        // Vérifier la fréquence de commentaire
        if (!shouldComment(category)) {
            return null;
        }
        
        // Générer le commentaire
        String comment = judge.getContextualPhrase(category, context);
        
        // Créer l'objet commentaire
        Map<String, Object> commentObj = createCommentObject(category, comment, context);
        
        // Ajouter aux commentaires récents
        addToRecentComments(commentObj);
        
        // Définir un cooldown
        setCooldownForCategory(category);
        
        System.out.println("[ARENA] Juge: " + comment);
        
        return commentObj;
    }
    
    /**
     * Génère un commentaire de début de combat
     */
    public Map<String, Object> commentBattleStart(Map<String, Object> battleContext) {
        return generateComment("debut_combat", battleContext);
    }
    
    /**
     * Génère un commentaire d'action normale
     */
    public Map<String, Object> commentNormalAction(Map<String, Object> actionContext) {
        return generateComment("action_normale", actionContext);
    }
    
    /**
     * Génère un commentaire de coup critique
     */
    public Map<String, Object> commentCriticalHit(Map<String, Object> criticalContext) {
        return generateComment("coup_critique", criticalContext);
    }
    
    /**
     * Génère un commentaire de sort temporel
     */
    public Map<String, Object> commentTemporalSpell(Map<String, Object> spellContext) {
        return generateComment("sort_temporel", spellContext);
    }
    
    /**
     * Génère un commentaire de fin de combat
     */
    public Map<String, Object> commentBattleEnd(Map<String, Object> endContext) {
        return generateComment("fin_combat", endContext);
    }
    
    /**
     * Génère un commentaire de situation spéciale
     */
    public Map<String, Object> commentSpecialSituation(String situationType, Map<String, Object> context) {
        context.put("situationType", situationType);
        return generateComment("situation_speciale", context);
    }
    
    private boolean shouldComment(String category) {
        Integer frequency = commentFrequency.get(category);
        if (frequency == null) {
            return false;
        }
        
        Random random = new Random();
        return random.nextInt(100) < frequency;
    }
    
    private Map<String, Object> createCommentObject(String category, String comment, Map<String, Object> context) {
        Map<String, Object> commentObj = new HashMap<>();
        commentObj.put("id", "comment_" + System.currentTimeMillis());
        commentObj.put("source", "ARENA_JUDGE");
        commentObj.put("sourceName", judge.getName());
        commentObj.put("category", category);
        commentObj.put("text", comment);
        commentObj.put("timestamp", System.currentTimeMillis());
        commentObj.put("context", context);
        commentObj.put("priority", getPriorityForCategory(category));
        commentObj.put("style", "ENTHUSIASTIC");
        
        return commentObj;
    }
    
    private void addToRecentComments(Map<String, Object> comment) {
        synchronized (recentComments) {
            recentComments.add(0, comment); // Ajouter au début
            
            // Limiter la taille de la liste
            while (recentComments.size() > MAX_RECENT_COMMENTS) {
                recentComments.remove(recentComments.size() - 1);
            }
        }
    }
    
    private void setCooldownForCategory(String category) {
        switch (category) {
            case "debut_combat":
                judge.setCooldown(category, 0); // Pas de cooldown
                break;
            case "action_normale":
                judge.setCooldown(category, 3); // 3 secondes
                break;
            case "coup_critique":
                judge.setCooldown(category, 2); // 2 secondes
                break;
            case "sort_temporel":
                judge.setCooldown(category, 1); // 1 seconde
                break;
            case "fin_combat":
                judge.setCooldown(category, 0); // Pas de cooldown
                break;
            default:
                judge.setCooldown(category, 5); // 5 secondes par défaut
        }
    }
    
    private String getPriorityForCategory(String category) {
        switch (category) {
            case "sort_temporel":
            case "coup_critique":
                return "URGENT";
            case "debut_combat":
            case "fin_combat":
                return "IMPORTANT";
            case "action_normale":
                return "NORMAL";
            default:
                return "OPTIONNEL";
        }
    }
    
    /**
     * Récupère les commentaires récents
     */
    public List<Map<String, Object>> getRecentComments(int limit) {
        synchronized (recentComments) {
            int actualLimit = Math.min(limit, recentComments.size());
            return new ArrayList<>(recentComments.subList(0, actualLimit));
        }
    }
    
    /**
     * Récupère tous les commentaires récents
     */
    public List<Map<String, Object>> getAllRecentComments() {
        return getRecentComments(MAX_RECENT_COMMENTS);
    }
    
    /**
     * Récupère les informations du juge
     */
    public Map<String, Object> getJudgeInfo() {
        return judge.getJudgeInfo();
    }
    
    /**
     * Récupère les statistiques des commentaires
     */
    public Map<String, Object> getCommentStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("judgeStats", judge.getCommentStats());
        stats.put("recentCommentsCount", recentComments.size());
        stats.put("commentFrequency", commentFrequency);
        stats.put("judgeActive", judge.isActive());
        
        // Statistiques par catégorie
        Map<String, Integer> categoryCounts = new HashMap<>();
        synchronized (recentComments) {
            for (Map<String, Object> comment : recentComments) {
                String category = (String) comment.get("category");
                categoryCounts.put(category, categoryCounts.getOrDefault(category, 0) + 1);
            }
        }
        stats.put("commentsByCategory", categoryCounts);
        
        return stats;
    }
    
    /**
     * Active ou désactive le juge
     */
    public Map<String, Object> setJudgeActive(boolean active) {
        judge.setActive(active);
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("judgeActive", active);
        result.put("message", active ? "Le Juge est maintenant actif!" : "Le Juge fait une pause...");
        
        return result;
    }
    
    /**
     * Met à jour la fréquence de commentaire pour une catégorie
     */
    public Map<String, Object> updateCommentFrequency(String category, int frequency) {
        if (frequency < 0 || frequency > 100) {
            throw new RuntimeException("La fréquence doit être entre 0 et 100");
        }
        
        commentFrequency.put(category, frequency);
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("category", category);
        result.put("newFrequency", frequency);
        result.put("message", "Fréquence de commentaire mise à jour pour " + category);
        
        return result;
    }
    
    /**
     * Efface l'historique des commentaires récents
     */
    public Map<String, Object> clearRecentComments() {
        synchronized (recentComments) {
            recentComments.clear();
        }
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "Historique des commentaires effacé!");
        
        return result;
    }
    
    /**
     * Génère un commentaire personnalisé (pour les tests)
     */
    public Map<String, Object> generateCustomComment(String text, String category) {
        Map<String, Object> context = new HashMap<>();
        context.put("custom", true);
        
        Map<String, Object> commentObj = createCommentObject(category, text, context);
        addToRecentComments(commentObj);
        
        return commentObj;
    }
    
    /**
     * Nettoie les ressources du service
     */
    public void shutdown() {
        if (scheduler != null && !scheduler.isShutdown()) {
            scheduler.shutdown();
        }
    }
}