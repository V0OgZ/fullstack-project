package com.example.demo.sphinx;

import org.springframework.stereotype.Component;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

/**
 * 🦁 SPHINX PROTOCOL - Générateur de Questions Quantiques
 * 
 * Le Sphinx teste la compréhension profonde de la physique quantique
 * et de la causalité temporelle pour accéder à l'Interstice.
 */
@Component
public class SphinxProtocol {
    
    private static final String[] QUESTION_TEMPLATES = {
        "Si une particule existe dans %d états superposés et que %d observateurs la mesurent simultanément, quelle est la probabilité de collapse vers l'état %s ?",
        "Un photon voyage à travers %d timelines. Dans combien peut-il exister simultanément sans violer la causalité ?",
        "L'entropie d'un système isolé augmente de %d J/K. Quelle est l'énergie minimale pour inverser localement cette flèche du temps ?",
        "Deux particules intriquées sont séparées de %d années-lumière. Si l'une collapse, quel est le délai de corrélation pour l'autre ?",
        "Dans un multivers à %d dimensions, combien de chemins causaux distincts peuvent relier deux événements séparés de %d unités temporelles ?"
    };
    
    private static final String[] DIFFICULTY_LEVELS = {
        "INITIÉ", "ADEPTE", "MAÎTRE", "TRANSCENDANT"
    };
    
    private final Map<String, Integer> playerCertifications = new HashMap<>();
    private final Map<String, SphinxQuestion> activeQuestions = new HashMap<>();
    
    /**
     * Génère une question quantique procédurale
     */
    public SphinxQuestion generateQuestion(String playerId, int difficultyLevel) {
        String template = QUESTION_TEMPLATES[ThreadLocalRandom.current().nextInt(QUESTION_TEMPLATES.length)];
        
        // Paramètres procéduraux basés sur la difficulté
        int param1 = ThreadLocalRandom.current().nextInt(2 + difficultyLevel * 3, 10 + difficultyLevel * 5);
        int param2 = ThreadLocalRandom.current().nextInt(1 + difficultyLevel, 5 + difficultyLevel * 2);
        String param3 = generateQuantumState(difficultyLevel);
        
        String question = String.format(template, param1, param2, param3);
        
        // Calcul de la réponse correcte (simplifié pour le jeu)
        double correctAnswer = calculateQuantumAnswer(param1, param2, difficultyLevel);
        
        SphinxQuestion sphinxQuestion = new SphinxQuestion(
            UUID.randomUUID().toString(),
            question,
            correctAnswer,
            difficultyLevel,
            System.currentTimeMillis()
        );
        
        activeQuestions.put(playerId, sphinxQuestion);
        return sphinxQuestion;
    }
    
    /**
     * Valide la réponse du joueur
     */
    public SphinxValidation validateAnswer(String playerId, double playerAnswer) {
        SphinxQuestion question = activeQuestions.get(playerId);
        if (question == null) {
            return new SphinxValidation(false, "Aucune question active", 0);
        }
        
        // Tolérance selon la difficulté
        double tolerance = 0.1 / (question.getDifficulty() + 1);
        boolean isCorrect = Math.abs(playerAnswer - question.getCorrectAnswer()) <= tolerance;
        
        if (isCorrect) {
            // Attribution de la certification
            int currentLevel = playerCertifications.getOrDefault(playerId, -1);
            if (question.getDifficulty() > currentLevel) {
                playerCertifications.put(playerId, question.getDifficulty());
            }
            
            activeQuestions.remove(playerId);
            return new SphinxValidation(
                true, 
                "✨ Réponse correcte ! Le Sphinx reconnaît votre maîtrise.", 
                question.getDifficulty()
            );
        } else {
            return new SphinxValidation(
                false, 
                "❌ Le Sphinx n'est pas satisfait. Réfléchissez plus profondément.", 
                question.getDifficulty()
            );
        }
    }
    
    /**
     * Vérifie si le joueur peut accéder à l'Interstice
     */
    public boolean canAccessInterstice(String playerId) {
        Integer certification = playerCertifications.get(playerId);
        return certification != null && certification >= 2; // Niveau MAÎTRE minimum
    }
    
    /**
     * Obtient le niveau de certification du joueur
     */
    public String getPlayerCertification(String playerId) {
        Integer level = playerCertifications.get(playerId);
        if (level == null || level < 0) return "NON_INITIÉ";
        if (level >= DIFFICULTY_LEVELS.length) return "TRANSCENDANT";
        return DIFFICULTY_LEVELS[level];
    }
    
    // Méthodes privées d'aide
    
    private String generateQuantumState(int difficulty) {
        String[] states = {"│0⟩", "│1⟩", "│+⟩", "│-⟩", "│ψ⟩", "│φ⟩"};
        return states[ThreadLocalRandom.current().nextInt(Math.min(states.length, 2 + difficulty))];
    }
    
    private double calculateQuantumAnswer(int param1, int param2, int difficulty) {
        // Formule simplifiée mais cohérente pour le gameplay
        double base = Math.sqrt(param1 * param2);
        double modifier = Math.pow(2, -difficulty);
        return Math.round(base * modifier * 100.0) / 100.0;
    }
    
    // Classes internes
    
    public static class SphinxQuestion {
        private final String id;
        private final String question;
        private final double correctAnswer;
        private final int difficulty;
        private final long timestamp;
        
        public SphinxQuestion(String id, String question, double correctAnswer, int difficulty, long timestamp) {
            this.id = id;
            this.question = question;
            this.correctAnswer = correctAnswer;
            this.difficulty = difficulty;
            this.timestamp = timestamp;
        }
        
        // Getters
        public String getId() { return id; }
        public String getQuestion() { return question; }
        public double getCorrectAnswer() { return correctAnswer; }
        public int getDifficulty() { return difficulty; }
        public long getTimestamp() { return timestamp; }
    }
    
    public static class SphinxValidation {
        private final boolean correct;
        private final String message;
        private final int difficultyLevel;
        
        public SphinxValidation(boolean correct, String message, int difficultyLevel) {
            this.correct = correct;
            this.message = message;
            this.difficultyLevel = difficultyLevel;
        }
        
        // Getters
        public boolean isCorrect() { return correct; }
        public String getMessage() { return message; }
        public int getDifficultyLevel() { return difficultyLevel; }
    }
} 