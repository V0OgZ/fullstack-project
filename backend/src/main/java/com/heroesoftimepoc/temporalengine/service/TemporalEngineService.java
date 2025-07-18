package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import com.heroesoftimepoc.temporalengine.repository.PsiStateRepository;
import com.heroesoftimepoc.temporalengine.repository.GameTileRepository;
import com.heroesoftimepoc.temporalengine.service.TemporalScriptParser.ScriptCommand;
import com.heroesoftimepoc.temporalengine.service.TemporalScriptParser.ObservationTrigger;
import com.heroesoftimepoc.temporalengine.service.QuantumInterferenceService;
import com.heroesoftimepoc.temporalengine.service.QuantumMigrationService;
import com.heroesoftimepoc.temporalengine.model.ComplexAmplitude;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

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
    
    private final Random random = new Random();
    
    /**
     * Execute a script command in the temporal engine
     */
    public Map<String, Object> executeScript(Long gameId, String scriptLine) {
        Optional<Game> gameOpt = gameRepository.findById(gameId);
        if (!gameOpt.isPresent()) {
            Map<String, Object> result = new HashMap<>();
            result.put("success", false);
            result.put("error", "Game not found with ID: " + gameId);
            return result;
        }
        Game game = gameOpt.get();
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Utiliser uniquement le parser REGEX
            boolean isTemporalScript = temporalParser.isTemporalScript(scriptLine);
                
            if (isTemporalScript) {
                result = executeTemporalScript(game, scriptLine);
            } else {
                result = executeBasicScript(game, scriptLine);
            }
            
            // Process any triggered observations
            processObservationTriggers(game);
            
            // Update tile states
            updateTileStates(game);
            
            gameRepository.save(game);
            result.put("success", true);
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", e.getMessage());
        }
        
        return result;
    }
    
    /**
     * Execute a temporal script command
     */
    private Map<String, Object> executeTemporalScript(Game game, String scriptLine) {
        Map<String, Object> result = new HashMap<>();
        
        // Parse collapse command
        String collapseTarget = temporalParser.parseCollapseCommand(scriptLine);
        if (collapseTarget != null) {
            result = executeCollapse(game, collapseTarget);
            return result;
        }
        
        // Parse observation trigger
        TemporalScriptParser.ObservationTrigger observationTrigger = temporalParser.parseObservationTrigger(scriptLine);
        if (observationTrigger != null) {
            result = setupObservationTrigger(game, observationTrigger.getTargetPsi(), observationTrigger.getCondition());
            return result;
        }
        
        // Parse ψ state
        PsiState psiState = temporalParser.parseTemporalScript(scriptLine);
        if (psiState != null) {
            result = createPsiState(game, psiState);
            return result;
        }
        
        result.put("error", "Invalid temporal script");
        result.put("success", false);
        return result;
    }
    
    /**
     * Execute a basic script command
     */
    private Map<String, Object> executeBasicScript(Game game, String scriptLine) {
        Map<String, Object> result = new HashMap<>();
        
        // Parse basic command
        ScriptCommand command = temporalParser.parseBasicScript(scriptLine);
        
        if (command == null) {
            result.put("error", "Invalid script command");
            result.put("success", false);
            return result;
        }
        
        switch (command.getType()) {
            case "HERO":
                result = createHero(game, (String) command.getParameters());
                break;
            case "MOV":
                result = moveHero(game, (Map<String, String>) command.getParameters());
                break;
            case "CREATE":
                result = createEntity(game, (Map<String, String>) command.getParameters());
                break;
            case "USE":
                result = useItem(game, (Map<String, String>) command.getParameters());
                break;
            case "BATTLE":
                result = executeBattle(game, (Map<String, String>) command.getParameters());
                break;
            case "BUILD":
                result = buildStructure(game, (Map<String, String>) command.getParameters());
                break;
            case "COLLECT":
                result = collectResource(game, (Map<String, String>) command.getParameters());
                break;
            case "RECRUIT":
                result = recruitUnit(game, (Map<String, String>) command.getParameters());
                break;
            case "CAST":
                result = castSpell(game, (Map<String, String>) command.getParameters());
                break;
            case "LEARN":
                result = learnSpell(game, (Map<String, String>) command.getParameters());
                break;
            case "LEVELUP":
                result = levelUpHero(game, (Map<String, String>) command.getParameters());
                break;
            case "EXPLORE":
                result = exploreTerritory(game, (Map<String, String>) command.getParameters());
                break;
            case "EQUIP":
                result = equipArtifact(game, (Map<String, String>) command.getParameters());
                break;
            case "SIEGE":
                result = siegeTarget(game, (Map<String, String>) command.getParameters());
                break;
            case "CAPTURE":
                result = captureObjective(game, (Map<String, String>) command.getParameters());
                break;
            default:
                result.put("error", "Unknown command type: " + command.getType());
                result.put("success", false);
                return result;
        }
        
        return result;
    }
    
    /**
     * Create a new ψ state (superposition)
     */
    private Map<String, Object> createPsiState(Game game, PsiState psiState) {
        Map<String, Object> result = new HashMap<>();
        
        // Check if position is locked
        if (psiState.getTargetX() != null && psiState.getTargetY() != null) {
            GameTile tile = game.getTileAt(psiState.getTargetX(), psiState.getTargetY());
            if (tile != null && tile.getIsLocked()) {
                result.put("error", "Cannot create ψ state on locked tile");
                result.put("success", false);
                return result;
            }
        }
        
        // Set game reference
        psiState.setGame(game);
        
        // Calculate future turn when this will trigger
        int futureTurn = game.getCurrentTurn() + (psiState.getDeltaT() != null ? psiState.getDeltaT() : 1);
        
        // Check for conflicts with existing ψ states
        List<PsiState> conflicts = findConflictingPsiStates(game, psiState);
        if (!conflicts.isEmpty()) {
            result.put("warning", "Potential conflicts detected with existing ψ states");
            result.put("conflicts", conflicts.stream().map(PsiState::getPsiId).collect(Collectors.toList()));
            
            // Calcul des interférences quantiques si applicable
            if (psiState.isUsingComplexAmplitude()) {
                List<PsiState> interferingStates = quantumInterferenceService.findInterferingStates(game, psiState);
                if (!interferingStates.isEmpty()) {
                    QuantumInterferenceService.InterferenceResult interference = 
                        quantumInterferenceService.calculateInterferenceAtPosition(game, 
                            psiState.getTargetX(), psiState.getTargetY());
                    
                    result.put("quantumInterference", interference.toString());
                    result.put("interferenceType", interference.getType().toString());
                    result.put("combinedProbability", interference.getCombinedProbability());
                    
                    // Calculer les effets sur le jeu
                    Map<String, Object> interferenceEffects = 
                        quantumInterferenceService.calculateInterferenceEffects(game, interference);
                    result.put("interferenceEffects", interferenceEffects);
                }
            }
        }
        
        // Save the ψ state
        psiStateRepository.save(psiState);
        game.addPsiState(psiState);
        
        result.put("psiId", psiState.getPsiId());
        result.put("futureTurn", futureTurn);
        result.put("usingComplexAmplitude", psiState.isUsingComplexAmplitude());
        
        if (psiState.isUsingComplexAmplitude()) {
            result.put("complexAmplitude", psiState.getComplexAmplitude().toString());
            result.put("probability", psiState.getComplexAmplitude().getProbability());
        } else {
            result.put("probability", psiState.getProbability());
        }
        
        result.put("message", "ψ state " + psiState.getPsiId() + " created successfully");
        result.put("success", true);
        
        return result;
    }
    
    /**
     * Execute a collapse command with quantum interference support
     */
    private Map<String, Object> executeCollapse(Game game, String psiId) {
        Map<String, Object> result = new HashMap<>();
        
        PsiState psiState = game.getPsiStates().stream()
                .filter(psi -> psi.getPsiId().equals(psiId) && psi.isActive())
                .findFirst()
                .orElse(null);
        
        if (psiState == null) {
            result.put("error", "ψ state not found or already collapsed: " + psiId);
            result.put("success", false);
            return result;
        }
        
        // Calcul des interférences avant collapse si applicable
        if (psiState.isUsingComplexAmplitude() && psiState.getTargetX() != null && psiState.getTargetY() != null) {
            List<PsiState> interferingStates = quantumInterferenceService.findInterferingStates(game, psiState);
            if (!interferingStates.isEmpty()) {
                QuantumInterferenceService.InterferenceResult interference = 
                    quantumInterferenceService.calculateInterferenceAtPosition(game, 
                        psiState.getTargetX(), psiState.getTargetY());
                
                result.put("preCollapseInterference", interference.toString());
                
                // Appliquer les effets d'interférence
                Map<String, Object> interferenceEffects = 
                    quantumInterferenceService.calculateInterferenceEffects(game, interference);
                result.put("interferenceEffects", interferenceEffects);
                
                // Modifier la probabilité de succès en fonction de l'interférence
                double successModifier = (Double) interferenceEffects.get("successModifier");
                result.put("successModifier", successModifier);
            }
        }
        
        // Execute the action in the ψ state
        String actionResult = executeCollapsedAction(game, psiState);
        
        // Mark as collapsed
        psiState.collapse();
        psiStateRepository.save(psiState);
        
        result.put("psiId", psiId);
        result.put("actionResult", actionResult);
        result.put("message", "ψ state " + psiId + " collapsed successfully");
        result.put("success", true);
        
        return result;
    }
    
    /**
     * Execute the action contained in a collapsed ψ state
     */
    private String executeCollapsedAction(Game game, PsiState psiState) {
        String actionType = psiState.getActionType();
        
        // Handle null actionType for backward compatibility
        if (actionType == null) {
            actionType = "MOV"; // Default to movement
        }
        
        switch (actionType) {
            case "MOV":
                return executeCollapsedMovement(game, psiState);
            case "CREATE":
                return executeCollapsedCreation(game, psiState);
            case "BATTLE":
                return executeCollapsedBattle(game, psiState);
            default:
                return "Unknown action type: " + actionType;
        }
    }
    
    /**
     * Execute a movement from a collapsed ψ state
     */
    private String executeCollapsedMovement(Game game, PsiState psiState) {
        Hero hero = game.getHeroByName(psiState.getOwnerHero());
        if (hero == null) {
            return "Hero not found: " + psiState.getOwnerHero();
        }
        
        int targetX = psiState.getTargetX();
        int targetY = psiState.getTargetY();
        
        // Check if movement is valid
        if (!isValidPosition(game, targetX, targetY)) {
            return "Invalid target position: (" + targetX + "," + targetY + ")";
        }
        
        // Update tile occupancy
        updateTileOccupancy(game, hero, targetX, targetY);
        
        // Move hero
        hero.moveTo(targetX, targetY);
        heroRepository.save(hero);
        
        return String.format("Hero %s moved to (%d,%d)", hero.getName(), targetX, targetY);
    }
    
    /**
     * Execute a creation from a collapsed ψ state
     */
    private String executeCollapsedCreation(Game game, PsiState psiState) {
        // Parse the creation details from the expression
        // This is a simplified implementation
        return "Entity created at (" + psiState.getTargetX() + "," + psiState.getTargetY() + ")";
    }
    
    /**
     * Execute a battle from a collapsed ψ state
     */
    private String executeCollapsedBattle(Game game, PsiState psiState) {
        // This would implement the battle logic
        return "Battle executed (phantom battle from ψ state)";
    }
    
    /**
     * Find conflicting ψ states
     */
    private List<PsiState> findConflictingPsiStates(Game game, PsiState newPsiState) {
        return game.getActivePsiStates().stream()
                .filter(existing -> 
                    existing.getTargetX() != null && 
                    existing.getTargetY() != null &&
                    existing.getTargetX().equals(newPsiState.getTargetX()) &&
                    existing.getTargetY().equals(newPsiState.getTargetY()) &&
                    Objects.equals(existing.getDeltaT(), newPsiState.getDeltaT())
                )
                .collect(Collectors.toList());
    }
    
    /**
     * Process observation triggers
     */
    private void processObservationTriggers(Game game) {
        // This would check for conditions that trigger ψ collapses
        // For now, we'll implement a simple version
        
        List<PsiState> activePsiStates = game.getActivePsiStates();
        for (PsiState psiState : activePsiStates) {
            if (shouldTriggerCollapse(game, psiState)) {
                executeCollapse(game, psiState.getPsiId());
            }
        }
    }
    
    /**
     * Check if a ψ state should collapse based on observations
     */
    private boolean shouldTriggerCollapse(Game game, PsiState psiState) {
        // Simple implementation: collapse if another hero enters the target position
        if (psiState.getTargetX() != null && psiState.getTargetY() != null) {
            GameTile tile = game.getTileAt(psiState.getTargetX(), psiState.getTargetY());
            if (tile != null && !tile.isEmpty()) {
                // Check if any occupant is not the owner of this ψ state
                return tile.getOccupants().stream()
                        .anyMatch(occupant -> !occupant.equals(psiState.getOwnerHero()));
            }
        }
        return false;
    }
    
    /**
     * Setup an observation trigger
     */
    private Map<String, Object> setupObservationTrigger(Game game, String targetPsiId, String condition) {
        Map<String, Object> result = new HashMap<>();
        
        // Store the trigger logic (simplified implementation)
        PsiState targetPsi = game.getPsiStates().stream()
                .filter(psi -> psi.getPsiId().equals(targetPsiId))
                .findFirst()
                .orElse(null);
        
        if (targetPsi != null) {
            targetPsi.setCollapseTrigger(condition);
            psiStateRepository.save(targetPsi);
            result.put("message", "Observation trigger set for " + targetPsiId);
            result.put("success", true);
        } else {
            result.put("error", "Target ψ state not found: " + targetPsiId);
            result.put("success", false);
        }
        
        return result;
    }
    
    /**
     * Create a hero
     */
    private Map<String, Object> createHero(Game game, String heroName) {
        Map<String, Object> result = new HashMap<>();
        
        Hero hero = new Hero(heroName, 10, 10); // Default position
        hero.setGame(game);
        hero.setPlayerId(game.getCurrentPlayer());
        
        heroRepository.save(hero);
        game.addHero(hero);
        
        result.put("heroName", heroName);
        result.put("message", "Hero " + heroName + " created successfully");
        result.put("success", true);
        
        return result;
    }
    
    /**
     * Move a hero
     */
    private Map<String, Object> moveHero(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String heroName = params.get("hero");
        int x = Integer.parseInt(params.get("x"));
        int y = Integer.parseInt(params.get("y"));
        
        Hero hero = game.getHeroByName(heroName);
        if (hero == null) {
            result.put("error", "Hero not found: " + heroName);
            result.put("success", false);
            return result;
        }
        
        if (!isValidPosition(game, x, y)) {
            result.put("error", "Invalid position: (" + x + "," + y + ")");
            result.put("success", false);
            return result;
        }
        
        // Update tile occupancy
        updateTileOccupancy(game, hero, x, y);
        
        // Move hero
        hero.moveTo(x, y);
        heroRepository.save(hero);
        
        result.put("message", String.format("Hero %s moved to (%d,%d)", heroName, x, y));
        result.put("success", true);
        
        return result;
    }
    
    /**
     * Create an entity
     */
    private Map<String, Object> createEntity(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String type = params.get("type");
        String name = params.get("name");
        String xStr = params.get("x");
        String yStr = params.get("y");
        
        if ("ITEM".equals(type)) {
            // Add item to current player's hero (simplified)
            List<Hero> playerHeroes = game.getHeroesByPlayer(game.getCurrentPlayer());
            if (!playerHeroes.isEmpty()) {
                Hero hero = playerHeroes.get(0);
                hero.addItem(name);
                heroRepository.save(hero);
                result.put("message", "Item " + name + " added to " + hero.getName());
            }
        } else if ("CREATURE".equals(type) && xStr != null && yStr != null) {
            // Create creature at specific position
            int x = Integer.parseInt(xStr);
            int y = Integer.parseInt(yStr);
            result.put("message", name + " created at (" + x + "," + y + ")");
        } else {
            result.put("message", "Entity created: " + type + " " + name);
        }
        
        result.put("success", true);
        return result;
    }
    
    /**
     * Use an item
     */
    private Map<String, Object> useItem(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String itemType = params.get("type");
        String itemName = params.get("item");
        String heroParam = params.get("hero");
        
        // Extract hero name from HERO:heroName format
        String heroName = heroParam != null && heroParam.startsWith("HERO:") ? 
                          heroParam.substring(5) : heroParam;
        
        if (heroName != null) {
            result.put("message", itemName + " used by " + heroName);
        } else {
            result.put("message", "Used " + itemType + " " + itemName);
        }
        
        result.put("success", true);
        return result;
    }
    
    /**
     * Execute a battle
     */
    private Map<String, Object> executeBattle(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String attacker = params.get("attacker");
        String defender = params.get("defender");
        
        // Simplified battle logic
        boolean attackerWins = random.nextBoolean();
        
        result.put("attacker", attacker);
        result.put("defender", defender);
        result.put("winner", attackerWins ? attacker : defender);
        result.put("message", "Battle between " + attacker + " and " + defender + " completed");
        result.put("success", true);
        
        return result;
    }
    
    /**
     * Update tile occupancy when a hero moves
     */
    private void updateTileOccupancy(Game game, Hero hero, int newX, int newY) {
        // Remove from old position
        if (hero.getPositionX() != null && hero.getPositionY() != null) {
            GameTile oldTile = game.getTileAt(hero.getPositionX(), hero.getPositionY());
            if (oldTile != null) {
                oldTile.removeOccupant(hero.getName());
                gameTileRepository.save(oldTile);
            }
        }
        
        // Add to new position
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
     * Update tile states based on ψ states
     */
    private void updateTileStates(Game game) {
        // Update hasPsiStates flag for all tiles
        Map<String, Long> psiCountByPosition = game.getActivePsiStates().stream()
                .filter(psi -> psi.getTargetX() != null && psi.getTargetY() != null)
                .collect(Collectors.groupingBy(
                    psi -> psi.getTargetX() + "," + psi.getTargetY(),
                    Collectors.counting()
                ));
        
        for (GameTile tile : game.getTiles()) {
            String position = tile.getX() + "," + tile.getY();
            boolean hasPsi = psiCountByPosition.getOrDefault(position, 0L) > 0;
            tile.updatePsiStatePresence(hasPsi);
            gameTileRepository.save(tile);
        }
    }
    
    /**
     * Check if a position is valid
     */
    private boolean isValidPosition(Game game, int x, int y) {
        return x >= 0 && x < game.getMapWidth() && y >= 0 && y < game.getMapHeight();
    }
    
    /**
     * Advance the game turn and process temporal effects
     */
    public Map<String, Object> nextTurn(Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow();
        Map<String, Object> result = new HashMap<>();
        
        // Process turn-based temporal effects
        processTurnBasedEffects(game);
        
        // Advance turn
        game.nextTurn();
        
        // Reset hero movement points
        for (Hero hero : game.getHeroes()) {
            hero.resetMovementPoints();
            heroRepository.save(hero);
        }
        
        gameRepository.save(game);
        
        result.put("currentTurn", game.getCurrentTurn());
        result.put("currentPlayer", game.getCurrentPlayer());
        result.put("message", "Turn advanced successfully");
        
        return result;
    }
    
    /**
     * Process turn-based temporal effects
     */
    private void processTurnBasedEffects(Game game) {
        // Process ψ states that should trigger this turn
        List<PsiState> toProcess = game.getActivePsiStates().stream()
                .filter(psi -> shouldProcessThisTurn(game, psi))
                .collect(Collectors.toList());
        
        for (PsiState psiState : toProcess) {
            executeCollapse(game, psiState.getPsiId());
        }
        
        // Decrement lock durations
        for (GameTile tile : game.getTiles()) {
            if (tile.getIsLocked()) {
                tile.decrementLockDuration();
                gameTileRepository.save(tile);
            }
        }
    }
    
    /**
     * Check if a ψ state should be processed this turn
     */
    private boolean shouldProcessThisTurn(Game game, PsiState psiState) {
        if (psiState.getDeltaT() == null) return false;
        
        // Calculate when this ψ state should trigger
        int targetTurn = game.getCurrentTurn() + psiState.getDeltaT();
        
        // For simplicity, we'll trigger on the exact turn
        return targetTurn == game.getCurrentTurn();
    }
    
    /**
     * Get game state with temporal information
     */
    // =========================================
    // HEROES OF MIGHT & MAGIC 3 FUNCTIONS
    // =========================================
    
    /**
     * Build a structure (straightforward implementation)
     */
    private Map<String, Object> buildStructure(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String type = params.get("type");
        int x = Integer.parseInt(params.get("x"));
        int y = Integer.parseInt(params.get("y"));
        String player = params.get("player");
        
        // Simple implementation - just add to tile
        GameTile tile = game.getTileAt(x, y);
        if (tile == null) {
            tile = new GameTile(x, y, "grass");
            game.addTile(tile);
        }
        
        tile.buildStructure(type, player);
        gameTileRepository.save(tile);
        
        result.put("success", true);
        result.put("message", "Built " + type + " at @" + x + "," + y + " for " + player);
        return result;
    }
    
    /**
     * Collect resource (straightforward implementation)
     */
    private Map<String, Object> collectResource(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String resource = params.get("resource");
        int amount = Integer.parseInt(params.get("amount"));
        String player = params.get("player");
        
        // Simple implementation - just log the collection
        result.put("success", true);
        result.put("message", "Collected " + amount + " " + resource + " for " + player);
        return result;
    }
    
    /**
     * Recruit unit (straightforward implementation)
     */
    private Map<String, Object> recruitUnit(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String unit = params.get("unit");
        int amount = Integer.parseInt(params.get("amount"));
        String hero = params.get("hero");
        
        // Simple implementation - just log the recruitment
        result.put("success", true);
        result.put("message", "Recruited " + amount + " " + unit + " for hero " + hero);
        return result;
    }
    
    /**
     * Cast spell (straightforward implementation)
     */
    private Map<String, Object> castSpell(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String spell = params.get("spell");
        String target = params.get("target");
        String hero = params.get("hero");
        
        // Simple implementation - just log the spell cast
        result.put("success", true);
        result.put("message", "Hero " + hero + " cast " + spell + " on " + target);
        return result;
    }
    
    /**
     * Learn spell (straightforward implementation)
     */
    private Map<String, Object> learnSpell(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String spell = params.get("spell");
        String hero = params.get("hero");
        
        // Simple implementation - just log the spell learning
        result.put("success", true);
        result.put("message", "Hero " + hero + " learned spell " + spell);
        return result;
    }
    
    /**
     * Level up hero (straightforward implementation)
     */
    private Map<String, Object> levelUpHero(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String hero = params.get("hero");
        String skill = params.get("skill");
        
        // Simple implementation - just log the level up
        result.put("success", true);
        result.put("message", "Hero " + hero + " leveled up in skill " + skill);
        return result;
    }
    
    /**
     * Explore territory (straightforward implementation)
     */
    private Map<String, Object> exploreTerritory(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String terrain = params.get("terrain");
        int x = Integer.parseInt(params.get("x"));
        int y = Integer.parseInt(params.get("y"));
        String hero = params.get("hero");
        
        // Simple implementation - just log the exploration
        result.put("success", true);
        result.put("message", "Hero " + hero + " explored " + terrain + " at @" + x + "," + y);
        return result;
    }
    
    /**
     * Equip artifact (straightforward implementation)
     */
    private Map<String, Object> equipArtifact(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String artifact = params.get("artifact");
        String hero = params.get("hero");
        
        // Simple implementation - just log the equipment
        result.put("success", true);
        result.put("message", "Hero " + hero + " equipped " + artifact);
        return result;
    }
    
    /**
     * Siege target (straightforward implementation)
     */
    private Map<String, Object> siegeTarget(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String target = params.get("target");
        int x = Integer.parseInt(params.get("x"));
        int y = Integer.parseInt(params.get("y"));
        String hero = params.get("hero");
        
        // Simple implementation - just log the siege
        result.put("success", true);
        result.put("message", "Hero " + hero + " sieged " + target + " at @" + x + "," + y);
        return result;
    }
    
    /**
     * Capture objective (straightforward implementation)
     */
    private Map<String, Object> captureObjective(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String objective = params.get("objective");
        String hero = params.get("hero");
        
        // Simple implementation - just log the capture
        result.put("success", true);
        result.put("message", "Hero " + hero + " captured objective " + objective);
        return result;
    }
    
    // =========================================
    // END HEROES OF MIGHT & MAGIC 3 FUNCTIONS
    // =========================================
    
    /**
     * Get game state with quantum temporal information
     */
    public Map<String, Object> getGameState(Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow();
        Map<String, Object> result = new HashMap<>();
        
        result.put("gameId", game.getId());
        result.put("gameName", game.getGameName());
        result.put("currentTurn", game.getCurrentTurn());
        result.put("currentPlayer", game.getCurrentPlayer());
        result.put("status", game.getStatus());
        result.put("currentTimeline", game.getCurrentTimeline());
        
        // Add heroes
        List<Map<String, Object>> heroes = game.getHeroes().stream()
                .map(this::serializeHero)
                .collect(Collectors.toList());
        result.put("heroes", heroes);
        
        // Add active ψ states with quantum information
        List<Map<String, Object>> psiStates = game.getActivePsiStates().stream()
                .map(this::serializePsiState)
                .collect(Collectors.toList());
        result.put("psiStates", psiStates);
        
        // Add quantum interference analysis
        Map<String, Object> quantumAnalysis = analyzeQuantumInterferences(game);
        result.put("quantumAnalysis", quantumAnalysis);
        
        // Add tiles with temporal information
        List<Map<String, Object>> tiles = game.getTiles().stream()
                .map(this::serializeTile)
                .collect(Collectors.toList());
        result.put("tiles", tiles);
        
        return result;
    }
    
    /**
     * Analyze quantum interferences in the game
     */
    private Map<String, Object> analyzeQuantumInterferences(Game game) {
        Map<String, Object> analysis = new HashMap<>();
        
        List<PsiState> complexStates = game.getActivePsiStates().stream()
                .filter(PsiState::isUsingComplexAmplitude)
                .collect(Collectors.toList());
        
        analysis.put("totalComplexStates", complexStates.size());
        analysis.put("totalClassicStates", game.getActivePsiStates().size() - complexStates.size());
        
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
                zone.put("stateCount", statesAtPosition.size());
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
    
    private Map<String, Object> serializeHero(Hero hero) {
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
    
    private Map<String, Object> serializePsiState(PsiState psiState) {
        Map<String, Object> psiData = new HashMap<>();
        psiData.put("psiId", psiState.getPsiId());
        psiData.put("expression", psiState.getExpression());
        psiData.put("branch", psiState.getBranchId());
        psiData.put("status", psiState.getStatus());
        psiData.put("targetPosition", psiState.getTargetX() != null ? 
                Map.of("x", psiState.getTargetX(), "y", psiState.getTargetY()) : null);
        psiData.put("deltaT", psiState.getDeltaT());
        psiData.put("actionType", psiState.getActionType());
        psiData.put("ownerHero", psiState.getOwnerHero());
        
        // Quantum information
        psiData.put("usingComplexAmplitude", psiState.isUsingComplexAmplitude());
        if (psiState.isUsingComplexAmplitude()) {
            ComplexAmplitude amplitude = psiState.getComplexAmplitude();
            psiData.put("complexAmplitude", amplitude.toString());
            psiData.put("realPart", amplitude.getRealPart());
            psiData.put("imaginaryPart", amplitude.getImaginaryPart());
            psiData.put("magnitude", amplitude.getMagnitude());
            psiData.put("phase", amplitude.getPhase());
            psiData.put("probability", amplitude.getProbability());
        } else {
            psiData.put("probability", psiState.getProbability());
        }
        
        return psiData;
    }
    
    private Map<String, Object> serializeTile(GameTile tile) {
        Map<String, Object> tileData = new HashMap<>();
        tileData.put("position", Map.of("x", tile.getX(), "y", tile.getY()));
        tileData.put("terrain", tile.getTerrain());
        tileData.put("occupants", tile.getOccupants());
        tileData.put("hasPsiStates", tile.getHasPsiStates());
        tileData.put("isLocked", tile.getIsLocked());
        tileData.put("building", tile.getBuildingType());
        tileData.put("buildingOwner", tile.getBuildingOwner());
        return tileData;
    }
    
    /**
     * Create quantum interference scenario
     */
    public Map<String, Object> createQuantumInterferenceScenario(Long gameId, int x, int y, 
                                                                List<ComplexAmplitude> amplitudes) {
        Game game = gameRepository.findById(gameId).orElseThrow();
        Map<String, Object> result = new HashMap<>();
        
        List<PsiState> createdStates = new ArrayList<>();
        
        for (int i = 0; i < amplitudes.size(); i++) {
            ComplexAmplitude amplitude = amplitudes.get(i);
            
            PsiState psiState = new PsiState();
            psiState.setPsiId("ψ" + String.format("%03d", game.getPsiStates().size() + i + 1));
            psiState.setExpression("Quantum interference scenario");
            psiState.setBranchId("ℬ1");
            psiState.setTargetX(x);
            psiState.setTargetY(y);
            psiState.setComplexAmplitude(amplitude);
            psiState.setUseComplexAmplitude(true);
            psiState.setGame(game);
            
            psiStateRepository.save(psiState);
            game.addPsiState(psiState);
            createdStates.add(psiState);
        }
        
        // Calculer l'interférence résultante
        QuantumInterferenceService.InterferenceResult interference = 
            quantumInterferenceService.calculateInterference(createdStates);
        
        result.put("createdStates", createdStates.stream()
                .map(PsiState::getPsiId)
                .collect(Collectors.toList()));
        result.put("interference", interference.toString());
        result.put("combinedProbability", interference.getCombinedProbability());
        result.put("type", interference.getType().toString());
        
        return result;
    }
    
    /**
     * Migrate game to quantum amplitudes
     */
    public Map<String, Object> migrateToQuantumAmplitudes(Long gameId) {
        QuantumMigrationService.MigrationResult migration = 
            quantumMigrationService.migrateGameToComplexAmplitudes(gameId);
        
        Map<String, Object> result = new HashMap<>();
        result.put("migrationResult", migration.toString());
        result.put("migratedStates", migration.getMigratedStates());
        result.put("skippedStates", migration.getSkippedStates());
        result.put("errors", migration.getErrors());
        result.put("messages", migration.getMessages());
        result.put("success", migration.isSuccess());
        
        return result;
    }
    
    /**
     * Get quantum migration analysis
     */
    public Map<String, Object> getQuantumMigrationAnalysis(Long gameId) {
        return quantumMigrationService.generateMigrationReport(gameId);
    }
    
    // =========================================
    // END HEROES OF MIGHT & MAGIC 3 FUNCTIONS
    // =========================================
}