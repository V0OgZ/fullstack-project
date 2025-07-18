package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.PsiState;
import org.junit.jupiter.api.Test;

public class ParserDebugTest {
    
    @Test
    public void debugRegexParser() {
        RegexTemporalScriptParser parser = new RegexTemporalScriptParser();
        
        String script = "ψ1: ⊙(MOV(Arthur, @10,15))";
        System.out.println("DEBUG: Parsing script: " + script);
        
        PsiState result = parser.parseTemporalScript(script);
        
        if (result != null) {
            System.out.println("DEBUG: PSI ID: " + result.getPsiId());
            System.out.println("DEBUG: Owner Hero: " + result.getOwnerHero());
            System.out.println("DEBUG: Target X: " + result.getTargetX());
            System.out.println("DEBUG: Target Y: " + result.getTargetY());
            System.out.println("DEBUG: Action Type: " + result.getActionType());
            System.out.println("DEBUG: Expression: " + result.getExpression());
        } else {
            System.out.println("DEBUG: Result is null!");
        }
    }
    
    @Test
    public void debugLispParser() {
        LispTemporalScriptParser parser = new LispTemporalScriptParser();
        
        String script = "(PSI psi4 (MOV Arthur @5,5) (PROB 0.7))";
        System.out.println("DEBUG: Parsing script: " + script);
        
        // Test if it's detected as temporal script
        boolean isTemporalScript = parser.isTemporalScript(script);
        System.out.println("DEBUG: Is temporal script: " + isTemporalScript);
        
        try {
            PsiState result = parser.parseTemporalScript(script);
            
            if (result != null) {
                System.out.println("DEBUG: PSI ID: " + result.getPsiId());
                System.out.println("DEBUG: Owner Hero: " + result.getOwnerHero());
                System.out.println("DEBUG: Target X: " + result.getTargetX());
                System.out.println("DEBUG: Target Y: " + result.getTargetY());
                System.out.println("DEBUG: Action Type: " + result.getActionType());
                System.out.println("DEBUG: Probability: " + result.getProbability());
                System.out.println("DEBUG: Expression: " + result.getExpression());
            } else {
                System.out.println("DEBUG: Result is null!");
            }
        } catch (Exception e) {
            System.out.println("DEBUG: Exception: " + e.getMessage());
            e.printStackTrace();
        }
    }
} 