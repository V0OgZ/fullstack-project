package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service pour gérer les zones de causalité
 * Basé sur ASYNC_ENGINE_DESIGN.md et FOG_AND_ZONE_GAMEPLAY.md
 */
@Service
@Transactional
public class CausalityZoneService {
    
    @Autowired
    private PsiGraphService psiGraphService;
    
    @Autowired
    private LegendaryObjectService legendaryObjectService;
    
    /**
     * Calculer toutes les zones de causalité pour un joueur
     */
    public Map<String, Object> calculateAllCausalityZones(Game game, String playerId) {
        Map<String, Object> zones = new HashMap<>();
        
        // Obtenir tous les héros du joueur
        List<Hero> playerHeroes = game.getHeroesByPlayer(playerId);
        
        // Calculer les zones pour chaque héros
        for (Hero hero : playerHeroes) {
            TileCoord heroPosition = new TileCoord(hero.getPositionX(), hero.getPositionY());
            
            // Zone de vision
            List<TileCoord> visionZone = calculateVisionZone(game, heroPosition, hero.getVisionRadius());
            zones.put("vision_" + hero.getName(), visionZone);
            
            // Zone de mouvement
            List<TileCoord> movementZone = calculateMovementZone(game, heroPosition, hero.getMovementPoints());
            zones.put("movement_" + hero.getName(), movementZone);
            
            // Zone de causalité étendue
            List<TileCoord> causalityZone = calculateCausalityZone(game, heroPosition, playerId);
            zones.put("causality_" + hero.getName(), causalityZone);
        }
        
        // Zones ancrées (par des objets légendaires)
        List<TileCoord> anchoredZones = calculateAnchoredZones(game);
        zones.put("anchored", anchoredZones);
        
        // Zones fantômes
        List<TileCoord> ghostZones = calculateGhostZones(game, playerId);
        zones.put("ghost", ghostZones);
        
        // Zones de rollback
        List<TileCoord> rollbackZones = calculateRollbackZones(game);
        zones.put("rollback", rollbackZones);
        
        return zones;
    }
    
    /**
     * Calculer la zone de vision autour d'un point
     */
    public List<TileCoord> calculateVisionZone(Game game, TileCoord center, int visionRadius) {
        List<TileCoord> visionZone = new ArrayList<>();
        
        for (int x = center.getX() - visionRadius; x <= center.getX() + visionRadius; x++) {
            for (int y = center.getY() - visionRadius; y <= center.getY() + visionRadius; y++) {
                TileCoord tile = new TileCoord(x, y);
                
                // Vérifier si dans le rayon
                if (center.distanceTo(tile) <= visionRadius) {
                    // Vérifier si visible (pas bloqué par obstacles)
                    if (isVisibleFrom(game, center, tile)) {
                        visionZone.add(tile);
                    }
                }
            }
        }
        
        return visionZone;
    }
    
    /**
     * Calculer la zone de mouvement depuis un point
     */
    public List<TileCoord> calculateMovementZone(Game game, TileCoord center, int movementPoints) {
        List<TileCoord> movementZone = new ArrayList<>();
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
                    int movementCost = getMovementCost(game, neighbor);
                    int newDistance = currentDistance + movementCost;
                    
                    if (newDistance <= movementPoints) {
                        visited.add(neighbor);
                        distances.put(neighbor, newDistance);
                        queue.offer(neighbor);
                        movementZone.add(neighbor);
                    }
                }
            }
        }
        
        return movementZone;
    }
    
    /**
     * Calculer la zone de causalité étendue
     */
    public List<TileCoord> calculateCausalityZone(Game game, TileCoord center, String playerId) {
        List<TileCoord> causalityZone = new ArrayList<>();
        
        // Commencer par la zone de mouvement
        List<TileCoord> movementZone = calculateMovementZone(game, center, 10); // Rayon étendu
        causalityZone.addAll(movementZone);
        
        // Ajouter les zones où le joueur a des états ψ actifs
        List<PsiNode> playerNodes = psiGraphService.getActiveNodes(game).stream()
                .filter(node -> playerId.equals(node.getOwnerPlayer()))
                .collect(Collectors.toList());
        
        for (PsiNode node : playerNodes) {
            if (node.getTile() != null) {
                causalityZone.add(node.getTile());
                
                // Ajouter les zones adjacentes si le nœud est superposé
                if (node.isSuperposed()) {
                    causalityZone.addAll(getNeighbors(node.getTile()));
                }
            }
        }
        
        return causalityZone.stream().distinct().collect(Collectors.toList());
    }
    
    /**
     * Calculer les zones ancrées (par des objets légendaires)
     */
    public List<TileCoord> calculateAnchoredZones(Game game) {
        List<TileCoord> anchoredZones = new ArrayList<>();
        
        // Trouver tous les objets qui ancrent la réalité
        List<LegendaryObject> anchoringObjects = legendaryObjectService.getAllLegendaryObjects().stream()
                .filter(obj -> obj.hasEffect(CausalityEffect.PREVENT_TIMELINE_PROJECTION))
                .filter(LegendaryObject::isActive)
                .collect(Collectors.toList());
        
        for (LegendaryObject object : anchoringObjects) {
            // TODO: Obtenir la position de l'objet
            TileCoord objectPosition = getObjectPosition(game, object);
            if (objectPosition != null) {
                // Ajouter toutes les cases dans le rayon d'influence
                for (int x = objectPosition.getX() - object.getRadiusOfInfluence(); 
                     x <= objectPosition.getX() + object.getRadiusOfInfluence(); x++) {
                    for (int y = objectPosition.getY() - object.getRadiusOfInfluence(); 
                         y <= objectPosition.getY() + object.getRadiusOfInfluence(); y++) {
                        TileCoord tile = new TileCoord(x, y);
                        if (object.isInInfluenceRadius(objectPosition, tile)) {
                            anchoredZones.add(tile);
                        }
                    }
                }
            }
        }
        
        return anchoredZones;
    }
    
    /**
     * Calculer les zones fantômes (visibles avec des objets spéciaux)
     */
    public List<TileCoord> calculateGhostZones(Game game, String playerId) {
        List<TileCoord> ghostZones = new ArrayList<>();
        
        // Vérifier si le joueur a des objets qui permettent la vision fantôme
        boolean hasGhostVision = playerHasGhostVision(game, playerId);
        
        if (hasGhostVision) {
            // Ajouter toutes les zones où il y a des nœuds fantômes
            List<PsiNode> ghostNodes = psiGraphService.getActiveNodes(game).stream()
                    .filter(node -> node.getCausalityZone() == CausalityZone.GHOST)
                    .collect(Collectors.toList());
            
            for (PsiNode node : ghostNodes) {
                if (node.getTile() != null) {
                    ghostZones.add(node.getTile());
                }
            }
        }
        
        return ghostZones;
    }
    
    /**
     * Calculer les zones de rollback
     */
    public List<TileCoord> calculateRollbackZones(Game game) {
        List<TileCoord> rollbackZones = new ArrayList<>();
        
        // Trouver tous les objets de rollback
        List<LegendaryObject> rollbackObjects = legendaryObjectService.getAllLegendaryObjects().stream()
                .filter(obj -> obj.hasEffect(CausalityEffect.REWIND_REALITY))
                .filter(LegendaryObject::isActive)
                .collect(Collectors.toList());
        
        for (LegendaryObject object : rollbackObjects) {
            TileCoord objectPosition = getObjectPosition(game, object);
            if (objectPosition != null) {
                // Les zones de rollback affectent généralement une large zone
                int rollbackRadius = object.getRadiusOfInfluence() * 2;
                
                for (int x = objectPosition.getX() - rollbackRadius; 
                     x <= objectPosition.getX() + rollbackRadius; x++) {
                    for (int y = objectPosition.getY() - rollbackRadius; 
                         y <= objectPosition.getY() + rollbackRadius; y++) {
                        TileCoord tile = new TileCoord(x, y);
                        if (objectPosition.distanceTo(tile) <= rollbackRadius) {
                            rollbackZones.add(tile);
                        }
                    }
                }
            }
        }
        
        return rollbackZones;
    }
    
    /**
     * Déterminer l'état de brouillard pour une position donnée
     */
    public FogState determineFogState(Game game, TileCoord position, String playerId) {
        // Vérifier si dans une zone ancrée
        if (isInAnchoredZone(game, position)) {
            return FogState.ANCHORED;
        }
        
        // Vérifier si dans une zone de vision
        if (isInVisionZone(game, position, playerId)) {
            return FogState.VISION;
        }
        
        // Vérifier si superposé
        if (isInSuperposedZone(game, position, playerId)) {
            return FogState.SUPERPOSED;
        }
        
        // Vérifier si dans une zone fantôme
        if (isInGhostZone(game, position, playerId)) {
            return FogState.GHOST;
        }
        
        // Vérifier si accessible
        if (isInReachableZone(game, position, playerId)) {
            return FogState.REACHABLE;
        }
        
        // Vérifier si exploré dans le passé
        if (hasBeenExplored(game, position, playerId)) {
            return FogState.COLLAPSED_PAST;
        }
        
        // Sinon, non exploré
        return FogState.UNEXPLORED;
    }
    
    /**
     * Obtenir l'aura visuelle pour une position
     */
    public VisualAura getVisualAura(Game game, TileCoord position, String playerId) {
        FogState fogState = determineFogState(game, position, playerId);
        return VisualAura.fromFogState(fogState);
    }
    
    /**
     * Mettre à jour les zones de causalité après un événement
     */
    public void updateCausalityZones(Game game, String playerId, String eventType, TileCoord eventPosition) {
        // Recalculer les zones affectées par l'événement
        List<PsiNode> affectedNodes = findNodesNearPosition(game, eventPosition, 5);
        
        for (PsiNode node : affectedNodes) {
            // Recalculer l'état du nœud
            CausalityZone newZone = calculateNodeCausalityZone(game, node, playerId);
            if (newZone != node.getCausalityZone()) {
                node.setCausalityZone(newZone);
                
                // Déclencher des effets de cascade si nécessaire
                if (newZone == CausalityZone.ANCHORED) {
                    psiGraphService.collapseNode(node, "Entered anchored zone");
                }
            }
        }
    }
    
    /**
     * Analyser les zones de causalité
     */
    public Map<String, Object> analyzeZones(Game game, String playerId) {
        Map<String, Object> analysis = new HashMap<>();
        
        Map<String, Object> allZones = calculateAllCausalityZones(game, playerId);
        
        // Statistiques par zone
        for (Map.Entry<String, Object> entry : allZones.entrySet()) {
            String zoneName = entry.getKey();
            List<TileCoord> zonePositions = (List<TileCoord>) entry.getValue();
            
            Map<String, Object> zoneStats = new HashMap<>();
            zoneStats.put("size", zonePositions.size());
            zoneStats.put("coverage", calculateCoverage(zonePositions, game));
            
            analysis.put(zoneName + "_stats", zoneStats);
        }
        
        // Zones qui se chevauchent
        analysis.put("overlapping_zones", findOverlappingZones(allZones));
        
        // Zones conflictuelles
        analysis.put("conflicting_zones", findConflictingZones(allZones));
        
        return analysis;
    }
    
    // Méthodes utilitaires privées
    
    private boolean isVisibleFrom(Game game, TileCoord from, TileCoord to) {
        // Implémentation simplifiée - vérifier la ligne de vue
        return true; // À implémenter selon les règles du jeu
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
    
    private TileCoord getObjectPosition(Game game, LegendaryObject object) {
        // Obtenir la position d'un objet légendaire
        return new TileCoord(10, 10); // Implémentation simplifiée
    }
    
    private boolean playerHasGhostVision(Game game, String playerId) {
        // Vérifier si le joueur a des objets qui permettent la vision fantôme
        return false; // À implémenter selon l'inventaire du joueur
    }
    
    private boolean isInAnchoredZone(Game game, TileCoord position) {
        List<TileCoord> anchoredZones = calculateAnchoredZones(game);
        return anchoredZones.contains(position);
    }
    
    private boolean isInVisionZone(Game game, TileCoord position, String playerId) {
        // Vérifier si dans une zone de vision d'un héros du joueur
        return false; // À implémenter
    }
    
    private boolean isInSuperposedZone(Game game, TileCoord position, String playerId) {
        // Vérifier si il y a des nœuds superposés à cette position
        return false; // À implémenter
    }
    
    private boolean isInGhostZone(Game game, TileCoord position, String playerId) {
        List<TileCoord> ghostZones = calculateGhostZones(game, playerId);
        return ghostZones.contains(position);
    }
    
    private boolean isInReachableZone(Game game, TileCoord position, String playerId) {
        // Vérifier si accessible par mouvement
        return false; // À implémenter
    }
    
    private boolean hasBeenExplored(Game game, TileCoord position, String playerId) {
        // Vérifier si cette position a été explorée dans le passé
        return false; // À implémenter selon l'historique
    }
    
    private List<PsiNode> findNodesNearPosition(Game game, TileCoord position, int radius) {
        return psiGraphService.getActiveNodes(game).stream()
                .filter(node -> node.getTile() != null && 
                               position.distanceTo(node.getTile()) <= radius)
                .collect(Collectors.toList());
    }
    
    private CausalityZone calculateNodeCausalityZone(Game game, PsiNode node, String playerId) {
        // Calculer la zone de causalité d'un nœud spécifique
        return CausalityZone.UNKNOWN; // À implémenter
    }
    
    private double calculateCoverage(List<TileCoord> zonePositions, Game game) {
        // Calculer le pourcentage de couverture de la zone
        int totalTiles = game.getMapWidth() * game.getMapHeight();
        return (double) zonePositions.size() / totalTiles;
    }
    
    private List<String> findOverlappingZones(Map<String, Object> allZones) {
        // Trouver les zones qui se chevauchent
        return new ArrayList<>(); // À implémenter
    }
    
    private List<String> findConflictingZones(Map<String, Object> allZones) {
        // Trouver les zones en conflit
        return new ArrayList<>(); // À implémenter
    }
} 