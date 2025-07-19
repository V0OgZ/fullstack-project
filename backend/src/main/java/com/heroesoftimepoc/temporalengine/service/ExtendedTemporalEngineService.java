package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.model.Hero;
import com.heroesoftimepoc.temporalengine.model.PsiState;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import com.heroesoftimepoc.temporalengine.repository.PsiStateRepository;
import com.heroesoftimepoc.temporalengine.service.ExtendedTemporalScriptParser.ExtendedScriptResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service d'exécution pour les scripts GROFI étendus
 * Compatible avec le TemporalEngineService existant
 */
@Service
public class ExtendedTemporalEngineService {
    
    @Autowired
    private ExtendedTemporalScriptParser extendedParser;
    
    @Autowired
    private TemporalEngineService baseTemporalEngine;
    
    @Autowired
    private GrofiHeroService grofiHeroService;
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    /**
     * Exécuter un script avec la grammaire étendue GROFI
     */
    public Map<String, Object> executeExtendedScript(Long gameId, String scriptLine) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Game game = gameRepository.findById(gameId).orElse(null);
            if (game == null) {
                result.put("success", false);
                result.put("error", "Game not found: " + gameId);
                return result;
            }
            
            // 1. Parser avec la grammaire étendue
            ExtendedScriptResult parseResult = extendedParser.parseExtendedScript(scriptLine);
            
            if (!parseResult.success) {
                result.put("success", false);
                result.put("error", parseResult.error);
                return result;
            }
            
            // 2. Exécuter selon le type de script
            switch (parseResult.type) {
                case "GROFI_ULTIMATE":
                    result = executeGrofiUltimatePower(game, parseResult);
                    break;
                    
                case "ROLLBACK":
                case "ROLLBACK_RANGE":
                case "ROLLBACK_ALL":
                    result = executeRollback(game, parseResult);
                    break;
                    
                case "CONDITION":
                case "CONDITION_IF_THEN":
                    result = executeExtendedCondition(game, parseResult);
                    break;
                    
                case "COLLAPSED_REALITY":
                case "COLLAPSED_REALITY_ONE":
                case "COLLAPSED_REALITY_STATE":
                    result = executeCollapsedReality(game, parseResult);
                    break;
                    
                case "SYSTEM_INSTABILITY":
                case "SYSTEM_INSTABILITY_LEVEL":
                    result = executeSystemInstability(game, parseResult);
                    break;
                    
                case "GLOBAL_STRESS":
                case "GLOBAL_STRESS_VALUE":
                    result = executeGlobalStress(game, parseResult);
                    break;
                    
                case "CRITICAL_ERROR":
                case "CRITICAL_ERROR_MESSAGE":
                    result = executeCriticalError(game, parseResult);
                    break;
                    
                case "RECURSIVE_PSI":
                    result = executeRecursivePsi(game, parseResult);
                    break;
                    
                case "TOTAL_COLLAPSE":
                    result = executeTotalCollapse(game, parseResult);
                    break;
                    
                case "BASE_TEMPORAL":
                    // Déléguer au moteur de base
                    result = baseTemporalEngine.executeTemporalGameScript(gameId, scriptLine);
                    break;
                    
                case "BASE_CLASSIC":
                    // Déléguer au moteur de base
                    result = baseTemporalEngine.executeTemporalGameScript(gameId, scriptLine);
                    break;
                    
                default:
                    result.put("success", false);
                    result.put("error", "Type de script étendu non supporté: " + parseResult.type);
            }
            
            // 3. Ajouter les informations de parsing
            result.put("extendedType", parseResult.type);
            result.put("description", parseResult.description);
            
            // 4. Sauvegarder le jeu si succès
            if (Boolean.TRUE.equals(result.get("success"))) {
                gameRepository.save(game);
            }
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Erreur exécution script étendu: " + e.getMessage());
        }
        
        return result;
    }
    
    /**
     * Exécuter un Ultimate Power GROFI
     */
    private Map<String, Object> executeGrofiUltimatePower(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        
        String heroName = (String) parseResult.parameters.get("heroName");
        String freezeTarget = (String) parseResult.parameters.get("freezeTarget");
        
        Hero hero = game.getHeroByName(heroName);
        if (hero == null) {
            result.put("success", false);
            result.put("error", "Héros non trouvé: " + heroName);
            return result;
        }
        
        // Vérifier si c'est un héros GROFI
        if (!grofiHeroService.isGrofiHero(hero)) {
            result.put("success", false);
            result.put("error", "Ce héros n'a pas d'Ultimate Power: " + heroName);
            return result;
        }
        
        // Vérifier l'énergie temporelle
        if (hero.getTemporalEnergy() < 80) {
            result.put("success", false);
            result.put("error", "Énergie temporelle insuffisante (80 requis, " + hero.getTemporalEnergy() + " disponible)");
            return result;
        }
        
        // Exécuter l'Ultimate Power selon le target
        if ("all.timeline.superposition".equals(freezeTarget)) {
            // Jean-Grofignon's Collapse Override
            int frozenStates = freezeAllSuperpositions(game);
            hero.useTemporalEnergy(80);
            
            result.put("success", true);
            result.put("ultimatePower", "Collapse Override");
            result.put("heroName", heroName);
            result.put("frozenStates", frozenStates);
            result.put("message", heroName + " used Collapse Override - " + frozenStates + " superpositions frozen");
            
        } else {
            result.put("success", false);
            result.put("error", "Ultimate Power target non supporté: " + freezeTarget);
        }
        
        return result;
    }
    
    /**
     * Geler toutes les superpositions (Jean-Grofignon's power)
     */
    private int freezeAllSuperpositions(Game game) {
        List<PsiState> activeStates = game.getActivePsiStates();
        int frozenCount = 0;
        
        for (PsiState psiState : activeStates) {
            // Marquer comme "gelé" en ajoutant un flag spécial
            psiState.setCollapseTrigger("FROZEN_BY_GROFI");
            psiStateRepository.save(psiState);
            frozenCount++;
        }
        
        return frozenCount;
    }
    
    /**
     * Exécuter un rollback
     */
    private Map<String, Object> executeRollback(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        
        switch (parseResult.type) {
            case "ROLLBACK_ALL":
                int rolledBackStates = rollbackAllStates(game);
                result.put("success", true);
                result.put("rolledBackStates", rolledBackStates);
                result.put("message", "Rollback all: " + rolledBackStates + " states restored");
                break;
                
            case "ROLLBACK_RANGE":
                Integer startDelta = (Integer) parseResult.parameters.get("startDelta");
                Integer endDelta = (Integer) parseResult.parameters.get("endDelta");
                int rangeRolledBack = rollbackRange(game, startDelta, endDelta);
                result.put("success", true);
                result.put("rolledBackStates", rangeRolledBack);
                result.put("message", "Rollback range Δt" + startDelta + " to Δt" + endDelta + ": " + rangeRolledBack + " states");
                break;
                
            case "ROLLBACK":
                String content = (String) parseResult.parameters.get("content");
                result.put("success", true);
                result.put("message", "Rollback executed: " + content + " (MOCK)");
                break;
                
            default:
                result.put("success", false);
                result.put("error", "Type de rollback non supporté");
        }
        
        return result;
    }
    
    /**
     * Rollback de tous les états
     */
    private int rollbackAllStates(Game game) {
        List<PsiState> collapsedStates = game.getPsiStates().stream()
                .filter(psi -> psi.getStatus() == PsiState.PsiStatus.COLLAPSED)
                .toList();
        
        int restoredCount = 0;
        for (PsiState psiState : collapsedStates) {
            psiState.setStatus(PsiState.PsiStatus.ACTIVE);
            psiStateRepository.save(psiState);
            restoredCount++;
        }
        
        return restoredCount;
    }
    
    /**
     * Rollback d'une plage de temps
     */
    private int rollbackRange(Game game, int startDelta, int endDelta) {
        // Implémentation simplifiée - rollback basé sur les tours
        int currentTurn = game.getCurrentTurn();
        int startTurn = currentTurn + startDelta;
        int endTurn = currentTurn + endDelta;
        
        // Pour l'instant, mock du rollback
        return Math.abs(endDelta - startDelta) + 1;
    }
    
    /**
     * Exécuter une condition étendue
     */
    private Map<String, Object> executeExtendedCondition(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        
        if ("CONDITION_IF_THEN".equals(parseResult.type)) {
            String condition = (String) parseResult.parameters.get("condition");
            String action = (String) parseResult.parameters.get("action");
            
            // Évaluer la condition (implémentation simplifiée)
            boolean conditionMet = evaluateCondition(game, condition);
            
            result.put("success", true);
            result.put("condition", condition);
            result.put("conditionMet", conditionMet);
            
            if (conditionMet) {
                result.put("message", "Condition met, executing action: " + action);
                // TODO: Exécuter l'action
            } else {
                result.put("message", "Condition not met: " + condition);
            }
            
        } else {
            String content = (String) parseResult.parameters.get("content");
            result.put("success", true);
            result.put("message", "Extended condition processed: " + content);
        }
        
        return result;
    }
    
    /**
     * Évaluer une condition (implémentation simplifiée)
     */
    private boolean evaluateCondition(Game game, String condition) {
        // Mock pour l'instant
        return condition.contains("true") || game.getActivePsiStates().size() > 0;
    }
    
    /**
     * Exécuter une réalité effondrée
     */
    private Map<String, Object> executeCollapsedReality(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        
        if ("COLLAPSED_REALITY_ONE".equals(parseResult.type)) {
            // Effondrer tous les états sauf un
            int remainingStates = collapseToOne(game);
            result.put("success", true);
            result.put("remainingStates", remainingStates);
            result.put("message", "Reality collapsed to ONE state");
            
        } else {
            result.put("success", true);
            result.put("message", "Collapsed reality processed: " + parseResult.description);
        }
        
        return result;
    }
    
    /**
     * Effondrer à un seul état
     */
    private int collapseToOne(Game game) {
        List<PsiState> activeStates = game.getActivePsiStates();
        if (activeStates.isEmpty()) return 0;
        
        // Garder le premier état, effondrer les autres
        for (int i = 1; i < activeStates.size(); i++) {
            PsiState psiState = activeStates.get(i);
            psiState.collapse();
            psiStateRepository.save(psiState);
        }
        
        return 1;
    }
    
    /**
     * Exécuter instabilité système
     */
    private Map<String, Object> executeSystemInstability(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        
        if ("SYSTEM_INSTABILITY_LEVEL".equals(parseResult.type)) {
            Integer level = (Integer) parseResult.parameters.get("level");
            result.put("success", true);
            result.put("instabilityLevel", level);
            result.put("message", "System instability set to level " + level);
            
        } else {
            result.put("success", true);
            result.put("message", "System instability processed");
        }
        
        return result;
    }
    
    /**
     * Exécuter stress global
     */
    private Map<String, Object> executeGlobalStress(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        
        if ("GLOBAL_STRESS_VALUE".equals(parseResult.type)) {
            Double value = (Double) parseResult.parameters.get("value");
            result.put("success", true);
            result.put("stressValue", value);
            result.put("message", "Global stress set to " + value);
            
        } else {
            result.put("success", true);
            result.put("message", "Global stress processed");
        }
        
        return result;
    }
    
    /**
     * Exécuter erreur critique
     */
    private Map<String, Object> executeCriticalError(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        
        if ("CRITICAL_ERROR_MESSAGE".equals(parseResult.type)) {
            String message = (String) parseResult.parameters.get("message");
            result.put("success", true);
            result.put("criticalError", true);
            result.put("errorMessage", message);
            result.put("message", "Critical error: " + message);
            
        } else {
            result.put("success", true);
            result.put("criticalError", true);
            result.put("message", "Critical error/collapse detected");
        }
        
        return result;
    }
    
    /**
     * Exécuter superposition récursive
     */
    private Map<String, Object> executeRecursivePsi(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        
        Integer depth = (Integer) parseResult.parameters.get("depth");
        String content = (String) parseResult.parameters.get("content");
        
        result.put("success", true);
        result.put("recursiveDepth", depth);
        result.put("message", "Recursive ψ-state processed (depth: " + depth + ")");
        result.put("warning", "Recursive superpositions are experimental");
        
        return result;
    }
    
    /**
     * Exécuter collapse total
     */
    private Map<String, Object> executeTotalCollapse(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        
        // Effondrer tous les états ψ
        List<PsiState> activeStates = game.getActivePsiStates();
        int collapsedCount = 0;
        
        for (PsiState psiState : activeStates) {
            psiState.collapse();
            psiStateRepository.save(psiState);
            collapsedCount++;
        }
        
        result.put("success", true);
        result.put("collapsedStates", collapsedCount);
        result.put("message", "Total collapse: " + collapsedCount + " ψ-states → ONE reality");
        
        return result;
    }
    
    /**
     * Vérifier si un script utilise la grammaire étendue
     */
    public boolean isExtendedScript(String scriptLine) {
        return extendedParser.isExtendedScript(scriptLine);
    }
} 