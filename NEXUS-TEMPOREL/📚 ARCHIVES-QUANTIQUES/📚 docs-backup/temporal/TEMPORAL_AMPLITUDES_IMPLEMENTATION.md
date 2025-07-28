# 🌌 Amplitudes Complexes dans Heroes of Time

## Vue d'ensemble

Heroes of Time implémente maintenant un véritable système d'amplitudes complexes quantiques, permettant de passer des probabilités classiques (P) aux amplitudes complexes (ψ = a + bi) avec calcul d'interférence.

## 🎯 Avantages des Amplitudes Complexes

### Probabilités Classiques (Ancien)
```
P = 0.8 (probabilité simple)
Pas d'interférence possible
```

### Amplitudes Complexes (Nouveau)
```
ψ = 0.8 + 0.6i (amplitude complexe)
|ψ|² = 0.8² + 0.6² = 1.0 (probabilité calculée)
Interférence constructive/destructive possible
```

## 🔧 Architecture Technique

### 1. Classe `ComplexAmplitude`
- Représente ψ = a + bi
- Méthodes: `getProbability()`, `getMagnitude()`, `getPhase()`
- Calculs d'interférence intégrés

### 2. Classe `PsiState` étendue
- Champ `complexAmplitude` (optionnel)
- Champ `useComplexAmplitude` (flag de migration)
- Rétrocompatibilité avec les probabilités classiques

### 3. Parser étendu
- Syntaxe: `ψ001: (0.8+0.6i) ⊙(Δt+2 @10,10 ⟶ MOV(Arthur, @10,10))`
- Formats supportés: cartésien, polaire, réel, imaginaire

### 4. Services quantiques
- `QuantumInterferenceService`: calculs d'interférence
- `QuantumMigrationService`: migration progressive

## 📝 Syntaxe des Amplitudes

### Formats supportés

```bash
# Cartésien
ψ001: (0.8+0.6i) ⊙(...)   # 0.8 + 0.6i
ψ002: (0.8-0.6i) ⊙(...)   # 0.8 - 0.6i

# Réel pur
ψ003: (1.0) ⊙(...)        # 1.0 + 0.0i

# Imaginaire pur
ψ004: (0.8i) ⊙(...)       # 0.0 + 0.8i

# Polaire
ψ005: (1.0∠0.5) ⊙(...)    # magnitude=1.0, phase=0.5 rad
```

## 🧮 Calculs d'Interférence

### Interférence Constructive
```
ψ₁ = 0.707 + 0.0i
ψ₂ = 0.707 + 0.0i
ψ_total = ψ₁ + ψ₂ = 1.414 + 0.0i
P = |ψ_total|² = 2.0 (amplification!)
```

### Interférence Destructive
```
ψ₁ = 0.707 + 0.0i
ψ₂ = -0.707 + 0.0i
ψ_total = ψ₁ + ψ₂ = 0.0 + 0.0i
P = |ψ_total|² = 0.0 (annulation!)
```

### Interférence Complexe
```
ψ₁ = 0.5 + 0.866i  (phase 60°)
ψ₂ = 0.866 + 0.5i  (phase 30°)
ψ_total = 1.366 + 1.366i
P = |ψ_total|² = 3.73 (pattern complexe)
```

## 🚀 Migration Progressive

### Analyse de compatibilité
```bash
GET /api/quantum/analysis/{gameId}
```

### Migration automatique
```bash
POST /api/quantum/migrate/{gameId}
```

### Test de migration
```bash
POST /api/quantum/test-migration/{gameId}
```

## 🎮 Exemples d'Usage

### Exemple 1: Mouvement avec Interférence
```bash
# Deux PsiStates au même endroit
ψ001: (0.8+0.6i) ⊙(Δt+2 @10,10 ⟶ MOV(Arthur, @10,10))
ψ002: (0.6+0.8i) ⊙(Δt+2 @10,10 ⟶ MOV(Arthur, @10,10))

# Résultat: interférence automatique
# ψ_total = 1.4 + 1.4i
# P = 3.92 (amplification massive!)
```

### Exemple 2: Combat Quantique
```bash
# Combat avec amplitudes complexes
ψ003: (0.707+0.707i) ⊙(Δt+4 @12,12 ⟶ BATTLE(Arthur, DragonRouge))

# Résultat: P = 1.0 mais avec phase quantique
# Effets spéciaux selon l'interférence
```

### Exemple 3: Annulation Parfaite
```bash
# Deux actions opposées
ψ004: (1.0+0.0i) ⊙(Δt+1 @15,15 ⟶ MOV(Arthur, @15,15))
ψ005: (-1.0+0.0i) ⊙(Δt+1 @15,15 ⟶ MOV(Arthur, @15,15))

# Résultat: P = 0.0 (action annulée!)
```

## 🔬 Mécaniques de Jeu

### Modificateurs d'Interférence

| Type | Succès | Dégâts | Énergie |
|------|--------|--------|---------|
| Constructive | +100% | +50% | -30% |
| Destructive | -90% | -50% | +50% |
| Complexe | Variable | Variable | Variable |

### Effets Spéciaux

- **AMPLIFICATION**: Effets doublés
- **CANCELLATION**: Effets annulés
- **QUANTUM_UNCERTAINTY**: Effets imprévisibles

## 🧪 Tests et Validation

### Test d'Interférence
```java
@Test
public void testQuantumInterference() {
    ComplexAmplitude amp1 = new ComplexAmplitude(0.8, 0.6);
    ComplexAmplitude amp2 = new ComplexAmplitude(0.6, 0.8);
    
    ComplexAmplitude result = amp1.add(amp2);
    
    assertEquals(1.4, result.getRealPart(), 0.001);
    assertEquals(1.4, result.getImaginaryPart(), 0.001);
    assertEquals(3.92, result.getProbability(), 0.01);
}
```

### Validation de Migration
```java
@Test
public void testMigrationCompatibility() {
    PsiState classicState = new PsiState();
    classicState.setProbability(0.8);
    
    migrationService.migratePsiStateToComplexAmplitude(classicState);
    
    assertTrue(classicState.isUsingComplexAmplitude());
    assertEquals(0.8, classicState.getEffectiveProbability(), 0.001);
}
```

## 🎛️ API Endpoints

### Gestion des Amplitudes
```
POST /api/temporal/execute
Content-Type: application/json
{
  "gameId": 1,
  "script": "ψ001: (0.8+0.6i) ⊙(Δt+2 @10,10 ⟶ MOV(Arthur, @10,10))"
}
```

### Analyse d'Interférence
```
GET /api/quantum/analysis/{gameId}
Response: {
  "totalComplexStates": 5,
  "totalClassicStates": 3,
  "interferenceZones": [
    {
      "position": {"x": 10, "y": 10},
      "stateCount": 2,
      "type": "CONSTRUCTIVE",
      "combinedProbability": 2.0
    }
  ]
}
```

### Création de Scénarios
```
POST /api/quantum/scenario
{
  "gameId": 1,
  "position": {"x": 10, "y": 10},
  "amplitudes": [
    {"realPart": 0.8, "imaginaryPart": 0.6},
    {"realPart": 0.6, "imaginaryPart": 0.8}
  ]
}
```

## 🔄 Compatibilité et Migration

### Modes de Fonctionnement

1. **Mode Classique**: Probabilités simples (ancien)
2. **Mode Hybride**: Mélange probabilités/amplitudes
3. **Mode Quantique**: Amplitudes complexes pures

### Migration Automatique

Le système détecte automatiquement les opportunités d'interférence et propose la migration vers les amplitudes complexes.

### Rétrocompatibilité

Tous les anciens scripts continuent à fonctionner. Les nouvelles fonctionnalités sont opt-in.

## 🌟 Avantages Stratégiques

### Pour les Joueurs
- Stratégies plus complexes
- Interférences tactiques
- Combinaisons d'actions impossibles avant

### Pour les Développeurs
- Système extensible
- Calculs physiquement corrects
- Mécaniques émergentes

## 📊 Métriques et Performance

### Complexité Calculatoire
- Probabilités classiques: O(1)
- Amplitudes complexes: O(n) où n = nombre d'interférences
- Optimisations: cache des calculs, lazy evaluation

### Impact Mémoire
- +16 bytes par PsiState (real, imaginary)
- +1 byte par PsiState (flag useComplexAmplitude)
- Négligeable pour la plupart des cas

## 🎯 Conclusion

L'implémentation des amplitudes complexes dans Heroes of Time ouvre de nouvelles possibilités stratégiques tout en maintenant la compatibilité avec l'existant. Le système permet une transition progressive vers une mécanique quantique plus riche et plus réaliste.

**🚀 Prêt pour l'avenir quantique !** 