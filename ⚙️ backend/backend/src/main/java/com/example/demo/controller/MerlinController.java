package com.example.demo.controller;

import com.example.demo.service.MerlinParadoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

/**
 * 🔮 MERLIN CONTROLLER - Interface REST pour l'Architecte du Temps
 * 
 * "Le futur ? Je l'ai déjà vécu. Trois fois."
 * 
 * Endpoints disponibles :
 * - POST /merlin/paradox-offensive : Active le Paradoxe Offensif
 * - POST /merlin/repair-grammar : Répare la Grammaire Temporelle
 * - POST /merlin/temporal-portal : Ouvre un Portail Temporel
 * - GET /merlin/prophecy : Révèle une Prophétie Quantique
 */
@RestController
@RequestMapping("/merlin")
@CrossOrigin(origins = "*")
public class MerlinController {
    
    @Autowired
    private MerlinParadoxService merlinService;
    
    /**
     * ⚡ PARADOXE OFFENSIF - Transforme les bugs en features
     * 
     * POST /merlin/paradox-offensive
     * Body: { "input": "système en erreur" }
     */
    @PostMapping("/paradox-offensive")
    public Map<String, Object> activateParadoxOffensive(@RequestBody Map<String, String> request) {
        String input = request.getOrDefault("input", "");
        return merlinService.activateOffensiveParadox(input);
    }
    
    /**
     * 🔧 RÉPARATION GRAMMAIRE TEMPORELLE
     * 
     * POST /merlin/repair-grammar
     * Body: { "script": "ψ001: ⊙(broken_syntax)" }
     */
    @PostMapping("/repair-grammar")
    public Map<String, Object> repairTemporalGrammar(@RequestBody Map<String, String> request) {
        String script = request.getOrDefault("script", "");
        return merlinService.repairTemporalGrammar(script);
    }
    
    /**
     * 🌀 PORTAIL TEMPOREL
     * 
     * POST /merlin/temporal-portal
     * Body: { "epoch": "medieval", "x": 15, "y": 20 }
     */
    @PostMapping("/temporal-portal")
    public Map<String, Object> openTemporalPortal(@RequestBody Map<String, Object> request) {
        String epoch = (String) request.getOrDefault("epoch", "present");
        int x = (Integer) request.getOrDefault("x", 0);
        int y = (Integer) request.getOrDefault("y", 0);
        return merlinService.openTemporalPortal(epoch, x, y);
    }
    
    /**
     * 📖 PROPHÉTIE QUANTIQUE
     * 
     * GET /merlin/prophecy?state=current_situation
     */
    @GetMapping("/prophecy")
    public Map<String, Object> revealProphecy(@RequestParam(defaultValue = "unknown") String state) {
        return merlinService.revealQuantumProphecy(state);
    }
    
    /**
     * 🎭 STATUS DE MERLIN
     * 
     * GET /merlin/status
     */
    @GetMapping("/status")
    public Map<String, Object> getMerlinStatus() {
        return Map.of(
            "name", "Merlin l'Architecte du Temps",
            "class", "Archimage Quantique",
            "power_level", "LEGENDARY",
            "quote", "Le futur ? Je l'ai déjà vécu. Trois fois.",
            "abilities", Map.of(
                "paradox_offensive", "⚡ Transforme les bugs en features",
                "temporal_portal", "🌀 Téléporte à travers les époques",
                "quantum_prophecy", "📖 Révèle les futurs possibles",
                "grammar_repair", "🔧 Répare la syntaxe temporelle"
            ),
            "status", "READY_FOR_ACTION",
            "temporal_energy", 100,
            "wisdom_level", "INFINITE"
        );
    }
}