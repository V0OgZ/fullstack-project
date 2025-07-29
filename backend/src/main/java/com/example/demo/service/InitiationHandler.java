package com.example.demo.service;

import com.example.demo.model.InitiationRequest;
import com.example.demo.model.InitiationResult;

/**
 * 🔗 INITIATION HANDLER - Chain of Responsibility Interface
 * ========================================================
 * 
 * Interface pour le pattern Chain of Responsibility (COR).
 * Permet de chaîner les étapes d'initiation : Marie → Sphinx → École
 * 
 * Chaque handler peut :
 * - Traiter la requête
 * - La passer au suivant
 * - Ou arrêter la chaîne
 */
public interface InitiationHandler {
    
    /**
     * Traite une demande d'initiation
     * @param request La demande d'initiation
     * @return Le résultat du traitement
     */
    InitiationResult handleInitiation(InitiationRequest request);
    
    /**
     * Configure le prochain handler dans la chaîne
     * @param next Le prochain handler
     */
    void setNext(InitiationHandler next);
} 