package com.example.demo.validation;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.regex.Pattern;

@Component
public class InputValidator {

    // Regex patterns for validation
    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9_-]{3,20}$");
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@([A-Za-z0-9.-]+\\.[A-Za-z]{2,})$");
    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
    private static final Pattern ALPHANUMERIC_PATTERN = Pattern.compile("^[a-zA-Z0-9\\s-_.]+$");
    private static final Pattern GAME_ID_PATTERN = Pattern.compile("^[a-zA-Z0-9-_]{1,50}$");
    private static final Pattern HERO_NAME_PATTERN = Pattern.compile("^[a-zA-Z0-9\\s'.-]{1,30}$");

    // Dangerous characters that could be used for injection attacks
    private static final Pattern DANGEROUS_CHARS = Pattern.compile("[<>\"'%;()&+]");

    /**
     * Validate username format
     */
    public boolean isValidUsername(String username) {
        return StringUtils.hasText(username) && 
               USERNAME_PATTERN.matcher(username).matches() &&
               !containsDangerousCharacters(username);
    }

    /**
     * Validate email format
     */
    public boolean isValidEmail(String email) {
        return StringUtils.hasText(email) && 
               EMAIL_PATTERN.matcher(email).matches() &&
               !containsDangerousCharacters(email);
    }

    /**
     * Validate password strength
     */
    public boolean isValidPassword(String password) {
        return StringUtils.hasText(password) && 
               PASSWORD_PATTERN.matcher(password).matches();
    }

    /**
     * Validate game ID format
     */
    public boolean isValidGameId(String gameId) {
        return StringUtils.hasText(gameId) && 
               GAME_ID_PATTERN.matcher(gameId).matches() &&
               !containsDangerousCharacters(gameId);
    }

    /**
     * Validate hero name format
     */
    public boolean isValidHeroName(String heroName) {
        return StringUtils.hasText(heroName) && 
               HERO_NAME_PATTERN.matcher(heroName).matches() &&
               !containsDangerousCharacters(heroName);
    }

    /**
     * Validate alphanumeric input with basic special characters
     */
    public boolean isValidAlphanumeric(String input) {
        return StringUtils.hasText(input) && 
               ALPHANUMERIC_PATTERN.matcher(input).matches() &&
               !containsDangerousCharacters(input);
    }

    /**
     * Check for potentially dangerous characters
     */
    public boolean containsDangerousCharacters(String input) {
        return StringUtils.hasText(input) && DANGEROUS_CHARS.matcher(input).find();
    }

    /**
     * Sanitize input by removing dangerous characters
     */
    public String sanitizeInput(String input) {
        if (!StringUtils.hasText(input)) {
            return input;
        }
        
        // Remove dangerous characters
        String sanitized = DANGEROUS_CHARS.matcher(input).replaceAll("");
        
        // Trim whitespace
        sanitized = sanitized.trim();
        
        // Limit length to prevent DoS
        if (sanitized.length() > 1000) {
            sanitized = sanitized.substring(0, 1000);
        }
        
        return sanitized;
    }

    /**
     * Validate coordinate values
     */
    public boolean isValidCoordinate(int coordinate) {
        return coordinate >= 0 && coordinate <= 1000; // Reasonable map size limit
    }

    /**
     * Validate resource values
     */
    public boolean isValidResourceValue(int value) {
        return value >= 0 && value <= 1000000; // Reasonable resource limit
    }

    /**
     * Validate turn number
     */
    public boolean isValidTurnNumber(int turn) {
        return turn > 0 && turn <= 10000; // Reasonable game length limit
    }

    /**
     * Validate player count
     */
    public boolean isValidPlayerCount(int playerCount) {
        return playerCount >= 1 && playerCount <= 8; // Game supports 1-8 players
    }

    /**
     * Validate item ID format
     */
    public boolean isValidItemId(String itemId) {
        return StringUtils.hasText(itemId) && 
               ALPHANUMERIC_PATTERN.matcher(itemId).matches() &&
               itemId.length() <= 50 &&
               !containsDangerousCharacters(itemId);
    }

    /**
     * Validate building ID format
     */
    public boolean isValidBuildingId(String buildingId) {
        return StringUtils.hasText(buildingId) && 
               ALPHANUMERIC_PATTERN.matcher(buildingId).matches() &&
               buildingId.length() <= 50 &&
               !containsDangerousCharacters(buildingId);
    }

    /**
     * Validate action type
     */
    public boolean isValidActionType(String actionType) {
        if (!StringUtils.hasText(actionType)) {
            return false;
        }
        
        // Only allow specific action types
        return actionType.matches("^(move|attack|collect|build|upgrade|recruit|cast_spell)$");
    }

    /**
     * Validate JSON input size to prevent DoS
     */
    public boolean isValidJsonSize(String json) {
        return StringUtils.hasText(json) && json.length() <= 10000; // 10KB limit
    }

    /**
     * Validate file name for uploads
     */
    public boolean isValidFileName(String fileName) {
        if (!StringUtils.hasText(fileName)) {
            return false;
        }
        
        // Check for path traversal attempts
        if (fileName.contains("..") || fileName.contains("/") || fileName.contains("\\")) {
            return false;
        }
        
        // Check for valid file extension
        String[] allowedExtensions = {".jpg", ".jpeg", ".png", ".gif", ".json", ".txt"};
        boolean hasValidExtension = false;
        for (String ext : allowedExtensions) {
            if (fileName.toLowerCase().endsWith(ext)) {
                hasValidExtension = true;
                break;
            }
        }
        
        return hasValidExtension && fileName.length() <= 255;
    }

    /**
     * Validate session ID format
     */
    public boolean isValidSessionId(String sessionId) {
        return StringUtils.hasText(sessionId) && 
               sessionId.matches("^[a-zA-Z0-9-_]{10,100}$") &&
               !containsDangerousCharacters(sessionId);
    }

    /**
     * Rate limiting validation - check if action frequency is reasonable
     */
    public boolean isValidActionFrequency(long lastActionTime, long currentTime) {
        long timeDiff = currentTime - lastActionTime;
        return timeDiff >= 100; // Minimum 100ms between actions to prevent spam
    }
} 