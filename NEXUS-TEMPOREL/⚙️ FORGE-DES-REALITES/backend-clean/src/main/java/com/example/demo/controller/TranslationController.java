package com.example.demo.controller;

import com.example.demo.service.FormulaTranslationService;
import com.example.demo.service.ScenarioTranslationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

/**
 * 🌍 TRANSLATION CONTROLLER - ENDPOINT POUR SERVICE PYTHON
 * ========================================================
 * 
 * Controller REST pour exposer le FormulaTranslationService Java
 * Permet au script Python test-smart-translation.py d'accéder aux traductions
 * 
 * JEAN: "ENFIN UN PONT ENTRE PYTHON ET JAVA POUR LES TRADUCTIONS !"
 */
@RestController
@RequestMapping("/api/translate")
@CrossOrigin(origins = "http://localhost:8888")
public class TranslationController {

    @Autowired
    private FormulaTranslationService translationService;
    
    @Autowired
    private ScenarioTranslationService scenarioTranslationService;

    /**
     * 🔥 ENDPOINT PRINCIPAL - Traduction intelligente
     * Utilisé par test-smart-translation.py
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> translateText(@RequestBody Map<String, Object> request) {
        try {
            String input = (String) request.get("text");
            @SuppressWarnings("unchecked")
            Map<String, Object> context = (Map<String, Object>) request.getOrDefault("context", new HashMap<>());
            
            // Utiliser la traduction intelligente du service
            Map<String, Object> result = translationService.smartTranslate(input, context);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            error.put("service", "TranslationController");
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * 🏰 NOUVEAU: Traduction automatique de scénarios
     * Utilise l'approche hybride LLM + fallback
     */
    @PostMapping("/scenario")
    public ResponseEntity<Map<String, Object>> translateScenario(@RequestBody Map<String, Object> request) {
        try {
            String scenarioJson = (String) request.get("scenario");
            String targetLanguage = (String) request.getOrDefault("language", "fr");
            
            Map<String, Object> result = scenarioTranslationService.translateScenario(scenarioJson, targetLanguage);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            error.put("service", "ScenarioTranslationService");
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * 🔮 Traduction de formule spécifique
     */
    @PostMapping("/formula")
    public ResponseEntity<Map<String, Object>> translateFormula(@RequestBody Map<String, Object> request) {
        try {
            String formulaName = (String) request.get("formula");
            String englishTranslation = translationService.translateFormulaToEnglish(formulaName);
            
            Map<String, Object> result = new HashMap<>();
            result.put("original", formulaName);
            result.put("english", englishTranslation);
            result.put("success", true);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * 🏛️ Traduction fantasy → français
     */
    @PostMapping("/fantasy")
    public ResponseEntity<Map<String, Object>> translateFantasy(@RequestBody Map<String, Object> request) {
        try {
            String runicText = (String) request.get("text");
            String frenchTranslation = translationService.translateFantasyToFrench(runicText);
            
            Map<String, Object> result = new HashMap<>();
            result.put("original", runicText);
            result.put("french", frenchTranslation);
            result.put("success", true);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * 🧪 Test de santé du service de traduction
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "healthy");
        health.put("service", "TranslationController");
        health.put("timestamp", System.currentTimeMillis());
        health.put("java_backend", "✅ Actif");
        health.put("translation_service", "✅ Opérationnel");
        health.put("scenario_service", "✅ Hybride LLM + Fallback");
        
        return ResponseEntity.ok(health);
    }
} 