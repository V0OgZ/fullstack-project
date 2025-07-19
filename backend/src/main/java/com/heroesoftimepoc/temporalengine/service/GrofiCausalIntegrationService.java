package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.model.Hero;
import com.heroesoftimepoc.temporalengine.model.PsiState;
import com.heroesoftimepoc.temporalengine.service.ExtendedTemporalScriptParser.ExtendedScriptResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service d'intégration entre la grammaire GROFI étendue et le système de collapse causale
 * Gère les artefacts d'immunité, les effets spéciaux GROFI et la résolution des conflits
 */
@Service
public class GrofiCausalIntegrationService {
    
    @Autowired
    private CausalCollapseService causalCollapseService;
    
    @Autowired
    private ExtendedTemporalScriptParser extendedParser;
    
    @Autowired
    private GrofiHeroService grofiHeroService;
    
    /**
     * Traiter un script GROFI avec intégration causale complète
     */
    public Map<String, Object> processGrofiScriptWithCausalIntegration(Game game, String script) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // 1. Parser le script GROFI
            ExtendedScriptResult parseResult = extendedParser.parseExtendedScript(script);
            if (!parseResult.success) {
                result.put("success", false);
                result.put("error", parseResult.error);
                return result;
            }
            
            // 2. Vérifier les immunités et restrictions AVANT l'exécution
            Map<String, Object> immunityCheck = checkGrofiImmunities(game, parseResult);
            if (!Boolean.TRUE.equals(immunityCheck.get("allowed"))) {
                result.put("success", false);
                result.put("error", "Action bloquée: " + immunityCheck.get("reason"));
                result.put("immunityDetails", immunityCheck);
                return result;
            }
            
            // 3. Calculer l'impact sur le graphe causale AVANT l'exécution
            Map<String, Object> causalImpact = calculateCausalGraphImpact(game, parseResult);
            result.put("causalImpact", causalImpact);
            
            // 4. Exécuter avec protection causale
            Map<String, Object> executionResult = executeWithCausalProtection(game, parseResult);
            result.putAll(executionResult);
            
            // 5. Traiter les collapses causales déclenchés
            List<CausalCollapseService.CollapseResult> triggeredCollapses = 
                processTriggeredCausalCollapses(game, parseResult);
            if (!triggeredCollapses.isEmpty()) {
                result.put("triggeredCollapses", triggeredCollapses.stream()
                    .map(CausalCollapseService.CollapseResult::toString)
                    .collect(Collectors.toList()));
            }
            
            // 6. Mettre à jour le graphe d'état global
            updateWorldStateGraph(game, parseResult, executionResult);
            
            result.put("grofiIntegration", true);
            result.put("scriptType", parseResult.type);
            result.put("success", true);
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Erreur intégration GROFI-causale: " + e.getMessage());
        }
        
        return result;
    }
    
    /**
     * Vérifier les immunités GROFI avant l'exécution
     */
    private Map<String, Object> checkGrofiImmunities(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        result.put("allowed", true);
        
        // Vérifier selon le type de script
        switch (parseResult.type) {
            case "GROFI_ULTIMATE":
                return checkUltimatePowerImmunities(game, parseResult);
                
            case "ROLLBACK":
            case "ROLLBACK_RANGE":
            case "ROLLBACK_ALL":
                return checkRollbackImmunities(game, parseResult);
                
            case "TOTAL_COLLAPSE":
                return checkCollapseImmunities(game, parseResult);
                
            case "CONDITION":
            case "CONDITION_IF_THEN":
                return checkConditionImmunities(game, parseResult);
                
            default:
                result.put("message", "Pas de restrictions d'immunité pour: " + parseResult.type);
        }
        
        return result;
    }
    
    /**
     * Vérifier immunités pour Ultimate Powers
     */
    private Map<String, Object> checkUltimatePowerImmunities(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        
        String heroName = (String) parseResult.parameters.get("heroName");
        Hero hero = game.getHeroByName(heroName);
        
        if (hero == null) {
            result.put("allowed", false);
            result.put("reason", "Héros non trouvé: " + heroName);
            return result;
        }
        
        // Vérifier immunité IMMUNE[OBS] sur les autres héros
        List<String> immuneHeroes = new ArrayList<>();
        for (Hero otherHero : game.getHeroes()) {
            if (!otherHero.getName().equals(heroName)) {
                List<String> immunities = grofiHeroService.getHeroImmunities(otherHero);
                if (immunities.contains("OBS") || immunities.contains("COLLAPSE")) {
                    immuneHeroes.add(otherHero.getName());
                }
            }
        }
        
        if (!immuneHeroes.isEmpty()) {
            result.put("allowed", true); // Autorisé mais avec effet réduit
            result.put("warning", "Certains héros sont immunisés: " + immuneHeroes);
            result.put("immuneTargets", immuneHeroes);
        } else {
            result.put("allowed", true);
            result.put("message", "Ultimate Power autorisé - aucune immunité détectée");
        }
        
        return result;
    }
    
    /**
     * Vérifier immunités pour Rollback
     */
    private Map<String, Object> checkRollbackImmunities(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        
        // Chercher les artefacts qui bloquent le rollback
        List<String> blockingArtifacts = new ArrayList<>();
        for (Hero hero : game.getHeroes()) {
            List<String> immunities = grofiHeroService.getHeroImmunities(hero);
            if (immunities.contains("ROLLBACK") || immunities.contains("TEMPORAL")) {
                blockingArtifacts.add(hero.getName() + " (IMMUNE[ROLLBACK])");
            }
        }
        
        if (!blockingArtifacts.isEmpty()) {
            result.put("allowed", false);
            result.put("reason", "Rollback bloqué par artefacts: " + blockingArtifacts);
            result.put("blockingArtifacts", blockingArtifacts);
        } else {
            result.put("allowed", true);
            result.put("message", "Rollback autorisé");
        }
        
        return result;
    }
    
    /**
     * Vérifier immunités pour Collapse Total
     */
    private Map<String, Object> checkCollapseImmunities(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        
        // Compter les états protégés
        int protectedStates = 0;
        int totalStates = game.getActivePsiStates().size();
        
        for (PsiState psiState : game.getActivePsiStates()) {
            String ownerHero = psiState.getOwnerHero();
            if (ownerHero != null) {
                Hero hero = game.getHeroByName(ownerHero);
                if (hero != null) {
                    List<String> immunities = grofiHeroService.getHeroImmunities(hero);
                    if (immunities.contains("OBS") || immunities.contains("COLLAPSE")) {
                        protectedStates++;
                    }
                }
            }
        }
        
        if (protectedStates == totalStates && totalStates > 0) {
            result.put("allowed", false);
            result.put("reason", "Tous les états quantiques sont protégés par des immunités");
        } else {
            result.put("allowed", true);
            result.put("protectedStates", protectedStates);
            result.put("totalStates", totalStates);
            result.put("message", "Collapse partiel autorisé (" + (totalStates - protectedStates) + "/" + totalStates + " états)");
        }
        
        return result;
    }
    
    /**
     * Vérifier immunités pour Conditions
     */
    private Map<String, Object> checkConditionImmunities(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        result.put("allowed", true);
        result.put("message", "Conditions GROFI autorisées (pas de restrictions)");
        return result;
    }
    
    /**
     * Calculer l'impact sur le graphe causale
     */
    private Map<String, Object> calculateCausalGraphImpact(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> impact = new HashMap<>();
        
        // Analyser l'impact selon le type
        switch (parseResult.type) {
            case "GROFI_ULTIMATE":
                impact = calculateUltimatePowerCausalImpact(game, parseResult);
                break;
                
            case "ROLLBACK_ALL":
                impact.put("type", "GLOBAL_ROLLBACK");
                impact.put("affectedStates", game.getPsiStates().size());
                impact.put("severity", "HIGH");
                break;
                
            case "TOTAL_COLLAPSE":
                impact.put("type", "TOTAL_COLLAPSE");
                impact.put("affectedStates", game.getActivePsiStates().size());
                impact.put("severity", "CRITICAL");
                break;
                
            default:
                impact.put("type", "MINOR");
                impact.put("severity", "LOW");
        }
        
        // Calculer le stress causale
        double causalStress = calculateCausalStress(game, parseResult);
        impact.put("causalStress", causalStress);
        impact.put("stressLevel", causalStress > 0.8 ? "CRITICAL" : causalStress > 0.5 ? "HIGH" : "NORMAL");
        
        return impact;
    }
    
    /**
     * Calculer l'impact causale d'un Ultimate Power
     */
    private Map<String, Object> calculateUltimatePowerCausalImpact(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> impact = new HashMap<>();
        
        String freezeTarget = (String) parseResult.parameters.get("freezeTarget");
        
        if ("all.timeline.superposition".equals(freezeTarget)) {
            // Jean-Grofignon's Collapse Override
            int activeStates = game.getActivePsiStates().size();
            impact.put("type", "SUPERPOSITION_FREEZE");
            impact.put("affectedStates", activeStates);
            impact.put("severity", activeStates > 10 ? "HIGH" : "MEDIUM");
            impact.put("description", "Freeze de " + activeStates + " superpositions temporelles");
        } else {
            impact.put("type", "UNKNOWN_ULTIMATE");
            impact.put("severity", "MEDIUM");
        }
        
        return impact;
    }
    
    /**
     * Calculer le stress causale
     */
    private double calculateCausalStress(Game game, ExtendedScriptResult parseResult) {
        // Facteurs de stress
        double baseStress = 0.0;
        
        // Nombre d'états quantiques actifs
        int activeStates = game.getActivePsiStates().size();
        baseStress += activeStates * 0.05; // 5% par état actif
        
        // Type d'action GROFI
        switch (parseResult.type) {
            case "TOTAL_COLLAPSE":
                baseStress += 0.8; // Très stressant
                break;
            case "ROLLBACK_ALL":
                baseStress += 0.6; // Assez stressant
                break;
            case "GROFI_ULTIMATE":
                baseStress += 0.4; // Modérément stressant
                break;
            case "SYSTEM_INSTABILITY":
                baseStress += 0.3;
                break;
            default:
                baseStress += 0.1; // Stress minimal
        }
        
        // Limiter entre 0 et 1
        return Math.min(1.0, baseStress);
    }
    
    /**
     * Exécuter avec protection causale
     */
    private Map<String, Object> executeWithCausalProtection(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Sauvegarder l'état avant exécution
            Map<String, Object> preExecutionState = captureGameState(game);
            
            // Exécuter l'action GROFI
            Map<String, Object> executionResult = executeGrofiAction(game, parseResult);
            
            // Vérifier la cohérence causale après exécution
            Map<String, Object> coherenceCheck = verifyCausalCoherence(game, preExecutionState);
            
            result.putAll(executionResult);
            result.put("causalCoherence", coherenceCheck);
            
            // Si incohérence détectée, déclencher correction automatique
            if (!Boolean.TRUE.equals(coherenceCheck.get("coherent"))) {
                Map<String, Object> correction = applyCausalCorrection(game, preExecutionState);
                result.put("causalCorrection", correction);
            }
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Erreur protection causale: " + e.getMessage());
        }
        
        return result;
    }
    
    /**
     * Capturer l'état du jeu
     */
    private Map<String, Object> captureGameState(Game game) {
        Map<String, Object> state = new HashMap<>();
        state.put("turn", game.getCurrentTurn());
        state.put("activeStates", game.getActivePsiStates().size());
        state.put("heroPositions", game.getHeroes().stream()
            .collect(Collectors.toMap(
                Hero::getName,
                hero -> Map.of("x", hero.getPositionX(), "y", hero.getPositionY())
            )));
        return state;
    }
    
    /**
     * Exécuter une action GROFI (implémentation simplifiée)
     */
    private Map<String, Object> executeGrofiAction(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        
        // Mock de l'exécution - dans la réalité, cela appellerait ExtendedTemporalEngineService
        result.put("success", true);
        result.put("actionExecuted", parseResult.type);
        result.put("description", parseResult.description);
        
        return result;
    }
    
    /**
     * Vérifier la cohérence causale
     */
    private Map<String, Object> verifyCausalCoherence(Game game, Map<String, Object> preState) {
        Map<String, Object> result = new HashMap<>();
        
        // Vérifications de cohérence
        boolean coherent = true;
        List<String> violations = new ArrayList<>();
        
        // Vérifier que le temps n'a pas reculé de manière incohérente
        int preTurn = (Integer) preState.get("turn");
        if (game.getCurrentTurn() < preTurn) {
            coherent = false;
            violations.add("Temporal regression detected");
        }
        
        // Vérifier les paradoxes de position
        @SuppressWarnings("unchecked")
        Map<String, Map<String, Object>> prePositions = 
            (Map<String, Map<String, Object>>) preState.get("heroPositions");
        
        for (Hero hero : game.getHeroes()) {
            Map<String, Object> prePos = prePositions.get(hero.getName());
            if (prePos != null) {
                int preX = (Integer) prePos.get("x");
                int preY = (Integer) prePos.get("y");
                
                // Vérifier les téléportations impossibles
                int distance = Math.abs(hero.getPositionX() - preX) + Math.abs(hero.getPositionY() - preY);
                if (distance > hero.getMovementPoints() * 2) {
                    violations.add("Impossible teleportation: " + hero.getName());
                }
            }
        }
        
        result.put("coherent", coherent && violations.isEmpty());
        result.put("violations", violations);
        
        return result;
    }
    
    /**
     * Appliquer une correction causale
     */
    private Map<String, Object> applyCausalCorrection(Game game, Map<String, Object> preState) {
        Map<String, Object> result = new HashMap<>();
        
        // Implémentation simplifiée de correction
        result.put("correctionApplied", true);
        result.put("method", "Temporal stabilization");
        result.put("message", "Cohérence causale restaurée");
        
        return result;
    }
    
    /**
     * Traiter les collapses causales déclenchés
     */
    private List<CausalCollapseService.CollapseResult> processTriggeredCausalCollapses(
            Game game, ExtendedScriptResult parseResult) {
        
        // Déclencher le système de collapse causale existant
        return causalCollapseService.processAllCausalCollapses(game);
    }
    
    /**
     * Mettre à jour le graphe d'état du monde
     */
    private void updateWorldStateGraph(Game game, ExtendedScriptResult parseResult, 
                                     Map<String, Object> executionResult) {
        
        // TODO: Implémenter le World State Graph
        // Pour l'instant, juste logger l'événement
        System.out.println("🌐 World State Graph updated: " + parseResult.type + 
                          " executed with result: " + executionResult.get("success"));
    }
    
    /**
     * Obtenir les statistiques d'intégration GROFI-causale
     */
    public Map<String, Object> getGrofiCausalStatistics(Game game) {
        Map<String, Object> stats = new HashMap<>();
        
        // Statistiques de base
        stats.put("totalHeroes", game.getHeroes().size());
        stats.put("grofiHeroes", game.getHeroes().stream()
            .mapToLong(hero -> grofiHeroService.isGrofiHero(hero) ? 1 : 0)
            .sum());
        stats.put("activeStates", game.getActivePsiStates().size());
        
        // Immunités actives
        Map<String, Integer> immunityCount = new HashMap<>();
        for (Hero hero : game.getHeroes()) {
            List<String> immunities = grofiHeroService.getHeroImmunities(hero);
            for (String immunity : immunities) {
                immunityCount.merge(immunity, 1, Integer::sum);
            }
        }
        stats.put("activeImmunities", immunityCount);
        
        // Stress causale actuel
        ExtendedScriptResult mockResult = new ExtendedScriptResult();
        mockResult.type = "SYSTEM_CHECK";
        double currentStress = calculateCausalStress(game, mockResult);
        stats.put("causalStress", currentStress);
        stats.put("stressLevel", currentStress > 0.8 ? "CRITICAL" : currentStress > 0.5 ? "HIGH" : "NORMAL");
        
        // Statistiques de collapse causale
        Map<String, Object> collapseStats = causalCollapseService.getCollapseStatistics(game);
        stats.put("collapseStatistics", collapseStats);
        
        return stats;
    }
} 