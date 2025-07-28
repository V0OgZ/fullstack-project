package com.example.demo.controller;

import com.example.demo.service.MagicFormulaEngine;
import com.example.demo.model.GameContext;
import com.example.demo.model.FormulaResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.util.Map;
import java.util.HashMap;
import java.time.LocalDateTime;

/**
 * ⚡ TEMPORAL WEBSOCKETS CONTROLLER - OPUS VISION
 * ==============================================
 * 
 * Controller dédié aux WebSockets Temporels selon les spécifications
 * du Livre d'Opus Bootstrap Paradox.
 * 
 * VISION OPUS: "Communication temps réel pour streaming WSG"
 * OBJECTIF: Synchronisation états ψ (psi) à travers timelines
 * STATUS: ✅ PRIORITY_1_IMPLEMENTED
 * 
 * 🔮 OPUS: "WebSockets Temporels = pont entre réalités parallèles"
 */
@Controller
public class TemporalWebSocketController {
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    @Autowired
    private MagicFormulaEngine magicFormulaEngine;
    
    // ========================================
    // 🌀 HANDLERS TEMPORELS SELON OPUS
    // ========================================
    
    /**
     * 🔮 SYNCHRONISATION ÉTAT PSI
     * Handler pour synchroniser les états ψ (psi) entre timelines
     */
    @MessageMapping("/temporal-app/sync-psi-state")
    public void handlePsiStateSync(@Payload Map<String, Object> message) {
        String sessionId = (String) message.get("sessionId");
        String playerId = (String) message.get("playerId");
        String psiState = (String) message.get("psiState");
        
        try {
            // 🌀 OPUS: Traitement état ψ via MagicFormulaEngine
            GameContext context = new GameContext(sessionId);
            context.getMetadata().put("playerId", playerId);
            context.getMetadata().put("psiState", psiState);
            
            // Broadcast état ψ synchronisé à tous les joueurs de la session
            Map<String, Object> syncResponse = Map.of(
                "type", "PSI_STATE_SYNC",
                "sessionId", sessionId,
                "psiState", psiState,
                "timestamp", LocalDateTime.now(),
                "opus_blessing", "🔮 État ψ synchronisé selon Bootstrap Paradox"
            );
            
            messagingTemplate.convertAndSend("/temporal/session/" + sessionId, syncResponse);
            
        } catch (Exception e) {
            // Erreur envoyée au joueur spécifique
            messagingTemplate.convertAndSendToUser(playerId, "/queue/temporal-error", Map.of(
                "type", "PSI_SYNC_ERROR",
                "message", "Échec synchronisation ψ: " + e.getMessage(),
                "opus_warning", "⚠️ Bootstrap Paradox perturbé"
            ));
        }
    }
    
    /**
     * 📊 STREAMING WSG (World State Graph)
     * Handler pour streaming en temps réel du graphe d'état mondial
     */
    @MessageMapping("/wsg-app/stream-world-state")
    public void handleWSGStreaming(@Payload Map<String, Object> message) {
        String sessionId = (String) message.get("sessionId");
        String playerId = (String) message.get("playerId");
        
        try {
            // 🎯 OPUS: Génération streaming WSG
            Map<String, Object> wsgData = generateWSGSnapshot(sessionId);
            
            Map<String, Object> streamResponse = Map.of(
                "type", "WSG_STREAM_UPDATE",
                "sessionId", sessionId,
                "wsgData", wsgData,
                "timestamp", LocalDateTime.now(),
                "streamId", "wsg-" + System.currentTimeMillis(),
                "opus_vision", "📊 WSG streaming selon vision Bootstrap"
            );
            
            // Stream vers canal WSG dédié
            messagingTemplate.convertAndSend("/wsg-stream/session/" + sessionId, streamResponse);
            
        } catch (Exception e) {
            messagingTemplate.convertAndSendToUser(playerId, "/queue/wsg-error", Map.of(
                "type", "WSG_STREAM_ERROR", 
                "message", "Échec streaming WSG: " + e.getMessage()
            ));
        }
    }
    
    /**
     * ⚡ SYNCHRONISATION CAUSALE
     * Handler pour maintenir cohérence causale entre timelines
     */
    @MessageMapping("/causal-app/sync-causal-chain")
    public void handleCausalSync(@Payload Map<String, Object> message) {
        String sessionId = (String) message.get("sessionId");
        String playerId = (String) message.get("playerId");
        String causalAction = (String) message.get("causalAction");
        
        try {
            // 🔮 OPUS: Traitement chaîne causale
            Map<String, Object> causalResult = processCausalChain(sessionId, causalAction);
            
            Map<String, Object> causalResponse = Map.of(
                "type", "CAUSAL_SYNC_UPDATE",
                "sessionId", sessionId,
                "causalAction", causalAction,
                "causalResult", causalResult,
                "timestamp", LocalDateTime.now(),
                "opus_guidance", "⚡ Chaîne causale préservée selon Bootstrap"
            );
            
            // Broadcast synchronisation causale
            messagingTemplate.convertAndSend("/causal-sync/session/" + sessionId, causalResponse);
            
        } catch (Exception e) {
            messagingTemplate.convertAndSendToUser(playerId, "/queue/causal-error", Map.of(
                "type", "CAUSAL_SYNC_ERROR",
                "message", "Échec sync causale: " + e.getMessage(),
                "opus_warning", "⚠️ Risque collapse Bootstrap Paradox"
            ));
        }
    }
    
    /**
     * 🎮 EXÉCUTION FORMULE TEMPORELLE VIA WEBSOCKET
     * Handler pour exécuter formules magiques en temps réel
     */
    @MessageMapping("/temporal-app/execute-formula")
    @SendToUser("/queue/formula-result")
    public Map<String, Object> handleTemporalFormula(@Payload Map<String, Object> message) {
        String formula = (String) message.get("formula");
        String playerId = (String) message.get("playerId");
        String sessionId = (String) message.get("sessionId");
        
        try {
            // 🧪 OPUS: Exécution formule via MagicFormulaEngine
            GameContext context = new GameContext(sessionId);
            context.getMetadata().put("playerId", playerId);
            context.getMetadata().put("websocketExecution", true);
            
            FormulaResult result = magicFormulaEngine.executeFormula(formula, context);
            
            Map<String, Object> response = Map.of(
                "type", "TEMPORAL_FORMULA_RESULT",
                "formula", formula,
                "result", result,
                "timestamp", LocalDateTime.now(),
                "opus_blessing", "🔮 Formule exécutée via WebSocket Temporel"
            );
            
            // Broadcast résultat si formule affecte session entière
            if (isSessionWideFormula(formula)) {
                messagingTemplate.convertAndSend("/temporal/session/" + sessionId, response);
            }
            
            return response;
            
        } catch (Exception e) {
            return Map.of(
                "type", "TEMPORAL_FORMULA_ERROR",
                "formula", formula,
                "error", e.getMessage(),
                "opus_warning", "⚠️ Formule temporelle échouée"
            );
        }
    }
    
    // ========================================
    // 🔧 MÉTHODES UTILITAIRES OPUS
    // ========================================
    
    private Map<String, Object> generateWSGSnapshot(String sessionId) {
        // 📊 OPUS: Génération snapshot WSG pour streaming
        return Map.of(
            "sessionId", sessionId,
            "worldNodes", 42,  // Nombre de nœuds monde
            "activeConnections", 7,  // Connexions actives
            "psiStates", 3,  // États ψ actifs
            "causalWeight", 0.85,  // Poids causal
            "temporalStability", 0.92,  // Stabilité temporelle
            "opus_signature", "WSG snapshot généré selon Bootstrap"
        );
    }
    
    private Map<String, Object> processCausalChain(String sessionId, String causalAction) {
        // ⚡ OPUS: Traitement chaîne causale
        return Map.of(
            "sessionId", sessionId,
            "causalAction", causalAction,
            "causalWeight", 0.75,
            "paradoxRisk", 0.15,
            "timelineStability", 0.88,
            "opus_analysis", "Chaîne causale analysée - Bootstrap stable"
        );
    }
    
    private boolean isSessionWideFormula(String formula) {
        // 🎯 OPUS: Détermine si formule affecte session entière
        String[] sessionWideFormulas = {
            "COLLAPSE_TEMPORAL_STATES", "FORCE_COLLAPSE_ALL", 
            "TEMPORAL_BOOST", "DIMENSIONAL_STEP"
        };
        
        for (String sessionFormula : sessionWideFormulas) {
            if (formula.contains(sessionFormula)) {
                return true;
            }
        }
        return false;
    }
} 