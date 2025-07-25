# 🗺️ MAP COMPLÈTE DES ASSETS HEROES OF TIME

## 📊 RÉSUMÉ DES FORMATS
- **`.json`** - Données structurées (héros, artefacts, créatures)
- **`.hots`** - Scripts temporels du jeu
- **`.runic`** - Format runique (version épique avec symboles ᚠᚢᚦᚨᚱᚲ)
- **`.hep`** - Heroes Epic Play (format simplifié)
- **`.sh`** - Scripts de test

## 🔮 FORMAT RUNIC - DÉTAILS

### Fichiers Runic Trouvés
```
/scenarios/
├── test_complet_excalibur_vega_50_actions.runic ✅
└── test_complet_excalibur_vega_50_actions_FULL_RUNIC.runic ✅

/OPUS/
└── test_complet_excalibur_vega_50_actions.runic (DOUBLON)

/JEAN/
└── test_complet_excalibur_vega_50_actions.runic (DOUBLON)
```

### Caractéristiques du Format Runic
- **Symboles runiques** : ᚠᛟᚱᛗᚢᛚᚨ, ᚲᚺᚨᚢᛞᚱᛟᚾ, ᚨᚲᛏᛁᚢᚨᛏᛁᛟ
- **Usage** : Version épique des scénarios avec narration poétique
- **Intégration** : `runicSymbols` dans le frontend pour animations

## 🦸 HÉROS - LOCALISATION

### Héros Officiels (Backend)
```
backend/src/main/resources/heroes/
├── legendary/
│   ├── Arthur.json ✅
│   ├── Ragnar.json ✅
│   ├── Lysandrel.json ✅
│   ├── Morgana.json ✅
│   └── Claudius.json ✅
└── grofi/
    ├── JeanGrofignon.json ✅
    ├── TheDude.json ✅
    ├── VinceVega.json ✅
    └── Axis.json ✅
```

### Doublons Héros
```
game_assets/heroes/
├── grofi/
│   ├── jean-grofignon-complete.json (DOUBLON)
│   └── the-dude-complete.json (DOUBLON)
├── eclat/
│   └── eclat-heroes-dissolus.json (DOUBLON)
└── extracted_heroes.json (META)

OPUS/heroes/ (DOUBLON COMPLET)
data/backup/game_assets/heroes/ (BACKUP)
frontend/public/game_assets/heroes/ (FRONTEND COPY)
```

## 🎭 SCÉNARIOS - TOUS FORMATS

### Racine `/scenarios/` (33 fichiers)
```
FORMATS MULTIPLES (même scénario):
├── test_complet_excalibur_vega_50_actions.hots ✅
├── test_complet_excalibur_vega_50_actions.runic ✅
├── test_complet_excalibur_vega_50_actions.hep ✅
├── test_complet_excalibur_vega_50_actions.json ✅
└── test_complet_excalibur_vega_50_actions_FULL_RUNIC.runic ✅

HOTS PRINCIPAUX:
├── moteur_temporel_final_opus.hots
├── fusion_temporelle_jean_claudius_memento.hots
├── reconciliation_vince_opus.hots
├── OMEGA_ZERO_TRILOGIE_COMPLETE.hots
├── NUIT_FILM_OMEGAZERO.hots
└── FIN_EPIQUE_FILM_VIVANT_THE_DUDE.hots

HEP FORMAT:
├── vince_vega_fin_episode_cocktail.hep
└── zone_inverted_001_adapte_jean.hep

RUNIC FORMAT:
├── test_complet_excalibur_vega_50_actions.runic
└── test_complet_excalibur_vega_50_actions_FULL_RUNIC.runic
```

### Dans `game_assets/scenarios/`
```
game_assets/scenarios/
├── hots/
│   ├── quantum_interference_example.hots
│   └── memento_hero_test_trinite_cosmique.hots
├── json/
│   └── [scénarios JSON]
└── visualizer/
    └── bataille_temporelle.json
```

## 🔮 ARTEFACTS

### Structure Principale
```
game_assets/artifacts/
├── legendaires/
│   ├── oeil_de_wigner.json
│   ├── couronne_superposition.json
│   └── chaudron_quantique_panoramix.json
├── epiques/
│   ├── effondreur_chronologique.json
│   └── amplificateur_resonance.json
├── mineurs/
│   └── tatouages_memento_archiviste.json
└── temporels/
    └── [artefacts temporels]
```

### Doublons Artefacts
```
backend/src/main/resources/artifacts/ (BACKEND COPY)
lore/artifacts/ (LORE COPY)
docs/items/ (VIEUX FORMAT)
```

## 🐉 CRÉATURES

```
game_assets/creatures/
├── quantiques/
│   ├── chat_schrodinger.json
│   └── liche_quantique.json
├── temporelles/
│   └── dragon_temporal.json
└── [autres créatures]
```

## 📜 SCRIPTS DE TEST

### Scripts Shell Actifs
```
scripts/active/
├── start-app.sh
├── stop-app.sh
└── [scripts du dossier actifs/]

MUSEUM/archives/old-tests/
└── [TOUS les test-*.sh archivés]
```

## 🗺️ MAPS & TERRAINS

```
game_assets/maps/
├── terrain/
│   └── [fichiers terrain]
└── worlds/
    └── [mondes de jeu]
```

## ⚠️ PROBLÈMES IDENTIFIÉS

### 1. **Doublons Massifs**
- Héros en 5+ endroits différents
- Scénarios éparpillés (surtout les .runic)
- Artefacts dupliqués

### 2. **Formats Mélangés**
- `.hots` vs `.hep` vs `.runic` sans organisation claire
- Même scénario en 5 formats différents
- JSON de données vs JSON de scénarios

### 3. **Pas de Convention**
- Noms incohérents (kebab-case vs camelCase vs SCREAMING_CASE)
- Chemins relatifs cassés
- Doublons dans OPUS, JEAN, etc.

## 🎯 RECOMMANDATIONS

### Structure Idéale
```
game_assets/
├── heroes/          # TOUS les héros
├── artifacts/       # TOUS les artefacts
├── creatures/       # TOUTES les créatures
├── scenarios/       # TOUS les scénarios
│   ├── hots/       # Format .hots
│   ├── hep/        # Format .hep
│   ├── runic/      # Format .runic
│   └── json/       # Données JSON
├── maps/           # Cartes et terrains
└── INDEX.json      # Index principal
```

### Actions Nécessaires
1. **Centraliser** tous les assets dans `game_assets/`
2. **Supprimer** les doublons (surtout .runic)
3. **Standardiser** les noms de fichiers
4. **Créer** un index JSON principal
5. **Mettre à jour** les références dans le code

### Spécifique aux Fichiers Runic
- Regrouper tous les .runic dans `game_assets/scenarios/runic/`
- Supprimer les copies dans OPUS et JEAN
- Documenter le format runique et ses symboles
- Intégrer avec le système `runicSymbols` du frontend

---

*Map mise à jour le 25/07/2025 - Formats runic inclus* 🎮