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
    
    // Patterns pour parser les formules
    private static final Pattern CONSTRUCTIVE_PATTERN = Pattern.compile("CONSTRUCTIVE\\((ψ\\d+|\\w+),\\s*(ψ\\d+|\\w+)\\)");
    private static final Pattern DESTRUCTIVE_PATTERN = Pattern.compile("DESTRUCTIVE\\((ψ\\d+|\\w+),\\s*(ψ\\d+|\\w+)\\)");
    private static final Pattern AMPLIFY_PATTERN = Pattern.compile("AMPLIFY\\((ψ\\d+|\\w+|result),\\s*(\\d*\\.?\\d+)\\)");
    private static final Pattern PHASE_SHIFT_PATTERN = Pattern.compile("PHASE_SHIFT\\((ψ\\d+|\\w+),\\s*([-+]?\\d*\\.?\\d+)\\)");
    private static final Pattern MODIFY_ENERGY_PATTERN = Pattern.compile("MODIFY_ENERGY\\((\\w+),\\s*([-+]?\\d+)\\)");
    private static final Pattern TELEPORT_PATTERN = Pattern.compile("TELEPORT_HERO\\((\\w+),\\s*(\\d+),\\s*(\\d+)\\)");
    private static final Pattern CREATE_SUPERPOSITION_PATTERN = Pattern.compile("CREATE_SUPERPOSITION\\((\\d+),\\s*(\\d+),\\s*(\\d+),\\s*(\\d+),\\s*(\\d*\\.?\\d+),\\s*(\\d*\\.?\\d+)\\)");
    
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
                   CREATE_SUPERPOSITION_PATTERN.matcher(formula).find();
                   
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * 📖 Obtenir la liste des opérations supportées
     */
    public List<String> getSupportedOperations() {
        return Arrays.asList(
            "CONSTRUCTIVE(ψ1, ψ2) - Interférence constructive",
            "DESTRUCTIVE(ψ1, ψ2) - Interférence destructive", 
            "AMPLIFY(ψ, factor) - Amplification",
            "PHASE_SHIFT(ψ, angle) - Déphasage",
            "MODIFY_ENERGY(hero, amount) - Modifier l'énergie",
            "TELEPORT_HERO(hero, x, y) - Téléportation",
            "CREATE_SUPERPOSITION(x1, y1, x2, y2, p1, p2) - Créer superposition"
        );
    }
} 