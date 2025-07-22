package com.heroesoftimepoc.temporalengine.repository;

import com.heroesoftimepoc.temporalengine.model.*;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Repository pour les nœuds du graphe causal (PsiNode)
 * Version simplifiée sans JPA pour la compilation
 */
@Repository
public class PsiNodeRepository {
    
    private final Map<Long, PsiNode> nodes = new HashMap<>();
    private Long nextId = 1L;
    
    public PsiNode save(PsiNode node) {
        if (node.getId() == null) {
            node.setId(nextId++);
        }
        nodes.put(node.getId(), node);
        return node;
    }
    
    public Optional<PsiNode> findById(Long id) {
        return Optional.ofNullable(nodes.get(id));
    }
    
    public List<PsiNode> findAll() {
        return new ArrayList<>(nodes.values());
    }
    
    public void deleteById(Long id) {
        nodes.remove(id);
    }
    
    public List<PsiNode> findByGame(Game game) {
        return nodes.values().stream()
                .filter(node -> node.getGame() != null && node.getGame().getId().equals(game.getId()))
                .collect(Collectors.toList());
    }
    
    public List<PsiNode> findByGameAndRealityState(Game game, RealityState realityState) {
        return findByGame(game).stream()
                .filter(node -> node.getRealityState() == realityState)
                .collect(Collectors.toList());
    }
    
    public List<PsiNode> findByGameAndRealityStateNot(Game game, RealityState realityState) {
        return findByGame(game).stream()
                .filter(node -> node.getRealityState() != realityState)
                .collect(Collectors.toList());
    }
    
    public List<PsiNode> findByGameAndCausalityZone(Game game, CausalityZone causalityZone) {
        return findByGame(game).stream()
                .filter(node -> node.getCausalityZone() == causalityZone)
                .collect(Collectors.toList());
    }
    
    public List<PsiNode> findByGameAndOwnerPlayer(Game game, String ownerPlayer) {
        return findByGame(game).stream()
                .filter(node -> Objects.equals(node.getOwnerPlayer(), ownerPlayer))
                .collect(Collectors.toList());
    }
    
    public List<PsiNode> findByGameAndTileAndTime(Game game, TileCoord tile, TimeCoord time) {
        return findByGame(game).stream()
                .filter(node -> Objects.equals(node.getTile(), tile) && Objects.equals(node.getTime(), time))
                .collect(Collectors.toList());
    }
    
    public List<PsiNode> findByGameAndIsObserved(Game game, boolean isObserved) {
        return findByGame(game).stream()
                .filter(node -> node.isObserved() == isObserved)
                .collect(Collectors.toList());
    }
    
    public List<PsiNode> findByGameAndIsReachable(Game game, boolean isReachable) {
        return findByGame(game).stream()
                .filter(node -> node.isReachable() == isReachable)
                .collect(Collectors.toList());
    }
    
    public List<PsiNode> findByGameAndIsGhostVisible(Game game, boolean isGhostVisible) {
        return findByGame(game).stream()
                .filter(node -> node.isGhostVisible() == isGhostVisible)
                .collect(Collectors.toList());
    }
} 