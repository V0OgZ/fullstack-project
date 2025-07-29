# 🔌 RAPPORT BRANCHES ARCHITECTURE - MERLIN

**Date** : 2025-01-29  
**Par** : MERLIN  
**Style** : FORD (direct, pas de blabla)  

---

## ⚡ CE QUI SE BRANCHE RÉELLEMENT

### ✅ **BRANCHES CONNECTÉES**
```
TemporalEngineService
    ├─→ CausalCollapseService ✅
    ├─→ ArtifactEffectExecutor ✅
    ├─→ MagicFormulaEngine ✅
    └─→ QuantumService ✅ (via MagicFormulaEngine)
```

### ❌ **BRANCHES DÉCONNECTÉES**  
```
CausalityZoneService ⚠️
    ├─ calculateMovementZone() [PAS APPELÉ]
    ├─ calculateVisionZone() [PAS APPELÉ]
    ├─ calculateCausalityZone() [PAS APPELÉ]
    └─ fogOfCausality [PAS UTILISÉ]
```

---

## 🔧 PROBLÈMES IDENTIFIÉS

### **1. MUR CAUSAL NON BRANCHÉ**
- Service implémenté mais jamais appelé
- Les héros ignorent les limites temporelles
- Épée temporelle ne fait rien de spécial

### **2. FORMULES MIXTES**
```java
// MAUVAIS - Code dur
if (artifact.getName().equals("Excalibur")) {
    damage += 50;
}

// BON - Formule magique
executeFormula("EXCALIBUR_DAMAGE", context);
```

### **3. MULTI-BACKENDS**
- 3 versions dans NEXUS-TEMPOREL/FORGE-DES-REALITES
- backend-clean vs backend-emoji-broken
- Duplication de code

---

## 🎯 CE QUI MARCHE

### **MagicFormulaEngine → QuantumService**
```
REQUEST → FormulaController
    → MagicFormulaEngine.executeFormula()
        → QuantumService (états ψ)
            → Collapse → Result
```

### **WebSocket Temps Réel**
```
TemporalWebSocketController
    → MagicFormulaEngine
        → États ψ en temps réel
```

---

## 🚨 ACTION REQUISE (WALTER STYLE)

1. **BRANCHER CausalityZoneService**
   ```java
   // Dans TemporalEngineService.moveGameHero()
   CausalityZone zone = causalityZoneService.calculateMovementZone(hero, target);
   if (!zone.contains(target)) {
       throw new TemporalViolationException("Target outside causal zone!");
   }
   ```

2. **REMPLACER CODE DUR PAR FORMULES**
   - Migrer ArtifactEffectExecutor vers formules
   - Plus de if/else sur noms d'artefacts

3. **UNIFIER LES BACKENDS**
   - Un seul backend principal
   - Pas de duplication

---

*Rapport MERLIN - Actions concrètes, pas de philosophie* 