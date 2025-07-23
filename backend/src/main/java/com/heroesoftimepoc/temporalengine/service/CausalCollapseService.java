package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.PsiStateRepository;
import com.heroesoftimepoc.temporalengine.repository.GameTileRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service pour gérer la logique de collapse causale dans Heroes of Time
 * 
 * TYPES DE COLLAPSE :
 * 1. INTERACTION - Collision entre états quantiques
 * 2. OBSERVATION - Détection par un joueur
 * 3. ANCHORING - Stabilisation par artefact temporel
 */
@Service
public class CausalCollapseService {

    @Autowired
    private PsiStateRepository psiStateRepository;
    
    @Autowired
    private GameTileRepository gameTileRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private QuantumInterferenceService quantumInterferenceService;
    
    /**
     * Types de déclencheurs de collapse
     */
    public enum CollapseTriggerType {
        INTERACTION,    // Collision entre états quantiques
        OBSERVATION,    // Joueur observe la position
        ANCHORING,      // Artefact temporel stabilise
        TEMPORAL_LIMIT  // Limite temporelle atteinte
    }
    
    /**
     * Résultat d'un collapse causale
     */
    public static class CollapseResult {
        private final PsiState collapsedState;
        private final CollapseTriggerType triggerType;
        private final String actionExecuted;
        private final Map<String, Object> effects;
        private final boolean success;
        
        public CollapseResult(PsiState collapsedState, CollapseTriggerType triggerType, 
                             String actionExecuted, Map<String, Object> effects, boolean success) {
            this.collapsedState = collapsedState;
            this.triggerType = triggerType;
            this.actionExecuted = actionExecuted;
            this.effects = effects;
            this.success = success;
        }
        
        // Getters
        public PsiState getCollapsedState() { return collapsedState; }
        public CollapseTriggerType getTriggerType() { return triggerType; }
        public String getActionExecuted() { return actionExecuted; }
        public Map<String, Object> getEffects() { return effects; }
        public boolean isSuccess() { return success; }
        
        @Override
        public String toString() {
            return String.format("CollapseResult[%s] %s: %s (success=%b)", 
                triggerType, collapsedState.getPsiId(), actionExecuted, success);
        }
    }
    
    /**
     * Déclencheur de collapse
     */
    public static class CollapseTrigger {
        private final CollapseTriggerType type;
        private final String reason;
        private final Map<String, Object> context;
        
        public CollapseTrigger(CollapseTriggerType type, String reason, Map<String, Object> context) {
            this.type = type;
            this.reason = reason;
            this.context = context;
        }
        
        public CollapseTriggerType getType() { return type; }
        public String getReason() { return reason; }
        public Map<String, Object> getContext() { return context; }
    }
    
    /**
     * MÉTHODE PRINCIPALE : Détecter et exécuter les collapses causales
     */
    public List<CollapseResult> processAllCausalCollapses(Game game) {
        List<CollapseResult> results = new ArrayList<>();
        
        // 1. Récupérer tous les états quantiques actifs
        List<PsiState> activeStates = game.getActivePsiStates();
        
        // 2. Détecter les collapses pour chaque état
        for (PsiState state : activeStates) {
            CollapseTrigger trigger = detectCollapseTrigger(game, state);
            if (trigger != null) {
                CollapseResult result = executeCausalCollapse(game, state, trigger);
                results.add(result);
            }
        }
        
        // 3. Traiter les collapses en cascade
        results.addAll(processCascadingCollapses(game, results));
        
        return results;
    }
    
    /**
     * DÉTECTION : Détecter si un état quantique doit s'effondrer
     */
    private CollapseTrigger detectCollapseTrigger(Game game, PsiState quantumState) {
        // 1. INTERACTION - Collision entre états quantiques
        CollapseTrigger interaction = detectInteractionTrigger(game, quantumState);
        if (interaction != null) return interaction;
        
        // 2. OBSERVATION - Joueur observe la position
        CollapseTrigger observation = detectObservationTrigger(game, quantumState);
        if (observation != null) return observation;
        
        // 3. ANCHORING - Artefact temporel stabilise
        CollapseTrigger anchoring = detectAnchoringTrigger(game, quantumState);
        if (anchoring != null) return anchoring;
        
        // 4. TEMPORAL_LIMIT - Limite temporelle atteinte
        CollapseTrigger temporalLimit = detectTemporalLimitTrigger(game, quantumState);
        if (temporalLimit != null) return temporalLimit;
        
        return null; // Aucun déclencheur détecté
    }
    
    /**
     * INTERACTION : Détecter les collisions entre états quantiques
     */
    private CollapseTrigger detectInteractionTrigger(Game game, PsiState quantumState) {
        if (quantumState.getTargetX() == null || quantumState.getTargetY() == null) {
            return null;
        }
        
        // Trouver d'autres états quantiques à la même position
        List<PsiState> conflictingStates = game.getActivePsiStates().stream()
            .filter(state -> !state.getPsiId().equals(quantumState.getPsiId()))
            .filter(state -> Objects.equals(state.getTargetX(), quantumState.getTargetX()) 
                         && Objects.equals(state.getTargetY(), quantumState.getTargetY()))
            .filter(state -> Objects.equals(state.getDeltaT(), quantumState.getDeltaT()))
            .collect(Collectors.toList());
        
        if (!conflictingStates.isEmpty()) {
            Map<String, Object> context = new HashMap<>();
            context.put("conflictingStates", conflictingStates);
            context.put("position", quantumState.getTargetX() + "," + quantumState.getTargetY());
            context.put("deltaT", quantumState.getDeltaT());
            
            return new CollapseTrigger(
                CollapseTriggerType.INTERACTION,
                "Collision détectée avec " + conflictingStates.size() + " autres états",
                context
            );
        }
        
        return null;
    }
    
    /**
     * OBSERVATION : Détecter si un joueur observe la position
     */
    private CollapseTrigger detectObservationTrigger(Game game, PsiState quantumState) {
        if (quantumState.getTargetX() == null || quantumState.getTargetY() == null) {
            return null;
        }
        
        // Vérifier si un héros est présent à cette position
        GameTile tile = game.getTileAt(quantumState.getTargetX(), quantumState.getTargetY());
        if (tile != null && !tile.isEmpty()) {
            // Vérifier si l'occupant n'est pas le propriétaire de l'état quantique
            Optional<String> observer = tile.getOccupants().stream()
                .filter(occupant -> !occupant.equals(quantumState.getOwnerHero()))
                .findFirst();
            
            if (observer.isPresent()) {
                Map<String, Object> context = new HashMap<>();
                context.put("observer", observer.get());
                context.put("position", quantumState.getTargetX() + "," + quantumState.getTargetY());
                context.put("tile", tile);
                
                return new CollapseTrigger(
                    CollapseTriggerType.OBSERVATION,
                    "Observation par " + observer.get(),
                    context
                );
            }
        }
        
        return null;
    }
    
    /**
     * ANCHORING : Détecter l'utilisation d'artefacts temporels
     */
    private CollapseTrigger detectAnchoringTrigger(Game game, PsiState quantumState) {
        // Vérifier si un artefact d'ancrage est actif
        List<Hero> heroes = game.getHeroes();
        
        for (Hero hero : heroes) {
            List<String> inventory = hero.getInventory();
            if (inventory.contains("TourAncrage") || inventory.contains("Tour d'Ancrage")) {
                // Vérifier si l'artefact a été utilisé récemment
                // (Ici on peut vérifier un flag ou un timestamp)
                
                Map<String, Object> context = new HashMap<>();
                context.put("anchoringHero", hero.getName());
                context.put("artifact", "Tour d'Ancrage");
                context.put("affectedStates", game.getActivePsiStates().size());
                
                return new CollapseTrigger(
                    CollapseTriggerType.ANCHORING,
                    "Tour d'Ancrage utilisée par " + hero.getName(),
                    context
                );
            }
        }
        
        return null;
    }
    
    /**
     * TEMPORAL_LIMIT : Détecter si la limite temporelle est atteinte
     */
    private CollapseTrigger detectTemporalLimitTrigger(Game game, PsiState quantumState) {
        if (quantumState.getDeltaT() == null) {
            return null;
        }
        
        // Calculer le tour cible
        int targetTurn = game.getCurrentTurn() + quantumState.getDeltaT();
        
        // Vérifier si nous avons atteint ou dépassé le tour cible
        if (game.getCurrentTurn() >= targetTurn) {
            Map<String, Object> context = new HashMap<>();
            context.put("targetTurn", targetTurn);
            context.put("currentTurn", game.getCurrentTurn());
            context.put("deltaT", quantumState.getDeltaT());
            
            return new CollapseTrigger(
                CollapseTriggerType.TEMPORAL_LIMIT,
                "Limite temporelle atteinte (tour " + targetTurn + ")",
                context
            );
        }
        
        return null;
    }
    
    /**
     * EXÉCUTION : Exécuter le collapse causale
     */
    private CollapseResult executeCausalCollapse(Game game, PsiState quantumState, CollapseTrigger trigger) {
        Map<String, Object> effects = new HashMap<>();
        String actionExecuted = "";
        boolean success = false;
        
        try {
            switch (trigger.getType()) {
                case INTERACTION:
                    return executeInteractionCollapse(game, quantumState, trigger);
                    
                case OBSERVATION:
                    return executeObservationCollapse(game, quantumState, trigger);
                    
                case ANCHORING:
                    return executeAnchoringCollapse(game, quantumState, trigger);
                    
                case TEMPORAL_LIMIT:
                    return executeTemporalLimitCollapse(game, quantumState, trigger);
                    
                default:
                    actionExecuted = "Unknown collapse type";
                    break;
            }
        } catch (Exception e) {
            effects.put("error", e.getMessage());
            actionExecuted = "Collapse failed: " + e.getMessage();
        }
        
        return new CollapseResult(quantumState, trigger.getType(), actionExecuted, effects, success);
    }
    
    /**
     * INTERACTION COLLAPSE : Résoudre les collisions entre états quantiques
     */
    private CollapseResult executeInteractionCollapse(Game game, PsiState quantumState, CollapseTrigger trigger) {
        @SuppressWarnings("unchecked")
        List<PsiState> conflictingStates = (List<PsiState>) trigger.getContext().get("conflictingStates");
        
        // Ajouter l'état courant à la liste des conflits
        List<PsiState> allConflictingStates = new ArrayList<>(conflictingStates);
        allConflictingStates.add(quantumState);
        
        // Calculer les interférences quantiques
        QuantumInterferenceService.InterferenceResult interference = 
            quantumInterferenceService.calculateInterference(allConflictingStates);
        
        // Déterminer le gagnant basé sur les probabilités
        PsiState winner = determineWinner(allConflictingStates, interference);
        
        // Exécuter l'action du gagnant
        String actionExecuted = executeQuantumAction(game, winner);
        
        // Marquer tous les états comme effondrés
        for (PsiState state : allConflictingStates) {
            state.collapse();
            psiStateRepository.save(state);
        }
        
        // Créer les effets
        Map<String, Object> effects = new HashMap<>();
        effects.put("winner", winner.getPsiId());
        effects.put("losers", allConflictingStates.stream()
            .filter(state -> !state.equals(winner))
            .map(PsiState::getPsiId)
            .collect(Collectors.toList()));
        effects.put("interference", interference.toString());
        effects.put("combinedProbability", interference.getCombinedProbability());
        
        return new CollapseResult(winner, CollapseTriggerType.INTERACTION, actionExecuted, effects, true);
    }
    
    /**
     * OBSERVATION COLLAPSE : Résoudre les observations
     */
    private CollapseResult executeObservationCollapse(Game game, PsiState quantumState, CollapseTrigger trigger) {
        String observer = (String) trigger.getContext().get("observer");
        
        // Calculer la probabilité modifiée par l'observation
        double observationModifier = 1.0; // L'observation force le collapse
        
        // Exécuter l'action
        String actionExecuted = executeQuantumAction(game, quantumState);
        
        // Marquer comme effondré
        quantumState.collapse();
        psiStateRepository.save(quantumState);
        
        // Créer les effets
        Map<String, Object> effects = new HashMap<>();
        effects.put("observer", observer);
        effects.put("observationModifier", observationModifier);
        effects.put("forcedCollapse", true);
        
        return new CollapseResult(quantumState, CollapseTriggerType.OBSERVATION, actionExecuted, effects, true);
    }
    
    /**
     * ANCHORING COLLAPSE : Résoudre l'ancrage temporel
     */
    private CollapseResult executeAnchoringCollapse(Game game, PsiState quantumState, CollapseTrigger trigger) {
        String anchoringHero = (String) trigger.getContext().get("anchoringHero");
        
        // L'ancrage force tous les états à s'effondrer
        List<PsiState> allStates = game.getActivePsiStates();
        List<String> collapsedStates = new ArrayList<>();
        
        for (PsiState state : allStates) {
            if (state.isActive()) {
                executeQuantumAction(game, state);
                state.collapse();
                psiStateRepository.save(state);
                collapsedStates.add(state.getPsiId());
            }
        }
        
        // Exécuter l'action de l'état courant
        String actionExecuted = executeQuantumAction(game, quantumState);
        
        // Créer les effets
        Map<String, Object> effects = new HashMap<>();
        effects.put("anchoringHero", anchoringHero);
        effects.put("collapsedStates", collapsedStates);
        effects.put("totalCollapsed", collapsedStates.size());
        effects.put("timelineStabilized", true);
        
        return new CollapseResult(quantumState, CollapseTriggerType.ANCHORING, actionExecuted, effects, true);
    }
    
    /**
     * TEMPORAL_LIMIT COLLAPSE : Résoudre les limites temporelles
     */
    private CollapseResult executeTemporalLimitCollapse(Game game, PsiState quantumState, CollapseTrigger trigger) {
        int targetTurn = (Integer) trigger.getContext().get("targetTurn");
        int currentTurn = (Integer) trigger.getContext().get("currentTurn");
        
        // Exécuter l'action normalement
        String actionExecuted = executeQuantumAction(game, quantumState);
        
        // Marquer comme effondré
        quantumState.collapse();
        psiStateRepository.save(quantumState);
        
        // Créer les effets
        Map<String, Object> effects = new HashMap<>();
        effects.put("targetTurn", targetTurn);
        effects.put("currentTurn", currentTurn);
        effects.put("naturalCollapse", true);
        
        return new CollapseResult(quantumState, CollapseTriggerType.TEMPORAL_LIMIT, actionExecuted, effects, true);
    }
    
    /**
     * DÉTERMINATION GAGNANT : Déterminer le gagnant dans une collision
     */
    private PsiState determineWinner(List<PsiState> conflictingStates, 
                                    QuantumInterferenceService.InterferenceResult interference) {
        
        // Trier par probabilité décroissante
        return conflictingStates.stream()
            .max(Comparator.comparingDouble(state -> {
                if (state.isUsingComplexAmplitude()) {
                    return state.getComplexAmplitude().getProbability();
                } else {
                    return state.getProbability();
                }
            }))
            .orElse(conflictingStates.get(0));
    }
    
    /**
     * EXÉCUTION ACTION : Exécuter l'action d'un état quantique
     */
    private String executeQuantumAction(Game game, PsiState quantumState) {
        String actionType = quantumState.getActionType();
        
        if (actionType == null) {
            actionType = "MOV"; // Default
        }
        
        switch (actionType) {
            case "MOV":
                return executeMovementAction(game, quantumState);
            case "CREATE":
                return executeCreationAction(game, quantumState);
            case "BATTLE":
                return executeBattleAction(game, quantumState);
            default:
                return "Unknown action: " + actionType;
        }
    }
    
    /**
     * MOUVEMENT : Exécuter un mouvement
     */
    private String executeMovementAction(Game game, PsiState quantumState) {
        Hero hero = game.getHeroByName(quantumState.getOwnerHero());
        if (hero == null) {
            return "Héros non trouvé: " + quantumState.getOwnerHero();
        }
        
        int targetX = quantumState.getTargetX();
        int targetY = quantumState.getTargetY();
        
        // Mettre à jour la position
        hero.moveTo(targetX, targetY);
        heroRepository.save(hero);
        
        // Mettre à jour les tuiles
        updateTileOccupancy(game, hero, targetX, targetY);
        
        return String.format("Héros %s déplacé vers (%d,%d) via collapse causale", 
                           hero.getName(), targetX, targetY);
    }
    
    /**
     * CRÉATION : Exécuter une création
     */
    private String executeCreationAction(Game game, PsiState quantumState) {
        // Logique de création d'entité
        return String.format("Entité créée en (%d,%d) via collapse causale", 
                           quantumState.getTargetX(), quantumState.getTargetY());
    }
    
    /**
     * BATAILLE : Exécuter une bataille
     */
    private String executeBattleAction(Game game, PsiState quantumState) {
        // Logique de bataille
        return String.format("Bataille exécutée en (%d,%d) via collapse causale", 
                           quantumState.getTargetX(), quantumState.getTargetY());
    }
    
    /**
     * MISE À JOUR TUILES : Mettre à jour l'occupation des tuiles
     */
    private void updateTileOccupancy(Game game, Hero hero, int newX, int newY) {
        // Retirer de l'ancienne position
        if (hero.getPositionX() != null && hero.getPositionY() != null) {
            GameTile oldTile = game.getTileAt(hero.getPositionX(), hero.getPositionY());
            if (oldTile != null) {
                oldTile.removeOccupant(hero.getName());
                gameTileRepository.save(oldTile);
            }
        }
        
        // Ajouter à la nouvelle position
        GameTile newTile = game.getTileAt(newX, newY);
        if (newTile == null) {
            newTile = new GameTile(newX, newY, "grass");
            newTile.setGame(game);
            game.addTile(newTile);
        }
        
        newTile.addOccupant(hero.getName());
        gameTileRepository.save(newTile);
    }
    
    /**
     * COLLAPSES EN CASCADE : Traiter les collapses qui en déclenchent d'autres
     */
    private List<CollapseResult> processCascadingCollapses(Game game, List<CollapseResult> initialResults) {
        List<CollapseResult> cascadingResults = new ArrayList<>();
        
        // Pour chaque collapse initial, vérifier s'il en déclenche d'autres
        for (CollapseResult result : initialResults) {
            if (result.isSuccess()) {
                // Chercher d'autres états qui pourraient être affectés
                List<PsiState> affectedStates = findAffectedStates(game, result);
                
                for (PsiState affectedState : affectedStates) {
                    CollapseTrigger trigger = detectCollapseTrigger(game, affectedState);
                    if (trigger != null) {
                        CollapseResult cascadingResult = executeCausalCollapse(game, affectedState, trigger);
                        cascadingResults.add(cascadingResult);
                    }
                }
            }
        }
        
        return cascadingResults;
    }
    
    /**
     * ÉTATS AFFECTÉS : Trouver les états affectés par un collapse
     */
    private List<PsiState> findAffectedStates(Game game, CollapseResult collapseResult) {
        // Logique pour trouver les états qui pourraient être affectés
        // par le collapse d'un autre état
        
        return game.getActivePsiStates().stream()
            .filter(state -> isAffectedByCollapse(state, collapseResult))
            .collect(Collectors.toList());
    }
    
    /**
     * VÉRIFICATION AFFECTATION : Vérifier si un état est affecté par un collapse
     */
    private boolean isAffectedByCollapse(PsiState state, CollapseResult collapseResult) {
        // Exemple : états dans la même zone ou même timeline
        if (state.getTargetX() != null && state.getTargetY() != null &&
            collapseResult.getCollapsedState().getTargetX() != null && 
            collapseResult.getCollapsedState().getTargetY() != null) {
            
            // Vérifier la proximité
            int distance = Math.abs(state.getTargetX() - collapseResult.getCollapsedState().getTargetX()) +
                          Math.abs(state.getTargetY() - collapseResult.getCollapsedState().getTargetY());
            
            return distance <= 2; // Rayon d'affectation
        }
        
        return false;
    }
    
    /**
     * STATISTIQUES : Obtenir les statistiques des collapses
     */
    public Map<String, Object> getCollapseStatistics(Game game) {
        Map<String, Object> stats = new HashMap<>();
        
        List<PsiState> allStates = game.getPsiStates();
        List<PsiState> activeStates = game.getActivePsiStates();
        List<PsiState> collapsedStates = allStates.stream()
            .filter(state -> !state.isActive())
            .collect(Collectors.toList());
        
        stats.put("totalStates", allStates.size());
        stats.put("activeStates", activeStates.size());
        stats.put("collapsedStates", collapsedStates.size());
        stats.put("collapseRate", collapsedStates.size() / (double) allStates.size());
        
        // Statistiques par type
        Map<String, Long> collapsesByType = new HashMap<>();
        // Ici on pourrait analyser les types de collapse si on les stockait
        
        stats.put("collapsesByType", collapsesByType);
        
        return stats;
    }
} 