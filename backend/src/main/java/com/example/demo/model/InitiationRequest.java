package com.example.demo.model;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * 📝 INITIATION REQUEST - Modèle de données pour la chaîne d'initiation
 * ====================================================================
 * 
 * Contient toutes les données nécessaires pour le flux :
 * Marie → Sphinx → École de Magie
 * 
 * Utilisé par le pattern Chain of Responsibility
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InitiationRequest {
    
    // Identifiants
    private String playerId;
    private String playerName;
    private String sessionId;
    
    // État Marie
    private boolean marieValidated = false;
    private LocalDateTime marieValidationTime;
    private String currentQuestion;
    private String response;
    
    // État Sphinx
    private boolean sphinxValidated = false;
    private LocalDateTime sphinxValidationTime;
    private String sphinxQuestion;
    private String sphinxAnswer;
    private String sphinxCertificationLevel;
    
    // État École
    private boolean schoolEnrolled = false;
    private LocalDateTime enrollmentTime;
    private int currentLevel = 0;
    private String assignedGuide;
    
    // Métadonnées
    private LocalDateTime initiationStartTime;
    private String currentPhase = "MARIE"; // MARIE, SPHINX, SCHOOL
    private int attemptCount = 0;
    
    // Données additionnelles
    private String userAgent;
    private String ipAddress;
    private boolean isBot = false;
    
    /**
     * Constructeur simple pour démarrer
     */
    public InitiationRequest(String playerId, String playerName) {
        this.playerId = playerId;
        this.playerName = playerName;
        this.initiationStartTime = LocalDateTime.now();
        this.sessionId = generateSessionId();
    }
    
    /**
     * Génère un ID de session unique
     */
    private String generateSessionId() {
        return "INIT-" + playerId + "-" + System.currentTimeMillis();
    }
    
    /**
     * Vérifie si le joueur peut passer au Sphinx
     */
    public boolean canProceedToSphinx() {
        return marieValidated && !sphinxValidated;
    }
    
    /**
     * Vérifie si le joueur peut s'inscrire à l'école
     */
    public boolean canEnrollInSchool() {
        return marieValidated && sphinxValidated && !schoolEnrolled;
    }
    
    /**
     * Incrémente le compteur de tentatives
     */
    public void incrementAttempts() {
        this.attemptCount++;
    }
    
    /**
     * Met à jour la phase actuelle
     */
    public void updatePhase(String newPhase) {
        this.currentPhase = newPhase;
    }
} 