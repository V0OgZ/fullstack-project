package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.service.GodViewService.*;
import com.heroesoftimepoc.temporalengine.repository.PsiStateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 🎛️ PANOPTICΩN Service - Visualisation 3D du multivers temporel
 * Le pouvoir ultime d'observation et de manipulation temporelle
 * 
 * @author JeanGrofignon
 */
@Service
@Transactional
public class PanopticonService {
    
    @Autowired
    private GodViewService godViewService;
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    @Autowired
    private TemporalEngineService temporalEngine;
    
    /**
     * Structure de données pour visualisation 3D
     */
    public static class VisualizationData {
        public final List<SpatialNode> spatialNodes;
        public final List<CausalLink> causalConnections;
        public final List<TemporalLayer> temporalLayers;
        public final List<InterferenceZone> quantumInterferences;
        public final Map<String, TimelineData> timelines;
        
        public VisualizationData(List<SpatialNode> spatialNodes,
                                List<CausalLink> causalConnections,
                                List<TemporalLayer> temporalLayers,
                                List<InterferenceZone> quantumInterferences,
                                Map<String, TimelineData> timelines) {
            this.spatialNodes = spatialNodes;
            this.causalConnections = causalConnections;
            this.temporalLayers = temporalLayers;
            this.quantumInterferences = quantumInterferences;
            this.timelines = timelines;
        }
    }
    
    /**
     * Nœud spatial pour Three.js
     */
    public static class SpatialNode {
        public final String id;
        public final Position3D position;
        public final String type; // hero, artifact, psi_state, building
        public final String status; // confirmed, quantum, conflicted, expired
        public final String timeline;
        public final Map<String, Object> metadata;
        
        public SpatialNode(String id, Position3D position, String type,
                          String status, String timeline, Map<String, Object> metadata) {
            this.id = id;
            this.position = position;
            this.type = type;
            this.status = status;
            this.timeline = timeline;
            this.metadata = metadata;
        }
    }
    
    /**
     * Position 3D pour rendu
     */
    public static class Position3D {
        public final double x, y, z;
        
        public Position3D(double x, double y, double z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }
    
    /**
     * Générer les données PANOPTICΩN depuis GodViewService
     */
    public VisualizationData generatePanopticonData(Long gameId) {
        // Obtenir la vue multivers complète
        MultiverseView multiverse = godViewService.getCompleteMultiverse(gameId);
        Game game = godViewService.getGame(gameId);
        
        // Convertir pour visualisation 3D
        List<SpatialNode> spatialNodes = convertToSpatialNodes(multiverse, game);
        List<CausalLink> causalConnections = extractCausalConnections(multiverse);
        List<TemporalLayer> temporalLayers = convertTemporalLayers(multiverse.temporalLayers);
        List<InterferenceZone> interferenceZones = calculateInterferenceZones(multiverse.fogMap);
        Map<String, TimelineData> timelines = convertTimelines(multiverse.timelines);
        
        return new VisualizationData(
            spatialNodes,
            causalConnections,
            temporalLayers,
            interferenceZones,
            timelines
        );
    }
    
    /**
     * Activer le pouvoir ABSOLUTE_OBSERVER
     */
    public PanopticonView activateAbsoluteObserver(Long gameId, String heroName) {
        Game game = godViewService.getGame(gameId);
        Hero hero = godViewService.getHero(gameId, heroName);
        
        // Vérifier que le héros a l'artefact requis
        if (!hero.hasItem("singularity_artifact") && !hero.getName().equals("Jean-Grofignon")) {
            throw new IllegalStateException("Hero needs Singularity artifact to activate ABSOLUTE_OBSERVER");
        }
        
        // Générer la vue complète
        VisualizationData data = generatePanopticonData(gameId);
        
        // Marquer le héros comme observateur absolu
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("absoluteObserver", true);
        metadata.put("observationStartTurn", game.getCurrentTurn());
        metadata.put("heroName", heroName);
        
        return new PanopticonView(data, metadata);
    }
    
    /**
     * Injecter une action dans une timeline future
     */
    public ActionResult injectTemporalAction(Long gameId, String timelineId,
                                           Position5D target, String action) {
        Game game = godViewService.getGame(gameId);
        
        // Vérifier la possibilité avec GodView
        Hero observer = game.getHeroes().stream()
            .filter(h -> h.hasItem("singularity_artifact") || h.getName().equals("Jean-Grofignon"))
            .findFirst()
            .orElseThrow(() -> new IllegalStateException("No absolute observer active"));
        
        // Créer un état ψ futur spécial
        PsiState injectedAction = new PsiState();
        injectedAction.setPsiId("ψ999-PANOPTICON-" + System.currentTimeMillis());
        injectedAction.setExpression(action + " [INJECTED_FROM_PANOPTICON]");
        injectedAction.setBranchId(timelineId);
        injectedAction.setTargetX(target.x);
        injectedAction.setTargetY(target.y);
        injectedAction.setDeltaT(target.day - (game.getCurrentTurn() / 7));
        injectedAction.setOwnerHero(observer.getName());
        injectedAction.setProbability(1.0); // Actions injectées sont certaines
        injectedAction.setGame(game);
        
        // Metadata spéciale
        injectedAction.setActionType("PANOPTICON_INJECTION");
        
        // Sauvegarder
        psiStateRepository.save(injectedAction);
        game.addPsiState(injectedAction);
        
        return new ActionResult(true, 
            "Action injected into timeline " + timelineId + " at day " + target.day,
            injectedAction.getPsiId());
    }
    
    /**
     * Obtenir les métriques de debug
     */
    public Map<String, Object> getDebugMetrics(Long gameId) {
        MultiverseView multiverse = godViewService.getCompleteMultiverse(gameId);
        
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("activePsiStates", multiverse.allPsiStates.size());
        metrics.put("timelineCount", multiverse.timelines.size());
        metrics.put("temporalLayers", multiverse.temporalLayers.size());
        metrics.put("causalityWalls", multiverse.causalityWalls.size());
        
        // Calculer la densité moyenne du fog
        double avgFog = multiverse.fogMap.values().stream()
            .mapToDouble(Double::doubleValue)
            .average()
            .orElse(0.0);
        metrics.put("averageFogDensity", avgFog);
        
        // Compter les interférences
        long interferenceCount = multiverse.allPsiStates.stream()
            .filter(PsiState::isUsingComplexAmplitude)
            .count();
        metrics.put("quantumInterferences", interferenceCount);
        
        return metrics;
    }
    
    // ===== MÉTHODES DE CONVERSION =====
    
    private List<SpatialNode> convertToSpatialNodes(MultiverseView multiverse, Game game) {
        List<SpatialNode> nodes = new ArrayList<>();
        
        // Convertir les héros
        for (Hero hero : game.getHeroes()) {
            Position3D pos3D = new Position3D(
                hero.getPositionX(),
                hero.getPositionY(),
                hero.getCurrentDay() * 10 // Jour = hauteur Z
            );
            
            Map<String, Object> metadata = new HashMap<>();
            metadata.put("name", hero.getName());
            metadata.put("health", hero.getHealth());
            metadata.put("temporalEnergy", hero.getTemporalEnergy());
            metadata.put("currentDay", hero.getCurrentDay());
            
            nodes.add(new SpatialNode(
                "hero-" + hero.getName(),
                pos3D,
                "hero",
                "confirmed",
                hero.getTimelineBranch(),
                metadata
            ));
        }
        
        // Convertir les états ψ
        for (PsiState psi : multiverse.allPsiStates) {
            if (psi.getTargetX() != null && psi.getTargetY() != null) {
                int futureDay = (game.getCurrentTurn() / 7) + (psi.getDeltaT() != null ? psi.getDeltaT() : 0);
                Position3D pos3D = new Position3D(
                    psi.getTargetX(),
                    psi.getTargetY(),
                    futureDay * 10
                );
                
                Map<String, Object> metadata = new HashMap<>();
                metadata.put("psiId", psi.getPsiId());
                metadata.put("expression", psi.getExpression());
                metadata.put("probability", psi.isUsingComplexAmplitude() ? 
                    psi.getComplexAmplitude().getProbability() : psi.getProbability());
                
                String status = psi.isActive() ? "quantum" : "expired";
                if (psi.getStatus() == PsiState.PsiStatus.COLLAPSED) {
                    status = "confirmed";
                }
                
                nodes.add(new SpatialNode(
                    "psi-" + psi.getPsiId(),
                    pos3D,
                    "psi_state",
                    status,
                    psi.getBranchId(),
                    metadata
                ));
            }
        }
        
        return nodes;
    }
    
    private List<CausalLink> extractCausalConnections(MultiverseView multiverse) {
        List<CausalLink> links = new ArrayList<>();
        
        // Extraire les connexions depuis les états ψ
        for (PsiState psi : multiverse.allPsiStates) {
            if (psi.getOwnerHero() != null && psi.getTargetX() != null) {
                links.add(new CausalLink(
                    "hero-" + psi.getOwnerHero(),
                    "psi-" + psi.getPsiId(),
                    "creates",
                    psi.getProbability()
                ));
            }
        }
        
        return links;
    }
    
    private List<TemporalLayer> convertTemporalLayers(Map<Integer, GodViewService.TemporalSnapshot> snapshots) {
        return snapshots.entrySet().stream()
            .map(entry -> new TemporalLayer(
                entry.getKey(),
                entry.getValue(),
                entry.getKey() * 10 // Z position
            ))
            .collect(Collectors.toList());
    }
    
    private List<InterferenceZone> calculateInterferenceZones(Map<Position5D, Double> fogMap) {
        List<InterferenceZone> zones = new ArrayList<>();
        
        // Grouper par position spatiale
        Map<String, List<Map.Entry<Position5D, Double>>> byPosition = fogMap.entrySet().stream()
            .collect(Collectors.groupingBy(
                entry -> entry.getKey().x + "," + entry.getKey().y
            ));
        
        // Créer des zones d'interférence où le fog est dense
        for (Map.Entry<String, List<Map.Entry<Position5D, Double>>> posGroup : byPosition.entrySet()) {
            double maxFog = posGroup.getValue().stream()
                .mapToDouble(e -> e.getValue())
                .max()
                .orElse(0.0);
            
            if (maxFog > 0.7) { // Seuil pour interférence
                String[] coords = posGroup.getKey().split(",");
                zones.add(new InterferenceZone(
                    Integer.parseInt(coords[0]),
                    Integer.parseInt(coords[1]),
                    maxFog,
                    "quantum_interference"
                ));
            }
        }
        
        return zones;
    }
    
    private Map<String, TimelineData> convertTimelines(Map<String, GodViewService.Timeline> timelines) {
        Map<String, TimelineData> result = new HashMap<>();
        
        for (Map.Entry<String, GodViewService.Timeline> entry : timelines.entrySet()) {
            GodViewService.Timeline timeline = entry.getValue();
            result.put(entry.getKey(), new TimelineData(
                timeline.id,
                timeline.name,
                timeline.isMain,
                getTimelineColor(timeline.id)
            ));
        }
        
        return result;
    }
    
    private String getTimelineColor(String timelineId) {
        switch (timelineId) {
            case "ℬ1": return "#0066CC"; // Bleu
            case "ℬ2": return "#CC0000"; // Rouge
            case "ℬ3": return "#00CC66"; // Vert
            default: return "#666666";   // Gris
        }
    }
    
    // ===== CLASSES INTERNES =====
    
    public static class PanopticonView {
        public final VisualizationData data;
        public final Map<String, Object> metadata;
        
        public PanopticonView(VisualizationData data, Map<String, Object> metadata) {
            this.data = data;
            this.metadata = metadata;
        }
    }
    
    public static class ActionResult {
        public final boolean success;
        public final String message;
        public final String actionId;
        
        public ActionResult(boolean success, String message, String actionId) {
            this.success = success;
            this.message = message;
            this.actionId = actionId;
        }
    }
    
    public static class CausalLink {
        public final String sourceId;
        public final String targetId;
        public final String type;
        public final double strength;
        
        public CausalLink(String sourceId, String targetId, String type, double strength) {
            this.sourceId = sourceId;
            this.targetId = targetId;
            this.type = type;
            this.strength = strength;
        }
    }
    
    public static class TemporalLayer {
        public final int day;
        public final GodViewService.TemporalSnapshot snapshot;
        public final double zPosition;
        
        public TemporalLayer(int day, GodViewService.TemporalSnapshot snapshot, double zPosition) {
            this.day = day;
            this.snapshot = snapshot;
            this.zPosition = zPosition;
        }
    }
    
    public static class InterferenceZone {
        public final int x, y;
        public final double intensity;
        public final String type;
        
        public InterferenceZone(int x, int y, double intensity, String type) {
            this.x = x;
            this.y = y;
            this.intensity = intensity;
            this.type = type;
        }
    }
    
    public static class TimelineData {
        public final String id;
        public final String name;
        public final boolean isMain;
        public final String color;
        
        public TimelineData(String id, String name, boolean isMain, String color) {
            this.id = id;
            this.name = name;
            this.isMain = isMain;
            this.color = color;
        }
    }
} 