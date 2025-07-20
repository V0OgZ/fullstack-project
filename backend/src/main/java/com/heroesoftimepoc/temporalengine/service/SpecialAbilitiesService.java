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
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;
import com.heroesoftimepoc.temporalengine.model.Hero.HeroStatus;

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
            Hero attacker = heroRepository.findByNameAndGameId(heroName, gameId)
                .orElseThrow(() -> new RuntimeException("Hero not found: " + heroName));
            Hero target = heroRepository.findByNameAndGameId(targetName, gameId)
                .orElseThrow(() -> new RuntimeException("Target hero not found: " + targetName));
            
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
            Hero attacker = heroRepository.findByNameAndGameId(heroName, gameId)
                .orElseThrow(() -> new RuntimeException("Hero not found: " + heroName));
            Hero target = heroRepository.findByNameAndGameId(targetName, gameId)
                .orElseThrow(() -> new RuntimeException("Target hero not found: " + targetName));
            
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
            Hero hero = heroRepository.findByNameAndGameId(heroName, gameId)
                .orElseThrow(() -> new RuntimeException("Hero not found: " + heroName));
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
            Hero scribe = heroRepository.findByNameAndGameId(heroName, gameId)
                .orElseThrow(() -> new RuntimeException("Hero not found: " + heroName));
            Hero target = heroRepository.findByNameAndGameId(targetName, gameId)
                .orElseThrow(() -> new RuntimeException("Target hero not found: " + targetName));
            
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
                target.setStatus(HeroStatus.PARADOX_DEATH);
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
            Hero omegaZero = heroRepository.findByNameAndGameId(heroName, gameId)
                .orElseThrow(() -> new RuntimeException("Hero not found: " + heroName));
            
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
     * ENFORCEMENT - Capacité spéciale de Walter
     * Force l'application des règles même quand il n'y en a pas
     */
    public Map<String, Object> executeEnforcement(String heroName, String targetHeroName, Long gameId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));
            
            Hero hero = heroRepository.findByGameIdAndName(gameId, heroName)
                .orElseThrow(() -> new RuntimeException("Hero not found: " + heroName));
            
            Hero targetHero = heroRepository.findByGameIdAndName(gameId, targetHeroName)
                .orElseThrow(() -> new RuntimeException("Target hero not found: " + targetHeroName));
            
            // Vérifier l'énergie temporelle
            if (hero.getTemporalEnergy() < 50) {
                result.put("success", false);
                result.put("error", "Insufficient temporal energy. Required: 50, Available: " + hero.getTemporalEnergy());
                return result;
            }
            
            // ENFORCEMENT : Force l'application des règles
            // 1. Reset tous les états paradoxaux
            // 2. Force la cohérence temporelle
            // 3. Applique les règles de causalité
            
            // Reset des états paradoxaux
            List<Hero> allHeroes = heroRepository.findByGameId(gameId);
            for (Hero h : allHeroes) {
                if (h.getStatus() == HeroStatus.PARADOX_DEATH) {
                    h.setStatus(HeroStatus.ACTIVE);
                    h.setHealth(Math.max(1, h.getHealth() / 2)); // Réduction de santé
                }
            }
            
            // Force la cohérence temporelle sur la cible
            targetHero.setTemporalImmunity(false);
            targetHero.setCausalityAwareness(targetHero.getCausalityAwareness() + 2);
            
            // Consommer l'énergie
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 50);
            
            // Sauvegarder
            heroRepository.saveAll(allHeroes);
            heroRepository.save(hero);
            heroRepository.save(targetHero);
            
            result.put("success", true);
            result.put("message", "ENFORCEMENT applied! Rules are now enforced on " + targetHeroName);
            result.put("heroName", heroName);
            result.put("targetHero", targetHeroName);
            result.put("energyCost", 50);
            result.put("remainingEnergy", hero.getTemporalEnergy());
            
            // Broadcast critique
            broadcastCriticalEvent("ENFORCEMENT_APPLIED", Map.of(
                "hero", heroName,
                "target", targetHeroName,
                "gameId", gameId
            ));
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "ENFORCEMENT failed: " + e.getMessage());
        }
        
        return result;
    }

    /**
     * DUDE_MODE - Capacité spéciale de The Dude
     * Transforme tout en partie de bowling cosmique
     */
    public Map<String, Object> executeDudeMode(String heroName, Long gameId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));
            
            Hero hero = heroRepository.findByGameIdAndName(gameId, heroName)
                .orElseThrow(() -> new RuntimeException("Hero not found: " + heroName));
            
            // Vérifier l'énergie temporelle
            if (hero.getTemporalEnergy() < 30) {
                result.put("success", false);
                result.put("error", "Insufficient temporal energy. Required: 30, Available: " + hero.getTemporalEnergy());
                return result;
            }
            
            // DUDE_MODE : Transforme la réalité en bowling cosmique
            // 1. Augmente la vision temporelle
            // 2. Détend la causalité
            // 3. Crée des effets de bowling
            
            hero.setTemporalVisionRange(hero.getTemporalVisionRange() + 3);
            hero.setCausalityAwareness(Math.max(0, hero.getCausalityAwareness() - 1));
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 30);
            
            // Effet spécial : Détend la réalité
            List<Hero> nearbyHeroes = heroRepository.findByGameId(gameId).stream()
                .filter(h -> Math.abs(h.getPositionX() - hero.getPositionX()) <= 5 &&
                           Math.abs(h.getPositionY() - hero.getPositionY()) <= 5)
                .collect(Collectors.toList());
            
            for (Hero nearby : nearbyHeroes) {
                if (!nearby.getName().equals(heroName)) {
                    nearby.setMovementPoints(nearby.getMovementPoints() + 2);
                    heroRepository.save(nearby);
                }
            }
            
            heroRepository.save(hero);
            
            result.put("success", true);
            result.put("message", "DUDE_MODE activated! Reality is now relaxed and cosmic bowling is in effect");
            result.put("heroName", heroName);
            result.put("energyCost", 30);
            result.put("remainingEnergy", hero.getTemporalEnergy());
            result.put("affectedHeroes", nearbyHeroes.size());
            
            // Broadcast critique
            broadcastCriticalEvent("DUDE_MODE_ACTIVATED", Map.of(
                "hero", heroName,
                "gameId", gameId,
                "affectedHeroes", nearbyHeroes.size()
            ));
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "DUDE_MODE failed: " + e.getMessage());
        }
        
        return result;
    }

    /**
     * QUANTUM_BOWLING - Capacité spéciale du Grand Lebowski Quantique
     * Bowling cosmique qui perturbe la réalité
     */
    public Map<String, Object> executeQuantumBowling(String heroName, Long gameId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));
            
            Hero hero = heroRepository.findByGameIdAndName(gameId, heroName)
                .orElseThrow(() -> new RuntimeException("Hero not found: " + heroName));
            
            // Vérifier l'énergie temporelle
            if (hero.getTemporalEnergy() < 80) {
                result.put("success", false);
                result.put("error", "Insufficient temporal energy. Required: 80, Available: " + hero.getTemporalEnergy());
                return result;
            }
            
            // QUANTUM_BOWLING : Bowling cosmique destructeur
            // 1. Perturbe tous les héros
            // 2. Crée des paradoxes temporels
            // 3. Effet de zone massif
            
            List<Hero> allHeroes = heroRepository.findByGameId(gameId);
            List<Hero> affectedHeroes = new ArrayList<>();
            
            for (Hero target : allHeroes) {
                if (!target.getName().equals(heroName)) {
                    // Effet de bowling cosmique
                    target.setHealth(Math.max(1, target.getHealth() - 20));
                    target.setTemporalEnergy(Math.max(0, target.getTemporalEnergy() - 15));
                    target.setMovementPoints(Math.max(0, target.getMovementPoints() - 3));
                    
                    // Chance de paradoxe
                    if (Math.random() < 0.3) {
                        target.setStatus(HeroStatus.TEMPORAL_SHIFT);
                    }
                    
                    affectedHeroes.add(target);
                    heroRepository.save(target);
                }
            }
            
            // Consommer l'énergie
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 80);
            heroRepository.save(hero);
            
            result.put("success", true);
            result.put("message", "QUANTUM_BOWLING unleashed! Cosmic chaos affects all heroes");
            result.put("heroName", heroName);
            result.put("energyCost", 80);
            result.put("remainingEnergy", hero.getTemporalEnergy());
            result.put("affectedHeroes", affectedHeroes.size());
            
            // Broadcast critique
            broadcastCriticalEvent("QUANTUM_BOWLING_ACTIVATED", Map.of(
                "hero", heroName,
                "gameId", gameId,
                "affectedHeroes", affectedHeroes.size()
            ));
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "QUANTUM_BOWLING failed: " + e.getMessage());
        }
        
        return result;
    }

    /**
     * PLAN_FOIREUX - Capacité spéciale de Ribouldingue
     * Lance un plan tellement compliqué qu'il ne peut que rater, mais ça distrait tout le monde
     */
    public Map<String, Object> executePlanFoireux(String heroName, Long gameId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Hero hero = heroRepository.findByNameAndGameId(heroName, gameId)
                .orElseThrow(() -> new RuntimeException("Hero not found: " + heroName));
            
            // Vérifier l'énergie temporelle
            if (hero.getTemporalEnergy() < 30) {
                result.put("success", false);
                result.put("error", "Énergie temporelle insuffisante (30 requis)");
                return result;
            }
            
            // Consommer l'énergie
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 30);
            
            // Effet du plan foireux : confusion générale
            List<Hero> allHeroes = heroRepository.findByGameId(gameId);
            Random random = new Random();
            
            for (Hero h : allHeroes) {
                if (!h.getName().equals(heroName)) {
                    // 50% de chance de confusion
                    if (random.nextBoolean()) {
                        h.setMovementPoints(Math.max(0, h.getMovementPoints() - 2));
                        h.setTemporalEnergy(Math.max(0, h.getTemporalEnergy() - 10));
                    }
                }
            }
            
            // Sauvegarder
            heroRepository.save(hero);
            allHeroes.forEach(heroRepository::save);
            
            result.put("success", true);
            result.put("message", "Ribouldingue lance un plan foireux ! Tout le monde est confus !");
            result.put("heroName", heroName);
            result.put("energyCost", 30);
            result.put("effect", "Confusion générale - Points de mouvement et énergie réduits");
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Erreur lors du plan foireux: " + e.getMessage());
        }
        
        return result;
    }

    /**
     * PLAN_TROP_COMPLIQUE - Capacité spéciale de Croquignol
     * Invente un plan si complexe que même lui ne s'y retrouve plus
     */
    public Map<String, Object> executePlanTropComplique(String heroName, Long gameId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Hero hero = heroRepository.findByNameAndGameId(heroName, gameId)
                .orElseThrow(() -> new RuntimeException("Hero not found: " + heroName));
            
            if (hero.getTemporalEnergy() < 40) {
                result.put("success", false);
                result.put("error", "Énergie temporelle insuffisante (40 requis)");
                return result;
            }
            
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 40);
            
            // Effet : Croquignol se perd dans son propre plan
            hero.setMovementPoints(0); // Ne peut plus bouger ce tour
            hero.setTemporalEnergy(Math.max(0, hero.getTemporalEnergy() - 20)); // Se fatigue
            
            // Mais il gagne en intelligence temporaire
            hero.setCausalityAwareness(hero.getCausalityAwareness() + 5);
            
            heroRepository.save(hero);
            
            result.put("success", true);
            result.put("message", "Croquignol invente un plan si compliqué qu'il se perd dedans !");
            result.put("heroName", heroName);
            result.put("energyCost", 40);
            result.put("effect", "Immobilisé mais +5 conscience causale");
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Erreur lors du plan trop compliqué: " + e.getMessage());
        }
        
        return result;
    }

    /**
     * ESQUIVE_TOTALE - Capacité spéciale de Filochard
     * Esquive tellement bien qu'il disparaît complètement du champ de vision
     */
    public Map<String, Object> executeEsquiveTotale(String heroName, Long gameId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Hero hero = heroRepository.findByNameAndGameId(heroName, gameId)
                .orElseThrow(() -> new RuntimeException("Hero not found: " + heroName));
            
            if (hero.getTemporalEnergy() < 25) {
                result.put("success", false);
                result.put("error", "Énergie temporelle insuffisante (25 requis)");
                return result;
            }
            
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 25);
            
            // Effet : Filochard devient invisible et se téléporte
            Random random = new Random();
            int newX = random.nextInt(50); // Carte 50x50
            int newY = random.nextInt(50);
            
            hero.setPositionX(newX);
            hero.setPositionY(newY);
            hero.setStatus(HeroStatus.TEMPORAL_SHIFT); // Statut spécial d'invisibilité
            
            heroRepository.save(hero);
            
            result.put("success", true);
            result.put("message", "Filochard esquive tellement bien qu'il disparaît !");
            result.put("heroName", heroName);
            result.put("energyCost", 25);
            result.put("newPosition", "(" + newX + "," + newY + ")");
            result.put("effect", "Téléportation aléatoire + invisibilité temporaire");
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Erreur lors de l'esquive totale: " + e.getMessage());
        }
        
        return result;
    }

    /**
     * INTERVENTION_RATE - Capacité spéciale de Bibendum
     * Intervient au mauvais moment et au mauvais endroit, créant la confusion
     */
    public Map<String, Object> executeInterventionRate(String heroName, Long gameId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Hero hero = heroRepository.findByNameAndGameId(heroName, gameId)
                .orElseThrow(() -> new RuntimeException("Hero not found: " + heroName));
            
            if (hero.getTemporalEnergy() < 20) {
                result.put("success", false);
                result.put("error", "Énergie temporelle insuffisante (20 requis)");
                return result;
            }
            
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 20);
            
            // Effet : Intervention maladroite qui perturbe tout le monde
            List<Hero> allHeroes = heroRepository.findByGameId(gameId);
            Random random = new Random();
            
            for (Hero h : allHeroes) {
                if (!h.getName().equals(heroName)) {
                    // 30% de chance d'être affecté par l'intervention maladroite
                    if (random.nextDouble() < 0.3) {
                        h.setMovementPoints(Math.max(0, h.getMovementPoints() - 1));
                        h.setTemporalEnergy(Math.max(0, h.getTemporalEnergy() - 5));
                    }
                }
            }
            
            // Bibendum se fatigue
            hero.setMovementPoints(Math.max(0, hero.getMovementPoints() - 3));
            
            heroRepository.save(hero);
            allHeroes.forEach(heroRepository::save);
            
            result.put("success", true);
            result.put("message", "Bibendum intervient maladroitement ! Tout le monde est perturbé !");
            result.put("heroName", heroName);
            result.put("energyCost", 20);
            result.put("effect", "Perturbation générale - Points de mouvement réduits");
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Erreur lors de l'intervention ratée: " + e.getMessage());
        }
        
        return result;
    }

    /**
     * MAUVAISE_PISTE - Capacité spéciale de PiedsPlats
     * Suit une piste tellement fausse qu'elle mène à une découverte inattendue
     */
    public Map<String, Object> executeMauvaisePiste(String heroName, Long gameId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Hero hero = heroRepository.findByNameAndGameId(heroName, gameId)
                .orElseThrow(() -> new RuntimeException("Hero not found: " + heroName));
            
            if (hero.getTemporalEnergy() < 35) {
                result.put("success", false);
                result.put("error", "Énergie temporelle insuffisante (35 requis)");
                return result;
            }
            
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 35);
            
            // Effet : Découverte inattendue grâce à la mauvaise piste
            Random random = new Random();
            int bonus = random.nextInt(20) + 10; // Bonus aléatoire entre 10 et 30
            
            hero.setTemporalEnergy(Math.min(hero.getMaxTemporalEnergy(), hero.getTemporalEnergy() + bonus));
            hero.setMovementPoints(Math.min(hero.getMaxMovementPoints(), hero.getMovementPoints() + 2));
            
            heroRepository.save(hero);
            
            result.put("success", true);
            result.put("message", "PiedsPlats suit une mauvaise piste mais découvre quelque chose d'intéressant !");
            result.put("heroName", heroName);
            result.put("energyCost", 35);
            result.put("bonusEnergy", bonus);
            result.put("effect", "Bonus d'énergie +2 points de mouvement");
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Erreur lors de la mauvaise piste: " + e.getMessage());
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

    // Méthode helper pour broadcast critique
    private void broadcastCriticalEvent(String eventType, Map<String, Object> data) {
        try {
            // Broadcast via l'API REST au lieu de WebSocket
            Map<String, Object> broadcastData = Map.of(
                "eventType", eventType,
                "data", data,
                "timestamp", System.currentTimeMillis()
            );
            
            // Log du broadcast
            System.out.println("📡 BROADCAST CRITIQUE: " + eventType);
            System.out.println("   Données: " + data);
            
        } catch (Exception e) {
            System.err.println("Erreur broadcast: " + e.getMessage());
        }
    }
} 