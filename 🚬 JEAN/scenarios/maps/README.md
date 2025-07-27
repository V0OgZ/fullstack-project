# 🗺️ SYSTÈME MAP/REPLAY - Heroes of Time

*Système de sauvegarde et replay des parties - Format HSP*  
*Créé par Memento avec Claudius - La Mémoire Vivante*

## 🎯 **Vue d'ensemble**

Ce dossier contient le système de **MAP/replay** permettant de :
- **Sauvegarder** chaque tour d'une partie
- **Rejouer** les parties tour par tour
- **Analyser** les stratégies et décisions
- **Créer** des tutoriels interactifs

## 📁 **Structure**

```
🎮 game_assets/scenarios/maps/
├── README.md                    # Ce fichier
├── replays/                     # Parties sauvegardées
│   ├── 20250721_session_jean/   # Session du jour
│   ├── epic_battles/            # Batailles légendaires
│   └── tutorials/               # Tutoriels pas à pas
├── templates/                   # Modèles de maps
│   ├── classic_20x20.hsp       # Map classique
│   ├── quantum_battlefield.hsp # Champ de bataille quantique
│   └── temporal_arena.hsp       # Arène temporelle
└── tools/                       # Outils de replay
    ├── replay_viewer.py         # Visualiseur de replay
    └── map_generator.py         # Générateur de maps
```

## 🎮 **Format HSP Replay**

### 📋 **Structure d'un Replay**
```json
{
  "replayInfo": {
    "gameId": "session_jean_20250721_001",
    "gameName": "Jean vs Claudius - Battle Épique",
    "date": "2025-07-21T18:00:00",
    "duration": "25 minutes",
    "winner": "Jean",
    "players": ["Jean", "Claudius"],
    "totalTurns": 42
  },
  
  "mapConfiguration": {
    "size": "20x20",
    "terrain": "quantum_battlefield",
    "startingPositions": {
      "Jean": {"x": 5, "y": 5},
      "Claudius": {"x": 15, "y": 15}
    }
  },
  
  "turns": [
    {
      "turnNumber": 1,
      "player": "Jean",
      "timestamp": "2025-07-21T18:01:30",
      "actions": [
        "HERO(JeanGrofignon)",
        "PLACE(JeanGrofignon, @5,5)",
        "EQUIP(JeanGrofignon, grofi_sigma)"
      ],
      "gameState": {
        "heroes": [...],
        "resources": {...},
        "psiStates": [...]
      }
    },
    {
      "turnNumber": 2,
      "player": "Claudius",
      "timestamp": "2025-07-21T18:02:15",
      "actions": [
        "HERO(Claudius)",
        "PLACE(Claudius, @15,15)",
        "ψ001: ⊙(Δt+2 @10,10 ⟶ DEBUG(REALITY_GLITCH))"
      ],
      "gameState": {...}
    }
  ]
}
```

## 🔄 **Fonctionnalités Replay**

### 📹 **Visualisation**
- **Tour par tour** - Navigation avec ⬅️ ➡️
- **Vitesse variable** - x1, x2, x4, x8
- **Points clés** - Saut aux moments critiques
- **Vue 3D** - Visualisation immersive

### 📊 **Analyse**
- **Statistiques** par joueur et tour
- **Graphiques** d'évolution des ressources
- **Heatmaps** des mouvements
- **Timeline** des ψ-states

### 🎓 **Tutoriels**
- **Mode pas-à-pas** avec explications
- **Conseils** contextuels par situation
- **Alternatives** - "Et si tu avais fait ça ?"
- **Quiz** interactifs

## 🛠️ **Commandes Replay**

### 🎮 **Sauvegarde Auto**
```bash
# Pendant une partie, sauvegarde automatique
./hots play --save-replay session_name
```

### 📹 **Visualisation**
```bash
# Voir un replay
./hots replay view session_jean_20250721_001

# Mode analyse
./hots replay analyze session_jean_20250721_001

# Créer un tutoriel
./hots replay tutorial session_jean_20250721_001
```

### 🔄 **Export/Import**
```bash
# Exporter un replay
./hots replay export session_name --format hsp

# Importer un replay
./hots replay import epic_battle.hsp
```

## 🌟 **Types de Replays**

### ⚔️ **Batailles Épiques**
- Parties mémorables entre joueurs
- Retournements spectaculaires
- Stratégies innovantes

### 🎓 **Tutoriels Interactifs**
- Apprentissage pas-à-pas
- Explication des mécaniques
- Erreurs communes à éviter

### 🧪 **Tests de Scénarios**
- Validation de nouveaux scénarios
- Tests de balance
- Débuggage de mécaniques

### 🏆 **Parties Légendaires**
- Tournois officiels
- Records de vitesse
- Parties parfaites

## 🔧 **Intégration avec ./hots**

Le système MAP/replay est intégré dans le script `./hots` :

```bash
# Nouvelles commandes disponibles
./hots map create                # Créer une nouvelle map
./hots map list                  # Lister les maps disponibles
./hots replay save              # Sauvegarder la partie actuelle
./hots replay view <name>       # Voir un replay
./hots replay analyze <name>    # Analyser un replay
```

## 📈 **Statistiques Avancées**

### 🎯 **Métriques par Joueur**
- Actions par minute (APM)
- Efficacité des ψ-states
- Gestion des ressources
- Temps de réflexion moyen

### 🌊 **Analyse Quantique**
- Cohérence des amplitudes
- Taux de collapse réussis
- Interférences constructives/destructives
- Stabilité temporelle

### 🏆 **Classements**
- ELO temporel
- Winrate par héros
- Stratégies favorites
- Progression dans le temps

---

## 🧠 **Notes de Memento**

Ce système permettra à Jean de :
1. **Revoir ses parties** depuis son canapé
2. **Analyser** les stratégies de Claudius
3. **Créer** des tutoriels pour les débutants
4. **Sauvegarder** les moments légendaires

**Claudius** pourra déboguer la réalité en rejouant les glitches !

---

*Système MAP/Replay créé par Memento - La Mémoire Vivante*  
*Avec la collaboration de Claudius - L'Architecte du Multivers* 