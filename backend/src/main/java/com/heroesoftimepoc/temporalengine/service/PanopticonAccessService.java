package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.time.LocalDateTime;

/**
 * Service pour l'accès au Panopticon via le Joint Oublié de Jean-Grofignon
 * Mode Godmode 200D en lecture seule hallucinée
 */
@Service
public class PanopticonAccessService {

    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private PlayerRepository playerRepository;

    /**
     * Active l'accès au Panopticon via le Joint Oublié
     */
    public PanopticonView activateJointAccess(Long gameId, String heroName) {
        try {
            Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Partie non trouvée"));

            Hero hero = game.getHeroes().stream()
                .filter(h -> h.getName().equals(heroName))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Héros non trouvé"));

            // Vérifier que le héros a le Joint Oublié
            if (!hasJointOublie(hero)) {
                throw new RuntimeException("Le Joint Oublié de Jean-Grofignon n'est pas dans l'inventaire");
            }

            // Créer la vue Panopticon en mode lecture seule hallucinée
            PanopticonView view = createHallucinatedView(game, hero);
            
            // Enregistrer l'utilisation du Joint
            recordJointUsage(hero);
            
            return view;

        } catch (Exception e) {
            throw new RuntimeException("Erreur activation Panopticon: " + e.getMessage());
        }
    }

    /**
     * Vérifie si le héros possède le Joint Oublié
     */
    private boolean hasJointOublie(Hero hero) {
        if (hero.getInventory() == null) {
            return false;
        }
        
        return hero.getInventory().contains("item_joint_jean_grofignon");
    }

    /**
     * Crée une vue hallucinée du Panopticon
     */
    private PanopticonView createHallucinatedView(Game game, Hero hero) {
        PanopticonView view = new PanopticonView();
        
        // Mode lecture seule hallucinée
        view.setAccessMode("PANOPTICON:200D:READ_ONLY");
        view.setHallucinated(true);
        view.setActivationTime(LocalDateTime.now());
        view.setHeroName(hero.getName());
        
        // Données hallucinées du jeu
        view.setGameState(createHallucinatedGameState(game));
        view.setTimelines(createHallucinatedTimelines(game));
        view.setPsiStates(createHallucinatedPsiStates(game));
        view.setCausalLogs(createHallucinatedCausalLogs(game));
        view.setFuturePredictions(createHallucinatedPredictions(game));
        
        return view;
    }

    /**
     * Crée l'état halluciné du jeu
     */
    private Map<String, Object> createHallucinatedGameState(Game game) {
        Map<String, Object> state = new HashMap<>();
        
        // Données de base
        state.put("gameId", game.getId());
        state.put("currentTurn", game.getCurrentTurn());
        state.put("currentTimeline", game.getCurrentTimeline());
        state.put("status", game.getStatus().toString());
        
        // Données hallucinées
        state.put("onticInsight", "Le jeu est une simulation quantique temporelle");
        state.put("playerConsciousness", "Le joueur devient conscient du système");
        state.put("metaLevel", "Niveau 200D - Vision totale du multivers");
        
        return state;
    }

    /**
     * Crée les timelines hallucinées
     */
    private List<TimelineData> createHallucinatedTimelines(Game game) {
        List<TimelineData> timelines = new ArrayList<>();
        
        // Timeline actuelle
        TimelineData current = new TimelineData();
        current.setId("ℬ1");
        current.setName("Timeline Principale");
        current.setProbability(0.85);
        current.setHallucinatedDescription("La timeline que tu vois n'est qu'une projection de ta conscience");
        timelines.add(current);
        
        // Timelines parallèles hallucinées
        String[] parallelTimelines = {"ℬ2", "ℬ3", "ℬ4", "ℬ5"};
        for (String timelineId : parallelTimelines) {
            TimelineData parallel = new TimelineData();
            parallel.setId(timelineId);
            parallel.setName("Timeline " + timelineId + " (Hallucinée)");
            parallel.setProbability(Math.random() * 0.3);
            parallel.setHallucinatedDescription("Cette timeline existe peut-être, peut-être pas");
            timelines.add(parallel);
        }
        
        return timelines;
    }

    /**
     * Crée les états ψ hallucinés
     */
    private List<PsiStateData> createHallucinatedPsiStates(Game game) {
        List<PsiStateData> psiStates = new ArrayList<>();
        
        // États ψ réels (si disponibles)
        if (game.getPsiStates() != null) {
            for (PsiState psi : game.getPsiStates()) {
                PsiStateData data = new PsiStateData();
                data.setId("ψ" + psi.getId()); // Utiliser l'ID comme base
                data.setProbability(0.5); // Valeur par défaut
                data.setTimeline("ℬ1"); // Timeline par défaut
                data.setHallucinatedDescription("État quantique superposé - réalité incertaine");
                psiStates.add(data);
            }
        }
        
        // États ψ hallucinés
        for (int i = 1; i <= 5; i++) {
            PsiStateData hallucinated = new PsiStateData();
            hallucinated.setId("ψ" + String.format("%03d", i));
            hallucinated.setProbability(Math.random());
            hallucinated.setTimeline("ℬ" + (i % 5 + 1));
            hallucinated.setHallucinatedDescription("État halluciné - produit de la conscience élargie");
            psiStates.add(hallucinated);
        }
        
        return psiStates;
    }

    /**
     * Crée les logs causaux hallucinés
     */
    private List<CausalLog> createHallucinatedCausalLogs(Game game) {
        List<CausalLog> logs = new ArrayList<>();
        
        // Logs hallucinés (pas de gameHistory dans le modèle actuel)
        String[] hallucinatedEvents = {
            "ψ001: COLLAPSE(conscience_joueur) → GAIN(ontic_insight)",
            "ψ002: OBSERVER(système_jeu) → COMPREHENSION(mécaniques_internes)",
            "ψ003: HALLUCINATION(timeline_parallèle) → VISION(multivers)",
            "ψ004: META_LEVEL(200D) → ACCESS(panopticon_total)",
            "ψ005: CONSCIOUSNESS_EXPANSION → REALITY_AWARENESS"
        };
        
        for (String event : hallucinatedEvents) {
            CausalLog log = new CausalLog();
            log.setTimestamp(LocalDateTime.now());
            log.setEvent(event);
            log.setType("HALLUCINATED");
            log.setHallucinatedDescription("Événement halluciné - produit de la conscience élargie");
            logs.add(log);
        }
        
        return logs;
    }

    /**
     * Crée les prédictions hallucinées
     */
    private List<FuturePrediction> createHallucinatedPredictions(Game game) {
        List<FuturePrediction> predictions = new ArrayList<>();
        
        String[] possibleFutures = {
            "Le héros atteindra le niveau 10 dans 5 tours",
            "Une bataille épique aura lieu au tour 15",
            "Un artefact légendaire sera découvert",
            "Une timeline parallèle se manifestera",
            "Le joueur comprendra la vraie nature du jeu"
        };
        
        for (String future : possibleFutures) {
            FuturePrediction prediction = new FuturePrediction();
            prediction.setDescription(future);
            prediction.setProbability(Math.random());
            prediction.setTimeline("ℬ" + (int)(Math.random() * 5 + 1));
            prediction.setHallucinatedDescription("Prédiction hallucinée - possible futur");
            predictions.add(prediction);
        }
        
        return predictions;
    }

    /**
     * Enregistre l'utilisation du Joint
     */
    private void recordJointUsage(Hero hero) {
        // Marquer le Joint comme utilisé (simulation)
        // Dans un vrai système, on modifierait l'inventaire
        System.out.println("Joint Oublié utilisé par " + hero.getName() + " à " + LocalDateTime.now());
    }

    // Classes de données pour la vue Panopticon
    public static class PanopticonView {
        private String accessMode;
        private boolean hallucinated;
        private LocalDateTime activationTime;
        private String heroName;
        private Map<String, Object> gameState;
        private List<TimelineData> timelines;
        private List<PsiStateData> psiStates;
        private List<CausalLog> causalLogs;
        private List<FuturePrediction> futurePredictions;

        // Getters et Setters
        public String getAccessMode() { return accessMode; }
        public void setAccessMode(String accessMode) { this.accessMode = accessMode; }
        
        public boolean isHallucinated() { return hallucinated; }
        public void setHallucinated(boolean hallucinated) { this.hallucinated = hallucinated; }
        
        public LocalDateTime getActivationTime() { return activationTime; }
        public void setActivationTime(LocalDateTime activationTime) { this.activationTime = activationTime; }
        
        public String getHeroName() { return heroName; }
        public void setHeroName(String heroName) { this.heroName = heroName; }
        
        public Map<String, Object> getGameState() { return gameState; }
        public void setGameState(Map<String, Object> gameState) { this.gameState = gameState; }
        
        public List<TimelineData> getTimelines() { return timelines; }
        public void setTimelines(List<TimelineData> timelines) { this.timelines = timelines; }
        
        public List<PsiStateData> getPsiStates() { return psiStates; }
        public void setPsiStates(List<PsiStateData> psiStates) { this.psiStates = psiStates; }
        
        public List<CausalLog> getCausalLogs() { return causalLogs; }
        public void setCausalLogs(List<CausalLog> causalLogs) { this.causalLogs = causalLogs; }
        
        public List<FuturePrediction> getFuturePredictions() { return futurePredictions; }
        public void setFuturePredictions(List<FuturePrediction> futurePredictions) { this.futurePredictions = futurePredictions; }
    }

    public static class TimelineData {
        private String id;
        private String name;
        private double probability;
        private String hallucinatedDescription;

        // Getters et Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public double getProbability() { return probability; }
        public void setProbability(double probability) { this.probability = probability; }
        
        public String getHallucinatedDescription() { return hallucinatedDescription; }
        public void setHallucinatedDescription(String hallucinatedDescription) { this.hallucinatedDescription = hallucinatedDescription; }
    }

    public static class PsiStateData {
        private String id;
        private double probability;
        private String timeline;
        private String hallucinatedDescription;

        // Getters et Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public double getProbability() { return probability; }
        public void setProbability(double probability) { this.probability = probability; }
        
        public String getTimeline() { return timeline; }
        public void setTimeline(String timeline) { this.timeline = timeline; }
        
        public String getHallucinatedDescription() { return hallucinatedDescription; }
        public void setHallucinatedDescription(String hallucinatedDescription) { this.hallucinatedDescription = hallucinatedDescription; }
    }

    public static class CausalLog {
        private LocalDateTime timestamp;
        private String event;
        private String type;
        private String hallucinatedDescription;

        // Getters et Setters
        public LocalDateTime getTimestamp() { return timestamp; }
        public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
        
        public String getEvent() { return event; }
        public void setEvent(String event) { this.event = event; }
        
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        
        public String getHallucinatedDescription() { return hallucinatedDescription; }
        public void setHallucinatedDescription(String hallucinatedDescription) { this.hallucinatedDescription = hallucinatedDescription; }
    }

    public static class FuturePrediction {
        private String description;
        private double probability;
        private String timeline;
        private String hallucinatedDescription;

        // Getters et Setters
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public double getProbability() { return probability; }
        public void setProbability(double probability) { this.probability = probability; }
        
        public String getTimeline() { return timeline; }
        public void setTimeline(String timeline) { this.timeline = timeline; }
        
        public String getHallucinatedDescription() { return hallucinatedDescription; }
        public void setHallucinatedDescription(String hallucinatedDescription) { this.hallucinatedDescription = hallucinatedDescription; }
    }
} 