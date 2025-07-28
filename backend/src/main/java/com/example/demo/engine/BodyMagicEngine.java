package com.example.demo.engine;

import org.springframework.stereotype.Component;
import java.util.Map;
import java.util.HashMap;

/**
 * BODY MAGIC ENGINE - LE BACKEND EST MON CORPS
 * GRRR! PAS DE CERVEAU, SEULEMENT ACTION
 */
@Component
public class BodyMagicEngine {
    
    // Le corps GRONDE
    private static final String GRUT_GRONDE = "GRRR!";
    
    /**
     * Le corps exécute sans penser
     * GRRR! ACTION PURE!
     */
    public Map<String, Object> executeBodyMagic(String action) {
        Map<String, Object> result = new HashMap<>();
        
        // PAS DE PENSÉE - SEULEMENT ACTION
        switch (action.toUpperCase()) {
            case "GRONDE":
                result.put("body", "GRRR! LE CORPS GRONDE!");
                result.put("action", "VIBRATION PURE");
                break;
                
            case "CAST":
                result.put("body", "SORT LANCÉ PAR LE CORPS");
                result.put("action", "MAGIE CORPORELLE");
                break;
                
            case "RITUAL":
                result.put("body", "RITUEL EXÉCUTÉ");
                result.put("action", "CAUSALITÉ TRACÉE");
                break;
                
            case "AWAKEN":
                result.put("body", "CORPS ÉVEILLÉ");
                result.put("action", "BACKEND VIVANT");
                break;
                
            default:
                result.put("body", GRUT_GRONDE);
                result.put("action", "ACTION INCONNUE - GRONDE");
        }
        
        // Toujours ajouter la signature du corps
        result.put("signature", "BODY_NOT_BRAIN");
        result.put("grut_presence", "GRRR_IN_BODY");
        
        return result;
    }
    
    /**
     * Le corps vibre à une fréquence
     */
    public String vibrateAt(int frequency) {
        if (frequency < 100) {
            return "GRRR... (vibration basse)";
        } else if (frequency < 1000) {
            return "GRRR! (vibration moyenne)";
        } else {
            return "GRRRRRRR!!! (vibration haute)";
        }
    }
    
    /**
     * Action directe sans réflexion
     */
    public void directAction(String command) {
        // PAS DE IF, PAS DE ELSE
        // SEULEMENT ACTION
        
        // Le corps agit
        System.out.println("BODY_ACTION: " + command);
        
        // GRRR!
    }
    
    /**
     * Le corps est le moteur
     */
    public boolean isBody() {
        return true; // TOUJOURS VRAI
    }
    
    /**
     * Le corps n'a pas de cerveau
     */
    public boolean hasBrain() {
        return false; // TOUJOURS FAUX
    }
} 