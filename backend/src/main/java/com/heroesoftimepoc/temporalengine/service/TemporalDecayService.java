package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.GameTileRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import com.heroesoftimepoc.temporalengine.repository.TemporalArtifactRepository;
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
    private TemporalArtifactRepository temporalArtifactRepository;
    
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
     * CALCULER ET APPLIQUER : La décroissance pour un héros spécifique
     */
    private DecayResult calculateAndApplyDecay(Game game, Hero hero) {
        // Calculer le retard temporel du héros
        int daysBehind = calculateDaysBehind(game, hero);
        
        if (daysBehind <= DECAY_THRESHOLD_DAYS) {
            return null; // Pas de décroissance si pas assez en retard
        }
        
        // Vérifier la protection par vision future
        boolean hasFutureVisionProtection = hasFutureVisionProtection(hero);
        
        // Calculer le taux de décroissance
        double decayRate = calculateDecayRate(daysBehind, hasFutureVisionProtection);
        
        // Appliquer la décroissance aux bâtiments
        List<String> affectedBuildings = new ArrayList<>();
        List<String> destroyedBuildings = new ArrayList<>();
        
        for (GameTile tile : game.getTiles()) {
            if (tile.getBuildingOwner() != null && tile.getBuildingOwner().equals(hero.getName())) {
                DecayResult buildingDecay = applyDecayToBuilding(tile, decayRate, daysBehind);
                if (buildingDecay != null) {
                    if (buildingDecay.getDestroyedBuildings().size() > 0) {
                        destroyedBuildings.addAll(buildingDecay.getDestroyedBuildings());
                    } else {
                        affectedBuildings.addAll(buildingDecay.getAffectedBuildings());
                    }
                }
            }
        }
        
        // Générer une quote d'Anna the Martopicker
        String quote = generateAnnaQuote(daysBehind, hasFutureVisionProtection, destroyedBuildings.size());
        
        return new DecayResult(
            hero.getName(),
            daysBehind,
            decayRate,
            affectedBuildings,
            destroyedBuildings,
            hasFutureVisionProtection,
            quote
        );
    }
    
    /**
     * CALCULER : Le nombre de jours de retard d'un héros
     */
    private int calculateDaysBehind(Game game, Hero hero) {
        int currentGameDay = game.getCurrentTurn();
        int heroCurrentDay = hero.getCurrentDay();
        
        // Un héros est en retard s'il est dans le passé par rapport au jeu
        return Math.max(0, currentGameDay - heroCurrentDay);
    }
    
    /**
     * VÉRIFIER : Protection par vision future
     */
    private boolean hasFutureVisionProtection(Hero hero) {
        // Vérifier les artefacts de vision future
        List<TemporalArtifact> artifacts = temporalArtifactRepository.findByOwnerId(hero.getName());
        
        for (TemporalArtifact artifact : artifacts) {
            if (isFutureVisionArtifact(artifact)) {
                return true;
            }
        }
        
        // Vérifier les items dans l'inventaire du héros
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
     * IDENTIFIER : Artefacts de vision future
     */
    private boolean isFutureVisionArtifact(TemporalArtifact artifact) {
        String artifactId = artifact.getArtifactId().toLowerCase();
        return artifactId.contains("wigner") || 
               artifactId.contains("future") || 
               artifactId.contains("vision") ||
               artifactId.contains("lunettes") ||
               artifactId.contains("spyglass");
    }
    
    /**
     * IDENTIFIER : Items de vision future
     */
    private boolean isFutureVisionItem(String item) {
        String itemLower = item.toLowerCase();
        return itemLower.contains("lunettes") ||
               itemLower.contains("spyglass") ||
               itemLower.contains("future") ||
               itemLower.contains("vision") ||
               itemLower.contains("wigner");
    }
    
    /**
     * CALCULER : Le taux de décroissance
     */
    private double calculateDecayRate(int daysBehind, boolean hasFutureVisionProtection) {
        double baseDecayRate = DECAY_RATE_PER_DAY * Math.min(daysBehind, MAX_DECAY_DAYS);
        
        // Réduction si protection par vision future
        if (hasFutureVisionProtection) {
            baseDecayRate *= 0.5; // 50% de réduction
        }
        
        // Multiplicateur pour zones de superposition excessive
        // TODO: Implémenter la détection de zones de superposition
        
        return Math.min(baseDecayRate, 1.0); // Maximum 100% de décroissance
    }
    
    /**
     * APPLIQUER : Décroissance à un bâtiment
     */
    private DecayResult applyDecayToBuilding(GameTile tile, double decayRate, int daysBehind) {
        if (tile.getBuildingType() == null) {
            return null;
        }
        
        // Simuler la santé du bâtiment (à implémenter dans GameTile)
        double buildingHealth = getBuildingHealth(tile);
        double newHealth = buildingHealth - decayRate;
        
        if (newHealth <= 0) {
            // Bâtiment détruit
            destroyBuilding(tile);
            return new DecayResult(
                tile.getBuildingOwner(),
                daysBehind,
                decayRate,
                new ArrayList<>(),
                Arrays.asList(tile.getBuildingType()),
                false,
                "Le temps a eu raison de cette construction."
            );
        } else {
            // Bâtiment endommagé
            damageBuilding(tile, newHealth);
            return new DecayResult(
                tile.getBuildingOwner(),
                daysBehind,
                decayRate,
                Arrays.asList(tile.getBuildingType()),
                new ArrayList<>(),
                false,
                "La structure s'effrite sous l'effet du temps."
            );
        }
    }
    
    /**
     * OBTENIR : Santé d'un bâtiment (simulation)
     */
    private double getBuildingHealth(GameTile tile) {
        // Pour l'instant, simulation basée sur le type de bâtiment
        switch (tile.getBuildingType()) {
            case "CASTLE":
                return 1.0;
            case "TOWER":
                return 0.8;
            case "BARRACKS":
                return 0.7;
            case "MAGE_TOWER":
                return 0.6;
            default:
                return 0.5;
        }
    }
    
    /**
     * DÉTRUIRE : Un bâtiment
     */
    private void destroyBuilding(GameTile tile) {
        tile.setBuildingType(null);
        tile.setBuildingOwner(null);
        tile.setDefenseBonus(0);
        gameTileRepository.save(tile);
    }
    
    /**
     * ENDOMMAGER : Un bâtiment
     */
    private void damageBuilding(GameTile tile, double newHealth) {
        // Réduire le bonus de défense proportionnellement
        int currentDefense = tile.getDefenseBonus();
        int newDefense = (int) (currentDefense * newHealth);
        tile.setDefenseBonus(newDefense);
        gameTileRepository.save(tile);
    }
    
    /**
     * GÉNÉRER : Quote d'Anna the Martopicker
     */
    private String generateAnnaQuote(int daysBehind, boolean hasProtection, int destroyedCount) {
        List<String> quotes = new ArrayList<>();
        
        if (daysBehind >= MAX_DECAY_DAYS) {
            quotes.add("Le temps n'attend personne, et ceux qui s'attardent dans le passé verront leurs constructions s'effriter comme le sable entre leurs doigts.");
        } else if (destroyedCount > 0) {
            quotes.add("Chaque jour dans le passé est un coup de marteau sur vos fondations temporelles.");
        } else if (hasProtection) {
            quotes.add("La vision du futur vous protège, mais même les lunettes de Wigner ont leurs limites.");
        } else {
            quotes.add("Le présent vous appelle, héros. Le passé n'est qu'un mirage qui se dissipe.");
        }
        
        // Ajouter des quotes spécifiques selon le contexte
        if (daysBehind > 7) {
            quotes.add("Vous jouez avec le feu temporel. Les paradoxes vous guettent.");
        }
        
        if (destroyedCount > 2) {
            quotes.add("Vos constructions s'effondrent comme des châteaux de cartes dans le vent du temps.");
        }
        
        // Retourner une quote aléatoire
        Random random = new Random();
        return quotes.get(random.nextInt(quotes.size()));
    }
    
    /**
     * STATISTIQUES : Obtenir les statistiques de décroissance pour un jeu
     */
    public Map<String, Object> getDecayStatistics(Game game) {
        List<DecayResult> decayResults = applyTemporalDecay(game);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalHeroes", game.getHeroes().size());
        stats.put("heroesWithDecay", decayResults.size());
        stats.put("totalBuildingsAffected", decayResults.stream()
            .mapToInt(r -> r.getAffectedBuildings().size())
            .sum());
        stats.put("totalBuildingsDestroyed", decayResults.stream()
            .mapToInt(r -> r.getDestroyedBuildings().size())
            .sum());
        stats.put("heroesWithFutureVision", decayResults.stream()
            .filter(DecayResult::hasFutureVisionProtection)
            .count());
        
        // Détails par héros
        Map<String, Object> heroDetails = new HashMap<>();
        for (DecayResult result : decayResults) {
            Map<String, Object> heroStats = new HashMap<>();
            heroStats.put("daysBehind", result.getDaysBehind());
            heroStats.put("decayAmount", result.getDecayAmount());
            heroStats.put("affectedBuildings", result.getAffectedBuildings());
            heroStats.put("destroyedBuildings", result.getDestroyedBuildings());
            heroStats.put("hasFutureVisionProtection", result.hasFutureVisionProtection());
            heroStats.put("quote", result.getQuote());
            
            heroDetails.put(result.getHeroName(), heroStats);
        }
        stats.put("heroDetails", heroDetails);
        
        return stats;
    }
    
    /**
     * RÉPARATION : Permettre la réparation des bâtiments endommagés
     */
    public boolean repairBuilding(Game game, String heroName, int x, int y) {
        GameTile tile = game.getTileAt(x, y);
        if (tile == null || !heroName.equals(tile.getBuildingOwner())) {
            return false;
        }
        
        // Vérifier que le héros a les ressources nécessaires
        Hero hero = game.getHeroByName(heroName);
        if (hero == null || hero.getTemporalEnergy() < 10) {
            return false;
        }
        
        // Consommer de l'énergie temporelle pour réparer
        hero.setTemporalEnergy(hero.getTemporalEnergy() - 10);
        heroRepository.save(hero);
        
        // Restaurer le bâtiment
        tile.setDefenseBonus(getBuildingHealth(tile) * 100); // Restaurer la défense complète
        gameTileRepository.save(tile);
        
        return true;
    }
} 