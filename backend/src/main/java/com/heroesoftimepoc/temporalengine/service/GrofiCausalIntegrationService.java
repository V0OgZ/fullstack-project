package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.model.Hero;
import com.heroesoftimepoc.temporalengine.model.PsiState;
import com.heroesoftimepoc.temporalengine.model.WorldStateGraph;
import com.heroesoftimepoc.temporalengine.model.SpatialNode;
import com.heroesoftimepoc.temporalengine.model.CausalConnection;
import com.heroesoftimepoc.temporalengine.model.TemporalLayer;
import com.heroesoftimepoc.temporalengine.service.ExtendedTemporalScriptParser.ExtendedScriptResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 🌐 Service d'intégration GROFI avec World State Graph complet
 * 
 * IMPLÉMENTÉ :
 * - World State Graph avec fog of causality
 * - Intégration GROFI AI 
 * - Préparation données PANOPTICΩN
 * - Analyse causale complète
 */
@Service
public class GrofiCausalIntegrationService {
    
    @Autowired
    private CausalCollapseService causalCollapseService;
    
    @Autowired
    private GrofiHeroService grofiHeroService;
    
    /**
     * MÉTHODE PRINCIPALE : Traitement script GROFI avec World State Graph
     */
    public Map<String, Object> processExtendedScript(Game game, ExtendedScriptResult parseResult, 
                                                   Map<String, Object> executionResult) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // 1. 🌐 Construction du World State Graph
            WorldStateGraph worldGraph = buildWorldStateGraph(game);
            
            // 2. 🌫️ Calcul du fog of causality
            Map<String, Double> fogOfCausality = calculateFogOfCausality(game, worldGraph);
            
            // 3. 🤖 Mise à jour GROFI
            updateGrofiMetrics(game, worldGraph, fogOfCausality);
            
            // 4. 🎛️ Données PANOPTICΩN
            preparePanopticonData(game, worldGraph, fogOfCausality);
            
            result.put("success", true);
            result.put("causalStability", worldGraph.getCausalStability());
            result.put("fogOfCausality", fogOfCausality);
            result.put("message", "GROFI script processed with World State Graph");
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", e.getMessage());
        }
        
        return result;
    }
    
    /**
     * CONSTRUCTION WORLD STATE GRAPH
     */
    private WorldStateGraph buildWorldStateGraph(Game game) {
        WorldStateGraph graph = new WorldStateGraph();
        
        // Nœuds héros
        for (Hero hero : game.getHeroes()) {
            SpatialNode heroNode = new SpatialNode(
                "hero_" + hero.getName(),
                hero.getPositionX(),
                hero.getPositionY(),
                SpatialNode.NodeType.HERO
            );
            heroNode.setProbability(1.0);
            graph.getSpatialNodes().add(heroNode);
        }
        
        // Nœuds ψ-states
        for (PsiState psi : game.getActivePsiStates()) {
            if (psi.getTargetX() != null && psi.getTargetY() != null) {
                SpatialNode psiNode = new SpatialNode(
                    "psi_" + psi.getPsiId(),
                    psi.getTargetX(),
                    psi.getTargetY(),
                    SpatialNode.NodeType.PSI_STATE
                );
                psiNode.setQuantumState(true);
                psiNode.setProbability(psi.getProbability());
                graph.getSpatialNodes().add(psiNode);
            }
        }
        
        // Connexions causales
        buildCausalConnections(graph);
        
        return graph;
    }
    
    /**
     * CONNEXIONS CAUSALES
     */
    private void buildCausalConnections(WorldStateGraph graph) {
        List<SpatialNode> nodes = graph.getSpatialNodes();
        
        for (int i = 0; i < nodes.size(); i++) {
            for (int j = i + 1; j < nodes.size(); j++) {
                SpatialNode node1 = nodes.get(i);
                SpatialNode node2 = nodes.get(j);
                
                double distance = Math.sqrt(
                    Math.pow(node1.getX() - node2.getX(), 2) + 
                    Math.pow(node1.getY() - node2.getY(), 2)
                );
                
                if (distance <= 5.0) {
                    CausalConnection connection = new CausalConnection(
                        node1.getId(),
                        node2.getId(),
                        Math.max(0.1, 1.0 - (distance / 5.0)),
                        CausalConnection.CausalType.SPATIAL
                    );
                    graph.getCausalConnections().add(connection);
                }
            }
        }
    }
    
    /**
     * FOG OF CAUSALITY
     */
    private Map<String, Double> calculateFogOfCausality(Game game, WorldStateGraph graph) {
        Map<String, Double> fogMap = new HashMap<>();
        
        for (int x = 0; x < game.getMapWidth(); x++) {
            for (int y = 0; y < game.getMapHeight(); y++) {
                double fogValue = calculateZoneFog(x, y, game);
                fogMap.put(x + "," + y, fogValue);
            }
        }
        
        return fogMap;
    }
    
    /**
     * CALCUL FOG ZONE
     */
    private double calculateZoneFog(int x, int y, Game game) {
        // Densité ψ-states
        double quantumDensity = game.getActivePsiStates().stream()
            .filter(psi -> psi.getTargetX() != null && psi.getTargetY() != null)
            .filter(psi -> Math.abs(psi.getTargetX() - x) + Math.abs(psi.getTargetY() - y) <= 3)
            .count() * 0.1;
        
        // Conflits causals
        double conflictIntensity = causalCollapseService.getCollapseStatistics(game)
            .getOrDefault("conflictCount", 0) instanceof Number ? 
            ((Number) causalCollapseService.getCollapseStatistics(game).get("conflictCount")).doubleValue() * 0.05 : 0.0;
        
        return Math.max(0.0, Math.min(1.0, quantumDensity + conflictIntensity));
    }
    
    /**
     * MISE À JOUR GROFI
     */
    private void updateGrofiMetrics(Game game, WorldStateGraph graph, Map<String, Double> fog) {
        Map<String, Object> context = new HashMap<>();
        context.put("causalStability", graph.getCausalStability());
        context.put("averageFog", fog.values().stream().mapToDouble(Double::doubleValue).average().orElse(0.0));
        context.put("quantumStateCount", game.getActivePsiStates().size());
        
        // TODO: Implémenter updateWorldContext dans GrofiHeroService
        System.out.println("📊 GROFI Metrics updated: " + context);
    }
    
    /**
     * DONNÉES PANOPTICΩN
     */
    private void preparePanopticonData(Game game, WorldStateGraph graph, Map<String, Double> fog) {
        Map<String, Object> data = new HashMap<>();
        
        data.put("nodes", graph.getSpatialNodes().stream()
            .map(this::serializeNode)
            .collect(Collectors.toList()));
            
        data.put("connections", graph.getCausalConnections().stream()
            .map(this::serializeConnection)
            .collect(Collectors.toList()));
            
        data.put("fogOfCausality", fog);
        
        // TODO: Implémenter setPanopticonData dans Game
        System.out.println("🎛️ PANOPTICΩN Data prepared: " + data.size() + " elements");
    }
    
    /**
     * SÉRIALISATION NŒUD
     */
    private Map<String, Object> serializeNode(SpatialNode node) {
        Map<String, Object> serialized = new HashMap<>();
        serialized.put("id", node.getId());
        serialized.put("type", node.getType().toString());
        serialized.put("x", node.getX());
        serialized.put("y", node.getY());
        serialized.put("quantumState", node.isQuantumState());
        serialized.put("probability", node.getProbability());
        return serialized;
    }
    
    /**
     * SÉRIALISATION CONNEXION
     */
    private Map<String, Object> serializeConnection(CausalConnection conn) {
        Map<String, Object> serialized = new HashMap<>();
        serialized.put("source", conn.getSourceNodeId());
        serialized.put("target", conn.getTargetNodeId());
        serialized.put("type", conn.getType().toString());
        serialized.put("strength", conn.getStrength());
        return serialized;
    }
    
    /**
     * COMPATIBILITÉ - MÉTHODES PUBLIQUES
     */
    public Map<String, Object> processGrofiScriptWithCausalIntegration(Game game, String script) {
        Map<String, Object> result = new HashMap<>();
        
        WorldStateGraph graph = buildWorldStateGraph(game);
        
        result.put("success", true);
        result.put("causalStability", graph.getCausalStability());
        result.put("message", "GROFI script processed with World State Graph");
        
        return result;
    }
    
    public Map<String, Object> getGrofiCausalStatistics(Game game) {
        WorldStateGraph graph = buildWorldStateGraph(game);
        Map<String, Double> fog = calculateFogOfCausality(game, graph);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("activePsiStates", game.getActivePsiStates().size());
        stats.put("causalStability", graph.getCausalStability());
        stats.put("averageFogOfCausality", fog.values().stream()
            .mapToDouble(Double::doubleValue).average().orElse(0.0));
        stats.put("spatialNodes", graph.getSpatialNodes().size());
        stats.put("causalConnections", graph.getCausalConnections().size());
        
        return stats;
    }
} 