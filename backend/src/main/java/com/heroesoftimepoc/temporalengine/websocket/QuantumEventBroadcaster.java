package com.heroesoftimepoc.temporalengine.websocket;

import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.model.Hero;
import com.heroesoftimepoc.temporalengine.model.PsiState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * 🌟 QUANTUM EVENT BROADCASTER
 * ===========================
 * Intelligent broadcasting system that only sends significant events
 * Compatible with all frontends (8000, 5174, 8001, 5175)
 */
@Service
public class QuantumEventBroadcaster {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // 🎯 QUANTUM STATE EVENTS
    public void broadcastPsiStateCreated(Game game, PsiState psiState, String script) {
        Map<String, Object> event = new HashMap<>();
        event.put("type", "PSI_STATE_CREATED");
        event.put("gameId", game.getId());
        event.put("psiId", psiState.getQuantumStateId());
        event.put("expression", psiState.getExpression());
        event.put("script", script);
        event.put("amplitude", psiState.getAmplitude());
        event.put("probability", Math.pow(psiState.getAmplitude(), 2));
        event.put("timestamp", LocalDateTime.now());
        event.put("icon", "🌀");
        event.put("message", String.format("ψ%s created: %s", 
            psiState.getQuantumStateId(), 
            shortenExpression(psiState.getExpression())));

        messagingTemplate.convertAndSend("/topic/quantum", event);
    }

    // ⚡ COLLAPSE EVENTS
    public void broadcastQuantumCollapse(Game game, PsiState psiState, String result) {
        Map<String, Object> event = new HashMap<>();
        event.put("type", "QUANTUM_COLLAPSE");
        event.put("gameId", game.getId());
        event.put("psiId", psiState.getQuantumStateId());
        event.put("result", result);
        event.put("timestamp", LocalDateTime.now());
        event.put("icon", "⚡");
        event.put("message", String.format("ψ%s collapsed → %s", 
            psiState.getQuantumStateId(), result));

        // Add visual effect data
        event.put("effect", Map.of(
            "type", "collapse",
            "color", "#00D4FF",
            "particles", 20,
            "duration", 2000
        ));

        messagingTemplate.convertAndSend("/topic/collapse", event);
    }

    // 🌊 INTERFERENCE EVENTS
    public void broadcastInterference(Game game, String type, double amplification, 
                                    String psi1, String psi2, String result) {
        Map<String, Object> event = new HashMap<>();
        event.put("type", "QUANTUM_INTERFERENCE");
        event.put("gameId", game.getId());
        event.put("interferenceType", type); // CONSTRUCTIVE/DESTRUCTIVE
        event.put("amplification", amplification);
        event.put("psiStates", new String[]{psi1, psi2});
        event.put("result", result);
        event.put("timestamp", LocalDateTime.now());
        
        if ("CONSTRUCTIVE".equals(type)) {
            event.put("icon", "🔥");
            event.put("message", String.format("Constructive interference: %.1fx amplification!", amplification));
            event.put("effect", Map.of(
                "type", "constructive",
                "color", "#FFD700",
                "particles", 30,
                "duration", 3000
            ));
        } else {
            event.put("icon", "❄️");
            event.put("message", String.format("Destructive interference: %.1fx reduction", amplification));
            event.put("effect", Map.of(
                "type", "destructive",
                "color", "#87CEEB",
                "particles", 15,
                "duration", 2000
            ));
        }

        messagingTemplate.convertAndSend("/topic/interference", event);
    }

    // 🕰️ TEMPORAL EVENTS
    public void broadcastTemporalEvent(Game game, String eventType, String description) {
        Map<String, Object> event = new HashMap<>();
        event.put("type", "TEMPORAL_EVENT");
        event.put("gameId", game.getId());
        event.put("eventType", eventType);
        event.put("description", description);
        event.put("currentDay", game.getCurrentTimeline());
        event.put("timestamp", LocalDateTime.now());
        event.put("icon", "⏰");
        event.put("message", description);

        messagingTemplate.convertAndSend("/topic/temporal", event);
    }

    // 🎮 GAME STATE EVENTS
    public void broadcastGameEvent(Game game, String eventType, String message, Object data) {
        Map<String, Object> event = new HashMap<>();
        event.put("type", eventType);
        event.put("gameId", game.getId());
        event.put("message", message);
        event.put("data", data);
        event.put("timestamp", LocalDateTime.now());

        String icon = switch (eventType) {
            case "HERO_CREATED" -> "🦸";
            case "CREATURE_SPAWNED" -> "🐉";
            case "ARTIFACT_USED" -> "✨";
            case "BATTLE_RESULT" -> "⚔️";
            case "TURN_COMPLETED" -> "🔄";
            default -> "🎮";
        };
        event.put("icon", icon);

        messagingTemplate.convertAndSend("/topic/game", event);
    }

    // 🧚‍♀️ CREATURE ABILITY EVENTS
    public void broadcastCreatureAbility(Game game, String creatureId, String abilityName, 
                                       String description, Object effectData) {
        Map<String, Object> event = new HashMap<>();
        event.put("type", "CREATURE_ABILITY");
        event.put("gameId", game.getId());
        event.put("creatureId", creatureId);
        event.put("abilityName", abilityName);
        event.put("description", description);
        event.put("effectData", effectData);
        event.put("timestamp", LocalDateTime.now());
        
        String icon = switch (creatureId) {
            case "quantum_wisp" -> "🧚‍♀️";
            case "probability_spider" -> "🕷️";
            case "quantum_knight" -> "⚔️";
            case "phase_dragon" -> "🐲";
            case "quantum_lich" -> "💀";
            case "quantum_phoenix" -> "🔥";
            default -> "✨";
        };
        event.put("icon", icon);
        event.put("message", String.format("%s used %s", creatureId, abilityName));

        messagingTemplate.convertAndSend("/topic/quantum", event);
    }

    // 🎯 SCRIPT EXECUTION EVENTS (Only for significant scripts)
    public void broadcastScriptExecution(Game game, String script, boolean success, String result) {
        // Only broadcast significant scripts (not basic movements)
        if (!isSignificantScript(script)) {
            return;
        }

        Map<String, Object> event = new HashMap<>();
        event.put("type", "SCRIPT_EXECUTED");
        event.put("gameId", game.getId());
        event.put("script", script);
        event.put("success", success);
        event.put("result", result);
        event.put("timestamp", LocalDateTime.now());
        event.put("icon", success ? "✅" : "❌");
        event.put("message", success ? 
            String.format("Script executed: %s", shortenScript(script)) :
            String.format("Script failed: %s", shortenScript(script)));

        messagingTemplate.convertAndSend("/topic/game", event);
    }

    // 🎲 UTILITY METHODS
    private boolean isSignificantScript(String script) {
        return script.contains("ψ") ||      // Quantum states
               script.contains("†") ||      // Collapses
               script.contains("USE(") ||   // Artifact usage
               script.contains("BATTLE(") ||// Battles
               script.contains("CREATE(") ||// Creation
               script.contains("CAST(");    // Spells
    }

    private String shortenScript(String script) {
        return script.length() > 50 ? script.substring(0, 47) + "..." : script;
    }

    private String shortenExpression(String expression) {
        return expression.length() > 30 ? expression.substring(0, 27) + "..." : expression;
    }

    // 🌟 BROADCAST TO SPECIFIC FRONTEND
    public void broadcastToFrontend(String frontendType, Object event) {
        String topic = switch (frontendType) {
            case "main" -> "/topic/game";           // Port 8000
            case "temporal" -> "/topic/temporal";   // Port 5174
            case "quantum" -> "/topic/quantum";     // Port 8001
            case "visualizer" -> "/topic/collapse"; // Port 5175
            default -> "/topic/game";
        };
        
        messagingTemplate.convertAndSend(topic, event);
    }
}