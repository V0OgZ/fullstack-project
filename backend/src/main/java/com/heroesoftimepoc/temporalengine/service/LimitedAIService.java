package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Service IA avec limitations de ressources pour éviter la surcharge serveur
 * Implémente l'algorithme Claudius-Memento avec contrôles de performance
 */
@Service
public class LimitedAIService {

    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private PlayerRepository playerRepository;

    // Configuration des limitations
    private final AILimitationConfig config;
    private final Map<String, SimulationResult> simulationCache = new ConcurrentHashMap<>();
    private final ExecutorService simulationPool = Executors.newFixedThreadPool(4);
    private final AtomicInteger activeSimulations = new AtomicInteger(0);

    public LimitedAIService() {
        // Configuration par défaut (niveau MOYEN)
        this.config = new AILimitationConfig(4, 50, 5000, 1000, 0.15, 20);
    }

    /**
     * Configuration des limitations d'IA
     */
    public static class AILimitationConfig {
        private final int maxSearchDepth;
        private final int maxSimulationsPerTurn;
        private final long maxCalculationTime;
        private final int maxPatternMemorySize;
        private final double intentionalErrorRate;
        private final int maxQuantumStates;

        public AILimitationConfig(int maxSearchDepth, int maxSimulationsPerTurn, 
                                long maxCalculationTime, int maxPatternMemorySize,
                                double intentionalErrorRate, int maxQuantumStates) {
            this.maxSearchDepth = maxSearchDepth;
            this.maxSimulationsPerTurn = maxSimulationsPerTurn;
            this.maxCalculationTime = maxCalculationTime;
            this.maxPatternMemorySize = maxPatternMemorySize;
            this.intentionalErrorRate = intentionalErrorRate;
            this.maxQuantumStates = maxQuantumStates;
        }

        // Getters
        public int getMaxSearchDepth() { return maxSearchDepth; }
        public int getMaxSimulationsPerTurn() { return maxSimulationsPerTurn; }
        public long getMaxCalculationTime() { return maxCalculationTime; }
        public int getMaxPatternMemorySize() { return maxPatternMemorySize; }
        public double getIntentionalErrorRate() { return intentionalErrorRate; }
        public int getMaxQuantumStates() { return maxQuantumStates; }
    }

    /**
     * L'IA joue son tour avec limitations
     */
    public ActionResult playAITurn(Long gameId) {
        long startTime = System.currentTimeMillis();
        
        try {
            // Vérification du nombre de simulations actives
            if (activeSimulations.get() >= 10) {
                return ActionResult.failure("Trop de simulations en cours, veuillez réessayer");
            }

            activeSimulations.incrementAndGet();
            
            Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Partie non trouvée"));

            // Génération des actions possibles
            List<Action> possibleActions = generatePossibleActions(game);
            
            if (possibleActions.isEmpty()) {
                return ActionResult.failure("Aucune action possible");
            }

            // Décision avec limitations
            Action chosenAction = decideWithLimitations(game, possibleActions, startTime);
            
            // Exécution de l'action (simulée pour l'instant)
            ActionResult result = simulateActionResult(game, chosenAction);
            
            // Apprentissage (simplifié pour économiser les ressources)
            if (result.isSuccess()) {
                recordPattern(chosenAction, game, result);
            }

            return result;

        } finally {
            activeSimulations.decrementAndGet();
        }
    }

    /**
     * Décision avec limitations de ressources
     */
    private Action decideWithLimitations(Game game, List<Action> actions, long startTime) {
        Action bestAction = null;
        double bestScore = -1.0;
        int simulationsCount = 0;

        // Limitation du nombre de simulations
        int maxSims = Math.min(config.getMaxSimulationsPerTurn(), actions.size());

        for (Action action : actions) {
            // Vérification du timeout
            if (System.currentTimeMillis() - startTime > config.getMaxCalculationTime()) {
                break;
            }

            // Limitation du nombre de simulations
            if (simulationsCount >= maxSims) {
                break;
            }

            double score = simulateActionWithDepth(game, action, config.getMaxSearchDepth());
            simulationsCount++;

            // Ajout d'erreur volontaire pour équilibrage
            if (Math.random() < config.getIntentionalErrorRate()) {
                score *= 0.8; // Pénalisation aléatoire
            }

            if (score > bestScore) {
                bestScore = score;
                bestAction = action;
            }
        }

        return bestAction != null ? bestAction : selectRandomAction(actions);
    }

    /**
     * Simulation avec profondeur limitée
     */
    private double simulateActionWithDepth(Game game, Action action, int depth) {
        if (depth <= 0) {
            return evaluateGameState(game);
        }

        try {
            // Simulation de l'action
            Game simulatedGame = simulateAction(game, action);
            
            // Génération des actions suivantes (limitées)
            List<Action> nextActions = generatePossibleActions(simulatedGame);
            double maxScore = -1.0;

            // Limitation à 3 actions suivantes maximum
            for (Action nextAction : nextActions.subList(0, Math.min(3, nextActions.size()))) {
                double score = simulateActionWithDepth(simulatedGame, nextAction, depth - 1);
                maxScore = Math.max(maxScore, score);
            }

            return maxScore;

        } catch (Exception e) {
            // En cas d'erreur, retourner un score neutre
            return 0.5;
        }
    }

    /**
     * Évaluation simplifiée de l'état du jeu
     */
    private double evaluateGameState(Game game) {
        double score = 0.0;

        // Score basé sur les héros
        if (game.getHeroes() != null) {
            for (Hero hero : game.getHeroes()) {
                score += hero.getHealth() * 0.1;
                if (hero.getInventory() != null) {
                    score += hero.getInventory().size() * 5;
                }
            }
        }

        // Score basé sur les métadonnées (ressources simulées)
        if (game.getMetadata() != null) {
            score += game.getMetadata().getOrDefault("gold", 0) * 0.01;
            score += game.getMetadata().getOrDefault("mana", 0) * 0.02;
        }

        // Score basé sur la position temporelle
        if (game.getCurrentTurn() != null) {
            score += game.getCurrentTurn() * 2; // Bonus pour les tours avancés
        }

        return score;
    }

    /**
     * Génération des actions possibles (simplifiée)
     */
    private List<Action> generatePossibleActions(Game game) {
        List<Action> actions = new ArrayList<>();

        if (game.getHeroes() == null) {
            return actions;
        }

        for (Hero hero : game.getHeroes()) {
            // Actions de mouvement
            actions.add(new Action("MOVE", hero.getId(), "north"));
            actions.add(new Action("MOVE", hero.getId(), "south"));
            actions.add(new Action("MOVE", hero.getId(), "east"));
            actions.add(new Action("MOVE", hero.getId(), "west"));

            // Actions d'attaque (si ennemi proche)
            actions.add(new Action("ATTACK", hero.getId(), "nearest"));

            // Actions d'artefact (si disponible)
            if (hero.getInventory() != null && !hero.getInventory().isEmpty()) {
                actions.add(new Action("USE_ARTIFACT", hero.getId(), "random"));
            }

            // Action d'attente
            actions.add(new Action("WAIT", hero.getId(), null));
        }

        return actions;
    }

    /**
     * Simulation d'une action
     */
    private Game simulateAction(Game game, Action action) {
        // Création d'une copie du jeu pour simulation
        Game simulatedGame = cloneGame(game);
        
        // Application simplifiée de l'action
        switch (action.getType()) {
            case "MOVE":
                simulateMove(simulatedGame, action);
                break;
            case "ATTACK":
                simulateAttack(simulatedGame, action);
                break;
            case "USE_ARTIFACT":
                simulateUseArtifact(simulatedGame, action);
                break;
            case "WAIT":
                // Ne rien faire
                break;
        }

        return simulatedGame;
    }

    /**
     * Simulation de mouvement
     */
    private void simulateMove(Game game, Action action) {
        // Logique simplifiée de mouvement
        // En réalité, cela utiliserait le TemporalEngineService
    }

    /**
     * Simulation d'attaque
     */
    private void simulateAttack(Game game, Action action) {
        // Logique simplifiée d'attaque
    }

    /**
     * Simulation d'utilisation d'artefact
     */
    private void simulateUseArtifact(Game game, Action action) {
        // Logique simplifiée d'artefact
    }

    /**
     * Sélection d'action aléatoire
     */
    private Action selectRandomAction(List<Action> actions) {
        if (actions.isEmpty()) {
            return null;
        }
        return actions.get(new Random().nextInt(actions.size()));
    }

    /**
     * Simulation du résultat d'une action
     */
    private ActionResult simulateActionResult(Game game, Action action) {
        try {
            // Simulation simple - 80% de succès
            boolean success = Math.random() < 0.8;
            String message = success ? "Action IA exécutée avec succès" : "Action IA échouée";
            
            return new ActionResult(success, message);
        } catch (Exception e) {
            return ActionResult.failure("Erreur lors de l'exécution: " + e.getMessage());
        }
    }

    /**
     * Enregistrement d'un pattern (simplifié)
     */
    private void recordPattern(Action action, Game game, ActionResult result) {
        // Enregistrement simplifié pour économiser la mémoire
        String patternKey = action.getType() + "_" + game.getCurrentTurn();
        
        // Limitation de la taille du cache
        if (simulationCache.size() >= config.getMaxPatternMemorySize()) {
            // Supprimer les entrées les plus anciennes
            String oldestKey = simulationCache.keySet().iterator().next();
            simulationCache.remove(oldestKey);
        }
        
        simulationCache.put(patternKey, new SimulationResult(result.isSuccess() ? 1.0 : 0.0));
    }

    /**
     * Clonage d'un jeu pour simulation
     */
    private Game cloneGame(Game original) {
        Game clone = new Game();
        clone.setId(original.getId());
        clone.setCurrentTurn(original.getCurrentTurn());
        clone.setHeroes(original.getHeroes());
        clone.setMetadata(original.getMetadata());
        return clone;
    }

    /**
     * Configuration de la difficulté
     */
    public void setDifficulty(AIDifficulty difficulty) {
        // Mise à jour de la configuration selon la difficulté
        switch (difficulty) {
            case EASY:
                updateConfig(2, 20, 2000, 500, 0.25, 10);
                break;
            case MEDIUM:
                updateConfig(4, 50, 5000, 1000, 0.15, 20);
                break;
            case HARD:
                updateConfig(6, 100, 8000, 2000, 0.10, 30);
                break;
            case EXPERT:
                updateConfig(8, 200, 12000, 5000, 0.05, 50);
                break;
            case PARADOX:
                updateConfig(10, 500, 20000, 10000, 0.02, 100);
                break;
        }
    }

    private void updateConfig(int depth, int sims, long time, int memory, double error, int quantum) {
        // Mise à jour de la configuration (en réalité, il faudrait une nouvelle instance)
    }

    /**
     * Niveaux de difficulté
     */
    public enum AIDifficulty {
        EASY, MEDIUM, HARD, EXPERT, PARADOX
    }

    /**
     * Classe pour les résultats de simulation
     */
    public static class SimulationResult {
        private final double score;
        
        public SimulationResult(double score) {
            this.score = score;
        }
        
        public double getScore() {
            return score;
        }
    }

    /**
     * Classe pour les actions
     */
    public static class Action {
        private final String type;
        private final Long heroId;
        private final String target;
        
        public Action(String type, Long heroId, String target) {
            this.type = type;
            this.heroId = heroId;
            this.target = target;
        }
        
        public String getType() { return type; }
        public Long getHeroId() { return heroId; }
        public String getTarget() { return target; }
    }

    /**
     * Classe pour les résultats d'action
     */
    public static class ActionResult {
        private final boolean success;
        private final String message;
        
        public ActionResult(boolean success, String message) {
            this.success = success;
            this.message = message;
        }
        
        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        
        public static ActionResult success(String message) {
            return new ActionResult(true, message);
        }
        
        public static ActionResult failure(String message) {
            return new ActionResult(false, message);
        }
    }
} 