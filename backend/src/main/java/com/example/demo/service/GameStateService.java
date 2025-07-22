package com.example.demo.service;

import com.example.demo.model.GameState;
import com.example.demo.repository.GameStateRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Arrays;

@Service
public class GameStateService {
    
    @Autowired
    private GameStateRepository gameStateRepository;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    // ======================
    // CORE STATE MANAGEMENT
    // ======================
    
    public GameState getOrCreateGameState(String gameId) {
        Optional<GameState> existingState = gameStateRepository.findByGameId(gameId);
        if (existingState.isPresent()) {
            return existingState.get();
        }
        
        // Create new game state with proper initialization
        GameState newState = new GameState(gameId);
        newState.setCurrentPlayerId("player1"); // Initialize with player1 as the starting player
        newState.setTurnStartTime(LocalDateTime.now());
        return gameStateRepository.save(newState);
    }
    
    public GameState updateGameState(GameState gameState) {
        gameState.markUpdated();
        return gameStateRepository.save(gameState);
    }
    
    public void deleteGameState(String gameId) {
        gameStateRepository.deleteById(gameId);
    }
    
    // ======================
    // TURN MANAGEMENT
    // ======================
    
    public GameState startPlayerTurn(String gameId, String playerId) {
        GameState state = getOrCreateGameState(gameId);
        state.setCurrentPlayerId(playerId);
        state.setTurnStartTime(LocalDateTime.now());
        state.markAction();
        return updateGameState(state);
    }
    
    public GameState endPlayerTurn(String gameId, String currentPlayerId) {
        GameState state = getOrCreateGameState(gameId);
        
        // Trouver le joueur suivant dans l'ordre
        List<String> players = Arrays.asList("player1", "player2"); // Ordre fixe pour 2 joueurs
        int currentIndex = players.indexOf(currentPlayerId);
        
        if (currentIndex == -1) {
            throw new RuntimeException("Invalid player ID: " + currentPlayerId);
        }
        
        int nextIndex = (currentIndex + 1) % players.size();
        String nextPlayerId = players.get(nextIndex);
        
        // Mettre à jour l'état
        state.setCurrentPlayerId(nextPlayerId);
        state.setTurnStartTime(LocalDateTime.now());
        
        // Incrémenter le tour si on revient au premier joueur
        if (nextIndex == 0) {
            state.setCurrentTurn(state.getCurrentTurn() + 1);
            System.out.println("✅ Turn incremented to: " + state.getCurrentTurn());
        }
        
        System.out.println("🔄 Player turn changed from " + currentPlayerId + " to " + nextPlayerId);
        
        return updateGameState(state);
    }
    
    public boolean isPlayerTurn(String gameId, String playerId) {
        GameState state = getOrCreateGameState(gameId);
        return state.isPlayerTurn(playerId);
    }
    
    // ======================
    // HERO MANAGEMENT - CRITICAL GAME STATE
    // ======================
    
    public GameState selectHero(String gameId, String playerId, String heroId) {
        GameState state = getOrCreateGameState(gameId);
        try {
            Map<String, Object> selectedHeroesMap = parseJsonToMap(state.getSelectedHeroes());
            Map<String, String> selectedHeroes = new HashMap<>();
            for (Map.Entry<String, Object> entry : selectedHeroesMap.entrySet()) {
                selectedHeroes.put(entry.getKey(), String.valueOf(entry.getValue()));
            }
            selectedHeroes.put(playerId, heroId);
            state.setSelectedHeroes(objectMapper.writeValueAsString(selectedHeroes));
            state.markAction();
            return updateGameState(state);
        } catch (Exception e) {
            throw new RuntimeException("Failed to select hero: " + e.getMessage());
        }
    }
    
    public String getSelectedHero(String gameId, String playerId) {
        GameState state = getOrCreateGameState(gameId);
        try {
            Map<String, Object> selectedHeroesMap = parseJsonToMap(state.getSelectedHeroes());
            Object heroId = selectedHeroesMap.get(playerId);
            return heroId != null ? String.valueOf(heroId) : null;
        } catch (Exception e) {
            return null;
        }
    }
    
    public GameState updateHeroPosition(String gameId, String heroId, int x, int y) {
        GameState state = getOrCreateGameState(gameId);
        try {
            Map<String, Object> heroPositionsMap = parseJsonToMap(state.getHeroPositions());
            Map<String, Object> heroPositions = new HashMap<>();
            for (Map.Entry<String, Object> entry : heroPositionsMap.entrySet()) {
                heroPositions.put(entry.getKey(), entry.getValue());
            }
            
            Map<String, Integer> position = new HashMap<>();
            position.put("x", x);
            position.put("y", y);
            heroPositions.put(heroId, position);
            
            state.setHeroPositions(objectMapper.writeValueAsString(heroPositions));
            state.markAction();
            return updateGameState(state);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update hero position: " + e.getMessage());
        }
    }
    
    // ======================
    // RESOURCE MANAGEMENT - CRITICAL GAME STATE
    // ======================
    
    public GameState updatePlayerResources(String gameId, String playerId, String resourceType, int amount) {
        GameState state = getOrCreateGameState(gameId);
        try {
            Map<String, Object> resourcesMap = parseJsonToMap(state.getPlayerResources());
            Map<String, Object> playerResources = (Map<String, Object>) resourcesMap.getOrDefault(playerId, new HashMap<>());
            
            int currentAmount = playerResources.get(resourceType) != null ? 
                Integer.parseInt(String.valueOf(playerResources.get(resourceType))) : 0;
            playerResources.put(resourceType, currentAmount + amount);
            resourcesMap.put(playerId, playerResources);
            
            state.setPlayerResources(objectMapper.writeValueAsString(resourcesMap));
            state.markAction();
            return updateGameState(state);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update player resources: " + e.getMessage());
        }
    }
    
    public Map<String, Integer> getPlayerResources(String gameId, String playerId) {
        GameState state = getOrCreateGameState(gameId);
        try {
            Map<String, Object> resourcesMap = parseJsonToMap(state.getPlayerResources());
            Map<String, Object> playerResources = (Map<String, Object>) resourcesMap.get(playerId);
            
            if (playerResources == null) {
                return new HashMap<>();
            }
            
            Map<String, Integer> resources = new HashMap<>();
            for (Map.Entry<String, Object> entry : playerResources.entrySet()) {
                resources.put(entry.getKey(), Integer.parseInt(String.valueOf(entry.getValue())));
            }
            return resources;
        } catch (Exception e) {
            return new HashMap<>();
        }
    }
    
    // ======================
    // INVENTORY MANAGEMENT
    // ======================
    
    public GameState addItemToPlayerInventory(String gameId, String playerId, String itemId) {
        GameState state = getOrCreateGameState(gameId);
        try {
            Map<String, Object> inventoriesMap = parseJsonToMap(state.getPlayerInventories());
            Map<String, List<String>> inventories = new HashMap<>();
            for (Map.Entry<String, Object> entry : inventoriesMap.entrySet()) {
                List<String> playerInventory = new java.util.ArrayList<>();
                if (entry.getValue() instanceof List) {
                    List<?> rawList = (List<?>) entry.getValue();
                    for (Object item : rawList) {
                        playerInventory.add(String.valueOf(item));
                    }
                }
                inventories.put(entry.getKey(), playerInventory);
            }
            List<String> playerInventory = inventories.getOrDefault(playerId, new java.util.ArrayList<>());
            playerInventory.add(itemId);
            inventories.put(playerId, playerInventory);
            state.setPlayerInventories(objectMapper.writeValueAsString(inventories));
            state.markAction();
            return updateGameState(state);
        } catch (Exception e) {
            throw new RuntimeException("Failed to add item to inventory: " + e.getMessage());
        }
    }
    
    public GameState equipItem(String gameId, String playerId, String heroId, String slot, String itemId) {
        GameState state = getOrCreateGameState(gameId);
        try {
            Map<String, Object> equippedItems = parseJsonToMap(state.getEquippedItems());
            Map<String, Object> playerEquipped = (Map<String, Object>) equippedItems.getOrDefault(playerId, new HashMap<>());
            Map<String, String> heroEquipped = (Map<String, String>) playerEquipped.getOrDefault(heroId, new HashMap<>());
            heroEquipped.put(slot, itemId);
            playerEquipped.put(heroId, heroEquipped);
            equippedItems.put(playerId, playerEquipped);
            state.setEquippedItems(objectMapper.writeValueAsString(equippedItems));
            state.markAction();
            return updateGameState(state);
        } catch (Exception e) {
            throw new RuntimeException("Failed to equip item: " + e.getMessage());
        }
    }
    
    // ======================
    // PENDING ACTIONS
    // ======================
    
    public GameState addPendingAction(String gameId, Map<String, Object> action) {
        GameState state = getOrCreateGameState(gameId);
        try {
            List<Map<String, Object>> actions = parseJsonToList(state.getPendingActions());
            actions.add(action);
            state.setPendingActions(objectMapper.writeValueAsString(actions));
            state.markAction();
            return updateGameState(state);
        } catch (Exception e) {
            throw new RuntimeException("Failed to add pending action: " + e.getMessage());
        }
    }
    
    public GameState removePendingAction(String gameId, String actionId) {
        GameState state = getOrCreateGameState(gameId);
        try {
            List<Map<String, Object>> actions = parseJsonToList(state.getPendingActions());
            actions.removeIf(action -> actionId.equals(action.get("id")));
            state.setPendingActions(objectMapper.writeValueAsString(actions));
            state.markAction();
            return updateGameState(state);
        } catch (Exception e) {
            throw new RuntimeException("Failed to remove pending action: " + e.getMessage());
        }
    }
    
    // ======================
    // UTILITY METHODS
    // ======================
    
    private Map<String, Object> parseJsonToMap(String json) {
        try {
            if (json == null || json.trim().isEmpty() || "null".equals(json)) {
                return new HashMap<>();
            }
            return objectMapper.readValue(json, Map.class);
        } catch (Exception e) {
            return new HashMap<>();
        }
    }
    
    private List<Map<String, Object>> parseJsonToList(String json) {
        try {
            if (json == null || json.trim().isEmpty() || "null".equals(json)) {
                return new java.util.ArrayList<>();
            }
            return objectMapper.readValue(json, List.class);
        } catch (Exception e) {
            return new java.util.ArrayList<>();
        }
    }
    
    // ======================
    // GAME STATUS METHODS
    // ======================
    
    public List<GameState> getActiveGames() {
        return gameStateRepository.findActiveGames();
    }
    
    public List<GameState> getPlayerActiveGames(String playerId) {
        return gameStateRepository.findActiveGamesByPlayer(playerId);
    }
    
    public void cleanupOldGames() {
        LocalDateTime cutoffTime = LocalDateTime.now().minusDays(7);
        gameStateRepository.deleteOldFinishedGames(cutoffTime);
    }
} 