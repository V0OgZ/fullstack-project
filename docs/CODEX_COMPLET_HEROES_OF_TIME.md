# 📜 **CODEX COMPLET HEROES OF TIME**
## Documentation Intégrale - Grammaire, Traduction et Tests

*Version 3.0 - Codex Unifié avec Service de Traduction et Tests Complets*

---

## 🎯 **TABLE DES MATIÈRES**

1. [🔮 Grammaire HOTS Complète](#grammaire-hots-complète)
2. [🌐 Service de Traduction](#service-de-traduction)
3. [🧪 Tests et Validation](#tests-et-validation)
4. [📚 Référence API](#référence-api)
5. [🎮 Exemples Pratiques](#exemples-pratiques)

---

## 🔮 **GRAMMAIRE HOTS COMPLÈTE**

### **📝 Symboles de Base (Supportés)**

| Symbole | Nom | Usage | Support |
|---------|-----|-------|---------|
| `ψ` | Psi | Identifiant d'état quantique | ✅ |
| `⊙` | Observation | Enveloppe d'observation | ✅ |
| `Δt` | Delta-t | Décalage temporel | ✅ |
| `@` | Position | Coordonnées x,y | ✅ |
| `⟶` | Transition | Flèche vers action | ✅ |
| `†` | Collapse | Effondrement d'état | ✅ |
| `Π` | Pi | Condition logique | ✅ |
| `ℬ` | Branche | Identifiant de timeline | ⚠️ |

### **🚫 Symboles Non Supportés (Limitations Actuelles)**

| Symbole | Nom | Raison | Alternative |
|---------|-----|--------|-------------|
| `⨉` | Conflit | Non implémenté | `Π()` pour détection |
| `↺` | Rollback | Non implémenté | `Δt-` pour retour |
| `τ` | Marqueur temporel | Non implémenté | `Δt` standard |
| `⟨⟩` | Braket | Non implémenté | `Π()` simple |
| `∧` | ET logique | Non implémenté | `Π()` conditionnel |
| `∨` | OU logique | Non implémenté | `Π()` conditionnel |

### **🎮 Commandes de Base**

#### **Création et Gestion**
```hots
HERO(Arthur)                           # Créer un héros
MOV(Arthur, @10,15)                   # Déplacer un héros
CREATE(CREATURE, Dragon, @15,15)      # Créer une créature
CREATE(ITEM, MagicSword, HERO:Arthur) # Créer un item
CREATE(BUILDING, Tower, @5,5)         # Créer un bâtiment
```

#### **Actions et Combat**
```hots
USE(ITEM, MagicSword, HERO:Arthur)    # Utiliser un item
USE(ARTIFACT, temporal_sword, HERO:Arthur)
BATTLE(Arthur, Merlin)                # Combat entre héros
BATTLE(Arthur, Dragon)                # Combat contre créature
```

#### **États Quantiques**
```hots
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
ψ002: (0.8+0.6i) ⊙(Δt+1 @10,10 ⟶ USE(ARTIFACT, sword, HERO:Arthur))
†ψ001                                 # Effondrer l'état ψ001
Π(Arthur @15,15) ⇒ †ψ002             # Observation conditionnelle
```

### **🔧 Format des Amplitudes Complexes**

```hots
# Format cartésien
ψ001: (0.8+0.6i) ⊙(...)
ψ002: (0.7-0.3i) ⊙(...)

# Format polaire
ψ003: (0.9∠1.57) ⊙(...)

# Format réel simple
ψ004: (1.0) ⊙(...)

# Format imaginaire pur
ψ005: (0.5i) ⊙(...)
```

---

## 🌐 **SERVICE DE TRADUCTION**

### **🎭 Modes de Traduction Disponibles**

#### **1. Mode Littéraire (`literary`)**
Transforme les scripts HOTS en prose poétique et mystique.

**Exemple :**
```hots
Input:  HERO(Arthur)
Output: le héros valeureux Arthur émerge de l'éther

Input:  ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
Output: l'essence quantique manifeste sa projection temporelle, sa forme éthérée dansant entre les fils de la réalité: le déplacement temporel de 2 cycles, alors que le temps lui-même se courbe sous la volonté de l'incertitude quantique @15,15 ⟶ le héros valeureux Arthur étend sa main dans le vide, projetant un écho miroir vers les coordonnées mystiques (15, 15)
```

#### **2. Mode Icônes (`icons`)**
Remplace les commandes par des emojis et symboles visuels.

**Exemple :**
```hots
Input:  HERO(Arthur)
Output: 🧍(Arthur)

Input:  ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
Output: 🧠001:⏳(⏰+2 @15,15 ⟶ 🧍➡️🗺️(15,15))
```

#### **3. Mode Runes (`runes`)**
Utilise des symboles mystiques et runes anciennes.

**Exemple :**
```hots
Input:  HERO(Arthur)
Output: ᚺ(Arthur)

Input:  ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
Output: ☥001:⟡(⏣+2 @15,15 ⟶ ᚺᛗ⌖(15,15))
```

### **🔗 API de Traduction**

#### **Endpoint Principal**
```http
POST /api/collection/translate
Content-Type: application/json

{
  "script": "HERO(Arthur)",
  "mode": "literary"
}
```

#### **Réponse**
```json
{
  "original": "HERO(Arthur)",
  "translated": "le héros valeureux Arthur émerge de l'éther",
  "mode": "literary"
}
```

#### **Modes Disponibles**
```http
GET /api/collection/translation-modes
```

**Réponse :**
```json
{
  "modes": ["literary", "icons", "runes", "all"],
  "examples": {
    "HERO(Arthur)": "le héros valeureux Arthur | 🧍(Arthur) | ᚺ(Arthur)",
    "ψ001: ⊙(Δt+1 @10,10 ⟶ MOV(HERO, Arthur, @10,10))": "l'essence quantique 001 manifeste sa projection temporelle: le déplacement temporel de 1 cycles @10,10 ⟶ le héros Arthur étend sa main dans le vide, projetant un écho miroir vers les coordonnées mystiques (10, 10) | 🧠001:⏳(⏰+1 @10,10 ⟶ 🧍➡️🗺️(10,10)) | ☥001:⟡(⏣+1 @10,10 ⟶ ᚺᛗ⌖(10,10))"
  }
}
```

### **📚 Mappings de Traduction**

#### **Commandes de Base**
```java
LITERARY_TRANSLATIONS.put("HERO", "le héros valeureux");
LITERARY_TRANSLATIONS.put("MOV", "étend sa main dans le vide, projetant un écho miroir");
LITERARY_TRANSLATIONS.put("CREATE", "invoque depuis les profondeurs de la possibilité");
LITERARY_TRANSLATIONS.put("USE", "canalise l'ancien pouvoir de");
LITERARY_TRANSLATIONS.put("BATTLE", "s'engage dans un combat quantique avec");
```

#### **Symboles Quantiques**
```java
LITERARY_TRANSLATIONS.put("ψ", "l'essence quantique");
LITERARY_TRANSLATIONS.put("⊙", "la projection temporelle");
LITERARY_TRANSLATIONS.put("†", "l'effondrement de la probabilité");
LITERARY_TRANSLATIONS.put("Π", "le regard de l'observateur");
LITERARY_TRANSLATIONS.put("Δt", "le déplacement temporel");
```

#### **Descriptions Littéraires des Entités**
```java
ID_TO_DESCRIPTION.put("JeanGrofignon", "Jean-Grofignon, l'Éveillé Ontologique");
ID_TO_DESCRIPTION.put("grofi_omega", "l'Oméga de Grofi, cet artefact ultime qui transcende les lois de la réalité");
ID_TO_DESCRIPTION.put("quantum_phoenix", "le phénix quantique légendaire");
ID_TO_DESCRIPTION.put("parchemin_sale", "le Parchemin Sale, manuscrit des vérités interdites");
```

---

## 🧪 **TESTS ET VALIDATION**

### **📋 Inventaire Complet des Tests**

#### **1. Tests HOTS (.hots) - 25 fichiers**
```
🌟 BEGINNER SCENARIOS (3 files)
├─ decouverte_brouillard.hots           - 🌫️ Découverte du Brouillard
├─ premiers_artefacts.hots              - 🔮 Premiers Artefacts  
└─ initiation_combat.hots               - ⚔️ Initiation au Combat

📁 MAIN HOTS SCENARIOS (15 files)
├─ bataille_temporelle_complete.hots     - Epic temporal battle
├─ claudius_vs_jeangro_epic.hots        - Epic duel scenario
├─ codex_final.hots                     - The 13th Codex scenario
├─ epic-arthur-vs-ragnar.hots           - Classic hero duel
├─ la_tour_sombre.hots                  - 🏰 Scénario épique: La Tour Sombre
├─ oeil_de_wigner_scenario.hots         - Wigner's Eye gameplay
├─ panopticon_axis_test.hots            - PANOPTICΩN with Axis
├─ quantum_interference_example.hots     - Interference tutorial
├─ quantum_maze.hots                    - Quantum maze puzzle
├─ treasure_theft_test.hots             - Stealth treasure scenario
└─ [5 autres fichiers...]

📁 TEST HOTS SCENARIOS (10 files)
├─ bataille_temporelle_finale.hots      - Battle finale
├─ bataille_temporelle_combat.hots      - Combat mechanics
├─ bataille_temporelle_setup.hots       - Battle setup
├─ converted_epic_scenario.hots         - Java→HOTS conversion
├─ parser-comparison.hots               - Parser testing
├─ quantum_artifacts_test.hots          - Artifact testing
├─ quantum_interference_test.hots       - Interference mechanics
└─ temporal-stress-test.hots            - Stress testing
```

#### **2. Tests JSON Visualizer (13 fichiers)**
```
✅ bataille_temporelle.json             - Has HOTS equivalent
❌ DANSE_ILLUSOIRE.json                 - NO HOTS VERSION!
❌ DUEL_COLLAPSE.json                   - NO HOTS VERSION!
❌ ECLAT_MONDES_DISSOLUS.json          - NO HOTS VERSION!
❌ FRACTURE_BINAIRE.json               - NO HOTS VERSION!
❌ GARDE_DU_NEXUS.json                 - NO HOTS VERSION!
❌ GROFI_CAUSAL_DEMO.json              - NO HOTS VERSION!
❌ GROFI_LEGENDS_DUEL.json             - NO HOTS VERSION!
```

#### **3. Scripts de Test Shell (16+ fichiers)**
```
📁 scripts/test/
├─ ajouter-test-interference-dashboard.sh
├─ benchmark-native-vs-script.sh
├─ run-all-hots-scenarios.sh
├─ test-bataille-temporelle.sh
├─ test-quantum-ui.sh
├─ test-scenarios-ui.sh
└─ [10 autres scripts...]
```

### **🚀 Commandes de Test Principales**

#### **Test Rapide**
```bash
./hots test quick              # Tests essentiels (1-2 min)
```

#### **Test Complet**
```bash
./hots test final              # Tous les tests (5-10 min)
```

#### **Tests Spécifiques**
```bash
./hots test maven              # Tests backend Maven
./hots test scenarios          # Tests HOTS scenarios
./hots test quantum            # Tests quantum mechanics
```

#### **Tests de Performance**
```bash
./scripts/test/benchmark-native-vs-script.sh
./scripts/test/benchmark-java-vs-hots-with-metrics.sh
```

### **🔍 Validation de la Grammaire**

#### **Tests de Parser**
```bash
# Test du parser HOTS
./scripts/test/parser-comparison.hots

# Validation des amplitudes complexes
./scripts/test/quantum_interference_test.hots

# Test des artefacts
./scripts/test/quantum_artifacts_test.hots
```

#### **Tests de Traduction**
```bash
# Test du service de traduction
curl -X POST http://localhost:8080/api/collection/translate \
  -H "Content-Type: application/json" \
  -d '{"script": "HERO(Arthur)", "mode": "literary"}'

# Test des modes disponibles
curl http://localhost:8080/api/collection/translation-modes
```

---

## 📚 **RÉFÉRENCE API**

### **🎮 Contrôleurs Principaux**

#### **TemporalEngineController**
```java
@RestController
@RequestMapping("/api/temporal")
public class TemporalEngineController {
    
    @PostMapping("/games/{gameId}/script")
    public ResponseEntity<Map<String, Object>> executeScript(Long gameId, Map<String, String> request)
    
    @GetMapping("/games/{gameId}/state")
    public ResponseEntity<Map<String, Object>> getGameState(Long gameId)
    
    @PostMapping("/games/{gameId}/start")
    public ResponseEntity<Map<String, Object>> startGame(Long gameId)
}
```

#### **CollectionController**
```java
@RestController
@RequestMapping("/api/collection")
public class CollectionController {
    
    @PostMapping("/translate")
    public ResponseEntity<Map<String, Object>> translateScript(Map<String, String> request)
    
    @GetMapping("/heroes")
    public ResponseEntity<List<Map<String, Object>>> getHeroes()
    
    @GetMapping("/artifacts")
    public ResponseEntity<List<Map<String, Object>>> getArtifacts()
    
    @GetMapping("/creatures")
    public ResponseEntity<List<Map<String, Object>>> getCreatures()
}
```

### **🔧 Services Principaux**

#### **TemporalScriptParser**
```java
@Service
public class TemporalScriptParser {
    
    public boolean isTemporalScript(String scriptLine)
    public PsiState parseTemporalScript(String scriptLine)
    public ScriptCommand parseBasicScript(String scriptLine)
    public ComplexAmplitude parseComplexAmplitude(String amplitudeStr)
}
```

#### **ScriptTranslationService**
```java
@Service
public class ScriptTranslationService {
    
    public Map<String, Object> translateScript(String script, String mode)
    public List<String> getAvailableModes()
    public Map<String, String> getTranslationExamples()
}
```

#### **TemporalEngineService**
```java
@Service
public class TemporalEngineService {
    
    public Map<String, Object> executeTemporalGameScript(Long gameId, String scriptLine)
    public Map<String, Object> executeQuantumTemporalScript(Game game, String scriptLine)
    public Map<String, Object> executeClassicGameScript(Game game, String scriptLine)
    public Map<String, Object> getQuantumGameStateWithTemporalInfo(Long gameId)
}
```

---

## 🎮 **EXEMPLES PRATIQUES**

### **📖 Scénario Complet : Bataille Temporelle**

#### **1. Configuration Initiale**
```hots
# Création des héros
HERO(Arthur)
HERO(Ragnar)

# Positionnement initial
MOV(Arthur, @10,10)
MOV(Ragnar, @20,20)
```

#### **2. États Quantiques**
```hots
# Arthur prépare une attaque future
ψ001: ⊙(Δt+2 @15,15 ⟶ BATTLE(Arthur, Ragnar))

# Ragnar se déplace pour éviter
ψ002: ⊙(Δt+1 @18,18 ⟶ MOV(Ragnar, @18,18))
```

#### **3. Observation et Collapse**
```hots
# Ragnar observe la zone d'attaque
Π(Ragnar @15,15) ⇒ †ψ001

# Arthur effondre son état
†ψ002
```

#### **4. Traduction Littéraire**
```bash
curl -X POST http://localhost:8080/api/collection/translate \
  -H "Content-Type: application/json" \
  -d '{
    "script": "ψ001: ⊙(Δt+2 @15,15 ⟶ BATTLE(Arthur, Ragnar))",
    "mode": "literary"
  }'
```

**Résultat :**
```json
{
  "original": "ψ001: ⊙(Δt+2 @15,15 ⟶ BATTLE(Arthur, Ragnar))",
  "translated": "l'essence quantique manifeste sa projection temporelle, sa forme éthérée dansant entre les fils de la réalité: le déplacement temporel de 2 cycles, alors que le temps lui-même se courbe sous la volonté de l'incertitude quantique @15,15 ⟶ le héros valeureux Arthur s'engage dans un combat quantique avec le héros valeureux Ragnar",
  "mode": "literary"
}
```

### **🔮 Utilisation d'Artefacts**

#### **Script HOTS**
```hots
# Création de l'artefact
CREATE(ARTIFACT, grofi_omega, HERO:JeanGrofignon)

# Utilisation avec état quantique
ψ003: ⊙(Δt+1 @15,15 ⟶ USE(ARTIFACT, grofi_omega, HERO:JeanGrofignon))
```

#### **Traduction avec Icônes**
```bash
curl -X POST http://localhost:8080/api/collection/translate \
  -H "Content-Type: application/json" \
  -d '{
    "script": "ψ003: ⊙(Δt+1 @15,15 ⟶ USE(ARTIFACT, grofi_omega, HERO:JeanGrofignon))",
    "mode": "icons"
  }'
```

**Résultat :**
```json
{
  "original": "ψ003: ⊙(Δt+1 @15,15 ⟶ USE(ARTIFACT, grofi_omega, HERO:JeanGrofignon))",
  "translated": "🧠003:⏳(⏰+1 @15,15 ⟶ 🧙‍♂️💎(grofi_omega)🧍(JeanGrofignon))",
  "mode": "icons"
}
```

---

## 🎯 **CONCLUSION**

Ce codex complet documente :

1. **✅ Grammaire HOTS** - Tous les symboles supportés et leurs usages
2. **🌐 Service de Traduction** - 3 modes (littéraire, icônes, runes) avec API complète
3. **🧪 Tests Complets** - 25+ fichiers HOTS, 13+ JSON, 16+ scripts shell
4. **📚 Référence API** - Tous les contrôleurs et services documentés
5. **🎮 Exemples Pratiques** - Scénarios complets avec traduction

**Pour utiliser ce codex :**
- **Développeurs** : Référencez les sections API et Tests
- **Scénaristes** : Utilisez la grammaire HOTS et les exemples
- **Testeurs** : Exécutez les commandes de test appropriées
- **Traducteurs** : Utilisez le service de traduction avec les 3 modes

**Citation de Jean-Grofignon :** *"Ce codex est l'essence même de notre jeu. Chaque symbole, chaque traduction, chaque test contribue à l'émergence de la réalité quantique que nous créons ensemble."* 🧠✨ 