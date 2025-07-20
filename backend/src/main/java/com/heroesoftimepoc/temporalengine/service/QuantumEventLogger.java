package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.model.PsiState;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * 📡 QUANTUM EVENT LOGGER - HEROES OF TIME
 * =======================================
 * Logs quantum and temporal events for debugging and monitoring
 * Simple replacement for WebSocket broadcasting
 */
@Service
public class QuantumEventLogger {

    private static final Logger logger = LoggerFactory.getLogger(QuantumEventLogger.class);

    /**
     * 🌊 LOG QUANTUM STATE EVENT
     */
    public void logQuantumStateEvent(Game game, PsiState psiState, String eventType, String message) {
        logger.info("🌊 QUANTUM EVENT [{}] - Game: {} | State: {} | Message: {}", 
            eventType, game.getId(), psiState.getPsiId(), message);
    }

    /**
     * 🎮 LOG GAME EVENT
     */
    public void logGameEvent(Game game, String eventType, String message, Object data) {
        logger.info("🎮 GAME EVENT [{}] - Game: {} | Message: {} | Data: {}", 
            eventType, game.getId(), message, data != null ? data.toString() : "null");
    }

    /**
     * 🐉 LOG CREATURE EVENT
     */
    public void logCreatureEvent(Game game, String creatureId, String eventType, String message, Map<String, Object> data) {
        logger.info("🐉 CREATURE EVENT [{}] - Game: {} | Creature: {} | Message: {} | Data: {}", 
            eventType, game.getId(), creatureId, message, data);
    }

    /**
     * ⚡ LOG TEMPORAL EVENT
     */
    public void logTemporalEvent(Game game, String eventType, String message, Map<String, Object> data) {
        logger.info("⚡ TEMPORAL EVENT [{}] - Game: {} | Message: {} | Data: {}", 
            eventType, game.getId(), message, data);
    }

    /**
     * 🔥 LOG INTERFERENCE EVENT
     */
    public void logInterferenceEvent(Game game, String eventType, String message, Map<String, Object> data) {
        logger.info("🔥 INTERFERENCE EVENT [{}] - Game: {} | Message: {} | Data: {}", 
            eventType, game.getId(), message, data);
    }
}