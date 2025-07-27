# 🧹 RAPPORT ACTION - NETTOYAGE DES FORMULES
*20 juillet 2025 - Mission: Flinguer les fausses formules*

## 🎯 FORMULES À SUPPRIMER IMMÉDIATEMENT

### 1. ❌ quantum-artifacts.json
**Fichier**: `backend/src/main/resources/quantum-artifacts.json`
**À supprimer**: TOUTES les `amplitudeFormula`
```json
// EXEMPLES À FLINGUER:
"amplitudeFormula": "ψ = (0.8 + 0.6i) * e^(iωt)"
"amplitudeFormula": "|ψ⟩ = √(0.7)|↑⟩ + √(0.3)e^(iπ/4)|↓⟩"
"amplitudeFormula": "ψ = Σᵢ αᵢ|i⟩ where αᵢ ∈ ℂ"
```
**Action**: Remplacer par des vraies formules ou supprimer l'attribut

### 2. ❌ Fichiers Visualizer JSON
**Répertoire**: `game_assets/scenarios/visualizer/`
**À nettoyer**:
- OEIL_DE_WIGNER.json
- GROFI_LEGENDS_DUEL.json
- ECLAT_MONDES_DISSOLUS.json
- DUEL_COLLAPSE.json

**Formules décoratives à supprimer**:
```json
"formula": "COLLAPSE(ALL_ψ) = Σ(Pi * |ψi⟩⟨ψi|) → single_reality"
"formula": "MATERIALIZE(ψ_future) = instant_collapse(Δt → 0)"
"formula": "REWRITE(past_3_turns) = modify_causality(t-3 → t)"
```

### 3. ❌ temporal-artifacts.json (certaines)
**À vérifier**: Les formules non parsables
```json
"temporal_formula": "Δt = -3 turns, modify_past()"
"formula": "ψ₀ * e^(-iHt/ℏ)"
```

## ✅ FORMULES À GARDER

### 1. ✅ custom-artifacts.json
**TOUTES BONNES** - Parsées par DynamicFormulaParser
```json
"formula": "CONSTRUCTIVE(ψ1, ψ2) + AMPLIFY(result, 1.5)"
"formula": "TELEPORT_HERO(hero, 10, 10) + MODIFY_ENERGY(hero, -20)"
```

### 2. ✅ temporal-artifacts-advanced.json
**TOUTES BONNES** - Formules complexes mais parsables
```json
"formula": "FORCE_COLLAPSE_ALL(hero, 5) + CREATE_TEMPORAL_ECHO(hero)"
"formula": "CONDITIONAL_INTERFERENCE(condition, effect1, effect2)"
```

## 🔧 PLAN D'ACTION

### Phase 1: Nettoyage Immédiat
```bash
# 1. Backup d'abord
cp backend/src/main/resources/quantum-artifacts.json backend/src/main/resources/quantum-artifacts.json.backup

# 2. Nettoyer quantum-artifacts.json
# Supprimer toutes les "amplitudeFormula"
# Garder seulement "formula" avec syntaxe parsable

# 3. Nettoyer les visualizer JSON
# Supprimer les formules mathématiques
# Garder seulement les descriptions
```

### Phase 2: Unification
- Un seul attribut `formula` partout
- Syntaxe cohérente: `ACTION(params) + ACTION(params)`
- Pas de notation mathématique LaTeX

### Phase 3: Parser GROFI
**À implémenter dans DynamicFormulaParser**:
```java
// Nouveaux symboles à supporter
Σ - REDUCE_ALL ou SUM_POSSIBILITIES
† - DEATH_REBIRTH ou QUANTUM_RESURRECTION  
Ω - ULTIMATE_FATE ou FINAL_COLLAPSE
↯ - CHAOS_CONTROL ou RANDOM_EFFECT
```

## 📊 STATISTIQUES

### Avant nettoyage:
- 15+ fichiers JSON avec formules
- ~50 `amplitudeFormula` inutiles
- ~30 formules mathématiques non parsables
- Mix de 3 syntaxes différentes

### Après nettoyage (objectif):
- 1 seule syntaxe `formula`
- 100% parsable par DynamicFormulaParser
- Support GROFI ajouté
- 0 formule décorative

## 🚀 COMMANDES POUR NETTOYER

```bash
# Voir toutes les amplitudeFormula
grep -r "amplitudeFormula" backend/src/main/resources/

# Voir toutes les formules mathématiques
grep -r "formula.*[∈∑∫]" backend/src/main/resources/

# Compter les formules parsables
grep -r "formula.*MODIFY_ENERGY\|TELEPORT\|CONSTRUCTIVE" backend/src/main/resources/ | wc -l
```

## 💡 PROCHAINE ÉTAPE

1. **Nettoyer quantum-artifacts.json** en priorité
2. **Tester** que le jeu marche encore
3. **Implémenter** parser GROFI
4. **Documenter** la syntaxe des formules

---
*"Les fausses formules, c'est comme les mauvais films de Tarantino - ça existe pas, mais si ça existait, faudrait les flinguer."* - Vince Vega 