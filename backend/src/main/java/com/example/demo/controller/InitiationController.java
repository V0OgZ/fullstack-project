package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.InitiationRequest;
import com.example.demo.model.InitiationResult;
import com.example.demo.model.InitiationStatus;
import com.example.demo.service.marie.MarieProtocolService;
import com.example.demo.service.InitiationOrchestrator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Map;

/**
 * 🎯 INITIATION CONTROLLER - API REST pour le parcours initiatique
 * ================================================================
 * 
 * Endpoints pour le flux complet :
 * Marie (anti-DDOS) → Sphinx (validation) → École (formation)
 * 
 * Utilise le pattern Chain of Responsibility pour orchestrer le flux
 */
@RestController
@RequestMapping("/api/initiation")
@CrossOrigin(origins = "*")
public class InitiationController {
    
    private static final Logger logger = LoggerFactory.getLogger(InitiationController.class);
    
    @Autowired
    private InitiationOrchestrator orchestrator;
    
    @Autowired
    private MarieProtocolService marieService;
    
    /**
     * 🌟 DÉMARRER LE PROTOCOL MARIE
     * Point d'entrée principal de l'initiation
     */
    @PostMapping("/start-marie-protocol")
    public ResponseEntity<InitiationResult> startMarieProtocol(@RequestBody InitiationRequest request) {
        logger.info("🚀 Démarrage Protocol Marie pour: {}", request.getPlayerId());
        
        try {
            // Validation basique
            if (request.getPlayerId() == null || request.getPlayerId().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    new InitiationResult(false, "Player ID requis", "INVALID_REQUEST")
                );
            }
            
            // Lancer la chaîne d'initiation
            InitiationResult result = orchestrator.startInitiation(request);
            
            // Log du résultat
            logger.info("📊 Résultat initiation: {} - {}", 
                result.isSuccess() ? "SUCCESS" : "FAILED", 
                result.getStatus()
            );
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors de l'initiation", e);
            return ResponseEntity.internalServerError().body(
                new InitiationResult(false, "Erreur serveur", "SERVER_ERROR")
            );
        }
    }
    
    /**
     * 📊 OBTENIR LE STATUT MARIE
     * Vérifie où en est le joueur dans le processus Marie
     */
    @GetMapping("/marie-status/{playerId}")
    public ResponseEntity<InitiationStatus> getMarieStatus(@PathVariable String playerId) {
        logger.debug("📊 Demande de statut Marie pour: {}", playerId);
        
        try {
            InitiationStatus status = orchestrator.getPlayerStatus(playerId);
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            logger.error("❌ Erreur récupération statut", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * 💬 SOUMETTRE RÉPONSE À MARIE
     * Pour répondre aux questions émotionnelles
     */
    @PostMapping("/marie-response")
    public ResponseEntity<InitiationResult> submitMarieResponse(@RequestBody InitiationRequest request) {
        logger.info("💬 Réponse soumise à Marie par: {}", request.getPlayerId());
        
        try {
            // Marie traite la réponse et passe potentiellement au Sphinx
            InitiationResult result = marieService.handleInitiation(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            logger.error("❌ Erreur traitement réponse Marie", e);
            return ResponseEntity.internalServerError().body(
                new InitiationResult(false, "Erreur traitement", "PROCESSING_ERROR")
            );
        }
    }
    
    /**
     * 🦁 SOUMETTRE RÉPONSE AU SPHINX
     * Pour les épreuves quantiques
     */
    @PostMapping("/sphinx/submit-answer")
    public ResponseEntity<InitiationResult> submitSphinxAnswer(@RequestBody InitiationRequest request) {
        logger.info("🦁 Réponse soumise au Sphinx par: {}", request.getPlayerId());
        
        try {
            // Vérifier que Marie a validé d'abord
            if (!request.isMarieValidated()) {
                return ResponseEntity.badRequest().body(
                    new InitiationResult(false, "Tu dois d'abord passer par Marie", "MARIE_NOT_VALIDATED")
                );
            }
            
            InitiationResult result = orchestrator.handleSphinxResponse(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            logger.error("❌ Erreur traitement réponse Sphinx", e);
            return ResponseEntity.internalServerError().body(
                new InitiationResult(false, "Le Sphinx est troublé", "SPHINX_ERROR")
            );
        }
    }
    
    /**
     * 🏅 OBTENIR CERTIFICATION SPHINX
     * Récupère le niveau de certification obtenu
     */
    @GetMapping("/sphinx/certification/{playerId}")
    public ResponseEntity<Map<String, Object>> getSphinxCertification(@PathVariable String playerId) {
        logger.debug("🏅 Demande certification Sphinx pour: {}", playerId);
        
        try {
            Map<String, Object> certification = orchestrator.getSphinxCertification(playerId);
            return ResponseEntity.ok(certification);
        } catch (Exception e) {
            logger.error("❌ Erreur récupération certification", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * 🎓 S'INSCRIRE À L'ÉCOLE DE MAGIE
     * Après validation Marie + Sphinx
     */
    @PostMapping("/school/enroll")
    public ResponseEntity<InitiationResult> enrollInMagicSchool(@RequestBody InitiationRequest request) {
        logger.info("🎓 Demande inscription école pour: {}", request.getPlayerId());
        
        try {
            // Vérifier les prérequis
            if (!request.isMarieValidated() || !request.isSphinxValidated()) {
                return ResponseEntity.badRequest().body(
                    new InitiationResult(false, "Tu dois d'abord réussir Marie et Sphinx", "PREREQUISITES_NOT_MET")
                );
            }
            
            InitiationResult result = orchestrator.enrollInSchool(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            logger.error("❌ Erreur inscription école", e);
            return ResponseEntity.internalServerError().body(
                new InitiationResult(false, "Erreur inscription", "ENROLLMENT_ERROR")
            );
        }
    }
    
    /**
     * 📈 OBTENIR PROGRESSION ÉCOLE
     * Suivi des quêtes et niveaux
     */
    @GetMapping("/school/progress/{playerId}")
    public ResponseEntity<Map<String, Object>> getSchoolProgress(@PathVariable String playerId) {
        logger.debug("📈 Demande progression école pour: {}", playerId);
        
        try {
            Map<String, Object> progress = orchestrator.getSchoolProgress(playerId);
            return ResponseEntity.ok(progress);
        } catch (Exception e) {
            logger.error("❌ Erreur récupération progression", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * 📊 STATISTIQUES GLOBALES
     * Vue d'ensemble du système d'initiation
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getInitiationStatistics() {
        logger.debug("📊 Demande statistiques globales");
        
        try {
            Map<String, Object> stats = orchestrator.getGlobalStatistics();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            logger.error("❌ Erreur récupération statistiques", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * 🔄 RESET INITIATION (Admin only)
     * Pour recommencer le processus
     */
    @PostMapping("/reset/{playerId}")
    public ResponseEntity<Map<String, String>> resetInitiation(
            @PathVariable String playerId,
            @RequestHeader(value = "X-Admin-Token", required = false) String adminToken) {
        
        logger.warn("⚠️ Demande reset initiation pour: {}", playerId);
        
        // Vérification token admin (simple pour l'exemple)
        if (!"WALTER-ADMIN-2025".equals(adminToken)) {
            return ResponseEntity.status(403).body(
                Map.of("error", "Accès non autorisé")
            );
        }
        
        try {
            orchestrator.resetPlayerInitiation(playerId);
            return ResponseEntity.ok(Map.of(
                "status", "SUCCESS",
                "message", "Initiation reset pour " + playerId
            ));
        } catch (Exception e) {
            logger.error("❌ Erreur reset initiation", e);
            return ResponseEntity.internalServerError().body(
                Map.of("error", "Erreur lors du reset")
            );
        }
    }
} 