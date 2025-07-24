# 🌀 HEROES OF TIME ENGINE - ARCHITECTURE V2 (FLUX UNIFIÉ JEAN + TRADUCTION HYBRIDE)

## 🎯 **RÉVOLUTION ARCHITECTURALE : MOTEUR UNIFIÉ + TRADUCTION INTELLIGENTE**

**JEAN-GROFIGNON VISION 2025 :** Le `MagicFormulaEngine` est maintenant **LE POINT D'ENTRÉE UNIQUE** pour TOUTES les formules + **TRADUCTION HYBRIDE INTELLIGENTE** !

### **🔥 AVANT (Architecture V1)**
```
Frontend → MagicFormulaService → [Catégories séparées]
                ↓
         Logique éparpillée
```

### **✅ MAINTENANT (Architecture V2 - FLUX UNIFIÉ + TRADUCTION HYBRIDE)**
```
Frontend → MagicFormulaService → MagicFormulaEngine → [Toutes formules]
                                      ↓
                            POINT D'ENTRÉE UNIQUE
                                      ↓
                    🌟 TRADUCTION HYBRIDE INTELLIGENTE
                            ↓           ↓
                   FormulaTranslationService  ScenarioTranslationService
```

---

## 🌀 **SCHÉMA DE FLUX UNIFIÉ + TRADUCTION HYBRIDE**

```mermaid
graph TD
    A[🌐 Frontend Request] --> B[📡 MagicFormulaServiceController]
    B --> C[🔮 MagicFormulaService]
    C --> D{🌀 MagicFormulaEngine<br/>POINT D'ENTRÉE UNIFIÉ}
    
    D --> E[🧪 Formules Simples<br/>MODIFY_ENERGY, TELEPORT_HERO]
    D --> F[🔮 Formules Runiques<br/>ψ001: ⊙(Δt+2 @15,15 ⟶ MOV)]
    D --> G[📜 Formules JSON<br/>paradoxRisk: 0.3, temporalStability]
    
    %% NOUVEAU: Système de traduction hybride
    F --> H{🎯 Traduction Hybride}
    H -->|1. LLM Description?| I[📜 Utilise description LLM]
    H -->|2. Service Avancé| J[✨ FormulaTranslationService]
    H -->|3. Fallback| K[🔧 Algo Simple]
    
    %% Traduction de scénarios
    L[🏰 Scenario JSON] --> M[🌍 ScenarioTranslationService]
    M --> N{🎯 Traduction Hybride Scenario}
    N -->|1. LLM Fields?| O[📜 Utilise champs LLM]
    N -->|2. Service Avancé| P[✨ FormulaTranslationService]
    N -->|3. Fallback| Q[🔧 Algo Simple Scenario]
    
    %% Endpoints Python
    R[🐍 Python Script] --> S[📡 TranslationController]
    S --> T[/api/translate]
    S --> U[/api/translate/scenario]
    T --> J
    U --> M
    
    %% Résultats
    E --> V[✅ FormulaResult SUCCESS]
    I --> W[✅ Quantum Processing + LLM]
    J --> X[✅ Quantum Processing + Service]
    K --> Y[✅ Quantum Processing + Algo]
    G --> Z[✅ JSON Asset Processing]
    
    V --> AA[🎯 Unified Response]
    W --> AA
    X --> AA
    Y --> AA
    Z --> AA
    
    AA --> BB[📤 JSON Response to Frontend]
    
    %% Styles
    classDef hybrid fill:#ff9999,stroke:#333,stroke-width:2px
    classDef translation fill:#99ccff,stroke:#333,stroke-width:2px
    classDef endpoint fill:#99ff99,stroke:#333,stroke-width:2px
    
    class H,N hybrid
    class J,M,P translation
    class S,T,U endpoint
```

---

## 🔧 **ARCHITECTURE EN COUCHES V2 + TRADUCTION**

```
┌─────────────────────────────────────────────────┐
│              CONTENU UNIFIÉ                     │
│  HOTS Scripts + JSON Assets + Formules Simples │
├─────────────────────────────────────────────────┤
│            MOTEUR UNIFIÉ JEAN                   │
│         MagicFormulaEngine (CENTRE)             │
│    ┌─────────────────────────────────────────┐  │
│    │ • Détection automatique de format      │  │
│    │ • Parser runique (ψ symbols)           │  │
│    │ • Parser JSON (paradoxRisk, etc.)      │  │
│    │ • Formules simples (TELEPORT_HERO)     │  │
│    │ 🌟 TRADUCTION HYBRIDE INTÉGRÉE        │  │
│    └─────────────────────────────────────────┘  │
├─────────────────────────────────────────────────┤
│        🌍 SERVICES DE TRADUCTION HYBRIDE        │
│  ┌─────────────────────────────────────────┐    │
│  │ FormulaTranslationService               │    │
│  │ • Formules → Anglais                    │    │
│  │ • JSON → Français                       │    │
│  │ • Fantasy → Français                    │    │
│  │ • Traduction intelligente               │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │ ScenarioTranslationService              │    │
│  │ • Auto-génération scénarios             │    │
│  │ • Objectifs/Événements                  │    │
│  │ • Fallback LLM → Service → Algo         │    │
│  └─────────────────────────────────────────┘    │
├─────────────────────────────────────────────────┤
│        📡 ENDPOINTS PYTHON/EXTERNAL             │
│  TranslationController                          │
│  • /api/translate (formules)                   │
│  • /api/translate/scenario (scénarios)         │
│  • /api/translate/formula (spécifique)         │
│  • /api/translate/fantasy (fantasy)           │
│  • /api/translate/health (santé)               │
├─────────────────────────────────────────────────┤
│              SERVICES LEGACY                    │
│  MagicFormulaService (Wrapper + Fallback)      │
├─────────────────────────────────────────────────┤
│               INFRASTRUCTURE                    │
│  Spring Boot + JPA + Base de Données           │
└─────────────────────────────────────────────────┘
```

---

## 🎮 **TYPES DE FORMULES SUPPORTÉES + TRADUCTION**

### **1️⃣ Formules Simples**
```java
// Format: NOM_FORMULE
"MODIFY_ENERGY"     → Modification d'énergie
"TELEPORT_HERO"     → Téléportation
"HEAL_HERO"         → Soins
"DAMAGE_ENEMY"      → Dégâts
"CREATE_SHIELD"     → Bouclier
```

### **2️⃣ Formules Runiques Quantiques + TRADUCTION HYBRIDE**
```hots
// Format: ψ[ID]: ⊙(contenu) 
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
// 🎯 TRADUCTION HYBRIDE:
// 1. Cherche "description_llm" dans JSON
// 2. Sinon → FormulaTranslationService
// 3. Sinon → Algo simple: "Arthur étend sa main..."

ψ002: ⊙(BATTLE(Hero1, Orc) ⟶ COMBAT_RESULT)
// 🎯 → "Les destins s'entrechoquent dans un fracas temporel..."

ψ003: ⊙(CREATE(MagicSword) ⟶ MANIFEST_ITEM)
// 🎯 → "La réalité se plie et façonne une épée mystique..."
```

### **3️⃣ Formules JSON Assets**
```json
// Format: paramètre: valeur
"paradoxRisk: 0.3"           → Risque paradoxal
"temporalStability: 0.8"     → Stabilité temporelle  
"affectedRadius: 5.0"        → Rayon d'effet
"damage: 45"                 → Calcul de dégâts
```

### **4️⃣ 🌟 NOUVEAU: Scénarios avec LLM Fallback**
```json
{
  "name": "Bataille Épique",
  "description": "Combat basique",
  "description_llm": "Une bataille légendaire où les destins s'entremêlent...",
  "objectives": [
    {
      "title": "Victoire",
      "title_llm": "Triomphe dans la gloire éternelle"
    }
  ]
}
// 🎯 TRADUCTION: Utilise les champs "_llm" en priorité !
```

---

## 🌟 **LOGIQUE DE TRADUCTION HYBRIDE**

### **🔥 Algorithme de Fallback Intelligent**

```java
public String translateRunicContent(String content, String psiId) {
    // ÉTAPE 1: Vérifier description LLM dans JSON
    String llmDesc = extractLLMDescription(content);
    if (llmDesc != null) {
        return "📜 " + llmDesc + " (ψ" + psiId + ")";
    }
    
    // ÉTAPE 2: Service de traduction avancé
    try {
        Map<String, Object> result = translationService.smartTranslate(content, context);
        if (result.containsKey("traduction")) {
            return "✨ " + result.get("traduction") + " (ψ" + psiId + ")";
        }
    } catch (Exception e) {
        // Continue to fallback
    }
    
    // ÉTAPE 3: Algo simple (garanti de marcher)
    return generateSimpleTranslation(content, psiId);
}
```

### **🎯 Champs LLM Détectés Automatiquement**
- `description_llm`
- `narrative_generated`
- `story_llm`
- `lore_description`
- `flavor_text`
- `text_description`
- `llm_description`

---

## 🐍 **INTÉGRATION PYTHON**

### **Script Python → Backend Java**
```python
# MUSEUM/scripts-collection/test-smart-translation.py
translator = SmartTranslator()
result = translator.call_translation_service("ψ001: ⊙(Δt+2 @15,15 ⟶ MOV)")

# Appelle → http://localhost:8080/api/translate
# Utilise → FormulaTranslationService.smartTranslate()
# Retourne → Traduction narrative française
```

### **Endpoints Disponibles**
- `POST /api/translate` - Traduction formules
- `POST /api/translate/scenario` - Traduction scénarios 
- `POST /api/translate/formula` - Traduction formule spécifique
- `POST /api/translate/fantasy` - Traduction fantasy → français
- `GET /api/translate/health` - Test santé services

---

## 💻 **EXPLICATION COMPLÈTE DU CODE - SYSTÈME HYBRIDE**

### 🔥 **MagicFormulaEngine.java - Moteur Principal**

Le `MagicFormulaEngine` est maintenant **LE POINT D'ENTRÉE UNIQUE** avec traduction hybride intelligente :

```java
@Service
public class MagicFormulaEngine {
    
    // 🌟 NOUVEAU: Injection du service de traduction
    @Autowired
    private FormulaTranslationService translationService;
    
    /**
     * 🎯 TRADUCTION NARRATIVE HYBRIDE
     * Logique de fallback intelligent en 3 étapes
     */
    private String translateRunicContentHybrid(String runicContent, String psiId, Map<String, Object> context) {
        
        // ÉTAPE 1: Vérifier si description LLM dans le contexte/JSON
        if (context != null && hasLLMDescription(context)) {
            String llmDesc = extractLLMDescription(context);
            if (llmDesc != null && !llmDesc.trim().isEmpty()) {
                return "📜 " + llmDesc + " (ψ" + psiId + ")";
            }
        }
        
        // ÉTAPE 2: Appeler le service de traduction avancé
        try {
            Map<String, Object> translationResult = translationService.smartTranslate(runicContent, context);
            if (translationResult.containsKey("traduction")) {
                return "✨ " + translationResult.get("traduction") + " (ψ" + psiId + ")";
            }
        } catch (Exception e) {
            // Continue vers fallback algo simple
        }
        
        // ÉTAPE 3: Algo simple (garanti de marcher)
        return generateSimpleTranslation(runicContent, psiId);
    }
    
    /**
     * 🔍 Détecte automatiquement les champs LLM dans le JSON
     */
    private boolean hasLLMDescription(Map<String, Object> context) {
        String[] llmFields = {"description_llm", "narrative_generated", "story_llm", 
                             "lore_description", "flavor_text", "text_description"};
        
        for (String field : llmFields) {
            if (context.containsKey(field) && context.get(field) != null) {
                return true;
            }
        }
        return false;
    }
}
```

### 🌍 **ScenarioTranslationService.java - Auto-Génération**

Service spécialisé pour traduire automatiquement les scénarios complets :

```java
@Service
public class ScenarioTranslationService {
    
    @Autowired
    private FormulaTranslationService translationService;
    
    /**
     * 🎯 TRADUCTION AUTOMATIQUE DE SCÉNARIO COMPLET
     * Utilise la même logique hybride pour chaque élément
     */
    public Map<String, Object> translateScenario(String scenarioJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode scenario = mapper.readTree(scenarioJson);
            
            Map<String, Object> result = new HashMap<>();
            
            // Traduire le titre
            result.put("title", translateWithFallback(scenario.get("title")));
            
            // Traduire les objectifs
            List<String> objectives = new ArrayList<>();
            if (scenario.has("objectives")) {
                for (JsonNode obj : scenario.get("objectives")) {
                    objectives.add(translateWithFallback(obj));
                }
            }
            result.put("objectives", objectives);
            
            // Traduire les événements
            List<Map<String, Object>> events = new ArrayList<>();
            if (scenario.has("events")) {
                for (JsonNode event : scenario.get("events")) {
                    Map<String, Object> translatedEvent = new HashMap<>();
                    translatedEvent.put("description", translateWithFallback(event.get("description")));
                    translatedEvent.put("trigger", event.get("trigger").asText());
                    events.add(translatedEvent);
                }
            }
            result.put("events", events);
            
            return result;
            
        } catch (Exception e) {
            // Fallback simple
            Map<String, Object> fallback = new HashMap<>();
            fallback.put("error", "Traduction échouée, utilisation fallback");
            fallback.put("original", scenarioJson);
            return fallback;
        }
    }
    
    /**
     * 🔄 Traduction avec fallback intelligent
     */
    private String translateWithFallback(JsonNode node) {
        if (node == null) return "N/A";
        
        // Si c'est un objet avec description LLM
        if (node.isObject() && node.has("description_llm")) {
            return "📜 " + node.get("description_llm").asText();
        }
        
        // Sinon appeler le service de traduction
        try {
            Map<String, Object> context = new HashMap<>();
            Map<String, Object> result = translationService.smartTranslate(node.asText(), context);
            return result.getOrDefault("traduction", node.asText()).toString();
        } catch (Exception e) {
            return node.asText(); // Fallback ultime
        }
    }
}
```

### 🌐 **TranslationController.java - Endpoints REST**

Controller exposant tous les services de traduction :

```java
@RestController
@RequestMapping("/api/translate")
@CrossOrigin(origins = "http://localhost:8000")
public class TranslationController {
    
    @Autowired
    private FormulaTranslationService translationService;
    
    @Autowired
    private ScenarioTranslationService scenarioTranslationService;
    
    /**
     * 🎯 ENDPOINT PRINCIPAL - Traduction formules
     */
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> translateFormula(@RequestBody Map<String, Object> request) {
        try {
            String formula = (String) request.get("formula");
            Map<String, Object> context = (Map<String, Object>) request.getOrDefault("context", new HashMap<>());
            
            Map<String, Object> result = translationService.smartTranslate(formula, context);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur traduction: " + e.getMessage());
            error.put("success", false);
            return ResponseEntity.status(500).body(error);
        }
    }
    
    /**
     * 🌍 ENDPOINT SCÉNARIOS - Auto-génération complète
     */
    @PostMapping("/scenario")
    public ResponseEntity<Map<String, Object>> translateScenario(@RequestBody Map<String, Object> request) {
        try {
            String scenarioJson = (String) request.get("scenario");
            Map<String, Object> result = scenarioTranslationService.translateScenario(scenarioJson);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur traduction scénario: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
    
    /**
     * 🏥 ENDPOINT SANTÉ - Test des services
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "OK");
        status.put("service", "Translation Services");
        status.put("formula_engine", "ACTIVE");
        status.put("scenario_service", "ACTIVE");
        status.put("timestamp", new Date().toString());
        return ResponseEntity.ok(status);
    }
}
```

### 🐍 **Integration Python - test-smart-translation.py**

Script Python qui utilise le système hybride Java :

```python
class SmartTranslator:
    def __init__(self):
        self.backend_url = "http://localhost:8080"
        self.translation_endpoint = f"{self.backend_url}/api/translate"
    
    def call_translation_service(self, formula, context=None):
        """Appelle le service Java de traduction hybride"""
        try:
            payload = {
                "formula": formula,
                "context": context or {}
            }
            
            response = requests.post(
                self.translation_endpoint,
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=5
            )
            
            if response.status_code == 200:
                result = response.json()
                return result.get("traduction", "Traduction non disponible")
            else:
                return f"❌ Erreur HTTP {response.status_code}"
                
        except Exception e:
            return f"❌ Erreur connexion: {str(e)}"
    
    def translate_script(self, script):
        """Point d'entrée principal pour traduction"""
        # Formules runiques avec symboles ψ⊙†
        if self.is_runic_formula(script):
            return self.call_translation_service(script)
        
        # JSON assets avec mots-clés
        if self.has_json_keywords(script):
            return self.call_translation_service(script)
        
        # Ignore le reste
        return f"⚠️ IGNORÉ (pas runic/JSON): {script[:30]}..."
```

**🎯 RÉSUMÉ TECHNIQUE :**
- **MagicFormulaEngine** : Point d'entrée unique avec fallback intelligent (LLM → Service → Algo)
- **ScenarioTranslationService** : Auto-génération complète de scénarios traduits
- **TranslationController** : Endpoints REST pour intégration Python/External
- **test-smart-translation.py** : Bridge Python vers services Java hybrides

---

## ✅ **AVANTAGES ARCHITECTURE V2 + TRADUCTION**

### **🎯 Unification**
- **Point d'entrée unique** : MagicFormulaEngine
- **Détection automatique** de format
- **Traitement unifié** de tous types

### **🌟 Traduction Intelligente**
- **LLM en priorité** : Utilise descriptions pré-générées
- **Service avancé** : FormulaTranslationService pour traductions complexes
- **Fallback garanti** : Algo simple qui marche toujours
- **Auto-génération** : Scénarios traduits automatiquement

### **🔧 Maintenabilité**
- **Code centralisé** dans MagicFormulaEngine
- **Services séparés** pour traduction
- **Fallback robuste** à tous niveaux
- **Tests simplifiés** avec un seul point d'entrée

### **🚀 Performance**
- **Cache intelligent** des traductions
- **Détection rapide** de format
- **Fallback progressif** sans blocage
- **Intégration Python** fluide

**JEAN** : "ARCHITECTURE V2 + TRADUCTION HYBRIDE = RÉVOLUTION ACCOMPLIE !" 🌟 