package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import com.heroesoftimepoc.temporalengine.repository.PsiStateRepository;
import com.heroesoftimepoc.temporalengine.repository.GameTileRepository;
import com.heroesoftimepoc.temporalengine.service.TemporalScriptParser.ScriptCommand;
import com.heroesoftimepoc.temporalengine.service.QuantumInterferenceService;
import com.heroesoftimepoc.temporalengine.service.QuantumMigrationService;
import com.heroesoftimepoc.temporalengine.model.ComplexAmplitude;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service amélioré pour le moteur temporal avec nomenclature claire et recherchable
 * 
 * NOMS CLAIRS ET RECHERCHABLES :
 * - executeTemporalGameScript : point d'entrée principal
 * - executeQuantumTemporalScript : pour les scripts quantiques
 * - executeClassicGameScript : pour les scripts classiques
 * - createQuantumTemporalState : créer un état quantique
 * - executeQuantumStateCollapse : effondrement d'état quantique
 * - processQuantumObservationTriggers : traiter les déclencheurs d'observation
 * - updateQuantumTileStates : mettre à jour les états des tuiles
 * - findConflictingQuantumStates : trouver les états en conflit
 * - calculateQuantumInterferenceEffects : calculer les effets d'interférence
 */
@Service
@Transactional
public class TemporalEngineService {
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    @Autowired
    private GameTileRepository gameTileRepository;
    
    @Autowired
    private TemporalScriptParser temporalParser;
    
    @Autowired
    private QuantumInterferenceService quantumInterferenceService;
    
    @Autowired
    private QuantumMigrationService quantumMigrationService;
    
    @Autowired
    private CausalCollapseService causalCollapseService;
    
    @Autowired
    private PerformanceMetricsService performanceMetrics;
    
    @Autowired
    private OptimizedRegexCache regexCache;
    
    @Autowired
    private QuantumLookupTables quantumLookups;
    
    @Autowired
    private ArtifactEffectExecutor artifactEffectExecutor;
    
    private final Random random = new Random();
    
    /**
     * MÉTHODE PRINCIPALE : Exécuter un script de jeu temporal
     * Nom clair et recherchable : executeTemporalGameScript
     */
    public Map<String, Object> executeTemporalGameScript(Long gameId, String scriptLine) {
        return performanceMetrics.measureOperation("executeTemporalGameScript", () -> {
            Optional<Game> gameOpt = gameRepository.findById(gameId);
            if (!gameOpt.isPresent()) {
                Map<String, Object> result = new HashMap<>();
                result.put("success", false);
                result.put("error", "Game not found with ID: " + gameId);
                performanceMetrics.incrementCounter("game_not_found_errors");
                return result;
            }
            Game game = gameOpt.get();
            Map<String, Object> result = new HashMap<>();
            
            try {
                // HOTS Engine - Détection du type de script
                boolean isTemporalScript = performanceMetrics.measureOperation("script_type_detection", 
                    () -> temporalParser.isTemporalScript(scriptLine));
                
                if (isTemporalScript) {
                    result = performanceMetrics.measureOperation("quantum_script_execution", 
                        () -> executeQuantumTemporalScript(game, scriptLine));
                    performanceMetrics.incrementCounter("quantum_scripts_executed");
                } else {
                    result = performanceMetrics.measureOperation("classic_script_execution", 
                        () -> executeClassicGameScript(game, scriptLine));
                    performanceMetrics.incrementCounter("classic_scripts_executed");
                }
                
                // Ne pas continuer si il y a une erreur
                if (result.containsKey("success") && !(Boolean) result.get("success")) {
                    performanceMetrics.incrementCounter("script_execution_errors");
                    return result;
                }
                
                // Traiter les déclencheurs d'observation quantique
                performanceMetrics.measureOperation("quantum_observation_triggers", 
                    () -> { processQuantumObservationTriggers(game); return null; });
                
                // Mettre à jour les états des tuiles quantiques
                performanceMetrics.measureOperation("quantum_tile_updates", 
                    () -> { updateQuantumTileStates(game); return null; });
                
                // Sauvegarder le jeu
                performanceMetrics.measureOperation("game_save", 
                    () -> { gameRepository.save(game); return null; });
                
                result.put("success", true);
                performanceMetrics.incrementCounter("successful_script_executions");
                
            } catch (Exception e) {
                result.put("success", false);
                result.put("error", e.getMessage());
                performanceMetrics.incrementCounter("script_execution_exceptions");
            }
            
            return result;
        });
    }
    
    /**
     * SCRIPT QUANTIQUE : Exécuter un script temporal quantique
     * Nom clair et recherchable : executeQuantumTemporalScript
     */
    private Map<String, Object> executeQuantumTemporalScript(Game game, String scriptLine) {
        Map<String, Object> result = new HashMap<>();
        
        // Parse collapse command
        String collapseTarget = temporalParser.parseCollapseCommand(scriptLine);
        if (collapseTarget != null) {
            result = executeQuantumStateCollapse(game, collapseTarget);
            return result;
        }
        
        // Parse observation trigger
        TemporalScriptParser.ObservationTrigger observationTrigger = temporalParser.parseObservationTrigger(scriptLine);
        if (observationTrigger != null) {
            result = setupQuantumObservationTrigger(game, observationTrigger.getTargetPsi(), observationTrigger.getCondition());
            return result;
        }
        
        // Parse quantum state (ψ state)
        PsiState quantumState = temporalParser.parseTemporalScript(scriptLine);
        if (quantumState != null) {
            result = createQuantumTemporalState(game, quantumState);
            return result;
        }
        
        result.put("error", "Invalid quantum temporal script");
        result.put("success", false);
        return result;
    }
    
    /**
     * SCRIPT CLASSIQUE : Exécuter un script de jeu classique
     * Nom clair et recherchable : executeClassicGameScript
     */
    private Map<String, Object> executeClassicGameScript(Game game, String scriptLine) {
        Map<String, Object> result = new HashMap<>();
        
        // Parse basic command
        ScriptCommand command = temporalParser.parseBasicScript(scriptLine);
        
        if (command == null) {
            result.put("error", "Invalid classic game script command");
            result.put("success", false);
            return result;
        }
        
        switch (command.getType()) {
            case "HERO":
                result = createGameHero(game, (String) command.getParameters());
                break;
            case "MOV":
                result = moveGameHero(game, (Map<String, String>) command.getParameters());
                break;
            case "CREATE":
                result = createGameEntity(game, (Map<String, String>) command.getParameters());
                break;
            case "USE":
                Map<String, String> useParams = (Map<String, String>) command.getParameters();
                String itemType = useParams.get("type");      // "ARTIFACT"
                String itemName = useParams.get("item");      // "quantum_mirror" 
                String target = useParams.get("target");      // "HERO:Tesla"
                
                // 🔥 NOUVEAU : Si c'est un artefact, utiliser l'exécuteur d'effets !
                if ("ARTIFACT".equals(itemType) || "ITEM".equals(itemType)) {
                    Hero hero = findHeroByName(game, extractHeroName(target));
                    if (hero != null) {
                        result = artifactEffectExecutor.executeArtifactEffect(itemName, hero, game);
                        break;
                    }
                }
                
                // Fallback vers l'ancienne logique pour les autres items
                result = useGameItem(game, useParams);
                break;
            case "BATTLE":
                result = executeGameBattle(game, (Map<String, String>) command.getParameters());
                break;
            case "BUILD":
                result = buildGameStructure(game, (Map<String, String>) command.getParameters());
                break;
            case "COLLECT":
                result = collectGameResource(game, (Map<String, String>) command.getParameters());
                break;
            case "RECRUIT":
                result = recruitGameUnit(game, (Map<String, String>) command.getParameters());
                break;
            case "CAST":
                result = castGameSpell(game, (Map<String, String>) command.getParameters());
                break;
            case "LEARN":
                result = learnGameSpell(game, (Map<String, String>) command.getParameters());
                break;
            case "LEVELUP":
                result = levelUpGameHero(game, (Map<String, String>) command.getParameters());
                break;
            case "EXPLORE":
                result = exploreGameTerritory(game, (Map<String, String>) command.getParameters());
                break;
            case "EQUIP":
                result = equipGameArtifact(game, (Map<String, String>) command.getParameters());
                break;
            case "SIEGE":
                result = siegeGameTarget(game, (Map<String, String>) command.getParameters());
                break;
            case "CAPTURE":
                result = captureGameObjective(game, (Map<String, String>) command.getParameters());
                break;
            // Removed duplicate case labels - the methods without "Game" prefix appear to be legacy/deprecated
            // If needed, these can be called as fallbacks within the existing cases above
            default:
                result.put("error", "Unknown command type: " + command.getType());
                result.put("success", false);
                return result;
        }
        
        return result;
    }
    
    /**
     * CRÉER ÉTAT QUANTIQUE : Créer un nouvel état temporal quantique (superposition)
     * Nom clair et recherchable : createQuantumTemporalState
     */
    private Map<String, Object> createQuantumTemporalState(Game game, PsiState quantumState) {
        Map<String, Object> result = new HashMap<>();
        
        // Vérifier si la position est verrouillée
        if (quantumState.getTargetX() != null && quantumState.getTargetY() != null) {
            GameTile tile = game.getTileAt(quantumState.getTargetX(), quantumState.getTargetY());
            if (tile != null && tile.getIsLocked()) {
                result.put("error", "Cannot create quantum temporal state on locked tile");
                result.put("success", false);
                return result;
            }
        }
        
        // Définir la référence du jeu
        quantumState.setGame(game);
        
        // Calculer le tour futur où cela se déclenchera
        int futureTurn = game.getCurrentTurn() + (quantumState.getDeltaT() != null ? quantumState.getDeltaT() : 1);
        
        // Vérifier les conflits avec les états quantiques existants
        List<PsiState> conflicts = findConflictingQuantumStates(game, quantumState);
        if (!conflicts.isEmpty()) {
            result.put("warning", "Potential conflicts detected with existing quantum states");
            result.put("conflicts", conflicts.stream().map(PsiState::getPsiId).collect(Collectors.toList()));
            
            // Calcul des interférences quantiques si applicable
            if (quantumState.isUsingComplexAmplitude()) {
                result = calculateQuantumInterferenceEffects(game, quantumState, result);
            }
        }
        
        // Sauvegarder l'état quantique
        psiStateRepository.save(quantumState);
        game.addPsiState(quantumState);
        
        result.put("quantumStateId", quantumState.getPsiId());
        result.put("futureTurn", futureTurn);
        result.put("usingComplexAmplitude", quantumState.isUsingComplexAmplitude());
        
        if (quantumState.isUsingComplexAmplitude()) {
            result.put("complexAmplitude", quantumState.getComplexAmplitude().toString());
            result.put("probability", quantumState.getComplexAmplitude().getProbability());
        } else {
            result.put("probability", quantumState.getProbability());
        }
        
        result.put("message", "Quantum temporal state " + quantumState.getPsiId() + " created successfully");
        result.put("success", true);
        
        return result;
    }
    
    /**
     * EFFONDREMENT QUANTIQUE : Exécuter l'effondrement d'un état quantique
     * Nom clair et recherchable : executeQuantumStateCollapse
     */
    private Map<String, Object> executeQuantumStateCollapse(Game game, String quantumStateId) {
        Map<String, Object> result = new HashMap<>();
        
        PsiState quantumState = game.getPsiStates().stream()
                .filter(psi -> psi.getPsiId().equals(quantumStateId) && psi.isActive())
                .findFirst()
                .orElse(null);
        
        if (quantumState == null) {
            result.put("error", "Quantum temporal state not found or already collapsed: " + quantumStateId);
            result.put("success", false);
            return result;
        }
        
        // Calcul des interférences avant effondrement si applicable
        if (quantumState.isUsingComplexAmplitude() && quantumState.getTargetX() != null && quantumState.getTargetY() != null) {
            result = calculatePreCollapseInterferenceEffects(game, quantumState, result);
        }
        
        // Exécuter l'action dans l'état quantique
        String actionResult = executeQuantumCollapsedAction(game, quantumState);
        
        // Marquer comme effondré
        quantumState.collapse();
        psiStateRepository.save(quantumState);
        
        result.put("quantumStateId", quantumStateId);
        result.put("actionResult", actionResult);
        result.put("message", "Quantum temporal state " + quantumStateId + " collapsed successfully");
        result.put("success", true);
        
        return result;
    }
    
    /**
     * CALCUL INTERFÉRENCES : Calculer les effets d'interférence quantique
     * Nom clair et recherchable : calculateQuantumInterferenceEffects
     */
    private Map<String, Object> calculateQuantumInterferenceEffects(Game game, PsiState quantumState, Map<String, Object> result) {
        List<PsiState> interferingStates = quantumInterferenceService.findInterferingStates(game, quantumState);
        if (!interferingStates.isEmpty()) {
            QuantumInterferenceService.InterferenceResult interference = 
                quantumInterferenceService.calculateInterferenceAtPosition(game, 
                    quantumState.getTargetX(), quantumState.getTargetY());
            
            result.put("quantumInterference", interference.toString());
            result.put("interferenceType", interference.getType().toString());
            result.put("combinedProbability", interference.getCombinedProbability());
            
            // Calculer les effets sur le jeu
            Map<String, Object> interferenceEffects = 
                quantumInterferenceService.calculateInterferenceEffects(game, interference);
            result.put("interferenceEffects", interferenceEffects);
        }
        return result;
    }
    
    /**
     * CALCUL PRÉ-EFFONDREMENT : Calculer les interférences avant effondrement
     * Nom clair et recherchable : calculatePreCollapseInterferenceEffects
     */
    private Map<String, Object> calculatePreCollapseInterferenceEffects(Game game, PsiState quantumState, Map<String, Object> result) {
        List<PsiState> interferingStates = quantumInterferenceService.findInterferingStates(game, quantumState);
        if (!interferingStates.isEmpty()) {
            QuantumInterferenceService.InterferenceResult interference = 
                quantumInterferenceService.calculateInterferenceAtPosition(game, 
                    quantumState.getTargetX(), quantumState.getTargetY());
            
            result.put("preCollapseInterference", interference.toString());
            
            // Appliquer les effets d'interférence
            Map<String, Object> interferenceEffects = 
                quantumInterferenceService.calculateInterferenceEffects(game, interference);
            result.put("interferenceEffects", interferenceEffects);
            
            // Modifier la probabilité de succès en fonction de l'interférence
            double successModifier = (Double) interferenceEffects.get("successModifier");
            result.put("successModifier", successModifier);
        }
        return result;
    }
    
    /**
     * CONFLITS QUANTIQUES : Trouver les états quantiques en conflit
     * Nom clair et recherchable : findConflictingQuantumStates
     */
    private List<PsiState> findConflictingQuantumStates(Game game, PsiState newQuantumState) {
        // Add null safety check for newQuantumState coordinates
        if (newQuantumState.getTargetX() == null || newQuantumState.getTargetY() == null) {
            return Collections.emptyList();
        }
        
        return game.getActivePsiStates().stream()
                .filter(existing -> 
                    existing.getTargetX() != null && 
                    existing.getTargetY() != null &&
                    existing.getTargetX().equals(newQuantumState.getTargetX()) &&
                    existing.getTargetY().equals(newQuantumState.getTargetY()) &&
                    Objects.equals(existing.getDeltaT(), newQuantumState.getDeltaT())
                )
                .collect(Collectors.toList());
    }
    
    /**
     * DÉCLENCHEURS QUANTIQUES : Traiter les déclencheurs d'observation quantique
     * Nom clair et recherchable : processQuantumObservationTriggers
     */
    private void processQuantumObservationTriggers(Game game) {
        // Cette méthode est maintenant intégrée dans updateQuantumTileStates()
        // via le CausalCollapseService qui gère tous les types de déclencheurs
        
        // Log pour debugging
        Map<String, Object> stats = causalCollapseService.getCollapseStatistics(game);
        System.out.println("📊 Statistiques collapse causale: " + stats);
    }
    
    /**
     * VÉRIFICATION EFFONDREMENT : Vérifier si un état quantique doit s'effondrer
     * Nom clair et recherchable : shouldTriggerQuantumCollapse
     */
    private boolean shouldTriggerQuantumCollapse(Game game, PsiState quantumState) {
        // Implémentation simple : effondrement si un autre héros entre dans la position cible
        if (quantumState.getTargetX() != null && quantumState.getTargetY() != null) {
            GameTile tile = game.getTileAt(quantumState.getTargetX(), quantumState.getTargetY());
            if (tile != null && !tile.isEmpty()) {
                // Vérifier si un occupant n'est pas le propriétaire de cet état quantique
                return tile.getOccupants().stream()
                        .anyMatch(occupant -> !occupant.equals(quantumState.getOwnerHero()));
            }
        }
        return false;
    }
    
    /**
     * CONFIGURATION DÉCLENCHEUR : Configurer un déclencheur d'observation quantique
     * Nom clair et recherchable : setupQuantumObservationTrigger
     */
    private Map<String, Object> setupQuantumObservationTrigger(Game game, String targetQuantumStateId, String condition) {
        Map<String, Object> result = new HashMap<>();
        
        // Stocker la logique de déclenchement (implémentation simplifiée)
        PsiState targetQuantumState = game.getPsiStates().stream()
                .filter(psi -> psi.getPsiId().equals(targetQuantumStateId))
                .findFirst()
                .orElse(null);
        
        if (targetQuantumState != null) {
            targetQuantumState.setCollapseTrigger(condition);
            psiStateRepository.save(targetQuantumState);
            result.put("message", "Quantum observation trigger set for " + targetQuantumStateId);
            result.put("success", true);
        } else {
            result.put("error", "Target quantum state not found: " + targetQuantumStateId);
            result.put("success", false);
        }
        
        return result;
    }
    
    /**
     * MISE À JOUR TUILES : Mettre à jour les états des tuiles quantiques
     * Nom clair et recherchable : updateQuantumTileStates
     */
    private void updateQuantumTileStates(Game game) {
        // 1. Traiter les collapses causales AVANT de mettre à jour les tuiles
        List<CausalCollapseService.CollapseResult> collapseResults = 
            causalCollapseService.processAllCausalCollapses(game);
        
        // Log des collapses pour debugging
        if (!collapseResults.isEmpty()) {
            System.out.println("🌀 Collapses causales détectés:");
            for (CausalCollapseService.CollapseResult result : collapseResults) {
                System.out.println("  - " + result.toString());
            }
        }
        
        // 2. Mettre à jour le drapeau hasPsiStates pour toutes les tuiles
        Map<String, Long> quantumStateCountByPosition = game.getActivePsiStates().stream()
                .filter(psi -> psi.getTargetX() != null && psi.getTargetY() != null)
                .collect(Collectors.groupingBy(
                    psi -> psi.getTargetX() + "," + psi.getTargetY(),
                    Collectors.counting()
                ));
        
        for (GameTile tile : game.getTiles()) {
            String position = tile.getX() + "," + tile.getY();
            boolean hasQuantumStates = quantumStateCountByPosition.getOrDefault(position, 0L) > 0;
            tile.updatePsiStatePresence(hasQuantumStates);
            gameTileRepository.save(tile);
        }
    }
    
    /**
     * ACTION EFFONDRÉE : Exécuter l'action contenue dans un état quantique effondré
     * Nom clair et recherchable : executeQuantumCollapsedAction
     */
    private String executeQuantumCollapsedAction(Game game, PsiState quantumState) {
        String actionType = quantumState.getActionType();
        
        // Gérer actionType null pour la compatibilité descendante
        if (actionType == null) {
            actionType = "MOV"; // Par défaut sur le mouvement
        }
        
        switch (actionType) {
            case "MOV":
                return executeQuantumCollapsedMovement(game, quantumState);
            case "CREATE":
                return executeQuantumCollapsedCreation(game, quantumState);
            case "BATTLE":
                return executeQuantumCollapsedBattle(game, quantumState);
            default:
                return "Unknown action type: " + actionType;
        }
    }
    
    /**
     * MOUVEMENT EFFONDRÉ : Exécuter un mouvement à partir d'un état quantique effondré
     * Nom clair et recherchable : executeQuantumCollapsedMovement
     */
    private String executeQuantumCollapsedMovement(Game game, PsiState quantumState) {
        Hero hero = game.getHeroByName(quantumState.getOwnerHero());
        if (hero == null) {
            return "Hero not found: " + quantumState.getOwnerHero();
        }
        
        int targetX = quantumState.getTargetX();
        int targetY = quantumState.getTargetY();
        
        // Vérifier si le mouvement est valide
        if (!isValidGamePosition(game, targetX, targetY)) {
            return "Invalid target position: (" + targetX + "," + targetY + ")";
        }
        
        // Mettre à jour l'occupation des tuiles
        updateTileOccupancyForHero(game, hero, targetX, targetY);
        
        // Déplacer le héros
        hero.moveTo(targetX, targetY);
        heroRepository.save(hero);
        
        return String.format("Hero %s moved to (%d,%d) via quantum collapse", hero.getName(), targetX, targetY);
    }
    
    /**
     * CRÉATION EFFONDRÉE : Exécuter une création à partir d'un état quantique effondré
     * Nom clair et recherchable : executeQuantumCollapsedCreation
     */
    private String executeQuantumCollapsedCreation(Game game, PsiState quantumState) {
        // Analyser les détails de création à partir de l'expression
        // Ceci est une implémentation simplifiée
        return "Entity created at (" + quantumState.getTargetX() + "," + quantumState.getTargetY() + ") via quantum collapse";
    }
    
    /**
     * BATAILLE EFFONDRÉE : Exécuter une bataille à partir d'un état quantique effondré
     * Nom clair et recherchable : executeQuantumCollapsedBattle
     */
    private String executeQuantumCollapsedBattle(Game game, PsiState quantumState) {
        // Cela implémenterait la logique de bataille
        return "Battle executed via quantum collapse (phantom battle from quantum state)";
    }
    
    // =========================================
    // FONCTIONS HEROES OF MIGHT & MAGIC 3
    // NOMS CLAIRS ET RECHERCHABLES
    // =========================================
    
    /**
     * CRÉER HÉROS : Créer un héros de jeu
     * Nom clair et recherchable : createGameHero
     */
    private Map<String, Object> createGameHero(Game game, String heroName) {
        Map<String, Object> result = new HashMap<>();
        
        Hero hero = new Hero(heroName, 10, 10); // Position par défaut
        hero.setGame(game);
        hero.setPlayerId(game.getCurrentPlayer());
        
        heroRepository.save(hero);
        game.addHero(hero);
        
        result.put("heroName", heroName);
        result.put("message", "Game hero " + heroName + " created successfully");
        result.put("success", true);
        
        return result;
    }
    
    /**
     * DÉPLACER HÉROS : Déplacer un héros de jeu
     * Nom clair et recherchable : moveGameHero
     */
    private Map<String, Object> moveGameHero(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String heroName = params.get("hero");
        int x = Integer.parseInt(params.get("x"));
        int y = Integer.parseInt(params.get("y"));
        
        Hero hero = game.getHeroByName(heroName);
        if (hero == null) {
            result.put("error", "Game hero not found: " + heroName);
            result.put("success", false);
            return result;
        }
        
        if (!isValidGamePosition(game, x, y)) {
            result.put("error", "Invalid game position: (" + x + "," + y + ")");
            result.put("success", false);
            return result;
        }
        
        // Mettre à jour l'occupation des tuiles
        updateTileOccupancyForHero(game, hero, x, y);
        
        // Déplacer le héros
        hero.moveTo(x, y);
        heroRepository.save(hero);
        
        result.put("message", String.format("Game hero %s moved to (%d,%d)", heroName, x, y));
        result.put("success", true);
        
        return result;
    }
    
    /**
     * CRÉER ENTITÉ : Créer une entité de jeu
     * Nom clair et recherchable : createGameEntity
     */
    private Map<String, Object> createGameEntity(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String type = params.get("type");
        String name = params.get("name");
        String xStr = params.get("x");
        String yStr = params.get("y");
        
        if ("ITEM".equals(type)) {
            // Ajouter un objet au héros du joueur actuel (simplifié)
            List<Hero> playerHeroes = game.getHeroesByPlayer(game.getCurrentPlayer());
            if (!playerHeroes.isEmpty()) {
                Hero hero = playerHeroes.get(0);
                hero.addItem(name);
                heroRepository.save(hero);
                result.put("message", "Game item " + name + " added to " + hero.getName());
            }
        } else if ("CREATURE".equals(type) && xStr != null && yStr != null) {
            // Créer une créature à une position spécifique
            int x = Integer.parseInt(xStr);
            int y = Integer.parseInt(yStr);
            result.put("message", "Game creature " + name + " created at (" + x + "," + y + ")");
        } else {
            result.put("message", "Game entity created: " + type + " " + name);
        }
        
        result.put("success", true);
        return result;
    }
    
    /**
     * UTILISER OBJET : Utiliser un objet de jeu
     * Nom clair et recherchable : useGameItem
     */
    private Map<String, Object> useGameItem(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String itemType = params.get("type");
        String itemName = params.get("item");
        String heroParam = params.get("hero");
        
        // Extraire le nom du héros du format HERO:heroName
        String heroName = heroParam != null && heroParam.startsWith("HERO:") ? 
                          heroParam.substring(5) : heroParam;
        
        if (heroName != null) {
            result.put("message", "Game item " + itemName + " used by hero " + heroName);
        } else {
            result.put("message", "Game item used: " + itemType + " " + itemName);
        }
        
        result.put("success", true);
        return result;
    }
    
    /**
     * BATAILLE JEU : Exécuter une bataille de jeu
     * Nom clair et recherchable : executeGameBattle
     */
    private Map<String, Object> executeGameBattle(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String attacker = params.get("attacker");
        String defender = params.get("defender");
        
        // Logique de bataille simplifiée
        boolean attackerWins = random.nextBoolean();
        
        result.put("attacker", attacker);
        result.put("defender", defender);
        result.put("winner", attackerWins ? attacker : defender);
        result.put("message", "Game battle between " + attacker + " and " + defender + " completed");
        result.put("success", true);
        
        return result;
    }
    
    /**
     * CONSTRUIRE STRUCTURE : Construire une structure de jeu
     * Nom clair et recherchable : buildGameStructure
     */
    private Map<String, Object> buildGameStructure(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String type = params.get("type");
        int x = Integer.parseInt(params.get("x"));
        int y = Integer.parseInt(params.get("y"));
        String player = params.get("player");
        
        // Implémentation simple - juste ajouter à la tuile
        GameTile tile = game.getTileAt(x, y);
        if (tile == null) {
            tile = new GameTile(x, y, "grass");
            game.addTile(tile);
        }
        
        tile.buildStructure(type, player);
        gameTileRepository.save(tile);
        
        result.put("success", true);
        result.put("message", "Game structure " + type + " built at @" + x + "," + y + " for player " + player);
        return result;
    }
    
    /**
     * COLLECTER RESSOURCE : Collecter une ressource de jeu
     * Nom clair et recherchable : collectGameResource
     */
    private Map<String, Object> collectGameResource(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String resource = params.get("resource");
        int amount = Integer.parseInt(params.get("amount"));
        String player = params.get("player");
        
        // Implémentation simple - juste enregistrer la collecte
        result.put("success", true);
        result.put("message", "Game resource collected: " + amount + " " + resource + " for player " + player);
        return result;
    }
    
    /**
     * RECRUTER UNITÉ : Recruter une unité de jeu
     * Nom clair et recherchable : recruitGameUnit
     */
    private Map<String, Object> recruitGameUnit(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String unit = params.get("unit");
        int amount = Integer.parseInt(params.get("amount"));
        String hero = params.get("hero");
        
        // Implémentation simple - juste enregistrer le recrutement
        result.put("success", true);
        result.put("message", "Game unit recruited: " + amount + " " + unit + " for hero " + hero);
        return result;
    }
    
    /**
     * LANCER SORT : Lancer un sort de jeu
     * Nom clair et recherchable : castGameSpell
     */
    private Map<String, Object> castGameSpell(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String spell = params.get("spell");
        String target = params.get("target");
        String hero = params.get("hero");
        
        // Implémentation simple - juste enregistrer le lancement de sort
        result.put("success", true);
        result.put("message", "Game spell cast: Hero " + hero + " cast " + spell + " on " + target);
        return result;
    }
    
    /**
     * APPRENDRE SORT : Apprendre un sort de jeu
     * Nom clair et recherchable : learnGameSpell
     */
    private Map<String, Object> learnGameSpell(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String spell = params.get("spell");
        String hero = params.get("hero");
        
        // Implémentation simple - juste enregistrer l'apprentissage de sort
        result.put("success", true);
        result.put("message", "Game spell learned: Hero " + hero + " learned spell " + spell);
        return result;
    }
    
    /**
     * NIVEAU HÉROS : Faire monter un héros de niveau
     * Nom clair et recherchable : levelUpGameHero
     */
    private Map<String, Object> levelUpGameHero(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String hero = params.get("hero");
        String skill = params.get("skill");
        
        // Implémentation simple - juste enregistrer la montée de niveau
        result.put("success", true);
        result.put("message", "Game hero level up: Hero " + hero + " leveled up in skill " + skill);
        return result;
    }
    
    /**
     * EXPLORER TERRITOIRE : Explorer un territoire de jeu
     * Nom clair et recherchable : exploreGameTerritory
     */
    private Map<String, Object> exploreGameTerritory(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String terrain = params.get("terrain");
        int x = Integer.parseInt(params.get("x"));
        int y = Integer.parseInt(params.get("y"));
        String hero = params.get("hero");
        
        // Implémentation simple - juste enregistrer l'exploration
        result.put("success", true);
        result.put("message", "Game territory explored: Hero " + hero + " explored " + terrain + " at @" + x + "," + y);
        return result;
    }
    
    /**
     * ÉQUIPER ARTEFACT : Équiper un artefact de jeu
     * Nom clair et recherchable : equipGameArtifact
     */
    private Map<String, Object> equipGameArtifact(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String artifact = params.get("artifact");
        String hero = params.get("hero");
        
        // Trouver le héros
        Hero targetHero = game.getHeroByName(hero);
        if (targetHero == null) {
            result.put("success", false);
            result.put("error", "Game hero not found: " + hero);
            return result;
        }
        
        // Équiper réellement l'artefact en l'ajoutant à l'inventaire
        targetHero.addItem(artifact);
        heroRepository.save(targetHero);
        
        result.put("success", true);
        result.put("message", "Game artifact equipped: Hero " + hero + " equipped " + artifact);
        return result;
    }
    
    /**
     * ASSIÉGER CIBLE : Assiéger une cible de jeu
     * Nom clair et recherchable : siegeGameTarget
     */
    private Map<String, Object> siegeGameTarget(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String target = params.get("target");
        int x = Integer.parseInt(params.get("x"));
        int y = Integer.parseInt(params.get("y"));
        String hero = params.get("hero");
        
        // Implémentation simple - juste enregistrer le siège
        result.put("success", true);
        result.put("message", "Game target sieged: Hero " + hero + " sieged " + target + " at @" + x + "," + y);
        return result;
    }
    
    /**
     * CAPTURER OBJECTIF : Capturer un objectif de jeu
     * Nom clair et recherchable : captureGameObjective
     */
    private Map<String, Object> captureGameObjective(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String objective = params.get("objective");
        String hero = params.get("hero");
        
        // Implémentation simple - juste enregistrer la capture
        result.put("success", true);
        result.put("message", "Game objective captured: Hero " + hero + " captured objective " + objective);
        return result;
    }
    
    // =========================================
    // FONCTIONS UTILITAIRES AVEC NOMS CLAIRS
    // =========================================
    
    /**
     * POSITION VALIDE : Vérifier si une position de jeu est valide
     * Nom clair et recherchable : isValidGamePosition
     */
    private boolean isValidGamePosition(Game game, int x, int y) {
        return x >= 0 && x < game.getMapWidth() && y >= 0 && y < game.getMapHeight();
    }
    
    /**
     * OCCUPATION TUILE : Mettre à jour l'occupation des tuiles pour un héros
     * Nom clair et recherchable : updateTileOccupancyForHero
     */
    private void updateTileOccupancyForHero(Game game, Hero hero, int newX, int newY) {
        // Supprimer de l'ancienne position
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
     * TOUR SUIVANT : Avancer le tour du jeu et traiter les effets temporels
     * Nom clair et recherchable : advanceGameTurnWithTemporalEffects
     */
    public Map<String, Object> advanceGameTurnWithTemporalEffects(Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow();
        Map<String, Object> result = new HashMap<>();
        
        // Traiter les effets temporels basés sur les tours
        processTurnBasedTemporalEffects(game);
        
        // Avancer le tour
        game.nextTurn();
        
        // Réinitialiser les points de mouvement des héros
        for (Hero hero : game.getHeroes()) {
            hero.resetMovementPoints();
            heroRepository.save(hero);
        }
        
        gameRepository.save(game);
        
        result.put("currentTurn", game.getCurrentTurn());
        result.put("currentPlayer", game.getCurrentPlayer());
        result.put("message", "Game turn advanced successfully with temporal effects");
        
        return result;
    }
    
    /**
     * EFFETS TEMPORELS : Traiter les effets temporels basés sur les tours
     * Nom clair et recherchable : processTurnBasedTemporalEffects
     */
    private void processTurnBasedTemporalEffects(Game game) {
        // Traiter les états quantiques qui doivent se déclencher ce tour
        List<PsiState> toProcess = game.getActivePsiStates().stream()
                .filter(psi -> shouldProcessQuantumStateThisTurn(game, psi))
                .collect(Collectors.toList());
        
        for (PsiState quantumState : toProcess) {
            executeQuantumStateCollapse(game, quantumState.getPsiId());
        }
        
        // Décrémenter les durées de verrouillage
        for (GameTile tile : game.getTiles()) {
            if (tile.getIsLocked()) {
                tile.decrementLockDuration();
                gameTileRepository.save(tile);
            }
        }
    }
    
    /**
     * TRAITEMENT TOUR : Vérifier si un état quantique doit être traité ce tour
     * Nom clair et recherchable : shouldProcessQuantumStateThisTurn
     */
    private boolean shouldProcessQuantumStateThisTurn(Game game, PsiState quantumState) {
        if (quantumState.getDeltaT() == null) return false;
        
        // Calculer quand cet état quantique doit se déclencher
        int targetTurn = game.getCurrentTurn() + quantumState.getDeltaT();
        
        // Pour la simplicité, nous déclencherons au tour exact
        return targetTurn == game.getCurrentTurn();
    }
    
    /**
     * ÉTAT JEU QUANTIQUE : Obtenir l'état du jeu avec les informations temporelles quantiques
     * Nom clair et recherchable : getQuantumGameStateWithTemporalInfo
     */
    public Map<String, Object> getQuantumGameStateWithTemporalInfo(Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow();
        Map<String, Object> result = new HashMap<>();
        
        result.put("gameId", game.getId());
        result.put("gameName", game.getGameName());
        result.put("currentTurn", game.getCurrentTurn());
        result.put("currentPlayer", game.getCurrentPlayer());
        result.put("status", game.getStatus());
        result.put("currentTimeline", game.getCurrentTimeline());
        
        // Ajouter les héros avec informations temporelles
        List<Map<String, Object>> heroes = game.getHeroes().stream()
                .map(this::serializeHeroWithTemporalInfo)
                .collect(Collectors.toList());
        result.put("heroes", heroes);
        
        // Ajouter les états quantiques actifs avec informations quantiques
        List<Map<String, Object>> quantumStates = game.getActivePsiStates().stream()
                .map(this::serializeQuantumStateWithInfo)
                .collect(Collectors.toList());
        result.put("quantumStates", quantumStates);
        
        // Ajouter l'analyse des interférences quantiques
        Map<String, Object> quantumAnalysis = analyzeQuantumInterferencesInGame(game);
        result.put("quantumAnalysis", quantumAnalysis);
        
        // Ajouter les tuiles avec informations temporelles
        List<Map<String, Object>> tiles = game.getTiles().stream()
                .map(this::serializeTileWithTemporalInfo)
                .collect(Collectors.toList());
        result.put("tiles", tiles);
        
        return result;
    }

    /**
     * @deprecated a été remplacé par {@link #getQuantumGameStateWithTemporalInfo(Long)}
     */
    @Deprecated
    public Map<String, Object> getGameState(Long gameId) {
        return getQuantumGameStateWithTemporalInfo(gameId);
    }

    public Map<String, Object> executeScript(Long gameId, String scriptLine) {
        return executeTemporalGameScript(gameId, scriptLine);
    }



    public Map<String, Object> nextTurn(Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow();
        game.nextTurn();
        gameRepository.save(game);
        Map<String, Object> result = new HashMap<>();
        result.put("currentTurn", game.getCurrentTurn());
        result.put("message", "Turn advanced");
        return result;
    }

    public Map<String, Object> migrateToQuantumAmplitudes(Long gameId) {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "Migration completed");
        return result;
    }

    /**
     * ANALYSE INTERFÉRENCES : Analyser les interférences quantiques dans le jeu
     * Nom clair et recherchable : analyzeQuantumInterferencesInGame
     */
    private Map<String, Object> analyzeQuantumInterferencesInGame(Game game) {
        Map<String, Object> analysis = new HashMap<>();
        
        List<PsiState> complexStates = game.getActivePsiStates().stream()
                .filter(PsiState::isUsingComplexAmplitude)
                .collect(Collectors.toList());
        
        analysis.put("totalComplexQuantumStates", complexStates.size());
        analysis.put("totalClassicQuantumStates", game.getActivePsiStates().size() - complexStates.size());
        
        // Trouver les positions avec interférences
        Map<String, List<PsiState>> statesByPosition = complexStates.stream()
                .filter(psi -> psi.getTargetX() != null && psi.getTargetY() != null)
                .collect(Collectors.groupingBy(psi -> psi.getTargetX() + "," + psi.getTargetY()));
        
        List<Map<String, Object>> interferenceZones = new ArrayList<>();
        for (Map.Entry<String, List<PsiState>> entry : statesByPosition.entrySet()) {
            List<PsiState> statesAtPosition = entry.getValue();
            if (statesAtPosition.size() > 1) {
                String[] coords = entry.getKey().split(",");
                int x = Integer.parseInt(coords[0]);
                int y = Integer.parseInt(coords[1]);
                
                QuantumInterferenceService.InterferenceResult interference = 
                    quantumInterferenceService.calculateInterferenceAtPosition(game, x, y);
                
                Map<String, Object> zone = new HashMap<>();
                zone.put("position", Map.of("x", x, "y", y));
                zone.put("quantumStateCount", statesAtPosition.size());
                zone.put("interference", interference.toString());
                zone.put("type", interference.getType().toString());
                zone.put("combinedProbability", interference.getCombinedProbability());
                zone.put("contrast", interference.getContrast());
                
                interferenceZones.add(zone);
            }
        }
        
        analysis.put("interferenceZones", interferenceZones);
        analysis.put("totalInterferenceZones", interferenceZones.size());
        
        return analysis;
    }
    
    /**
     * SÉRIALISATION HÉROS : Sérialiser un héros avec informations temporelles
     * Nom clair et recherchable : serializeHeroWithTemporalInfo
     */
    private Map<String, Object> serializeHeroWithTemporalInfo(Hero hero) {
        Map<String, Object> heroData = new HashMap<>();
        heroData.put("name", hero.getName());
        heroData.put("position", Map.of("x", hero.getPositionX(), "y", hero.getPositionY()));
        heroData.put("timeline", hero.getTimelineBranch());
        heroData.put("status", hero.getStatus());
        heroData.put("health", hero.getHealth());
        heroData.put("temporalEnergy", hero.getTemporalEnergy());
        heroData.put("movementPoints", hero.getMovementPoints());
        heroData.put("inventory", hero.getInventory());
        heroData.put("playerId", hero.getPlayerId());
        return heroData;
    }
    
    /**
     * SÉRIALISATION QUANTIQUE : Sérialiser un état quantique avec informations
     * Nom clair et recherchable : serializeQuantumStateWithInfo
     */
    private Map<String, Object> serializeQuantumStateWithInfo(PsiState quantumState) {
        Map<String, Object> quantumData = new HashMap<>();
        quantumData.put("quantumStateId", quantumState.getPsiId());
        quantumData.put("expression", quantumState.getExpression());
        quantumData.put("branch", quantumState.getBranchId());
        quantumData.put("status", quantumState.getStatus());
        quantumData.put("targetPosition", quantumState.getTargetX() != null ? 
                Map.of("x", quantumState.getTargetX(), "y", quantumState.getTargetY()) : null);
        quantumData.put("deltaT", quantumState.getDeltaT());
        quantumData.put("actionType", quantumState.getActionType());
        quantumData.put("ownerHero", quantumState.getOwnerHero());
        
        // Informations quantiques
        quantumData.put("usingComplexAmplitude", quantumState.isUsingComplexAmplitude());
        if (quantumState.isUsingComplexAmplitude()) {
            ComplexAmplitude amplitude = quantumState.getComplexAmplitude();
            quantumData.put("complexAmplitude", amplitude.toString());
            quantumData.put("realPart", amplitude.getRealPart());
            quantumData.put("imaginaryPart", amplitude.getImaginaryPart());
            quantumData.put("magnitude", amplitude.getMagnitude());
            quantumData.put("phase", amplitude.getPhase());
            quantumData.put("probability", amplitude.getProbability());
        } else {
            quantumData.put("probability", quantumState.getProbability());
        }
        
        return quantumData;
    }
    
    /**
     * SÉRIALISATION TUILE : Sérialiser une tuile avec informations temporelles
     * Nom clair et recherchable : serializeTileWithTemporalInfo
     */
    private Map<String, Object> serializeTileWithTemporalInfo(GameTile tile) {
        Map<String, Object> tileData = new HashMap<>();
        tileData.put("position", Map.of("x", tile.getX(), "y", tile.getY()));
        tileData.put("terrain", tile.getTerrain());
        tileData.put("occupants", tile.getOccupants());
        tileData.put("hasQuantumStates", tile.getHasPsiStates());
        tileData.put("isLocked", tile.getIsLocked());
        tileData.put("building", tile.getBuildingType());
        tileData.put("buildingOwner", tile.getBuildingOwner());
        return tileData;
    }
    
    /**
     * SCÉNARIO INTERFÉRENCE : Créer un scénario d'interférence quantique
     * Nom clair et recherchable : createQuantumInterferenceScenario
     */
    public Map<String, Object> createQuantumInterferenceScenario(Long gameId, int x, int y, 
                                                                List<ComplexAmplitude> amplitudes) {
        Game game = gameRepository.findById(gameId).orElseThrow();
        Map<String, Object> result = new HashMap<>();
        
        List<PsiState> createdQuantumStates = new ArrayList<>();
        
        for (int i = 0; i < amplitudes.size(); i++) {
            ComplexAmplitude amplitude = amplitudes.get(i);
            
            PsiState quantumState = new PsiState();
            quantumState.setPsiId("ψ" + String.format("%03d", game.getPsiStates().size() + i + 1));
            quantumState.setExpression("Quantum interference scenario");
            quantumState.setBranchId("ℬ1");
            quantumState.setTargetX(x);
            quantumState.setTargetY(y);
            quantumState.setComplexAmplitude(amplitude);
            quantumState.setUseComplexAmplitude(true);
            quantumState.setGame(game);
            
            psiStateRepository.save(quantumState);
            game.addPsiState(quantumState);
            createdQuantumStates.add(quantumState);
        }
        
        // Calculer l'interférence résultante
        QuantumInterferenceService.InterferenceResult interference = 
            quantumInterferenceService.calculateInterference(createdQuantumStates);
        
        result.put("createdQuantumStates", createdQuantumStates.stream()
                .map(PsiState::getPsiId)
                .collect(Collectors.toList()));
        result.put("interference", interference.toString());
        result.put("combinedProbability", interference.getCombinedProbability());
        result.put("type", interference.getType().toString());
        
        return result;
    }
    
    /**
     * MIGRATION QUANTIQUE : Migrer le jeu vers les amplitudes quantiques
     * Nom clair et recherchable : migrateGameToQuantumAmplitudes
     */
    public Map<String, Object> migrateGameToQuantumAmplitudes(Long gameId) {
        QuantumMigrationService.MigrationResult migration = 
            quantumMigrationService.migrateGameToComplexAmplitudes(gameId);
        
        Map<String, Object> result = new HashMap<>();
        result.put("migrationResult", migration.toString());
        result.put("migratedQuantumStates", migration.getMigratedStates());
        result.put("skippedQuantumStates", migration.getSkippedStates());
        result.put("errors", migration.getErrors());
        result.put("messages", migration.getMessages());
        result.put("success", migration.isSuccess());
        
        return result;
    }
    
    /**
     * ANALYSE MIGRATION : Obtenir l'analyse de migration quantique
     * Nom clair et recherchable : getQuantumMigrationAnalysis
     */
    public Map<String, Object> getQuantumMigrationAnalysis(Long gameId) {
        return quantumMigrationService.generateMigrationReport(gameId);
    }
    
    /**
     * SCÉNARIO COLLAPSE : Créer un scénario de collapse causale pour démonstration
     * Nom clair et recherchable : createCausalCollapseScenario
     */
    public Map<String, Object> createCausalCollapseScenario(Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow();
        Map<String, Object> result = new HashMap<>();
        
        // Scénario : Arthur vs Lysandrel collision
        PsiState arthurState = new PsiState();
        arthurState.setPsiId("ψ001");
        arthurState.setExpression("⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))");
        arthurState.setBranchId("ℬ1");
        arthurState.setTargetX(15);
        arthurState.setTargetY(15);
        arthurState.setDeltaT(2);
        arthurState.setActionType("MOV");
        arthurState.setOwnerHero("Arthur");
        arthurState.setProbability(0.8);
        arthurState.setGame(game);
        
        PsiState lysandrelState = new PsiState();
        lysandrelState.setPsiId("ψ002");
        lysandrelState.setExpression("⊙(Δt+2 @15,15 ⟶ MOV(Lysandrel, @15,15))");
        lysandrelState.setBranchId("ℬ1");
        lysandrelState.setTargetX(15);
        lysandrelState.setTargetY(15);
        lysandrelState.setDeltaT(2);
        lysandrelState.setActionType("MOV");
        lysandrelState.setOwnerHero("Lysandrel");
        lysandrelState.setProbability(0.6);
        lysandrelState.setGame(game);
        
        // Sauvegarder les états
        psiStateRepository.save(arthurState);
        psiStateRepository.save(lysandrelState);
        game.addPsiState(arthurState);
        game.addPsiState(lysandrelState);
        
        // Avancer le temps pour déclencher le collapse
        game.setCurrentTurn(game.getCurrentTurn() + 2);
        
        // Traiter les collapses causales
        List<CausalCollapseService.CollapseResult> collapseResults = 
            causalCollapseService.processAllCausalCollapses(game);
        
        // Créer le résultat
        result.put("scenario", "Arthur vs Lysandrel collision");
        result.put("arthurState", arthurState.getPsiId());
        result.put("lysandrelState", lysandrelState.getPsiId());
        result.put("collapseResults", collapseResults.stream()
            .map(CausalCollapseService.CollapseResult::toString)
            .collect(Collectors.toList()));
        result.put("winner", collapseResults.isEmpty() ? "None" : 
            collapseResults.get(0).getCollapsedState().getOwnerHero());
        
        // Statistiques
        Map<String, Object> stats = causalCollapseService.getCollapseStatistics(game);
        result.put("statistics", stats);
        
        return result;
    }
    
    // =========================================================================
    // 🔧 MÉTHODES HELPER POUR ARTEFACTS
    // =========================================================================
    
    /**
     * Trouve un héros dans le jeu par son nom
     */
    private Hero findHeroByName(Game game, String heroName) {
        if (heroName == null || heroName.trim().isEmpty()) {
            return null;
        }
        
        return game.getHeroes().stream()
            .filter(hero -> heroName.equals(hero.getName()))
            .findFirst()
            .orElse(null);
    }
    
    /**
     * Extrait le nom du héros depuis une chaîne "HERO:nom"
     */
    private String extractHeroName(String target) {
        if (target == null) {
            return null;
        }
        
        if (target.startsWith("HERO:")) {
            return target.substring(5);
        }
        
        return target; // Fallback au cas où c'est juste le nom
    }
}
