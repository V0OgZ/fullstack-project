# 🏆 GUIDE COMPLET DES ARTEFACTS - HEROES OF TIME

**Version:** 1.0 - Consolidé  
**Dernière mise à jour:** 18 Juillet 2025  

## 📋 **Index des Artefacts**

### 🎯 **Artefacts par Tier**

| Tier | Nom | Rareté | Type | Statut JSON |
|------|-----|--------|------|-------------|
| 2 | Épée Temporelle | Rare | Arme | ❌ Manquant |
| 3 | Orbe Mystique | Épique | Magie | ❌ Manquant |
| 3 | Horloge Inversée | Épique | Temporel | ❌ Manquant |
| 4 | Bâton Chrono | Épique | Magie | ❌ Manquant |
| 4 | Horloge du Dernier Instant | Légendaire | Temporel | ✅ Défini |
| 4 | Balise d'Ignorance Temporelle | Légendaire | Utilitaire | ✅ Défini |
| 5 | Lame de l'Avant-Monde | Paradoxe | Arme | ✅ Défini |
| 5 | Éclat d'Entropie | Paradoxe | Magie | ✅ Défini |
| 6 | 👑 Couronne de Superposition | Légendaire | Tête | ✅ Défini |
| 6 | ⚔️ Épée d'Amplitude Pure | Légendaire | Arme | ✅ Défini |
| 6 | 🔮 Orbe de Probabilité Absolue | Légendaire | Magie | ✅ Défini |
| 6 | ⚓ Ancre de Réalité | Légendaire | Structure | ✅ Défini |
| 6 | 🛡️ Bouclier d'Interférence | Légendaire | Bouclier | ✅ Défini |
| 6 | 💖 Cœur Quantique | Légendaire | Artefact | ✅ Défini |
| 6 | 📖 Codex de l'Infini | Légendaire | Livre | ✅ Défini |

**Total:** 15 artefacts (11 définis en JSON, 4 manquants)

---

## 🏆 **TIER 6 - ARTEFACTS QUANTIQUES LÉGENDAIRES**

### 👑 **Couronne de Superposition**
```json
{
  "id": "superposition_crown",
  "name": "👑 Couronne de Superposition",
  "tier": 6,
  "rarity": "Légendaire",
  "slot": "HEAD"
}
```

**🌀 Amplitude Quantique:** `(0.8+0.6i) * e^(iωt)`
- **Formule:** Évolution temporelle avec fréquence ω
- **Pattern:** Interférence CONSTRUCTIVE
- **Cohérence:** 10 tours, Décohérence: 0.05/tour

**📊 Statistiques:**
- ⚡ Énergie Temporelle: +150
- 🔮 Pouvoir Magique: +30
- 🧠 Sagesse: +25
- 👥 Leadership: +20

**🔮 Capacités Quantiques:**
- **🧠 Superposition Mentale** (Coût: 30 ⚡)
  - Pense dans plusieurs états simultanément
  - Amplitudes: `(0.707+0.0i)` et `(0.0+0.707i)`
  - Bonus actions: +2 par tour
  - Durée: 5 tours

- **👥 Leadership Quantique** (Coût: 40 ⚡)
  - Commande des armées dans plusieurs dimensions
  - Rayon: 10 cases
  - Bonus armée: 1.5x
  - Type: Interférence CONSTRUCTIVE

### ⚔️ **Épée d'Amplitude Pure**
```json
{
  "id": "amplitude_sword",
  "name": "⚔️ Épée d'Amplitude Pure",
  "tier": 6,
  "rarity": "Légendaire",
  "slot": "WEAPON"
}
```

**📊 Statistiques:**
- ⚔️ Attaque: +50
- ⚡ Énergie Temporelle: +100
- 🎯 Précision: +30
- 💥 Chance Critique: +40%

**🌀 Amplitude Quantique:** `(1.0+0.0i)` - Amplitude pure maximale

### 🔮 **Orbe de Probabilité Absolue**
```json
{
  "id": "probability_orb",
  "name": "🔮 Orbe de Probabilité Absolue",
  "tier": 6,
  "rarity": "Légendaire",
  "slot": "MAGIC"
}
```

**📊 Statistiques:**
- 🔮 Magie: +60
- ⚡ Énergie Temporelle: +120
- 🎲 Contrôle Probabilité: +50%

---

## 🎯 **TIER 4-5 - ARTEFACTS LÉGENDAIRES**

### 🕐 **Horloge du Dernier Instant**
```json
{
  "id": "reverse_clock",
  "name": "Horloge du Dernier Instant",
  "tier": 4,
  "rarity": "Légendaire",
  "charges": 3
}
```

**🌀 Formule Temporelle:** `ψ_clock: ROLLBACK(ENTITY, Δt-n) where n ∈ [1,3]`

**🔮 Capacités:**
- **⏪ Rollback Temporel** (Coût: 80 ⚡)
  - Revient en arrière de 1 à 3 tours
  - Crée une zone gélifiée temporaire
  - Ne peut annuler une action déjà observée

### 🗡️ **Lame de l'Avant-Monde**
```json
{
  "id": "avantworld_blade",
  "name": "Lame de l'Avant-Monde",
  "tier": 5,
  "rarity": "Paradoxe",
  "charges": 2
}
```

**🌀 Formule Temporelle:** `ψ_blade: ⊙(Δt+3 @x,y ⟶ WRITE_FUTURE(EVENT))`

**🔮 Capacités:**
- **⚔️ Frappe Quantique** (Coût: 100 ⚡)
  - Écrit un événement futur incertain
  - Ignore les timelines non-hostiles
  - Déclenche une bataille fantôme en cas de conflit

### 📡 **Balise d'Ignorance Temporelle**
```json
{
  "id": "ignorance_beacon",
  "name": "Balise d'Ignorance Temporelle",
  "tier": 4,
  "rarity": "Légendaire",
  "charges": 3
}
```

**🌀 Formule Temporelle:** `TAG(HERO, 'temporal_ghost') if POWER < threshold`

**🔮 Capacités:**
- **👻 Fantôme Temporel** (Coût: 60 ⚡)
  - Rend les héros faibles 'fantômes temporels'
  - Permet de passer sans interaction
  - Condition: hero_power < 20

---

## ⚠️ **ARTEFACTS MANQUANTS EN JSON**

### 🗡️ **Épée Temporelle (Tier 2)**
```json
// À AJOUTER au JSON
{
  "id": "temporal_sword",
  "name": "Épée Temporelle",
  "tier": 2,
  "rarity": "Rare",
  "slot": "WEAPON"
}
```

**📊 Statistiques:**
- ⚔️ Attaque: +15
- ⚡ Dégâts Temporels: +10
- 🎯 Précision: +5

### 🔮 **Orbe Mystique (Tier 3)**
```json
// À AJOUTER au JSON
{
  "id": "mystic_orb",
  "name": "Orbe Mystique",
  "tier": 3,
  "rarity": "Épique",
  "slot": "MAGIC"
}
```

**📊 Statistiques:**
- 🔮 Magie: +25
- ⚡ Énergie Temporelle: +20

### 🕐 **Horloge Inversée (Tier 3)**
```json
// À AJOUTER au JSON
{
  "id": "reversed_clock",
  "name": "Horloge Inversée",
  "tier": 3,
  "rarity": "Épique",
  "slot": "TEMPORAL"
}
```

**📊 Statistiques:**
- ⏳ Manipulation Temporelle: +15
- ⚡ Énergie Temporelle: +25

### 🪄 **Bâton Chrono (Tier 4)**
```json
// À AJOUTER au JSON
{
  "id": "chrono_staff",
  "name": "Bâton Chrono",
  "tier": 4,
  "rarity": "Épique",
  "slot": "WEAPON"
}
```

**📊 Statistiques:**
- 🔮 Magie: +18
- ⏳ Contrôle Temporel: +20
- ⚡ Énergie Temporelle: +30

---

## 🔬 **FORMULES QUANTIQUES**

### **Interférence Constructive**
```
|ψ₁⟩ + |ψ₂⟩ = |ψ_combined⟩
P(success) = |⟨ψ_combined|ψ_target⟩|²
```

### **Superposition d'États**
```
|ψ⟩ = α|0⟩ + β|1⟩
où |α|² + |β|² = 1
```

### **Amplitude Complexe**
```
A = a + bi
|A|² = a² + b²
Phase = arctan(b/a)
```

---

## 🎯 **Actions Recommandées**

### **Priorité Haute**
1. **Ajouter les 4 artefacts manquants** au JSON `TEMPORAL_ARTIFACTS.json`
2. **Vérifier la cohérence** des stats entre guides et JSON
3. **Standardiser les ID** des artefacts (snake_case)

### **Priorité Moyenne**
1. **Merger les guides existants** dans ce document unique
2. **Nettoyer les doublons** dans docs/reports/
3. **Valider les formules quantiques** avec les développeurs

### **Priorité Basse**
1. **Créer des tests unitaires** pour chaque artefact
2. **Ajouter des images** pour les artefacts Tier 6
3. **Documenter les interactions** entre artefacts

---

## 📁 **Structure de Fichiers Recommandée**

```
docs/items/
├── ARTEFACTS_COMPLETE_GUIDE.md     # Ce document (principal)
├── TEMPORAL_ARTIFACTS.json         # Données JSON (compléter)
├── TEMPORAL_CREATURES.json         # Créatures (OK)
├── TEMPORAL_CREATURES_GUIDE.md     # Guide créatures (OK)
└── scenarios/                      # Scénarios spécifiques
    ├── ECLAT_MONDES_DISSOLUS_ARTIFACTS.json
    └── ECLAT_MONDES_DISSOLUS_HEROES.json
```

**Fichiers à supprimer/merger:**
- `TEMPORAL_ARTIFACTS_GUIDE.md` → Mergé dans ce document
- `HEROES_OF_TIME_ARTEFACTS_INDEX.md` → Mergé dans ce document
- `docs/reports/VALIDATION_COMPLETE_OBJETS.md` → Mergé dans ce document 