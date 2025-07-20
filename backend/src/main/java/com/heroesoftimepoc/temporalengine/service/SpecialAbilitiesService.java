package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.Hero;
import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class SpecialAbilitiesService {

    @Autowired
    private HeroRepository heroRepository;

    @Autowired
    private GameRepository gameRepository;

    private final Random random = new Random();

    /**
     * PRE_EXISTENCE_STRIKE - Attaque avant d'agir
     * Permet d'attaquer un ennemi avant qu'il n'ait le temps de réagir
     */
    public Map<String, Object> executePreExistenceStrike(String heroName, String targetName, Long gameId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Hero attacker = heroRepository.findByNameAndGameId(heroName, gameId);
            Hero target = heroRepository.findByNameAndGameId(targetName, gameId);
            
            if (attacker == null || target == null) {
                result.put("success", false);
                result.put("error", "Héros non trouvé");
                return result;
            }
            
            // Calcul de l'attaque pré-existante
            int baseDamage = 50;
            int temporalBonus = attacker.getTemporalEnergy() / 10;
            int totalDamage = baseDamage + temporalBonus;
            
            // L'attaque pré-existante ignore les défenses normales
            int finalDamage = (int) (totalDamage * 1.5);
            
            // Appliquer les dégâts
            int newHealth = Math.max(0, target.getHealth() - finalDamage);
            target.setHealth(newHealth);
            
            // Consommer de l'énergie temporelle
            int energyCost = 30;
            attacker.setTemporalEnergy(Math.max(0, attacker.getTemporalEnergy() - energyCost));
            
            // Sauvegarder
            heroRepository.save(attacker);
            heroRepository.save(target);
            
            result.put("success", true);
            result.put("message", "Frappe Pré-Existante exécutée");
            result.put("damage", finalDamage);
            result.put("targetHealth", newHealth);
            result.put("energyCost", energyCost);
            result.put("description", String.format(
                "%s frappe %s avant même que le temps ne s'écoule, infligeant %d dégâts temporels",
                heroName, targetName, finalDamage
            ));
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Erreur lors de la Frappe Pré-Existante: " + e.getMessage());
        }
        
        return result;
    }

    /**
     * MEMORY_INFECTION - Swap capacités
     * Infecte la mémoire d'un ennemi et échange temporairement ses capacités
     */
    public Map<String, Object> executeMemoryInfection(String heroName, String targetName, Long gameId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Hero attacker = heroRepository.findByNameAndGameId(heroName, gameId);
            Hero target = heroRepository.findByNameAndGameId(targetName, gameId);
            
            if (attacker == null || target == null) {
                result.put("success", false);
                result.put("error", "Héros non trouvé");
                return result;
            }
            
            // Vérifier que l'attaquant a l'énergie temporelle nécessaire
            int energyCost = 50;
            if (attacker.getTemporalEnergy() < energyCost) {
                result.put("success", false);
                result.put("error", "Énergie temporelle insuffisante");
                return result;
            }
            
            // Échanger temporairement les statistiques
            int tempHealth = attacker.getHealth();
            int tempMaxHealth = attacker.getMaxHealth();
            int tempMovement = attacker.getMovementPoints();
            int tempEnergy = attacker.getTemporalEnergy();
            
            attacker.setHealth(target.getHealth());
            attacker.setMaxHealth(target.getMaxHealth());
            attacker.setMovementPoints(target.getMovementPoints());
            attacker.setTemporalEnergy(target.getTemporalEnergy());
            
            target.setHealth(tempHealth);
            target.setMaxHealth(tempMaxHealth);
            target.setMovementPoints(tempMovement);
            target.setTemporalEnergy(tempEnergy);
            
            // Consommer l'énergie
            attacker.setTemporalEnergy(Math.max(0, attacker.getTemporalEnergy() - energyCost));
            
            // Sauvegarder
            heroRepository.save(attacker);
            heroRepository.save(target);
            
            result.put("success", true);
            result.put("message", "Infection Mémorielle exécutée");
            result.put("energyCost", energyCost);
            result.put("duration", "3 tours");
            result.put("description", String.format(
                "%s infecte la mémoire de %s, échangeant temporairement leurs capacités",
                heroName, targetName
            ));
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Erreur lors de l'Infection Mémorielle: " + e.getMessage());
        }
        
        return result;
    }

    /**
     * REALITY_RECOMPILE - Recompilation de la réalité
     * Recompile la réalité autour d'un héros, modifiant les règles du jeu
     */
    public Map<String, Object> executeRealityRecompile(String heroName, Long gameId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Hero hero = heroRepository.findByNameAndGameId(heroName, gameId);
            Game game = gameRepository.findById(gameId).orElse(null);
            
            if (hero == null || game == null) {
                result.put("success", false);
                result.put("error", "Héros ou partie non trouvé");
                return result;
            }
            
            // Vérifier l'énergie temporelle
            int energyCost = 100;
            if (hero.getTemporalEnergy() < energyCost) {
                result.put("success", false);
                result.put("error", "Énergie temporelle insuffisante");
                return result;
            }
            
            // Effets de la recompilation
            int realityShift = random.nextInt(3) + 1; // 1-3 effets aléatoires
            
            switch (realityShift) {
                case 1:
                    // Bonus de mouvement pour tous les héros
                    hero.setMovementPoints(hero.getMovementPoints() + 5);
                    result.put("effect", "Bonus de mouvement +5");
                    break;
                case 2:
                    // Régénération d'énergie temporelle
                    hero.setTemporalEnergy(hero.getMaxTemporalEnergy());
                    result.put("effect", "Énergie temporelle restaurée");
                    break;
                case 3:
                    // Vision temporelle étendue
                    hero.setTemporalVisionRange(hero.getTemporalVisionRange() + 2);
                    result.put("effect", "Vision temporelle +2");
                    break;
            }
            
            // Consommer l'énergie
            hero.setTemporalEnergy(Math.max(0, hero.getTemporalEnergy() - energyCost));
            
            // Sauvegarder
            heroRepository.save(hero);
            
            result.put("success", true);
            result.put("message", "Recompilation de la Réalité exécutée");
            result.put("energyCost", energyCost);
            result.put("realityShift", realityShift);
            result.put("description", String.format(
                "%s recompile la réalité, créant un décalage temporel qui %s",
                heroName, result.get("effect")
            ));
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Erreur lors de la Recompilation: " + e.getMessage());
        }
        
        return result;
    }

    /**
     * SCRIBE_NONEXISTENCE - Capacité spéciale de Chlamydius
     * Efface l'existence d'un héros du code de la réalité
     */
    public Map<String, Object> executeScribeNonexistence(String heroName, String targetName, Long gameId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Hero scribe = heroRepository.findByNameAndGameId(heroName, gameId);
            Hero target = heroRepository.findByNameAndGameId(targetName, gameId);
            
            if (scribe == null || target == null) {
                result.put("success", false);
                result.put("error", "Héros non trouvé");
                return result;
            }
            
            // Vérifier que c'est bien Chlamydius
            if (!"Chlamydius".equals(scribe.getName())) {
                result.put("success", false);
                result.put("error", "Seul Chlamydius peut utiliser cette capacité");
                return result;
            }
            
            // Vérifier l'énergie temporelle
            int energyCost = 200;
            if (scribe.getTemporalEnergy() < energyCost) {
                result.put("success", false);
                result.put("error", "Énergie temporelle insuffisante");
                return result;
            }
            
            // Calculer la probabilité de succès basée sur l'énergie temporelle
            double successChance = Math.min(0.8, scribe.getTemporalEnergy() / 250.0);
            
            if (random.nextDouble() < successChance) {
                // Succès - Effacer l'existence
                target.setStatus("PARADOX_DEATH");
                heroRepository.save(target);
                
                result.put("success", true);
                result.put("message", "Existence effacée avec succès");
                result.put("targetStatus", "PARADOX_DEATH");
                result.put("description", String.format(
                    "Chlamydius efface %s du code de la réalité, créant un paradoxe mortel",
                    targetName
                ));
            } else {
                // Échec - Effet de rebond
                scribe.setHealth(Math.max(1, scribe.getHealth() - 50));
                result.put("success", false);
                result.put("message", "Échec de l'effacement - Effet de rebond");
                result.put("scribeDamage", 50);
                result.put("description", String.format(
                    "L'effacement de %s échoue, l'effet de rebond blesse Chlamydius",
                    targetName
                ));
            }
            
            // Consommer l'énergie
            scribe.setTemporalEnergy(Math.max(0, scribe.getTemporalEnergy() - energyCost));
            heroRepository.save(scribe);
            
            result.put("energyCost", energyCost);
            result.put("successChance", String.format("%.1f%%", successChance * 100));
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Erreur lors de l'effacement: " + e.getMessage());
        }
        
        return result;
    }

    /**
     * OMEGA_ZERO_ULTIMATE - Capacité ultime d'Omega-Zéro
     * Fusionne tous les héros en une entité ultime
     */
    public Map<String, Object> executeOmegaZeroUltimate(String heroName, Long gameId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Hero omegaZero = heroRepository.findByNameAndGameId(heroName, gameId);
            
            if (omegaZero == null) {
                result.put("success", false);
                result.put("error", "Omega-Zéro non trouvé");
                return result;
            }
            
            // Vérifier que c'est bien Omega-Zéro
            if (!"Omega-Zero".equals(omegaZero.getName())) {
                result.put("success", false);
                result.put("error", "Seul Omega-Zéro peut utiliser cette capacité");
                return result;
            }
            
            // Vérifier l'énergie temporelle
            int energyCost = 999;
            if (omegaZero.getTemporalEnergy() < energyCost) {
                result.put("success", false);
                result.put("error", "Énergie temporelle insuffisante (999 requise)");
                return result;
            }
            
            // Récupérer tous les héros de la partie
            var allHeroes = heroRepository.findByGameId(gameId);
            
            // Calculer la puissance totale
            int totalPower = allHeroes.stream()
                .mapToInt(hero -> hero.getHealth() + hero.getTemporalEnergy())
                .sum();
            
            // Transformer Omega-Zéro en entité ultime
            omegaZero.setHealth(totalPower);
            omegaZero.setMaxHealth(totalPower);
            omegaZero.setTemporalEnergy(totalPower);
            omegaZero.setMaxTemporalEnergy(totalPower);
            omegaZero.setMovementPoints(999);
            omegaZero.setMaxMovementPoints(999);
            
            // Consommer l'énergie
            omegaZero.setTemporalEnergy(Math.max(0, omegaZero.getTemporalEnergy() - energyCost));
            
            // Sauvegarder
            heroRepository.save(omegaZero);
            
            result.put("success", true);
            result.put("message", "Transformation Oméga Ultime exécutée");
            result.put("energyCost", energyCost);
            result.put("totalPower", totalPower);
            result.put("heroesAbsorbed", allHeroes.size());
            result.put("description", String.format(
                "Omega-Zéro absorbe la puissance de %d héros, devenant une entité ultime de puissance %d",
                allHeroes.size(), totalPower
            ));
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Erreur lors de la transformation: " + e.getMessage());
        }
        
        return result;
    }

    /**
     * Obtenir la liste des capacités spéciales disponibles
     */
    public Map<String, Object> getAvailableAbilities() {
        Map<String, Object> abilities = new HashMap<>();
        
        abilities.put("PRE_EXISTENCE_STRIKE", Map.of(
            "name", "Frappe Pré-Existante",
            "description", "Attaque un ennemi avant qu'il n'ait le temps de réagir",
            "energyCost", 30,
            "heroes", "Tous les héros épiques"
        ));
        
        abilities.put("MEMORY_INFECTION", Map.of(
            "name", "Infection Mémorielle",
            "description", "Échange temporairement les capacités avec un ennemi",
            "energyCost", 50,
            "heroes", "Chlamydius, Jean-Grofignon"
        ));
        
        abilities.put("REALITY_RECOMPILE", Map.of(
            "name", "Recompilation de la Réalité",
            "description", "Recompile la réalité, modifiant les règles du jeu",
            "energyCost", 100,
            "heroes", "Jean-Grofignon, Claudius"
        ));
        
        abilities.put("SCRIBE_NONEXISTENCE", Map.of(
            "name", "Effacement de l'Existence",
            "description", "Efface un héros du code de la réalité",
            "energyCost", 200,
            "heroes", "Chlamydius uniquement"
        ));
        
        abilities.put("OMEGA_ZERO_ULTIMATE", Map.of(
            "name", "Transformation Oméga Ultime",
            "description", "Absorbe tous les héros pour devenir une entité ultime",
            "energyCost", 999,
            "heroes", "Omega-Zéro uniquement"
        ));
        
        return abilities;
    }
} 