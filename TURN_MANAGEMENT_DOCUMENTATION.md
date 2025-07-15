# 🎮 Turn Management System - Heroes of Time

## 📋 État Actuel du Système

### ❌ Problèmes Identifiés
1. **Système bloqué au tour 1** - Le jeu ne progresse pas au-delà du premier tour
2. **Pas de vraie logique de tours** - Actuellement juste un compteur qui s'incrémente
3. **Confusion entre modes** - Hotseat vs Multiplayer non distingués
4. **Incohérence des IDs joueurs** - Mélange entre `player1`/`player2` et `player-1`/`player-2`

### ✅ Ce qui Fonctionne Actuellement
- Bouton "End Turn" présent dans l'interface
- API backend `/api/games/{gameId}/end-turn` existe
- Validation "Not your turn" opérationnelle
- Système de GameState avec `currentPlayerId`

---

## 🎯 Modes de Jeu et Gestion des Tours

### 🏠 Mode Hotseat (Hot Seat)
**Utilisation :** Cartes non-multiplayer (ex: Conquest Classic, Temporal Rift)
- **Principe :** Joueurs alternent sur la même machine
- **Gestion :** Frontend manage le passage de tour
- **Joueurs :** `player1`, `player2`, etc.
- **Interface :** Bouton "Next Player" au lieu de "End Turn"

### 🌐 Mode Multiplayer (Réseau)
**Utilisation :** Cartes multiplayer (ex: Multiplayer Arena)
- **Principe :** Joueurs connectés depuis différentes machines
- **Gestion :** Backend centralise l'état des tours
- **Joueurs :** IDs uniques par session
- **Interface :** Bouton "End Turn" avec synchronisation réseau

---

## 🔧 Architecture Technique

### Backend (Spring Boot)
```java
// GameState.java
public class GameState {
    private String gameId;
    private String currentPlayerId;
    private Integer currentTurn;
    private LocalDateTime turnStartTime;
    private GameMode gameMode; // HOTSEAT, MULTIPLAYER
    private List<String> playerOrder;
    private GameStatus gameStatus;
}
```

### Frontend (React)
```typescript
// useGameStore.ts
interface GameStore {
    currentGame: Game;
    currentPlayer: Player;
    endTurn: () => Promise<void>;
    nextPlayer: () => void; // Pour hotseat
    getCurrentTurnInfo: () => TurnInfo;
}
```

---

## 🚀 Implémentation Correcte

### 1. Distinction des Modes
```typescript
const handleTurnEnd = () => {
    if (currentGame.gameMode === 'hotseat') {
        nextPlayer(); // Gestion locale frontend
    } else {
        endTurn(); // Appel API backend
    }
};
```

### 2. Gestion Hotseat (Frontend)
```typescript
nextPlayer: () => {
    const { currentGame, currentPlayer, switchPlayer } = get();
    const currentIndex = currentGame.players.findIndex(p => p.id === currentPlayer.id);
    const nextIndex = (currentIndex + 1) % currentGame.players.length;
    const nextPlayer = currentGame.players[nextIndex];
    
    // Passer au joueur suivant
    switchPlayer(nextPlayer.id);
    
    // Incrémenter le tour si on revient au premier joueur
    if (nextIndex === 0) {
        set(state => ({
            currentGame: {
                ...state.currentGame,
                currentTurn: state.currentGame.currentTurn + 1
            }
        }));
    }
}
```

### 3. Gestion Multiplayer (Backend)
```java
@PostMapping("/games/{gameId}/end-turn")
public ResponseEntity<Map<String, Object>> endTurn(@PathVariable String gameId, @RequestBody Map<String, String> request) {
    String playerId = request.get("playerId");
    
    // Validation du tour
    if (!gameStateService.isPlayerTurn(gameId, playerId)) {
        return ResponseEntity.badRequest().body(Map.of("error", "Not your turn"));
    }
    
    // Passage au joueur suivant
    gameStateService.endPlayerTurn(gameId, playerId);
    
    // Réponse avec nouvel état
    GameState gameState = gameStateService.getOrCreateGameState(gameId);
    return ResponseEntity.ok(Map.of(
        "success", true,
        "currentTurn", gameState.getCurrentTurn(),
        "currentPlayerId", gameState.getCurrentPlayerId()
    ));
}
```

---

## 🔍 Diagnostic des Problèmes

### Problème 1 : Tour bloqué au 1
**Cause :** Le système n'incrémente pas `currentTurn` correctement
**Solution :** Implémenter la logique d'incrémentation dans `GameStateService.endPlayerTurn()`

### Problème 2 : IDs joueurs incohérents
**Cause :** Mélange entre `player1` et `player-1`
**Solution :** Standardiser sur `player1`, `player2` partout

### Problème 3 : Pas de distinction Hotseat/Multiplayer
**Cause :** Même logique pour les deux modes
**Solution :** Ajouter `gameMode` à `Game` et traiter différemment

---

## 📊 Flux de Données

### Mode Hotseat
```
[Frontend] User clicks "Next Player"
    ↓
[Frontend] nextPlayer() - Local state change
    ↓
[Frontend] Update UI to show next player
    ↓
[Frontend] Increment turn if back to player 1
```

### Mode Multiplayer
```
[Frontend] User clicks "End Turn"
    ↓
[API] POST /games/{gameId}/end-turn
    ↓
[Backend] Validate current player
    ↓
[Backend] Move to next player
    ↓
[Backend] Increment turn if needed
    ↓
[Response] New game state
    ↓
[Frontend] Update UI with new state
```

---

## 🛠️ Corrections Nécessaires

### 1. Backend - GameStateService.java
```java
public GameState endPlayerTurn(String gameId, String currentPlayerId) {
    GameState state = getOrCreateGameState(gameId);
    
    // Trouver le joueur suivant
    List<String> players = Arrays.asList("player1", "player2"); // Ou depuis DB
    int currentIndex = players.indexOf(currentPlayerId);
    int nextIndex = (currentIndex + 1) % players.size();
    String nextPlayerId = players.get(nextIndex);
    
    // Mettre à jour l'état
    state.setCurrentPlayerId(nextPlayerId);
    state.setTurnStartTime(LocalDateTime.now());
    
    // Incrémenter le tour si on revient au premier joueur
    if (nextIndex == 0) {
        state.setCurrentTurn(state.getCurrentTurn() + 1);
    }
    
    return updateGameState(state);
}
```

### 2. Frontend - useGameStore.ts
```typescript
endTurn: async () => {
    const { currentGame, currentPlayer, setLoading, setError, refreshGameState } = get();
    
    if (currentGame.gameMode === 'hotseat') {
        // Mode hotseat - gestion locale
        get().nextPlayer();
    } else {
        // Mode multiplayer - appel API
        setLoading(true);
        try {
            await GameService.endTurn(currentGame.id, currentPlayer.id);
            await refreshGameState();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
}
```

### 3. Interface - TrueHeroesInterface.tsx
```typescript
const buttonText = currentGame.gameMode === 'hotseat' ? t('nextPlayer') : t('endTurn');
const buttonIcon = currentGame.gameMode === 'hotseat' ? '👤' : '⭐';
```

---

## 🎮 Interface Utilisateur

### Informations Affichées
- **Tour actuel** : "Tour 5"
- **Joueur actuel** : "Player 1" ou nom du joueur
- **Mode de jeu** : Hotseat ou Multiplayer
- **Temps restant** : Si limité par temps

### Boutons
- **Hotseat** : "Next Player" (👤)
- **Multiplayer** : "End Turn" (⭐)

---

## 🧪 Tests Requis

### Tests Backend
- Validation "Not your turn"
- Passage au joueur suivant
- Incrémentation du tour
- Gestion des erreurs

### Tests Frontend
- Mode hotseat vs multiplayer
- Mise à jour de l'interface
- Gestion des erreurs réseau

---

## 📈 Métriques et Monitoring

### Données à Tracker
- Durée moyenne des tours
- Nombre de tours par partie
- Erreurs "Not your turn"
- Performances des appels API

### Logs Importants
- Changements de joueur
- Incrémentation des tours
- Erreurs de validation
- Timeouts de tour

---

## 🔮 Améliorations Futures

### Court terme
- Timer par tour
- Notifications de changement de joueur
- Historique des tours

### Long terme
- Tours simultanés
- Actions programmées
- IA avancée pour les tours

---

## 📋 Checklist de Correction

- [ ] Corriger `GameStateService.endPlayerTurn()`
- [ ] Standardiser les IDs joueurs sur `player1`/`player2`
- [ ] Ajouter `gameMode` à l'interface `Game`
- [ ] Implémenter `nextPlayer()` pour hotseat
- [ ] Mettre à jour l'interface utilisateur
- [ ] Tester les deux modes
- [ ] Documenter les changements
- [ ] Déployer et vérifier

---

**Dernière mise à jour :** 15 Juillet 2025
**Version :** 1.0
**Auteur :** System Architecture Team 