# 🖥️ Heroes of Time - Frontend Minimaliste

Interface utilisateur ultra-légère en HTML/CSS/JavaScript vanilla pour le moteur temporel Heroes of Time.

## 🚀 Démarrage Rapide

### Prérequis
- Serveur backend Heroes of Time en cours d'exécution (port 8080)
- Navigateur web moderne
- Serveur HTTP local (optionnel)

### Installation
```bash
# Cloner ou télécharger les fichiers
# Pas de build nécessaire - HTML/CSS/JS vanilla

# Servir les fichiers (optionnel)
python -m http.server 3000
# ou
npx serve .
```

### Utilisation
1. Ouvrir `index.html` dans un navigateur
2. Cliquer "New Game" pour créer une partie
3. Utiliser la console pour taper des scripts temporels
4. Observer les effets sur la carte hexagonale

## 📁 Structure des Fichiers

```
frontend/
├── index.html          # Page principale
├── styles.css          # Styles complets
├── api.js              # Connexion backend
├── script-console.js   # Console de script
├── game.js             # Rendu du jeu
├── manifest.json       # PWA manifest
└── README.md           # Ce fichier
```

## 🎮 Utilisation

### Commandes de Script
```javascript
// Créer des héros
HERO(Arthur)
HERO(Ragnar)
HERO(Merlin)

// Mouvement
MOV(Arthur, @10,10)

// Créer des objets
CREATE(CREATURE, Dragon, @15,15)
CREATE(STRUCTURE, Tower, @20,20)

// Artefacts temporels
USE(ITEM, AvantWorldBlade, HERO:Arthur)
USE(ITEM, ReverseClock, HERO:Ragnar)

// ψ-states (superpositions)
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(HERO, Arthur, @15,15))
ψ002: ⊙(Δt+1 @20,20 ⟶ CREATE(CREATURE, Dragon, @20,20))

// Collapse
†ψ001
†ψ002

// Triggers d'observation
Π(Player enters @15,15) ⇒ †ψ001
```

### Raccourcis Clavier
- **Entrée** : Exécuter le script
- **Flèche Haut/Bas** : Naviguer dans l'historique
- **Tab** : Autocomplétion
- **Clic sur carte** : Afficher coordonnées

## 🎨 Fonctionnalités

### Interface
- ✅ **Carte hexagonale** interactive
- ✅ **Console de script** avec historique
- ✅ **Autocomplétion** des commandes
- ✅ **Feedback visuel** en temps réel
- ✅ **Responsive design** mobile-friendly

### Visualisation
- ✅ **Héros** avec couleurs distinctes
- ✅ **ψ-states** avec effets animés
- ✅ **Barres de vie** et statistiques
- ✅ **Indicateurs d'artefacts**
- ✅ **Status bar** informative

### Effets Temporels
- ✅ **Superpositions** (zones violettes brillantes)
- ✅ **Collapse** (disparition des effets)
- ✅ **Animations** fluides
- ✅ **Feedback** immédiat

## 🔧 Configuration

### Backend URL
Par défaut : `http://localhost:8080/api/temporal`

Pour changer :
```javascript
// Dans index.html
window.gameAPI = new GameAPI('http://votre-serveur:8080/api/temporal');
```

### Personnalisation
- **Couleurs** : Modifier `styles.css`
- **Taille hexagones** : Changer `hexSize` dans `game.js`
- **Suggestions** : Modifier `suggestions` dans `script-console.js`

## 🌐 PWA (Progressive Web App)

L'application peut être installée comme PWA :
1. Ouvrir dans Chrome/Edge
2. Cliquer sur l'icône d'installation
3. Utiliser comme application native

## 🐛 Dépannage

### Problèmes Courants

#### Backend non accessible
```
❌ Error: Failed to fetch
```
**Solution** : Vérifier que le backend est démarré sur le port 8080

#### CORS Error
```
❌ Error: CORS policy
```
**Solution** : Servir les fichiers via un serveur HTTP local

#### Pas de réponse du jeu
```
❌ Error: No game created
```
**Solution** : Cliquer "New Game" avant d'exécuter des scripts

### Debug
- Ouvrir les outils de développement (F12)
- Vérifier la console pour les erreurs
- Tester la connexion backend manuellement

## 🎯 Exemples d'Usage

### Scénario Basique
```javascript
// 1. Créer des héros
HERO(Arthur)
HERO(Ragnar)

// 2. Les positionner
MOV(Arthur, @10,10)
MOV(Ragnar, @15,15)

// 3. Créer une superposition
ψ001: ⊙(Δt+2 @20,20 ⟶ MOV(HERO, Arthur, @20,20))

// 4. Observer le résultat
// La zone @20,20 brille en violet

// 5. Collapse
†ψ001
// L'effet disparaît
```

### Scénario Avancé
```javascript
// Combat temporel
HERO(Arthur)
HERO(Ragnar)
USE(ITEM, AvantWorldBlade, HERO:Arthur)
ψ001: ⊙(Δt+2 @25,25 ⟶ BATTLE(Arthur, Ragnar))
Π(Ragnar enters @25,25) ⇒ †ψ001
MOV(Ragnar, @25,25)
// Déclenche la bataille fantôme
```

## 📊 Performance

### Optimisations
- Canvas 2D pour le rendu
- Limitation des éléments affichés
- Nettoyage automatique de l'historique
- Rafraîchissement intelligent

### Limites
- ~100 lignes d'historique console
- ~50 éléments sur la carte
- Rafraîchissement toutes les 5 secondes

## 🔄 Intégration

### Avec le Backend
L'interface communique avec le backend via :
- `POST /api/temporal/games` - Créer partie
- `POST /api/temporal/games/{id}/script` - Exécuter script
- `GET /api/temporal/games/{id}/state` - État du jeu

### Avec les Tests
Compatible avec tous les scripts de test :
- `simulate-quick.sh`
- `simulate-game.sh`
- `simulate-performance.sh`

## 🚀 Déploiement

### Local
```bash
# Serveur simple
python -m http.server 3000
```

### GitHub Pages
1. Push vers repository GitHub
2. Activer GitHub Pages
3. Configurer l'URL du backend

### Serveur Web
1. Copier les fichiers vers `/var/www/html/`
2. Configurer CORS sur le backend
3. Tester l'accès

---

*Interface Frontend Heroes of Time - Prête à l'emploi*

**Status : ✅ READY TO USE**