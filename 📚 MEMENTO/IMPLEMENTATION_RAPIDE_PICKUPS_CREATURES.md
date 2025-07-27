# 💎 IMPLÉMENTATION RAPIDE - SYSTÈME PICKUP & CRÉATURES

*Guide pour implémenter rapidement sans casser le mode Histoire*

---

## 🐾 CRÉATURES COMMUNES À CRÉER

### Créatures Bleues (Drop fréquent)
```json
{
  "id": "slime_bleu",
  "name": "Slime Temporel Bleu",
  "type": "COMMON",
  "health": 20,
  "attack": 5,
  "defense": 2,
  "drop_rate": 0.8,
  "drops": ["potion_mineure", "cristal_temps_petit"]
}
```

### Créatures Vertes (Drop moyen)
```json
{
  "id": "gobelin_collecteur",
  "name": "Gobelin Collecteur",
  "type": "COMMON",
  "health": 30,
  "attack": 8,
  "defense": 5,
  "drop_rate": 0.5,
  "drops": ["or_10", "bois_5", "potion_moyenne"]
}
```

### Créatures Rouges (Drop rare)
```json
{
  "id": "imp_rouge",
  "name": "Imp Écarlate",
  "type": "UNCOMMON",
  "health": 50,
  "attack": 12,
  "defense": 8,
  "drop_rate": 0.3,
  "drops": ["artefact_mineur", "buff_force_temp"]
}
```

---

## 💫 SYSTÈME DE PICKUP SIMPLE

### 1. Backend - PickupService.java
```java
@Service
public class PickupService {
    
    public void spawnPickup(Position pos, String itemId) {
        // Créer l'objet sur la map
        Pickup pickup = new Pickup(itemId, pos);
        gameMap.addPickup(pickup);
    }
    
    public void checkPickup(Hero hero) {
        // Auto-ramassage si collision
        List<Pickup> nearbyPickups = gameMap.getPickupsNear(hero.position);
        for (Pickup p : nearbyPickups) {
            if (distance(hero.position, p.position) < PICKUP_RANGE) {
                applyPickup(hero, p);
                gameMap.removePickup(p);
            }
        }
    }
    
    private void applyPickup(Hero hero, Pickup pickup) {
        switch(pickup.type) {
            case "HEALTH":
                hero.heal(pickup.value);
                break;
            case "MANA":
                hero.restoreMana(pickup.value);
                break;
            case "BUFF":
                hero.applyBuff(pickup.buffType, pickup.duration);
                break;
        }
    }
}
```

### 2. Frontend - Visuel Simple
```javascript
// Affichage des pickups
function renderPickups(pickups) {
    pickups.forEach(pickup => {
        // Effet de glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = getPickupColor(pickup.type);
        
        // Icône simple
        ctx.drawImage(
            pickupIcons[pickup.type],
            pickup.x - 16,
            pickup.y - 16,
            32, 32
        );
        
        // Animation flottante
        pickup.y += Math.sin(Date.now() * 0.001) * 0.5;
    });
}

// Notification de ramassage
function showPickupNotification(item) {
    const notif = document.createElement('div');
    notif.className = 'pickup-notification';
    notif.innerHTML = `<img src="${item.icon}"> +${item.name}`;
    gameUI.appendChild(notif);
    
    // Fade out après 2 secondes
    setTimeout(() => notif.remove(), 2000);
}
```

---

## 🏗️ BÂTIMENTS MINIMAUX (OPTIONNEL)

### Structure Simple
```javascript
const BUILDINGS_SIMPLE = {
    "town_hall": {
        name: "Mairie",
        cost: { gold: 100 },
        production: { gold_per_turn: 10 },
        size: "2x2"
    },
    "barracks": {
        name: "Caserne",
        cost: { gold: 150, wood: 50 },
        production: { units: ["soldier_basic"] },
        size: "3x3"
    },
    "guard_tower": {
        name: "Tour de Garde",
        cost: { gold: 80, stone: 40 },
        effect: { defense_bonus: 5 },
        size: "1x1"
    },
    "market": {
        name: "Marché",
        cost: { gold: 120 },
        effect: { trade_bonus: 0.2 },
        size: "2x2"
    }
};
```

---

## 🎮 INTÉGRATION DANS LE MODE HISTOIRE

### Points d'intégration safe :
1. **Après chaque combat** → Les ennemis droppent des items
2. **Exploration de map** → Objets cachés brillants
3. **Coffres au trésor** → Contiennent des buffs rares
4. **Transitions de monde** → Bonus de transition

### Ce qui NE DOIT PAS changer :
- La structure narrative
- Les dialogues existants
- Les transitions entre mondes
- Le flow principal de l'histoire

---

## ⚡ CHECKLIST IMPLÉMENTATION RAPIDE

- [ ] Créer 3-5 créatures communes dans `game_assets/creatures/common/`
- [ ] Ajouter PickupService.java au backend
- [ ] Créer les icônes de pickup (potions, cristaux, or)
- [ ] Ajouter l'effet visuel de glow
- [ ] Tester le ramassage automatique
- [ ] Ajouter les notifications visuelles
- [ ] Intégrer aux combats existants
- [ ] (Optionnel) Ajouter les 4 bâtiments de base

---

## 🚀 TEMPS ESTIMÉ

- **Système pickup complet** : 2-3 heures
- **Créatures communes** : 1 heure
- **Effets visuels** : 1 heure
- **Bâtiments simples** : 2 heures (si nécessaire)

**TOTAL : 4-5 heures pour tout**

---

*Ce système améliore le gameplay sans toucher au cœur narratif !*