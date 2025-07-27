# 🏗️ ARCHITECTURE TESTS & INTERFACES - HEROES OF TIME

## 📊 **VUE D'ENSEMBLE DES PORTS & INTERFACES**

| Port | Service | Description | Utilisation |
|------|---------|-------------|-------------|
| **8080** | Backend Spring Boot | API principale | Tests intégration |
| **8000** | Frontend Classique | Interface HTML simple | Jeu de base |
| **5173** | Frontend Temporel | Interface avancée (Vite) | Tests temporels |
| **8001** | Quantum Visualizer | Visualiseur scénarios JSON | Tests visuels |
| **8888** | Test Runner | Interface de test complète | **SUITE COMPLÈTE** |

---

## 🎯 **RÉPONSE AUX QUESTIONS :**

### ❓ **"Ces scénarios codés en dur en Java, on peut les remplacer par JSON + HOTS ?"**

**✅ RÉPONSE : OUI et NON - C'est mixte !**

#### Ce qui EST hardcodé (et pourrait être externalisé) :
```java
// Dans TemporalEngineService.java
private Map<String, Object> createGameHero(Game game, String heroName) {
    Hero hero = new Hero(heroName, 10, 10); // ← Position hardcodée !
    hero.setTemporalEnergy(100);             // ← Énergie hardcodée !
    // ...
}

private Map<String, Object> moveGameHero(Game game, Map<String, String> params) {
    // Logique de mouvement hardcodée
}
```

#### Ce qui est DÉJÀ configurable :
```json
// Dans game_assets/scenarios/visualizer/BATAILLE_TEMPORELLE.json
{
  "heroes": [
    {
      "name": "Arthur",
      "startPosition": { "x": 5, "y": 5 },
      "temporalEnergy": 120,
      "inventory": ["temporal_sword", "mystic_orb"]
    }
  ]
}
```

### ❓ **"Le test d'interférence est dans la suite complète ?"**

**❌ NON - Il faut l'ajouter !**

---

## 🔧 **PLAN D'AMÉLIORATION :**

### 1. **Externaliser les Actions Hardcodées**
```java
// Au lieu de hardcodé :
Hero hero = new Hero(heroName, 10, 10);

// Charger depuis JSON :
HeroTemplate template = loadHeroTemplate(heroName);
Hero hero = new Hero(heroName, template.startX, template.startY);
```

### 2. **Ajouter le Test d'Interférence dans la Suite Complète**

---

## 🚀 **ARCHITECTURE RECOMMANDÉE :**

```
📊 NIVEAU 1: Actions Basiques (Java)
├── MOV(), CREATE(), USE(), BATTLE()  ← Garder en Java (performance)

📋 NIVEAU 2: Paramètres (JSON)  
├── Positions initiales, stats, inventaires  ← Externaliser en JSON

🌀 NIVEAU 3: Scénarios Complets (HOTS)
├── États ψ, séquences complexes  ← Déjà en HOTS ✅

🎭 NIVEAU 4: Interface Tests (Port 8888)
├── Tous les tests unifiés  ← Manque test interférence !
```

---

## 🎯 **PROCHAINES ACTIONS :**

1. **Ajouter le test d'interférence dans l'UI 8888**
2. **Vérifier si formules des artefacts sont utilisées** 
3. **Créer le scénario de l'Œil de Wigner fonctionnel**

Ça répond à tes questions ? 