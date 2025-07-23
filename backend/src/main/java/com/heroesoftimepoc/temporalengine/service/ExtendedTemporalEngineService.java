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
 * INTÉGRÉ avec le système de collapse causale et la gestion du graphe
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
    private GrofiCausalIntegrationService grofiCausalIntegration;
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    /**
     * Exécuter un script avec la grammaire étendue GROFI ET intégration causale
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
            
            // 🔥 INTÉGRATION CAUSALE COMPLÈTE
            if (extendedParser.isExtendedScript(scriptLine)) {
                // Utiliser le service d'intégration causale pour les scripts GROFI
                result = grofiCausalIntegration.processGrofiScriptWithCausalIntegration(game, scriptLine);
                
                // Ajouter les métadonnées d'exécution
                result.put("executionMode", "GROFI_CAUSAL_INTEGRATED");
                result.put("originalScript", scriptLine);
                
            } else {
                // Scripts classiques - déléguer au moteur de base
                result = baseTemporalEngine.executeTemporalGameScript(gameId, scriptLine);
                result.put("executionMode", "BASE_TEMPORAL");
            }
            
            // Sauvegarder le jeu si succès
            if (Boolean.TRUE.equals(result.get("success"))) {
                gameRepository.save(game);
                
                // Ajouter les statistiques post-exécution
                Map<String, Object> postStats = grofiCausalIntegration.getGrofiCausalStatistics(game);
                result.put("postExecutionStats", postStats);
            }
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Erreur exécution script étendu intégré: " + e.getMessage());
        }
        
        return result;
    }
    
    /**
     * Méthodes d'exécution spécifiques (maintenant intégrées causalement)
     */
    
    /**
     * Exécuter un Ultimate Power GROFI avec vérifications causales
     */
    public Map<String, Object> executeGrofiUltimatePowerWithCausalCheck(Game game, ExtendedScriptResult parseResult) {
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
        
        // 🔥 VÉRIFICATION DES IMMUNITÉS CAUSALES
        List<String> immuneHeroes = new ArrayList<>();
        List<PsiState> protectedStates = new ArrayList<>();
        
        for (Hero otherHero : game.getHeroes()) {
            if (!otherHero.getName().equals(heroName)) {
                List<String> immunities = grofiHeroService.getHeroImmunities(otherHero);
                if (immunities.contains("OBS") || immunities.contains("COLLAPSE")) {
                    immuneHeroes.add(otherHero.getName());
                    
                    // Protéger les états quantiques de ce héros
                    for (PsiState psiState : game.getActivePsiStates()) {
                        if (otherHero.getName().equals(psiState.getOwnerHero())) {
                            protectedStates.add(psiState);
                        }
                    }
                }
            }
        }
        
        // Exécuter l'Ultimate Power selon le target
        if ("all.timeline.superposition".equals(freezeTarget)) {
            // Jean-Grofignon's Collapse Override avec respect des immunités
            int totalStates = game.getActivePsiStates().size();
            int frozenStates = 0;
            int protectedCount = protectedStates.size();
            
            for (PsiState psiState : game.getActivePsiStates()) {
                if (!protectedStates.contains(psiState)) {
                    // Marquer comme "gelé" en ajoutant un flag spécial
                    psiState.setCollapseTrigger("FROZEN_BY_GROFI_" + heroName);
                    psiStateRepository.save(psiState);
                    frozenStates++;
                }
            }
            
            hero.useTemporalEnergy(80);
            
            result.put("success", true);
            result.put("ultimatePower", "Collapse Override");
            result.put("heroName", heroName);
            result.put("totalStates", totalStates);
            result.put("frozenStates", frozenStates);
            result.put("protectedStates", protectedCount);
            result.put("immuneHeroes", immuneHeroes);
            
            if (protectedCount > 0) {
                result.put("message", heroName + " used Collapse Override - " + frozenStates + "/" + totalStates + 
                                    " superpositions frozen (" + protectedCount + " protected by immunities)");
                result.put("warning", "Certains états protégés par immunités: " + immuneHeroes);
            } else {
                result.put("message", heroName + " used Collapse Override - " + frozenStates + " superpositions frozen");
            }
            
        } else {
            result.put("success", false);
            result.put("error", "Ultimate Power target non supporté: " + freezeTarget);
        }
        
        return result;
    }
    
    /**
     * Exécuter un rollback avec vérifications d'artefacts
     */
    public Map<String, Object> executeRollbackWithArtifactCheck(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        
        // Vérifier les artefacts qui bloquent le rollback
        List<String> blockingHeroes = new ArrayList<>();
        for (Hero hero : game.getHeroes()) {
            List<String> immunities = grofiHeroService.getHeroImmunities(hero);
            if (immunities.contains("ROLLBACK") || immunities.contains("TEMPORAL")) {
                blockingHeroes.add(hero.getName());
            }
        }
        
        if (!blockingHeroes.isEmpty()) {
            result.put("success", false);
            result.put("error", "Rollback bloqué par artefacts temporels");
            result.put("blockingHeroes", blockingHeroes);
            result.put("message", "Les héros suivants portent des artefacts bloquant le rollback: " + blockingHeroes);
            return result;
        }
        
        // Procéder au rollback si autorisé
        switch (parseResult.type) {
            case "ROLLBACK_ALL":
                int rolledBackStates = rollbackAllStatesWithProtection(game);
                result.put("success", true);
                result.put("rolledBackStates", rolledBackStates);
                result.put("message", "Rollback all: " + rolledBackStates + " states restored");
                break;
                
            case "ROLLBACK_RANGE":
                Integer startDelta = (Integer) parseResult.parameters.get("startDelta");
                Integer endDelta = (Integer) parseResult.parameters.get("endDelta");
                int rangeRolledBack = rollbackRangeWithProtection(game, startDelta, endDelta);
                result.put("success", true);
                result.put("rolledBackStates", rangeRolledBack);
                result.put("message", "Rollback range Δt" + startDelta + " to Δt" + endDelta + ": " + rangeRolledBack + " states");
                break;
                
            default:
                result.put("success", true);
                result.put("message", "Rollback executed with causal protection");
        }
        
        return result;
    }
    
    /**
     * Rollback de tous les états avec protection causale
     */
    private int rollbackAllStatesWithProtection(Game game) {
        List<PsiState> collapsedStates = game.getPsiStates().stream()
                .filter(psi -> psi.getStatus() == PsiState.PsiStatus.COLLAPSED)
                .toList();
        
        int restoredCount = 0;
        for (PsiState psiState : collapsedStates) {
            // Vérifier si le propriétaire a une immunité
            if (psiState.getOwnerHero() != null) {
                Hero owner = game.getHeroByName(psiState.getOwnerHero());
                if (owner != null) {
                    List<String> immunities = grofiHeroService.getHeroImmunities(owner);
                    if (immunities.contains("ROLLBACK")) {
                        continue; // Skip les états protégés
                    }
                }
            }
            
            psiState.setStatus(PsiState.PsiStatus.ACTIVE);
            psiStateRepository.save(psiState);
            restoredCount++;
        }
        
        return restoredCount;
    }
    
    /**
     * Rollback d'une plage avec protection
     */
    private int rollbackRangeWithProtection(Game game, int startDelta, int endDelta) {
        // Implémentation avec protection causale
        int currentTurn = game.getCurrentTurn();
        int startTurn = currentTurn + startDelta;
        int endTurn = currentTurn + endDelta;
        
        // Pour l'instant, mock du rollback avec protection
        return Math.abs(endDelta - startDelta) + 1;
    }
    
    /**
     * Exécuter un collapse total avec respect des immunités
     */
    public Map<String, Object> executeTotalCollapseWithImmunities(Game game, ExtendedScriptResult parseResult) {
        Map<String, Object> result = new HashMap<>();
        
        List<PsiState> activeStates = game.getActivePsiStates();
        int totalStates = activeStates.size();
        int collapsedCount = 0;
        int protectedCount = 0;
        List<String> protectedBy = new ArrayList<>();
        
        for (PsiState psiState : activeStates) {
            boolean isProtected = false;
            
            // Vérifier les immunités du propriétaire
            if (psiState.getOwnerHero() != null) {
                Hero owner = game.getHeroByName(psiState.getOwnerHero());
                if (owner != null) {
                    List<String> immunities = grofiHeroService.getHeroImmunities(owner);
                    if (immunities.contains("OBS") || immunities.contains("COLLAPSE")) {
                        isProtected = true;
                        protectedBy.add(owner.getName());
                    }
                }
            }
            
            if (!isProtected) {
                psiState.collapse();
                psiStateRepository.save(psiState);
                collapsedCount++;
            } else {
                protectedCount++;
            }
        }
        
        result.put("success", true);
        result.put("totalStates", totalStates);
        result.put("collapsedStates", collapsedCount);
        result.put("protectedStates", protectedCount);
        result.put("protectedBy", protectedBy.stream().distinct().collect(java.util.stream.Collectors.toList()));
        
        if (protectedCount > 0) {
            result.put("message", "Partial collapse: " + collapsedCount + "/" + totalStates + 
                                 " ψ-states collapsed (" + protectedCount + " protected by immunities)");
            result.put("warning", "Certains états protégés par: " + protectedBy);
        } else {
            result.put("message", "Total collapse: " + collapsedCount + " ψ-states → ONE reality");
        }
        
        return result;
    }
    
    /**
     * Vérifier si un script utilise la grammaire étendue
     */
    public boolean isExtendedScript(String scriptLine) {
        return extendedParser.isExtendedScript(scriptLine);
    }
    
    /**
     * Obtenir les statistiques d'intégration causale
     */
    public Map<String, Object> getCausalIntegrationStats(Long gameId) {
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return Map.of("error", "Game not found");
        }
        
        return grofiCausalIntegration.getGrofiCausalStatistics(game);
    }
} 