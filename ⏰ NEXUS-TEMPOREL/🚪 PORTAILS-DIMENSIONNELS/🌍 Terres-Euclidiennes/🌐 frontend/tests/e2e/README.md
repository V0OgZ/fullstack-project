# 🎮 Heroes of Time - Tests E2E

## 🎯 Tests Fonctionnels

### ✅ Démos Disponibles

#### 1. **Démo Solo** - `gameplay-demo.spec.ts`
```bash
npx playwright test gameplay-demo.spec.ts --headed
```
- **Fonctionnalité** : Démonstration complète du gameplay solo
- **Scénario** : Conquest Classic  
- **Actions** : Sélection héros, déplacement, fin de tour
- **Durée** : ~30 secondes
- **Résultat** : ✅ Fonctionne parfaitement

#### 2. **Démo Multi** - `multiplayer-demo.spec.ts`
```bash
npx playwright test multiplayer-demo.spec.ts --headed
```
- **Fonctionnalité** : Démonstration du système multiplayer
- **Scénario** : Multiplayer Arena
- **Actions** : Création session, connexion 2 joueurs, démarrage
- **Durée** : ~60 secondes
- **Résultat** : ⚠️ Nécessite 2 joueurs humains pour démarrer

### 🚀 Utilisation

```bash
# Démarrer le jeu
cd .. && ./start-app.sh

# Lancer les démos
cd frontend
npx playwright test --headed

# Tests individuels
npx playwright test gameplay-demo.spec.ts --headed
npx playwright test multiplayer-demo.spec.ts --headed
```

### 📁 Fichiers Archivés

Le dossier `archived/` contient les anciens tests conservés pour référence historique.

### 🎮 Jeu Manuel

Pour jouer manuellement :
- **Solo** : http://localhost:3000 → Conquest Classic/Temporal Rift
- **Multi** : http://localhost:3000 → Multiplayer Arena (ouvrir 2 onglets)

---

**Status** : ✅ Tests nettoyés et fonctionnels - Janvier 2025 