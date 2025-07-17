package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import com.heroesoftimepoc.temporalengine.repository.PsiStateRepository;
import com.heroesoftimepoc.temporalengine.repository.GameTileRepository;
import com.heroesoftimepoc.temporalengine.service.TemporalScriptParser.ScriptCommand;
import com.heroesoftimepoc.temporalengine.service.TemporalScriptParser.ObservationTrigger;
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
    private TemporalScriptParser scriptParser;
    
    private final Random random = new Random();
    
    /**
     * Execute a script command in the temporal engine
     */
    public Map<String, Object> executeScript(Long gameId, String scriptLine) {
        Game game = gameRepository.findById(gameId).orElseThrow();
        Map<String, Object> result = new HashMap<>();
        
        try {
            if (scriptParser.isTemporalScript(scriptLine)) {
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
        String collapseTarget = scriptParser.parseCollapseCommand(scriptLine);
        if (collapseTarget != null) {
            result = executeCollapse(game, collapseTarget);
            return result;
        }
        
        // Parse observation trigger
        ObservationTrigger observationTrigger = scriptParser.parseObservationTrigger(scriptLine);
        if (observationTrigger != null) {
            result = setupObservationTrigger(game, observationTrigger);
            return result;
        }
        
        // Parse ψ state
        PsiState psiState = scriptParser.parseTemporalScript(scriptLine);
        if (psiState != null) {
            result = createPsiState(game, psiState);
            return result;
        }
        
        result.put("error", "Invalid temporal script");
        return result;
    }
    
    /**
     * Execute a basic script command
     */
    private Map<String, Object> executeBasicScript(Game game, String scriptLine) {
        Map<String, Object> result = new HashMap<>();
        ScriptCommand command = scriptParser.parseBasicScript(scriptLine);
        
        if (command == null) {
            result.put("error", "Invalid script command");
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
            default:
                result.put("error", "Unknown command type: " + command.getType());
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
        }
        
        // Save the ψ state
        psiStateRepository.save(psiState);
        game.addPsiState(psiState);
        
        result.put("psiId", psiState.getPsiId());
        result.put("futureTurn", futureTurn);
        result.put("message", "ψ state created successfully");
        
        return result;
    }
    
    /**
     * Execute a collapse command
     */
    private Map<String, Object> executeCollapse(Game game, String psiId) {
        Map<String, Object> result = new HashMap<>();
        
        PsiState psiState = game.getPsiStates().stream()
                .filter(psi -> psi.getPsiId().equals(psiId) && psi.isActive())
                .findFirst()
                .orElse(null);
        
        if (psiState == null) {
            result.put("error", "ψ state not found or already collapsed: " + psiId);
            return result;
        }
        
        // Execute the action in the ψ state
        String actionResult = executeCollapsedAction(game, psiState);
        
        // Mark as collapsed
        psiState.collapse();
        psiStateRepository.save(psiState);
        
        result.put("psiId", psiId);
        result.put("actionResult", actionResult);
        result.put("message", "ψ state collapsed successfully");
        
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
    private Map<String, Object> setupObservationTrigger(Game game, ObservationTrigger trigger) {
        Map<String, Object> result = new HashMap<>();
        
        // Store the trigger logic (simplified implementation)
        PsiState targetPsi = game.getPsiStates().stream()
                .filter(psi -> psi.getPsiId().equals(trigger.getTargetPsi()))
                .findFirst()
                .orElse(null);
        
        if (targetPsi != null) {
            targetPsi.setCollapseTrigger(trigger.getCondition());
            psiStateRepository.save(targetPsi);
            result.put("message", "Observation trigger set for " + trigger.getTargetPsi());
        } else {
            result.put("error", "Target ψ state not found: " + trigger.getTargetPsi());
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
        result.put("message", "Hero created successfully");
        
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
            return result;
        }
        
        if (!isValidPosition(game, x, y)) {
            result.put("error", "Invalid position: (" + x + "," + y + ")");
            return result;
        }
        
        // Update tile occupancy
        updateTileOccupancy(game, hero, x, y);
        
        // Move hero
        hero.moveTo(x, y);
        heroRepository.save(hero);
        
        result.put("message", String.format("Hero %s moved to (%d,%d)", heroName, x, y));
        
        return result;
    }
    
    /**
     * Create an entity
     */
    private Map<String, Object> createEntity(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String type = params.get("type");
        String name = params.get("name");
        
        if ("ITEM".equals(type)) {
            // Add item to current player's hero (simplified)
            List<Hero> playerHeroes = game.getHeroesByPlayer(game.getCurrentPlayer());
            if (!playerHeroes.isEmpty()) {
                Hero hero = playerHeroes.get(0);
                hero.addItem(name);
                heroRepository.save(hero);
                result.put("message", "Item " + name + " added to " + hero.getName());
            }
        } else {
            result.put("message", "Entity created: " + type + " " + name);
        }
        
        return result;
    }
    
    /**
     * Use an item
     */
    private Map<String, Object> useItem(Game game, Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        
        String itemType = params.get("type");
        String itemName = params.get("item");
        
        // Simplified item usage
        result.put("message", "Used " + itemType + " " + itemName);
        
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
        result.put("message", "Battle completed");
        
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
        
        // Add active ψ states
        List<Map<String, Object>> psiStates = game.getActivePsiStates().stream()
                .map(this::serializePsiState)
                .collect(Collectors.toList());
        result.put("psiStates", psiStates);
        
        // Add tiles with temporal information
        List<Map<String, Object>> tiles = game.getTiles().stream()
                .map(this::serializeTile)
                .collect(Collectors.toList());
        result.put("tiles", tiles);
        
        return result;
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
        psiData.put("probability", psiState.getProbability());
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
}