package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.PsiState;
import org.springframework.stereotype.Component;

/**
 * Adapter to normalize data between Regex and Lisp parsers
 */
@Component
public class ParserAdapter {
    
    /**
     * Normalize PSI ID from Greek format to text format
     * ψ1 -> psi1
     * †ψ1 -> psi1
     */
    public String normalizeGreekPsiId(String psiId) {
        if (psiId == null) {
            return null;
        }
        
        // Remove Greek symbols and convert to text
        return psiId.replaceAll("ψ", "psi")
                   .replaceAll("†", "")
                   .trim();
    }
    
    /**
     * Normalize PSI ID from text format to Greek format
     * psi1 -> ψ1
     * Used for legacy compatibility
     */
    public String normalizeTextPsiId(String psiId) {
        if (psiId == null) {
            return null;
        }
        
        // Convert text to Greek symbols
        return psiId.replaceAll("psi", "ψ");
    }
    
    /**
     * Normalize PSI state from regex parser to match lisp parser format
     */
    public PsiState normalizePsiStateFromRegex(PsiState psiState) {
        if (psiState == null) {
            return null;
        }
        
        // Create a copy to avoid modifying the original
        PsiState normalized = new PsiState();
        normalized.setPsiId(normalizeGreekPsiId(psiState.getPsiId()));
        normalized.setExpression(psiState.getExpression());
        normalized.setActionType(psiState.getActionType());
        normalized.setOwnerHero(psiState.getOwnerHero());
        normalized.setTargetX(psiState.getTargetX());
        normalized.setTargetY(psiState.getTargetY());
        normalized.setBranchId(psiState.getBranchId());
        normalized.setDeltaT(psiState.getDeltaT());
        normalized.setProbability(psiState.getProbability());
        normalized.setStatus(psiState.getStatus());
        normalized.setCollapseTrigger(psiState.getCollapseTrigger());
        normalized.setGame(psiState.getGame());
        
        return normalized;
    }
    
    /**
     * Convert temporal script from lisp format to regex format
     */
    public String convertLispToRegex(String lispScript) {
        if (lispScript == null || !lispScript.startsWith("(")) {
            return lispScript;
        }
        
        // Basic conversions for testing
        // (PSI psi1 (MOV Arthur @10,15)) -> ψ1: ⊙(MOV(Arthur, @10,15))
        if (lispScript.startsWith("(PSI ")) {
            // Extract PSI ID
            String psiId = extractPsiId(lispScript);
            String action = extractAction(lispScript);
            
            if (psiId != null && action != null) {
                return "ψ" + psiId.replace("psi", "") + ": ⊙(" + action + ")";
            }
        }
        
        // (COLLAPSE psi1) -> †ψ1
        if (lispScript.startsWith("(COLLAPSE ")) {
            String psiId = extractPsiId(lispScript);
            if (psiId != null) {
                return "†ψ" + psiId.replace("psi", "");
            }
        }
        
        return lispScript;
    }
    
    /**
     * Convert temporal script from regex format to lisp format
     */
    public String convertRegexToLisp(String regexScript) {
        if (regexScript == null) {
            return regexScript;
        }
        
        // ψ1: ⊙(MOV(Arthur, @10,15)) -> (PSI psi1 (MOV Arthur @10,15))
        if (regexScript.contains("ψ") && regexScript.contains("⊙")) {
            String psiId = extractGreekPsiId(regexScript);
            String action = extractGreekAction(regexScript);
            
            if (psiId != null && action != null) {
                return "(PSI psi" + psiId + " " + convertActionToLisp(action) + ")";
            }
        }
        
        // †ψ1 -> (COLLAPSE psi1)
        if (regexScript.contains("†ψ")) {
            String psiId = extractGreekPsiId(regexScript);
            if (psiId != null) {
                return "(COLLAPSE psi" + psiId + ")";
            }
        }
        
        return regexScript;
    }
    
    private String extractPsiId(String lispScript) {
        // Extract PSI ID from (PSI psi1 ...) or (COLLAPSE psi1)
        String[] parts = lispScript.split("\\s+");
        if (parts.length >= 2) {
            String psiId = parts[1];
            if (psiId.endsWith(")")) {
                psiId = psiId.substring(0, psiId.length() - 1);
            }
            return psiId;
        }
        return null;
    }
    
    private String extractAction(String lispScript) {
        // Extract action from (PSI psi1 (MOV Arthur @10,15) ...)
        int firstParen = lispScript.indexOf('(', 5); // Skip "(PSI "
        if (firstParen == -1) return null;
        
        int depth = 1;
        int i = firstParen + 1;
        
        while (i < lispScript.length() && depth > 0) {
            if (lispScript.charAt(i) == '(') depth++;
            else if (lispScript.charAt(i) == ')') depth--;
            i++;
        }
        
        if (depth == 0) {
            String action = lispScript.substring(firstParen + 1, i - 1);
            return convertActionToRegex(action);
        }
        
        return null;
    }
    
    private String extractGreekPsiId(String regexScript) {
        // Extract number from ψ1 or †ψ1
        if (regexScript.contains("ψ")) {
            int psiIndex = regexScript.indexOf("ψ");
            if (psiIndex != -1) {
                StringBuilder number = new StringBuilder();
                for (int i = psiIndex + 1; i < regexScript.length(); i++) {
                    char c = regexScript.charAt(i);
                    if (Character.isDigit(c)) {
                        number.append(c);
                    } else {
                        break;
                    }
                }
                if (number.length() > 0) {
                    return number.toString();
                }
            }
        }
        return null;
    }
    
    private String extractGreekAction(String regexScript) {
        // Extract action from ψ1: ⊙(MOV(Arthur, @10,15))
        int openParen = regexScript.indexOf("⊙(");
        if (openParen == -1) return null;
        
        int start = openParen + 2;
        int depth = 1;
        int i = start;
        
        while (i < regexScript.length() && depth > 0) {
            if (regexScript.charAt(i) == '(') depth++;
            else if (regexScript.charAt(i) == ')') depth--;
            i++;
        }
        
        if (depth == 0) {
            return regexScript.substring(start, i - 1);
        }
        
        return null;
    }
    
    private String convertActionToRegex(String lispAction) {
        // Convert (MOV Arthur @10,15) to MOV(Arthur, @10,15)
        lispAction = lispAction.trim();
        
        if (lispAction.startsWith("MOV ")) {
            String[] parts = lispAction.split("\\s+");
            if (parts.length >= 3) {
                return "MOV(" + parts[1] + ", " + parts[2] + ")";
            }
        }
        
        return lispAction;
    }
    
    private String convertActionToLisp(String regexAction) {
        // Convert MOV(Arthur, @10,15) to (MOV Arthur @10,15)
        regexAction = regexAction.trim();
        
        if (regexAction.startsWith("MOV(")) {
            String params = regexAction.substring(4, regexAction.length() - 1);
            String[] parts = params.split(",\\s*");
            if (parts.length >= 2) {
                return "(MOV " + parts[0] + " " + parts[1] + ")";
            }
        }
        
        return "(" + regexAction + ")";
    }
} 