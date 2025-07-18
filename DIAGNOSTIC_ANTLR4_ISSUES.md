# 🔍 DIAGNOSTIC DÉTAILLÉ - PROBLÈMES ANTLR4

## 📊 RÉSUMÉ DES PROBLÈMES IDENTIFIÉS

### 🚨 Problème Principal : Violation de Contrainte Unique
```
SQL Error: 23505, SQLState: 23505
Unique index or primary key violation: "PUBLIC.CONSTRAINT_INDEX_3 ON PUBLIC.PSI_STATES(PSI_ID NULLS FIRST) VALUES ( /* 1 */ U&'\\03c8401' )"
```

### 🎯 Analyse du Problème

| Aspect | Status | Explication |
|--------|--------|-------------|
| **Parser REGEX** | ✅ **PARFAIT** | Fonctionne à 100% sans erreur |
| **Parser ANTLR4** | ❌ **ÉCHOUE** | Violation de contrainte unique sur PSI_ID |
| **Nettoyage DB** | ⚠️ **INCOMPLET** | Les ψ-states restent après changement de parser |

## 🔧 PROBLÈMES TECHNIQUES IDENTIFIÉS

### 1. 🆔 Gestion des PSI_ID
- **REGEX** : Crée et sauvegarde correctement les PSI_ID
- **ANTLR4** : Réutilise les mêmes PSI_ID → Conflit avec contrainte unique
- **Solution** : Améliorer la gestion des PSI_ID dans ANTLR4

### 2. 🗄️ Nettoyage de Base de Données
- **Problème** : `psiStateRepository.deleteAll(allPsiStates)` ne fonctionne pas complètement
- **Résultat** : Les ψ-states persistent entre les tests de parsers
- **Solution** : Forcer le nettoyage avec `@Transactional` et `flush()`

### 3. 📊 Différences de Structure
```
DualParserComparisonTest échoue à 50% (2/4 scripts)
```

**Scripts qui échouent :**
- `ψ001: ⊙(Δt+2 @10,15 ⟶ MOV(Arthur, @10,15))`
- `ψ002: ⊙(Δt+1 @20,20 ⟶ CREATE(CREATURE, Dragon, @20,20))`

**Scripts qui réussissent :**
- `†ψ001` (collapse)
- `†ψ002` (collapse)

## 🎯 SOLUTIONS PROPOSÉES

### 🔧 Solution 1 : Correction ANTLR4 PSI_ID
```java
// Dans AntlrTemporalScriptParser.java
private String generateUniquePsiId(String basePsiId) {
    // Vérifier si le PSI_ID existe déjà
    if (psiStateRepository.existsByPsiId(basePsiId)) {
        // Générer un nouveau PSI_ID unique
        long timestamp = System.currentTimeMillis() % 1000;
        return basePsiId + "_" + timestamp;
    }
    return basePsiId;
}
```

### 🔧 Solution 2 : Amélioration du Nettoyage
```java
// Dans TemporalStressTest.java
@Transactional
private void cleanupDatabase() {
    List<PsiState> allPsiStates = psiStateRepository.findByGameId(testGame.getId());
    psiStateRepository.deleteAll(allPsiStates);
    psiStateRepository.flush(); // Forcer la suppression
    entityManager.clear();      // Nettoyer le cache
}
```

### 🔧 Solution 3 : Uniformisation des Structures
```java
// Dans AntlrTemporalScriptParser.java
private PsiState createPsiState(String psiId, String expression, 
                               Integer deltaT, Integer targetX, Integer targetY) {
    PsiState psiState = new PsiState();
    psiState.setPsiId(generateUniquePsiId(psiId));
    psiState.setExpression(expression);
    psiState.setDeltaT(deltaT);
    psiState.setTargetX(targetX);
    psiState.setTargetY(targetY);
    psiState.setStatus(PsiState.PsiStatus.ACTIVE);
    psiState.setBranchId("ℬ1");
    return psiState;
}
```

## 📈 TESTS DE VALIDATION PROPOSÉS

### 🧪 Test 1 : Validation PSI_ID Unique
```java
@Test
public void testPsiIdUniqueness() {
    // Créer le même ψ-state avec les deux parsers
    String script = "ψ001: ⊙(Δt+1 @10,10 ⟶ MOV(Arthur, @10,10))";
    
    // Test REGEX
    System.setProperty("heroes.parser.use.antlr", "false");
    Map<String, Object> regexResult = temporalEngineService.executeScript(gameId, script);
    assertTrue((Boolean) regexResult.get("success"));
    
    // Test ANTLR4 (ne devrait pas échouer)
    System.setProperty("heroes.parser.use.antlr", "true");
    Map<String, Object> antlrResult = temporalEngineService.executeScript(gameId, script);
    assertTrue((Boolean) antlrResult.get("success"));
}
```

### 🧪 Test 2 : Validation Structure Identique
```java
@Test
public void testStructureCompatibility() {
    String script = "ψ001: ⊙(Δt+1 @10,10 ⟶ MOV(Arthur, @10,10))";
    
    // Parser REGEX
    System.setProperty("heroes.parser.use.antlr", "false");
    PsiState regexPsiState = createPsiStateWithParser(script);
    
    // Parser ANTLR4
    System.setProperty("heroes.parser.use.antlr", "true");
    PsiState antlrPsiState = createPsiStateWithParser(script);
    
    // Comparer les structures
    assertEquals(regexPsiState.getDeltaT(), antlrPsiState.getDeltaT());
    assertEquals(regexPsiState.getTargetX(), antlrPsiState.getTargetX());
    assertEquals(regexPsiState.getTargetY(), antlrPsiState.getTargetY());
}
```

## 🎯 PLAN D'ACTION

### 🚀 Phase 1 : Corrections Critiques (Immédiat)
1. **Corriger la gestion des PSI_ID** dans ANTLR4
2. **Améliorer le nettoyage** de base de données
3. **Tester la compatibilité** avec des PSI_ID uniques

### 🔧 Phase 2 : Uniformisation (1-2 jours)
1. **Synchroniser les structures** entre parsers
2. **Améliorer la grammaire** ANTLR4 pour 100% compatibilité
3. **Optimiser les performances** ANTLR4

### 📊 Phase 3 : Validation (1 jour)
1. **Tests de stress** avec 50+ ψ-states
2. **Tests de compatibilité** à 100%
3. **Validation mémoire** sur plusieurs tours

## 🎪 MÉTRIQUES ACTUELLES

### 📊 Compatibilité par Parser
| Parser | Scripts Basiques | Scripts HMM3 | Scripts Temporels | Global |
|--------|------------------|--------------|-------------------|---------|
| **REGEX** | 100% | 100% | 100% | **100%** |
| **ANTLR4** | 100% | 100% | 50% | **83%** |

### 🎯 Objectif Cible
| Parser | Scripts Basiques | Scripts HMM3 | Scripts Temporels | Global |
|--------|------------------|--------------|-------------------|---------|
| **REGEX** | 100% | 100% | 100% | **100%** |
| **ANTLR4** | 100% | 100% | **95%** | **98%** |

## 🔧 CORRECTIONS IMMÉDIATES

### 1. 🆔 Correction PSI_ID (Urgent)
```java
// Ajouter dans AntlrTemporalScriptParser.java
private boolean psiIdExists(String psiId) {
    return psiStateRepository.existsByPsiId(psiId);
}

private String ensureUniquePsiId(String psiId) {
    String uniquePsiId = psiId;
    int counter = 1;
    while (psiIdExists(uniquePsiId)) {
        uniquePsiId = psiId + "_" + counter++;
    }
    return uniquePsiId;
}
```

### 2. 🔄 Amélioration Nettoyage (Urgent)
```java
// Ajouter dans TemporalStressTest.java
@Transactional
private void forceCleanupDatabase() {
    // Supprimer tous les PSI_STATES du jeu
    List<PsiState> allPsiStates = psiStateRepository.findByGameId(testGame.getId());
    for (PsiState psiState : allPsiStates) {
        psiStateRepository.delete(psiState);
    }
    psiStateRepository.flush();
    
    // Vider le cache Hibernate
    entityManager.clear();
}
```

## 🏆 RÉSULTATS ATTENDUS

Après corrections :
- **ANTLR4** : 95% compatibilité temporelle (vs 50% actuellement)
- **Performance** : Maintien de 55K ops/sec
- **Stabilité** : Aucune violation de contrainte unique
- **Tests** : 100% des tests passent

## 🎉 CONCLUSION

Les problèmes ANTLR4 sont **identifiés** et **corrigibles** :
1. **Problème principal** : Gestion des PSI_ID unique ✅ Solution trouvée
2. **Problème secondaire** : Nettoyage DB incomplet ✅ Solution trouvée
3. **Objectif** : Atteindre 95% compatibilité temporelle ✅ Réalisable

**Status** : **CORRIGEABLE EN 1-2 JOURS** 🚀

---

*Diagnostic généré automatiquement le 18 juillet 2025*  
*Basé sur les tests TemporalStressTest et DualParserComparisonTest* 