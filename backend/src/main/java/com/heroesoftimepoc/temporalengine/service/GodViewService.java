package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service God View - Vision complète du multivers 5D
 * Pour Jean qui voit TOUT : passé, présent, futur, toutes les timelines
 * 
 * @author JeanGrofignon
 */
@Service
@Transactional
public class GodViewService {
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private CausalityZoneService causalityZoneService;
    
    @Autowired
    private PsiGraphService psiGraphService;
    
    @Autowired
    private CausalCollapseService causalCollapseService;
    
    /**
     * Position dans l'espace-temps 5D
     */
    public static class Position5D {
        public final int x, y, z;
        public final String timeline;
        public final int day;
        
        public Position5D(int x, int y, int z, String timeline, int day) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.timeline = timeline;
            this.day = day;
        }
        
        public double distanceTo(Position5D other) {
            // Distance euclidienne dans l'espace 3D
            double spatialDistance = Math.sqrt(
                Math.pow(x - other.x, 2) + 
                Math.pow(y - other.y, 2) + 
                Math.pow(z - other.z, 2)
            );
            
            // Pénalité pour différence temporelle
            double temporalDistance = Math.abs(day - other.day);
            
            // Pénalité infinie si timeline différente (sauf pouvoirs spéciaux)
            double timelinePenalty = timeline.equals(other.timeline) ? 0 : 1000;
            
            return spatialDistance + temporalDistance + timelinePenalty;
        }
        
        @Override
        public String toString() {
            return String.format("(%d,%d,%d)@%s:J%d", x, y, z, timeline, day);
        }
    }
    
    /**
     * Vue complète du multivers pour God Admin
     */
    public static class MultiverseView {
        public final Map<String, Timeline> timelines;
        public final Map<Integer, TemporalSnapshot> temporalLayers;
        public final Map<Position5D, Double> fogMap;
        public final List<PsiState> allPsiStates;
        public final Map<String, CausalityWall> causalityWalls;
        public final List<PossibleFuture> possibleFutures;
        
        public MultiverseView(Map<String, Timeline> timelines,
                             Map<Integer, TemporalSnapshot> temporalLayers,
                             Map<Position5D, Double> fogMap,
                             List<PsiState> allPsiStates,
                             Map<String, CausalityWall> causalityWalls,
                             List<PossibleFuture> possibleFutures) {
            this.timelines = timelines;
            this.temporalLayers = temporalLayers;
            this.fogMap = fogMap;
            this.allPsiStates = allPsiStates;
            this.causalityWalls = causalityWalls;
            this.possibleFutures = possibleFutures;
        }
    }
    
    /**
     * Obtenir la vue complète du multivers
     * Jean voit TOUT !
     */
    public MultiverseView getCompleteMultiverse(Long gameId) {
        Game game = gameRepository.findById(gameId)
            .orElseThrow(() -> new IllegalArgumentException("Game not found"));
        
        // 1. Toutes les timelines
        Map<String, Timeline> timelines = getAllTimelines(game);
        
        // 2. Tous les jours (passé/présent/futur)
        Map<Integer, TemporalSnapshot> temporalLayers = getAllTemporalLayers(game);
        
        // 3. Carte complète du fog 5D
        Map<Position5D, Double> fogMap = calculateCompleteFogMap(game);
        
        // 4. Tous les états ψ à travers le temps
        List<PsiState> allPsiStates = getAllPsiStatesAcrossTime(game);
        
        // 5. Murs de causalité pour chaque héros
        Map<String, CausalityWall> causalityWalls = calculateAllCausalityWalls(game);
        
        // 6. Simulation de tous les futurs possibles
        List<PossibleFuture> possibleFutures = simulateAllPossibleFutures(game);
        
        return new MultiverseView(
            timelines, temporalLayers, fogMap, 
            allPsiStates, causalityWalls, possibleFutures
        );
    }
    
    /**
     * Calculer le fog à une position 5D
     */
    public double calculateFogAt5D(Game game, Position5D pos) {
        double fog = 0.0;
        
        // 1. Densité quantique (nombre d'états ψ)
        long quantumDensity = game.getPsiStates().stream()
            .filter(psi -> psi.isActive() && 
                          psi.getTargetX() == pos.x && 
                          psi.getTargetY() == pos.y)
            .count();
        fog += Math.min(1.0, quantumDensity * 0.1) * 0.25;
        
        // 2. Distance temporelle du présent
        int currentDay = game.getCurrentTurn() / 7; // Approximation
        double temporalDistance = Math.abs(pos.day - currentDay) / 100.0;
        fog += Math.min(1.0, temporalDistance) * 0.25;
        
        // 3. Divergence des timelines
        double timelineDivergence = calculateTimelineDivergence(game, pos.timeline);
        fog += timelineDivergence * 0.25;
        
        // 4. Interférences causales
        double causalInterference = calculateCausalInterference(game, pos);
        fog += causalInterference * 0.25;
        
        return Math.min(1.0, fog);
    }
    
    /**
     * Déterminer l'état du fog à une position 5D pour un joueur
     */
    public FogState getFogStateAt5D(Game game, Position5D pos, String playerId) {
        // Utiliser le service existant pour la position 2D actuelle
        TileCoord tilePos = new TileCoord(pos.x, pos.y);
        
        // Si dans le passé
        if (pos.day < game.getCurrentTurn() / 7) {
            return FogState.COLLAPSED_PAST;
        }
        
        // Si dans une autre timeline
        if (!pos.timeline.equals(game.getCurrentTimeline())) {
            Hero playerHero = game.getHeroesByPlayer(playerId).stream().findFirst().orElse(null);
            if (playerHero != null && playerHero.hasItem("multiverse_lens")) {
                return FogState.GHOST;
            }
            return FogState.UNEXPLORED;
        }
        
        // Sinon utiliser le calcul 2D existant
        return causalityZoneService.determineFogState(game, tilePos, playerId);
    }
    
    /**
     * Le vrai mur de causalité en 5D
     */
    public static class CausalityWall {
        public final int spatialLimit;
        public final int temporalLimitPast;
        public final int temporalLimitFuture;
        public final Set<String> accessibleTimelines;
        public final Map<Position5D, Double> quantumBarriers;
        public final double averageFogDensity;
        
        public CausalityWall(int spatialLimit, int temporalLimitPast, int temporalLimitFuture,
                            Set<String> accessibleTimelines, Map<Position5D, Double> quantumBarriers,
                            double averageFogDensity) {
            this.spatialLimit = spatialLimit;
            this.temporalLimitPast = temporalLimitPast;
            this.temporalLimitFuture = temporalLimitFuture;
            this.accessibleTimelines = accessibleTimelines;
            this.quantumBarriers = quantumBarriers;
            this.averageFogDensity = averageFogDensity;
        }
    }
    
    /**
     * Calculer le mur de causalité pour un héros
     */
    public CausalityWall calculateCausalityWall(Game game, Hero hero) {
        // Limite spatiale
        int spatialLimit = hero.getMovementPoints();
        if (hero.hasItem("temporal_sword")) spatialLimit += 10;
        
        // Limite temporelle passé (ne peut pas remonter avant le joueur le plus en retard)
        int earliestDay = game.getHeroes().stream()
            .mapToInt(Hero::getCurrentDay)
            .min()
            .orElse(0);
        int temporalLimitPast = hero.getName().equals("Axis") ? Integer.MIN_VALUE : earliestDay;
        
        // Limite temporelle futur
        int temporalLimitFuture = hero.getCurrentDay() + hero.getTemporalVisionRange();
        
        // Timelines accessibles
        Set<String> accessibleTimelines = new HashSet<>();
        accessibleTimelines.add(game.getCurrentTimeline());
        if (hero.hasItem("multiverse_gate")) {
            accessibleTimelines.add("ℬ2");
            accessibleTimelines.add("ℬ3");
        }
        
        // Barrières quantiques
        Map<Position5D, Double> quantumBarriers = calculateQuantumBarriers(game, hero);
        
        // Densité moyenne du fog
        double avgFog = quantumBarriers.values().stream()
            .mapToDouble(Double::doubleValue)
            .average()
            .orElse(0.5);
        
        return new CausalityWall(
            spatialLimit, temporalLimitPast, temporalLimitFuture,
            accessibleTimelines, quantumBarriers, avgFog
        );
    }
    
    /**
     * Vérifier si un héros peut se déplacer vers une position 5D
     */
    public boolean canHeroMoveTo5D(Game game, Hero hero, Position5D target) {
        CausalityWall wall = calculateCausalityWall(game, hero);
        Position5D heroPos = getHeroPosition5D(hero);
        
        // 1. Vérifier distance spatiale
        double distance = heroPos.distanceTo(target);
        if (distance > wall.spatialLimit && !hero.hasItem("avant_world_blade")) {
            return false;
        }
        
        // 2. Vérifier limites temporelles
        if (target.day < wall.temporalLimitPast || target.day > wall.temporalLimitFuture) {
            return false;
        }
        
        // 3. Vérifier timeline accessible
        if (!wall.accessibleTimelines.contains(target.timeline)) {
            return false;
        }
        
        // 4. Vérifier le fog
        FogState fogState = getFogStateAt5D(game, target, hero.getPlayerId());
        switch (fogState) {
            case UNEXPLORED:
                return false;
            case GHOST:
                return hero.hasItem("ghost_walk") || hero.hasItem("veil_of_shadows");
            case ANCHORED:
                // Peut y aller mais forcera un collapse
                return true;
            default:
                return true;
        }
    }
    
    // ===== MÉTHODES PRIVÉES =====
    
    private Map<String, Timeline> getAllTimelines(Game game) {
        Map<String, Timeline> timelines = new HashMap<>();
        
        // Timeline principale
        timelines.put("ℬ1", new Timeline("ℬ1", "Timeline principale", true));
        
        // Timelines alternatives si des branches existent
        if (game.getPsiStates().stream().anyMatch(psi -> "ℬ2".equals(psi.getBranchId()))) {
            timelines.put("ℬ2", new Timeline("ℬ2", "Timeline alternative 1", false));
        }
        
        return timelines;
    }
    
    private Map<Integer, TemporalSnapshot> getAllTemporalLayers(Game game) {
        Map<Integer, TemporalSnapshot> layers = new HashMap<>();
        
        int minDay = 0;
        int maxDay = game.getCurrentTurn() / 7 + 30; // 30 jours dans le futur
        
        for (int day = minDay; day <= maxDay; day++) {
            layers.put(day, createTemporalSnapshot(game, day));
        }
        
        return layers;
    }
    
    private Map<Position5D, Double> calculateCompleteFogMap(Game game) {
        Map<Position5D, Double> fogMap = new HashMap<>();
        
        // Pour chaque timeline
        for (String timeline : Arrays.asList("ℬ1", "ℬ2", "ℬ3")) {
            // Pour chaque jour (-10 à +30 du jour actuel)
            int currentDay = game.getCurrentTurn() / 7;
            for (int day = currentDay - 10; day <= currentDay + 30; day++) {
                // Pour chaque position sur la carte
                for (int x = 0; x < game.getMapWidth(); x++) {
                    for (int y = 0; y < game.getMapHeight(); y++) {
                        Position5D pos = new Position5D(x, y, 0, timeline, day);
                        double fog = calculateFogAt5D(game, pos);
                        fogMap.put(pos, fog);
                    }
                }
            }
        }
        
        return fogMap;
    }
    
    private List<PsiState> getAllPsiStatesAcrossTime(Game game) {
        // Tous les états ψ, même inactifs (pour voir l'historique)
        return psiStateRepository.findAll().stream()
            .filter(psi -> psi.getGame().getId().equals(game.getId()))
            .collect(Collectors.toList());
    }
    
    private Map<String, CausalityWall> calculateAllCausalityWalls(Game game) {
        Map<String, CausalityWall> walls = new HashMap<>();
        
        for (Hero hero : game.getHeroes()) {
            walls.put(hero.getName(), calculateCausalityWall(game, hero));
        }
        
        return walls;
    }
    
    private List<PossibleFuture> simulateAllPossibleFutures(Game game) {
        List<PossibleFuture> futures = new ArrayList<>();
        
        // Simuler les 5 prochains tours
        for (int i = 1; i <= 5; i++) {
            PossibleFuture future = simulateFuture(game, i);
            futures.add(future);
        }
        
        return futures;
    }
    
    private double calculateTimelineDivergence(Game game, String timeline) {
        if ("ℬ1".equals(timeline)) return 0.0;
        if ("ℬ2".equals(timeline)) return 0.3;
        return 0.6; // Timelines plus éloignées
    }
    
    private double calculateCausalInterference(Game game, Position5D pos) {
        // Compter les conflits potentiels à cette position
        long conflicts = game.getPsiStates().stream()
            .filter(psi -> psi.getTargetX() == pos.x && 
                          psi.getTargetY() == pos.y &&
                          Math.abs(psi.getDeltaT() - pos.day) < 3)
            .count();
        
        return Math.min(1.0, conflicts * 0.2);
    }
    
    private Map<Position5D, Double> calculateQuantumBarriers(Game game, Hero hero) {
        Map<Position5D, Double> barriers = new HashMap<>();
        Position5D heroPos = getHeroPosition5D(hero);
        
        // Calculer les barrières dans un rayon de 10 cases
        for (int dx = -10; dx <= 10; dx++) {
            for (int dy = -10; dy <= 10; dy++) {
                Position5D pos = new Position5D(
                    heroPos.x + dx, 
                    heroPos.y + dy, 
                    0,
                    heroPos.timeline,
                    heroPos.day
                );
                
                double barrier = calculateFogAt5D(game, pos);
                if (barrier > 0.5) {
                    barriers.put(pos, barrier);
                }
            }
        }
        
        return barriers;
    }
    
    private Position5D getHeroPosition5D(Hero hero) {
        return new Position5D(
            hero.getPositionX(),
            hero.getPositionY(),
            0, // Z non implémenté
            hero.getTimelineBranch(),
            hero.getCurrentDay()
        );
    }
    
    private TemporalSnapshot createTemporalSnapshot(Game game, int day) {
        // Snapshot de l'état du jeu à un jour donné
        return new TemporalSnapshot(game.getId(), day);
    }
    
    private PossibleFuture simulateFuture(Game game, int turnsAhead) {
        // Simulation simplifiée d'un futur possible
        return new PossibleFuture(game.getId(), turnsAhead, 0.8 - (turnsAhead * 0.1));
    }
    
    // ===== CLASSES INTERNES =====
    
    public static class Timeline {
        public final String id;
        public final String name;
        public final boolean isMain;
        
        public Timeline(String id, String name, boolean isMain) {
            this.id = id;
            this.name = name;
            this.isMain = isMain;
        }
    }
    
    public static class TemporalSnapshot {
        public final Long gameId;
        public final int day;
        
        public TemporalSnapshot(Long gameId, int day) {
            this.gameId = gameId;
            this.day = day;
        }
    }
    
    public static class PossibleFuture {
        public final Long gameId;
        public final int turnsAhead;
        public final double probability;
        
        public PossibleFuture(Long gameId, int turnsAhead, double probability) {
            this.gameId = gameId;
            this.turnsAhead = turnsAhead;
            this.probability = probability;
        }
    }

    // ===== MÉTHODES PUBLIQUES POUR LE CONTRÔLEUR =====
    
    /**
     * Obtenir un jeu par ID
     */
    public Game getGame(Long gameId) {
        return gameRepository.findById(gameId)
            .orElseThrow(() -> new IllegalArgumentException("Game not found: " + gameId));
    }
    
    /**
     * Obtenir un héros par nom dans un jeu
     */
    public Hero getHero(Long gameId, String heroName) {
        Game game = getGame(gameId);
        Hero hero = game.getHeroByName(heroName);
        if (hero == null) {
            throw new IllegalArgumentException("Hero not found: " + heroName);
        }
        return hero;
    }
} 