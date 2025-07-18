# 🎯 Cursor Rules - Heroes of Time

## 📋 **RÈGLES CRITIQUES POUR L'AGENT**

### 🚨 **RÈGLES PARTAGÉES (CRITIQUES)**
- **PAS DE RESET HARD** - C'est un agent partagé [[memory:3588842]]
- **PAS D'EMOJIS dans les commandes echo** - Ça cause des blocages [[memory:3578318]]
- Plusieurs développeurs travaillent sur ce projet simultanément
- Utiliser `git checkout <commit> -- <fichier>` pour restaurer
- `git revert` pour annuler des commits, `git stash` pour sauvegarder
- **JAMAIS** de `git reset --hard`, `git push --force`, ou suppression de branches

### 🎮 **CONCEPT DU JEU**
- **Jeu de stratégie asynchrone** avec règles de causalité
- **Objets pour casser espace-temps** et multivers
- **ψ-states** (superpositions quantiques) avec collapse
- **Timeline branching** et artefacts temporels
- **PAS** de VR, PAS d'IA révolutionnaire, PAS d'IDE visuel quantique
- **PAS** de "scientific breakthrough" - c'est juste un jeu

### 🏗️ **ARCHITECTURE TECHNIQUE**
```
Backend API       (port 8080) → Spring Boot (Java)
Frontend Classic  (port 8000) → Express (Node.js)
Frontend Temporal (port 5173) → Python HTTP server
```

### 📜 **SYNTAXE TEMPORELLE**
```javascript
// Superposition quantique
ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))

// Collapse manuel
†ψ001

// Observation trigger
Π(Player2 enters @126,65) ⇒ †ψ001

// Artefacts temporels
USE(ITEM, AvantWorldBlade, HERO:Arthur)
```

### 🔧 **PARSERS DUAUX**
- **REGEX parser** : Production (plus rapide)
- **ANTLR4 parser** : Développement (plus précis)
- Configuration : `heroes.parser.use.antlr=true/false`

### 🚀 **COMMANDES DE DÉMARRAGE**
```bash
./start-all.sh                    # Démarre tout
./test-complete-comparison-fixed.sh  # Tests complets
```

### 📁 **DOCUMENTATION PROPRE**
```
docs/
├── README.md           # Index principal
├── INSTALLATION.md     # Setup
├── GAMEPLAY.md         # Règles du jeu
├── SCRIPT_REFERENCE.md # Scripts .hots
├── API.md              # API REST
└── TECHNICAL.md        # Détails techniques
```

### 🎯 **TODOS ACTUELS**
- Optimiser parser ANTLR4 (en cours)
- Corriger warnings version ANTLR
- Améliorer intégration frontends
- Implémenter mécaniques HMM3 avancées
- Support multijoueur complet
- Système de sauvegarde

### ⚠️ **ERREURS À ÉVITER**
- Ne pas créer de fichiers .md redondants
- Ne pas parler de "révolution quantique"
- Ne pas utiliser `echo` avec emojis en terminal
- Ne pas faire de `git reset --hard`
- Ne pas compliquer les serveurs frontend (Python/Express marchent)

### 🧠 **MÉMOIRES IMPORTANTES**
- Le projet est un jeu asynchrone, pas de la science
- Les frontends marchent avec Python/Express
- Documentation nettoyée de 100+ à 6 fichiers
- Système de test dual parser opérationnel

---

*Ce doc sert de référence pour éviter de délirer et garder le focus sur le jeu* 🎮 