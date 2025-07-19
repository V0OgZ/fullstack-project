# 📜 GRAMMAIRE HOTS - DOCUMENTATION COMPLÈTE
## Heroes of Time Script Language - Référence du Parser

> *"Le jeu est une suite d'incantations syntaxiques sur un monde fluide."*

---

## 🔮 **ÉTATS QUANTIQUES (ψ-STATES)**

### **Format Basique**
```hots
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
```
- `ψ001` : Identifiant de l'état quantique (ψ + nombre)
- `⊙(...)` : Enveloppe d'observation quantique
- `Δt+2` : Délai temporel (+/- nombre de tours)
- `@15,15` : Position cible (x,y)
- `⟶` : Opérateur de transition vers l'action

### **Format avec Amplitude Complexe**
```hots
ψ002: (0.8+0.6i) ⊙(Δt+1 @10,10 ⟶ CREATE(CREATURE, Dragon))
```
- `(0.8+0.6i)` : Amplitude complexe (réel + imaginaire*i)
- Formats supportés : `0.5+0.3i`, `0.7-0.2i`, `1.0`, `0.5i`
- Format polaire : `0.9∠1.57` (magnitude∠phase)

---

## ⚡ **ACTIONS BASIQUES**

### **Héros et Mouvement**
```hots
HERO(Arthur)                           # Créer un héros
MOV(Arthur, @10,15)                   # Déplacer un héros
```

### **Création d'Entités**
```hots
CREATE(CREATURE, Dragon)              # Créer une créature
CREATE(ITEM, MagicSword, Arthur)      # Créer un item pour un héros
CREATE(BUILDING, Tower, @5,5)         # Créer un bâtiment
```

### **Utilisation d'Objets**
```hots
USE(ITEM, MagicSword, HERO:Arthur)    # Utiliser un item
USE(ARTIFACT, temporal_sword, HERO:Arthur)
```

### **Combat**
```hots
BATTLE(Arthur, Merlin)                # Combat entre héros
BATTLE(Arthur, Dragon)                # Combat contre créature
```

---

## 🏰 **ACTIONS HEROES OF MIGHT & MAGIC 3**

### **Construction et Collecte**
```hots
BUILD(BUILDING, Castle, @10,10, PLAYER:P1)
COLLECT(RESOURCE, 100, PLAYER:P1)
```

### **Unités et Sorts**
```hots
RECRUIT(UNIT, Archer, 50, HERO:Arthur)
CAST(SPELL, Fireball, TARGET:Dragon, HERO:Merlin)
LEARN(SPELL, Lightning, HERO:Merlin)
```

### **Développement et Exploration**
```hots
LEVELUP(Arthur, SKILL:Leadership)
EXPLORE(RESOURCE, @20,20, HERO:Arthur)
EQUIP(ARTIFACT, MagicSword, HERO:Arthur)
```

### **Stratégie Avancée**
```hots
SIEGE(Castle, @15,15, HERO:Arthur)
CAPTURE(OBJECTIVE, Tower, HERO:Arthur)
```

---

## 💥 **EFFONDREMENT QUANTIQUE (COLLAPSE)**

### **Collapse Basique**
```hots
†ψ001                                 # Effondrer l'état ψ001
```

### **Observation Conditionnelle**
```hots
Π(condition) ⇒ †ψ002                  # Si condition alors collapse
```

---

## 🌀 **SYMBOLES QUANTIQUES SUPPORTÉS**

| Symbole | Nom | Usage |
|---------|-----|-------|
| `ψ` | Psi | Identifiant d'état quantique |
| `⊙` | Observation | Enveloppe d'observation |
| `Δt` | Delta-t | Décalage temporel |
| `@` | Position | Coordonnées x,y |
| `⟶` | Transition | Flèche vers action |
| `†` | Collapse | Effondrement d'état |
| `Π` | Pi | Condition logique |
| `ℬ` | Branche | Identifiant de timeline (défaut: ℬ1) |

---

## 🔍 **DÉTECTION DE SCRIPT TEMPOREL**

Un script est considéré comme temporel s'il contient :
- Un état ψ : `ψ001: ...`
- Un collapse : `†ψ001`
- Une observation : `Π(...)`

---

## ✅ **EXEMPLES VALIDES**

### **Mouvement Temporel**
```hots
ψ001: ⊙(Δt+1 @5,5 ⟶ MOV(Arthur, @5,5))
†ψ001
```

### **Création avec Amplitude**
```hots
ψ002: (0.707+0.707i) ⊙(Δt+2 @10,10 ⟶ CREATE(CREATURE, Phoenix))
```

### **Combat Complexe**
```hots
ψ003: ⊙(Δt+1 @15,15 ⟶ BATTLE(Arthur, Dragon))
Π(Arthur.health > 50) ⇒ †ψ003
```

---

## ❌ **SYNTAXES NON SUPPORTÉES**

Ces syntaxes sont présentes dans certains scripts mais **NON SUPPORTÉES** par le parser :

```hots
# ❌ Logique complexe
⟨ψ003 ∧ ψ004 ∧ ψ005 | OBSERVE(Morgana) ⟩ → †ψ003

# ❌ Branchement explicite  
BRANCH(TimeLine_A): ψ007: ⊙(...)

# ❌ Probabilité explicite
ψ016: ⊙(Δt+1 P=0.85 @11,10 ⟶ BATTLE(Morgana, Dragon))

# ❌ Commandes de rewind
REWIND(2)
```

---

## 🛠️ **LIMITATIONS ACTUELLES**

1. **Une seule timeline** : Toujours `ℬ1` par défaut
2. **Pas de branchement** : Pas de support pour `BRANCH(...)`
3. **Pas de logique complexe** : Pas d'opérateurs `∧`, `∨`, `⟨⟩`
4. **Observations simples** : Format `Π(...) ⇒ †ψ` uniquement

---

## 📋 **ORDRE DE TRAITEMENT**

1. Détection de script temporel
2. Parse d'amplitude complexe si présente
3. Parse de l'expression interne (Δt, position, action)
4. Création de PsiState avec propriétés quantiques
5. Exécution différée selon Δt

---

## 🚀 **RECOMMANDATIONS**

- **Utiliser** le format basique pour la compatibilité maximum
- **Éviter** les syntaxes complexes non supportées
- **Tester** avec des amplitudes complexes pour les calculs avancés  
- **Respecter** la séquence création → observation → collapse