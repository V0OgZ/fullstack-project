package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.PsiState;
import com.heroesoftimepoc.temporalengine.model.ComplexAmplitude;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class TemporalScriptParser {
    
    // Regex patterns for parsing temporal script language
    private static final Pattern PSI_PATTERN = Pattern.compile("ψ(\\d+):\\s*⊙\\((.*)\\)");
    private static final Pattern DELTA_T_PATTERN = Pattern.compile("Δt([+-]\\d+)");
    private static final Pattern POSITION_PATTERN = Pattern.compile("@(\\d+),(\\d+)");
    private static final Pattern ACTION_PATTERN = Pattern.compile("(\\w+)\\(([^)]+)\\)");
    private static final Pattern COLLAPSE_PATTERN = Pattern.compile("†ψ(\\d+)");
    private static final Pattern OBSERVATION_PATTERN = Pattern.compile("Π\\(([^)]+)\\)\\s*⇒\\s*†ψ(\\d+)");
    private static final Pattern BRANCH_PATTERN = Pattern.compile("ℬ(\\d+)");
    
    // Patterns pour amplitudes complexes
    private static final Pattern COMPLEX_AMPLITUDE_PATTERN = Pattern.compile("([-+]?\\d*\\.?\\d+)\\s*([+-])\\s*(\\d*\\.?\\d+)i");
    private static final Pattern REAL_AMPLITUDE_PATTERN = Pattern.compile("([-+]?\\d*\\.?\\d+)(?!i)");
    private static final Pattern IMAGINARY_AMPLITUDE_PATTERN = Pattern.compile("([-+]?\\d*\\.?\\d+)i");
    private static final Pattern POLAR_AMPLITUDE_PATTERN = Pattern.compile("(\\d*\\.?\\d+)∠([-+]?\\d*\\.?\\d+)");
    
    // Pattern pour ψ avec amplitude complexe: ψ001: (0.8+0.6i) ⊙(...)
    private static final Pattern PSI_COMPLEX_PATTERN = Pattern.compile("ψ(\\d+):\\s*\\(([^)]+)\\)\\s*⊙\\((.*)\\)");
    
    // Basic script patterns
    private static final Pattern HERO_PATTERN = Pattern.compile("HERO\\(([^)]+)\\)");
    private static final Pattern MOV_PATTERN = Pattern.compile("MOV\\(([^,]+),\\s*@(\\d+),(\\d+)\\)");
    private static final Pattern CREATE_PATTERN = Pattern.compile("CREATE\\(([^,]+),\\s*([^,]+)(?:,\\s*@(\\d+),(\\d+))?\\)");
    private static final Pattern USE_PATTERN = Pattern.compile("USE\\(([^,]+),\\s*([^,]+)(?:,\\s*([^)]+))?\\)");
    private static final Pattern BATTLE_PATTERN = Pattern.compile("BATTLE\\(([^,]+),\\s*([^)]+)\\)");
    
    // Heroes of Might & Magic 3 patterns
    private static final Pattern BUILD_PATTERN = Pattern.compile("BUILD\\(([^,]+),\\s*([^,]+),\\s*@(\\d+),(\\d+),\\s*([^)]+)\\)");
    private static final Pattern COLLECT_PATTERN = Pattern.compile("COLLECT\\(([^,]+),\\s*(\\d+),\\s*PLAYER:([^)]+)\\)");
    private static final Pattern RECRUIT_PATTERN = Pattern.compile("RECRUIT\\(UNIT,\\s*([^,]+),\\s*(\\d+),\\s*HERO:([^)]+)\\)");
    private static final Pattern CAST_PATTERN = Pattern.compile("CAST\\(SPELL,\\s*([^,]+),\\s*TARGET:([^,]+),\\s*HERO:([^)]+)\\)");
    private static final Pattern LEARN_PATTERN = Pattern.compile("LEARN\\(SPELL,\\s*([^,]+),\\s*HERO:([^)]+)\\)");
    private static final Pattern LEVELUP_PATTERN = Pattern.compile("LEVELUP\\(([^,]+),\\s*SKILL:([^)]+)\\)");
    private static final Pattern EXPLORE_PATTERN = Pattern.compile("EXPLORE\\(([^,]+),\\s*@(\\d+),(\\d+),\\s*HERO:([^)]+)\\)");
    private static final Pattern EQUIP_PATTERN = Pattern.compile("EQUIP\\(ARTIFACT,\\s*([^,]+),\\s*HERO:([^)]+)\\)");
    // Alternative EQUIP pattern for test compatibility
    private static final Pattern EQUIP_PATTERN_ALT = Pattern.compile("EQUIP\\(([^,]+),\\s*([^)]+)\\)");
    private static final Pattern SIEGE_PATTERN = Pattern.compile("SIEGE\\(([^,]+),\\s*@(\\d+),(\\d+),\\s*HERO:([^)]+)\\)");
    private static final Pattern CAPTURE_PATTERN = Pattern.compile("CAPTURE\\(OBJECTIVE,\\s*([^,]+),\\s*HERO:([^)]+)\\)");
    
    /**
     * Parse a temporal script line and create a PsiState if it's a temporal action
     */
    public PsiState parseTemporalScript(String scriptLine) {
        // Essayer d'abord avec amplitude complexe
        Matcher complexPsiMatcher = PSI_COMPLEX_PATTERN.matcher(scriptLine);
        
        if (complexPsiMatcher.find()) {
            String psiId = "ψ" + complexPsiMatcher.group(1);
            String amplitudeStr = complexPsiMatcher.group(2);
            String innerExpression = complexPsiMatcher.group(3);
            
            PsiState psiState = new PsiState();
            psiState.setPsiId(psiId);
            psiState.setExpression(scriptLine);
            psiState.setBranchId("ℬ1"); // Default branch
            
            // Parser l'amplitude complexe
            ComplexAmplitude amplitude = parseComplexAmplitude(amplitudeStr);
            if (amplitude != null) {
                psiState.setComplexAmplitude(amplitude);
                psiState.setUseComplexAmplitude(true);
            }
            
            // Parse the inner expression
            parseInnerExpression(psiState, innerExpression);
            
            return psiState;
        }
        
        // Fallback vers le pattern classique
        Matcher psiMatcher = PSI_PATTERN.matcher(scriptLine);
        
        if (psiMatcher.find()) {
            String psiId = "ψ" + psiMatcher.group(1);
            String innerExpression = psiMatcher.group(2);
            
            PsiState psiState = new PsiState();
            psiState.setPsiId(psiId);
            psiState.setExpression(scriptLine);
            psiState.setBranchId("ℬ1"); // Default branch
            
            // Parse the inner expression
            parseInnerExpression(psiState, innerExpression);
            
            return psiState;
        }
        
        return null;
    }
    
    /**
     * Parse une amplitude complexe à partir d'une chaîne
     */
    public ComplexAmplitude parseComplexAmplitude(String amplitudeStr) {
        if (amplitudeStr == null || amplitudeStr.trim().isEmpty()) {
            return null;
        }
        
        amplitudeStr = amplitudeStr.trim();
        
        // Essayer le format polaire: 1.0∠0.5
        Matcher polarMatcher = POLAR_AMPLITUDE_PATTERN.matcher(amplitudeStr);
        if (polarMatcher.find()) {
            double magnitude = Double.parseDouble(polarMatcher.group(1));
            double phase = Double.parseDouble(polarMatcher.group(2));
            return ComplexAmplitude.fromPolar(magnitude, phase);
        }
        
        // Essayer le format complexe: 0.8+0.6i ou 0.8-0.6i
        Matcher complexMatcher = COMPLEX_AMPLITUDE_PATTERN.matcher(amplitudeStr);
        if (complexMatcher.find()) {
            double realPart = Double.parseDouble(complexMatcher.group(1));
            String sign = complexMatcher.group(2);
            double imaginaryPart = Double.parseDouble(complexMatcher.group(3));
            
            if ("-".equals(sign)) {
                imaginaryPart = -imaginaryPart;
            }
            
            return new ComplexAmplitude(realPart, imaginaryPart);
        }
        
        // Essayer le format imaginaire pur: 0.6i
        Matcher imaginaryMatcher = IMAGINARY_AMPLITUDE_PATTERN.matcher(amplitudeStr);
        if (imaginaryMatcher.find()) {
            double imaginaryPart = Double.parseDouble(imaginaryMatcher.group(1));
            return new ComplexAmplitude(0.0, imaginaryPart);
        }
        
        // Essayer le format réel: 0.8
        Matcher realMatcher = REAL_AMPLITUDE_PATTERN.matcher(amplitudeStr);
        if (realMatcher.find()) {
            double realPart = Double.parseDouble(realMatcher.group(1));
            return new ComplexAmplitude(realPart, 0.0);
        }
        
        // Format non reconnu
        return null;
    }
    
    /**
     * Parse the inner expression of a ψ state
     */
    private void parseInnerExpression(PsiState psiState, String innerExpression) {
        // Parse Δt
        Matcher deltaTMatcher = DELTA_T_PATTERN.matcher(innerExpression);
        if (deltaTMatcher.find()) {
            int deltaT = Integer.parseInt(deltaTMatcher.group(1));
            psiState.setDeltaT(deltaT);
        }
        
        // Parse position
        Matcher positionMatcher = POSITION_PATTERN.matcher(innerExpression);
        if (positionMatcher.find()) {
            int x = Integer.parseInt(positionMatcher.group(1));
            int y = Integer.parseInt(positionMatcher.group(2));
            psiState.setTargetX(x);
            psiState.setTargetY(y);
        }
        
        // Parse action after ⟶
        String[] parts = innerExpression.split("⟶");
        if (parts.length > 1) {
            String actionPart = parts[1].trim();
            parseAction(psiState, actionPart);
        }
    }
    
    /**
     * Parse an action and extract the action type
     */
    private void parseAction(PsiState psiState, String actionPart) {
        Matcher actionMatcher = ACTION_PATTERN.matcher(actionPart);
        if (actionMatcher.find()) {
            String actionType = actionMatcher.group(1);
            String actionParams = actionMatcher.group(2);
            
            psiState.setActionType(actionType);
            
            // Extract owner hero based on action type
            if ("MOV".equals(actionType)) {
                // For MOV(HERO, Arthur, @11,11) or MOV(Arthur, @11,11), extract hero name
                String[] params = actionParams.split(",");
                if (params.length > 0) {
                    String firstParam = params[0].trim();
                    if ("HERO".equals(firstParam) && params.length > 1) {
                        // Format: MOV(HERO, Arthur, @x,y)
                        psiState.setOwnerHero(params[1].trim());
                    } else {
                        // Format: MOV(Arthur, @x,y)
                        psiState.setOwnerHero(firstParam);
                    }
                }
            } else if (actionParams.contains("HERO")) {
                // For actions with explicit HERO keyword
                Matcher heroMatcher = HERO_PATTERN.matcher(actionParams);
                if (heroMatcher.find()) {
                    psiState.setOwnerHero(heroMatcher.group(1));
                }
            } else if ("CREATE".equals(actionType)) {
                // For CREATE(CREATURE, Dragon, @13,13), no specific hero
                psiState.setOwnerHero(null);
            }
        }
    }
    
    /**
     * Parse a basic script command (non-temporal)
     */
    public ScriptCommand parseBasicScript(String scriptLine) {
        scriptLine = scriptLine.trim();
        
        // HERO command
        Matcher heroMatcher = HERO_PATTERN.matcher(scriptLine);
        if (heroMatcher.find()) {
            return new ScriptCommand("HERO", heroMatcher.group(1));
        }
        
        // MOV command
        Matcher movMatcher = MOV_PATTERN.matcher(scriptLine);
        if (movMatcher.find()) {
            Map<String, String> params = new HashMap<>();
            params.put("hero", movMatcher.group(1));
            params.put("x", movMatcher.group(2));
            params.put("y", movMatcher.group(3));
            return new ScriptCommand("MOV", params);
        }
        
        // CREATE command
        Matcher createMatcher = CREATE_PATTERN.matcher(scriptLine);
        if (createMatcher.find()) {
            Map<String, String> params = new HashMap<>();
            params.put("type", createMatcher.group(1));
            params.put("name", createMatcher.group(2));
            if (createMatcher.group(3) != null) {
                params.put("x", createMatcher.group(3));
                params.put("y", createMatcher.group(4));
            }
            return new ScriptCommand("CREATE", params);
        }
        
        // USE command
        Matcher useMatcher = USE_PATTERN.matcher(scriptLine);
        if (useMatcher.find()) {
            Map<String, String> params = new HashMap<>();
            params.put("type", useMatcher.group(1));
            params.put("item", useMatcher.group(2));
            if (useMatcher.group(3) != null) {
                params.put("target", useMatcher.group(3));
            }
            return new ScriptCommand("USE", params);
        }
        
        // BATTLE command
        Matcher battleMatcher = BATTLE_PATTERN.matcher(scriptLine);
        if (battleMatcher.find()) {
            Map<String, String> params = new HashMap<>();
            params.put("attacker", battleMatcher.group(1));
            params.put("defender", battleMatcher.group(2));
            return new ScriptCommand("BATTLE", params);
        }
        
        // BUILD command
        Matcher buildMatcher = BUILD_PATTERN.matcher(scriptLine);
        if (buildMatcher.find()) {
            Map<String, String> params = new HashMap<>();
            // Nouveau format: BUILD(ANCHOR, RealityAnchor, @7,6, lysandrel)
            // buildMatcher.group(1) = ANCHOR (category)
            // buildMatcher.group(2) = RealityAnchor (type)
            // buildMatcher.group(3) = 7 (x)
            // buildMatcher.group(4) = 6 (y)
            // buildMatcher.group(5) = lysandrel (player)
            params.put("type", buildMatcher.group(2)); // Use RealityAnchor as type
            params.put("x", buildMatcher.group(3));
            params.put("y", buildMatcher.group(4));
            params.put("player", buildMatcher.group(5));
            return new ScriptCommand("BUILD", params);
        }
        
        // COLLECT command
        Matcher collectMatcher = COLLECT_PATTERN.matcher(scriptLine);
        if (collectMatcher.find()) {
            Map<String, String> params = new HashMap<>();
            params.put("resource", collectMatcher.group(1));
            params.put("amount", collectMatcher.group(2));
            params.put("player", collectMatcher.group(3));
            return new ScriptCommand("COLLECT", params);
        }
        
        // RECRUIT command
        Matcher recruitMatcher = RECRUIT_PATTERN.matcher(scriptLine);
        if (recruitMatcher.find()) {
            Map<String, String> params = new HashMap<>();
            params.put("unit", recruitMatcher.group(1));
            params.put("amount", recruitMatcher.group(2));
            params.put("hero", recruitMatcher.group(3));
            return new ScriptCommand("RECRUIT", params);
        }
        
        // CAST command
        Matcher castMatcher = CAST_PATTERN.matcher(scriptLine);
        if (castMatcher.find()) {
            Map<String, String> params = new HashMap<>();
            params.put("spell", castMatcher.group(1));
            params.put("target", castMatcher.group(2));
            params.put("hero", castMatcher.group(3));
            return new ScriptCommand("CAST", params);
        }
        
        // LEARN command
        Matcher learnMatcher = LEARN_PATTERN.matcher(scriptLine);
        if (learnMatcher.find()) {
            Map<String, String> params = new HashMap<>();
            params.put("spell", learnMatcher.group(1));
            params.put("hero", learnMatcher.group(2));
            return new ScriptCommand("LEARN", params);
        }
        
        // LEVELUP command
        Matcher levelupMatcher = LEVELUP_PATTERN.matcher(scriptLine);
        if (levelupMatcher.find()) {
            Map<String, String> params = new HashMap<>();
            params.put("hero", levelupMatcher.group(1));
            params.put("skill", levelupMatcher.group(2));
            return new ScriptCommand("LEVELUP", params);
        }
        
        // EXPLORE command
        Matcher exploreMatcher = EXPLORE_PATTERN.matcher(scriptLine);
        if (exploreMatcher.find()) {
            Map<String, String> params = new HashMap<>();
            params.put("terrain", exploreMatcher.group(1));
            params.put("x", exploreMatcher.group(2));
            params.put("y", exploreMatcher.group(3));
            params.put("hero", exploreMatcher.group(4));
            return new ScriptCommand("EXPLORE", params);
        }
        
        // EQUIP command
        Matcher equipMatcher = EQUIP_PATTERN.matcher(scriptLine);
        if (equipMatcher.find()) {
            Map<String, String> params = new HashMap<>();
            params.put("artifact", equipMatcher.group(1));
            params.put("hero", equipMatcher.group(2));
            return new ScriptCommand("EQUIP", params);
        }
        
        // Alternative EQUIP command format for test compatibility
        Matcher equipMatcherAlt = EQUIP_PATTERN_ALT.matcher(scriptLine);
        if (equipMatcherAlt.find()) {
            Map<String, String> params = new HashMap<>();
            params.put("hero", equipMatcherAlt.group(1));
            params.put("artifact", equipMatcherAlt.group(2));
            return new ScriptCommand("EQUIP", params);
        }
        
        // SIEGE command
        Matcher siegeMatcher = SIEGE_PATTERN.matcher(scriptLine);
        if (siegeMatcher.find()) {
            Map<String, String> params = new HashMap<>();
            params.put("target", siegeMatcher.group(1));
            params.put("x", siegeMatcher.group(2));
            params.put("y", siegeMatcher.group(3));
            params.put("hero", siegeMatcher.group(4));
            return new ScriptCommand("SIEGE", params);
        }
        
        // CAPTURE command
        Matcher captureMatcher = CAPTURE_PATTERN.matcher(scriptLine);
        if (captureMatcher.find()) {
            Map<String, String> params = new HashMap<>();
            params.put("objective", captureMatcher.group(1));
            params.put("hero", captureMatcher.group(2));
            return new ScriptCommand("CAPTURE", params);
        }
        
        return null;
    }
    
    /**
     * Parse a collapse command
     */
    public String parseCollapseCommand(String scriptLine) {
        Matcher collapseMatcher = COLLAPSE_PATTERN.matcher(scriptLine);
        if (collapseMatcher.find()) {
            return "ψ" + collapseMatcher.group(1);
        }
        return null;
    }
    
    /**
     * Parse an observation trigger
     */
    public ObservationTrigger parseObservationTrigger(String scriptLine) {
        Matcher observationMatcher = OBSERVATION_PATTERN.matcher(scriptLine);
        if (observationMatcher.find()) {
            String condition = observationMatcher.group(1);
            String targetPsi = "ψ" + observationMatcher.group(2);
            return new ObservationTrigger(condition, targetPsi);
        }
        return null;
    }
    
    /**
     * Check if a script line is a temporal command
     */
    public boolean isTemporalScript(String scriptLine) {
        return scriptLine.contains("ψ") || scriptLine.contains("⊙") || 
               scriptLine.contains("†") || scriptLine.contains("Π");
    }
    
    /**
     * Extract branch ID from script line
     */
    public String extractBranchId(String scriptLine) {
        Matcher branchMatcher = BRANCH_PATTERN.matcher(scriptLine);
        if (branchMatcher.find()) {
            return "ℬ" + branchMatcher.group(1);
        }
        return "ℬ1"; // Default branch
    }
    
    /**
     * Validate temporal script syntax
     */
    public boolean isValidTemporalScript(String scriptLine) {
        try {
            if (isTemporalScript(scriptLine)) {
                return PSI_PATTERN.matcher(scriptLine).find() || 
                       PSI_COMPLEX_PATTERN.matcher(scriptLine).find() ||
                       COLLAPSE_PATTERN.matcher(scriptLine).find() || 
                       OBSERVATION_PATTERN.matcher(scriptLine).find();
            }
            return parseBasicScript(scriptLine) != null;
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Teste si une chaîne contient une amplitude complexe
     */
    public boolean hasComplexAmplitude(String scriptLine) {
        return PSI_COMPLEX_PATTERN.matcher(scriptLine).find();
    }
    
    /**
     * Extrait l'amplitude complexe d'une ligne de script
     */
    public ComplexAmplitude extractComplexAmplitude(String scriptLine) {
        Matcher complexPsiMatcher = PSI_COMPLEX_PATTERN.matcher(scriptLine);
        if (complexPsiMatcher.find()) {
            String amplitudeStr = complexPsiMatcher.group(2);
            return parseComplexAmplitude(amplitudeStr);
        }
        return null;
    }
    
    // Helper classes
    public static class ScriptCommand {
        private final String type;
        private final Object parameters;
        
        public ScriptCommand(String type, Object parameters) {
            this.type = type;
            this.parameters = parameters;
        }
        
        public String getType() { return type; }
        public Object getParameters() { return parameters; }
        
        @Override
        public String toString() {
            return String.format("ScriptCommand{type='%s', params=%s}", type, parameters);
        }
    }
    
    public static class ObservationTrigger {
        private final String condition;
        private final String targetPsi;
        
        public ObservationTrigger(String condition, String targetPsi) {
            this.condition = condition;
            this.targetPsi = targetPsi;
        }
        
        public String getCondition() { return condition; }
        public String getTargetPsi() { return targetPsi; }
        
        @Override
        public String toString() {
            return String.format("ObservationTrigger{condition='%s', targetPsi='%s'}", condition, targetPsi);
        }
    }
}