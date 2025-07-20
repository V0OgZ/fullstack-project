package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 🚀 PARSER DYNAMIQUE DE FORMULES ARTEFACTS
 * 
 * Permet aux utilisateurs de créer leurs propres artefacts avec des formules JSON
 * sans modifier le code Java !
 * 
 * FORMULES SUPPORTÉES :
 * - CONSTRUCTIVE(ψ1, ψ2) = |ψ1 + ψ2|²
 * - DESTRUCTIVE(ψ1, ψ2) = |ψ1 - ψ2|²  
 * - AMPLIFY(ψ, factor) = ψ * factor
 * - PHASE_SHIFT(ψ, angle) = ψ * e^(i*angle)
 * - COLLAPSE_PROBABILITY(ψ) = |ψ|²
 * - CREATE_SUPERPOSITION(pos1, pos2, p1, p2)
 * - MODIFY_ENERGY(hero, amount)
 * - TELEPORT_HERO(hero, x, y)
 * 
 * EXEMPLE JSON :
 * {
 *   "id": "custom_mirror",
 *   "name": "Miroir Personnalisé",
 *   "formula": "CONSTRUCTIVE(ψ1, ψ2) + AMPLIFY(result, 1.5)",
 *   "energy_cost": 30
 * }
 */
@Service
public class DynamicFormulaParser {
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private GameTileRepository gameTileRepository;
    
    @Autowired
    private TemporalScriptParser temporalScriptParser;
    
    // Patterns pour parser les formules
    private static final Pattern CONSTRUCTIVE_PATTERN = Pattern.compile("CONSTRUCTIVE\\((ψ\\d+|\\w+),\\s*(ψ\\d+|\\w+)\\)");
    private static final Pattern DESTRUCTIVE_PATTERN = Pattern.compile("DESTRUCTIVE\\((ψ\\d+|\\w+),\\s*(ψ\\d+|\\w+)\\)");
    private static final Pattern AMPLIFY_PATTERN = Pattern.compile("AMPLIFY\\((ψ\\d+|\\w+|result),\\s*([\\d.]+)\\)");
    private static final Pattern PHASE_SHIFT_PATTERN = Pattern.compile("PHASE_SHIFT\\((ψ\\d+|\\w+),\\s*([-+]?\\d*\\.?\\d+)\\)");
    private static final Pattern MODIFY_ENERGY_PATTERN = Pattern.compile("MODIFY_ENERGY\\((\\w+),\\s*([-+]?\\d+)\\)");
    private static final Pattern TELEPORT_PATTERN = Pattern.compile("TELEPORT_HERO\\((\\w+),\\s*(\\d+),\\s*(\\d+)\\)");
    private static final Pattern CREATE_SUPERPOSITION_PATTERN = Pattern.compile("CREATE_SUPERPOSITION\\((\\d+),\\s*(\\d+),\\s*(\\d+),\\s*(\\d+),\\s*(\\d*\\.?\\d+),\\s*(\\d*\\.?\\d+)\\)");
    
    // 🚀 NOUVELLES OPÉRATIONS TEMPORELLES AVANCÉES
    private static final Pattern COLLAPSE_TEMPORAL_PATTERN = Pattern.compile("COLLAPSE_TEMPORAL_STATES\\(\\)");
    private static final Pattern REVERSE_TIME_PATTERN = Pattern.compile("REVERSE_TIME_IF_AHEAD\\((\\w+),\\s*(\\d+)\\)");
    private static final Pattern TELEPORT_BY_PROBABILITY_PATTERN = Pattern.compile("TELEPORT_BY_PROBABILITY\\((\\w+),\\s*(\\w+|result)\\)");
    private static final Pattern CREATE_ECHO_PATTERN = Pattern.compile("CREATE_TEMPORAL_ECHO\\((\\w+)\\)");
    private static final Pattern FORCE_COLLAPSE_PATTERN = Pattern.compile("FORCE_COLLAPSE_ALL\\((\\w+),\\s*(\\d+)\\)");
    private static final Pattern CONDITIONAL_INTERFERENCE_PATTERN = Pattern.compile("CONDITIONAL_INTERFERENCE\\(([^,]+),\\s*(\\w+\\([^)]+\\)),\\s*(\\w+\\([^)]+\\))\\)");
    
    // 🆕 NOUVEAUX PATTERNS POUR AMPLITUDES
    private static final Pattern CREATE_AMPLITUDE_PATTERN = Pattern.compile("CREATE_AMPLITUDE\\(([^,]+),\\s*([^)]+)\\)");
    private static final Pattern SET_AMPLITUDE_PATTERN = Pattern.compile("SET_AMPLITUDE\\((ψ\\d+|\\w+),\\s*([^,]+),\\s*([^)]+)\\)");
    private static final Pattern AMPLITUDE_FROM_FORMULA_PATTERN = Pattern.compile("AMPLITUDE_FROM_FORMULA\\(\"([^\"]+)\"\\)");
    
    // 🆕 PATTERNS GROFI (pour Jean Grofignon)
    private static final Pattern GROFI_SIGMA_PATTERN = Pattern.compile("Σ\\[([^\\]]+)\\]");
    private static final Pattern GROFI_DAGGER_PATTERN = Pattern.compile("†\\[([^\\]]+)\\]");
    private static final Pattern GROFI_OMEGA_PATTERN = Pattern.compile("Ω\\[([^\\]]+)\\]");
    private static final Pattern GROFI_CHAOS_PATTERN = Pattern.compile("↯\\[([^\\]]+)\\]");
    
    /**
     * 🎯 MÉTHODE PRINCIPALE : Exécuter une formule d'artefact dynamique
     */
    public Map<String, Object> executeFormulaEffect(String formula, Hero hero, Game game, int energyCost) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            System.out.println("🧪 PARSING FORMULE DYNAMIQUE: " + formula);
            
            // Vérifier l'énergie avant d'exécuter
            if (hero.getTemporalEnergy() < energyCost) {
                result.put("success", false);
                result.put("error", "Énergie insuffisante. Requis: " + energyCost + ", Disponible: " + hero.getTemporalEnergy());
                return result;
            }
            
            // Parser et exécuter la formule
            Map<String, Object> formulaResult = parseAndExecuteFormula(formula, hero, game);
            
            if (formulaResult.containsKey("error")) {
                return formulaResult;
            }
            
            // Déduire l'énergie
            hero.setTemporalEnergy(hero.getTemporalEnergy() - energyCost);
            heroRepository.save(hero);
            
            result.put("success", true);
            result.put("formula", formula);
            result.put("energyUsed", energyCost);
            result.put("effects", formulaResult);
            result.put("message", "Formule dynamique exécutée avec succès !");
            
            return result;
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Erreur parsing formule: " + e.getMessage());
            System.err.println("❌ ERREUR PARSING FORMULE: " + e.getMessage());
            e.printStackTrace();
            return result;
        }
    }
    
    /**
     * 🔥 Parser et exécuter une formule complexe
     */
    private Map<String, Object> parseAndExecuteFormula(String formula, Hero hero, Game game) {
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> variables = new HashMap<>();
        
        // Normaliser la formule (enlever espaces extra, etc.)
        formula = formula.trim().replaceAll("\\s+", " ");
        
        // 📊 ÉTAPE 1: Collecter les ψ-states disponibles autour du héros
        List<PsiState> nearbyPsiStates = findNearbyPsiStates(hero, game, 3); // Rayon de 3 cases
        
        if (nearbyPsiStates.size() >= 2) {
            variables.put("ψ1", nearbyPsiStates.get(0));
            variables.put("ψ2", nearbyPsiStates.get(1));
        }
        if (nearbyPsiStates.size() >= 3) {
            variables.put("ψ3", nearbyPsiStates.get(2));
        }
        
        // 📊 ÉTAPE 2: Parser les opérations dans l'ordre (de gauche à droite)
        String[] operations = formula.split("\\+|\\-|\\*|\\/");
        ComplexAmplitude currentResult = null;
        
        for (String operation : operations) {
            operation = operation.trim();
            
            Map<String, Object> opResult = executeSingleOperation(operation, variables, hero, game);
            
            if (opResult.containsKey("error")) {
                return opResult;
            }
            
            // Accumuler les résultats
            if (opResult.containsKey("amplitude") && opResult.get("amplitude") instanceof ComplexAmplitude) {
                ComplexAmplitude opAmplitude = (ComplexAmplitude) opResult.get("amplitude");
                
                if (currentResult == null) {
                    currentResult = opAmplitude;
                } else {
                    // Combiner avec le résultat précédent (addition par défaut)
                    currentResult = currentResult.add(opAmplitude);
                }
                
                // Stocker comme variable pour la prochaine opération
                variables.put("result", currentResult);
            }
            
            // Ajouter les effets de cette opération au résultat global
            result.putAll(opResult);
        }
        
        // 📊 ÉTAPE 3: Résultat final
        if (currentResult != null) {
            result.put("finalAmplitude", currentResult.toString());
            result.put("finalProbability", currentResult.getProbability());
            result.put("psiStatesAffected", nearbyPsiStates.size());
        }
        
        return result;
    }
    
    /**
     * 🎲 Exécuter une seule opération de formule
     */
    private Map<String, Object> executeSingleOperation(String operation, Map<String, Object> variables, Hero hero, Game game) {
        Map<String, Object> result = new HashMap<>();
        
        // CONSTRUCTIVE(ψ1, ψ2)
        Matcher constructiveMatcher = CONSTRUCTIVE_PATTERN.matcher(operation);
        if (constructiveMatcher.find()) {
            String psi1Name = constructiveMatcher.group(1);
            String psi2Name = constructiveMatcher.group(2);
            
            PsiState psi1 = (PsiState) variables.get(psi1Name);
            PsiState psi2 = (PsiState) variables.get(psi2Name);
            
            if (psi1 != null && psi2 != null) {
                psi1.enableComplexAmplitude();
                psi2.enableComplexAmplitude();
                
                ComplexAmplitude constructiveResult = psi1.calculateConstructiveInterference(psi2);
                
                // Appliquer le résultat aux ψ-states
                psi1.setComplexAmplitude(constructiveResult);
                psi2.setComplexAmplitude(constructiveResult);
                
                psiStateRepository.save(psi1);
                psiStateRepository.save(psi2);
                
                result.put("amplitude", constructiveResult);
                result.put("operation", "CONSTRUCTIVE");
                result.put("affected", Arrays.asList(psi1.getPsiId(), psi2.getPsiId()));
                
                return result;
            } else {
                result.put("error", "ψ-states non trouvés pour CONSTRUCTIVE: " + psi1Name + ", " + psi2Name);
                return result;
            }
        }
        
        // DESTRUCTIVE(ψ1, ψ2)
        Matcher destructiveMatcher = DESTRUCTIVE_PATTERN.matcher(operation);
        if (destructiveMatcher.find()) {
            String psi1Name = destructiveMatcher.group(1);
            String psi2Name = destructiveMatcher.group(2);
            
            PsiState psi1 = (PsiState) variables.get(psi1Name);
            PsiState psi2 = (PsiState) variables.get(psi2Name);
            
            if (psi1 != null && psi2 != null) {
                psi1.enableComplexAmplitude();
                psi2.enableComplexAmplitude();
                
                ComplexAmplitude destructiveResult = psi1.calculateDestructiveInterference(psi2);
                
                psi1.setComplexAmplitude(destructiveResult);
                psi2.setComplexAmplitude(destructiveResult);
                
                psiStateRepository.save(psi1);
                psiStateRepository.save(psi2);
                
                result.put("amplitude", destructiveResult);
                result.put("operation", "DESTRUCTIVE");
                result.put("affected", Arrays.asList(psi1.getPsiId(), psi2.getPsiId()));
                
                return result;
            } else {
                result.put("error", "ψ-states non trouvés pour DESTRUCTIVE: " + psi1Name + ", " + psi2Name);
                return result;
            }
        }
        
        // AMPLIFY(ψ, factor) ou AMPLIFY(result, factor)
        Matcher amplifyMatcher = AMPLIFY_PATTERN.matcher(operation);
        if (amplifyMatcher.find()) {
            String targetName = amplifyMatcher.group(1);
            double factor = Double.parseDouble(amplifyMatcher.group(2));
            
            if ("result".equals(targetName) && variables.containsKey("result")) {
                ComplexAmplitude currentResult = (ComplexAmplitude) variables.get("result");
                ComplexAmplitude amplified = currentResult.multiply(factor);
                
                result.put("amplitude", amplified);
                result.put("operation", "AMPLIFY");
                result.put("factor", factor);
                result.put("target", "result");
                
                return result;
            } else {
                PsiState psiState = (PsiState) variables.get(targetName);
                if (psiState != null) {
                    psiState.enableComplexAmplitude();
                    ComplexAmplitude amplified = psiState.getComplexAmplitude().multiply(factor);
                    psiState.setComplexAmplitude(amplified);
                    psiStateRepository.save(psiState);
                    
                    result.put("amplitude", amplified);
                    result.put("operation", "AMPLIFY");
                    result.put("factor", factor);
                    result.put("target", psiState.getPsiId());
                    
                    return result;
                } else {
                    result.put("error", "Target non trouvé pour AMPLIFY: " + targetName);
                    return result;
                }
            }
        }
        
        // MODIFY_ENERGY(hero, amount)
        Matcher energyMatcher = MODIFY_ENERGY_PATTERN.matcher(operation);
        if (energyMatcher.find()) {
            String heroName = energyMatcher.group(1);
            int amount = Integer.parseInt(energyMatcher.group(2));
            
            if (heroName.equals(hero.getName()) || heroName.equals("hero")) {
                hero.setTemporalEnergy(hero.getTemporalEnergy() + amount);
                heroRepository.save(hero);
                
                result.put("operation", "MODIFY_ENERGY");
                result.put("hero", hero.getName());
                result.put("energyChange", amount);
                result.put("newEnergy", hero.getTemporalEnergy());
                
                return result;
            }
        }
        
        // TELEPORT_HERO(hero, x, y)
        Matcher teleportMatcher = TELEPORT_PATTERN.matcher(operation);
        if (teleportMatcher.find()) {
            String heroName = teleportMatcher.group(1);
            int x = Integer.parseInt(teleportMatcher.group(2));
            int y = Integer.parseInt(teleportMatcher.group(3));
            
            if (heroName.equals(hero.getName()) || heroName.equals("hero")) {
                hero.setPositionX(x);
                hero.setPositionY(y);
                heroRepository.save(hero);
                
                result.put("operation", "TELEPORT_HERO");
                result.put("hero", hero.getName());
                result.put("newPosition", x + "," + y);
                
                return result;
            }
        }
        
        // 🚀 NOUVELLES OPÉRATIONS TEMPORELLES AVANCÉES
        
        // COLLAPSE_TEMPORAL_STATES()
        Matcher collapseTemporalMatcher = COLLAPSE_TEMPORAL_PATTERN.matcher(operation);
        if (collapseTemporalMatcher.find()) {
            return executeCollapseTemporalStates(hero, game, variables);
        }
        
        // REVERSE_TIME_IF_AHEAD(hero, days)
        Matcher reverseTimeMatcher = REVERSE_TIME_PATTERN.matcher(operation);
        if (reverseTimeMatcher.find()) {
            String heroName = reverseTimeMatcher.group(1);
            int days = Integer.parseInt(reverseTimeMatcher.group(2));
            
            if (heroName.equals(hero.getName()) || heroName.equals("hero")) {
                return executeReverseTimeIfAhead(hero, game, days);
            }
        }
        
        // TELEPORT_BY_PROBABILITY(hero, amplitude)
        Matcher teleportProbMatcher = TELEPORT_BY_PROBABILITY_PATTERN.matcher(operation);
        if (teleportProbMatcher.find()) {
            String heroParam = teleportProbMatcher.group(1);
            String amplitudeVar = teleportProbMatcher.group(2);
            
            Hero targetHero = "hero".equals(heroParam) ? hero : null;
            ComplexAmplitude amplitude = null;
            if ("result".equals(amplitudeVar) && variables.containsKey("result")) {
                amplitude = (ComplexAmplitude) variables.get("result");
            }
            return executeTeleportByProbability(targetHero, game, amplitude);
        }
        
        // 🆕 CREATE_AMPLITUDE(real, imaginary)
        Matcher createAmplitudeMatcher = CREATE_AMPLITUDE_PATTERN.matcher(operation);
        if (createAmplitudeMatcher.find()) {
            String realStr = createAmplitudeMatcher.group(1);
            String imagStr = createAmplitudeMatcher.group(2);
            
            try {
                double real = Double.parseDouble(realStr);
                double imag = Double.parseDouble(imagStr);
                ComplexAmplitude amplitude = new ComplexAmplitude(real, imag);
                
                result.put("amplitude", amplitude);
                result.put("message", String.format("Amplitude créée: %s", amplitude.toString()));
                result.put("probability", amplitude.getProbability());
                
                // Stocker comme variable
                variables.put("amplitude", amplitude);
                
            } catch (NumberFormatException e) {
                result.put("error", "Format d'amplitude invalide: " + realStr + ", " + imagStr);
            }
            return result;
        }
        
        // 🆕 SET_AMPLITUDE(psi, real, imaginary)
        Matcher setAmplitudeMatcher = SET_AMPLITUDE_PATTERN.matcher(operation);
        if (setAmplitudeMatcher.find()) {
            String psiName = setAmplitudeMatcher.group(1);
            String realStr = setAmplitudeMatcher.group(2);
            String imagStr = setAmplitudeMatcher.group(3);
            
            PsiState psiState = (PsiState) variables.get(psiName);
            if (psiState != null) {
                try {
                    double real = Double.parseDouble(realStr);
                    double imag = Double.parseDouble(imagStr);
                    
                    psiState.enableComplexAmplitude();
                    psiState.setComplexAmplitude(real, imag);
                    psiStateRepository.save(psiState);
                    
                    result.put("message", String.format("Amplitude de %s définie: (%s, %si)", 
                        psiName, realStr, imagStr));
                    result.put("amplitude", psiState.getComplexAmplitude());
                    
                } catch (NumberFormatException e) {
                    result.put("error", "Format d'amplitude invalide");
                }
            } else {
                result.put("error", "État ψ non trouvé: " + psiName);
            }
            return result;
        }
        
        // 🆕 AMPLITUDE_FROM_FORMULA("formula")
        Matcher amplitudeFromFormulaMatcher = AMPLITUDE_FROM_FORMULA_PATTERN.matcher(operation);
        if (amplitudeFromFormulaMatcher.find()) {
            String amplitudeFormula = amplitudeFromFormulaMatcher.group(1);
            
            // Parser la formule d'amplitude (utilise le TemporalScriptParser)
            ComplexAmplitude parsedAmplitude = parseAmplitudeFormula(amplitudeFormula);
            
            if (parsedAmplitude != null) {
                result.put("amplitude", parsedAmplitude);
                result.put("message", "Amplitude parsée depuis formule: " + parsedAmplitude.toString());
                variables.put("amplitude", parsedAmplitude);
            } else {
                result.put("error", "Impossible de parser la formule d'amplitude: " + amplitudeFormula);
            }
            return result;
        }
        
        // 🆕 GROFI - Σ[expression] (Somme/Réduction)
        Matcher grofiSigmaMatcher = GROFI_SIGMA_PATTERN.matcher(operation);
        if (grofiSigmaMatcher.find()) {
            String expression = grofiSigmaMatcher.group(1);
            return executeGrofiSigma(expression, variables, hero, game);
        }
        
        // 🆕 GROFI - †[expression] (Mort/Renaissance)
        Matcher grofiDaggerMatcher = GROFI_DAGGER_PATTERN.matcher(operation);
        if (grofiDaggerMatcher.find()) {
            String expression = grofiDaggerMatcher.group(1);
            return executeGrofiDagger(expression, variables, hero, game);
        }
        
        // 🆕 GROFI - Ω[expression] (Finalité ultime)
        Matcher grofiOmegaMatcher = GROFI_OMEGA_PATTERN.matcher(operation);
        if (grofiOmegaMatcher.find()) {
            String expression = grofiOmegaMatcher.group(1);
            return executeGrofiOmega(expression, variables, hero, game);
        }
        
        // 🆕 GROFI - ↯[expression] (Chaos contrôlé)
        Matcher grofiChaosMatcher = GROFI_CHAOS_PATTERN.matcher(operation);
        if (grofiChaosMatcher.find()) {
            String expression = grofiChaosMatcher.group(1);
            return executeGrofiChaos(expression, variables, hero, game);
        }
        
        // CREATE_TEMPORAL_ECHO(hero)
        Matcher echoMatcher = CREATE_ECHO_PATTERN.matcher(operation);
        if (echoMatcher.find()) {
            String heroName = echoMatcher.group(1);
            
            if (heroName.equals(hero.getName()) || heroName.equals("hero")) {
                return executeCreateTemporalEcho(hero, game);
            }
        }
        
        // FORCE_COLLAPSE_ALL(hero, radius)
        Matcher forceCollapseMatcher = FORCE_COLLAPSE_PATTERN.matcher(operation);
        if (forceCollapseMatcher.find()) {
            String heroName = forceCollapseMatcher.group(1);
            int radius = Integer.parseInt(forceCollapseMatcher.group(2));
            
            if (heroName.equals(hero.getName()) || heroName.equals("hero")) {
                return executeForceCollapseAll(hero, game, radius);
            }
        }
        
        // Si aucun pattern ne match
        result.put("error", "Opération non reconnue: " + operation);
        return result;
    }
    
    /**
     * 🔍 Trouver les ψ-states proches du héros
     */
    private List<PsiState> findNearbyPsiStates(Hero hero, Game game, int radius) {
        List<PsiState> nearbyStates = new ArrayList<>();
        
        for (PsiState psi : game.getActivePsiStates()) {
            if (psi.getTargetX() != null && psi.getTargetY() != null && hero.getPositionX() != null && hero.getPositionY() != null) {
                int distance = Math.abs(psi.getTargetX() - hero.getPositionX()) + Math.abs(psi.getTargetY() - hero.getPositionY());
                if (distance <= radius) {
                    nearbyStates.add(psi);
                }
            }
        }
        
        // Trier par distance (les plus proches en premier)
        nearbyStates.sort((a, b) -> {
            if (hero.getPositionX() == null || hero.getPositionY() == null) return 0;
            int distA = Math.abs(a.getTargetX() - hero.getPositionX()) + Math.abs(a.getTargetY() - hero.getPositionY());
            int distB = Math.abs(b.getTargetX() - hero.getPositionX()) + Math.abs(b.getTargetY() - hero.getPositionY());
            return Integer.compare(distA, distB);
        });
        
        return nearbyStates;
    }
    
    // =========================================================================
    // 🚀 NOUVELLES OPÉRATIONS TEMPORELLES AVANCÉES
    // =========================================================================
    
    /**
     * 🌀 COLLAPSE_TEMPORAL_STATES() - Force le collapse de tous les ψ-states proches
     */
    private Map<String, Object> executeCollapseTemporalStates(Hero hero, Game game, Map<String, Object> variables) {
        Map<String, Object> result = new HashMap<>();
        
        List<PsiState> nearbyStates = findNearbyPsiStates(hero, game, 5);
        int collapsedCount = 0;
        
        for (PsiState psi : nearbyStates) {
            if (psi.isActive()) {
                psi.collapse();
                psiStateRepository.save(psi);
                collapsedCount++;
            }
        }
        
        result.put("operation", "COLLAPSE_TEMPORAL_STATES");
        result.put("psiStatesCollapsed", collapsedCount);
        result.put("radius", 5);
        result.put("message", "Effondrement forcé de " + collapsedCount + " ψ-states");
        
        return result;
    }
    
    /**
     * ⏰ REVERSE_TIME_IF_AHEAD(hero, days) - Voyage dans le temps si en avance
     */
    private Map<String, Object> executeReverseTimeIfAhead(Hero hero, Game game, int days) {
        Map<String, Object> result = new HashMap<>();
        
        // Simuler la vérification temporelle (le héros est-il "en avance" ?)
        int currentTurn = game.getCurrentTurn();
        boolean isAhead = currentTurn > 10; // Logique simple : si > 10 tours, il est "en avance"
        
        if (isAhead) {
            // Effet de voyage dans le temps - ramener le héros quelques cases en arrière
            int newX = Math.max(0, hero.getPositionX() - days * 2);  // 2 cases par jour
            int newY = Math.max(0, hero.getPositionY() - days * 2);
            
            hero.setPositionX(newX);
            hero.setPositionY(newY);
            
            // Restaurer un peu d'énergie temporelle (effet du voyage dans le temps)
            int energyRestored = days * 25;
            hero.setTemporalEnergy(Math.min(hero.getMaxTemporalEnergy(), 
                                          hero.getTemporalEnergy() + energyRestored));
            
            heroRepository.save(hero);
            
            result.put("operation", "REVERSE_TIME_IF_AHEAD");
            result.put("timeReversed", true);
            result.put("daysReversed", days);
            result.put("newPosition", newX + "," + newY);
            result.put("energyRestored", energyRestored);
            result.put("message", "Voyage dans le temps ! Retour de " + days + " jour(s)");
            
        } else {
            result.put("operation", "REVERSE_TIME_IF_AHEAD");
            result.put("timeReversed", false);
            result.put("message", "Héros pas en avance temporelle, pas de voyage dans le temps");
        }
        
        return result;
    }
    
    /**
     * 🎲 TELEPORT_BY_PROBABILITY(hero, amplitude) - Téléportation basée sur probabilité
     */
    private Map<String, Object> executeTeleportByProbability(Hero hero, Game game, ComplexAmplitude amplitude) {
        Map<String, Object> result = new HashMap<>();
        
        if (amplitude == null) {
            result.put("error", "Amplitude non disponible pour téléportation probabiliste");
            return result;
        }
        
        double probability = amplitude.getProbability();
        
        // Plus la probabilité est élevée, plus on téléporte loin
        int maxDistance = (int) Math.ceil(probability * 15); // Maximum 15 cases
        int actualDistance = Math.max(1, maxDistance);
        
        // Direction aléatoire
        double angle = Math.random() * 2 * Math.PI;
        int deltaX = (int) (actualDistance * Math.cos(angle));
        int deltaY = (int) (actualDistance * Math.sin(angle));
        
        int newX = Math.max(0, Math.min(game.getMapWidth() - 1, hero.getPositionX() + deltaX));
        int newY = Math.max(0, Math.min(game.getMapHeight() - 1, hero.getPositionY() + deltaY));
        
        hero.setPositionX(newX);
        hero.setPositionY(newY);
        heroRepository.save(hero);
        
        result.put("operation", "TELEPORT_BY_PROBABILITY");
        result.put("probability", probability);
        result.put("distance", actualDistance);
        result.put("newPosition", newX + "," + newY);
        result.put("message", "Téléportation probabiliste sur " + actualDistance + " cases");
        
        return result;
    }
    
    /**
     * 👻 CREATE_TEMPORAL_ECHO(hero) - Créer un écho temporel du héros
     */
    private Map<String, Object> executeCreateTemporalEcho(Hero hero, Game game) {
        Map<String, Object> result = new HashMap<>();
        
        // Créer un ψ-state spécial représentant l'écho temporel
        PsiState echo = new PsiState();
        echo.setPsiId("ψECHO_" + hero.getName() + "_" + System.currentTimeMillis());
        echo.setExpression("⊙(Δt+3 @" + hero.getPositionX() + "," + hero.getPositionY() + " ⟶ TEMPORAL_ECHO)");
        echo.setBranchId("ℬECHO");
        echo.setTargetX(hero.getPositionX());
        echo.setTargetY(hero.getPositionY());
        echo.setDeltaT(3); // L'écho apparaîtra dans 3 tours
        echo.setActionType("ECHO");
        echo.setOwnerHero(hero.getName());
        echo.setGame(game);
        
        // Amplitude complexe spéciale pour l'écho
        echo.setComplexAmplitude(0.7, 0.7); // |ψ|² = 0.98
        
        psiStateRepository.save(echo);
        
        // Coût en énergie pour créer l'écho
        int echoCost = 30;
        hero.setTemporalEnergy(hero.getTemporalEnergy() - echoCost);
        heroRepository.save(hero);
        
        result.put("operation", "CREATE_TEMPORAL_ECHO");
        result.put("echoId", echo.getPsiId());
        result.put("echoPosition", hero.getPositionX() + "," + hero.getPositionY());
        result.put("echoDelay", 3);
        result.put("energyCost", echoCost);
        result.put("message", "Écho temporel créé ! Apparaîtra dans 3 tours");
        
        return result;
    }
    
    /**
     * 💥 FORCE_COLLAPSE_ALL(hero, radius) - Force collapse dans un rayon
     */
    private Map<String, Object> executeForceCollapseAll(Hero hero, Game game, int radius) {
        Map<String, Object> result = new HashMap<>();
        
        List<PsiState> statesInRadius = findNearbyPsiStates(hero, game, radius);
        int collapsedCount = 0;
        double totalEnergyReleased = 0.0;
        
        for (PsiState psi : statesInRadius) {
            if (psi.isActive()) {
                // Calculer l'énergie libérée par le collapse
                double energy = psi.getEffectiveProbability() * 20; // 20 énergie max par ψ-state
                totalEnergyReleased += energy;
                
                psi.collapse();
                psiStateRepository.save(psi);
                collapsedCount++;
            }
        }
        
        result.put("operation", "FORCE_COLLAPSE_ALL");
        result.put("radius", radius);
        result.put("psiStatesCollapsed", collapsedCount);
        result.put("energyReleased", totalEnergyReleased);
        result.put("message", "Collapse forcé de " + collapsedCount + " ψ-states, énergie libérée: " + totalEnergyReleased);
        
        return result;
    }
    
    /**
     * ✅ Vérifier si une formule est valide (sans l'exécuter)
     */
    public boolean isValidFormula(String formula) {
        try {
            // Vérifications de base
            if (formula == null || formula.trim().isEmpty()) {
                return false;
            }
            
            // Vérifier que la formule contient au moins une opération reconnue
            return CONSTRUCTIVE_PATTERN.matcher(formula).find() ||
                   DESTRUCTIVE_PATTERN.matcher(formula).find() ||
                   AMPLIFY_PATTERN.matcher(formula).find() ||
                   PHASE_SHIFT_PATTERN.matcher(formula).find() ||
                   MODIFY_ENERGY_PATTERN.matcher(formula).find() ||
                   TELEPORT_PATTERN.matcher(formula).find() ||
                   CREATE_SUPERPOSITION_PATTERN.matcher(formula).find() ||
                   // 🚀 Nouvelles opérations temporelles avancées
                   COLLAPSE_TEMPORAL_PATTERN.matcher(formula).find() ||
                   REVERSE_TIME_PATTERN.matcher(formula).find() ||
                   TELEPORT_BY_PROBABILITY_PATTERN.matcher(formula).find() ||
                   CREATE_ECHO_PATTERN.matcher(formula).find() ||
                   FORCE_COLLAPSE_PATTERN.matcher(formula).find() ||
                   // 🆕 Nouvelles opérations d'amplitude
                   CREATE_AMPLITUDE_PATTERN.matcher(formula).find() ||
                   SET_AMPLITUDE_PATTERN.matcher(formula).find() ||
                   AMPLITUDE_FROM_FORMULA_PATTERN.matcher(formula).find() ||
                   // 🆕 Nouvelles opérations Grofi
                   GROFI_SIGMA_PATTERN.matcher(formula).find() ||
                   GROFI_DAGGER_PATTERN.matcher(formula).find() ||
                   GROFI_OMEGA_PATTERN.matcher(formula).find() ||
                   GROFI_CHAOS_PATTERN.matcher(formula).find();
                   
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * 📖 Obtenir la liste des opérations supportées
     */
    public List<String> getSupportedOperations() {
        return Arrays.asList(
            // Opérations de base
            "CONSTRUCTIVE(ψ1, ψ2) - Interférence constructive",
            "DESTRUCTIVE(ψ1, ψ2) - Interférence destructive", 
            "AMPLIFY(ψ, factor) - Amplification",
            "PHASE_SHIFT(ψ, angle) - Déphasage",
            "MODIFY_ENERGY(hero, amount) - Modifier l'énergie",
            "TELEPORT_HERO(hero, x, y) - Téléportation",
            "CREATE_SUPERPOSITION(x1, y1, x2, y2, p1, p2) - Créer superposition",
            // 🚀 Opérations temporelles avancées
            "COLLAPSE_TEMPORAL_STATES() - Force collapse de tous les ψ-states proches",
            "REVERSE_TIME_IF_AHEAD(hero, days) - Voyage dans le temps si en avance",
            "TELEPORT_BY_PROBABILITY(hero, amplitude) - Téléportation basée sur probabilité", 
            "CREATE_TEMPORAL_ECHO(hero) - Créer un écho temporel du héros",
            "FORCE_COLLAPSE_ALL(hero, radius) - Force collapse dans un rayon donné",
            // 🆕 Opérations d'amplitude
            "CREATE_AMPLITUDE(name, amplitude) - Créer une amplitude complexe",
            "SET_AMPLITUDE(psi, real, imag) - Définir l'amplitude d'un ψ-state",
            "AMPLITUDE_FROM_FORMULA(formula) - Utiliser l'amplitude d'une formule",
            // 🆕 Opérations Grofi
            "Σ[expression] - Grofi Sigma",
            "†[expression] - Grofi Dagger",
            "Ω[expression] - Grofi Omega",
            "↯[expression] - Grofi Chaos"
        );
    }

    /**
     * 🌀 Parser une formule d'amplitude (utilise TemporalScriptParser)
     */
    private ComplexAmplitude parseAmplitudeFormula(String formula) {
        // RÉUTILISER la logique existante du TemporalScriptParser !
        return temporalScriptParser.parseComplexAmplitude(formula);
    }
    
    /**
     * 🆕 GROFI - Σ : Somme des possibles / Réduction
     */
    private Map<String, Object> executeGrofiSigma(String expression, Map<String, Object> variables, Hero hero, Game game) {
        Map<String, Object> result = new HashMap<>();
        
        // Parser l'expression pour extraire le facteur de réduction
        Pattern reductionPattern = Pattern.compile("REDUCE:(\\d*\\.?\\d+)");
        Matcher matcher = reductionPattern.matcher(expression);
        
        if (matcher.find()) {
            double reductionFactor = Double.parseDouble(matcher.group(1));
            
            // Réduire toutes les amplitudes des ψ-states proches
            List<PsiState> nearbyStates = findNearbyPsiStates(hero, game, 5);
            int reduced = 0;
            
            for (PsiState psi : nearbyStates) {
                if (psi.isUsingComplexAmplitude()) {
                    ComplexAmplitude current = psi.getComplexAmplitude();
                    ComplexAmplitude reduced_amp = current.multiply(1.0 - reductionFactor);
                    psi.setComplexAmplitude(reduced_amp);
                    psiStateRepository.save(psi);
                    reduced++;
                }
            }
            
            result.put("message", String.format("Σ - Réduction de %d états quantiques de %.0f%%", 
                reduced, reductionFactor * 100));
            result.put("statesReduced", reduced);
        } else {
            // Somme des amplitudes
            ComplexAmplitude sum = new ComplexAmplitude(0, 0);
            List<PsiState> nearbyStates = findNearbyPsiStates(hero, game, 5);
            
            for (PsiState psi : nearbyStates) {
                if (psi.isUsingComplexAmplitude()) {
                    sum = sum.add(psi.getComplexAmplitude());
                }
            }
            
            result.put("amplitude", sum);
            result.put("message", "Σ - Somme des possibles: " + sum.toString());
        }
        
        return result;
    }
    
    /**
     * 🆕 GROFI - † : Mort/Renaissance quantique
     */
    private Map<String, Object> executeGrofiDagger(String expression, Map<String, Object> variables, Hero hero, Game game) {
        Map<String, Object> result = new HashMap<>();
        
        // Si le héros est "mort" (health <= 0), le ressusciter
        if (hero.getHealth() <= 0) {
            hero.setHealth(hero.getMaxHealth() / 2);
            hero.setStatus(HeroStatus.ACTIVE);
            heroRepository.save(hero);
            
            result.put("message", "† - Renaissance quantique de " + hero.getName());
            result.put("newHealth", hero.getHealth());
        } else {
            // Créer un état quantique de "mort potentielle"
            PsiState deathState = new PsiState();
            deathState.setPsiId("ψ†" + System.currentTimeMillis());
            deathState.setExpression("† - État de mort/vie superposé");
            deathState.setOwnerHero(hero.getName());
            deathState.setTargetX(hero.getPositionX());
            deathState.setTargetY(hero.getPositionY());
            deathState.setComplexAmplitude(0.707, 0.707); // 50/50 mort/vie
            deathState.setUseComplexAmplitude(true);
            deathState.setGame(game);
            
            psiStateRepository.save(deathState);
            game.addPsiState(deathState);
            
            result.put("message", "† - État de mort/vie superposé créé");
            result.put("deathStateId", deathState.getPsiId());
        }
        
        return result;
    }
    
    /**
     * 🆕 GROFI - Ω : Finalité ultime / Collapse total
     */
    private Map<String, Object> executeGrofiOmega(String expression, Map<String, Object> variables, Hero hero, Game game) {
        Map<String, Object> result = new HashMap<>();
        
        // Forcer le collapse de TOUS les états quantiques
        List<PsiState> allActiveStates = game.getActivePsiStates();
        int collapsed = 0;
        
        for (PsiState psi : allActiveStates) {
            psi.collapse();
            psiStateRepository.save(psi);
            collapsed++;
        }
        
        // Verrouiller toutes les tuiles temporellement
        for (GameTile tile : game.getTiles()) {
            if (tile.getHasPsiStates()) {
                tile.setIsLocked(true);
                tile.setLockDuration(5); // 5 tours
                gameTileRepository.save(tile);
            }
        }
        
        result.put("message", "Ω - Finalité ultime: " + collapsed + " états effondrés");
        result.put("statesCollapsed", collapsed);
        result.put("tilesLocked", true);
        
        return result;
    }
    
    /**
     * 🆕 GROFI - ↯ : Chaos contrôlé / Effet aléatoire
     */
    private Map<String, Object> executeGrofiChaos(String expression, Map<String, Object> variables, Hero hero, Game game) {
        Map<String, Object> result = new HashMap<>();
        Random random = new Random();
        
        // Choisir un effet aléatoire
        int effect = random.nextInt(4);
        
        switch (effect) {
            case 0:
                // Téléportation aléatoire
                int newX = random.nextInt(game.getMapWidth());
                int newY = random.nextInt(game.getMapHeight());
                hero.moveTo(newX, newY);
                heroRepository.save(hero);
                result.put("message", String.format("↯ - Chaos: Téléportation vers (%d,%d)", newX, newY));
                break;
                
            case 1:
                // Inversion d'amplitude d'un état quantique aléatoire
                List<PsiState> states = findNearbyPsiStates(hero, game, 10);
                if (!states.isEmpty()) {
                    PsiState randomState = states.get(random.nextInt(states.size()));
                    if (randomState.isUsingComplexAmplitude()) {
                        ComplexAmplitude current = randomState.getComplexAmplitude();
                        randomState.setComplexAmplitude(-current.getRealPart(), -current.getImaginaryPart());
                        psiStateRepository.save(randomState);
                        result.put("message", "↯ - Chaos: Inversion d'amplitude de " + randomState.getPsiId());
                    }
                }
                break;
                
            case 2:
                // Changement aléatoire d'énergie temporelle
                int energyChange = random.nextInt(41) - 20; // -20 à +20
                hero.modifyTemporalEnergy(energyChange);
                heroRepository.save(hero);
                result.put("message", "↯ - Chaos: Énergie " + (energyChange >= 0 ? "+" : "") + energyChange);
                break;
                
            case 3:
                // Création d'un état quantique chaotique
                PsiState chaosState = new PsiState();
                chaosState.setPsiId("ψ↯" + System.currentTimeMillis());
                chaosState.setExpression("↯ - État chaotique");
                chaosState.setOwnerHero(hero.getName());
                chaosState.setTargetX(hero.getPositionX() + random.nextInt(5) - 2);
                chaosState.setTargetY(hero.getPositionY() + random.nextInt(5) - 2);
                
                // Amplitude aléatoire
                double realPart = random.nextDouble() * 2 - 1;
                double imagPart = random.nextDouble() * 2 - 1;
                chaosState.setComplexAmplitude(realPart, imagPart);
                chaosState.setUseComplexAmplitude(true);
                chaosState.setGame(game);
                
                psiStateRepository.save(chaosState);
                game.addPsiState(chaosState);
                
                result.put("message", "↯ - Chaos: État quantique chaotique créé");
                break;
        }
        
        result.put("chaosType", effect);
        return result;
    }
} 