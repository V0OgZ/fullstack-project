# 🗺️ PLAN D'ACTION - RESTAURATION SYSTÈME HEXAGONAL ET TERRAIN

## 📋 Résumé de la situation

1. **Frontend actuel** : `vince-vega-map-demo-backend.html` utilise une grille carrée simple
2. **Version backup** : `vince-vega-map-demo-backend-BACKUP.html` a aussi une grille carrée
3. **Version hexagonale** : `vince-vega-hexagon-battlefield.html` a le système hexagonal !
4. **Backend** : Port 8080, génère déjà des objets (mines, trésors, châteaux)

## 🎯 Objectifs

### 1. Restaurer le système hexagonal
- Rollback vers le système hexagonal de `vince-vega-hexagon-battlefield.html`
- Garder l'interface Vince Vega mais avec des hexagones

### 2. Implémenter les types de terrain
Selon `TERRAIN_LOGIC.md` et `RECOVERED_TERRAIN_ALGORITHMS_DAVID_GERVAIS.md` :
- **Types** : grass, forest, water, mountain, desert, swamp
- **Élévation** : 0.0 à 1.0 pour effet 3D
- **Biomes** : Génération procédurale avec flood-fill
- **Transitions** : Entre différents types de terrain

### 3. Ajouter des objets sur la map
Le backend (`GameService.java`) génère déjà :
- Mines d'or (1000 gold/jour)
- Scieries (2 wood/jour)
- Mines de minerai (2 ore/jour)  
- Coffres au trésor (1500-2500 gold + XP)
- Châteaux des joueurs

Il faut les afficher sur la map hexagonale !

## 🛠️ Implémentation proposée

### Phase 1 : Restaurer les hexagones
```javascript
// Reprendre le code de vince-vega-hexagon-battlefield.html
// Adapter pour vince-vega-map-demo-backend.html
const createHexagonalGrid = () => {
    // Grille 9x7 = 63 hexagones
    // Utiliser le système de coordonnées axiales
}
```

### Phase 2 : Types de terrain
```javascript
const TERRAIN_TYPES = {
    grass: { color: '#4CAF50', elevation: 0.5, movementCost: 1 },
    forest: { color: '#2E7D32', elevation: 0.7, movementCost: 2 },
    water: { color: '#2196F3', elevation: 0.2, movementCost: 999 },
    mountain: { color: '#795548', elevation: 1.0, movementCost: 3 },
    desert: { color: '#FF9800', elevation: 0.6, movementCost: 2 },
    swamp: { color: '#607D8B', elevation: 0.3, movementCost: 3 }
};
```

### Phase 3 : Objets sur la map
```javascript
// Récupérer les objets depuis le backend
fetch('/api/game/' + gameId + '/objects')
    .then(objects => {
        objects.forEach(obj => {
            if (obj.type === 'mine') {
                placeGoldMine(obj.x, obj.y);
            } else if (obj.type === 'treasure') {
                placeTreasureChest(obj.x, obj.y);
            }
            // etc...
        });
    });
```

### Phase 4 : Petites décorations
Ajouter des éléments visuels qui ne sont pas gameplay :
- 🌸 Fleurs dans les prairies
- 🌲 Arbres isolés
- 🗿 Rochers
- 🦋 Créatures ambiantes

## 📁 Fichiers à modifier

1. **Frontend principal** : `frontend/vince-vega-map-demo-backend.html`
   - Remplacer la grille carrée par hexagonale
   - Ajouter système de terrain
   - Afficher les objets du backend

2. **Backend** : Vérifier que `/api/game/{id}/map` envoie bien :
   - Types de terrain par hexagone
   - Liste des objets (mines, trésors, etc.)
   - Positions des héros

3. **CSS** : Adapter les styles pour les hexagones
   - Hover effects
   - Animations
   - Couleurs par type de terrain

## 🔮 Concepts avancés à intégrer

D'après les tatouages de Memento et le codex temporel :
- **États quantiques ψ** : Certains hexagones en superposition
- **Portails** : Entre différentes zones de la map
- **Zones temporelles** : Où le temps s'écoule différemment
- **Projection Groffienne** : Différentes vues de la même réalité

## 🚀 Prochaines étapes

1. **Backup** l'actuel `vince-vega-map-demo-backend.html`
2. **Copier** le système hexagonal de `vince-vega-hexagon-battlefield.html`
3. **Intégrer** les types de terrain
4. **Connecter** au backend pour récupérer les objets
5. **Tester** avec différents scénarios HOTS

*"Les hexagones sont la forme parfaite - GRUT approuve !"*