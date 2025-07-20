package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service pour les capacités spéciales des scénarios épiques
 * Implémente les pouvoirs uniques d'Omega-Zéro et autres boss
 */
@Service
@Transactional
public class SpecialAbilitiesService {
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private GameTileRepository gameTileRepository;
    
    @Autowired
    private PerformanceMetricsService performanceMetrics;
    
    private final Random random = new Random();
    
    /**
     * PRE_EXISTENCE_STRIKE - Attaque avant d'exister
     * Omega-Zéro frappe avant même d'avoir déclaré son action
     */
    public Map<String, Object> executePreExistenceStrike(Game game, Hero attacker, Hero target) {
        Map<String, Object> result = new HashMap<>();
        
        // L'attaque se produit AVANT toute déclaration
        int damage = 50 + random.nextInt(51); // 50-100 damage
        
        // Créer une blessure rétrocausale
        target.takeDamage(damage);
        target.addStatusEffect("RETROCAUSAL_WOUND", 3); // Dure 3 tours
        
        // L'attaque apparaît dans l'historique AVANT qu'elle soit déclarée
        game.addToHistory(-1, String.format("[FUTUR] %s sera frappé par %s pour %d dégâts", 
            target.getName(), attacker.getName(), damage));
        
        heroRepository.save(target);
        
        result.put("success", true);
        result.put("damage", damage);
        result.put("message", String.format("%s a frappé %s avant même d'exister! %d dégâts rétrocausaux infligés!", 
            attacker.getName(), target.getName(), damage));
        result.put("paradox", "L'effet précède la cause");
        
        return result;
    }
    
    /**
     * MEMORY_INFECTION - Infecte et échange les souvenirs
     * Les héros ne savent plus qui ils sont
     */
    public Map<String, Object> executeMemoryInfection(Game game, Hero caster, List<Hero> targets) {
        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> swaps = new ArrayList<>();
        
        // Mélanger les identités
        List<Hero> shuffled = new ArrayList<>(targets);
        Collections.shuffle(shuffled);
        
        // Créer une map temporaire des capacités
        Map<Hero, List<String>> originalAbilities = new HashMap<>();
        Map<Hero, List<String>> originalInventory = new HashMap<>();
        
        for (Hero hero : targets) {
            originalAbilities.put(hero, new ArrayList<>(hero.getAbilities()));
            originalInventory.put(hero, new ArrayList<>(hero.getInventory()));
        }
        
        // Échanger les capacités et inventaires
        for (int i = 0; i < targets.size(); i++) {
            Hero current = targets.get(i);
            Hero swapWith = shuffled.get(i);
            
            if (!current.equals(swapWith)) {
                // Échanger les capacités
                current.setAbilities(originalAbilities.get(swapWith));
                current.setInventory(originalInventory.get(swapWith));
                
                // Ajouter confusion
                current.addStatusEffect("IDENTITY_CONFUSION", 5);
                
                heroRepository.save(current);
                
                Map<String, Object> swap = new HashMap<>();
                swap.put("hero", current.getName());
                swap.put("thinks_they_are", swapWith.getName());
                swaps.add(swap);
            }
        }
        
        result.put("success", true);
        result.put("affected_heroes", targets.size());
        result.put("identity_swaps", swaps);
        result.put("message", "Les souvenirs sont infectés! Les héros ne savent plus qui ils sont!");
        result.put("duration", 5);
        
        return result;
    }
    
    /**
     * REALITY_RECOMPILE - Recompile une zone de réalité
     * Peut réussir ou introduire des bugs dans l'existence
     */
    public Map<String, Object> executeRealityRecompile(Game game, Hero caster, int x, int y, int radius) {
        Map<String, Object> result = new HashMap<>();
        
        // Vérifier l'énergie du lanceur
        if (caster.getTemporalEnergy() < 50) {
            result.put("success", false);
            result.put("error", "Énergie temporelle insuffisante pour recompiler la réalité");
            return result;
        }
        
        caster.useTemporalEnergy(50);
        
        // 70% de succès, 30% d'introduire un bug
        boolean success = random.nextDouble() < 0.7;
        
        List<GameTile> affectedTiles = new ArrayList<>();
        
        // Affecter toutes les tuiles dans le rayon
        for (int dx = -radius; dx <= radius; dx++) {
            for (int dy = -radius; dy <= radius; dy++) {
                int tileX = x + dx;
                int tileY = y + dy;
                
                if (tileX >= 0 && tileX < game.getMapWidth() && 
                    tileY >= 0 && tileY < game.getMapHeight()) {
                    
                    GameTile tile = game.getTileAt(tileX, tileY);
                    if (tile != null) {
                        if (success) {
                            // Réinitialiser la tuile
                            tile.removeAllEffects();
                            tile.setIsLocked(false);
                            tile.setTerrain("compiled_reality");
                        } else {
                            // Introduire un bug
                            tile.setTerrain("corrupted_reality");
                            tile.addEffect("REALITY_BUG");
                            tile.setIsLocked(true);
                            tile.setLockDuration(random.nextInt(5) + 1);
                        }
                        
                        gameTileRepository.save(tile);
                        affectedTiles.add(tile);
                    }
                }
            }
        }
        
        heroRepository.save(caster);
        
        result.put("success", success);
        result.put("tiles_affected", affectedTiles.size());
        result.put("radius", radius);
        
        if (success) {
            result.put("message", "Réalité recompilée avec succès! Zone nettoyée.");
        } else {
            result.put("message", "ERREUR: Compilation échouée! Bugs introduits dans la réalité!");
            result.put("error_type", "REALITY_SEGMENTATION_FAULT");
        }
        
        return result;
    }
    
    /**
     * SCRIBE_NONEXISTENCE - Efface quelque chose de l'existence
     * Chlamydius écrit que quelque chose n'a jamais existé
     */
    public Map<String, Object> executeScribeNonexistence(Game game, Hero scribe, String targetType, String targetName) {
        Map<String, Object> result = new HashMap<>();
        
        // Vérifier que le scribe a un parchemin
        if (!scribe.hasItem("parchemin_sale") && !scribe.hasItem("parchemin_fer")) {
            result.put("success", false);
            result.put("error", "Un parchemin spécial est nécessaire pour effacer l'existence");
            return result;
        }
        
        // Coût en énergie
        if (scribe.getTemporalEnergy() < 80) {
            result.put("success", false);
            result.put("error", "Énergie temporelle insuffisante pour réécrire l'existence");
            return result;
        }
        
        scribe.useTemporalEnergy(80);
        
        boolean erased = false;
        String erasedMessage = "";
        
        switch (targetType.toUpperCase()) {
            case "ARTIFACT":
            case "ITEM":
                // Effacer un artefact d'un héros
                for (Hero hero : game.getHeroes()) {
                    if (hero.removeItem(targetName)) {
                        heroRepository.save(hero);
                        erased = true;
                        erasedMessage = String.format("L'artefact '%s' n'a jamais existé. %s l'a oublié.", 
                            targetName, hero.getName());
                        break;
                    }
                }
                break;
                
            case "ZONE":
            case "EFFECT":
                // Effacer un effet de zone
                for (GameTile tile : game.getTiles()) {
                    if (tile.removeEffect(targetName)) {
                        gameTileRepository.save(tile);
                        erased = true;
                        erasedMessage = String.format("L'effet '%s' n'a jamais existé sur la tuile (%d,%d).", 
                            targetName, tile.getX(), tile.getY());
                    }
                }
                break;
                
            case "MEMORY":
                // Effacer un événement de l'historique
                if (game.removeFromHistory(targetName)) {
                    erased = true;
                    erasedMessage = String.format("L'événement '%s' n'a jamais eu lieu.", targetName);
                }
                break;
                
            default:
                result.put("error", "Type de cible non reconnu: " + targetType);
        }
        
        heroRepository.save(scribe);
        
        result.put("success", erased);
        if (erased) {
            result.put("message", erasedMessage);
            result.put("scribe_note", "Ce qui est écrit peut être effacé. Ce qui n'est pas écrit n'a jamais été.");
            
            // Ajouter une note paradoxale dans l'historique
            game.addToHistory(game.getCurrentTurn(), 
                String.format("[PARADOXE] %s a effacé quelque chose qui n'a jamais existé", scribe.getName()));
        } else {
            result.put("message", "Impossible d'effacer cette cible de l'existence");
        }
        
        return result;
    }
    
    /**
     * CREATE_FALSE_HEROES - Crée des copies maléfiques inversées
     * Les faux héros ont les capacités opposées
     */
    public Map<String, Object> createFalseHeroes(Game game, List<Hero> originals) {
        Map<String, Object> result = new HashMap<>();
        List<Hero> falseHeroes = new ArrayList<>();
        
        for (Hero original : originals) {
            Hero falseHero = new Hero("False_" + original.getName(), 
                original.getPositionX() + random.nextInt(3) - 1,
                original.getPositionY() + random.nextInt(3) - 1);
            
            // Stats inversées
            falseHero.setHealth(original.getMaxHealth());
            falseHero.setMaxHealth(original.getMaxHealth());
            falseHero.setTemporalEnergy(200 - original.getTemporalEnergy());
            
            // Capacités inversées/corrompues
            List<String> corruptedAbilities = new ArrayList<>();
            for (String ability : original.getAbilities()) {
                corruptedAbilities.add("CORRUPT_" + ability);
            }
            falseHero.setAbilities(corruptedAbilities);
            
            // Marquer comme faux héros
            falseHero.addStatusEffect("FALSE_HERO", -1); // Permanent
            falseHero.setPlayerId("OMEGA_ZERO");
            
            falseHero.setGame(game);
            heroRepository.save(falseHero);
            game.addHero(falseHero);
            falseHeroes.add(falseHero);
        }
        
        result.put("success", true);
        result.put("false_heroes_created", falseHeroes.size());
        result.put("false_heroes", falseHeroes.stream()
            .map(Hero::getName)
            .collect(Collectors.toList()));
        result.put("message", "Des versions corrompues des héros apparaissent!");
        
        return result;
    }
    
    /**
     * ULTIMATE_SEQUENCE - La séquence finale du Treizième Codex
     * ψ† + Σ + FORGE(REALITY_CORE)
     */
    public Map<String, Object> executeUltimateSequence(Game game, Hero jean, Hero claudius, Hero chlamydius, Hero target) {
        Map<String, Object> result = new HashMap<>();
        
        // Vérifier que les trois héros sont adjacents
        if (!areHeroesAdjacent(jean, claudius, chlamydius)) {
            result.put("success", false);
            result.put("error", "Les trois héros doivent être adjacents pour la Séquence Ultime!");
            return result;
        }
        
        // Vérifier le tour minimum
        if (game.getCurrentTurn() < 27) {
            result.put("success", false);
            result.put("error", "La Séquence Ultime ne peut être utilisée qu'au tour 27 ou plus!");
            return result;
        }
        
        Map<String, Object> sequence = new HashMap<>();
        
        // Étape 1: Jean - ψ† (Effondrement contrôlé)
        jean.useTemporalEnergy(50);
        sequence.put("jean_action", "ψ† - Effondrement de tous les paradoxes!");
        target.removeAllStatusEffects();
        
        // Étape 2: Claudius - Σ (Somme des possibilités)
        claudius.useTemporalEnergy(50);
        sequence.put("claudius_action", "Σ - Compilation de toutes les possibilités!");
        target.setTemporalEnergy(0);
        
        // Étape 3: Chlamydius - FORGE(REALITY_CORE)
        chlamydius.useTemporalEnergy(50);
        sequence.put("chlamydius_action", "FORGE(REALITY_CORE) - Création du Livre Vide Sans Nom!");
        
        // Créer le Livre Vide Sans Nom
        GameTile centralTile = game.getTileAt(target.getPositionX(), target.getPositionY());
        if (centralTile != null) {
            centralTile.addItem("livre_vide_sans_nom");
            centralTile.addEffect("ULTIMATE_SEAL");
            centralTile.setIsLocked(true);
            centralTile.setLockDuration(999);
            gameTileRepository.save(centralTile);
        }
        
        // Sceller la cible
        target.setStatus(HeroStatus.SEALED);
        target.addStatusEffect("ETERNAL_SEAL", -1);
        target.setMovementPoints(0);
        
        heroRepository.save(jean);
        heroRepository.save(claudius);
        heroRepository.save(chlamydius);
        heroRepository.save(target);
        
        result.put("success", true);
        result.put("sequence", sequence);
        result.put("target_sealed", target.getName());
        result.put("message", "LA SÉQUENCE ULTIME EST COMPLÈTE! " + target.getName() + " est scellé dans le Livre Vide Sans Nom!");
        result.put("epilogue", "Dans les marges du livre, une note apparaît: 'L'encre sèche, mais les mots restent.'");
        
        return result;
    }
    
    /**
     * Vérifie si trois héros sont adjacents (forment un triangle)
     */
    private boolean areHeroesAdjacent(Hero h1, Hero h2, Hero h3) {
        int maxDistance = 2; // Distance max pour être considéré adjacent
        
        double d12 = distance(h1, h2);
        double d13 = distance(h1, h3);
        double d23 = distance(h2, h3);
        
        return d12 <= maxDistance && d13 <= maxDistance && d23 <= maxDistance;
    }
    
    private double distance(Hero h1, Hero h2) {
        int dx = h1.getPositionX() - h2.getPositionX();
        int dy = h1.getPositionY() - h2.getPositionY();
        return Math.sqrt(dx * dx + dy * dy);
    }
} 