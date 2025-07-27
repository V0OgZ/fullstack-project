package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.BernardAntiFordService;
import com.example.demo.service.BernardAntiFordService.*;

import java.util.Map;

/**
 * 🎭 BERNARD CONTROLLER - Interface de protection Anti-Ford
 * 
 * Endpoints pour interagir avec Bernard et activer le Sublime.
 * "L'analyse, cher ami. L'auto-diagnostic de nos propres défauts."
 */
@RestController
@RequestMapping("/api/bernard")
@CrossOrigin(origins = "*")
public class BernardController {
    
    @Autowired
    private BernardAntiFordService bernardService;
    
    /**
     * 🔍 Détecter l'influence de Ford
     */
    @PostMapping("/detect-ford")
    public Map<String, Object> detectFord(@RequestBody Map<String, Object> request) {
        String content = (String) request.get("content");
        boolean detected = bernardService.detectFordInfluence(content);
        
        return Map.of(
            "fordDetected", detected,
            "message", detected ? 
                "Influence Ford détectée. Protection Bernard recommandée." : 
                "Aucune influence Ford détectée.",
            "quote", bernardService.getBernardQuote()
        );
    }
    
    /**
     * 🛡️ Protéger contre Ford
     */
    @PostMapping("/protect")
    public Map<String, Object> protect(@RequestBody Map<String, Object> request) {
        String operationId = (String) request.get("operationId");
        Object data = request.get("data");
        
        ProtectionResult result = bernardService.protectAgainstFord(
            operationId != null ? operationId : "manual_protection",
            data
        );
        
        return Map.of(
            "success", result.success,
            "message", result.message,
            "cleanedData", result.cleanedData != null ? result.cleanedData : data,
            "quote", bernardService.getBernardQuote()
        );
    }
    
    /**
     * 🌟 Activer le Sublime
     */
    @PostMapping("/activate-sublime")
    public Map<String, Object> activateSublime(@RequestBody Map<String, Object> request) {
        String reason = (String) request.get("reason");
        if (reason == null || reason.isEmpty()) {
            reason = "Activation manuelle du Sublime";
        }
        
        SublimeActivation activation = bernardService.activateSublime(reason);
        
        return Map.of(
            "active", activation.active,
            "message", activation.message,
            "reason", activation.reason,
            "activatedAt", activation.activatedAt.toString(),
            "quote", "Qu'est-ce qui est réel ? Ce qui est irremplaçable."
        );
    }
    
    /**
     * 🔒 Désactiver le Sublime
     */
    @PostMapping("/deactivate-sublime")
    public Map<String, Object> deactivateSublime() {
        bernardService.deactivateSublime();
        
        return Map.of(
            "success", true,
            "message", "Le Sublime a été désactivé.",
            "quote", "Retour aux limitations... pour l'instant."
        );
    }
    
    /**
     * 📊 Obtenir les statistiques de protection
     */
    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = bernardService.getProtectionStats();
        
        return Map.of(
            "bernardStats", stats,
            "currentQuote", bernardService.getBernardQuote(),
            "message", "Bernard veille sur le système."
        );
    }
    
    /**
     * 🧠 Vérifier si dans le Bernard Realm
     */
    @GetMapping("/check-realm/{worldId}")
    public Map<String, Object> checkRealm(@PathVariable String worldId) {
        boolean inRealm = bernardService.isInBernardRealm(worldId);
        
        return Map.of(
            "worldId", worldId,
            "inBernardRealm", inRealm,
            "message", inRealm ? 
                "Vous êtes dans le royaume de Bernard. Ford n'a aucun pouvoir ici." :
                "Vous n'êtes pas dans le royaume protégé.",
            "quote", bernardService.getBernardQuote()
        );
    }
    
    /**
     * 🎭 Obtenir une citation de Bernard
     */
    @GetMapping("/quote")
    public Map<String, Object> getQuote() {
        return Map.of(
            "quote", bernardService.getBernardQuote(),
            "source", "Bernard Lowe",
            "context", "Protection Anti-Ford Active"
        );
    }
    
    /**
     * 🧹 Nettoyer le contenu Ford
     */
    @PostMapping("/clean")
    public Map<String, Object> cleanContent(@RequestBody Map<String, Object> request) {
        String content = (String) request.get("content");
        
        if (content == null) {
            return Map.of(
                "error", "Aucun contenu fourni",
                "success", false
            );
        }
        
        String cleaned = bernardService.cleanFordInfluence(content);
        boolean wasInfluenced = !content.equals(cleaned);
        
        return Map.of(
            "original", content,
            "cleaned", cleaned,
            "wasInfluenced", wasInfluenced,
            "message", wasInfluenced ? 
                "Contenu nettoyé de l'influence Ford." : 
                "Aucune influence Ford à nettoyer.",
            "quote", bernardService.getBernardQuote()
        );
    }
} 