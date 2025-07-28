# 🖥️ Interface Frontend Minimaliste pour *Heroes of Time* – Version POC

## 🎯 Objectif

Fournir une interface utilisateur ultra-légère, codée en **HTML + JavaScript natif (vanilla)**, sans framework ni dépendance, pour **visualiser l'état du jeu** piloté entièrement par le **langage de script spatio-temporel**.

L'interface doit :
- Se brancher sur un back-end Java contenant le moteur temporel (ψ, Π, †, etc.)
- Être capable d'envoyer des scripts en texte (notre langage)
- Recevoir l'état du monde (tuiles, héros, superpositions…)
- Afficher visuellement les actions, les timelines et les anomalies
- Rester ultra-simple et portable (navigateur + PWA)

---

## 📜 Langage de script supporté (exemples à utiliser dans le frontend)

```plaintext
HERO(Arthur)
MOV(Arthur, @125,64)
CREATE(CREATURE, Dragon, @126,65)
ψ001: ⊙(Δt+2 @128,68 ⟶ MOV(HERO, Arthur, @128,68))
Π(Player2 entre dans @128,68 à Δt+2) ⇒ †ψ001
USE(ITEM, AvantWorldBlade, HERO:Arthur)
```

Le front n'interprète rien : il envoie ce texte tel quel au back-end, et affiche uniquement ce que le moteur retourne.

---

## 🗂️ Structure de Projet Frontend

```
🌐 frontend/
├── index.html          ← Conteneur principal, canvas ou divs
├── game.js             ← Logique de rendu et rafraîchissement
├── api.js              ← Fetch POST/GET vers backend Java
├── script-console.js   ← Input utilisateur pour taper les scripts
├── styles.css          ← Apparence (carte, unités, brume, halo)
├── assets/
│   ├── hero.png
│   ├── hex_grass.png
│   ├── fog.png
│   └── artifacts/
│       ├── blade.png
│       ├── clock.png
│       └── beacon.png
└── manifest.json       ← Pour activer le mode PWA (optionnel)
```

---

## 🔌 Interaction avec le Back-End

### Appels API attendus

```javascript
// Exécuter un script
POST /api/temporal/games/{gameId}/script
Content-Type: application/json
{
  "script": "MOV(Arthur, @125,64)\nψ001: ⊙(Δt+2 @128,68 ⟶ MOV(HERO, Arthur, @128,68))"
}

// Récupérer l'état du jeu
GET /api/temporal/games/{gameId}/state
Response: {
  "gameId": 1,
  "currentTurn": 3,
  "heroes": [
    {
      "name": "Arthur",
      "x": 125,
      "y": 64,
      "hp": 100,
      "artifacts": ["AvantWorldBlade"]
    }
  ],
  "psiStates": [
    {
      "id": "ψ001",
      "status": "ACTIVE",
      "targetX": 128,
      "targetY": 68,
      "deltaT": 2,
      "action": "MOV(HERO, Arthur, @128,68)"
    }
  ],
  "tiles": [
    {
      "x": 125,
      "y": 64,
      "type": "GRASS",
      "occupied": true
    }
  ]
}

// Créer une nouvelle partie
POST /api/temporal/games
{
  "gameName": "Frontend Test",
  "playerId": "player1"
}
```

---

## 🎨 Interface Utilisateur

### Layout Principal

```
┌─────────────────────────────────────────────────────────────┐
│ Heroes of Time 🕰️                          [New Game] [⚙️] │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                   GAME BOARD                            │ │
│ │                                                         │ │
│ │    ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡                        │ │
│ │   ⬡ ⬡ ⬡ ⬡ 🧙 ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡                       │ │
│ │  ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡                      │ │
│ │ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ψ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡                     │ │
│ │  ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡                      │ │
│ │   ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡                       │ │
│ │    ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡                        │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ SCRIPT CONSOLE                                          │ │
│ │ > HERO(Arthur)                                          │ │
│ │ > MOV(Arthur, @125,64)                                  │ │
│ │ > ψ001: ⊙(Δt+2 @128,68 ⟶ MOV(HERO, Arthur, @128,68))  │ │
│ │ > _                                        [Execute]    │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Turn: 3 | Heroes: Arthur(125,64) | ψ-states: 1 active      │
└─────────────────────────────────────────────────────────────┘
```

### Éléments Visuels

#### Carte Hexagonale
- **Tuiles** : Hexagones avec textures (herbe, pierre, eau)
- **Héros** : Sprites avec nom et HP
- **ψ-states** : Zones floues/brillantes avec effet de particules
- **Artefacts** : Icônes spéciales avec lueur
- **Conflits** : Zones rouges clignotantes

#### Console de Script
- **Input** : Zone de texte avec coloration syntaxique basique
- **Historique** : Dernières commandes exécutées
- **Autocomplétion** : Suggestions pour HERO(), MOV(), ψ, etc.
- **Validation** : Indicateur d'erreur en temps réel

#### Status Bar
- **Tour actuel** : Numéro de tour
- **Héros** : Liste avec positions
- **ψ-states** : Nombre d'états actifs
- **Notifications** : Messages d'erreur/succès

---

## 🎨 Système de Rendu

### Grille Hexagonale

```javascript
// Coordonnées hexagonales
function hexToPixel(x, y) {
    const size = 30;
    const pixelX = size * (3/2 * x);
    const pixelY = size * (Math.sqrt(3)/2 * x + Math.sqrt(3) * y);
    return { x: pixelX, y: pixelY };
}

// Rendu d'une tuile
function renderTile(ctx, x, y, type) {
    const pos = hexToPixel(x, y);
    ctx.beginPath();
    // Dessiner hexagone
    for (let i = 0; i < 6; i++) {
        const angle = 2 * Math.PI / 6 * i;
        const hexX = pos.x + 30 * Math.cos(angle);
        const hexY = pos.y + 30 * Math.sin(angle);
        if (i === 0) ctx.moveTo(hexX, hexY);
        else ctx.lineTo(hexX, hexY);
    }
    ctx.closePath();
    ctx.fillStyle = getTileColor(type);
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.stroke();
}
```

### Effets Visuels

#### ψ-states (Superpositions)
```javascript
function renderPsiState(ctx, psiState) {
    const pos = hexToPixel(psiState.targetX, psiState.targetY);
    
    // Effet de brume
    const gradient = ctx.createRadialGradient(
        pos.x, pos.y, 0,
        pos.x, pos.y, 40
    );
    gradient.addColorStop(0, 'rgba(147, 112, 219, 0.8)'); // Violet
    gradient.addColorStop(1, 'rgba(147, 112, 219, 0.1)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(pos.x - 40, pos.y - 40, 80, 80);
    
    // Texte ψ
    ctx.fillStyle = '#9370DB';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`ψ${psiState.id}`, pos.x, pos.y);
}
```

#### Héros
```javascript
function renderHero(ctx, hero) {
    const pos = hexToPixel(hero.x, hero.y);
    
    // Sprite du héros
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(pos.x - 15, pos.y - 15, 30, 30);
    
    // Nom
    ctx.fillStyle = '#FFF';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(hero.name, pos.x, pos.y - 20);
    
    // HP
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(pos.x - 15, pos.y + 20, 30 * (hero.hp / 100), 3);
}
```

---

## 📱 Fonctionnalités Principales

### 1. Connexion au Backend
```javascript
// api.js
class GameAPI {
    constructor(baseUrl = 'http://localhost:8080/api/temporal') {
        this.baseUrl = baseUrl;
        this.gameId = null;
    }
    
    async createGame(gameName) {
        const response = await fetch(`${this.baseUrl}/games`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameName, playerId: 'player1' })
        });
        const game = await response.json();
        this.gameId = game.id;
        return game;
    }
    
    async executeScript(script) {
        const response = await fetch(`${this.baseUrl}/games/${this.gameId}/script`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ script })
        });
        return await response.json();
    }
    
    async getGameState() {
        const response = await fetch(`${this.baseUrl}/games/${this.gameId}/state`);
        return await response.json();
    }
}
```

### 2. Console de Script
```javascript
// script-console.js
class ScriptConsole {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.history = [];
        this.historyIndex = 0;
        this.setupUI();
    }
    
    setupUI() {
        this.container.innerHTML = `
            <div class="console-output" id="console-output"></div>
            <div class="console-input">
                <span class="prompt">></span>
                <input type="text" id="script-input" placeholder="Enter script command...">
                <button id="execute-btn">Execute</button>
            </div>
        `;
        
        this.input = document.getElementById('script-input');
        this.output = document.getElementById('console-output');
        this.executeBtn = document.getElementById('execute-btn');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.executeBtn.addEventListener('click', () => this.executeScript());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.executeScript();
            if (e.key === 'ArrowUp') this.navigateHistory(-1);
            if (e.key === 'ArrowDown') this.navigateHistory(1);
        });
    }
    
    async executeScript() {
        const script = this.input.value.trim();
        if (!script) return;
        
        this.addToOutput(`> ${script}`, 'command');
        this.history.push(script);
        this.historyIndex = this.history.length;
        
        try {
            const result = await window.gameAPI.executeScript(script);
            this.addToOutput(`✅ Script executed`, 'success');
            window.gameRenderer.refresh();
        } catch (error) {
            this.addToOutput(`❌ Error: ${error.message}`, 'error');
        }
        
        this.input.value = '';
    }
    
    addToOutput(text, type = 'normal') {
        const line = document.createElement('div');
        line.className = `console-line ${type}`;
        line.textContent = text;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }
}
```

### 3. Rendu du Jeu
```javascript
// game.js
class GameRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gameState = null;
        this.setupCanvas();
    }
    
    setupCanvas() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
    }
    
    async refresh() {
        try {
            this.gameState = await window.gameAPI.getGameState();
            this.render();
            this.updateStatusBar();
        } catch (error) {
            console.error('Failed to refresh game state:', error);
        }
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (!this.gameState) return;
        
        // Rendu des tuiles
        if (this.gameState.tiles) {
            this.gameState.tiles.forEach(tile => {
                this.renderTile(tile);
            });
        }
        
        // Rendu des ψ-states
        if (this.gameState.psiStates) {
            this.gameState.psiStates.forEach(psiState => {
                this.renderPsiState(psiState);
            });
        }
        
        // Rendu des héros
        if (this.gameState.heroes) {
            this.gameState.heroes.forEach(hero => {
                this.renderHero(hero);
            });
        }
    }
    
    renderTile(tile) {
        const pos = this.hexToPixel(tile.x, tile.y);
        this.ctx.beginPath();
        
        // Dessiner hexagone
        for (let i = 0; i < 6; i++) {
            const angle = 2 * Math.PI / 6 * i;
            const hexX = pos.x + 30 * Math.cos(angle);
            const hexY = pos.y + 30 * Math.sin(angle);
            if (i === 0) this.ctx.moveTo(hexX, hexY);
            else this.ctx.lineTo(hexX, hexY);
        }
        
        this.ctx.closePath();
        this.ctx.fillStyle = this.getTileColor(tile.type);
        this.ctx.fill();
        this.ctx.strokeStyle = '#333';
        this.ctx.stroke();
    }
    
    renderPsiState(psiState) {
        const pos = this.hexToPixel(psiState.targetX, psiState.targetY);
        
        // Effet de brume violette
        const gradient = this.ctx.createRadialGradient(
            pos.x, pos.y, 0,
            pos.x, pos.y, 40
        );
        gradient.addColorStop(0, 'rgba(147, 112, 219, 0.8)');
        gradient.addColorStop(1, 'rgba(147, 112, 219, 0.1)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, 40, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Texte ψ
        this.ctx.fillStyle = '#9370DB';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`ψ${psiState.id}`, pos.x, pos.y);
    }
    
    renderHero(hero) {
        const pos = this.hexToPixel(hero.x, hero.y);
        
        // Corps du héros
        this.ctx.fillStyle = '#FFD700';
        this.ctx.fillRect(pos.x - 15, pos.y - 15, 30, 30);
        
        // Nom
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(hero.name, pos.x, pos.y - 20);
        
        // Barre de vie
        this.ctx.fillStyle = '#FF0000';
        this.ctx.fillRect(pos.x - 15, pos.y + 20, 30, 3);
        this.ctx.fillStyle = '#00FF00';
        this.ctx.fillRect(pos.x - 15, pos.y + 20, 30 * (hero.hp / 100), 3);
    }
    
    hexToPixel(x, y) {
        const size = 30;
        const pixelX = size * (3/2 * x) + 400; // Centré
        const pixelY = size * (Math.sqrt(3)/2 * x + Math.sqrt(3) * y) + 300;
        return { x: pixelX, y: pixelY };
    }
    
    getTileColor(type) {
        switch (type) {
            case 'GRASS': return '#90EE90';
            case 'STONE': return '#A0A0A0';
            case 'WATER': return '#4169E1';
            default: return '#DDD';
        }
    }
    
    updateStatusBar() {
        const statusBar = document.getElementById('status-bar');
        if (statusBar && this.gameState) {
            const heroCount = this.gameState.heroes ? this.gameState.heroes.length : 0;
            const psiCount = this.gameState.psiStates ? this.gameState.psiStates.length : 0;
            statusBar.textContent = `Turn: ${this.gameState.currentTurn || 1} | Heroes: ${heroCount} | ψ-states: ${psiCount} active`;
        }
    }
}
```

---

## 🎨 Styles CSS

```css
/* styles.css */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    color: #fff;
    overflow: hidden;
}

.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.header {
    background: rgba(0, 0, 0, 0.3);
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #FFD700;
}

.title {
    font-size: 24px;
    font-weight: bold;
    color: #FFD700;
}

.controls button {
    background: linear-gradient(45deg, #8B5A2B, #FFD700);
    border: none;
    padding: 8px 16px;
    margin-left: 10px;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    transition: transform 0.2s;
}

.controls button:hover {
    transform: scale(1.05);
}

.game-area {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.game-board {
    flex: 1;
    background: rgba(0, 0, 0, 0.2);
    border: 2px solid #444;
    margin: 10px;
    border-radius: 8px;
    overflow: hidden;
}

#game-canvas {
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, #2a2a3e, #1a1a2e);
}

.script-console {
    height: 200px;
    background: rgba(0, 0, 0, 0.4);
    border: 2px solid #444;
    margin: 0 10px 10px 10px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
}

.console-output {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.4;
}

.console-line {
    margin-bottom: 5px;
}

.console-line.command {
    color: #FFD700;
}

.console-line.success {
    color: #00FF00;
}

.console-line.error {
    color: #FF4444;
}

.console-input {
    display: flex;
    align-items: center;
    padding: 10px;
    background: rgba(0, 0, 0, 0.3);
    border-top: 1px solid #444;
}

.prompt {
    color: #FFD700;
    font-weight: bold;
    margin-right: 10px;
    font-family: 'Courier New', monospace;
}

#script-input {
    flex: 1;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid #666;
    padding: 8px;
    color: #fff;
    font-family: 'Courier New', monospace;
    border-radius: 4px;
}

#script-input:focus {
    outline: none;
    border-color: #FFD700;
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
}

#execute-btn {
    background: linear-gradient(45deg, #4A90E2, #9370DB);
    border: none;
    padding: 8px 16px;
    margin-left: 10px;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    transition: transform 0.2s;
}

#execute-btn:hover {
    transform: scale(1.05);
}

.status-bar {
    background: rgba(0, 0, 0, 0.3);
    padding: 8px 20px;
    border-top: 1px solid #444;
    font-size: 14px;
    color: #ccc;
}

/* Animations pour les effets temporels */
@keyframes psiGlow {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
}

.psi-effect {
    animation: psiGlow 2s ease-in-out infinite;
}

@keyframes conflictFlash {
    0%, 100% { background-color: transparent; }
    50% { background-color: rgba(255, 0, 0, 0.3); }
}

.conflict-zone {
    animation: conflictFlash 1s ease-in-out infinite;
}

/* Responsive */
@media (max-width: 768px) {
    .container {
        font-size: 14px;
    }
    
    .script-console {
        height: 150px;
    }
    
    .title {
        font-size: 20px;
    }
}
```

---

## 📱 HTML Principal

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Heroes of Time - Temporal Engine</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="manifest" href="manifest.json">
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="title">🕰️ Heroes of Time</div>
            <div class="controls">
                <button id="new-game-btn">New Game</button>
                <button id="settings-btn">⚙️</button>
            </div>
        </header>
        
        <div class="game-area">
            <div class="game-board">
                <canvas id="game-canvas"></canvas>
            </div>
            
            <div class="script-console" id="script-console">
                <!-- Console will be populated by JavaScript -->
            </div>
        </div>
        
        <div class="status-bar" id="status-bar">
            Ready to start...
        </div>
    </div>
    
    <script src="api.js"></script>
    <script src="script-console.js"></script>
    <script src="game.js"></script>
    <script>
        // Initialisation de l'application
        window.gameAPI = new GameAPI();
        window.gameRenderer = new GameRenderer('game-canvas');
        window.scriptConsole = new ScriptConsole('script-console');
        
        // Événements
        document.getElementById('new-game-btn').addEventListener('click', async () => {
            try {
                await window.gameAPI.createGame('Frontend Game');
                window.scriptConsole.addToOutput('🎮 New game created!', 'success');
                window.gameRenderer.refresh();
            } catch (error) {
                window.scriptConsole.addToOutput(`❌ Failed to create game: ${error.message}`, 'error');
            }
        });
        
        // Auto-refresh toutes les 5 secondes
        setInterval(() => {
            if (window.gameAPI.gameId) {
                window.gameRenderer.refresh();
            }
        }, 5000);
        
        // Message de bienvenue
        window.scriptConsole.addToOutput('🕰️ Heroes of Time - Temporal Engine', 'success');
        window.scriptConsole.addToOutput('Click "New Game" to start, then use script commands:', 'normal');
        window.scriptConsole.addToOutput('Examples: HERO(Arthur), MOV(Arthur, @10,10), ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(HERO, Arthur, @15,15))', 'normal');
    </script>
</body>
</html>
```

---

## 🚀 Déploiement et Utilisation

### 1. Structure finale
```
🌐 frontend/
├── index.html
├── api.js
├── script-console.js
├── game.js
├── styles.css
├── manifest.json
└── assets/
    ├── hero.png
    ├── hex_grass.png
    └── fog.png
```

### 2. Lancement
1. Démarrer le backend Java (port 8080)
2. Servir les fichiers HTML (serveur local ou GitHub Pages)
3. Ouvrir dans un navigateur
4. Cliquer "New Game" et commencer à taper des scripts

### 3. Commandes de test
```
HERO(Arthur)
MOV(Arthur, @10,10)
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(HERO, Arthur, @15,15))
†ψ001
USE(ITEM, AvantWorldBlade, HERO:Arthur)
```

---

## 🎯 Fonctionnalités Implémentées

- ✅ **Interface minimaliste** HTML/CSS/JS vanilla
- ✅ **Connexion API** REST vers backend Java
- ✅ **Console de script** avec historique
- ✅ **Rendu hexagonal** de la carte
- ✅ **Visualisation ψ-states** avec effets
- ✅ **Affichage héros** avec stats
- ✅ **Status bar** informatif
- ✅ **Responsive design** mobile-friendly
- ✅ **Auto-refresh** du state de jeu
- ✅ **Gestion d'erreurs** avec feedback visuel

---

*Interface Frontend Minimaliste Heroes of Time - Prête pour implémentation*

**Status : ✅ READY TO IMPLEMENT**