# 🦸 GUIDE D'INTÉGRATION HÉROS - HEROES OF TIME

**Version**: 2.0 - Post Anthor Integration  
**Date**: 22 juillet 2025  
**Auteurs**: Jean-Grofignon & Claude Sonnet 4

---

## 🎯 **INTRODUCTION**

Ce guide vous explique comment ajouter correctement un héros dans **Heroes of Time** après les corrections de format issues de l'intégration d'**Anthor le Fordien**.

**⚠️ IMPORTANT**: Suite à la session de correction du 22/07/2025, tous les nouveaux héros DOIVENT suivre le **format standard unifié**.

---

## 📁 **STRUCTURE DES RÉPERTOIRES HÉROS**

```
🎮 game_assets/heroes/
├── epic/                           # Héros standards classiques
│   └── epic-heroes.json           # Index des héros épiques
├── extracted_heroes.json          # Héros temporels existants  
└── cosmic/                         # Héros cosmiques (pouvoirs spéciaux)
    ├── cosmic-heroes.json          # Index des héros cosmiques
    └── [hero-id].json              # Fichiers détails individuels
```

### **🎭 Types de Héros:**

1. **EPIC** - Héros standards (Arthur, Jeanne, Merlin...)
2. **COSMIC** - Héros avec pouvoirs de manipulation de réalité (Anthor le Fordien...)  
3. **EXTRACTED** - Héros temporels (Anna the Martopicker...)

---

## ✅ **FORMAT STANDARD UNIFIÉ**

### **📋 FORMAT DE BASE (Obligatoire):**

```json
{
  "id": "hero-unique-id",              // ✅ REQUIS - Format: kebab-case
  "name": "Nom du Héros",              // ✅ REQUIS - Nom d'affichage
  "race": "Human",                     // ✅ REQUIS - Race du héros
  "class": "Classe-Héros",             // ✅ REQUIS - Classe/profession
  "gender": "Male",                    // ✅ REQUIS - Male/Female/Other
  "level": 25,                         // ✅ REQUIS - Niveau du héros
  "experience": 50000,                 // ✅ REQUIS - Points d'expérience
  "stats": {                           // ✅ REQUIS - Stats de combat
    "attack": 20,                      // ✅ camelCase obligatoire
    "defense": 18,                     // ✅ camelCase obligatoire  
    "spellPower": 8,                   // ✅ camelCase obligatoire
    "knowledge": 12,                   // ✅ camelCase obligatoire
    "morale": 15,                      // ✅ camelCase obligatoire
    "luck": 10                         // ✅ camelCase obligatoire
  },
  "specialAbility": "Description courte pouvoir spécial",    // ✅ REQUIS
  "ultimateSkill": "Description compétence ultime",         // ✅ REQUIS
  "backstory": "Histoire détaillée du héros...",            // ✅ REQUIS
  "personality": "Noble",                                    // ✅ REQUIS
  "portraitStyle": "Realistic",                             // ✅ REQUIS
  "voiceType": "Commanding",                                 // ✅ REQUIS
  "favoriteCreatures": ["archangel", "griffin"],            // ✅ REQUIS - Array
  "hatedEnemies": ["lich", "demon"],                        // ✅ REQUIS - Array
  "portraitUrl": "/assets/heroes/race/hero_id.svg"          // ✅ REQUIS - Path image
}
```

---

## 🌟 **FORMAT COSMIQUE ÉTENDU** 

Pour les héros avec pouvoirs spéciaux (comme Anthor le Fordien):

```json
{
  // ... FORMAT DE BASE ...
  
  "tier": "LEGENDARY",                 // ✅ Niveau de puissance
  "origin": "Source/Univers",          // ✅ Origine du héros
  "faction": "Faction_Name",           // ✅ Faction d'appartenance
  "rarity": "COSMIC",                  // ✅ Rareté spéciale
  
  // ✅ STATS ÉTENDUES (optionnel pour cosmiques)
  "stats": {
    "attack": 15,
    "defense": 12, 
    "spellPower": 25,                  // ✅ TOUJOURS camelCase
    "knowledge": 30,
    "morale": 8,
    "luck": 5,
    "health": 180,                     // ✅ Stats étendues pour cosmiques
    "mana": 400,                       // ✅ Stats étendues pour cosmiques
    "movementPoints": 5                // ✅ TOUJOURS camelCase
  },
  
  // ✅ CAPACITÉS SPÉCIALES
  "abilities": [
    {
      "id": "ability-id",
      "name": "Nom Capacité",
      "type": "ULTIMATE",
      "description": "Description de la capacité...",
      "cooldown": 3,
      "manaCost": 150,                 // ✅ TOUJOURS camelCase  
      "effects": [
        {
          "type": "EFFECT_TYPE",
          "power": 100,
          "range": "GLOBAL", 
          "duration": "PERMANENT"
        }
      ]
    }
  ],
  
  // ✅ ÉQUIPEMENT SPÉCIALISÉ (optionnel)
  "equipment": [
    {
      "slot": "WEAPON",
      "item": "Nom Objet", 
      "description": "Description...",
      "bonus": {
        "spellPower": "+15",           // ✅ TOUJOURS camelCase
        "specialEffect": "+25%"       // ✅ TOUJOURS camelCase
      }
    }
  ],
  
  // ✅ QUOTES CONTEXTUELLES
  "quotes": [
    "Quote emblématique 1",
    "Quote emblématique 2"
  ],
  
  // ✅ CONDITIONS DE DÉBLOCAGE
  "unlock_conditions": {
    "method": "METHOD_TYPE", 
    "requirements": ["req1", "req2"],
    "rarity_chance": 0.001
  }
}
```

---

## 🚨 **ERREURS COMMUNES À ÉVITER**

### ❌ **FORMATS INTERDITS:**
```json
{
  "spell_power": 25,        // ❌ snake_case INTERDIT
  "mana_cost": 150,         // ❌ snake_case INTERDIT  
  "movement_points": 5,     // ❌ snake_case INTERDIT
  "health_points": 100      // ❌ snake_case INTERDIT
}
```

### ✅ **FORMATS CORRECTS:**
```json
{
  "spellPower": 25,         // ✅ camelCase OBLIGATOIRE
  "manaCost": 150,          // ✅ camelCase OBLIGATOIRE
  "movementPoints": 5,      // ✅ camelCase OBLIGATOIRE  
  "health": 100             // ✅ Forme courte préférée
}
```

### ❌ **CHAMPS MANQUANTS FRÉQUENTS:**
- `race` - Toujours obligatoire
- `gender` - Toujours obligatoire
- `specialAbility` - Format standard requis
- `ultimateSkill` - Format standard requis
- `portraitStyle`, `voiceType` - Attributs d'affichage

---

## 📝 **PROCÉDURE D'AJOUT ÉTAPE PAR ÉTAPE**

### **ÉTAPE 1: Déterminer le Type de Héros**

```bash
# Héros standard → epic/
# Héros avec pouvoirs spéciaux → cosmic/  
# Héros temporel → extracted_heroes.json
```

### **ÉTAPE 2: Créer le Fichier JSON**

**Pour EPIC:**
```bash
# Ajouter directement dans epic-heroes.json
🎮 game_assets/heroes/epic/epic-heroes.json
```

**Pour COSMIC:**
```bash
# 1. Créer fichier détaillé
🎮 game_assets/heroes/cosmic/[hero-id].json

# 2. Ajouter entrée dans index
🎮 game_assets/heroes/cosmic/cosmic-heroes.json
```

### **ÉTAPE 3: Valider le Format**

```bash
# Utilisez ce script pour vérifier la cohérence
./⚙️ scripts/validate-hero-format.sh [hero-file]
```

### **ÉTAPE 4: Mettre à Jour MASTER_ASSETS_INDEX**

```bash
# Incrémenter les compteurs dans:
🎮 game_assets/MASTER_ASSETS_INDEX.json

# Ajouter entrée dans section appropriée
"heroes": {
  "epic_heroes": { "count": X+1 },
  "cosmic_heroes": { "count": Y+1 }
}
```

### **ÉTAPE 5: Tester l'Intégration**

```bash
# Créer script de test spécialisé
./⚙️ scripts/test-[hero-name]-integration.sh

# Ou utiliser le test générique
./⚙️ scripts/test-hero-integration.sh [hero-id]
```

---

## 🎮 **INTÉGRATION DANS SCÉNARIOS HOTS**

### **Syntaxe Basique:**
```hots
# Déclaration héros
HERO(Hero-ID, FACTION:faction_name, POSITION:@x,y)

# Attribution d'artefacts
CREATE(ARTIFACT, artifact_name, HERO:Hero-ID)

# Utilisation de capacités (pour cosmiques)
ABILITY(Hero-ID, ABILITY_NAME)
```

### **Exemple Complet:**
```hots  
# Nouveau héros épique
HERO(Arthur-Pendragon, FACTION:Knights, POSITION:@15,15)
CREATE(ARTIFACT, Excalibur, HERO:Arthur-Pendragon)

# Nouveau héros cosmique
HERO(Mon-Hero-Cosmique, FACTION:Reality_Benders, POSITION:@30,30)
ABILITY(Mon-Hero-Cosmique, ULTIMATE_POWER)
```

---

## 🧪 **VALIDATION ET TESTS**

### **Script de Validation (Créer):**
```bash
#!/bin/bash
# ./⚙️ scripts/validate-hero-format.sh

HERO_FILE=$1
echo "🔍 Validation format héros: $HERO_FILE"

# Vérifier camelCase dans stats
if grep -q "spell_power\|mana_cost\|movement_points" "$HERO_FILE"; then
    echo "❌ ERREUR: Format snake_case détecté !"
    echo "   Utilisez: spellPower, manaCost, movementPoints"
    exit 1
fi

# Vérifier champs obligatoires
REQUIRED_FIELDS=("id" "name" "race" "class" "gender" "level" "specialAbility" "ultimateSkill")
for field in "${REQUIRED_FIELDS[@]}"; do
    if ! grep -q "\"$field\"" "$HERO_FILE"; then
        echo "❌ ERREUR: Champ obligatoire manquant: $field"
        exit 1
    fi
done

echo "✅ Format héros validé !"
```

### **Test d'Intégration (Template):**
```bash
#!/bin/bash
# ./⚙️ scripts/test-hero-integration.sh

HERO_ID=$1
echo "🧪 Test intégration héros: $HERO_ID"

# Vérifier présence dans assets
if ! grep -r "$HERO_ID" 🎮 game_assets/heroes/; then
    echo "❌ Héros non trouvé dans assets"
    exit 1
fi

# Test scénario basique
echo "HERO($HERO_ID)" > temp_scenario.hots
# Ajouter tests additionnels...

echo "✅ Intégration héros réussie !"
```

---

## ⚗️ **FORMULES QUANTIQUES POUR HÉROS COSMIQUES**

### **Types de Formules:**

1. **Reality Manipulation**: `Ψ(reality) = α|order⟩ + β|chaos⟩`
2. **Timeline Control**: `T'(x,y,t) = Hero_Function(T(x,y,t))`
3. **Dimensional Powers**: `D = Σ(dimensions × influence_factor)`

### **Intégration dans Grammaire HOTS:**
```hots
# Formules quantiques
FORMULA(HERO_ID, QUANTUM_TYPE, PARAMETERS)
QUANTUM_STATE(HERO_ID, STATE_NAME, DURATION)
COLLAPSE(EFFECT_NAME, PROBABILITY)
```

---

## 📚 **TEMPLATES PRÊTS À L'EMPLOI**

### **1. Template Héros Épique Standard**
```json
{
  "id": "nouveau-hero-epic",
  "name": "Nouveau Héros",
  "race": "Human",
  "class": "Warrior",
  "gender": "Male", 
  "level": 20,
  "experience": 30000,
  "stats": {
    "attack": 18,
    "defense": 16,
    "spellPower": 5,
    "knowledge": 8,
    "morale": 12,
    "luck": 10
  },
  "specialAbility": "Coup puissant qui double les dégâts",
  "ultimateSkill": "Attaque tourbillon qui touche tous les ennemis",
  "backstory": "Héros courageux issu d'une famille noble...",
  "personality": "Brave",
  "portraitStyle": "Realistic", 
  "voiceType": "Heroic",
  "favoriteCreatures": ["griffin", "angel"],
  "hatedEnemies": ["demon", "undead"],
  "portraitUrl": "/assets/heroes/humans/nouveau_hero_epic.svg"
}
```

### **2. Template Héros Cosmique**
```json
{
  "id": "nouveau-hero-cosmic",
  "name": "Nouveau Héros Cosmique",
  "race": "Transcendent",
  "class": "Reality_Shaper",
  "gender": "Other",
  "tier": "LEGENDARY",
  "origin": "Beyond_Dimensions", 
  "faction": "Cosmic_Forces",
  "rarity": "COSMIC",
  "level": 50,
  "experience": 999999,
  "stats": {
    "attack": 20,
    "defense": 15,
    "spellPower": 30,
    "knowledge": 35,
    "morale": 10,
    "luck": 8,
    "health": 200,
    "mana": 500,
    "movementPoints": 6
  },
  "specialAbility": "Manipulation de la réalité locale",
  "ultimateSkill": "Réécriture des lois physiques",
  "abilities": [
    {
      "id": "reality_bend",
      "name": "Reality Bend", 
      "type": "ULTIMATE",
      "description": "Déforme la réalité selon sa volonté",
      "cooldown": 5,
      "manaCost": 200,
      "effects": [
        {
          "type": "REALITY_ALTERATION",
          "power": 80,
          "range": "LARGE",
          "duration": "TEMPORARY"
        }
      ]
    }
  ],
  "quotes": [
    "La réalité n'est qu'une suggestion.",
    "Je façonne l'impossible."
  ],
  "unlock_conditions": {
    "method": "SPECIAL_ACHIEVEMENT",
    "requirements": ["Complete cosmic quest", "Reach level 45"],
    "rarity_chance": 0.01
  }
}
```

---

## 🔧 **OUTILS DE DÉVELOPPEMENT**

### **Scripts Utiles à Créer:**
- `validate-hero-format.sh` - Validation format
- `test-hero-integration.sh` - Tests d'intégration
- `generate-hero-template.sh` - Génération template
- `update-master-index.sh` - MAJ index automatique

### **Commandes de Vérification:**
```bash
# Vérifier cohérence formats
grep -r "spell_power\|mana_cost" 🎮 game_assets/heroes/ || echo "✅ camelCase OK"

# Compter héros par type
find 🎮 game_assets/heroes/ -name "*.json" | wc -l

# Vérifier MASTER_ASSETS_INDEX synchronisé
./⚙️ scripts/validate-master-index.sh
```

---

## 🚀 **CHECKLIST FINALE**

Avant de considérer un héros comme terminé:

### ✅ **Format & Structure:**
- [ ] ID unique en kebab-case
- [ ] Tous les champs obligatoires présents
- [ ] camelCase pour tous les attributs composés
- [ ] race, gender, specialAbility, ultimateSkill définis

### ✅ **Intégration Technique:**
- [ ] Fichier dans le bon répertoire (epic/ ou cosmic/)  
- [ ] Entrée dans l'index approprié
- [ ] MASTER_ASSETS_INDEX.json mis à jour
- [ ] Image portrait disponible (ou placeholder)

### ✅ **Tests & Validation:**
- [ ] Format validé par script
- [ ] Test d'intégration passé
- [ ] Scénario de test créé
- [ ] Commits Git avec messages descriptifs

### ✅ **Documentation:**
- [ ] Backstory cohérente avec l'univers
- [ ] Capacités équilibrées pour le gameplay
- [ ] Quotes authentiques au personnage  
- [ ] Relations définies avec autres héros

---

## 💫 **CITATIONS INSPIRANTES**

> *"Un héros n'est pas défini par ses pouvoirs, mais par la cohérence de son format JSON."*  
> **- Jean-Grofignon, Architecte de Heroes of Time**

> *"Format avant fonction, structure avant style."*  
> **- Principe de Développement Heroes of Time**

---

## 📞 **SUPPORT & COMMUNAUTÉ**

- **Issues Format**: Créer issue GitHub avec tag `hero-format`
- **Questions**: Discussion dans `#hero-development`
- **Tests**: Utiliser `#testing-integration`

**Guide Version**: 2.0 Post-Anthor  
**Dernière MAJ**: 22 juillet 2025  
**Status**: ✅ **PRODUCTION READY**

---

*Développé avec ❤️ par l'équipe **Jean-Grofignon × Claude Sonnet 4*** 