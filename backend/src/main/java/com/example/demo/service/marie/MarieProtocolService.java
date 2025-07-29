package com.example.demo.service.marie;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.model.InitiationRequest;
import com.example.demo.model.InitiationResult;
import com.example.demo.service.sphinx.SphinxProtocolService;
import com.example.demo.service.school.MagicSchoolService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 🌟 MARIE PROTOCOL SERVICE - Chain of Responsibility Pattern
 * =========================================================
 * 
 * Premier maillon de la chaîne d'initiation magique.
 * Marie filtre les bots et valide l'authenticité émotionnelle.
 * 
 * FLUX: Marie → Sphinx → École de Magie
 * PATTERN: Chain of Responsibility (COR)
 * PROTECTION: Anti-DDOS avec rate limiting et captcha émotionnel
 */
@Service
public class MarieProtocolService implements InitiationHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(MarieProtocolService.class);
    private static final long RATE_LIMIT_HOURS = 1;
    
    @Autowired
    private SphinxProtocolService nextHandler; // Prochain dans la chaîne
    
    // Rate limiting storage
    private final Map<String, LocalDateTime> lastAttempts = new ConcurrentHashMap<>();
    
    // Questions émotionnelles pour validation
    private final String[] emotionalQuestions = {
        "Qu'est-ce qui te fait vibrer dans ce monde ?",
        "Quel est ton plus beau souvenir de jeu ?",
        "Si tu pouvais créer un sort, quel serait-il ?",
        "Qu'est-ce qui t'amène vraiment ici ?",
        "Décris une émotion que seul un humain peut ressentir."
    };
    
    @Override
    public InitiationResult handleInitiation(InitiationRequest request) {
        logger.info("🌟 MARIE PROTOCOL - Nouvelle initiation pour: {}", request.getPlayerId());
        
        // 1. Vérification rate limiting
        if (!checkRateLimit(request.getPlayerId())) {
            return new InitiationResult(
                false, 
                "Marie te demande de patienter. Reviens dans une heure.",
                "RATE_LIMITED"
            );
        }
        
        // 2. Apparition dans l'interstice
        String marieGreeting = showMarieInInterstice(request);
        
        // 3. Question émotionnelle
        String question = selectEmotionalQuestion();
        request.setCurrentQuestion(question);
        
        // 4. Validation de la réponse
        if (!validateEmotionalResponse(request)) {
            return new InitiationResult(
                false,
                "Marie sent que tu n'es pas encore prêt. Réfléchis et reviens.",
                "EMOTIONAL_VALIDATION_FAILED"
            );
        }
        
        // 5. Marie valide et passe au Sphinx
        logger.info("✅ MARIE VALIDATION OK - Passage au Sphinx pour: {}", request.getPlayerId());
        request.setMarieValidated(true);
        request.setMarieValidationTime(LocalDateTime.now());
        
        // Chain of Responsibility - passer au suivant
        if (nextHandler != null) {
            return nextHandler.handleInitiation(request);
        }
        
        return new InitiationResult(
            true,
            "Marie te guide vers le Sphinx. Prépare-toi à l'épreuve quantique.",
            "MARIE_VALIDATED"
        );
    }
    
    /**
     * 🛡️ Rate Limiting - Anti-DDOS
     */
    private boolean checkRateLimit(String playerId) {
        LocalDateTime lastAttempt = lastAttempts.get(playerId);
        LocalDateTime now = LocalDateTime.now();
        
        if (lastAttempt != null && lastAttempt.plusHours(RATE_LIMIT_HOURS).isAfter(now)) {
            logger.warn("⚠️ Rate limit hit for player: {}", playerId);
            return false;
        }
        
        lastAttempts.put(playerId, now);
        return true;
    }
    
    /**
     * 🌌 Apparition de Marie dans l'interstice
     */
    private String showMarieInInterstice(InitiationRequest request) {
        // Ici on pourrait déclencher des effets visuels côté client
        String greeting = String.format(
            "Bonjour %s. Je suis Marie, gardienne de l'interstice. " +
            "Avant de te laisser passer, j'ai une question pour toi...",
            request.getPlayerName()
        );
        
        logger.info("🌟 Marie apparaît dans l'interstice pour: {}", request.getPlayerId());
        return greeting;
    }
    
    /**
     * 💭 Sélection d'une question émotionnelle
     */
    private String selectEmotionalQuestion() {
        int index = (int) (Math.random() * emotionalQuestions.length);
        return emotionalQuestions[index];
    }
    
    /**
     * 💖 Validation émotionnelle (anti-bot)
     */
    private boolean validateEmotionalResponse(InitiationRequest request) {
        String response = request.getResponse();
        
        if (response == null || response.trim().isEmpty()) {
            return false;
        }
        
        // Critères de validation émotionnelle
        boolean hasMinLength = response.length() > 20;
        boolean hasEmotionalWords = containsEmotionalWords(response);
        boolean isNotGeneric = !isGenericResponse(response);
        boolean hasPersonalTouch = containsPersonalElements(response);
        
        int score = 0;
        if (hasMinLength) score++;
        if (hasEmotionalWords) score++;
        if (isNotGeneric) score++;
        if (hasPersonalTouch) score++;
        
        logger.debug("Emotional validation score: {}/4 for player: {}", score, request.getPlayerId());
        
        return score >= 3; // Au moins 3/4 critères
    }
    
    /**
     * 🔍 Détection de mots émotionnels
     */
    private boolean containsEmotionalWords(String response) {
        String[] emotionalKeywords = {
            "sens", "ressens", "émotion", "joie", "peur", "amour",
            "vibrer", "passion", "rêve", "espoir", "souvenir",
            "heureux", "triste", "excité", "nostalgique"
        };
        
        String lowerResponse = response.toLowerCase();
        for (String keyword : emotionalKeywords) {
            if (lowerResponse.contains(keyword)) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * 🤖 Détection de réponses génériques (bots)
     */
    private boolean isGenericResponse(String response) {
        String[] genericPatterns = {
            "je suis un humain",
            "j'aime les jeux",
            "c'est intéressant",
            "je ne sais pas",
            "oui", "non", "peut-être"
        };
        
        String lowerResponse = response.toLowerCase().trim();
        for (String pattern : genericPatterns) {
            if (lowerResponse.equals(pattern)) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * 👤 Détection d'éléments personnels
     */
    private boolean containsPersonalElements(String response) {
        // Recherche de pronoms personnels et détails spécifiques
        String[] personalMarkers = {
            " je ", " mon ", " ma ", " mes ",
            " moi ", "quand j'", "j'ai ",
            "je me souviens", "j'aime quand"
        };
        
        String lowerResponse = " " + response.toLowerCase() + " ";
        for (String marker : personalMarkers) {
            if (lowerResponse.contains(marker)) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * 🔗 Configuration de la chaîne
     */
    @Override
    public void setNext(InitiationHandler next) {
        this.nextHandler = (SphinxProtocolService) next;
    }
    
    /**
     * 📊 Statistiques Marie
     */
    public Map<String, Object> getStatistics() {
        return Map.of(
            "totalAttempts", lastAttempts.size(),
            "activeRateLimits", countActiveRateLimits(),
            "questionsAvailable", emotionalQuestions.length,
            "serviceName", "Marie Protocol",
            "nextHandler", nextHandler != null ? "Sphinx Protocol" : "None"
        );
    }
    
    private long countActiveRateLimits() {
        LocalDateTime now = LocalDateTime.now();
        return lastAttempts.values().stream()
            .filter(time -> time.plusHours(RATE_LIMIT_HOURS).isAfter(now))
            .count();
    }
} 