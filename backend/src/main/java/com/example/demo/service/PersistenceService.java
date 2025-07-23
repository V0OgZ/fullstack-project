package com.example.demo.service;

import com.example.demo.model.GameSave;
import com.example.demo.repository.GameSaveRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Transactional
public class PersistenceService {
    
    @Autowired
    private GameSaveRepository gameSaveRepository;
    
    @Autowired
    private GameService gameService;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    // Track games that need auto-save
    private final Map<String, LocalDateTime> gamesToAutoSave = new ConcurrentHashMap<>();
    
    // Configuration
    private static final int MAX_SAVES_PER_PLAYER = 50;
    private static final int MAX_AUTO_SAVES_PER_GAME = 5;
    private static final long AUTO_SAVE_INTERVAL_MINUTES = 5;
    
    // ======================
    // SAVE OPERATIONS
    // ======================
    
    public GameSave saveGame(String gameId, String playerId, String saveName, String description) {
        try {
            // Get current game state
            Map<String, Object> gameState = gameService.getGame(gameId);
            
            // Serialize to JSON
            String saveData = objectMapper.writeValueAsString(gameState);
            
            // Get turn number
            Integer turnNumber = (Integer) gameState.get("turn");
            if (turnNumber == null) {
                turnNumber = (Integer) gameState.get("currentTurn");
            }
            
            // Check if save with this name already exists
            Optional<GameSave> existingSave = gameSaveRepository.findBySaveNameAndPlayerId(saveName, playerId);
            
            GameSave gameSave;
            if (existingSave.isPresent()) {
                // Update existing save
                gameSave = existingSave.get();
                gameSave.setSaveData(saveData);
                gameSave.setLastPlayedAt(LocalDateTime.now());
                gameSave.setTurnNumber(turnNumber);
                if (description != null) {
                    gameSave.setDescription(description);
                }
            } else {
                // Create new save
                gameSave = new GameSave(saveName, gameId, playerId, saveData, turnNumber);
                gameSave.setDescription(description);
                
                // Check save limit
                Long saveCount = gameSaveRepository.countByPlayerId(playerId);
                if (saveCount >= MAX_SAVES_PER_PLAYER) {
                    throw new RuntimeException("Maximum save limit reached (" + MAX_SAVES_PER_PLAYER + ")");
                }
            }
            
            return gameSaveRepository.save(gameSave);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to save game: " + e.getMessage(), e);
        }
    }
    
    public GameSave autoSaveGame(String gameId) {
        try {
            // Get current game state
            Map<String, Object> gameState = gameService.getGame(gameId);
            
            // Get first player ID (for now, auto-save for first player)
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> players = (List<Map<String, Object>>) gameState.get("players");
            if (players == null || players.isEmpty()) {
                return null;
            }
            
            String playerId = (String) players.get(0).get("id");
            
            // Serialize to JSON
            String saveData = objectMapper.writeValueAsString(gameState);
            
            // Get turn number
            Integer turnNumber = (Integer) gameState.get("turn");
            if (turnNumber == null) {
                turnNumber = (Integer) gameState.get("currentTurn");
            }
            
            // Create auto-save name
            String saveName = "Auto-Save Turn " + turnNumber;
            
            // Create new auto-save
            GameSave gameSave = new GameSave(saveName, gameId, playerId, saveData, turnNumber);
            gameSave.setIsAutoSave(true);
            gameSave.setDescription("Automatic save at turn " + turnNumber);
            
            gameSave = gameSaveRepository.save(gameSave);
            
            // Clean up old auto-saves
            cleanupAutoSaves(gameId);
            
            return gameSave;
            
        } catch (Exception e) {
            System.err.println("Auto-save failed for game " + gameId + ": " + e.getMessage());
            return null;
        }
    }
    
    // ======================
    // LOAD OPERATIONS
    // ======================
    
    public Map<String, Object> loadGame(Long saveId, String playerId) {
        try {
            GameSave gameSave = gameSaveRepository.findById(saveId)
                .orElseThrow(() -> new RuntimeException("Save not found"));
            
            // Verify player owns this save
            if (!gameSave.getPlayerId().equals(playerId)) {
                throw new RuntimeException("Unauthorized: Save belongs to another player");
            }
            
            // Deserialize game state
            @SuppressWarnings("unchecked")
            Map<String, Object> gameState = objectMapper.readValue(gameSave.getSaveData(), Map.class);
            
            // Update last played time
            gameSave.setLastPlayedAt(LocalDateTime.now());
            gameSaveRepository.save(gameSave);
            
            // Replace current game state
            String gameId = gameSave.getGameId();
            gameService.replaceGameState(gameId, gameState);
            
            return gameState;
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to load game: " + e.getMessage(), e);
        }
    }
    
    public Map<String, Object> loadLatestAutoSave(String gameId, String playerId) {
        try {
            List<GameSave> autoSaves = gameSaveRepository.findLatestAutoSave(gameId);
            if (autoSaves.isEmpty()) {
                throw new RuntimeException("No auto-save found for this game");
            }
            
            GameSave latestSave = autoSaves.get(0);
            
            // Verify player has access to this game
            @SuppressWarnings("unchecked")
            Map<String, Object> gameState = objectMapper.readValue(latestSave.getSaveData(), Map.class);
            
            // Update last played time
            latestSave.setLastPlayedAt(LocalDateTime.now());
            gameSaveRepository.save(latestSave);
            
            // Replace current game state
            gameService.replaceGameState(gameId, gameState);
            
            return gameState;
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to load auto-save: " + e.getMessage(), e);
        }
    }
    
    // ======================
    // LIST OPERATIONS
    // ======================
    
    public List<Map<String, Object>> listSaves(String playerId) {
        List<GameSave> saves = gameSaveRepository.findByPlayerId(playerId);
        
        return saves.stream().map(save -> {
            Map<String, Object> saveInfo = new HashMap<>();
            saveInfo.put("id", save.getId());
            saveInfo.put("saveName", save.getSaveName());
            saveInfo.put("gameId", save.getGameId());
            saveInfo.put("turnNumber", save.getTurnNumber());
            saveInfo.put("createdAt", save.getCreatedAt());
            saveInfo.put("lastPlayedAt", save.getLastPlayedAt());
            saveInfo.put("isAutoSave", save.getIsAutoSave());
            saveInfo.put("description", save.getDescription());
            return saveInfo;
        }).toList();
    }
    
    // ======================
    // DELETE OPERATIONS
    // ======================
    
    public void deleteSave(Long saveId, String playerId) {
        GameSave gameSave = gameSaveRepository.findById(saveId)
            .orElseThrow(() -> new RuntimeException("Save not found"));
        
        // Verify player owns this save
        if (!gameSave.getPlayerId().equals(playerId)) {
            throw new RuntimeException("Unauthorized: Save belongs to another player");
        }
        
        gameSaveRepository.delete(gameSave);
    }
    
    // ======================
    // AUTO-SAVE MANAGEMENT
    // ======================
    
    public void markGameForAutoSave(String gameId) {
        gamesToAutoSave.put(gameId, LocalDateTime.now());
    }
    
    public void unmarkGameForAutoSave(String gameId) {
        gamesToAutoSave.remove(gameId);
    }
    
    @Scheduled(fixedDelay = 60000) // Check every minute
    public void autoSaveScheduler() {
        LocalDateTime now = LocalDateTime.now();
        
        gamesToAutoSave.entrySet().forEach(entry -> {
            String gameId = entry.getKey();
            LocalDateTime lastCheck = entry.getValue();
            
            // Auto-save if more than 5 minutes have passed
            if (lastCheck.plusMinutes(AUTO_SAVE_INTERVAL_MINUTES).isBefore(now)) {
                autoSaveGame(gameId);
                gamesToAutoSave.put(gameId, now);
            }
        });
    }
    
    private void cleanupAutoSaves(String gameId) {
        try {
            List<GameSave> autoSaves = gameSaveRepository.findLatestAutoSave(gameId);
            
            if (autoSaves.size() > MAX_AUTO_SAVES_PER_GAME) {
                // Delete older auto-saves
                for (int i = MAX_AUTO_SAVES_PER_GAME; i < autoSaves.size(); i++) {
                    gameSaveRepository.delete(autoSaves.get(i));
                }
            }
        } catch (Exception e) {
            System.err.println("Failed to cleanup auto-saves: " + e.getMessage());
        }
    }
    
    // ======================
    // EXPORT/IMPORT
    // ======================
    
    public String exportSave(Long saveId, String playerId) {
        try {
            GameSave gameSave = gameSaveRepository.findById(saveId)
                .orElseThrow(() -> new RuntimeException("Save not found"));
            
            // Verify player owns this save
            if (!gameSave.getPlayerId().equals(playerId)) {
                throw new RuntimeException("Unauthorized: Save belongs to another player");
            }
            
            // Create export data
            Map<String, Object> exportData = new HashMap<>();
            exportData.put("saveName", gameSave.getSaveName());
            exportData.put("gameId", gameSave.getGameId());
            exportData.put("turnNumber", gameSave.getTurnNumber());
            exportData.put("description", gameSave.getDescription());
            exportData.put("exportDate", LocalDateTime.now());
            exportData.put("gameData", gameSave.getSaveData());
            
            return objectMapper.writeValueAsString(exportData);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to export save: " + e.getMessage(), e);
        }
    }
    
    public GameSave importSave(String exportData, String playerId) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> importData = objectMapper.readValue(exportData, Map.class);
            
            String saveName = (String) importData.get("saveName");
            String gameId = (String) importData.get("gameId");
            Integer turnNumber = (Integer) importData.get("turnNumber");
            String description = (String) importData.get("description");
            String gameData = (String) importData.get("gameData");
            
            // Create imported save with new name
            saveName = saveName + " (Imported)";
            
            GameSave gameSave = new GameSave(saveName, gameId, playerId, gameData, turnNumber);
            gameSave.setDescription(description + " - Imported on " + LocalDateTime.now());
            
            return gameSaveRepository.save(gameSave);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to import save: " + e.getMessage(), e);
        }
    }
} 