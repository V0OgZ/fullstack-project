package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.PsiState;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class TemporalScriptParser {
    
    // Regex patterns for parsing temporal script language
    private static final Pattern PSI_PATTERN = Pattern.compile("ψ(\\d+):\\s*⊙\\((.*?)\\)");
    private static final Pattern DELTA_T_PATTERN = Pattern.compile("Δt([+-]\\d+)");
    private static final Pattern POSITION_PATTERN = Pattern.compile("@(\\d+),(\\d+)");
    private static final Pattern ACTION_PATTERN = Pattern.compile("(\\w+)\\(([^)]+)\\)");
    private static final Pattern COLLAPSE_PATTERN = Pattern.compile("†ψ(\\d+)");
    private static final Pattern OBSERVATION_PATTERN = Pattern.compile("Π\\(([^)]+)\\)\\s*⇒\\s*†ψ(\\d+)");
    private static final Pattern BRANCH_PATTERN = Pattern.compile("ℬ(\\d+)");
    
    // Basic script patterns
    private static final Pattern HERO_PATTERN = Pattern.compile("HERO\\(([^)]+)\\)");
    private static final Pattern MOV_PATTERN = Pattern.compile("MOV\\(([^,]+),\\s*@(\\d+),(\\d+)\\)");
    private static final Pattern CREATE_PATTERN = Pattern.compile("CREATE\\(([^,]+),\\s*([^,]+)(?:,\\s*@(\\d+),(\\d+))?\\)");
    private static final Pattern USE_PATTERN = Pattern.compile("USE\\(([^,]+),\\s*([^,]+)(?:,\\s*([^)]+))?\\)");
    private static final Pattern BATTLE_PATTERN = Pattern.compile("BATTLE\\(([^,]+),\\s*([^)]+)\\)");
    
    /**
     * Parse a temporal script line and create a PsiState if it's a temporal action
     */
    public PsiState parseTemporalScript(String scriptLine) {
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
                // For MOV(Arthur, @11,11), extract Arthur as first parameter
                String[] params = actionParams.split(",");
                if (params.length > 0) {
                    psiState.setOwnerHero(params[0].trim());
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
                       COLLAPSE_PATTERN.matcher(scriptLine).find() || 
                       OBSERVATION_PATTERN.matcher(scriptLine).find();
            }
            return parseBasicScript(scriptLine) != null;
        } catch (Exception e) {
            return false;
        }
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