package com.example.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Map;
import java.util.HashMap;

/**
 * 📤 INITIATION RESULT - Résultat d'une étape d'initiation
 * ========================================================
 * 
 * Retourné par chaque handler de la chaîne :
 * Marie, Sphinx, École
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InitiationResult {
    
    private boolean success;
    private String message;
    private String status;
    private String nextStep;
    private Map<String, Object> additionalData;
    
    /**
     * Constructeur simple
     */
    public InitiationResult(boolean success, String message, String status) {
        this.success = success;
        this.message = message;
        this.status = status;
        this.additionalData = new HashMap<>();
    }
    
    /**
     * Ajoute des données supplémentaires
     */
    public InitiationResult withData(String key, Object value) {
        if (this.additionalData == null) {
            this.additionalData = new HashMap<>();
        }
        this.additionalData.put(key, value);
        return this;
    }
    
    /**
     * Définit la prochaine étape
     */
    public InitiationResult withNextStep(String nextStep) {
        this.nextStep = nextStep;
        return this;
    }
    
    /**
     * Crée un résultat de succès
     */
    public static InitiationResult success(String message, String status) {
        return new InitiationResult(true, message, status);
    }
    
    /**
     * Crée un résultat d'échec
     */
    public static InitiationResult failure(String message, String status) {
        return new InitiationResult(false, message, status);
    }
} 