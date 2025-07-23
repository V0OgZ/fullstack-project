package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.PsiNodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service pour gérer le graphe causal (ΨGraph) et les zones de causalité
 * Basé sur ASYNC_ENGINE_DESIGN.md
 */
@Service
@Transactional
public class PsiGraphService {
    
    @Autowired
    private PsiNodeRepository psiNodeRepository;
    
    private final Map<Long, Map<String, PsiNode>> gameGraphCache = new HashMap<>();
    
    /**
     * Créer un nouveau nœud dans le graphe causal
     */
    public PsiNode createPsiNode(Game game, TileCoord tile, TimeCoord time, String ownerPlayer) {
        PsiNode psiNode = new PsiNode(tile, time, ownerPlayer);
        psiNode.setGame(game);
        
        // Calculer l'état initial
        calculateInitialState(psiNode, game);
        
        // Sauvegarder
        psiNodeRepository.save(psiNode);
        
        // Mettre à jour le cache
        updateGraphCache(game.getId(), psiNode);
        
        return psiNode;
    }
    
    /**
     * Calculer l'état initial d'un nœud
     */
    private void calculateInitialState(PsiNode psiNode, Game game) {
        // Déterminer l'état de réalité
        RealityState realityState = calculateRealityState(psiNode, game);
        psiNode.setRealityState(realityState);
        
        // Déterminer la zone de causalité
        CausalityZone causalityZone = calculateCausalityZone(psiNode, game);
        psiNode.setCausalityZone(causalityZone);
        
        // Calculer la visibilité
        calculateVisibility(psiNode, game);
    }
    
    /**
     * Calculer l'état de réalité d'un nœud
     */
    private RealityState calculateRealityState(PsiNode psiNode, Game game) {
        // Vérifier si la position est bloquée par des ennemis trop forts
        if (isBlockedByStrongEnemies(psiNode, game)) {
            return RealityState.IMPOSSIBLE;
        }
        
        // Vérifier si déjà réalisé par d'autres joueurs
        List<PsiNode> samePositionNodes = findNodesAtPosition(game, psiNode.getTile(), psiNode.getTime());
        if (samePositionNodes.size() > 1) {
            return RealityState.SUPERPOSED;
        }
        
        // Vérifier si observé
        if (psiNode.isObserved()) {
            return RealityState.COLLAPSED;
        }
        
        return RealityState.POTENTIAL;
    }
    
    /**
     * Calculer la zone de causalité d'un nœud
     */
    private CausalityZone calculateCausalityZone(PsiNode psiNode, Game game) {
        // Vérifier si dans une zone d'ancrage
        if (isInAnchoredZone(psiNode, game)) {
            return CausalityZone.ANCHORED;
        }
        
        // Vérifier si dans une zone fantôme
        if (isInGhostZone(psiNode, game)) {
            return CausalityZone.GHOST;
        }
        
        // Vérifier si dans une zone de vision
        if (isInVisionZone(psiNode, game)) {
            return CausalityZone.VISION;
        }
        
        // Vérifier si dans une zone de mouvement
        if (isInMovementZone(psiNode, game)) {
            return CausalityZone.MOVEMENT;
        }
        
        // Vérifier si dans une zone de causalité étendue
        if (isInExtendedCausalityZone(psiNode, game)) {
            return CausalityZone.CAUSALITY;
        }
        
        return CausalityZone.UNKNOWN;
    }
    
    /**
     * Calculer la visibilité d'un nœud
     */
    private void calculateVisibility(PsiNode psiNode, Game game) {
        // Vérifier si accessible
        boolean isReachable = calculateReachability(psiNode, game);
        psiNode.setReachable(isReachable);
        
        // Vérifier si visible en mode fantôme
        boolean isGhostVisible = calculateGhostVisibility(psiNode, game);
        psiNode.setGhostVisible(isGhostVisible);
    }
    
    /**
     * Calculer la zone de vision autour d'un point
     */
    public List<PsiNode> calculateVisionZone(Game game, TileCoord center, int radius, String player) {
        List<PsiNode> visionNodes = new ArrayList<>();
        
        for (int x = center.getX() - radius; x <= center.getX() + radius; x++) {
            for (int y = center.getY() - radius; y <= center.getY() + radius; y++) {
                TileCoord tile = new TileCoord(x, y);
                
                // Vérifier si dans le rayon
                if (center.distanceTo(tile) <= radius) {
                    TimeCoord currentTime = new TimeCoord(game.getCurrentTurn(), game.getCurrentTimeline());
                    PsiNode node = findOrCreateNode(game, tile, currentTime, player);
                    
                    if (node != null) {
                        node.setCausalityZone(CausalityZone.VISION);
                        node.setObserved(true);
                        visionNodes.add(node);
                    }
                }
            }
        }
        
        return visionNodes;
    }
    
    /**
     * Calculer la zone de mouvement depuis un point
     */
    public List<PsiNode> calculateMovementZone(Game game, TileCoord center, int movementPoints, String player) {
        List<PsiNode> movementNodes = new ArrayList<>();
        Queue<TileCoord> queue = new LinkedList<>();
        Set<TileCoord> visited = new HashSet<>();
        Map<TileCoord, Integer> distances = new HashMap<>();
        
        queue.offer(center);
        visited.add(center);
        distances.put(center, 0);
        
        while (!queue.isEmpty()) {
            TileCoord current = queue.poll();
            int currentDistance = distances.get(current);
            
            if (currentDistance >= movementPoints) continue;
            
            // Explorer les cases adjacentes
            for (TileCoord neighbor : getNeighbors(current)) {
                if (!visited.contains(neighbor) && isValidPosition(game, neighbor)) {
                    int newDistance = currentDistance + getMovementCost(game, neighbor);
                    
                    if (newDistance <= movementPoints) {
                        visited.add(neighbor);
                        distances.put(neighbor, newDistance);
                        queue.offer(neighbor);
                        
                        // Créer le nœud de mouvement
                        TimeCoord futureTime = new TimeCoord(game.getCurrentTurn() + 1, game.getCurrentTimeline());
                        PsiNode node = findOrCreateNode(game, neighbor, futureTime, player);
                        
                        if (node != null) {
                            node.setCausalityZone(CausalityZone.MOVEMENT);
                            node.setReachable(true);
                            movementNodes.add(node);
                        }
                    }
                }
            }
        }
        
        return movementNodes;
    }
    
    /**
     * Effondrer un nœud et propager les effets
     */
    public void collapseNode(PsiNode psiNode, String reason) {
        // Marquer comme effondré
        psiNode.collapse();
        psiNode.setCollapseTrigger(reason);
        
        // Propager l'effondrement aux nœuds liés
        propagateCollapse(psiNode);
        
        // Recalculer les zones affectées
        recalculateAffectedZones(psiNode);
        
        // Sauvegarder
        psiNodeRepository.save(psiNode);
    }
    
    /**
     * Propager l'effondrement aux nœuds liés
     */
    private void propagateCollapse(PsiNode psiNode) {
        // Trouver les nœuds en superposition à la même position
        List<PsiNode> superposedNodes = findNodesAtPosition(
            psiNode.getGame(), psiNode.getTile(), psiNode.getTime())
            .stream()
            .filter(node -> node.isSuperposed() && !node.equals(psiNode))
            .collect(Collectors.toList());
        
        // Effondrer les nœuds superposés
        for (PsiNode superposedNode : superposedNodes) {
            superposedNode.collapse();
            superposedNode.setCollapseTrigger("Propagated from " + psiNode.getId());
            psiNodeRepository.save(superposedNode);
        }
    }
    
    /**
     * Recalculer les zones affectées par un effondrement
     */
    private void recalculateAffectedZones(PsiNode collapsedNode) {
        Game game = collapsedNode.getGame();
        
        // Recalculer les zones dans un rayon autour du nœud effondré
        int recalculationRadius = 5;
        TileCoord center = collapsedNode.getTile();
        
        for (int x = center.getX() - recalculationRadius; x <= center.getX() + recalculationRadius; x++) {
            for (int y = center.getY() - recalculationRadius; y <= center.getY() + recalculationRadius; y++) {
                TileCoord tile = new TileCoord(x, y);
                
                List<PsiNode> nodesAtPosition = findNodesAtPosition(game, tile, collapsedNode.getTime());
                for (PsiNode node : nodesAtPosition) {
                    calculateInitialState(node, game);
                    psiNodeRepository.save(node);
                }
            }
        }
    }
    
    /**
     * Obtenir tous les nœuds actifs d'un jeu
     */
    public List<PsiNode> getActiveNodes(Game game) {
        return psiNodeRepository.findByGameAndRealityStateNot(game, RealityState.COLLAPSED);
    }
    
    /**
     * Obtenir les nœuds par zone de causalité
     */
    public List<PsiNode> getNodesByZone(Game game, CausalityZone zone) {
        return psiNodeRepository.findByGameAndCausalityZone(game, zone);
    }
    
    /**
     * Analyse du graphe causal
     */
    public Map<String, Object> analyzeGraph(Game game) {
        Map<String, Object> analysis = new HashMap<>();
        
        List<PsiNode> allNodes = psiNodeRepository.findByGame(game);
        
        // Compter par état de réalité
        Map<RealityState, Long> stateCount = allNodes.stream()
            .collect(Collectors.groupingBy(PsiNode::getRealityState, Collectors.counting()));
        
        // Compter par zone de causalité
        Map<CausalityZone, Long> zoneCount = allNodes.stream()
            .collect(Collectors.groupingBy(PsiNode::getCausalityZone, Collectors.counting()));
        
        // Statistiques
        analysis.put("totalNodes", allNodes.size());
        analysis.put("stateDistribution", stateCount);
        analysis.put("zoneDistribution", zoneCount);
        analysis.put("activeNodes", stateCount.getOrDefault(RealityState.COLLAPSED, 0L));
        analysis.put("superposedNodes", stateCount.getOrDefault(RealityState.SUPERPOSED, 0L));
        
        return analysis;
    }
    
    // Méthodes utilitaires privées
    
    private boolean isBlockedByStrongEnemies(PsiNode psiNode, Game game) {
        // Implémentation simplifiée - à étendre selon les besoins
        return false;
    }
    
    private boolean isInAnchoredZone(PsiNode psiNode, Game game) {
        // Vérifier si dans une zone d'ancrage (ex: Tower of Anchoring)
        return false; // À implémenter selon les objets du jeu
    }
    
    private boolean isInGhostZone(PsiNode psiNode, Game game) {
        // Vérifier si dans une zone fantôme
        return false; // À implémenter selon les objets du jeu
    }
    
    private boolean isInVisionZone(PsiNode psiNode, Game game) {
        // Vérifier si dans une zone de vision d'un héros ou château
        return false; // À implémenter selon les positions des héros
    }
    
    private boolean isInMovementZone(PsiNode psiNode, Game game) {
        // Vérifier si accessible par mouvement
        return true; // Implémentation simplifiée
    }
    
    private boolean isInExtendedCausalityZone(PsiNode psiNode, Game game) {
        // Vérifier si dans une zone de causalité étendue
        return false; // À implémenter selon la logique du jeu
    }
    
    private boolean calculateReachability(PsiNode psiNode, Game game) {
        // Calculer si le nœud est accessible
        return true; // Implémentation simplifiée
    }
    
    private boolean calculateGhostVisibility(PsiNode psiNode, Game game) {
        // Calculer si visible en mode fantôme
        return false; // À implémenter selon les objets du jeu
    }
    
    private List<PsiNode> findNodesAtPosition(Game game, TileCoord tile, TimeCoord time) {
        return psiNodeRepository.findByGameAndTileAndTime(game, tile, time);
    }
    
    private PsiNode findOrCreateNode(Game game, TileCoord tile, TimeCoord time, String player) {
        List<PsiNode> existing = findNodesAtPosition(game, tile, time);
        
        // Chercher un nœud existant pour ce joueur
        Optional<PsiNode> playerNode = existing.stream()
            .filter(node -> Objects.equals(node.getOwnerPlayer(), player))
            .findFirst();
        
        if (playerNode.isPresent()) {
            return playerNode.get();
        }
        
        // Créer un nouveau nœud
        return createPsiNode(game, tile, time, player);
    }
    
    private List<TileCoord> getNeighbors(TileCoord tile) {
        List<TileCoord> neighbors = new ArrayList<>();
        
        for (int dx = -1; dx <= 1; dx++) {
            for (int dy = -1; dy <= 1; dy++) {
                if (dx == 0 && dy == 0) continue;
                neighbors.add(tile.offset(dx, dy));
            }
        }
        
        return neighbors;
    }
    
    private boolean isValidPosition(Game game, TileCoord tile) {
        return tile.getX() >= 0 && tile.getX() < game.getMapWidth() &&
               tile.getY() >= 0 && tile.getY() < game.getMapHeight();
    }
    
    private int getMovementCost(Game game, TileCoord tile) {
        // Coût de mouvement selon le terrain
        return 1; // Implémentation simplifiée
    }
    
    private void updateGraphCache(Long gameId, PsiNode psiNode) {
        gameGraphCache.computeIfAbsent(gameId, k -> new HashMap<>())
                     .put(psiNode.getPositionKey(), psiNode);
    }
} 