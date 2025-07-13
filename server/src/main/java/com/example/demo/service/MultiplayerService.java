package com.example.demo.service;

import com.example.demo.model.GameSession;
import com.example.demo.model.GameSessionStatus;
import com.example.demo.repository.GameSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MultiplayerService {
    
    @Autowired
    private GameSessionRepository gameSessionRepository;
    
    @Autowired
    private GameService gameService;
    
    // Game session management
    
    public GameSession createSession(String sessionName, Integer maxPlayers, String gameMode, String creatorId) {
        String sessionId = generateSessionId();
        
        GameSession session = new GameSession(sessionId, sessionName, maxPlayers, gameMode);
        session.addPlayer(creatorId);
        
        return gameSessionRepository.save(session);
    }
    
    public List<GameSession> getJoinableSessions() {
        return gameSessionRepository.findJoinableSessions(GameSessionStatus.WAITING);
    }
    
    public GameSession joinSession(String sessionId, String playerId) {
        GameSession session = gameSessionRepository.findBySessionId(sessionId)
            .orElseThrow(() -> new RuntimeException("Session not found: " + sessionId));
        
        if (session.isFull()) {
            throw new RuntimeException("Session is full");
        }
        
        if (session.getStatus() != GameSessionStatus.WAITING) {
            throw new RuntimeException("Session is not in waiting state");
        }
        
        session.addPlayer(playerId);
        return gameSessionRepository.save(session);
    }
    
    public GameSession leaveSession(String sessionId, String playerId) {
        GameSession session = gameSessionRepository.findBySessionId(sessionId)
            .orElseThrow(() -> new RuntimeException("Session not found: " + sessionId));
        
        session.removePlayer(playerId);
        
        // If session is empty, delete it
        if (session.getCurrentPlayers() == 0) {
            gameSessionRepository.delete(session);
            return null;
        }
        
        return gameSessionRepository.save(session);
    }
    
    public GameSession startSession(String sessionId, String playerId) {
        GameSession session = gameSessionRepository.findBySessionId(sessionId)
            .orElseThrow(() -> new RuntimeException("Session not found: " + sessionId));
        
        if (!session.getPlayerIds().contains(playerId)) {
            throw new RuntimeException("Player not in session");
        }
        
        if (!session.canStart()) {
            throw new RuntimeException("Session cannot be started");
        }
        
        session.start();
        
        // Initialize game state for this session
        initializeGameState(session);
        
        return gameSessionRepository.save(session);
    }
    
    public GameSession getSession(String sessionId) {
        return gameSessionRepository.findBySessionId(sessionId)
            .orElseThrow(() -> new RuntimeException("Session not found: " + sessionId));
    }
    
    // Game state management
    
    public Map<String, Object> processGameAction(String sessionId, String playerId, String actionType, Map<String, Object> actionData) {
        GameSession session = getSession(sessionId);
        
        if (session.getStatus() != GameSessionStatus.ACTIVE) {
            throw new RuntimeException("Session is not active");
        }
        
        if (!session.getPlayerIds().contains(playerId)) {
            throw new RuntimeException("Player not in session");
        }
        
        // Process different types of actions
        switch (actionType) {
            case "MOVE_HERO":
                return processHeroMove(sessionId, playerId, actionData);
            case "ATTACK":
                return processAttack(sessionId, playerId, actionData);
            case "BUILD":
                return processBuild(sessionId, playerId, actionData);
            case "CAST_SPELL":
                return processCastSpell(sessionId, playerId, actionData);
            case "RECRUIT_UNITS":
                return processRecruitUnits(sessionId, playerId, actionData);
            case "END_TURN":
                return processEndTurn(sessionId, playerId, actionData);
            default:
                throw new RuntimeException("Unknown action type: " + actionType);
        }
    }
    
    public Map<String, Object> getGameState(String sessionId) {
        GameSession session = getSession(sessionId);
        
        // Get game state from GameService
        Map<String, Object> gameState = gameService.getGameState(sessionId);
        
        // Add session-specific information
        gameState.put("sessionId", sessionId);
        gameState.put("players", session.getPlayerIds());
        gameState.put("status", session.getStatus());
        gameState.put("networkMode", session.getNetworkMode());
        gameState.put("zfcEnabled", session.getZfcEnabled());
        
        return gameState;
    }
    
    // Private helper methods
    
    private String generateSessionId() {
        return "session_" + System.currentTimeMillis() + "_" + (int)(Math.random() * 1000);
    }
    
    private void initializeGameState(GameSession session) {
        // Initialize a new game for this session
        Map<String, Object> gameConfig = new HashMap<>();
        gameConfig.put("sessionId", session.getSessionId());
        gameConfig.put("gameMode", session.getGameMode());
        gameConfig.put("players", session.getPlayerIds());
        gameConfig.put("networkMode", session.getNetworkMode());
        gameConfig.put("zfcEnabled", session.getZfcEnabled());
        
        // Create game using GameService
        gameService.createMultiplayerGame(gameConfig);
    }
    
    private Map<String, Object> processHeroMove(String sessionId, String playerId, Map<String, Object> actionData) {
        String heroId = (String) actionData.get("heroId");
        Integer targetX = (Integer) actionData.get("targetX");
        Integer targetY = (Integer) actionData.get("targetY");
        
        // Use existing GameService method but with session context
        return gameService.moveHeroInSession(sessionId, playerId, heroId, targetX, targetY);
    }
    
    private Map<String, Object> processAttack(String sessionId, String playerId, Map<String, Object> actionData) {
        String attackerId = (String) actionData.get("attackerId");
        String targetId = (String) actionData.get("targetId");
        
        return gameService.processAttackInSession(sessionId, playerId, attackerId, targetId);
    }
    
    private Map<String, Object> processBuild(String sessionId, String playerId, Map<String, Object> actionData) {
        String buildingType = (String) actionData.get("buildingType");
        Integer x = (Integer) actionData.get("x");
        Integer y = (Integer) actionData.get("y");
        
        return gameService.processBuildInSession(sessionId, playerId, buildingType, x, y);
    }
    
    private Map<String, Object> processCastSpell(String sessionId, String playerId, Map<String, Object> actionData) {
        String spellId = (String) actionData.get("spellId");
        Integer targetX = (Integer) actionData.get("targetX");
        Integer targetY = (Integer) actionData.get("targetY");
        
        return gameService.processCastSpellInSession(sessionId, playerId, spellId, targetX, targetY);
    }
    
    private Map<String, Object> processRecruitUnits(String sessionId, String playerId, Map<String, Object> actionData) {
        String unitType = (String) actionData.get("unitType");
        Integer quantity = (Integer) actionData.get("quantity");
        
        return gameService.processRecruitUnitsInSession(sessionId, playerId, unitType, quantity);
    }
    
    private Map<String, Object> processEndTurn(String sessionId, String playerId, Map<String, Object> actionData) {
        return gameService.processEndTurnInSession(sessionId, playerId);
    }
} 