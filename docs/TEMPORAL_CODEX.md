# 🕰️ HEROES OF TIME – CODEX TEMPORAL COMPLET
**Version :** V3.0 – Codex Unifié Temporal + Amplitudes Complexes  
**Dernière mise à jour :** 2025-07-18

---

## 📋 Table des Matières

1. [Concept Général](#-concept-général)
2. [Amplitudes Complexes](#-amplitudes-complexes)
3. [Système de Temporalité](#-système-de-temporalité--causalité)
4. [Interférences Temporelles](#-interférences-temporelles)
5. [Artefacts Temporels](#️-artefacts-temporels)
6. [Créatures Temporelles](#-créatures-temporelles)
7. [Exemples Pratiques](#-exemples-pratiques)
8. [Implémentation Technique](#-implémentation-technique)

---

## 🔷 Concept Général

*Heroes of Time* est un jeu de stratégie **temporal** combinant les mécaniques classiques de **Heroes of Might & Magic 3** avec un système de **temporalité avancé** utilisant les **amplitudes complexes**.

### Principes Fondamentaux

- **Timelines Asynchrones** : Chaque joueur évolue dans sa propre timeline
- **Amplitudes Complexes** : `ψ = a + bi` remplace les simples probabilités
- **Superposition Temporelle** : Les actions futures existent en état de probabilité (ψ-states)
- **Interférences** : Constructives (P > 1.0) et destructives (P = 0.0)
- **Artefacts Temporels** : Permettent de lire, écrire ou réécrire la réalité

---

## 🧮 Amplitudes Complexes

### 1. Format des Amplitudes
Les amplitudes temporelles sont des nombres complexes qui remplacent les simples probabilités.

**Format:** `ψ = a + bi` où:
- `a` = partie réelle (coordonnée x)
- `b` = partie imaginaire (coordonnée y)
- `|ψ|² = a² + b²` = probabilité

**Exemples concrets:**
```
ψ₁ = 0.8 + 0.6i  → P = 0.8² + 0.6² = 1.0 (100%)
ψ₂ = 0.707 + 0.707i → P = 0.707² + 0.707² = 1.0 (100%)
ψ₃ = 1.0 + 0.0i  → P = 1.0² + 0.0² = 1.0 (100%)
```

### 2. Formats Supportés
```
ψ001: (0.8+0.6i) ⊙(Δt+2 @10,10 ⟶ MOV(Arthur, @10,10))
ψ002: (1.0∠0.785) ⊙(Δt+1 @5,5 ⟶ BATTLE(Arthur, Dragon))
ψ003: (0.707) ⊙(Δt+3 @8,8 ⟶ CAST(Fireball))
ψ004: (0.8i) ⊙(Δt+2 @3,3 ⟶ CREATE(Sword))
```

---

## 🧬 Système de Temporalité & Causalité

### ⏳ Modèle Temporel

#### Architecture des Timelines

```java
public class Timeline {
    private String id;              // ℬ1, ℬ2, ℬ3...
    private int currentTurn;        // Tour actuel
    private String playerId;        // Joueur propriétaire
    private List<PsiState> states;  // États temporels
    private Timeline parent;        // Timeline d'origine (fork)
}
```

#### États Temporels (ψ-states)

```java
public class PsiState {
    private String psiId;           // ψ001, ψ002...
    private ComplexAmplitude amplitude;  // a + bi
    private String expression;      // Action à exécuter
    private Integer targetX, targetY;    // Position cible
    private Integer deltaT;         // Délai temporel
    private String actionType;      // MOV, BATTLE, CAST...
}
```

---

## 🌊 Interférences Temporelles

### 🔺 Interférence Constructive
Quand deux amplitudes se renforcent mutuellement:
```
ψ₁ = 0.707 + 0.0i
ψ₂ = 0.707 + 0.0i  (même phase)
ψ_total = 1.414 + 0.0i
P = |ψ_total|² = 2.0 (200% d'efficacité!)
```

**Effet en jeu:** Dégâts doublés, succès garanti, bonus d'énergie

### 🔻 Interférence Destructive
Quand deux amplitudes s'annulent:
```
ψ₁ = 0.707 + 0.0i
ψ₂ = -0.707 + 0.0i  (phases opposées)
ψ_total = 0.0 + 0.0i
P = |ψ_total|² = 0.0 (annulation totale!)
```

**Effet en jeu:** Attaque bloquée, action échouée, invincibilité temporaire

### 🌀 Interférence Complexe
Interférence avec phases différentes:
```
ψ₁ = 0.6 + 0.8i
ψ₂ = 0.8 + 0.6i
ψ_total = 1.4 + 1.4i
P = |ψ_total|² = 3.92 (392% d'efficacité!)
```

**Effet en jeu:** Amplification massive, effets critiques, transcendance temporaire

### Mécaniques de Combat
#### ⚔️ Combat Temporal
Les dégâts se calculent: `Dégâts = Base × √P`
```
Base = 50 dégâts
P = 2.0 (interférence constructive)
Dégâts = 50 × √2.0 = 70.7 dégâts
```

#### 🛡️ Défense Temporelle
Absorption = `Base × (1 - P/4)`
```
Base = 20 défense
P = 0.5 (interférence destructive)
Défense = 20 × (1 - 0.5/4) = 17.5
```

---

## 🗡️ Artefacts Temporels

### Tier 1-5 : Artefacts Classiques
- **Temporels** : Manipulation basique du temps
- **Rares** : Effets localisés
- **Épiques** : Effets étendus
- **Légendaires** : Effets majeurs

### Tier 6-8 : Artefacts Paradoxes
- **👑 Couronne de Superposition** (Tier 6) : Leadership temporal
- **⚔️ Épée d'Amplitude Pure** (Tier 6) : Coupe à travers les phases
- **🛡️ Bouclier d'Interférence** (Tier 6) : Réflexion d'amplitudes
- **🔮 Orbe de Probabilité Absolue** (Tier 7) : Contrôle P directement
- **💖 Cœur Temporel** (Tier 7) : Superposition vitale
- **⚓ Ancre de Réalité** (Tier 8) : Supprime les effets temporels
- **📖 Codex de l'Infini** (Tier 8) : Omniscience temporelle

---

## 🐉 Créatures Temporelles

### Tier 1-2 : Créatures Basiques
- **🧚‍♀️ Luciole Temporelle** : Champ de cohérence
- **🕷️ Araignée des Probabilités** : Toiles probabilistes
- **⚔️ Chevalier Temporal** : Charge superposée
- **🐲 Dragon de Phase** : Souffle multiphase

### Tier 3-4 : Créatures Paradoxes
- **💀 Liche Temporelle** : Superposition vie/mort
- **⚡ Élémentaire d'Amplitude** : Résonance adaptative
- **🔥 Phénix Temporal** : Renaissance temporelle
- **👑 Archonte des Probabilités** : Contrôle cosmique

---

## 🔬 Exemples Pratiques

### Bataille Temporelle Complète
```
# Tour 1: Création d'états superposés
ψ001: (0.8+0.6i) ⊙(Δt+1 @5,5 ⟶ BATTLE(Arthur, Dragon))
ψ002: (0.6+0.8i) ⊙(Δt+1 @5,5 ⟶ CAST(Fireball))

# Interférence automatique calculée
Résultat: ψ_total = 1.4 + 1.4i, P = 3.92
Dégâts = (50 + 30) × √3.92 = 158 dégâts!
```

### Stratégie Défensive
```
# Créer mur d'interférence destructive
ψ003: (1.0+0.0i) ⊙(Δt+1 @3,3 ⟶ DEFEND(Castle))
ψ004: (-1.0+0.0i) ⊙(Δt+1 @3,3 ⟶ DEFEND(Castle))

# Résultat: P = 0.0, invincibilité temporaire
```

### Combo Temporal
```
# Phase 1: Amplification
ψ_setup: (0.707+0.707i) ⊙(Δt+1 @10,10 ⟶ ENHANCE(Arthur))

# Phase 2: Attaque résonnante
ψ_attack: (0.8+0.6i) ⊙(Δt+2 @10,10 ⟶ ULTIMATE(Arthur))

# Phase 3: Guérison temporelle
ψ_heal: (0.9+0.436i) ⊙(Δt+3 @10,10 ⟶ HEAL(Arthur))
```

---

## 🌐 Applications Avancées

### Téléportation Temporelle
```
# Superposition spatiale
ψ_teleport: (0.577+0.577i) ⊙(Δt+1 @[1,1|10,10] ⟶ MOV(Hero))
# Le héros existe simultanément aux deux positions
```

### Dédoublement Temporel
```
# Créer timeline parallèle
ψ_fork: (0.707+0.0i) ⊙(Δt+1 ⟶ FORK_TIMELINE(Hero))
# Deux versions du héros coexistent
```

### Prophétie Temporelle
```
# Prédiction probabiliste
ψ_vision: (0.8+0.6i) ⊙(Δt+5 @?,? ⟶ OBSERVE(Future))
# Révèle les futurs possibles avec leurs probabilités
```

---

## 🎯 Optimisation Stratégique

### Maximiser les Interférences
1. **Synchroniser les phases** pour constructive
2. **Opposer les phases** pour destructive
3. **Créer des résonances** avec artefacts
4. **Exploiter les amplifications** P > 2.0

### Contrôle du Tempo
```
# Séquence optimisée
Δt+1: Setup (amplitudes de base)
Δt+2: Amplification (interférences)
Δt+3: Exécution (collapse optimal)
```

### Gestion des Ressources
- **Énergie temporelle** = coût des amplitudes
- **Cohérence temporelle** = stabilité des états
- **Entropie** = dégradation naturelle

---

## 🔧 Implémentation Technique

### Calculs Temporels

#### Probabilité Combinée
```java
public double calculateCombinedProbability(List<ComplexAmplitude> amplitudes) {
    ComplexAmplitude total = amplitudes.stream()
        .reduce(ComplexAmplitude.ZERO, ComplexAmplitude::add);
    return total.getProbability(); // |ψ_total|²
}
```

#### Évolution Temporelle
```java
public ComplexAmplitude evolveInTime(ComplexAmplitude psi0, double time) {
    // ψ(t) = ψ₀ * e^(-iEt/ℏ)
    double phase = -energy * time / PLANCK_CONSTANT;
    return psi0.multiply(ComplexAmplitude.fromPolar(1.0, phase));
}
```

#### Interférence
```java
public InterferenceResult calculateInterference(List<PsiState> states) {
    ComplexAmplitude total = states.stream()
        .map(PsiState::getComplexAmplitude)
        .reduce(ComplexAmplitude.ZERO, ComplexAmplitude::add);
    
    double probability = total.getProbability();
    InterferenceType type = determineInterferenceType(probability);
    
    return new InterferenceResult(total, probability, type);
}
```

---

## 🚀 Méta-Stratégies

### Contre-Jeu Temporal
- **Ancres de réalité** vs superposition
- **Suppression temporelle** vs amplification
- **Décohérence forcée** vs états stables

### Synergies d'Équipe
- **Amplification croisée** entre héros
- **Champs de cohérence** collectifs
- **Interférences coordonnées** à grande échelle

### Évolution Temporelle
- **Apprentissage adaptatif** des amplitudes
- **Optimisation automatique** des phases
- **Transcendance progressive** vers états supérieurs

---

**🎯 "La maîtrise des amplitudes complexes ouvre la voie vers des stratégies impossibles avec les simples probabilités classiques."**

*Ce codex unifié combine tous les aspects temporels de Heroes of Time en un seul guide complet.*