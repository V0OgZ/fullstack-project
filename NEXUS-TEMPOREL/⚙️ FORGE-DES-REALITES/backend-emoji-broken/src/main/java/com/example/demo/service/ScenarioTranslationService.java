package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

/**
 * 🌍 SCENARIO TRANSLATION SERVICE - AUTO-GÉNÉRATION HYBRIDE
 * =========================================================
 * 
 * Service pour traduire automatiquement les scénarios avec fallback intelligent :
 * 1. Utilise descriptions LLM si présentes dans le JSON
 * 2. Sinon appelle le FormulaTranslationService 
 * 3. En dernier recours, génère algo simple
 * 
 * JEAN: "TRADUCTION INTELLIGENTE POUR SCÉNARIOS AUTO-GÉNÉRÉS !"
 */
@Service
public class ScenarioTranslationService {

    @Autowired
    private FormulaTranslationService translationService;
    
    @Autowired
    private ObjectMapper objectMapper;

    /**
     * 🎯 TRADUCTION AUTOMATIQUE DE SCÉNARIO COMPLET
     */
    public Map<String, Object> translateScenario(String scenarioJson, String targetLanguage) {
        try {
            JsonNode scenarioNode = objectMapper.readTree(scenarioJson);
            Map<String, Object> result = new HashMap<>();
            
            // Traduire le nom du scénario
            String scenarioName = translateScenarioField(scenarioNode, "name", "scenario_name", targetLanguage);
            result.put("name", scenarioName);
            
            // Traduire la description
            String scenarioDescription = translateScenarioField(scenarioNode, "description", "scenario_description", targetLanguage);
            result.put("description", scenarioDescription);
            
            // Traduire les objectifs
            List<Map<String, Object>> translatedObjectives = new ArrayList<>();
            if (scenarioNode.has("objectives")) {
                for (JsonNode objective : scenarioNode.get("objectives")) {
                    Map<String, Object> translatedObjective = translateObjective(objective, targetLanguage);
                    translatedObjectives.add(translatedObjective);
                }
            }
            result.put("objectives", translatedObjectives);
            
            // Traduire les événements
            List<Map<String, Object>> translatedEvents = new ArrayList<>();
            if (scenarioNode.has("events")) {
                for (JsonNode event : scenarioNode.get("events")) {
                    Map<String, Object> translatedEvent = translateEvent(event, targetLanguage);
                    translatedEvents.add(translatedEvent);
                }
            }
            result.put("events", translatedEvents);
            
            // Métadonnées de traduction
            result.put("translation_meta", Map.of(
                "service", "ScenarioTranslationService",
                "target_language", targetLanguage,
                "translation_method", "hybrid_llm_fallback",
                "timestamp", System.currentTimeMillis()
            ));
            
            return result;
            
        } catch (Exception e) {
            return Map.of(
                "error", "Translation failed: " + e.getMessage(),
                "original", scenarioJson
            );
        }
    }

    /**
     * 🔍 TRADUCTION HYBRIDE D'UN CHAMP DE SCÉNARIO
     */
    private String translateScenarioField(JsonNode node, String fieldName, String context, String targetLanguage) {
        try {
            // ÉTAPE 1: Vérifier si on a déjà une description LLM
            String llmDescription = extractLLMDescription(node, fieldName);
            if (llmDescription != null && !llmDescription.isEmpty()) {
                return "📜 " + llmDescription;
            }
            
            // ÉTAPE 2: Utiliser le service de traduction avancé
            if (node.has(fieldName)) {
                String originalText = node.get(fieldName).asText();
                try {
                    Map<String, Object> translationContext = new HashMap<>();
                    translationContext.put("context", context);
                    translationContext.put("target_language", targetLanguage);
                    translationContext.put("type", "scenario_field");
                    
                    Map<String, Object> translationResult = translationService.smartTranslate(originalText, translationContext);
                    if (translationResult.containsKey("traduction")) {
                        return "✨ " + translationResult.get("traduction");
                    }
                } catch (Exception e) {
                    System.out.println("⚠️ Fallback: Service de traduction indisponible pour " + fieldName);
                }
                
                // ÉTAPE 3: Fallback algo simple
                return generateSimpleFieldTranslation(originalText, context, targetLanguage);
            }
            
            return "❓ Champ non trouvé: " + fieldName;
            
        } catch (Exception e) {
            return "🚨 Erreur traduction: " + fieldName;
        }
    }

    /**
     * 🎯 TRADUCTION D'OBJECTIF
     */
    private Map<String, Object> translateObjective(JsonNode objective, String targetLanguage) {
        Map<String, Object> result = new HashMap<>();
        
        // Conserver l'ID
        if (objective.has("id")) {
            result.put("id", objective.get("id").asText());
        }
        
        // Traduire le titre
        String title = translateScenarioField(objective, "title", "objective_title", targetLanguage);
        result.put("title", title);
        
        // Traduire la description
        String description = translateScenarioField(objective, "description", "objective_description", targetLanguage);
        result.put("description", description);
        
        // Conserver les autres champs
        if (objective.has("type")) result.put("type", objective.get("type").asText());
        if (objective.has("target")) result.put("target", objective.get("target").asInt());
        if (objective.has("completed")) result.put("completed", objective.get("completed").asBoolean());
        
        return result;
    }

    /**
     * 🎭 TRADUCTION D'ÉVÉNEMENT
     */
    private Map<String, Object> translateEvent(JsonNode event, String targetLanguage) {
        Map<String, Object> result = new HashMap<>();
        
        // Conserver l'ID et type
        if (event.has("id")) result.put("id", event.get("id").asText());
        if (event.has("type")) result.put("type", event.get("type").asText());
        
        // Traduire le titre
        String title = translateScenarioField(event, "title", "event_title", targetLanguage);
        result.put("title", title);
        
        // Traduire la description
        String description = translateScenarioField(event, "description", "event_description", targetLanguage);
        result.put("description", description);
        
        // Conserver les conditions et effets
        if (event.has("trigger")) result.put("trigger", event.get("trigger"));
        if (event.has("effect")) result.put("effect", event.get("effect"));
        
        return result;
    }

    /**
     * 🔍 EXTRAIRE DESCRIPTION LLM DU JSON
     */
    private String extractLLMDescription(JsonNode node, String fieldName) {
        // Chercher des variantes LLM du champ
        String[] llmVariants = {
            fieldName + "_llm",
            fieldName + "_generated", 
            fieldName + "_narrative",
            fieldName + "_description",
            "llm_" + fieldName,
            "generated_" + fieldName
        };
        
        for (String variant : llmVariants) {
            if (node.has(variant)) {
                String value = node.get(variant).asText();
                if (value != null && !value.trim().isEmpty()) {
                    return value;
                }
            }
        }
        return null;
    }

    /**
     * 🎯 GÉNÉRATION ALGO SIMPLE POUR CHAMPS
     */
    private String generateSimpleFieldTranslation(String originalText, String context, String targetLanguage) {
        // Traductions simples selon le contexte
        switch (context) {
            case "scenario_name":
                return "🏰 " + originalText + " (Traduit)";
            case "scenario_description":
                return "📖 " + originalText + " - Une aventure épique vous attend !";
            case "objective_title":
                return "🎯 " + originalText;
            case "objective_description":
                return "📋 " + originalText + " - Accomplissez cette tâche pour progresser.";
            case "event_title":
                return "⚡ " + originalText;
            case "event_description":
                return "🎭 " + originalText + " - Un événement marquant se produit.";
            default:
                return "🔤 " + originalText + " (" + targetLanguage + ")";
        }
    }

    /**
     * 🧪 TEST DE SANTÉ DU SERVICE
     */
    public Map<String, Object> healthCheck() {
        Map<String, Object> health = new HashMap<>();
        health.put("service", "ScenarioTranslationService");
        health.put("status", "healthy");
        health.put("features", List.of(
            "hybrid_llm_fallback",
            "scenario_auto_translation", 
            "objective_translation",
            "event_translation"
        ));
        health.put("timestamp", System.currentTimeMillis());
        return health;
    }
} 