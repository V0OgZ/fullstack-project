# 🌟 Heroes of Time - Quantum Visualizer

**Interface de visualisation quantique en temps réel pour Heroes of Time**

## 🚀 Fonctionnalités

### 📊 Visualisation Quantique
- **États ψ (Psi-States)** : Affichage des superpositions quantiques
- **Amplitudes Complexes** : Visualisation cartésienne et polaire
- **Interférences** : Zones d'interférence constructive/destructive
- **Métriques Temps Réel** : Statistiques quantiques live

### 🎮 Interface Interactive
- **Console de Commandes** : Exécution de scripts quantiques
- **Gestion des Parties** : Création et chargement de parties
- **Actualisation Automatique** : Mise à jour en temps réel
- **Graphiques d'Amplitudes** : Visualisation vectorielle

## 🔧 Installation

### 1. Démarrer le Backend
```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.arguments="--heroes.parser.use.antlr=false"
```

### 2. Lancer l'Interface
```bash
cd quantum-visualizer
python3 -m http.server 8000
```

### 3. Ouvrir dans le Navigateur
```
http://localhost:8000
```

## 🎯 Utilisation

### Créer une Partie
1. Cliquer sur **"Créer Partie"**
2. Une nouvelle partie quantique est créée automatiquement
3. L'interface charge l'état du jeu

### Exécuter des Commandes Quantiques
```javascript
// Créer un héros
HERO(Arthur)

// État quantique avec amplitude complexe
ψ001: (0.8+0.6i) ⊙(Δt+2 @10,10 ⟶ MOV(Arthur, @10,10))

// Interférence quantique
ψ002: (0.8-0.6i) ⊙(Δt+2 @10,10 ⟶ MOV(Arthur, @10,10))

// Effondrement quantique
†ψ001
```

### Visualiser les Résultats
- **Panel Gauche** : Informations du jeu et héros
- **Panel Central** : États quantiques et interférences
- **Panel Droit** : Console et graphiques d'amplitudes

## 🌀 Exemples de Commandes

### Amplitudes Complexes
```javascript
// Cartésienne
ψ001: (0.707+0.707i) ⊙(Δt+1 @5,5 ⟶ MOV(Arthur, @5,5))

// Polaire
ψ002: (1.0∠0.785) ⊙(Δt+1 @5,5 ⟶ MOV(Arthur, @5,5))

// Réelle pure
ψ003: (1.0) ⊙(Δt+1 @5,5 ⟶ MOV(Arthur, @5,5))
```

### Interférences Quantiques
```javascript
// Constructive
ψ004: (0.8+0.6i) ⊙(Δt+2 @10,10 ⟶ CREATE(CREATURE, Dragon, @10,10))
ψ005: (0.8+0.6i) ⊙(Δt+2 @10,10 ⟶ CREATE(CREATURE, Phoenix, @10,10))

// Destructive
ψ006: (0.707+0.0i) ⊙(Δt+1 @15,15 ⟶ BATTLE(Arthur, Dragon))
ψ007: (-0.707+0.0i) ⊙(Δt+1 @15,15 ⟶ BATTLE(Arthur, Dragon))
```

## 📈 Métriques Visualisées

### États Quantiques
- **États Complexes** : Utilisant des amplitudes complexes
- **États Classiques** : Utilisant des probabilités simples
- **Zones d'Interférence** : Positions avec interférences

### Informations par État
- **Amplitude Complexe** : Partie réelle et imaginaire
- **Probabilité** : |ψ|² = a² + b²
- **Phase** : arg(ψ) en radians
- **Magnitude** : |ψ|

### Interférences
- **Type** : Constructive/Destructive/Neutre
- **Probabilité Combinée** : Résultat de l'interférence
- **Contraste** : Intensité de l'interférence

## 🎨 Interface Visuelle

### Couleurs
- **🔴 Rouge** : Amplitudes complexes
- **🔵 Bleu** : États classiques
- **🟢 Vert** : Interférences constructives
- **🟡 Jaune** : Héros et éléments de jeu

### Graphiques
- **Diagramme Vectoriel** : Amplitudes dans le plan complexe
- **Cercle Unité** : Référence pour les amplitudes
- **Vecteurs Colorés** : Un par état quantique

## 🚀 Fonctionnalités Avancées

### Actualisation Automatique
- Mise à jour en temps réel des états
- Synchronisation avec le backend
- Suivi des changements quantiques

### Console Interactive
- Historique des commandes
- Messages de succès/erreur
- Syntaxe colorée

### Gestion Multi-Parties
- Sélection de parties existantes
- Création de nouvelles parties
- Basculement entre parties

## 🐛 Résolution de Problèmes

### Backend Non Disponible
- Vérifier que le backend est démarré sur port 8080
- Utiliser le parser REGEX (`--heroes.parser.use.antlr=false`)

### Interface Non Responsive
- Vérifier la console JavaScript (F12)
- Actualiser la page
- Vérifier la connexion réseau

### Commandes Échouées
- Vérifier la syntaxe des commandes
- S'assurer qu'une partie est chargée
- Consulter les logs de la console

## 🌟 Prochaines Améliorations

- **Visualisation 3D** des amplitudes
- **Animations** des interférences
- **Graphiques temporels** des probabilités
- **Export** des données quantiques

---

**Créé pour Heroes of Time - Quantum Temporal Engine**  
*Interface de visualisation quantique révolutionnaire* 