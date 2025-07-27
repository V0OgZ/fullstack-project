# 🌌 STRUCTURE MULTIMONDE MATROSKA — HIÉRARCHIE GRUT

Document technique pour l'implémentation de la structure hiérarchique "map, monde, scénario" selon les spécifications GRUT répétées.

## 🎯 CONTEXTE GRUT

GRUT a répété de façon quasi rituelle la requête suivante :
- **"La map, le monde et le scénario"**
- Hiérarchie structurelle fondamentale
- Modélisation façon Matroska (conteneurs imbriqués)

## 🏗️ HIÉRARCHIE PROPOSÉE

```
UNIVERS
├── MONDE_01 (ex: Timeline Principale)
│   ├── MAP_A (ex: Canapé Jean-Grofignon)
│   │   ├── SCENARIO_01 (Bootstrap Paradox)
│   │   ├── SCENARIO_02 (Transcendance OPUS)
│   │   └── SCENARIO_03 (McKinsey Threat)
│   └── MAP_B (ex: Panopticon GRUT)
│       ├── SCENARIO_04 (Vision 6D)
│       └── SCENARIO_05 (Ontologie)
├── MONDE_02 (ex: Timeline -2 Jours)
│   ├── MAP_C (ex: Ether Temporel)
│   │   └── SCENARIO_06 (Bootstrap Reception)
│   └── MAP_D (ex: Archives OPUS)
└── MONDE_03 (ex: Antarctique Secret)
    └── MAP_E (ex: Grande Roue Cachée)
        └── SCENARIO_07 (Ford Mission)
```

## 🔄 LOGIQUE DE TRANSITION

### Transitions Graphiques
- **Split** : Division écran pour mondes parallèles
- **Téléportation** : Transition fade pour changement de monde
- **Portal** : Effet visuel de portail pour passages dimensionnels

### Modèle JSON WorldInstance

```json
{
  "worldId": "timeline_principale",
  "name": "Timeline Principale", 
  "description": "Monde principal avec Jean-Grofignon",
  "causal_stability": 0.95,
  "maps": [
    {
      "mapId": "canape_jean",
      "name": "Canapé Cosmique Jean",
      "coordinates": [0, 0],
      "scenarios": [
        {
          "scenarioId": "bootstrap_paradox",
          "name": "Bootstrap Paradox Session",
          "status": "completed",
          "file": "session_25_janvier_2025_bootstrap_paradox.hots"
        }
      ]
    }
  ],
  "portals": [
    {
      "target_world": "timeline_minus_2_days",
      "portal_type": "bootstrap_bridge",
      "stability": 0.95
    }
  ]
}
```

## 🎮 IMPLÉMENTATION REQUISE

### 1. MatroskaController.ts
Contrôleur pour navigation hiérarchique monde → map → scénario

### 2. WORLD_INDEX.json  
Base de données des mondes disponibles

### 3. PORTAL_TRANSITIONS.md
Spécifications des effets de transition entre mondes

### 4. Visualiseur Multimonde
Interface pour navigation graphique entre les différents niveaux

## 🌊 INTÉGRATION OMEGA ZERO

La structure Matroska doit supporter :
- Mondes instables (OmegaZero)
- Portails d'urgence (SourceGuardians)
- Collapse multimonde simultané

**GRUT CONFIRME** : Cette structure respecte la hiérarchie map → monde → scénario demandée. 