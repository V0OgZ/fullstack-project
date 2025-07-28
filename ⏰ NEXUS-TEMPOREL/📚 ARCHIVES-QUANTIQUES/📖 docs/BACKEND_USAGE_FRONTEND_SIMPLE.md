# 🎮 **BACKEND USAGE - GUIDE FRONTEND SIMPLE** 🚀

**📅 Date :** Janvier 2025  
**🎯 Objectif :** Documentation ULTRA-CLAIRE pour utiliser le backend Spring Boot depuis un frontend simple  
**🔧 Backend :** Spring Boot sur **port 8080** - STABLE ET FONCTIONNEL  
**💡 Philosophy :** Pas de fait mais, juste des exemples concrets !

---

## 🌟 **BACKEND HEROES OF TIME - ENDPOINTS DISPONIBLES**

### **🏗️ ARCHITECTURE BACKEND**
```
Backend Spring Boot (Port 8080)
├── GameController - Gestion des parties
├── MultiplayerController - Sessions multijoueur  
├── ScenarioController - Scénarios et cartes
├── AIController - Intelligence artificielle
└── H2 Database - Stockage en mémoire
```

---

## 🎮 **1. GESTION DES PARTIES (GameController)**

### **🆕 Créer une nouvelle partie**
```javascript
// POST /api/games
const response = await fetch('http://localhost:8080/api/games', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        playerName: "Arthur",
        gameMode: "single"
    })
});
const game = await response.json();
console.log("Partie créée:", game.id);
```

### **📋 Récupérer une partie existante**
```javascript
// GET /api/games/{gameId}
const gameId = "game-1234567890";
const response = await fetch(`http://localhost:8080/api/games/${gameId}`);
const game = await response.json();

console.log("État de la partie:");
console.log("- Joueur actuel:", game.currentPlayer.username);
console.log("- Tour:", game.currentTurn);
console.log("- Héros:", game.currentPlayer.heroes);
console.log("- Ressources:", game.currentPlayer.resources);
```

### **🗺️ Récupérer la carte hexagonale**
```javascript
// GET /api/games/{gameId}/map
const response = await fetch(`http://localhost:8080/api/games/${gameId}/map`);
const map = await response.json();

// map est un tableau 2D d'hexagones
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        const hex = map[y][x];
        console.log(`Hex (${x},${y}):`, hex.terrain, hex.objects);
    }
}
```

---

## 🦸 **2. GESTION DES HÉROS**

### **🚶 Déplacer un héros**
```javascript
// POST /api/games/{gameId}/heroes/{heroId}/move
const heroId = "hero-1";
const targetPosition = { x: 5, y: 7 };

const response = await fetch(`http://localhost:8080/api/games/${gameId}/heroes/${heroId}/move`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(targetPosition)
});

const moveAction = await response.json();
console.log("Mouvement programmé:", moveAction.executionTime);
```

### **⚔️ Attaquer une cible**
```javascript
// POST /api/games/{gameId}/heroes/{heroId}/attack
const targetId = "enemy-creature-1";

const response = await fetch(`http://localhost:8080/api/games/${gameId}/heroes/${heroId}/attack`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetId: targetId })
});

const attackAction = await response.json();
console.log("Attaque lancée:", attackAction.combatPreview);
```

### **👥 Recruter des unités**
```javascript
// POST /api/games/{gameId}/heroes/{heroId}/recruit
const recruitment = {
    unitType: "archer",
    quantity: 10,
    buildingId: "barracks-1"
};

const response = await fetch(`http://localhost:8080/api/games/${gameId}/heroes/${heroId}/recruit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recruitment)
});

const recruitAction = await response.json();
console.log("Recrutement:", recruitAction);
```

---

## 🏰 **3. GESTION DES BÂTIMENTS**

### **🔨 Construire un bâtiment**
```javascript
// POST /api/games/{gameId}/buildings/build
const building = {
    buildingType: "barracks",
    positionX: 3,
    positionY: 4,
    playerId: "player1"
};

const response = await fetch(`http://localhost:8080/api/games/${gameId}/buildings/build`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(building)
});

const buildAction = await response.json();
console.log("Construction lancée:", buildAction.constructionTime, "secondes");
```

### **📊 Voir les bâtiments du joueur**
```javascript
// GET /api/games/{gameId}/buildings/player/{playerId}
const playerId = "player1";
const response = await fetch(`http://localhost:8080/api/games/${gameId}/buildings/player/${playerId}`);
const buildings = await response.json();

buildings.forEach(building => {
    console.log(`${building.buildingType} - Niveau ${building.level}`);
    console.log(`Construit: ${building.isConstructed ? 'Oui' : 'En cours'}`);
});
```

---

## ⏰ **4. GESTION DES TOURS**

### **✅ Terminer son tour**
```javascript
// POST /api/games/{gameId}/end-turn
const response = await fetch(`http://localhost:8080/api/games/${gameId}/end-turn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerId: "player1" })
});

const result = await response.json();
console.log("Tour terminé, nouveau joueur actif:", result.nextPlayerId);
```

### **📋 Voir les actions en attente**
```javascript
// GET /api/games/{gameId}/actions/pending
const response = await fetch(`http://localhost:8080/api/games/${gameId}/actions/pending`);
const pendingActions = await response.json();

pendingActions.forEach(action => {
    console.log(`Action ${action.type} - Status: ${action.status}`);
    console.log(`Exécution prévue: ${action.executionTime}`);
});
```

---

## 🌐 **5. MULTIJOUEUR (MultiplayerController)**

### **🆕 Créer une session multijoueur**
```javascript
// POST /api/multiplayer/sessions
const session = {
    sessionName: "Partie Epic",
    maxPlayers: 4,
    gameMode: "arena",
    createdBy: "player1"
};

const response = await fetch('http://localhost:8080/api/multiplayer/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(session)
});

const newSession = await response.json();
console.log("Session créée:", newSession.sessionId);
```

### **🚪 Rejoindre une session**
```javascript
// POST /api/multiplayer/sessions/{sessionId}/join
const sessionId = "multiplayer-session-1234";
const response = await fetch(`http://localhost:8080/api/multiplayer/sessions/${sessionId}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerId: "player2" })
});

const session = await response.json();
console.log("Rejoint session:", session.currentPlayers, "/", session.maxPlayers);
```

### **🎮 Démarrer la partie multijoueur**
```javascript
// POST /api/multiplayer/sessions/{sessionId}/start
const response = await fetch(`http://localhost:8080/api/multiplayer/sessions/${sessionId}/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerId: "player1" })
});

const startedSession = await response.json();
console.log("Partie démarrée:", startedSession.status);
```

---

## 🗺️ **6. SCÉNARIOS (ScenarioController)**

### **📋 Lister les scénarios disponibles**
```javascript
// GET /api/scenarios
const response = await fetch('http://localhost:8080/api/scenarios');
const scenarios = await response.json();

scenarios.forEach(scenario => {
    console.log(`${scenario.name} - ${scenario.difficulty}`);
    console.log(`Joueurs: ${scenario.maxPlayers} - Carte: ${scenario.mapWidth}x${scenario.mapHeight}`);
});
```

### **🎯 Charger un scénario spécifique**
```javascript
// GET /api/scenarios/{scenarioId}
const scenarioId = "tutorial-basic";
const response = await fetch(`http://localhost:8080/api/scenarios/${scenarioId}`);
const scenario = await response.json();

console.log("Scénario:", scenario.name);
console.log("Objectifs:", scenario.objectives);
console.log("Positions de départ:", scenario.startingPositions);
```

---

## 🤖 **7. INTELLIGENCE ARTIFICIELLE (AIController)**

### **🧠 Ajouter un joueur IA**
```javascript
// POST /api/ai/players
const aiPlayer = {
    gameId: gameId,
    playerName: "IA Morgana",
    difficultyLevel: "normal",
    aiPersonality: "aggressive",
    faction: "inferno"
};

const response = await fetch('http://localhost:8080/api/ai/players', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aiPlayer)
});

const ai = await response.json();
console.log("IA créée:", ai.aiPlayerId);
```

### **⚡ Déclencher tour de l'IA**
```javascript
// POST /api/ai/players/{aiPlayerId}/turn
const response = await fetch(`http://localhost:8080/api/ai/players/${ai.aiPlayerId}/turn`, {
    method: 'POST'
});

const aiActions = await response.json();
console.log("Actions IA:", aiActions);
```

---

## 💡 **8. EXEMPLES PRATIQUES COMPLETS**

### **🎮 Exemple : Démarrer une partie simple**
```javascript
async function startSimpleGame() {
    // 1. Créer une partie
    const gameResponse = await fetch('http://localhost:8080/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName: "Arthur", gameMode: "single" })
    });
    const game = await gameResponse.json();
    
    // 2. Récupérer l'état initial
    const stateResponse = await fetch(`http://localhost:8080/api/games/${game.id}`);
    const gameState = await stateResponse.json();
    
    // 3. Récupérer la carte
    const mapResponse = await fetch(`http://localhost:8080/api/games/${game.id}/map`);
    const map = await mapResponse.json();
    
    console.log("Partie prête!", {
        gameId: game.id,
        hero: gameState.currentPlayer.heroes[0],
        mapSize: `${map.length}x${map[0].length}`
    });
    
    return { gameId: game.id, gameState, map };
}
```

### **⚔️ Exemple : Combat complet**
```javascript
async function performCombat(gameId, heroId, targetId) {
    // 1. Lancer l'attaque
    const attackResponse = await fetch(`http://localhost:8080/api/games/${gameId}/heroes/${heroId}/attack`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetId: targetId })
    });
    const attack = await attackResponse.json();
    
    // 2. Attendre l'exécution (simulation)
    setTimeout(async () => {
        // 3. Vérifier le résultat
        const stateResponse = await fetch(`http://localhost:8080/api/games/${gameId}`);
        const newState = await stateResponse.json();
        
        console.log("Combat terminé!", newState.currentPlayer.heroes[0].health);
    }, 5000); // Les combats prennent 5 secondes
}
```

---

## 🔧 **9. GESTION D'ERREURS**

### **❌ Gestion des erreurs courantes**
```javascript
async function safeApiCall(url, options = {}) {
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            const error = await response.json();
            console.error("Erreur API:", error.message);
            return null;
        }
        
        return await response.json();
    } catch (error) {
        console.error("Erreur réseau:", error.message);
        return null;
    }
}

// Utilisation
const game = await safeApiCall('http://localhost:8080/api/games/invalid-id');
if (!game) {
    console.log("Impossible de récupérer la partie");
}
```

---

## 🚀 **10. INTÉGRATION FRONTEND SIMPLE**

### **🌐 Template HTML + JavaScript**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Heroes of Time - Simple Frontend</title>
</head>
<body>
    <div id="game-container">
        <h1>Heroes of Time</h1>
        <button onclick="createGame()">🎮 Nouvelle Partie</button>
        <button onclick="moveHero()">🚶 Déplacer Héros</button>
        <button onclick="endTurn()">✅ Fin de Tour</button>
        
        <div id="game-info"></div>
        <div id="map-container"></div>
    </div>

    <script>
        let currentGame = null;
        
        async function createGame() {
            const response = await fetch('http://localhost:8080/api/games', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playerName: "Arthur", gameMode: "single" })
            });
            
            currentGame = await response.json();
            updateGameDisplay();
        }
        
        async function updateGameDisplay() {
            if (!currentGame) return;
            
            const response = await fetch(`http://localhost:8080/api/games/${currentGame.id}`);
            const gameState = await response.json();
            
            document.getElementById('game-info').innerHTML = `
                <h3>Partie: ${currentGame.id}</h3>
                <p>Joueur: ${gameState.currentPlayer.username}</p>
                <p>Tour: ${gameState.currentTurn}</p>
                <p>Or: ${gameState.currentPlayer.resources.gold}</p>
                <p>Héros: ${gameState.currentPlayer.heroes[0].name}</p>
            `;
        }
        
        async function moveHero() {
            if (!currentGame) return;
            
            const heroId = "hero-1";
            const position = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
            
            await fetch(`http://localhost:8080/api/games/${currentGame.id}/heroes/${heroId}/move`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(position)
            });
            
            console.log(`Héros déplacé vers (${position.x}, ${position.y})`);
        }
        
        async function endTurn() {
            if (!currentGame) return;
            
            await fetch(`http://localhost:8080/api/games/${currentGame.id}/end-turn`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playerId: "player1" })
            });
            
            updateGameDisplay();
        }
    </script>
</body>
</html>
```

---

## 📝 **RÉSUMÉ ULTRA-RAPIDE**

### **🎯 ENDPOINTS ESSENTIELS :**
1. **POST /api/games** → Créer partie
2. **GET /api/games/{id}** → État de la partie  
3. **GET /api/games/{id}/map** → Carte hexagonale
4. **POST /api/games/{id}/heroes/{heroId}/move** → Déplacer héros
5. **POST /api/games/{id}/end-turn** → Terminer tour

### **💡 CONSEILS PRATIQUES :**
- ✅ **Backend stable** sur port 8080
- ✅ **Toutes les réponses en JSON**
- ✅ **Actions asynchrones** avec temps d'exécution
- ✅ **Gestion automatique** des tours et états
- ✅ **H2 Database** en mémoire (redémarre à chaque restart)

### **🚀 PRÊT À CODER !**
Cette doc te donne TOUT ce qu'il faut pour connecter n'importe quel frontend simple au backend Heroes of Time. Pas de fait mais, que du concret ! 🎮⚡

---

**📋 Status :** ✅ **DOCUMENTATION COMPLÈTE LIVRÉE**  
**🎯 Next Step :** Copier-coller les exemples et CODER ! 🔥 