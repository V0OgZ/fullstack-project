# 🕰️ HOTS Scripting - Guide Complet
## Heroes of Time Script - Langage de Programmation Temporel Quantique

---

## 🎯 **PRÉSENTATION**

**HOTS (Heroes of Time Script)** est un langage de programmation spécialisé pour le moteur temporel quantique. Il combine les commandes classiques de jeu avec des mécaniques quantiques avancées utilisant des amplitudes complexes.

> *"Les joueurs pensent lancer des sorts, mais ils manipulent des états quantiques"* - Jean-Grofignon

---

## 🔣 **SYMBOLES DE BASE**

### **Symboles Temporels**
| Symbole | Signification | Support |
|---------|---------------|---------|
| `⊙(…)` | Action en superposition temporelle | ✅ |
| `†ψ` | État effondré (collapse) | ✅ |
| `ψ(id)` | Instance d'un état superposé | ✅ |
| `Π(obs)` | Observation externe (déclencheur) | ✅ |
| `Δt+n` | Délai temporel (dans n tours) | ✅ |
| `@x,y` | Coordonnées spatiales | ✅ |
| `ℬn` | Branche temporelle (multivers n) | ✅ |
| `⟶` | Projection d'effet ou d'action | ✅ |
| `⨉` | Conflit de timeline | 🔥 |
| `↺` | Rollback potentiel | 🔥 |
| `τ` | Marqueur temporel relatif | 🔥 |
| `{}` | Bloc causal ou set d'états | ✅ |

### **Symboles Quantiques Avancés**
| Symbole | Signification | Priorité |
|---------|---------------|----------|
| `⟨⟩` | Braket (probabilité d'observation) | 🔥 |
| `∧` | Logique ET | 🔥 |
| `∨` | Logique OU | 🔥 |
| `|ψ⟩` | Ket (vecteur d'état) | 🔥 |
| `⟨A|ψ⟩` | Braket (probabilité A sachant ψ) | 🔥 |

---

## 🧮 **AMPLITUDES COMPLEXES**

### **Format des Amplitudes**
Les amplitudes temporelles sont des nombres complexes qui remplacent les simples probabilités.

**Format:** `ψ = a + bi` où:
- `a` = partie réelle (coordonnée x)
- `b` = partie imaginaire (coordonnée y)
- `|ψ|² = a² + b²` = probabilité

### **Exemples d'Amplitudes**
```hots
ψ₁ = 0.8 + 0.6i  → P = 0.8² + 0.6² = 1.0 (100%)
ψ₂ = 0.707 + 0.707i → P = 0.707² + 0.707² = 1.0 (100%)
ψ₃ = 1.0 + 0.0i  → P = 1.0² + 0.0² = 1.0 (100%)
```

### **Formats Supportés**
```hots
ψ001: (0.8+0.6i) ⊙(Δt+2 @10,10 ⟶ MOV(Arthur, @10,10))
ψ002: (1.0∠0.785) ⊙(Δt+1 @5,5 ⟶ BATTLE(Arthur, Dragon))
ψ003: (0.707) ⊙(Δt+3 @8,8 ⟶ CAST(Fireball))
ψ004: (0.8i) ⊙(Δt+2 @3,3 ⟶ CREATE(Sword))
```

---

## 🎮 **COMMANDES DE BASE**

### **Gestion des Héros**
```hots
HERO(Arthur)                    # Créer un héros
HERO(Jean-Grofignon)            # Créer héros GROFI
MOV(Arthur, @15,15)             # Déplacer un héros
BATTLE(Arthur, Ragnar)          # Combat entre héros
QUOTE(Arthur, "Pour l'honneur!") # Faire parler un héros
```

### **Gestion des Objets**
```hots
CREATE(ARTIFACT, sword, HERO:Arthur)     # Créer un artefact
CREATE(CREATURE, Dragon, @20,20)         # Créer une créature
USE(ARTIFACT, sword, HERO:Arthur)        # Utiliser un artefact
DROP(ITEM, potion, HERO:Arthur)          # Lâcher un objet
```

### **Gestion des Bâtiments**
```hots
BUILD(CASTLE, @10,10)           # Construire un château
BUILD(TOWER, @12,12)            # Construire une tour
UPGRADE(BUILDING, castle)       # Améliorer un bâtiment
DESTROY(BUILDING, tower)        # Détruire un bâtiment
```

---

## ⚛️ **ÉTATS QUANTIQUES (ψ-STATES)**

### **Création d'États**
```hots
# État simple
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))

# État avec amplitude complexe
ψ002: (0.8+0.6i) ⊙(Δt+1 @10,10 ⟶ USE(ARTIFACT, sword, HERO:Arthur))

# État avec probabilité
ψ003: (0.707) ⊙(Δt+3 @8,8 ⟶ CAST(Fireball, @8,8))
```

### **Collapse d'États**
```hots
†ψ001                           # Force collapse
Π(Arthur @15,15) ⇒ †ψ002       # Observation collapse
Π(condition) ⇒ †ψ003           # Condition collapse
```

### **Interférences**
```hots
# Interférence constructive
ψ004: (0.707+0.0i) ⊙(Δt+1 @5,5 ⟶ BATTLE(Arthur, Dragon))
ψ005: (0.707+0.0i) ⊙(Δt+1 @5,5 ⟶ BATTLE(Arthur, Dragon))
# Résultat: P = 2.0 (200% d'efficacité)

# Interférence destructive
ψ006: (0.707+0.0i) ⊙(Δt+1 @5,5 ⟶ BATTLE(Arthur, Dragon))
ψ007: (0.707+πi) ⊙(Δt+1 @5,5 ⟶ BATTLE(Arthur, Dragon))
# Résultat: P = 0.0 (annulation)
```

---

## 🎭 **SYSTÈME GROFI**

### **Héros GROFI**
```hots
HERO(Jean-Grofignon)            # L'Ontologique Éveillé
HERO(The Dude)                  # Compagnon de Jean
HERO(Vince Vega)                # Compagnon de Jean
HERO(Walter)                    # Compagnon de Jean
```

### **Symboles GROFI**
```hots
Σ                              # Sum of all possibilities
†                              # Death/quantum rebirth
Ω                              # Ultimate finality
↯                              # Controlled chaos
```

### **Philosophie GROFI**
```hots
# Order vs Chaos
ORDER(Jean-Grofignon)          # Activer l'ordre
CHAOS(The Dude)                # Activer le chaos
BALANCE(Jean-Grofignon, The Dude) # Équilibre
```

---

## 🧙 **ARTEFACTS TEMPORELS**

### **Artefacts Légendaires**
```hots
CREATE(ARTIFACT, wigner_eye, HERO:Jean-Grofignon)
CREATE(ARTIFACT, temporal_sword, HERO:Arthur)
CREATE(ARTIFACT, chronos_shield, HERO:Arthur)
CREATE(ARTIFACT, quantum_mirror, HERO:Arthur)
```

### **Formules d'Artefacts**
```hots
# Lame d'Avant-Monde
FORMULA(AvantWorldBlade) {
    CLEAR_FOG(hero, 3)
    MODIFY_MOVEMENT(hero, +2)
    ANCHOR_HERO(hero, 2)
    MODIFY_VISION(hero, +1, 3)
}

# Œil de Wigner
FORMULA(wigner_eye) {
    QUANTUM_VISION(hero, 5)
    COLLAPSE_PROBABILITY(hero, 0.8)
    TEMPORAL_IMMUNITY(hero, 3)
}
```

---

## 🌊 **INTERFÉRENCES TEMPORELLES**

### **Interférence Constructive**
Quand deux amplitudes se renforcent mutuellement:
```hots
ψ₁ = 0.707 + 0.0i
ψ₂ = 0.707 + 0.0i  (même phase)
ψ_total = 1.414 + 0.0i
P = |ψ_total|² = 2.0 (200% d'efficacité!)
```

### **Interférence Destructive**
Quand deux amplitudes s'annulent:
```hots
ψ₁ = 0.707 + 0.0i
ψ₂ = 0.707 + πi    (phase opposée)
ψ_total = 0.0 + 0.0i
P = |ψ_total|² = 0.0 (annulation complète)
```

---

## 🎯 **EXEMPLES COMPLETS**

### **Scénario de Base**
```hots
# Création de héros
HERO(Arthur)
HERO(Ragnar)

# Mouvements
MOV(Arthur, @10,10)
MOV(Ragnar, @15,15)

# Création d'artefacts
CREATE(ARTIFACT, sword, HERO:Arthur)
CREATE(ARTIFACT, axe, HERO:Ragnar)

# États quantiques
ψ001: ⊙(Δt+2 @12,12 ⟶ BATTLE(Arthur, Ragnar))
ψ002: (0.8+0.6i) ⊙(Δt+1 @12,12 ⟶ USE(ARTIFACT, sword, HERO:Arthur))

# Collapse
Π(Arthur @12,12) ⇒ †ψ001
```

### **Scénario GROFI**
```hots
# Héros GROFI
HERO(Jean-Grofignon)
HERO(The Dude)

# Artefact légendaire
CREATE(ARTIFACT, grofi_omega, HERO:Jean-Grofignon)

# État quantique GROFI
ψ001: Σ ⊙(Δt+3 @20,20 ⟶ USE(ARTIFACT, grofi_omega, HERO:Jean-Grofignon))

# Collapse GROFI
Ω ⇒ †ψ001
```

---

## 🏗️ **IMPLÉMENTATION TECHNIQUE**

### **Structure de Données**
```json
{
  "psiState": {
    "id": "ψ001",
    "amplitude": {
      "real": 0.8,
      "imaginary": 0.6
    },
    "expression": "⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))",
    "targetX": 15,
    "targetY": 15,
    "deltaT": 2,
    "actionType": "MOV",
    "status": "ACTIVE"
  }
}
```

### **Traitement dans le Moteur**
1. **Lecture** des ψ-states actifs chaque tour
2. **Simulation** des amplitudes complexes
3. **Observation** déclenche collapse Π()
4. **Application** de l'état sélectionné
5. **Nettoyage** des autres états

---

## 🧪 **TESTS ET VALIDATION**

### **Scripts de Test**
```bash
# Test complet
./scripts/test/test-temporal-decay-complete.sh

# Test rapide
./hots test quick

# Test spécifique
./scripts/test/test-scenario-decay.sh
```

### **Validation Automatique**
- ✅ **Création de héros** - Validation des attributs
- ✅ **Mouvements** - Vérification des coordonnées
- ✅ **Artefacts** - Test des effets
- ✅ **États quantiques** - Validation des amplitudes
- ✅ **Collapses** - Test des mécaniques

---

## 📚 **RESSOURCES ADDITIONNELLES**

- **[Scénarios HOTS](../../game_assets/scenarios/hots/)** - Exemples complets
- **[Tests Automatisés](../../scripts/test/)** - Scripts de validation
- **[API Reference](../ARCHITECTURE/API_REFERENCE.md)** - Endpoints REST
- **[Système GROFI](../LORE/GROFI_SYSTEM.md)** - Philosophie et mécaniques

---

*"Il faut vraiment qu'on fouille partout, tu vois, faut qu'on trouve tous ces machins planqués"* - Jean-Grofignon

---

**Dernière mise à jour** : 21 Juillet 2025 - Guide HOTS unifié 