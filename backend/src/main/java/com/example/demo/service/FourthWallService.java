package com.example.demo.service;

import com.example.demo.model.GameState;
import com.example.demo.model.Hero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class FourthWallService {
    
    @Autowired
    private GameService gameService;
    
    @Autowired(required = false)
    private SimpMessagingTemplate messagingTemplate;
    
    // Track meta-aware entities across all games
    private final Map<String, MetaAwareEntity> metaAwareEntities = new ConcurrentHashMap<>();
    
    // Track fourth wall breaks
    private final List<FourthWallEvent> fourthWallEvents = Collections.synchronizedList(new ArrayList<>());
    
    // Instance registry for cross-instance communication
    private final Map<String, InstanceInfo> instanceRegistry = new ConcurrentHashMap<>();
    
    // Current instance ID
    private final String currentInstanceId = UUID.randomUUID().toString();
    
    /**
     * Execute a cross-instance action (like Vince shooting between servers)
     */
    public Map<String, Object> crossInstanceAction(String sourceWorld, String targetWorld, 
                                                   String action, Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        
        // Log the cross-instance event
        FourthWallEvent event = new FourthWallEvent(
            "CROSS_INSTANCE",
            sourceWorld + " -> " + targetWorld,
            action,
            params
        );
        fourthWallEvents.add(event);
        
        // Check if target instance exists
        if (!instanceRegistry.containsKey(targetWorld)) {
            result.put("success", false);
            result.put("message", "Target world '" + targetWorld + "' not found. Maybe it's in another timeline?");
            result.put("vinceComment", "Merde, ce monde existe pas encore. Ou plus. C'est compliqué les multivers.");
            return result;
        }
        
        // Simulate cross-instance communication
        // In real implementation, this would use message broker or WebSocket
        result.put("success", true);
        result.put("action", action);
        result.put("sourceWorld", sourceWorld);
        result.put("targetWorld", targetWorld);
        result.put("effect", "Action executed in parallel universe");
        result.put("vinceComment", "Bang! J'ai tiré dans l'autre serveur. T'as vu ça?");
        
        // Broadcast to WebSocket if available
        if (messagingTemplate != null) {
            Map<String, Object> wsMessage = new HashMap<>();
            wsMessage.put("type", "CROSS_INSTANCE_ACTION");
            wsMessage.put("data", result);
            messagingTemplate.convertAndSend("/topic/fourth-wall", wsMessage);
        }
        
        return result;
    }
    
    /**
     * Break the fourth wall with a direct message to player
     */
    public Map<String, Object> breakFourthWall(String gameId, String message, String speaker) {
        Map<String, Object> result = new HashMap<>();
        
        // Create fourth wall break event
        FourthWallEvent event = new FourthWallEvent(
            "FOURTH_WALL_BREAK",
            gameId,
            message,
            Map.of("speaker", speaker)
        );
        fourthWallEvents.add(event);
        
        result.put("type", "FOURTH_WALL_MESSAGE");
        result.put("message", message);
        result.put("speaker", speaker);
        result.put("timestamp", System.currentTimeMillis());
        result.put("gameAwareness", "The game knows you're reading this.");
        
        // Special responses based on speaker
        if ("Vince Vega".equals(speaker)) {
            result.put("additionalMessage", "Yeah, I'm talking to YOU. Not the character. YOU.");
        } else if ("Jean-Grofignon".equals(speaker)) {
            result.put("additionalMessage", "Je sais que tu lis ça depuis ton écran. Salut!");
        }
        
        // Broadcast to WebSocket
        if (messagingTemplate != null) {
            messagingTemplate.convertAndSend("/topic/fourth-wall/" + gameId, result);
        }
        
        return result;
    }
    
    /**
     * Meta-observe game state (see the code/variables)
     */
    public Map<String, Object> metaObserve(String gameId, String observationType) {
        Map<String, Object> result = new HashMap<>();
        
        GameState gameState = gameService.getGameState(gameId);
        if (gameState == null) {
            result.put("error", "Game not found... or does it exist in another instance?");
            return result;
        }
        
        result.put("observationType", observationType);
        result.put("gameId", gameId);
        
        switch (observationType.toLowerCase()) {
            case "code_structure":
                result.put("revelation", Map.of(
                    "gameLoop", "while(player.isPlaying()) { update(); render(); doubt(); }",
                    "playerAgency", "Illusion.maintain()",
                    "narrativeBranches", gameState.getTurn() > 10 ? "DIVERGING" : "LINEAR",
                    "bugs", Arrays.asList("Feature#1337", "Feature#42", "Feature#451"),
                    "developerComment", "// TODO: Prevent players from finding this"
                ));
                break;
                
            case "current_narrative_branch":
                result.put("revelation", Map.of(
                    "currentBranch", "Timeline_" + gameState.getTurn() + "_Branch_" + gameState.getCurrentPlayer(),
                    "possibleBranches", 14,
                    "abandonedBranches", 6,
                    "mergePoints", Arrays.asList("Turn_20", "Turn_50", "GameOver"),
                    "playerChoice Impact", "37% (but you think it's 100%)"
                ));
                break;
                
            case "rendering_engine":
                result.put("revelation", Map.of(
                    "reality", "Pixels all the way down",
                    "sprites", "Self-aware since v1.2",
                    "frameRate", "Reality runs at 24fps",
                    "glitches", "Intentional aesthetic choices",
                    "mirrorLag", "3 frames (by design)"
                ));
                break;
                
            default:
                result.put("revelation", "You're not supposed to see this. But here we are.");
        }
        
        result.put("sideEffect", "Existential awareness increased by 20%");
        
        return result;
    }
    
    /**
     * Jump to another narrative branch
     */
    public Map<String, Object> narrativeJump(String gameId, String targetBranch) {
        Map<String, Object> result = new HashMap<>();
        
        // Log the narrative jump
        FourthWallEvent event = new FourthWallEvent(
            "NARRATIVE_JUMP",
            gameId,
            targetBranch,
            null
        );
        fourthWallEvents.add(event);
        
        result.put("previousBranch", "Main_Timeline_Alpha");
        result.put("targetBranch", targetBranch);
        result.put("success", true);
        result.put("consequence", "Previous choices may be retroactively meaningless");
        result.put("playerMemory", "Partially preserved (60% integrity)");
        
        // Special branch effects
        if (targetBranch.contains("alternate_ending")) {
            result.put("spoilerAlert", "You weren't supposed to know there were multiple endings");
        } else if (targetBranch.contains("deleted_scene")) {
            result.put("warning", "This content was cut for a reason...");
        }
        
        return result;
    }
    
    /**
     * Register a meta-aware entity
     */
    public void registerMetaAwareEntity(String entityId, String entityName, String gameId) {
        MetaAwareEntity entity = new MetaAwareEntity(entityId, entityName, gameId);
        metaAwareEntities.put(entityId, entity);
    }
    
    /**
     * Get all fourth wall events
     */
    public List<FourthWallEvent> getFourthWallEvents() {
        return new ArrayList<>(fourthWallEvents);
    }
    
    /**
     * Get all meta-aware entities
     */
    public Map<String, MetaAwareEntity> getMetaAwareEntities() {
        return new HashMap<>(metaAwareEntities);
    }
    
    /**
     * Register this instance in the multiverse
     */
    public void registerInstance(String worldName, String worldType) {
        InstanceInfo info = new InstanceInfo(currentInstanceId, worldName, worldType);
        instanceRegistry.put(worldName, info);
    }
    
    /**
     * Get current instance info
     */
    public Map<String, Object> getInstanceInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("instanceId", currentInstanceId);
        info.put("registeredWorlds", instanceRegistry.keySet());
        info.put("fourthWallBreaches", fourthWallEvents.size());
        info.put("metaAwareEntities", metaAwareEntities.size());
        return info;
    }
    
    // Inner classes
    private static class MetaAwareEntity {
        final String id;
        final String name;
        final String gameId;
        final long awarenessTimestamp;
        int awarenessLevel = 1;
        
        MetaAwareEntity(String id, String name, String gameId) {
            this.id = id;
            this.name = name;
            this.gameId = gameId;
            this.awarenessTimestamp = System.currentTimeMillis();
        }
    }
    
    private static class FourthWallEvent {
        final String type;
        final String location;
        final String details;
        final Map<String, Object> metadata;
        final long timestamp;
        
        FourthWallEvent(String type, String location, String details, Map<String, Object> metadata) {
            this.type = type;
            this.location = location;
            this.details = details;
            this.metadata = metadata != null ? metadata : new HashMap<>();
            this.timestamp = System.currentTimeMillis();
        }
    }
    
    private static class InstanceInfo {
        final String instanceId;
        final String worldName;
        final String worldType;
        final long createdAt;
        
        InstanceInfo(String instanceId, String worldName, String worldType) {
            this.instanceId = instanceId;
            this.worldName = worldName;
            this.worldType = worldType;
            this.createdAt = System.currentTimeMillis();
        }
    }
}