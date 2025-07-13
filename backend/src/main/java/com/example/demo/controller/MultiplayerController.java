package com.example.demo.controller;

import com.example.demo.model.GameSession;
import com.example.demo.service.MultiplayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RestController
@RequestMapping("/api/multiplayer")
@CrossOrigin(origins = "http://localhost:3000")
public class MultiplayerController {
    
    @Autowired
    private MultiplayerService multiplayerService;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    // REST Endpoints for game session management
    
    @PostMapping("/sessions")
    public GameSession createSession(@RequestBody Map<String, Object> request) {
        String sessionName = (String) request.get("name");
        Integer maxPlayers = (Integer) request.get("maxPlayers");
        String gameMode = (String) request.get("gameMode");
        String creatorId = (String) request.get("creatorId");
        
        return multiplayerService.createSession(sessionName, maxPlayers, gameMode, creatorId);
    }
    
    @GetMapping("/sessions")
    public List<GameSession> getAvailableSessions() {
        return multiplayerService.getJoinableSessions();
    }
    
    @PostMapping("/sessions/{sessionId}/join")
    public GameSession joinSession(@PathVariable String sessionId, @RequestBody Map<String, String> request) {
        String playerId = request.get("playerId");
        return multiplayerService.joinSession(sessionId, playerId);
    }
    
    @PostMapping("/sessions/{sessionId}/leave")
    public GameSession leaveSession(@PathVariable String sessionId, @RequestBody Map<String, String> request) {
        String playerId = request.get("playerId");
        return multiplayerService.leaveSession(sessionId, playerId);
    }
    
    @PostMapping("/sessions/{sessionId}/start")
    public GameSession startSession(@PathVariable String sessionId, @RequestBody Map<String, String> request) {
        String playerId = request.get("playerId");
        return multiplayerService.startSession(sessionId, playerId);
    }
    
    @GetMapping("/sessions/{sessionId}")
    public GameSession getSession(@PathVariable String sessionId) {
        return multiplayerService.getSession(sessionId);
    }
    
    // WebSocket message handlers for real-time communication
    
    @MessageMapping("/game.join")
    @SendToUser("/queue/reply")
    public Map<String, Object> handleJoin(@Payload Map<String, Object> message) {
        String sessionId = (String) message.get("sessionId");
        String playerId = (String) message.get("playerId");
        
        try {
            GameSession session = multiplayerService.joinSession(sessionId, playerId);
            
            // Broadcast to all players in the session
            messagingTemplate.convertAndSend("/topic/session/" + sessionId, Map.of(
                "type", "PLAYER_JOINED",
                "playerId", playerId,
                "session", session
            ));
            
            return Map.of("status", "success", "session", session);
        } catch (Exception e) {
            return Map.of("status", "error", "message", e.getMessage());
        }
    }
    
    @MessageMapping("/game.leave")
    @SendToUser("/queue/reply")
    public Map<String, Object> handleLeave(@Payload Map<String, Object> message) {
        String sessionId = (String) message.get("sessionId");
        String playerId = (String) message.get("playerId");
        
        try {
            GameSession session = multiplayerService.leaveSession(sessionId, playerId);
            
            // Broadcast to all players in the session
            messagingTemplate.convertAndSend("/topic/session/" + sessionId, Map.of(
                "type", "PLAYER_LEFT",
                "playerId", playerId,
                "session", session
            ));
            
            return Map.of("status", "success", "session", session);
        } catch (Exception e) {
            return Map.of("status", "error", "message", e.getMessage());
        }
    }
    
    @MessageMapping("/game.action")
    public void handleGameAction(@Payload Map<String, Object> message) {
        String sessionId = (String) message.get("sessionId");
        String playerId = (String) message.get("playerId");
        String actionType = (String) message.get("actionType");
        Map<String, Object> actionData = (Map<String, Object>) message.get("actionData");
        
        try {
            // Process the game action
            Map<String, Object> result = multiplayerService.processGameAction(sessionId, playerId, actionType, actionData);
            
            // Broadcast the action result to all players in the session
            messagingTemplate.convertAndSend("/topic/session/" + sessionId, Map.of(
                "type", "GAME_ACTION",
                "playerId", playerId,
                "actionType", actionType,
                "actionData", actionData,
                "result", result
            ));
            
        } catch (Exception e) {
            // Send error back to the specific player
            messagingTemplate.convertAndSendToUser(playerId, "/queue/error", Map.of(
                "type", "ACTION_ERROR",
                "message", e.getMessage()
            ));
        }
    }
    
    @MessageMapping("/game.sync")
    public void handleSync(@Payload Map<String, Object> message) {
        String sessionId = (String) message.get("sessionId");
        String playerId = (String) message.get("playerId");
        
        try {
            // Get current game state
            Map<String, Object> gameState = multiplayerService.getGameState(sessionId);
            
            // Send sync response to the requesting player
            messagingTemplate.convertAndSendToUser(playerId, "/queue/sync", Map.of(
                "type", "SYNC_RESPONSE",
                "sessionId", sessionId,
                "gameState", gameState
            ));
            
        } catch (Exception e) {
            messagingTemplate.convertAndSendToUser(playerId, "/queue/error", Map.of(
                "type", "SYNC_ERROR",
                "message", e.getMessage()
            ));
        }
    }
    
    @MessageMapping("/game.chat")
    public void handleChat(@Payload Map<String, Object> message) {
        String sessionId = (String) message.get("sessionId");
        String playerId = (String) message.get("playerId");
        String chatMessage = (String) message.get("message");
        
        // Broadcast chat message to all players in the session
        messagingTemplate.convertAndSend("/topic/session/" + sessionId, Map.of(
            "type", "CHAT_MESSAGE",
            "playerId", playerId,
            "message", chatMessage,
            "timestamp", System.currentTimeMillis()
        ));
    }
} 