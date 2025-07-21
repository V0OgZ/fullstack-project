package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.GameTileRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import com.heroesoftimepoc.temporalengine.repository.ArtifactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service pour gérer la décroissance temporelle dans Heroes of Time
 * 
 * CONCEPT : Anna the Martopicker a imaginé un système pour punir les joueurs
 * qui restent trop longtemps dans le passé et ralentissent le jeu asynchrone.
 * 
 * "Le temps n'attend personne, et ceux qui s'attardent dans le passé
 *  verront leurs constructions s'effriter comme le sable entre leurs doigts."
 *  - Anna the Martopicker, Architecte du Temps
 * 
 * MÉCANIQUES :
 * 1. Décroissance des bâtiments pour joueurs en retard
 * 2. Effets de superposition excessive
 * 3. Avantages pour les objets de vision future
 */
@Service
public class TemporalDecayService {

    @Autowired
    private GameTileRepository gameTileRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private ArtifactRepository artifactRepository;
    
    // Configuration de la décroissance temporelle
    private static final int DECAY_THRESHOLD_DAYS = 5; // Seuil de 5 jours de retard
    private static final double DECAY_RATE_PER_DAY = 0.15; // 15% de dégâts par jour
    private static final double SUPERPOSITION_DECAY_MULTIPLIER = 2.0; // Double dégâts en zones de superposition
    private static final int MAX_DECAY_DAYS = 10; // Maximum 10 jours de retard avant destruction totale
    
    /**
     * Résultat d'une décroissance temporelle
     */
    public static class DecayResult {
        private final String heroName;
        private final int daysBehind;
        private final double decayAmount;
        private final List<String> affectedBuildings;
        private final List<String> destroyedBuildings;
        private final boolean hasFutureVisionProtection;
        private final String quote;
        
        public DecayResult(String heroName, int daysBehind, double decayAmount, 
                          List<String> affectedBuildings, List<String> destroyedBuildings,
                          boolean hasFutureVisionProtection, String quote) {
            this.heroName = heroName;
            this.daysBehind = daysBehind;
            this.decayAmount = decayAmount;
            this.affectedBuildings = affectedBuildings;
            this.destroyedBuildings = destroyedBuildings;
            this.hasFutureVisionProtection = hasFutureVisionProtection;
            this.quote = quote;
        }
        
        // Getters
        public String getHeroName() { return heroName; }
        public int getDaysBehind() { return daysBehind; }
        public double getDecayAmount() { return decayAmount; }
        public List<String> getAffectedBuildings() { return affectedBuildings; }
        public List<String> getDestroyedBuildings() { return destroyedBuildings; }
        public boolean hasFutureVisionProtection() { return hasFutureVisionProtection; }
        public String getQuote() { return quote; }
        
        @Override
        public String toString() {
            return String.format("DecayResult[%s] %d days behind, %.1f%% decay, %d affected, %d destroyed", 
                heroName, daysBehind, decayAmount * 100, affectedBuildings.size(), destroyedBuildings.size());
        }
    }
    
    /**
     * MÉTHODE PRINCIPALE : Appliquer la décroissance temporelle à tous les héros
     */
    public List<DecayResult> applyTemporalDecay(Game game) {
        List<DecayResult> results = new ArrayList<>();
        
        for (Hero hero : game.getHeroes()) {
            DecayResult decayResult = calculateAndApplyDecay(game, hero);
            if (decayResult != null && decayResult.getDecayAmount() > 0) {
                results.add(decayResult);
            }
        }
        
        return results;
    }
    
    /**
     * Calculer et appliquer la décroissance pour un héros spécifique
     */
    private DecayResult calculateAndApplyDecay(Game game, Hero hero) {
        int daysBehind = calculateDaysBehind(game, hero);
        
        if (daysBehind < DECAY_THRESHOLD_DAYS) {
            return null; // Pas de décroissance si pas assez en retard
        }
        
        boolean hasFutureVisionProtection = hasFutureVisionProtection(hero);
        double decayRate = calculateDecayRate(daysBehind, hasFutureVisionProtection);
        
        List<String> affectedBuildings = new ArrayList<>();
        List<String> destroyedBuildings = new ArrayList<>();
        double totalDecay = 0.0;
        
        // Appliquer la décroissance aux bâtiments du héros
        List<GameTile> heroBuildings = gameTileRepository.findByGameId(game.getId()).stream()
            .filter(tile -> hero.getName().equals(tile.getBuildingOwner()))
            .collect(Collectors.toList());
        
        for (GameTile tile : heroBuildings) {
            if (tile.getBuildingType() != null) {
                DecayResult buildingDecay = applyDecayToBuilding(tile, decayRate, daysBehind);
                if (buildingDecay != null) {
                    affectedBuildings.add(String.format("%s at (%d,%d)", tile.getBuildingType(), tile.getX(), tile.getY()));
                    if (buildingDecay.getDestroyedBuildings().size() > 0) {
                        destroyedBuildings.add(String.format("%s at (%d,%d)", tile.getBuildingType(), tile.getX(), tile.getY()));
                    }
                    totalDecay += buildingDecay.getDecayAmount();
                }
            }
        }
        
        String quote = generateAnnaQuote(daysBehind, hasFutureVisionProtection, destroyedBuildings.size());
        
        return new DecayResult(hero.getName(), daysBehind, totalDecay, affectedBuildings, destroyedBuildings, hasFutureVisionProtection, quote);
    }
    
    /**
     * Calculer le nombre de jours de retard d'un héros
     */
    private int calculateDaysBehind(Game game, Hero hero) {
        try {
            // Extraire le numéro de la timeline en supprimant les symboles spéciaux
            String currentTimelineStr = game.getCurrentTimeline();
            String heroTimelineStr = hero.getTimelineBranch();
            
            int currentTimeline = 0;
            int heroTimeline = 0;
            
            if (currentTimelineStr != null) {
                // Extraire le numéro après ℬ ou tout autre symbole
                String currentNumber = currentTimelineStr.replaceAll("[^0-9-]", "");
                if (!currentNumber.isEmpty()) {
                    currentTimeline = Integer.parseInt(currentNumber);
                }
            }
            
            if (heroTimelineStr != null) {
                // Extraire le numéro après ℬ ou tout autre symbole
                String heroNumber = heroTimelineStr.replaceAll("[^0-9-]", "");
                if (!heroNumber.isEmpty()) {
                    heroTimeline = Integer.parseInt(heroNumber);
                }
            }
            
            return Math.max(0, currentTimeline - heroTimeline);
        } catch (NumberFormatException e) {
            // En cas d'erreur de parsing, retourner 0 (pas de décroissance)
            return 0;
        }
    }
    
    /**
     * Vérifier si le héros a une protection de vision future
     */
    private boolean hasFutureVisionProtection(Hero hero) {
        // Vérifier les artefacts de vision future
        List<Artifact> heroArtifacts = artifactRepository.findByOwnerId(hero.getName());
        for (Artifact artifact : heroArtifacts) {
            if (isFutureVisionArtifact(artifact)) {
                return true;
            }
        }
        
        // Vérifier l'inventaire du héros
        if (hero.getInventory() != null) {
            for (String item : hero.getInventory()) {
                if (isFutureVisionItem(item)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    /**
     * Vérifier si un artefact offre une vision future
     */
    private boolean isFutureVisionArtifact(Artifact artifact) {
        return artifact.getType() == Artifact.ArtifactType.WIGNER_EYE || 
               artifact.getType() == Artifact.ArtifactType.TEMPORAL_COMPASS ||
               artifact.getType() == Artifact.ArtifactType.QUANTUM_MIRROR;
    }
    
    /**
     * Vérifier si un item offre une vision future
     */
    private boolean isFutureVisionItem(String item) {
        return item.toLowerCase().contains("lunettes") || 
               item.toLowerCase().contains("spyglass") ||
               item.toLowerCase().contains("vision") ||
               item.toLowerCase().contains("future");
    }
    
    /**
     * Calculer le taux de décroissance
     */
    private double calculateDecayRate(int daysBehind, boolean hasFutureVisionProtection) {
        double baseRate = DECAY_RATE_PER_DAY * Math.min(daysBehind, MAX_DECAY_DAYS);
        
        if (hasFutureVisionProtection) {
            baseRate *= 0.5; // 50% de réduction avec protection
        }
        
        return Math.min(baseRate, 1.0); // Maximum 100% de dégâts
    }
    
    /**
     * Appliquer la décroissance à un bâtiment
     */
    private DecayResult applyDecayToBuilding(GameTile tile, double decayRate, int daysBehind) {
        if (tile.getBuildingType() == null) {
            return null;
        }
        
        double currentHealth = getBuildingHealth(tile);
        double newHealth = currentHealth - (currentHealth * decayRate);
        
        if (newHealth <= 0) {
            destroyBuilding(tile);
            return new DecayResult(tile.getBuildingType(), daysBehind, currentHealth, 
                                 Arrays.asList(tile.getBuildingType()), 
                                 Arrays.asList(tile.getBuildingType()), false, "");
        } else {
            damageBuilding(tile, newHealth);
            return new DecayResult(tile.getBuildingType(), daysBehind, currentHealth - newHealth, 
                                 Arrays.asList(tile.getBuildingType()), 
                                 new ArrayList<>(), false, "");
        }
    }
    
    /**
     * Obtenir la santé actuelle d'un bâtiment
     */
    private double getBuildingHealth(GameTile tile) {
        // Simuler la santé basée sur le type de bâtiment
        switch (tile.getBuildingType().toLowerCase()) {
            case "chateau":
            case "castle":
                return 100.0;
            case "tour":
            case "tower":
                return 80.0;
            case "mur":
            case "wall":
                return 60.0;
            case "maison":
            case "house":
                return 40.0;
            default:
                return 50.0;
        }
    }
    
    /**
     * Détruire un bâtiment
     */
    private void destroyBuilding(GameTile tile) {
        tile.setBuildingType(null);
        tile.setBuildingOwner(null);
        gameTileRepository.save(tile);
    }
    
    /**
     * Endommager un bâtiment
     */
    private void damageBuilding(GameTile tile, double newHealth) {
        // Pour l'instant, on simule juste la dégradation
        // Dans une version future, on pourrait stocker la santé dans le tile
        gameTileRepository.save(tile);
    }
    
    /**
     * Générer une quote d'Anna the Martopicker
     */
    private String generateAnnaQuote(int daysBehind, boolean hasProtection, int destroyedCount) {
        if (hasProtection) {
            return "Anna sourit : 'Ah, tu as appris à regarder vers l'avenir. Sage décision.'";
        } else if (destroyedCount > 0) {
            return "Anna secoue la tête : 'Le temps est impitoyable. Tes constructions s'effritent.'";
        } else if (daysBehind > 8) {
            return "Anna soupire : 'Tu t'attardes trop dans le passé. Le présent t'attend.'";
        } else {
            return "Anna observe : 'Le temps avance, que tu le veuilles ou non.'";
        }
    }
    
    /**
     * Obtenir les statistiques de décroissance pour un jeu
     */
    public Map<String, Object> getDecayStatistics(Game game) {
        Map<String, Object> stats = new HashMap<>();
        
        List<DecayResult> decayResults = applyTemporalDecay(game);
        
        stats.put("totalHeroes", game.getHeroes().size());
        stats.put("heroesWithDecay", decayResults.size());
        stats.put("totalDecayAmount", decayResults.stream().mapToDouble(DecayResult::getDecayAmount).sum());
        stats.put("totalDestroyedBuildings", decayResults.stream().mapToInt(r -> r.getDestroyedBuildings().size()).sum());
        stats.put("heroesWithProtection", (int) decayResults.stream().filter(DecayResult::hasFutureVisionProtection).count());
        
        Map<String, Object> heroStats = new HashMap<>();
        for (DecayResult result : decayResults) {
            Map<String, Object> heroData = new HashMap<>();
            heroData.put("daysBehind", result.getDaysBehind());
            heroData.put("decayAmount", result.getDecayAmount());
            heroData.put("affectedBuildings", result.getAffectedBuildings().size());
            heroData.put("destroyedBuildings", result.getDestroyedBuildings().size());
            heroData.put("hasProtection", result.hasFutureVisionProtection());
            heroData.put("quote", result.getQuote());
            heroStats.put(result.getHeroName(), heroData);
        }
        stats.put("heroDetails", heroStats);
        
        return stats;
    }
    
    /**
     * Réparer un bâtiment (pour les joueurs qui se rattrapent)
     */
    public boolean repairBuilding(Game game, String heroName, int x, int y) {
        Optional<GameTile> tileOpt = gameTileRepository.findByGameId(game.getId()).stream()
            .filter(tile -> tile.getX() == x && tile.getY() == y)
            .findFirst();
            
        if (!tileOpt.isPresent()) {
            return false;
        }
        
        GameTile tile = tileOpt.get();
        if (!heroName.equals(tile.getBuildingOwner())) {
            return false;
        }
        
        // Réparer le bâtiment (remettre à 100% de santé)
        // Pour l'instant, on simule juste la réparation
        gameTileRepository.save(tile);
        
        return true;
    }
} 