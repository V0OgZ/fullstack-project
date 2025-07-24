package com.example.demo.controller;

import com.example.demo.model.Scenario;
import com.example.demo.service.ScenarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.util.ArrayList;

/**
 * 🎮 SCENARIO CONTROLLER - SYSTÈME UNIFIÉ
 * =======================================
 * @deprecated Potentiellement non utilisé par frontend actuel (port 8000)
 * 
 * Controller avec système i18n complet (EN/FR/RU) mais traductions hardcodées.
 * Gère scénarios prédéfinis et localisation complète.
 * 
 * STATUS: SUSPECT - Pas d'utilisation détectée dans frontend simple
 * UTILISATION: Frontend port 3000 React uniquement ?
 * POTENTIEL: Système de scénarios multilingue complet
 * LOCALISATION: Traductions hardcodées EN/FR/RU (400+ lignes)
 * 
 * JEAN: "VÉRIFIER SI UTILISÉ - SYSTÈME I18N COMPLEXE MAIS PEUT-ÊTRE INUTILE"
 */
@Deprecated
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

    @PostMapping("/fix-multiplayer-fields")
    public ResponseEntity<String> fixMultiplayerFields() {
        try {
            scenarioService.fixAllMultiplayerFields();
            return ResponseEntity.ok("✅ Fixed isMultiplayer fields for all scenarios");
        } catch (Exception e) {
            System.out.println("❌ Error fixing multiplayer fields: " + e.getMessage());
            return ResponseEntity.status(500).body("Error fixing multiplayer fields: " + e.getMessage());
        }
    }

    @PostMapping("/debug-multiplayer")
    public ResponseEntity<String> debugMultiplayerFields() {
        try {
            List<Scenario> scenarios = scenarioService.getAllScenarios();
            StringBuilder debug = new StringBuilder("🔍 Debug info:\n");
            
            for (Scenario scenario : scenarios) {
                debug.append("- ").append(scenario.getScenarioId())
                     .append(": maxPlayers=").append(scenario.getMaxPlayers())
                     .append(", isMultiplayer=").append(scenario.getIsMultiplayer())
                     .append("\n");
                     
                // Force set isMultiplayer based on maxPlayers
                scenario.setIsMultiplayer(scenario.getMaxPlayers() > 1);
                scenarioService.updateScenario(scenario);
                
                debug.append("  → Updated to: isMultiplayer=").append(scenario.getIsMultiplayer()).append("\n");
            }
            
            return ResponseEntity.ok(debug.toString());
        } catch (Exception e) {
            System.out.println("❌ Error debugging multiplayer fields: " + e.getMessage());
            return ResponseEntity.status(500).body("Error debugging: " + e.getMessage());
        }
    }

    @GetMapping("/languages")
    public ResponseEntity<?> getAvailableLanguages() {
        try {
            List<Scenario> scenarios = scenarioService.getAllScenarios();
            Map<String, Map<String, String>> translations = getTranslations();
            
            Map<String, Object> result = new HashMap<>();
            
            for (String language : translations.keySet()) {
                boolean allScenariosTranslated = true;
                List<String> missingScenarios = new ArrayList<>();
                
                for (Scenario scenario : scenarios) {
                    String nameKey = "scenarios." + scenario.getScenarioId() + ".name";
                    String descKey = "scenarios." + scenario.getScenarioId() + ".description";
                    
                    if (!translations.get(language).containsKey(nameKey) || 
                        !translations.get(language).containsKey(descKey)) {
                        allScenariosTranslated = false;
                        missingScenarios.add(scenario.getScenarioId());
                    }
                }
                
                Map<String, Object> langInfo = new HashMap<>();
                langInfo.put("available", allScenariosTranslated);
                langInfo.put("missingScenarios", missingScenarios);
                langInfo.put("totalScenarios", scenarios.size());
                langInfo.put("translatedScenarios", scenarios.size() - missingScenarios.size());
                
                result.put(language, langInfo);
            }
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.out.println("❌ Error checking available languages: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllScenarios(@RequestParam(value = "lang", defaultValue = "en") String language) {
        try {
            List<Scenario> scenarios = scenarioService.getAllScenarios();
            List<Map<String, Object>> localizedScenarios = scenarios.stream()
                .map(scenario -> localizeScenario(scenario, language))
                .collect(java.util.stream.Collectors.toList());
            
            return ResponseEntity.ok(localizedScenarios);
        } catch (Exception e) {
            System.out.println("❌ Erreur lors de la récupération des scénarios: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    private Map<String, Object> localizeScenario(Scenario scenario, String language) {
        Map<String, Object> localized = new HashMap<>();
        
        // Copy all basic properties
        localized.put("id", scenario.getId());
        localized.put("scenarioId", scenario.getScenarioId());
        localized.put("difficulty", scenario.getDifficulty());
        localized.put("maxPlayers", scenario.getMaxPlayers());
        localized.put("recommendedPlayers", scenario.getRecommendedPlayers());
        localized.put("mapSize", scenario.getMapSize());
        localized.put("mapWidth", scenario.getMapWidth());
        localized.put("mapHeight", scenario.getMapHeight());
        localized.put("turnLimit", scenario.getTurnLimit());
        localized.put("timeLimit", scenario.getTimeLimit());
        localized.put("victoryCondition", scenario.getVictoryCondition());
        localized.put("victoryRequirement", getLocalizedText("victory." + scenario.getScenarioId(), language));
        localized.put("defeatCondition", getLocalizedText("defeat." + scenario.getScenarioId(), language));
        localized.put("createdAt", scenario.getCreatedAt());
        localized.put("updatedAt", scenario.getUpdatedAt());
        localized.put("isActive", scenario.getIsActive());
        localized.put("isCampaign", scenario.getIsCampaign());
        localized.put("isMultiplayer", scenario.getIsMultiplayer());
        localized.put("campaignOrder", scenario.getCampaignOrder());
        localized.put("previousScenarioId", scenario.getPreviousScenarioId());
        localized.put("nextScenarioId", scenario.getNextScenarioId());
        
        // Localize name and description
        localized.put("name", getLocalizedText("scenarios." + scenario.getScenarioId() + ".name", language));
        localized.put("description", getLocalizedText("scenarios." + scenario.getScenarioId() + ".description", language));
        
        // Localize objectives
        List<Map<String, Object>> localizedObjectives = scenario.getObjectives().stream()
            .map(objective -> localizeObjective(objective, scenario.getScenarioId(), language))
            .collect(java.util.stream.Collectors.toList());
        localized.put("objectives", localizedObjectives);
        
        // Copy other properties as-is
        localized.put("startingPositions", scenario.getStartingPositions());
        
        // Localize events
        List<Map<String, Object>> localizedEvents = scenario.getEvents().stream()
            .map(event -> localizeEvent(event, language))
            .collect(java.util.stream.Collectors.toList());
        localized.put("events", localizedEvents);
        
        localized.put("terrainDistribution", scenario.getTerrainDistribution());
        localized.put("startingResources", scenario.getStartingResources());
        localized.put("neutralCreatures", scenario.getNeutralCreatures());
        localized.put("artifacts", scenario.getArtifacts());
        localized.put("specialBuildings", scenario.getSpecialBuildings());
        
        return localized;
    }

    private Map<String, Object> localizeObjective(Scenario.ScenarioObjective objective, String scenarioId, String language) {
        Map<String, Object> localized = new HashMap<>();
        
        localized.put("objectiveId", objective.getObjectiveId());
        localized.put("objectiveType", objective.getObjectiveType());
        localized.put("objectiveTitle", getLocalizedText("objectives." + scenarioId + "." + objective.getObjectiveId() + ".title", language));
        localized.put("objectiveDescription", getLocalizedText("objectives." + scenarioId + "." + objective.getObjectiveId() + ".description", language));
        localized.put("targetValue", objective.getTargetValue());
        localized.put("currentValue", objective.getCurrentValue());
        localized.put("isRequired", objective.getIsRequired());
        localized.put("isCompleted", objective.getIsCompleted());
        localized.put("completionReward", objective.getCompletionReward());
        
        return localized;
    }

    private Map<String, Object> localizeEvent(Scenario.ScenarioEvent event, String language) {
        Map<String, Object> localized = new HashMap<>();
        localized.put("eventId", event.getEventId());
        localized.put("eventType", event.getEventType());
        localized.put("triggerCondition", event.getTriggerCondition());
        localized.put("triggerTurn", event.getTriggerTurn());
        localized.put("eventTitle", getLocalizedText(event.getEventTitle(), language));
        localized.put("eventDescription", getLocalizedText(event.getEventDescription(), language));
        localized.put("eventEffect", event.getEventEffect());
        localized.put("isTriggered", event.getIsTriggered());
        localized.put("isRepeatable", event.getIsRepeatable());
        return localized;
    }

    private String getLocalizedText(String key, String language) {
        // This is a simple implementation - in a real app you'd use a proper i18n library
        Map<String, Map<String, String>> translations = getTranslations();
        
        // Try the requested language first
        if (translations.containsKey(language) && translations.get(language).containsKey(key)) {
            return translations.get(language).get(key);
        }
        
        // Fallback to English
        if (translations.containsKey("en") && translations.get("en").containsKey(key)) {
            return translations.get("en").get(key);
        }
        
        // If all else fails, return the key (for debugging)
        return key;
    }

    private Map<String, Map<String, String>> getTranslations() {
        Map<String, Map<String, String>> translations = new HashMap<>();
        
        // English translations
        Map<String, String> en = new HashMap<>();
        en.put("scenarios.conquest-classic.name", "Classic Conquest");
        en.put("scenarios.conquest-classic.description", "A traditional conquest scenario where players must eliminate all enemies or capture their main towns.");
        en.put("scenarios.temporal-rift.name", "The Temporal Rift");
        en.put("scenarios.temporal-rift.description", "A mysterious rift in time threatens to tear reality apart. Heroes must navigate through temporal zones to restore balance.");
        en.put("scenarios.multiplayer-arena.name", "Multiplayer Arena");
        en.put("scenarios.multiplayer-arena.description", "A fast-paced multiplayer battle where players compete in a smaller arena for quick matches.");
        
        // Victory/Defeat conditions
        en.put("victory.conquest-classic", "Eliminate all enemy players or capture all enemy towns");
        en.put("defeat.conquest-classic", "All towns are captured or all heroes are eliminated");
        en.put("victory.temporal-rift", "Control the Temporal Nexus and close 3 time rifts");
        en.put("defeat.temporal-rift", "All heroes are lost or time runs out");
        en.put("victory.multiplayer-arena", "Be the last player standing");
        en.put("defeat.multiplayer-arena", "All heroes eliminated");
        
        // Objectives
        en.put("objectives.conquest-classic.obj1.title", "Total Victory");
        en.put("objectives.conquest-classic.obj1.description", "Eliminate all enemy players");
        en.put("objectives.conquest-classic.obj2.title", "Capture All Towns");
        en.put("objectives.conquest-classic.obj2.description", "Capture all enemy towns");
        en.put("objectives.temporal-rift.obj1.title", "Control the Temporal Nexus");
        en.put("objectives.temporal-rift.obj1.description", "Capture and hold the central Temporal Nexus");
        en.put("objectives.temporal-rift.obj2.title", "Close Time Rifts");
        en.put("objectives.temporal-rift.obj2.description", "Find and close 3 unstable time rifts");
        en.put("objectives.temporal-rift.obj3.title", "Defeat the Temporal Guardian");
        en.put("objectives.temporal-rift.obj3.description", "Eliminate the powerful Temporal Guardian");
        en.put("objectives.multiplayer-arena.obj1.title", "Last Player Standing");
        en.put("objectives.multiplayer-arena.obj1.description", "Eliminate all other players");
        
        // Events
        en.put("events.temporal-rift.event1.title", "Temporal Storm");
        en.put("events.temporal-rift.event1.description", "A temporal storm sweeps across the land, affecting all units");
        en.put("events.temporal-rift.event2.title", "Ancient Artifact");
        en.put("events.temporal-rift.event2.description", "An ancient artifact appears in the center of the map");
        en.put("events.multiplayer-arena.event1.title", "Resource Boost");
        en.put("events.multiplayer-arena.event1.description", "All players receive bonus resources");
        
        // French translations
        Map<String, String> fr = new HashMap<>();
        fr.put("scenarios.conquest-classic.name", "Conquête Classique");
        fr.put("scenarios.conquest-classic.description", "Un scénario de conquête traditionnel où les joueurs doivent éliminer tous les ennemis ou capturer leurs villes principales.");
        fr.put("scenarios.temporal-rift.name", "La Faille Temporelle");
        fr.put("scenarios.temporal-rift.description", "Une faille mystérieuse dans le temps menace de déchirer la réalité. Les héros doivent naviguer à travers les zones temporelles pour rétablir l'équilibre.");
        fr.put("scenarios.multiplayer-arena.name", "Arène Multijoueur");
        fr.put("scenarios.multiplayer-arena.description", "Une bataille multijoueur rapide où les joueurs s'affrontent dans une arène plus petite pour des matchs rapides.");
        
        // Victory/Defeat conditions
        fr.put("victory.conquest-classic", "Éliminer tous les joueurs ennemis ou capturer toutes les villes ennemies");
        fr.put("defeat.conquest-classic", "Toutes les villes sont capturées ou tous les héros sont éliminés");
        fr.put("victory.temporal-rift", "Contrôler le Nexus Temporel et fermer 3 failles temporelles");
        fr.put("defeat.temporal-rift", "Tous les héros sont perdus ou le temps s'épuise");
        fr.put("victory.multiplayer-arena", "Être le dernier joueur debout");
        fr.put("defeat.multiplayer-arena", "Tous les héros éliminés");
        
        // Objectives
        fr.put("objectives.conquest-classic.obj1.title", "Victoire Totale");
        fr.put("objectives.conquest-classic.obj1.description", "Éliminer tous les joueurs ennemis");
        fr.put("objectives.conquest-classic.obj2.title", "Capturer Toutes les Villes");
        fr.put("objectives.conquest-classic.obj2.description", "Capturer toutes les villes ennemies");
        fr.put("objectives.temporal-rift.obj1.title", "Contrôler le Nexus Temporel");
        fr.put("objectives.temporal-rift.obj1.description", "Capturer et tenir le Nexus Temporel central");
        fr.put("objectives.temporal-rift.obj2.title", "Fermer les Failles Temporelles");
        fr.put("objectives.temporal-rift.obj2.description", "Trouver et fermer 3 failles temporelles instables");
        fr.put("objectives.temporal-rift.obj3.title", "Vaincre le Gardien Temporel");
        fr.put("objectives.temporal-rift.obj3.description", "Éliminer le puissant Gardien Temporel");
        fr.put("objectives.multiplayer-arena.obj1.title", "Dernier Joueur Debout");
        fr.put("objectives.multiplayer-arena.obj1.description", "Éliminer tous les autres joueurs");
        
        // Events
        fr.put("events.temporal-rift.event1.title", "Tempête Temporelle");
        fr.put("events.temporal-rift.event1.description", "Une tempête temporelle balaie la terre, affectant toutes les unités");
        fr.put("events.temporal-rift.event2.title", "Artefact Ancien");
        fr.put("events.temporal-rift.event2.description", "Un artefact ancien apparaît au centre de la carte");
        fr.put("events.multiplayer-arena.event1.title", "Boost de Ressources");
        fr.put("events.multiplayer-arena.event1.description", "Tous les joueurs reçoivent des ressources bonus");
        
        // Russian translations
        Map<String, String> ru = new HashMap<>();
        ru.put("scenarios.conquest-classic.name", "Классическое Завоевание");
        ru.put("scenarios.conquest-classic.description", "Традиционный сценарий завоевания, где игроки должны уничтожить всех врагов или захватить их главные города.");
        ru.put("scenarios.temporal-rift.name", "Временной Разлом");
        ru.put("scenarios.temporal-rift.description", "Таинственный разлом во времени угрожает разорвать реальность. Герои должны пройти через временные зоны, чтобы восстановить равновесие.");
        
        // Victory/Defeat conditions
        ru.put("victory.conquest-classic", "Уничтожить всех вражеских игроков или захватить все вражеские города");
        ru.put("defeat.conquest-classic", "Все города захвачены или все герои уничтожены");
        ru.put("victory.temporal-rift", "Контролировать Временной Нексус и закрыть 3 временных разлома");
        ru.put("defeat.temporal-rift", "Все герои потеряны или время истекло");
        
        // Objectives
        ru.put("objectives.conquest-classic.obj1.title", "Полная Победа");
        ru.put("objectives.conquest-classic.obj1.description", "Уничтожить всех вражеских игроков");
        ru.put("objectives.conquest-classic.obj2.title", "Захватить Все Города");
        ru.put("objectives.conquest-classic.obj2.description", "Захватить все вражеские города");
        ru.put("objectives.temporal-rift.obj1.title", "Контроль Временного Нексуса");
        ru.put("objectives.temporal-rift.obj1.description", "Захватить и удерживать центральный Временной Нексус");
        ru.put("objectives.temporal-rift.obj2.title", "Закрыть Временные Разломы");
        ru.put("objectives.temporal-rift.obj2.description", "Найти и закрыть 3 нестабильных временных разлома");
        ru.put("objectives.temporal-rift.obj3.title", "Победить Временного Стража");
        ru.put("objectives.temporal-rift.obj3.description", "Уничтожить могущественного Временного Стража");
        
        // Events
        ru.put("events.temporal-rift.event1.title", "Временная Буря");
        ru.put("events.temporal-rift.event1.description", "Временная буря охватывает землю, воздействуя на все отряды");
        ru.put("events.temporal-rift.event2.title", "Древний Артефакт");
        ru.put("events.temporal-rift.event2.description", "Древний артефакт появляется в центре карты");
        
        translations.put("en", en);
        translations.put("fr", fr);
        translations.put("ru", ru);
        
        return translations;
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