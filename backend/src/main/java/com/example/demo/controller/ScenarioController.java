package com.example.demo.controller;

import com.example.demo.model.Scenario;
import com.example.demo.service.ScenarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/scenarios")
@CrossOrigin(origins = "http://localhost:3000")
public class ScenarioController {

    @Autowired
    private ScenarioService scenarioService;

    @PostMapping("/predefined/conquest-classic")
    public ResponseEntity<Scenario> getOrCreateConquestClassicScenario() {
        try {
            // D'abord essayer de récupérer le scénario existant
            Optional<Scenario> existing = scenarioService.getScenarioById("conquest-classic");
            if (existing.isPresent()) {
                System.out.println("✅ Scénario classique trouvé en base");
                return ResponseEntity.ok(existing.get());
            }
            
            System.out.println("🔨 Création du scénario classique...");
            // Si pas trouvé, essayer de le créer
            Scenario scenario = scenarioService.createConquestClassicScenario();
            return ResponseEntity.ok(scenario);
            
        } catch (DataIntegrityViolationException e) {
            System.out.println("⚠️ Contrainte d'unicité - scénario existe déjà, on le récupère");
            // Si erreur de contrainte d'unicité, c'est que le scénario existe déjà
            Optional<Scenario> existing = scenarioService.getScenarioById("conquest-classic");
            if (existing.isPresent()) {
                return ResponseEntity.ok(existing.get());
            }
            
            // Si on ne le trouve toujours pas, il y a un problème
            System.out.println("❌ Erreur: scénario pas trouvé malgré contrainte d'unicité");
            return ResponseEntity.status(500).build();
            
        } catch (Exception e) {
            System.out.println("❌ Erreur lors de la création du scénario classique: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/predefined/temporal-rift")
    public ResponseEntity<Scenario> getOrCreateTemporalRiftScenario() {
        try {
            // D'abord essayer de récupérer le scénario existant
            Optional<Scenario> existing = scenarioService.getScenarioById("temporal-rift");
            if (existing.isPresent()) {
                System.out.println("✅ Scénario temporel trouvé en base");
                return ResponseEntity.ok(existing.get());
            }
            
            System.out.println("🔨 Création du scénario temporel...");
            // Si pas trouvé, essayer de le créer
            Scenario scenario = scenarioService.createTemporalRiftScenario();
            return ResponseEntity.ok(scenario);
            
        } catch (DataIntegrityViolationException e) {
            System.out.println("⚠️ Contrainte d'unicité - scénario existe déjà, on le récupère");
            // Si erreur de contrainte d'unicité, c'est que le scénario existe déjà
            Optional<Scenario> existing = scenarioService.getScenarioById("temporal-rift");
            if (existing.isPresent()) {
                return ResponseEntity.ok(existing.get());
            }
            
            // Si on ne le trouve toujours pas, il y a un problème
            System.out.println("❌ Erreur: scénario pas trouvé malgré contrainte d'unicité");
            return ResponseEntity.status(500).build();
            
        } catch (Exception e) {
            System.out.println("❌ Erreur lors de la création du scénario temporel: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllScenarios() {
        try {
            return ResponseEntity.ok(scenarioService.getAllScenarios());
        } catch (Exception e) {
            System.out.println("❌ Erreur lors de la récupération des scénarios: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{scenarioId}")
    public ResponseEntity<?> getScenario(@PathVariable String scenarioId) {
        try {
            Optional<Scenario> scenario = scenarioService.getScenarioById(scenarioId);
            if (scenario.isPresent()) {
                return ResponseEntity.ok(scenario.get());
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.out.println("❌ Erreur lors de la récupération du scénario " + scenarioId + ": " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
} 