# 🎯 **RÉFÉRENCE COMPLÈTE : USAGE DES PARSERS HEROES OF TIME**

## 📋 **RÉSUMÉ SYSTÈME**

**2 Parsers coexistent :**
- **Parser REGEX** (`TemporalScriptParser`) = **ANCIEN** - **DÉFAUT ACTUEL**
- **Parser ANTLR4** (`AntlrTemporalScriptParser`) = **NOUVEAU** - **MEILLEUR POUR HMM3**

**2 Frontends utilisent le Backend :**
- **Frontend Principal** (`frontend/`) = Interface JavaScript classique
- **Frontend Temporal** (`frontend-temporal/`) = Interface spécialisée temporelle

---

## 🏗️ **ARCHITECTURE DÉTAILLÉE**

### **🎮 FRONTENDS**

#### **Frontend Principal (`frontend/`)**
```
frontend/
├── index.html              # Interface principale
├── api.js                  # Appels API vers backend
├── script-console.js       # Console d'exécution scripts
├── game.js                 # Logique de jeu
└── styles.css             # Styles
```

**Utilisation :**
- **URL** : `http://localhost:8000`
- **Appelle** : Backend API `http://localhost:8080`
- **Scripts** : Envoyés au backend via `POST /api/game/{id}/script`

#### **Frontend Temporal (`frontend-temporal/`)**
```
frontend-temporal/
├── index.html              # Interface temporelle
├── js/temporal-engine.js   # Moteur temporel JS
├── css/temporal-console.css # Styles temporels
└── package.json           # Dépendances
```

**Utilisation :**
- **URL** : `http://localhost:3000`
- **Appelle** : Backend API `http://localhost:8080`
- **Scripts** : Interface spécialisée pour temporal

### **🔧 BACKEND**

#### **Services Principaux**
```
backend/src/main/java/com/heroesoftimepoc/temporalengine/service/
├── TemporalEngineService.java        # 🎯 SERVICE PRINCIPAL
├── TemporalScriptParser.java         # 📜 PARSER REGEX (ANCIEN)
├── AntlrTemporalScriptParser.java    # 🚀 PARSER ANTLR4 (NOUVEAU)
└── DualParserService.java            # 🔄 SERVICE DE COMPARAISON
```

#### **Tests**
```
backend/src/test/java/com/heroesoftimepoc/temporalengine/
├── TemporalScriptParserTest.java     # Tests parser REGEX
├── AntlrTemporalScriptParserTest.java # Tests parser ANTLR4
├── DualParserComparisonTest.java     # Tests comparaison
└── TemporalEngineServiceTest.java    # Tests service principal
```

---

## 🎯 **SYSTÈME DE SWITCH**

### **🔄 MÉCANISME TECHNIQUE**

```java
// Dans TemporalEngineService.java (ligne 41-43)
private final boolean useAntlrParser = Boolean.parseBoolean(
    System.getProperty("heroes.parser.use.antlr", "false")
);

// Usage dynamique dans executeScript() (ligne 56-60)
boolean isTemporalScript = useAntlrParser ? 
    antlrParser.isTemporalScript(scriptLine) :     // ← ANTLR4 
    temporalParser.isTemporalScript(scriptLine);   // ← REGEX
```

### **🚀 MÉTHODES POUR SWITCHER**

#### **Méthode 1 : Configuration par défaut**
```bash
# Par défaut = REGEX
mvn spring-boot:run
# Parser utilisé : TemporalScriptParser (REGEX)
```

#### **Méthode 2 : Switch vers ANTLR4**
```bash
# Utiliser ANTLR4
mvn spring-boot:run -Dheroes.parser.use.antlr=true
# Parser utilisé : AntlrTemporalScriptParser (ANTLR4)
```

#### **Méthode 3 : Tests avec switch**
```bash
# Tests REGEX (défaut)
mvn test -Dtest=TemporalScriptParserTest

# Tests ANTLR4
mvn test -Dtest=AntlrTemporalScriptParserTest  

# Tests comparaison (les deux)
mvn test -Dtest=DualParserComparisonTest
```

---

## 🧪 **RÉFÉRENCE COMPLÈTE DES TESTS**

### **📊 TESTS UNITAIRES**

| **Test** | **Parser** | **Fichier** | **Commande** |
|----------|------------|-------------|-------------|
| **REGEX Tests** | REGEX | `TemporalScriptParserTest.java` | `mvn test -Dtest=TemporalScriptParserTest` |
| **ANTLR Tests** | ANTLR4 | `AntlrTemporalScriptParserTest.java` | `mvn test -Dtest=AntlrTemporalScriptParserTest` |
| **Comparaison** | LES DEUX | `DualParserComparisonTest.java` | `mvn test -Dtest=DualParserComparisonTest` |
| **Service** | SELON CONFIG | `TemporalEngineServiceTest.java` | `mvn test -Dtest=TemporalEngineServiceTest` |

### **🎯 RÉSULTATS DES TESTS (ÉTAT ACTUEL)**

#### **Parser REGEX (Ancien)**
```
TemporalScriptParserTest : 14/14 (100%) ✅
```

#### **Parser ANTLR4 (Nouveau)**
```
AntlrTemporalScriptParserTest : En cours de développement
```

#### **Comparaison Dual Parser**
```
DualParserComparisonTest : 5/6 (83%) ⚠️
├── Scripts Basiques  : 100% ✅
├── Scripts HMM3      : 100% ✅ (2-3x plus rapide!)
├── Scripts Temporels : 50% ⚠️ (1 correctif nécessaire)
└── Détection Type    : 100% ✅
```

---

## 🎮 **UTILISATION DANS LE JEU**

### **🕹️ QUEL PARSER EST UTILISÉ ?**

#### **En Production (Jeu)**
```java
// Par défaut : REGEX
System.getProperty("heroes.parser.use.antlr", "false")
```
**✅ Le jeu utilise actuellement le parser REGEX**

#### **En Développement/Tests**
```bash
# Pour tester ANTLR4
mvn spring-boot:run -Dheroes.parser.use.antlr=true
```

### **🎯 SCRIPTS SUPPORTÉS**

#### **Scripts Basiques (100% compatibles)**
```javascript
// Frontend envoie ces scripts au backend
"HERO(Arthur)"
"MOV(Arthur, @10,15)"
"CREATE(CREATURE, Dragon, @20,20)"
"USE(ITEM, AvantWorldBlade, HERO:Arthur)"
"BATTLE(Arthur, Dragon)"
```

#### **Scripts HMM3 (100% compatibles + plus rapides avec ANTLR)**
```javascript
"BUILD(Castle, @50,50, PLAYER:RedPlayer)"
"RECRUIT(UNIT, Archers, 10, HERO:Arthur)"
"CAST(SPELL, Fireball, TARGET:Dragon, HERO:Wizard)"
"COLLECT(RESOURCE, Gold, 1000, PLAYER:Me)"
"EQUIP(ARTIFACT, CrownOfDragontooth, HERO:Arthur)"
```

#### **Scripts Temporels (50% compatibles avec ANTLR)**
```javascript
"ψ001: ⊙(Δt+2 @10,15 ⟶ MOV(Arthur, @10,15))"
"ψ002: ⊙(Δt+1 @20,20 ⟶ CREATE(CREATURE, Dragon, @20,20))"
"†ψ001"  // ✅ Fonctionne
"†ψ002"  // ✅ Fonctionne
```

---

## 🚀 **COMMANDES PRATIQUES**

### **🔧 DÉVELOPPEMENT**

#### **Lancer Backend avec REGEX (défaut)**
```bash
cd backend
mvn spring-boot:run
```

#### **Lancer Backend avec ANTLR4**
```bash
cd backend
mvn spring-boot:run -Dheroes.parser.use.antlr=true
```

#### **Lancer Frontends**
```bash
# Frontend principal
cd frontend
python -m http.server 8000

# Frontend temporal
cd frontend-temporal
npm start
```

### **🧪 TESTS**

#### **Tests individuels**
```bash
# Test parser REGEX
mvn test -Dtest=TemporalScriptParserTest

# Test parser ANTLR4
mvn test -Dtest=AntlrTemporalScriptParserTest

# Test comparaison
mvn test -Dtest=DualParserComparisonTest
```

#### **Tests complets**
```bash
# Tous les tests avec REGEX
mvn test

# Tous les tests avec ANTLR4
mvn test -Dheroes.parser.use.antlr=true
```

---

## 🎯 **STATUT ACTUEL ET RECOMMANDATIONS**

### **✅ CE QUI FONCTIONNE**

1. **Parser REGEX** : 100% fonctionnel, utilisé par défaut
2. **Parser ANTLR4** : 
   - ✅ Scripts basiques : 100%
   - ✅ Scripts HMM3 : 100% + 2-3x plus rapide !
   - ⚠️ Scripts temporels : 50% (1 correctif nécessaire)
3. **Dual Parser System** : Permet comparaison et migration sécurisée

### **🎯 RECOMMANDATIONS**

#### **Phase 1 - IMMÉDIAT**
- Continuer avec REGEX pour la production
- Utiliser ANTLR4 pour les nouveaux scripts HMM3 (gains de performance)

#### **Phase 2 - CORRECTION**
- Corriger le parser ANTLR4 pour les scripts temporels
- Atteindre 100% de compatibilité

#### **Phase 3 - MIGRATION**
- Migrer complètement vers ANTLR4
- Retirer le parser REGEX (optionnel)

---

## 🔍 **DEBUGGING ET MONITORING**

### **📊 LOGS DE SWITCH**

```bash
# Vérifier quel parser est utilisé
grep "useAntlrParser" backend/logs/application.log

# Voir les performances
grep "performance" backend/logs/application.log
```

### **🧪 VALIDATION**

```bash
# Valider que le switch fonctionne
curl -X POST http://localhost:8080/api/game/1/script \
  -H "Content-Type: application/json" \
  -d '{"script": "HERO(Arthur)"}'
```

---

*Guide complet mis à jour le 18 juillet 2025* 