package com.example.demo.controller;

import com.example.demo.service.GameService;
import com.example.demo.service.GameStateService;
import com.example.demo.model.AIPlayer;
import com.example.demo.repository.AIPlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 🌐 WORLD STATE GRAPH CONTROLLER - UTILISANT AI LIMITED EXISTANTE
 * ===============================================================
 * 
 * Contrôleur pour le World State Graph basé sur l'AI limited avec parcours
 * qui existe déjà dans le système. Utilise AIPlayer.decisionHistory pour
 * construire le graphe d'état du monde.
 * 
 * JEAN: "TRICK ! On a déjà l'AI limited qui utilise un parcours dans regardde !"
 * ARCHITECTURE: Réutilise AIPlayer + AIDecision + AIGoal existants
 * STATUS: ✅ CRÉÉ - Basé sur infrastructure AI existante
 */
@RestController
@RequestMapping("/api/world-state-graph")
@CrossOrigin(origins = "http://localhost:3000")
public class WorldStateGraphController {

    @Autowired
    private GameService gameService;
    
    @Autowired
    private GameStateService gameStateService;
    
    @Autowired
    private AIPlayerRepository aiPlayerRepository;
    
    // Cache pour les graphes d'état calculés
    private final Map<String, Map<String, Object>> worldStateGraphs = new ConcurrentHashMap<>();
    
    // ======================
    // WORLD STATE GRAPH API
    // ======================
    
    /**
     * Obtenir le World State Graph complet pour une partie
     */
    @GetMapping("/games/{gameId}")
    public ResponseEntity<Map<String, Object>> getWorldStateGraph(@PathVariable String gameId) {
        try {
            Map<String, Object> worldGraph = buildWorldStateGraph(gameId);
            return ResponseEntity.ok(worldGraph);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Failed to build World State Graph: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Obtenir les nœuds d'état pour un joueur spécifique
     */
    @GetMapping("/games/{gameId}/players/{playerId}/states")
    public ResponseEntity<Map<String, Object>> getPlayerStateNodes(
            @PathVariable String gameId, 
            @PathVariable String playerId) {
        try {
            Map<String, Object> playerStates = buildPlayerStateNodes(gameId, playerId);
            return ResponseEntity.ok(playerStates);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Failed to get player states: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Obtenir le parcours de décision d'une AI
     */
    @GetMapping("/games/{gameId}/ai/{aiPlayerId}/decision-path")
    public ResponseEntity<Map<String, Object>> getAIDecisionPath(
            @PathVariable String gameId,
            @PathVariable String aiPlayerId) {
        try {
            Optional<AIPlayer> aiPlayerOpt = aiPlayerRepository.findByAiPlayerId(aiPlayerId);
            if (!aiPlayerOpt.isPresent()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "AI Player not found: " + aiPlayerId
                ));
            }
            
            AIPlayer aiPlayer = aiPlayerOpt.get();
            Map<String, Object> decisionPath = buildAIDecisionPath(aiPlayer);
            return ResponseEntity.ok(decisionPath);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Failed to get AI decision path: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Analyser les connexions entre états
     */
    @GetMapping("/games/{gameId}/state-connections")
    public ResponseEntity<Map<String, Object>> getStateConnections(@PathVariable String gameId) {
        try {
            Map<String, Object> connections = analyzeStateConnections(gameId);
            return ResponseEntity.ok(connections);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Failed to analyze state connections: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Prédire le prochain état basé sur l'historique AI
     */
    @PostMapping("/games/{gameId}/predict-next-state")
    public ResponseEntity<Map<String, Object>> predictNextState(
            @PathVariable String gameId,
            @RequestBody Map<String, Object> currentState) {
        try {
            Map<String, Object> prediction = predictNextGameState(gameId, currentState);
            return ResponseEntity.ok(prediction);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Failed to predict next state: " + e.getMessage()
            ));
        }
    }
    
    // ======================
    // CONSTRUCTION DU GRAPHE
    // ======================
    
    private Map<String, Object> buildWorldStateGraph(String gameId) {
        Map<String, Object> worldGraph = new HashMap<>();
        
        // Récupérer l'état actuel du jeu
        Map<String, Object> currentGame = gameService.getGame(gameId);
        
        // Récupérer tous les joueurs AI pour ce jeu
        List<AIPlayer> aiPlayers = aiPlayerRepository.findByGameId(gameId);
        
        // Construire les nœuds d'état
        List<Map<String, Object>> stateNodes = new ArrayList<>();
        List<Map<String, Object>> stateEdges = new ArrayList<>();
        
        // Nœud d'état actuel
        Map<String, Object> currentStateNode = createStateNode("current", currentGame);
        stateNodes.add(currentStateNode);
        
        // Construire les nœuds basés sur l'historique des décisions AI
        for (AIPlayer aiPlayer : aiPlayers) {
            List<Map<String, Object>> aiStateNodes = buildAIStateNodes(aiPlayer);
            stateNodes.addAll(aiStateNodes);
            
            // Créer les connexions entre états
            List<Map<String, Object>> aiEdges = buildAIStateEdges(aiPlayer);
            stateEdges.addAll(aiEdges);
        }
        
        worldGraph.put("gameId", gameId);
        worldGraph.put("timestamp", new Date());
        worldGraph.put("nodes", stateNodes);
        worldGraph.put("edges", stateEdges);
        worldGraph.put("totalNodes", stateNodes.size());
        worldGraph.put("totalEdges", stateEdges.size());
        worldGraph.put("aiPlayersCount", aiPlayers.size());
        
        // Mettre en cache
        worldStateGraphs.put(gameId, worldGraph);
        
        return worldGraph;
    }
    
    private Map<String, Object> createStateNode(String nodeId, Map<String, Object> gameState) {
        Map<String, Object> node = new HashMap<>();
        node.put("id", nodeId);
        node.put("type", "game_state");
        node.put("timestamp", new Date());
        
        // Extraire les informations clés de l'état
        node.put("currentTurn", gameState.get("turn"));
        node.put("currentPlayer", gameState.get("currentPlayer"));
        node.put("gameStatus", gameState.get("gameStatus"));
        
        // Compter les ressources totales
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> players = (List<Map<String, Object>>) gameState.get("players");
        if (players != null) {
            int totalGold = 0;
            int totalUnits = 0;
            
            for (Map<String, Object> player : players) {
                @SuppressWarnings("unchecked")
                Map<String, Integer> resources = (Map<String, Integer>) player.get("resources");
                if (resources != null && resources.get("gold") != null) {
                    totalGold += resources.get("gold");
                }
                
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> heroes = (List<Map<String, Object>>) player.get("heroes");
                if (heroes != null) {
                    totalUnits += heroes.size();
                }
            }
            
            node.put("totalGold", totalGold);
            node.put("totalUnits", totalUnits);
            node.put("playersCount", players.size());
        }
        
        return node;
    }
    
    private List<Map<String, Object>> buildAIStateNodes(AIPlayer aiPlayer) {
        List<Map<String, Object>> nodes = new ArrayList<>();
        
        // Créer des nœuds basés sur l'historique des décisions
        for (AIPlayer.AIDecision decision : aiPlayer.getDecisionHistory()) {
            Map<String, Object> node = new HashMap<>();
            node.put("id", "decision_" + decision.getDecisionId());
            node.put("type", "ai_decision");
            node.put("aiPlayerId", aiPlayer.getAiPlayerId());
            node.put("decisionType", decision.getDecisionType());
            node.put("timestamp", decision.getDecisionTimestamp());
            node.put("outcome", decision.getDecisionOutcome());
            node.put("score", decision.getDecisionScore());
            node.put("rationale", decision.getDecisionRationale());
            
            // Ajouter les paramètres de la personnalité AI
            Map<String, Object> aiContext = new HashMap<>();
            aiContext.put("personality", aiPlayer.getAiPersonality());
            aiContext.put("difficulty", aiPlayer.getDifficultyLevel());
            aiContext.put("aggressionLevel", aiPlayer.getAggressionLevel());
            aiContext.put("economicFocus", aiPlayer.getEconomicFocus());
            aiContext.put("militaryFocus", aiPlayer.getMilitaryFocus());
            node.put("aiContext", aiContext);
            
            nodes.add(node);
        }
        
        return nodes;
    }
    
    private List<Map<String, Object>> buildAIStateEdges(AIPlayer aiPlayer) {
        List<Map<String, Object>> edges = new ArrayList<>();
        List<AIPlayer.AIDecision> decisions = aiPlayer.getDecisionHistory();
        
        // Créer des connexions entre décisions consécutives
        for (int i = 0; i < decisions.size() - 1; i++) {
            AIPlayer.AIDecision currentDecision = decisions.get(i);
            AIPlayer.AIDecision nextDecision = decisions.get(i + 1);
            
            Map<String, Object> edge = new HashMap<>();
            edge.put("id", "edge_" + currentDecision.getDecisionId() + "_" + nextDecision.getDecisionId());
            edge.put("source", "decision_" + currentDecision.getDecisionId());
            edge.put("target", "decision_" + nextDecision.getDecisionId());
            edge.put("type", "decision_sequence");
            edge.put("weight", calculateDecisionWeight(currentDecision, nextDecision));
            
            edges.add(edge);
        }
        
        return edges;
    }
    
    private double calculateDecisionWeight(AIPlayer.AIDecision from, AIPlayer.AIDecision to) {
        // Calculer le poids basé sur le type de décision et le succès
        double baseWeight = 1.0;
        
        // Augmenter le poids si les deux décisions ont réussi
        if ("success".equals(from.getDecisionOutcome()) && "success".equals(to.getDecisionOutcome())) {
            baseWeight += 0.5;
        }
        
        // Ajuster selon le type de décision
        if (from.getDecisionType().equals(to.getDecisionType())) {
            baseWeight += 0.3; // Bonus pour les séquences du même type
        }
        
        return baseWeight;
    }
    
    private Map<String, Object> buildPlayerStateNodes(String gameId, String playerId) {
        Map<String, Object> playerStates = new HashMap<>();
        Map<String, Object> game = gameService.getGame(gameId);
        
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> players = (List<Map<String, Object>>) game.get("players");
        
        Map<String, Object> targetPlayer = null;
        for (Map<String, Object> player : players) {
            if (playerId.equals(player.get("id"))) {
                targetPlayer = player;
                break;
            }
        }
        
        if (targetPlayer != null) {
            playerStates.put("playerId", playerId);
            playerStates.put("resources", targetPlayer.get("resources"));
            playerStates.put("heroes", targetPlayer.get("heroes"));
            playerStates.put("buildings", targetPlayer.get("buildings"));
            playerStates.put("isActive", targetPlayer.get("isActive"));
            
            // Calculer des métriques d'état
            @SuppressWarnings("unchecked")
            Map<String, Integer> resources = (Map<String, Integer>) targetPlayer.get("resources");
            if (resources != null) {
                int totalResources = resources.values().stream().mapToInt(Integer::intValue).sum();
                playerStates.put("totalResourceValue", totalResources);
            }
        }
        
        return playerStates;
    }
    
    private Map<String, Object> buildAIDecisionPath(AIPlayer aiPlayer) {
        Map<String, Object> decisionPath = new HashMap<>();
        
        decisionPath.put("aiPlayerId", aiPlayer.getAiPlayerId());
        decisionPath.put("playerName", aiPlayer.getPlayerName());
        decisionPath.put("personality", aiPlayer.getAiPersonality());
        decisionPath.put("difficulty", aiPlayer.getDifficultyLevel());
        
        // Statistiques de performance
        decisionPath.put("totalDecisions", aiPlayer.getDecisionHistory().size());
        decisionPath.put("successRate", aiPlayer.getSuccessRate());
        decisionPath.put("averageDecisionTime", aiPlayer.getAverageDecisionTime());
        
        // Historique des décisions avec analyse
        List<Map<String, Object>> analyzedDecisions = new ArrayList<>();
        for (AIPlayer.AIDecision decision : aiPlayer.getDecisionHistory()) {
            Map<String, Object> analyzedDecision = new HashMap<>();
            analyzedDecision.put("decisionId", decision.getDecisionId());
            analyzedDecision.put("type", decision.getDecisionType());
            analyzedDecision.put("outcome", decision.getDecisionOutcome());
            analyzedDecision.put("score", decision.getDecisionScore());
            analyzedDecision.put("timestamp", decision.getDecisionTimestamp());
            analyzedDecision.put("rationale", decision.getDecisionRationale());
            
            analyzedDecisions.add(analyzedDecision);
        }
        decisionPath.put("decisionHistory", analyzedDecisions);
        
        // Objectifs actuels
        List<Map<String, Object>> currentGoals = new ArrayList<>();
        for (AIPlayer.AIGoal goal : aiPlayer.getCurrentGoals()) {
            Map<String, Object> goalInfo = new HashMap<>();
            goalInfo.put("goalId", goal.getGoalId());
            goalInfo.put("type", goal.getGoalType());
            goalInfo.put("priority", goal.getGoalPriority());
            goalInfo.put("progress", goal.getGoalProgress());
            goalInfo.put("status", goal.getGoalStatus());
            goalInfo.put("description", goal.getGoalDescription());
            
            currentGoals.add(goalInfo);
        }
        decisionPath.put("currentGoals", currentGoals);
        
        return decisionPath;
    }
    
    private Map<String, Object> analyzeStateConnections(String gameId) {
        Map<String, Object> connections = new HashMap<>();
        List<AIPlayer> aiPlayers = aiPlayerRepository.findByGameId(gameId);
        
        int totalConnections = 0;
        Map<String, Integer> connectionTypes = new HashMap<>();
        
        for (AIPlayer aiPlayer : aiPlayers) {
            List<AIPlayer.AIDecision> decisions = aiPlayer.getDecisionHistory();
            
            for (int i = 0; i < decisions.size() - 1; i++) {
                totalConnections++;
                String connectionType = decisions.get(i).getDecisionType() + "_to_" + decisions.get(i + 1).getDecisionType();
                connectionTypes.merge(connectionType, 1, Integer::sum);
            }
        }
        
        connections.put("totalConnections", totalConnections);
        connections.put("connectionTypes", connectionTypes);
        connections.put("aiPlayersAnalyzed", aiPlayers.size());
        
        return connections;
    }
    
    private Map<String, Object> predictNextGameState(String gameId, Map<String, Object> currentState) {
        Map<String, Object> prediction = new HashMap<>();
        List<AIPlayer> aiPlayers = aiPlayerRepository.findByGameId(gameId);
        
        // Analyser les patterns de décision pour prédire
        Map<String, Double> decisionProbabilities = new HashMap<>();
        
        for (AIPlayer aiPlayer : aiPlayers) {
            if (aiPlayer.getIsTurnActive()) {
                // Analyser l'historique pour prédire la prochaine action
                List<AIPlayer.AIDecision> recentDecisions = aiPlayer.getDecisionHistory()
                    .subList(Math.max(0, aiPlayer.getDecisionHistory().size() - 5), aiPlayer.getDecisionHistory().size());
                
                for (AIPlayer.AIDecision decision : recentDecisions) {
                    String decisionType = decision.getDecisionType();
                    double weight = "success".equals(decision.getDecisionOutcome()) ? 1.0 : 0.5;
                    decisionProbabilities.merge(decisionType, weight, Double::sum);
                }
            }
        }
        
        // Normaliser les probabilités
        double totalWeight = decisionProbabilities.values().stream().mapToDouble(Double::doubleValue).sum();
        if (totalWeight > 0) {
            decisionProbabilities.replaceAll((k, v) -> v / totalWeight);
        }
        
        prediction.put("gameId", gameId);
        prediction.put("predictedActions", decisionProbabilities);
        prediction.put("confidence", Math.min(1.0, totalWeight / 10.0)); // Confiance basée sur la quantité de données
        prediction.put("timestamp", new Date());
        
        return prediction;
    }
} 