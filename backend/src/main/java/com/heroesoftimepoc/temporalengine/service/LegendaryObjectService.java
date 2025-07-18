package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.LegendaryObjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service pour gérer les objets légendaires et leurs effets causaux
 * Basé sur CAUSALITY_OBJECT_INFLUENCE.md
 */
@Service
@Transactional
public class LegendaryObjectService {
    
    @Autowired
    private LegendaryObjectRepository legendaryObjectRepository;
    
    @Autowired
    private PsiGraphService psiGraphService;
    
    /**
     * Initialiser les objets légendaires prédéfinis
     */
    public void initializeLegendaryObjects() {
        // Créer les objets s'ils n'existent pas déjà
        createIfNotExists(LegendaryObject.createTowerOfAnchoring());
        createIfNotExists(LegendaryObject.createEyeOfWigner());
        createIfNotExists(LegendaryObject.createVeil());
        createIfNotExists(LegendaryObject.createLameDAvantMonde());
        createIfNotExists(LegendaryObject.createRollbackTotem());
        createIfNotExists(LegendaryObject.createSpectralShoes());
    }
    
    /**
     * Créer un objet s'il n'existe pas déjà
     */
    private void createIfNotExists(LegendaryObject legendaryObject) {
        if (!legendaryObjectRepository.existsByName(legendaryObject.getName())) {
            legendaryObjectRepository.save(legendaryObject);
        }
    }
    
    /**
     * Obtenir tous les objets qui affectent la timeline
     */
    public List<LegendaryObject> getTimelineAffectingObjects() {
        return legendaryObjectRepository.findByAffectsTimeline(true);
    }
    
    /**
     * Obtenir tous les objets qui n'affectent pas la timeline (opt-out)
     */
    public List<LegendaryObject> getOptedOutObjects() {
        return legendaryObjectRepository.findByAffectsTimeline(false);
    }
    
    /**
     * Vérifier si un objet devrait être inclus dans les calculs causaux
     */
    public boolean shouldIncludeInCausalityCalculation(LegendaryObject object, TileCoord position, Game game) {
        // Règle principale : vérifier affectsTimeline
        if (!object.shouldParticipateInCausalityCalculation()) {
            return false;
        }
        
        // Vérifier si l'objet est actif
        if (!object.isActive()) {
            return false;
        }
        
        // Vérifier si l'objet peut être utilisé
        if (object.isRequiresActivation() && !object.canBeUsed(game.getCurrentTurn())) {
            return false;
        }
        
        return true;
    }
    
    /**
     * Calculer les effets causaux à une position donnée
     */
    public Map<String, Object> calculateCausalEffectsAtPosition(Game game, TileCoord position) {
        Map<String, Object> effects = new HashMap<>();
        
        // Trouver tous les objets qui affectent cette position
        List<LegendaryObject> affectingObjects = findObjectsAffectingPosition(game, position);
        
        // Calculer les effets combinés
        boolean preventsTimeline = false;
        boolean forcesObservation = false;
        boolean forcesCollapse = false;
        boolean enablesGhostVision = false;
        Set<String> activeEffects = new HashSet<>();
        
        for (LegendaryObject object : affectingObjects) {
            if (object.preventsTimelineProjection()) {
                preventsTimeline = true;
            }
            if (object.forcesObservation()) {
                forcesObservation = true;
            }
            if (object.hasEffect(CausalityEffect.FORCE_COLLAPSE)) {
                forcesCollapse = true;
            }
            if (object.enablesGhostVision()) {
                enablesGhostVision = true;
            }
            
            // Ajouter tous les effets
            for (CausalityEffect effect : object.getEffects()) {
                activeEffects.add(effect.name());
            }
        }
        
        effects.put("preventsTimeline", preventsTimeline);
        effects.put("forcesObservation", forcesObservation);
        effects.put("forcesCollapse", forcesCollapse);
        effects.put("enablesGhostVision", enablesGhostVision);
        effects.put("activeEffects", activeEffects);
        effects.put("affectingObjects", affectingObjects.stream()
                .map(LegendaryObject::getName)
                .collect(Collectors.toList()));
        
        return effects;
    }
    
    /**
     * Trouver tous les objets qui affectent une position donnée
     */
    private List<LegendaryObject> findObjectsAffectingPosition(Game game, TileCoord position) {
        List<LegendaryObject> allObjects = legendaryObjectRepository.findByAffectsTimeline(true);
        List<LegendaryObject> affectingObjects = new ArrayList<>();
        
        for (LegendaryObject object : allObjects) {
            // TODO: Obtenir la position actuelle de l'objet depuis le jeu
            // Pour l'instant, on suppose que les objets ont une position fixe ou sont portés par des héros
            TileCoord objectPosition = getObjectPosition(game, object);
            
            if (objectPosition != null && 
                object.isInInfluenceRadius(objectPosition, position)) {
                affectingObjects.add(object);
            }
        }
        
        return affectingObjects;
    }
    
    /**
     * Obtenir la position d'un objet dans le jeu
     */
    private TileCoord getObjectPosition(Game game, LegendaryObject object) {
        // Implémentation simplifiée - à étendre selon la logique du jeu
        // Rechercher dans l'inventaire des héros ou les positions fixes
        
        if (object.getObjectType().isFixed()) {
            // Objets fixes comme la Tower of Anchoring
            // TODO: Obtenir depuis une table de positions fixes
            return new TileCoord(10, 10); // Position d'exemple
        } else if (object.getObjectType().isPortable()) {
            // Objets portables - chercher dans l'inventaire des héros
            for (Hero hero : game.getHeroes()) {
                if (hero.getInventory().contains(object.getName())) {
                    return new TileCoord(hero.getPositionX(), hero.getPositionY());
                }
            }
        }
        
        return null;
    }
    
    /**
     * Activer un objet légendaire
     */
    public Map<String, Object> activateLegendaryObject(String objectName, Game game, TileCoord position, String activatingPlayer) {
        Map<String, Object> result = new HashMap<>();
        
        LegendaryObject object = legendaryObjectRepository.findByName(objectName);
        if (object == null) {
            result.put("success", false);
            result.put("error", "Legendary object not found: " + objectName);
            return result;
        }
        
        // Vérifier si l'objet peut être utilisé
        if (!object.canBeUsed(game.getCurrentTurn())) {
            result.put("success", false);
            result.put("error", "Object is on cooldown or inactive");
            return result;
        }
        
        // Activer l'objet
        object.use(game.getCurrentTurn());
        legendaryObjectRepository.save(object);
        
        // Appliquer les effets
        Map<String, Object> effects = applyObjectEffects(object, game, position, activatingPlayer);
        
        result.put("success", true);
        result.put("objectName", objectName);
        result.put("effects", effects);
        result.put("message", "Legendary object " + objectName + " activated successfully");
        
        return result;
    }
    
    /**
     * Appliquer les effets d'un objet légendaire
     */
    private Map<String, Object> applyObjectEffects(LegendaryObject object, Game game, TileCoord position, String activatingPlayer) {
        Map<String, Object> effects = new HashMap<>();
        
        for (CausalityEffect effect : object.getEffects()) {
            switch (effect) {
                case FORCE_OBSERVATION:
                    effects.put("forceObservation", applyForceObservation(object, game, position));
                    break;
                case FORCE_COLLAPSE:
                    effects.put("forceCollapse", applyForceCollapse(object, game, position));
                    break;
                case PREVENT_TIMELINE_PROJECTION:
                    effects.put("preventTimeline", applyPreventTimelineProjection(object, game, position));
                    break;
                case ENABLE_GHOST_VISION:
                    effects.put("enableGhostVision", applyEnableGhostVision(object, game, activatingPlayer));
                    break;
                case COLLAPSE_OPPONENT_TIMELINE:
                    effects.put("collapseOpponent", applyCollapseOpponentTimeline(object, game, position, activatingPlayer));
                    break;
                case REWIND_REALITY:
                    effects.put("rewindReality", applyRewindReality(object, game));
                    break;
                default:
                    effects.put(effect.name(), "Effect not implemented yet");
            }
        }
        
        return effects;
    }
    
    /**
     * Appliquer l'effet Force Observation
     */
    private Map<String, Object> applyForceObservation(LegendaryObject object, Game game, TileCoord position) {
        Map<String, Object> result = new HashMap<>();
        
        // Forcer l'observation de tous les nœuds dans le rayon d'influence
        List<PsiNode> affectedNodes = psiGraphService.getActiveNodes(game).stream()
                .filter(node -> object.isInInfluenceRadius(position, node.getTile()))
                .collect(Collectors.toList());
        
        for (PsiNode node : affectedNodes) {
            node.observe();
        }
        
        result.put("affectedNodes", affectedNodes.size());
        result.put("message", "Forced observation on " + affectedNodes.size() + " nodes");
        
        return result;
    }
    
    /**
     * Appliquer l'effet Force Collapse
     */
    private Map<String, Object> applyForceCollapse(LegendaryObject object, Game game, TileCoord position) {
        Map<String, Object> result = new HashMap<>();
        
        // Forcer l'effondrement de tous les nœuds superposés dans le rayon
        List<PsiNode> superposedNodes = psiGraphService.getActiveNodes(game).stream()
                .filter(node -> node.isSuperposed())
                .filter(node -> object.isInInfluenceRadius(position, node.getTile()))
                .collect(Collectors.toList());
        
        for (PsiNode node : superposedNodes) {
            psiGraphService.collapseNode(node, "Forced by " + object.getName());
        }
        
        result.put("collapsedNodes", superposedNodes.size());
        result.put("message", "Forced collapse of " + superposedNodes.size() + " superposed nodes");
        
        return result;
    }
    
    /**
     * Appliquer l'effet Prevent Timeline Projection
     */
    private Map<String, Object> applyPreventTimelineProjection(LegendaryObject object, Game game, TileCoord position) {
        Map<String, Object> result = new HashMap<>();
        
        // Marquer la zone comme ancrée
        List<PsiNode> affectedNodes = psiGraphService.getActiveNodes(game).stream()
                .filter(node -> object.isInInfluenceRadius(position, node.getTile()))
                .collect(Collectors.toList());
        
        for (PsiNode node : affectedNodes) {
            node.setCausalityZone(CausalityZone.ANCHORED);
            node.addEffect("TIMELINE_PROJECTION_PREVENTED");
        }
        
        result.put("anchoredNodes", affectedNodes.size());
        result.put("message", "Prevented timeline projection on " + affectedNodes.size() + " nodes");
        
        return result;
    }
    
    /**
     * Appliquer l'effet Enable Ghost Vision
     */
    private Map<String, Object> applyEnableGhostVision(LegendaryObject object, Game game, String player) {
        Map<String, Object> result = new HashMap<>();
        
        // Marquer tous les nœuds comme visibles en mode fantôme pour ce joueur
        List<PsiNode> playerNodes = psiGraphService.getActiveNodes(game).stream()
                .filter(node -> player.equals(node.getOwnerPlayer()))
                .collect(Collectors.toList());
        
        for (PsiNode node : playerNodes) {
            node.updateGhostVisibility(true);
        }
        
        result.put("ghostVisibleNodes", playerNodes.size());
        result.put("message", "Enabled ghost vision for " + playerNodes.size() + " nodes");
        
        return result;
    }
    
    /**
     * Appliquer l'effet Collapse Opponent Timeline
     */
    private Map<String, Object> applyCollapseOpponentTimeline(LegendaryObject object, Game game, TileCoord position, String activatingPlayer) {
        Map<String, Object> result = new HashMap<>();
        
        // Effondrer tous les nœuds des adversaires dans la zone
        List<PsiNode> opponentNodes = psiGraphService.getActiveNodes(game).stream()
                .filter(node -> !activatingPlayer.equals(node.getOwnerPlayer()))
                .filter(node -> object.isInInfluenceRadius(position, node.getTile()))
                .collect(Collectors.toList());
        
        for (PsiNode node : opponentNodes) {
            psiGraphService.collapseNode(node, "Collapsed by " + object.getName());
        }
        
        result.put("collapsedOpponentNodes", opponentNodes.size());
        result.put("message", "Collapsed " + opponentNodes.size() + " opponent nodes");
        
        return result;
    }
    
    /**
     * Appliquer l'effet Rewind Reality
     */
    private Map<String, Object> applyRewindReality(LegendaryObject object, Game game) {
        Map<String, Object> result = new HashMap<>();
        
        // Rembobiner le jeu de quelques tours
        int rewindTurns = 3;
        int newTurn = Math.max(0, game.getCurrentTurn() - rewindTurns);
        
        // TODO: Implémenter la logique de rembobinage
        // Ceci nécessiterait un système de sauvegarde d'état
        
        result.put("rewindTurns", rewindTurns);
        result.put("newTurn", newTurn);
        result.put("message", "Reality rewound by " + rewindTurns + " turns");
        
        return result;
    }
    
    /**
     * Analyser les objets légendaires dans le jeu
     */
    public Map<String, Object> analyzeLegendaryObjects(Game game) {
        Map<String, Object> analysis = new HashMap<>();
        
        List<LegendaryObject> allObjects = legendaryObjectRepository.findAll();
        
        // Statistiques générales
        analysis.put("totalObjects", allObjects.size());
        analysis.put("activeObjects", allObjects.stream().filter(LegendaryObject::isActive).count());
        analysis.put("timelineAffectingObjects", allObjects.stream().filter(LegendaryObject::isAffectsTimeline).count());
        analysis.put("optedOutObjects", allObjects.stream().filter(obj -> !obj.isAffectsTimeline()).count());
        
        // Répartition par type
        Map<LegendaryObjectType, Long> typeDistribution = allObjects.stream()
                .collect(Collectors.groupingBy(LegendaryObject::getObjectType, Collectors.counting()));
        analysis.put("typeDistribution", typeDistribution);
        
        // Effets actifs
        Set<CausalityEffect> activeEffects = allObjects.stream()
                .filter(LegendaryObject::isActive)
                .flatMap(obj -> obj.getEffects().stream())
                .collect(Collectors.toSet());
        analysis.put("activeEffects", activeEffects);
        
        return analysis;
    }
    
    /**
     * Obtenir tous les objets légendaires
     */
    public List<LegendaryObject> getAllLegendaryObjects() {
        return legendaryObjectRepository.findAll();
    }
    
    /**
     * Obtenir un objet légendaire par son nom
     */
    public LegendaryObject getLegendaryObjectByName(String name) {
        return legendaryObjectRepository.findByName(name);
    }
    
    /**
     * Sauvegarder un objet légendaire
     */
    public LegendaryObject saveLegendaryObject(LegendaryObject object) {
        return legendaryObjectRepository.save(object);
    }
} 