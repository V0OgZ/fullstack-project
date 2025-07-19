package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.PsiState;
import com.heroesoftimepoc.temporalengine.model.ComplexAmplitude;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Service pour interpréter les formules HOTS et quantiques en langage naturel
 * 
 * Ce service traduit les expressions temporelles complexes en descriptions
 * compréhensibles pour les interfaces utilisateur et les tooltips.
 */
@Service
public class FormulaInterpreterService {
    
    @Autowired
    private TemporalScriptParser temporalParser;
    
    // Patterns pour extraire les éléments des formules
    private static final Pattern PSI_PATTERN = Pattern.compile("ψ(\\d+)");
    private static final Pattern DELTA_T_PATTERN = Pattern.compile("Δt([+-]\\d+)");
    private static final Pattern POSITION_PATTERN = Pattern.compile("@(\\d+),(\\d+)");
    private static final Pattern AMPLITUDE_PATTERN = Pattern.compile("\\(([^)]+)\\)");
    private static final Pattern ACTION_PATTERN = Pattern.compile("(\\w+)\\(([^)]+)\\)");
    private static final Pattern COLLAPSE_PATTERN = Pattern.compile("†ψ(\\d+)");
    private static final Pattern OBSERVATION_PATTERN = Pattern.compile("Π\\(([^)]+)\\)\\s*⇒\\s*†ψ(\\d+)");
    
    /**
     * Interpréter une formule HOTS complète en langage naturel
     */
    public Map<String, Object> interpretFormula(String formula) {
        Map<String, Object> interpretation = new HashMap<>();
        
        try {
            // Détecter le type de formule
            String formulaType = detectFormulaType(formula);
            interpretation.put("type", formulaType);
            
            switch (formulaType) {
                case "quantum_state":
                    interpretation.putAll(interpretQuantumState(formula));
                    break;
                case "collapse":
                    interpretation.putAll(interpretCollapse(formula));
                    break;
                case "observation":
                    interpretation.putAll(interpretObservation(formula));
                    break;
                case "classic_action":
                    interpretation.putAll(interpretClassicAction(formula));
                    break;
                default:
                    interpretation.put("description", "Unknown formula type");
                    interpretation.put("symbols", extractSymbols(formula));
            }
            
            interpretation.put("success", true);
            
        } catch (Exception e) {
            interpretation.put("success", false);
            interpretation.put("error", e.getMessage());
            interpretation.put("raw_formula", formula);
        }
        
        return interpretation;
    }
    
    /**
     * Détecter le type de formule
     */
    private String detectFormulaType(String formula) {
        if (formula.contains("ψ") && formula.contains("⊙")) {
            return "quantum_state";
        } else if (formula.contains("†ψ")) {
            return "collapse";
        } else if (formula.contains("Π(") && formula.contains("⇒")) {
            return "observation";
        } else if (containsClassicAction(formula)) {
            return "classic_action";
        }
        return "unknown";
    }
    
    /**
     * Interpréter un état quantique ψ
     */
    private Map<String, Object> interpretQuantumState(String formula) {
        Map<String, Object> result = new HashMap<>();
        
        // Parser avec le service existant
        PsiState psiState = temporalParser.parseTemporalScript(formula);
        
        if (psiState != null) {
            StringBuilder description = new StringBuilder();
            
            // Description de l'état quantique
            description.append("Quantum state ").append(psiState.getPsiId());
            
            // Amplitude complexe
            if (psiState.isUsingComplexAmplitude()) {
                ComplexAmplitude amplitude = psiState.getComplexAmplitude();
                description.append(" with complex amplitude ")
                          .append(formatComplexAmplitude(amplitude));
                
                double probability = amplitude.getProbability();
                description.append(" (").append(String.format("%.1f%% probability", probability * 100)).append(")");
            }
            
            // Délai temporel
            if (psiState.getDeltaT() != null) {
                int deltaT = psiState.getDeltaT();
                if (deltaT > 0) {
                    description.append(" will activate in ").append(deltaT).append(" turn(s)");
                } else if (deltaT < 0) {
                    description.append(" activated ").append(Math.abs(deltaT)).append(" turn(s) ago");
                } else {
                    description.append(" activates immediately");
                }
            }
            
            // Position cible
            if (psiState.getTargetX() != null && psiState.getTargetY() != null) {
                description.append(" at position (")
                          .append(psiState.getTargetX()).append(",")
                          .append(psiState.getTargetY()).append(")");
            }
            
            // Action
            if (psiState.getActionType() != null) {
                description.append(": ").append(interpretAction(psiState.getActionType(), formula));
            }
            
            result.put("description", description.toString());
            result.put("psi_id", psiState.getPsiId());
            result.put("branch_id", psiState.getBranchId());
            result.put("delta_t", psiState.getDeltaT());
            result.put("position", Map.of("x", psiState.getTargetX(), "y", psiState.getTargetY()));
            result.put("action_type", psiState.getActionType());
            result.put("owner_hero", psiState.getOwnerHero());
            
            if (psiState.isUsingComplexAmplitude()) {
                result.put("amplitude", formatAmplitudeDetails(psiState.getComplexAmplitude()));
            }
        }
        
        return result;
    }
    
    /**
     * Interpréter un collapse †ψ
     */
    private Map<String, Object> interpretCollapse(String formula) {
        Map<String, Object> result = new HashMap<>();
        
        Matcher collapseMatcher = COLLAPSE_PATTERN.matcher(formula);
        if (collapseMatcher.find()) {
            String psiId = collapseMatcher.group(1);
            
            result.put("description", "Collapse quantum state ψ" + psiId + " into classical reality");
            result.put("psi_id", "ψ" + psiId);
            result.put("effect", "Forces the quantum superposition to resolve into a definite state");
            result.put("symbol_meaning", Map.of(
                "†", "Collapse operator - forces quantum decoherence",
                "ψ" + psiId, "Target quantum state identifier"
            ));
        }
        
        return result;
    }
    
    /**
     * Interpréter une observation Π
     */
    private Map<String, Object> interpretObservation(String formula) {
        Map<String, Object> result = new HashMap<>();
        
        Matcher observationMatcher = OBSERVATION_PATTERN.matcher(formula);
        if (observationMatcher.find()) {
            String condition = observationMatcher.group(1);
            String targetPsiId = observationMatcher.group(2);
            
            result.put("description", "If " + interpretCondition(condition) + 
                      ", then collapse quantum state ψ" + targetPsiId);
            result.put("condition", condition);
            result.put("condition_interpreted", interpretCondition(condition));
            result.put("target_psi_id", "ψ" + targetPsiId);
            result.put("effect", "Conditional quantum collapse based on observation");
            result.put("symbol_meaning", Map.of(
                "Π", "Observation operator - measurement trigger",
                "⇒", "Implication - 'then' logical operator",
                "†", "Collapse operator"
            ));
        }
        
        return result;
    }
    
    /**
     * Interpréter une action classique
     */
    private Map<String, Object> interpretClassicAction(String formula) {
        Map<String, Object> result = new HashMap<>();
        
        Matcher actionMatcher = ACTION_PATTERN.matcher(formula);
        if (actionMatcher.find()) {
            String actionType = actionMatcher.group(1);
            String params = actionMatcher.group(2);
            
            result.put("description", interpretAction(actionType, formula));
            result.put("action_type", actionType);
            result.put("parameters", params);
            result.put("effect", getActionEffect(actionType));
        }
        
        return result;
    }
    
    /**
     * Interpréter une action spécifique
     */
    private String interpretAction(String actionType, String fullFormula) {
        switch (actionType.toUpperCase()) {
            case "MOV":
                return interpretMovement(fullFormula);
            case "CREATE":
                return interpretCreation(fullFormula);
            case "BATTLE":
                return interpretBattle(fullFormula);
            case "USE":
                return interpretUse(fullFormula);
            case "BUILD":
                return interpretBuild(fullFormula);
            case "CAST":
                return interpretCast(fullFormula);
            case "EQUIP":
                return interpretEquip(fullFormula);
            default:
                return "Execute " + actionType.toLowerCase() + " action";
        }
    }
    
    /**
     * Interpréter un mouvement
     */
    private String interpretMovement(String formula) {
        Pattern movPattern = Pattern.compile("MOV\\(([^,]+),\\s*@(\\d+),(\\d+)\\)");
        Matcher matcher = movPattern.matcher(formula);
        
        if (matcher.find()) {
            String hero = matcher.group(1).trim();
            String x = matcher.group(2);
            String y = matcher.group(3);
            
            return hero + " moves to position (" + x + "," + y + ")";
        }
        
        return "Hero movement";
    }
    
    /**
     * Interpréter une création
     */
    private String interpretCreation(String formula) {
        Pattern createPattern = Pattern.compile("CREATE\\(([^,]+),\\s*([^,)]+)");
        Matcher matcher = createPattern.matcher(formula);
        
        if (matcher.find()) {
            String type = matcher.group(1).trim();
            String name = matcher.group(2).trim();
            
            return "Create " + type.toLowerCase() + " '" + name + "'";
        }
        
        return "Create entity";
    }
    
    /**
     * Interpréter un combat
     */
    private String interpretBattle(String formula) {
        Pattern battlePattern = Pattern.compile("BATTLE\\(([^,]+),\\s*([^)]+)\\)");
        Matcher matcher = battlePattern.matcher(formula);
        
        if (matcher.find()) {
            String attacker = matcher.group(1).trim();
            String defender = matcher.group(2).trim();
            
            return attacker + " battles " + defender;
        }
        
        return "Combat engagement";
    }
    
    /**
     * Interpréter une utilisation d'objet
     */
    private String interpretUse(String formula) {
        Pattern usePattern = Pattern.compile("USE\\(([^,]+),\\s*([^,]+)(?:,\\s*([^)]+))?\\)");
        Matcher matcher = usePattern.matcher(formula);
        
        if (matcher.find()) {
            String type = matcher.group(1).trim();
            String item = matcher.group(2).trim();
            String target = matcher.group(3);
            
            StringBuilder desc = new StringBuilder("Use ");
            desc.append(type.toLowerCase()).append(" '").append(item).append("'");
            
            if (target != null) {
                desc.append(" on ").append(target.trim());
            }
            
            return desc.toString();
        }
        
        return "Use item";
    }
    
    /**
     * Interpréter une construction
     */
    private String interpretBuild(String formula) {
        return "Build structure";
    }
    
    /**
     * Interpréter un sort
     */
    private String interpretCast(String formula) {
        return "Cast spell";
    }
    
    /**
     * Interpréter un équipement
     */
    private String interpretEquip(String formula) {
        return "Equip artifact";
    }
    
    /**
     * Interpréter une condition
     */
    private String interpretCondition(String condition) {
        // Interpréter des conditions simples
        if (condition.contains("health >")) {
            return condition.replace(".", "'s ") + " health";
        } else if (condition.contains("position ==")) {
            return "hero reaches specific position";
        } else if (condition.contains("turn >=")) {
            return "specific turn is reached";
        }
        
        return condition;
    }
    
    /**
     * Formater une amplitude complexe
     */
    private String formatComplexAmplitude(ComplexAmplitude amplitude) {
        if (amplitude.getImaginaryPart() == 0) {
            return String.format("%.3f", amplitude.getRealPart());
        } else if (amplitude.getRealPart() == 0) {
            return String.format("%.3fi", amplitude.getImaginaryPart());
        } else {
            return String.format("%.3f%+.3fi", amplitude.getRealPart(), amplitude.getImaginaryPart());
        }
    }
    
    /**
     * Détails de l'amplitude
     */
    private Map<String, Object> formatAmplitudeDetails(ComplexAmplitude amplitude) {
        Map<String, Object> details = new HashMap<>();
        details.put("real", amplitude.getRealPart());
        details.put("imaginary", amplitude.getImaginaryPart());
        details.put("magnitude", amplitude.getMagnitude());
        details.put("phase", amplitude.getPhase());
        details.put("probability", amplitude.getProbability());
        details.put("formatted", formatComplexAmplitude(amplitude));
        return details;
    }
    
    /**
     * Extraire tous les symboles d'une formule
     */
    private Map<String, String> extractSymbols(String formula) {
        Map<String, String> symbols = new HashMap<>();
        
        if (formula.contains("ψ")) symbols.put("ψ", "Quantum state identifier");
        if (formula.contains("⊙")) symbols.put("⊙", "Observation envelope");
        if (formula.contains("Δt")) symbols.put("Δt", "Temporal delay");
        if (formula.contains("@")) symbols.put("@", "Position coordinates");
        if (formula.contains("⟶")) symbols.put("⟶", "Transition arrow");
        if (formula.contains("†")) symbols.put("†", "Collapse operator");
        if (formula.contains("Π")) symbols.put("Π", "Observation condition");
        if (formula.contains("⇒")) symbols.put("⇒", "Logical implication");
        if (formula.contains("ℬ")) symbols.put("ℬ", "Timeline branch");
        
        return symbols;
    }
    
    /**
     * Vérifier si contient une action classique
     */
    private boolean containsClassicAction(String formula) {
        return formula.matches(".*\\b(MOV|CREATE|BATTLE|USE|BUILD|CAST|EQUIP|HERO)\\s*\\(.*");
    }
    
    /**
     * Obtenir l'effet d'une action
     */
    private String getActionEffect(String actionType) {
        switch (actionType.toUpperCase()) {
            case "MOV": return "Changes hero position on the map";
            case "CREATE": return "Spawns new entity in the game world";
            case "BATTLE": return "Initiates combat between entities";
            case "USE": return "Activates item or artifact effect";
            case "BUILD": return "Constructs building or structure";
            case "CAST": return "Casts magical spell";
            case "EQUIP": return "Equips artifact to hero";
            default: return "Executes game action";
        }
    }
    
    /**
     * Interpréter une liste de formules
     */
    public Map<String, Object> interpretMultipleFormulas(String[] formulas) {
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> interpretations = new HashMap<>();
        
        for (int i = 0; i < formulas.length; i++) {
            String formula = formulas[i].trim();
            if (!formula.isEmpty()) {
                interpretations.put("formula_" + (i + 1), interpretFormula(formula));
            }
        }
        
        result.put("interpretations", interpretations);
        result.put("total_formulas", formulas.length);
        result.put("success", true);
        
        return result;
    }
} 