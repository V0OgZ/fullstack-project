package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

// Ajouter imports pour JSON
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.InputStream;

/**
 * 🔥 ARTIFACT EFFECT EXECUTOR - SYSTÈME D'ID SIMPLE
 * 
 * Point d'entrée unique pour exécuter les effets d'artefacts.
 * Chaque artefact a un ID qui mappe vers du code Java spécifique.
 * 
 * PRINCIPE : USE(ARTIFACT, id, HERO:nom) → executeArtifactEffect(id, hero, game)
 */
@Service
public class ArtifactEffectExecutor {
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private GameTileRepository gameTileRepository;
    
    @Autowired
    private DynamicFormulaParser dynamicFormulaParser;
    
    /**
     * 🎯 POINT D'ENTRÉE PRINCIPAL
     * Exécute l'effet d'un artefact basé sur son ID
     * 
     * 🔄 SYSTÈME HYBRIDE :
     * 1. D'abord essayer JSON formulas (dynamique)
     * 2. Ensuite essayer code Java hardcodé (performance)
     * 3. Fallback vers effet générique
     */
    public Map<String, Object> executeArtifactEffect(String artifactId, Hero hero, Game game) {
        
        // Vérifications de base
        if (hero == null) {
            return createError("Héros introuvable");
        }
        
        if (game == null) {
            return createError("Jeu introuvable");
        }
        
        // Vérifier que le héros possède l'artefact (optionnel pour les tests)
        // if (!hero.hasItem(artifactId)) {
        //     return createError("Héros ne possède pas l'artefact: " + artifactId);
        // }
        
        // 🔄 ÉTAPE 1: ESSAYER FORMULE JSON DYNAMIQUE
        Map<String, Object> dynamicResult = tryDynamicFormulaExecution(artifactId, hero, game);
        if (dynamicResult != null) {
            return dynamicResult;
        }
        
        // 🔄 ÉTAPE 2: ESSAYER CODE JAVA HARDCODÉ
        Map<String, Object> hardcodedResult = tryHardcodedExecution(artifactId, hero, game);
        if (hardcodedResult != null) {
            return hardcodedResult;
        }
        
        // 🔄 ÉTAPE 3: FALLBACK VERS EFFET GÉNÉRIQUE
        return executeGenericArtifact(artifactId, hero, game);
    }
    
    /**
     * 🌟 ÉTAPE 1 : Essayer d'exécuter une formule JSON
     */
    private Map<String, Object> tryDynamicFormulaExecution(String artifactId, Hero hero, Game game) {
        try {
            // Chercher l'artefact dans les JSON (custom-artifacts.json, temporal-artifacts-advanced.json, etc.)
            String formula = findArtifactFormula(artifactId);
            
            if (formula != null && !formula.isEmpty()) {
                // Exécuter via DynamicFormulaParser  
                return dynamicFormulaParser.executeFormulaEffect(formula, hero, game, 0);
            }
        } catch (Exception e) {
            System.err.println("⚠️ Erreur exécution formule dynamique pour " + artifactId + ": " + e.getMessage());
        }
        return null; // Pas trouvé ou erreur
    }
    
    /**
     * 🏭 ÉTAPE 2 : Essayer le code Java hardcodé
     */  
    private Map<String, Object> tryHardcodedExecution(String artifactId, Hero hero, Game game) {
        // 🎮 SWITCH PRINCIPAL - MAPPING ID → EFFET JAVA HARDCODÉ
        switch (artifactId.toLowerCase()) {
            
            // === ARTEFACTS QUANTIQUES ===
            case "quantum_mirror":
                return executeQuantumMirror(hero, game);
                
            case "amplitude_manipulator":  
                return executeAmplitudeManipulator(hero, game);
                
            case "coherence_detector":
                return executeCoherenceDetector(hero, game);
                
            case "phase_shifter":
                return executePhaseShifter(hero, game);
                
            // === ARTEFACTS TEMPORELS ===
            case "temporal_sword":
                return executeTemporalSword(hero, game);
                
            case "chrono_staff":
                return executeChronoStaff(hero, game);
                
            case "time_anchor":
                return executeTimeAnchor(hero, game);
                
            // === ARTEFACTS LÉGENDAIRES ===
            case "avant_world_blade":
            case "avantWorldBlade":
                return executeAvantWorldBlade(hero, game);
                
            case "reverse_clock":
            case "reverseClock":
                return executeReverseClock(hero, game);
                
            case "wigner_eye":
                return executeWignerEye(hero, game);
                
            case "magic_spyglass":
                return executeMagicSpyglass(hero, game);
                
            // === ARTEFACTS HARDCODÉS SPÉCIAUX === 
            default:
                return null; // Pas trouvé en hardcodé
        }
    }
    
    /**
     * 🔍 CHERCHER FORMULE DANS LES JSON
     * Charge les artefacts depuis les différents fichiers JSON
     */
    private String findArtifactFormula(String artifactId) {
        try {
            // 1. Chercher dans custom-artifacts.json
            String customFormula = findFormulaInJsonFile("custom-artifacts.json", artifactId);
            if (customFormula != null) return customFormula;
            
            // 2. Chercher dans temporal-artifacts-advanced.json  
            String temporalFormula = findFormulaInJsonFile("temporal-artifacts-advanced.json", artifactId);
            if (temporalFormula != null) return temporalFormula;
            
            // 3. Chercher dans les templates de jeu
            String templateFormula = findFormulaInGameTemplates(artifactId);
            if (templateFormula != null) return templateFormula;
            
            // 4. Ajouter d'autres sources JSON selon le besoin...
            
        } catch (Exception e) {
            System.err.println("⚠️ Erreur lecture JSON artifacts: " + e.getMessage());
        }
        
        return null; // Pas trouvé
    }
    
    /**
     * 🔍 CHERCHER DANS UN FICHIER JSON SPÉCIFIQUE
     */
    private String findFormulaInJsonFile(String jsonFileName, String artifactId) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStream is = getClass().getClassLoader().getResourceAsStream(jsonFileName);
            
            if (is == null) {
                return null; // Fichier non trouvé
            }
            
            JsonNode root = mapper.readTree(is);
            JsonNode artifacts = null;
            
            // Chercher dans différents formats JSON
            if (root.has("custom_artifacts")) {
                artifacts = root.get("custom_artifacts");
            } else if (root.has("temporal_advanced_artifacts")) {
                artifacts = root.get("temporal_advanced_artifacts");  
            } else if (root.has("artifacts")) {
                artifacts = root.get("artifacts");
            } else if (root.isArray()) {
                artifacts = root; // Le root est directement un array
            }
            
            if (artifacts != null && artifacts.isArray()) {
                for (JsonNode artifact : artifacts) {
                    if (artifact.has("id") && artifact.get("id").asText().equals(artifactId)) {
                        if (artifact.has("formula")) {
                            String formula = artifact.get("formula").asText();
                            System.out.println("🌟 Formule trouvée pour " + artifactId + ": " + formula);
                            return formula;
                        }
                    }
                }
            }
            
        } catch (Exception e) {
            System.err.println("⚠️ Erreur parsing JSON " + jsonFileName + ": " + e.getMessage());
        }
        return null;
    }
    
    /**
     * 🔍 CHERCHER DANS LES TEMPLATES DE JEUX
     */
    private String findFormulaInGameTemplates(String artifactId) {
        try {
            // Chercher dans les templates de jeux
            String[] templates = {"classic_rpg", "quantum_puzzle"};
            
            for (String template : templates) {
                String templateFile = "game_templates/" + template + "/artifacts.json";
                String formula = findFormulaInJsonFile(templateFile, artifactId);
                if (formula != null) {
                    return formula;
                }
            }
            
        } catch (Exception e) {
            System.err.println("⚠️ Erreur recherche dans templates: " + e.getMessage());
        }
        return null;
    }
    
    // =========================================================================
    // 🌀 ARTEFACTS QUANTIQUES - EFFETS SUR LES ψ-STATES
    // =========================================================================
    
    /**
     * 🪞 MIROIR QUANTIQUE
     * Interférence constructive automatique entre les 2 premiers ψ-states
     */
    private Map<String, Object> executeQuantumMirror(Hero hero, Game game) {
        // Trouver les ψ-states avec amplitudes complexes
        List<PsiState> candidateStates = game.getActivePsiStates().stream()
            .filter(psi -> psi.isUsingComplexAmplitude())
            .filter(psi -> psi.getTargetX() != null && psi.getTargetY() != null)
            .limit(2)
            .collect(Collectors.toList());
            
        if (candidateStates.size() < 2) {
            return createError("Pas assez d'états quantiques pour l'interférence (trouvés: " + candidateStates.size() + ")");
        }
        
        PsiState psi1 = candidateStates.get(0);
        PsiState psi2 = candidateStates.get(1);
        
        // 🔬 EFFET RÉEL : Interférence constructive
        ComplexAmplitude originalAmp1 = psi1.getComplexAmplitude();
        ComplexAmplitude originalAmp2 = psi2.getComplexAmplitude();
        ComplexAmplitude result = psi1.calculateConstructiveInterference(psi2);
        
        // Appliquer les modifications
        psi1.setComplexAmplitude(result);
        psi2.collapse(); // Le second état s'effondre
        
        // Coût en énergie temporelle
        if (hero.getTemporalEnergy() >= 40) {
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 40);
        }
        
        // Sauvegarder les changements
        psiStateRepository.save(psi1);
        psiStateRepository.save(psi2);
        heroRepository.save(hero);
        
        Map<String, Object> response = createSuccess(
            "🪞 Miroir Quantique activé - Interférence constructive",
            String.format("ψ%s + ψ%s → %s", 
                psi1.getPsiId(), psi2.getPsiId(), result.toString()),
            result.getProbability()
        );
        
        response.put("psi1_original", originalAmp1.toString());
        response.put("psi2_original", originalAmp2.toString());
        response.put("result_amplitude", result.toString());
        response.put("energy_used", 40);
        
        return response;
    }
    
    /**
     * 🎛️ MANIPULATEUR D'AMPLITUDES  
     * Ajuste la phase du premier ψ-state (rotation de 45°)
     */
    private Map<String, Object> executeAmplitudeManipulator(Hero hero, Game game) {
        // Trouver un ψ-state à manipuler
        PsiState targetState = game.getActivePsiStates().stream()
            .filter(psi -> psi.isUsingComplexAmplitude())
            .findFirst()
            .orElse(null);
            
        if (targetState == null) {
            return createError("Aucun état quantique trouvé pour manipulation d'amplitude");
        }
        
        // 🔬 EFFET RÉEL : Rotation de phase 45°
        ComplexAmplitude originalAmplitude = targetState.getComplexAmplitude();
        ComplexAmplitude rotatedAmplitude = new ComplexAmplitude(
            originalAmplitude.getRealPart() * Math.cos(Math.PI/4) - originalAmplitude.getImaginaryPart() * Math.sin(Math.PI/4),
            originalAmplitude.getRealPart() * Math.sin(Math.PI/4) + originalAmplitude.getImaginaryPart() * Math.cos(Math.PI/4)
        );
        
        // Appliquer la modification
        targetState.setComplexAmplitude(rotatedAmplitude);
        
        // Coût en énergie
        if (hero.getTemporalEnergy() >= 25) {
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 25);
        }
        
        // Sauvegarder
        psiStateRepository.save(targetState);
        heroRepository.save(hero);
        
        return createSuccess(
            "🎛️ Manipulateur d'Amplitudes - Phase ajustée de 45°",
            String.format("%s → %s", originalAmplitude.toString(), rotatedAmplitude.toString()),
            rotatedAmplitude.getProbability()
        );
    }
    
    /**
     * 🔍 DÉTECTEUR DE COHÉRENCE
     * Mesure la cohérence entre deux ψ-states
     */
    private Map<String, Object> executeCoherenceDetector(Hero hero, Game game) {
        List<PsiState> candidateStates = game.getActivePsiStates().stream()
            .filter(psi -> psi.isUsingComplexAmplitude())
            .limit(2)
            .collect(Collectors.toList());
            
        if (candidateStates.size() < 2) {
            return createError("Pas assez d'états quantiques pour mesure de cohérence");
        }
        
        PsiState psi1 = candidateStates.get(0);
        PsiState psi2 = candidateStates.get(1);
        
        // 🔬 EFFET RÉEL : Calcul de cohérence
        ComplexAmplitude amp1 = psi1.getComplexAmplitude();
        ComplexAmplitude amp2 = psi2.getComplexAmplitude();
        
        // Produit scalaire des amplitudes normalisé
        double dotProduct = (amp1.getRealPart() * amp2.getRealPart()) + 
                           (amp1.getImaginaryPart() * amp2.getImaginaryPart());
        double coherence = Math.abs(dotProduct) / (amp1.getMagnitude() * amp2.getMagnitude());
        
        // Coût en énergie
        if (hero.getTemporalEnergy() >= 15) {
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 15);
        }
        
        heroRepository.save(hero);
        
        Map<String, Object> result = createSuccess(
            "🔍 Détecteur de Cohérence - Mesure effectuée",
            String.format("Facteur de cohérence: %.4f", coherence),
            coherence
        );
        
        result.put("coherence_factor", coherence);
        result.put("psi1_amplitude", amp1.toString());
        result.put("psi2_amplitude", amp2.toString());
        result.put("interpretation", coherence > 0.8 ? "Très cohérent" : 
                                   coherence > 0.5 ? "Moyennement cohérent" : "Faiblement cohérent");
        
        return result;
    }
    
    /**
     * 🌀 PHASE SHIFTER
     * Ajuste finement la phase d'un ψ-state
     */
    private Map<String, Object> executePhaseShifter(Hero hero, Game game) {
        PsiState targetState = game.getActivePsiStates().stream()
            .filter(psi -> psi.isUsingComplexAmplitude())
            .findFirst()
            .orElse(null);
            
        if (targetState == null) {
            return createError("Aucun état quantique trouvé pour ajustement de phase");
        }
        
        // Rotation aléatoire entre 15° et 90°
        double angle = Math.toRadians(15 + Math.random() * 75);
        ComplexAmplitude original = targetState.getComplexAmplitude();
        ComplexAmplitude shifted = new ComplexAmplitude(
            original.getRealPart() * Math.cos(angle) - original.getImaginaryPart() * Math.sin(angle),
            original.getRealPart() * Math.sin(angle) + original.getImaginaryPart() * Math.cos(angle)
        );
        
        targetState.setComplexAmplitude(shifted);
        
        if (hero.getTemporalEnergy() >= 20) {
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 20);
        }
        
        psiStateRepository.save(targetState);
        heroRepository.save(hero);
        
        return createSuccess(
            "🌀 Phase Shifter - Ajustement de phase",
            String.format("Rotation de %.1f°", Math.toDegrees(angle)),
            shifted.getProbability()
        );
    }
    
    // =========================================================================
    // ⚔️ ARTEFACTS TEMPORELS - EFFETS SUR LE GAMEPLAY
    // =========================================================================
    
    /**
     * ⚔️ ÉPÉE TEMPORELLE
     * Augmente les dégâts du prochain combat
     */
    private Map<String, Object> executeTemporalSword(Hero hero, Game game) {
        // 🎯 STYLE JEAN-GROFIGNON : L'épée donne +10 mouvement ET +50 dégâts !
        hero.addItem("TEMPORAL_DAMAGE_BONUS_+50");
        hero.addItem("TEMPORAL_MOVEMENT_BONUS_+10");
        hero.addItem("TEMPORAL_SWORD_ACTIVE_" + System.currentTimeMillis());
        
        // Augmenter temporairement les points de mouvement
        int currentMovement = hero.getMovementPoints();
        hero.setMovementPoints(Math.min(currentMovement + 10, 20)); // Max 20
        
        // Coût en énergie
        if (hero.getTemporalEnergy() >= 30) {
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 30);
        }
        
        heroRepository.save(hero);
        
        return createSuccess(
            "⚔️ Épée Temporelle activée", 
            "Dégâts +50 et Mouvement +10 ! (Jean-Grofignon approuve)",
            1.0
        );
    }
    
    /**
     * 🪄 BÂTON CHRONO
     * Ralentit le temps autour du héros
     */
    private Map<String, Object> executeChronoStaff(Hero hero, Game game) {
        // Créer une zone de ralentissement temporel
        GameTile heroTile = null;
        if (hero.getPositionX() != null && hero.getPositionY() != null) {
            heroTile = game.getTileAt(hero.getPositionX(), hero.getPositionY());
        }
        
        String effect = "Zone de ralentissement créée";
        if (heroTile != null) {
            // Marquer la tuile avec l'effet (implémentation simplifiée)
            effect = String.format("Zone de ralentissement en (%d,%d)", 
                                 hero.getPositionX(), hero.getPositionY());
        }
        
        // Ajouter effet temporaire au héros
        hero.addItem("TIME_SLOW_AURA_3_TURNS");
        
        // Coût en énergie
        if (hero.getTemporalEnergy() >= 45) {
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 45);
        }
        
        heroRepository.save(hero);
        
        return createSuccess(
            "🪄 Bâton Chrono activé",
            effect + " - Durée: 3 tours",
            1.0
        );
    }
    
    /**
     * ⚓ ANCRE TEMPORELLE  
     * Stabilise tous les ψ-states dans la zone
     */
    private Map<String, Object> executeTimeAnchor(Hero hero, Game game) {
        // Compter les ψ-states actifs
        List<PsiState> activeStates = game.getActivePsiStates();
        int stabilizedCount = 0;
        
        // Stabiliser les ψ-states (marquer comme stabilisés)
        for (PsiState state : activeStates) {
            if (state.isActive()) {
                state.setCollapseTrigger("STABILIZED_BY_TIME_ANCHOR");
                psiStateRepository.save(state);
                stabilizedCount++;
            }
        }
        
        // Coût élevé car très puissant
        if (hero.getTemporalEnergy() >= 60) {
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 60);
        }
        
        heroRepository.save(hero);
        
        return createSuccess(
            "⚓ Ancre Temporelle activée",
            String.format("%d états quantiques stabilisés", stabilizedCount),
            1.0
        );
    }
    
    // =========================================================================
    // 🏺 ARTEFACTS LÉGENDAIRES - EFFETS PUISSANTS
    // =========================================================================
    
    /**
     * 🗡️ LAME DE L'AVANT-MONDE
     * Force l'effondrement des timelines ennemies
     */
    private Map<String, Object> executeAvantWorldBlade(Hero hero, Game game) {
        // Trouver les ψ-states des autres joueurs
        List<PsiState> enemyStates = game.getActivePsiStates().stream()
            .filter(psi -> !hero.getName().equals(psi.getOwnerHero()))
            .collect(Collectors.toList());
        
        int collapsedCount = 0;
        for (PsiState state : enemyStates) {
            if (state.isActive() && Math.random() > 0.3) { // 70% chance de collapse
                state.collapse();
                psiStateRepository.save(state);
                collapsedCount++;
            }
        }
        
        // Coût très élevé
        if (hero.getTemporalEnergy() >= 80) {
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 80);
        }
        
        heroRepository.save(hero);
        
        return createSuccess(
            "🗡️ Lame de l'Avant-Monde - Pouvoir déchaîné",
            String.format("%d timelines ennemies effondrées", collapsedCount),
            1.0
        );
    }
    
    /**
     * 🕐 HORLOGE INVERSÉE
     * Rollback temporel limité
     */
    private Map<String, Object> executeReverseClock(Hero hero, Game game) {
        // Simuler un rollback en restaurant une position précédente
        if (hero.getPositionX() != null && hero.getPositionY() != null) {
            // Décaler légèrement la position (effet de "rollback")
            int newX = Math.max(0, hero.getPositionX() - 1);
            int newY = Math.max(0, hero.getPositionY() - 1);
            hero.setPositionX(newX);
            hero.setPositionY(newY);
        }
        
        // Restaurer un peu d'énergie temporelle (effet du rollback)
        hero.setTemporalEnergy(Math.min(hero.getMaxTemporalEnergy(), 
                                       hero.getTemporalEnergy() + 20));
        
        heroRepository.save(hero);
        
        return createSuccess(
            "🕐 Horloge Inversée - Rollback temporel",
            "Position et énergie partiellement restaurées",
            1.0
        );
    }
    
    /**
     * 👁️ ŒIL DE WIGNER
     * Force l'observation et l'effondrement d'un ψ-state
     */
    private Map<String, Object> executeWignerEye(Hero hero, Game game) {
        // Trouver un ψ-state actif à observer
        PsiState targetState = game.getActivePsiStates().stream()
            .filter(psi -> psi.isActive())
            .findFirst()
            .orElse(null);
            
        if (targetState == null) {
            return createError("Aucun état quantique à observer");
        }
        
        // Force l'effondrement par observation
        String originalExpression = targetState.getExpression();
        targetState.collapse();
        
        // Coût modéré
        if (hero.getTemporalEnergy() >= 35) {
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 35);
        }
        
        psiStateRepository.save(targetState);
        heroRepository.save(hero);
        
        return createSuccess(
            "👁️ Œil de Wigner - Observation forcée",
            String.format("État %s effondré par observation", targetState.getPsiId()),
            1.0
        );
    }
    
    /**
     * 🔮 LONGUE-VUE MAGIQUE
     * Permet de voir 3 jours dans le futur
     */
    private Map<String, Object> executeMagicSpyglass(Hero hero, Game game) {
        // Activer la vision temporelle
        hero.setTemporalVisionRange(3); // Voir 3 jours dans le futur
        hero.addItem("TEMPORAL_VISION_ACTIVE_" + System.currentTimeMillis());
        
        // Trouver ce qui se passe dans le futur
        List<Map<String, Object>> futureEvents = new ArrayList<>();
        int heroDay = hero.getCurrentDay();
        
        // Chercher les héros qui sont dans le futur
        for (Hero otherHero : game.getHeroes()) {
            if (!otherHero.equals(hero) && otherHero.getCurrentDay() > heroDay) {
                int dayDiff = otherHero.getCurrentDay() - heroDay;
                if (dayDiff <= 3) {
                    Map<String, Object> event = new HashMap<>();
                    event.put("hero", otherHero.getName());
                    event.put("position", Map.of("x", otherHero.getPositionX(), "y", otherHero.getPositionY()));
                    event.put("day", otherHero.getCurrentDay());
                    event.put("daysInFuture", dayDiff);
                    futureEvents.add(event);
                }
            }
        }
        
        // Chercher les ψ-states qui vont se déclencher
        for (PsiState psi : game.getActivePsiStates()) {
            if (psi.getDeltaT() != null && psi.getDeltaT() <= 3) {
                Map<String, Object> event = new HashMap<>();
                event.put("type", "quantum_event");
                event.put("psiId", psi.getPsiId());
                event.put("willTriggerIn", psi.getDeltaT() + " jours");
                event.put("position", Map.of("x", psi.getTargetX(), "y", psi.getTargetY()));
                futureEvents.add(event);
            }
        }
        
        // Coût en énergie
        if (hero.getTemporalEnergy() >= 25) {
            hero.setTemporalEnergy(hero.getTemporalEnergy() - 25);
        }
        
        heroRepository.save(hero);
        
        Map<String, Object> result = createSuccess(
            "🔮 Longue-vue Magique - Vision du futur activée",
            String.format("Vous voyez %d événements dans les 3 prochains jours", futureEvents.size()),
            1.0
        );
        result.put("futureEvents", futureEvents);
        
        return result;
    }
    
    // =========================================================================
    // 🎲 ARTEFACT GÉNÉRIQUE - FALLBACK
    // =========================================================================
    
    /**
     * 🚀 SYSTÈME HYBRIDE - PARSER DYNAMIQUE + FALLBACK
     * 
     * 1. Essaie de trouver un artefact JSON avec formule
     * 2. Si trouvé : utilise DynamicFormulaParser
     * 3. Sinon : effet générique
     */
    private Map<String, Object> executeGenericArtifact(String artifactId, Hero hero, Game game) {
        System.out.println("🔍 RECHERCHE ARTEFACT DYNAMIQUE: " + artifactId);
        
        // 📊 ÉTAPE 1: Essayer de charger l'artefact depuis JSON
        Map<String, Object> artifactData = loadArtifactFromJson(artifactId);
        
        if (artifactData != null && artifactData.containsKey("formula")) {
            System.out.println("🎯 ARTEFACT DYNAMIQUE TROUVÉ ! Formula: " + artifactData.get("formula"));
            
            String formula = (String) artifactData.get("formula");
            int energyCost = artifactData.containsKey("energy_cost") ? 
                           ((Number) artifactData.get("energy_cost")).intValue() : 25;
            
            // Valider la formule avant l'exécution
            if (!dynamicFormulaParser.isValidFormula(formula)) {
                return createError("🚨 Formule invalide pour l'artefact " + artifactId + ": " + formula);
            }
            
            // 🔥 EXÉCUTER LA FORMULE DYNAMIQUE !
            return dynamicFormulaParser.executeFormulaEffect(formula, hero, game, energyCost);
        }
        
        // 📊 ÉTAPE 2: Fallback vers effet générique
        System.out.println("🎲 FALLBACK GÉNÉRIQUE pour: " + artifactId);
        
        // Vérifier l'énergie pour l'effet générique
        if (hero.getTemporalEnergy() < 15) {
            return createError("Énergie insuffisante pour l'effet générique. Requis: 15, Disponible: " + hero.getTemporalEnergy());
        }
        
        // Effet générique : bonus d'énergie temporelle  
        hero.setTemporalEnergy(Math.min(hero.getMaxTemporalEnergy(),
                                       hero.getTemporalEnergy() + 10));
        
        // Déduire le coût
        hero.setTemporalEnergy(hero.getTemporalEnergy() - 15);
        
        // Ajouter un marqueur d'utilisation
        hero.addItem("USED_" + artifactId.toUpperCase() + "_" + System.currentTimeMillis());
        
        heroRepository.save(hero);
        
        return createSuccess(
            "🎲 Artefact " + artifactId + " activé (mode générique)",
            "Effet générique: +10 énergie temporelle, -15 énergie",
            1.0
        );
    }
    
    /**
     * 📂 Charger un artefact depuis les fichiers JSON
     */
    private Map<String, Object> loadArtifactFromJson(String artifactId) {
        try {
            // Essayer plusieurs emplacements
            String[] possiblePaths = {
                "/custom-artifacts/" + artifactId + ".json",
                "/artefacts-custom/" + artifactId + ".json", 
                "/quantum-artifacts.json", // Fichier global
                "/temporal-artifacts-advanced.json", // Nouveaux artefacts temporels
                "/artifacts/" + artifactId + ".json"
            };
            
            for (String path : possiblePaths) {
                Map<String, Object> artifact = tryLoadArtifactFromPath(path, artifactId);
                if (artifact != null) {
                    System.out.println("✅ Artefact trouvé dans: " + path);
                    return artifact;
                }
            }
            
            System.out.println("❌ Artefact " + artifactId + " non trouvé dans les JSON");
            return null;
            
        } catch (Exception e) {
            System.err.println("🚨 Erreur chargement artefact " + artifactId + ": " + e.getMessage());
            return null;
        }
    }
    
    /**
     * 🔍 Essayer de charger depuis un chemin spécifique
     */
    private Map<String, Object> tryLoadArtifactFromPath(String resourcePath, String artifactId) {
        try {
            // TODO: Implémenter le chargement JSON réel
            // Pour l'instant, retourner des exemples hardcodés
            
            if ("custom_mirror".equals(artifactId)) {
                Map<String, Object> customMirror = new HashMap<>();
                customMirror.put("id", "custom_mirror");
                customMirror.put("name", "Miroir Personnalisé");
                customMirror.put("formula", "CONSTRUCTIVE(ψ1, ψ2) + AMPLIFY(result, 1.5)");
                customMirror.put("energy_cost", 30);
                return customMirror;
            }
            
            if ("teleport_crystal".equals(artifactId)) {
                Map<String, Object> teleportCrystal = new HashMap<>();
                teleportCrystal.put("id", "teleport_crystal");
                teleportCrystal.put("name", "Cristal de Téléportation");
                teleportCrystal.put("formula", "TELEPORT_HERO(hero, 10, 10) + MODIFY_ENERGY(hero, -20)");
                teleportCrystal.put("energy_cost", 40);
                return teleportCrystal;
            }
            
            if ("energy_amplifier".equals(artifactId)) {
                Map<String, Object> energyAmp = new HashMap<>();
                energyAmp.put("id", "energy_amplifier");
                energyAmp.put("name", "Amplificateur d'Énergie");
                energyAmp.put("formula", "MODIFY_ENERGY(hero, 50) + AMPLIFY(ψ1, 2.0)");
                energyAmp.put("energy_cost", 20);
                return energyAmp;
            }
            
            // 🚀 NOUVEAUX ARTEFACTS TEMPORELS AVANCÉS
            if ("chrono_collapser".equals(artifactId)) {
                Map<String, Object> chronoCollapser = new HashMap<>();
                chronoCollapser.put("id", "chrono_collapser");
                chronoCollapser.put("name", "Effondreur Chronologique");
                chronoCollapser.put("formula", "DESTRUCTIVE(ψ1, ψ2) + COLLAPSE_TEMPORAL_STATES() + REVERSE_TIME_IF_AHEAD(hero, 1)");
                chronoCollapser.put("energy_cost", 80);
                return chronoCollapser;
            }
            
            if ("quantum_interference_crystal".equals(artifactId)) {
                Map<String, Object> crystal = new HashMap<>();
                crystal.put("id", "quantum_interference_crystal");
                crystal.put("name", "Cristal d'Interférence Quantique");
                crystal.put("formula", "CONSTRUCTIVE(ψ1, ψ2) + CONSTRUCTIVE(ψ2, ψ3) + TELEPORT_BY_PROBABILITY(hero, result)");
                crystal.put("energy_cost", 60);
                return crystal;
            }
            
            if ("temporal_paradox_engine".equals(artifactId)) {
                Map<String, Object> engine = new HashMap<>();
                engine.put("id", "temporal_paradox_engine");
                engine.put("name", "Moteur de Paradoxe Temporel");
                engine.put("formula", "AMPLIFY(ψ1, 3.0) + DESTRUCTIVE(ψ1, ψ2) + AMPLIFY(result, 0.5) + MODIFY_ENERGY(hero, -50) + CREATE_TEMPORAL_ECHO(hero)");
                engine.put("energy_cost", 120);
                return engine;
            }
            
            if ("collapse_accelerator".equals(artifactId)) {
                Map<String, Object> accelerator = new HashMap<>();
                accelerator.put("id", "collapse_accelerator");
                accelerator.put("name", "Accélérateur de Collapse");
                accelerator.put("formula", "FORCE_COLLAPSE_ALL(hero, 4) + AMPLIFY(energy_released, 2.0) + MODIFY_ENERGY(hero, energy_released)");
                accelerator.put("energy_cost", 45);
                return accelerator;
            }
            
            return null;
            
        } catch (Exception e) {
            return null;
        }
    }
    
    // =========================================================================
    // 🛠️ MÉTHODES UTILITAIRES
    // =========================================================================
    
    private Map<String, Object> createSuccess(String message, String details, double value) {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", message);
        result.put("details", details);
        result.put("value", value);
        result.put("timestamp", System.currentTimeMillis());
        return result;
    }
    
    private Map<String, Object> createError(String message) {
        Map<String, Object> result = new HashMap<>();
        result.put("success", false);
        result.put("error", message);
        result.put("timestamp", System.currentTimeMillis());
        return result;
    }
} 