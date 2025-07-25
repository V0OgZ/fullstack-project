# Test des Interfaces Heroes of Time

## Vue d'ensemble

Ce test automatisé vérifie le bon fonctionnement des deux interfaces du projet Heroes of Time :
- **Interface classique** : Frontend statique avec console de script temporel
- **Interface temporelle** : Frontend avancé avec moteur quantique

## Fonctionnalités du test

### 1. Lancement automatique des serveurs
- Démarre le serveur Python pour l'interface classique (port 8000)
- Démarre le serveur Vite pour l'interface temporelle (port 5173)

### 2. Capture d'écran automatisée
- Prend des screenshots de chaque interface
- Compare avec des références stockées
- Génère un rapport détaillé

### 3. Tests d'interaction
- Teste la console de script (ψ, †, Π, Δt)
- Vérifie les boutons quantiques
- Valide l'affichage des états temporels

## Installation

```bash
# Installation des dépendances
npm install

# Installation des navigateurs Playwright
npx playwright install
```

## Utilisation

### Lancement du test complet
```bash
npm test
```

### Lancement du test de screenshots uniquement
```bash
npm run test-screenshots
```

### Lancement manuel
```bash
node test-dual-interface.js
```

## Structure des fichiers générés

```
/
├── test-dual-interface.js    # Script principal
├── test-screenshots/         # Screenshots actuels
│   ├── frontend-classic-initial.png
│   ├── frontend-classic-script.png
│   ├── frontend-classic-executed.png
│   ├── frontend-temporal-initial.png
│   ├── frontend-temporal-interaction.png
│   └── frontend-temporal-final.png
├── test-references/          # Images de référence
│   └── (mêmes fichiers que test-screenshots)
└── test-report.json         # Rapport détaillé
```

## Rapport généré

Le test génère un fichier `test-report.json` avec :
- Timestamp d'exécution
- Status des deux interfaces
- Liste des screenshots générés
- Ports utilisés

Exemple :
```json
{
  "timestamp": "2025-07-17T20:00:00.000Z",
  "frontend_classic": {
    "port": 8000,
    "status": "tested",
    "screenshots": ["frontend-classic-initial", "frontend-classic-script", "frontend-classic-executed"]
  },
  "frontend_temporal": {
    "port": 5173,
    "status": "tested",
    "screenshots": ["frontend-temporal-initial", "frontend-temporal-interaction", "frontend-temporal-final"]
  }
}
```

## Détails techniques

### Interface classique (frontend/)
- **Port** : 8000
- **Serveur** : Python HTTP server
- **Tests** :
  - Chargement initial
  - Interaction avec `#script-input`
  - Exécution de commandes quantiques

### Interface temporelle (frontend-temporal/)
- **Port** : 5173
- **Serveur** : Vite dev server
- **Tests** :
  - Chargement initial
  - Détection des boutons quantiques
  - Interaction avec les états ψ

### Configuration

Le fichier `test-dual-interface.js` contient une configuration modifiable :

```javascript
const CONFIG = {
    FRONTEND_PORT: 8000,
    FRONTEND_TEMPORAL_PORT: 5173,
    SCREENSHOTS_DIR: './test-screenshots',
    REFERENCE_DIR: './test-references',
    TIMEOUT: 30000
};
```

## Prérequis

- Node.js 14+
- Python 3.6+
- Playwright
- Les deux serveurs doivent être configurés

## Dépannage

### Erreur : "Serveur non disponible"
```bash
# Vérifier les ports
netstat -an | grep :8000
netstat -an | grep :5173

# Tuer les processus existants
pkill -f "python3 -m http.server"
pkill -f "vite"
```

### Erreur : "Screenshots différents"
- Première exécution : création automatique des références
- Exécutions suivantes : comparaison avec les références existantes
- Supprimer `test-references/` pour recréer les références

### Erreur : "Playwright non installé"
```bash
npx playwright install
```

## Intégration Git

Pour ajouter ce test au repository :

```bash
# Ajouter les fichiers de test
git add test-dual-interface.js
git add package.json
git add TEST_INTERFACES_DOCUMENTATION.md

# Ignorer les screenshots (optionnel)
echo "test-screenshots/" >> .gitignore
echo "test-references/" >> .gitignore
echo "test-report.json" >> .gitignore

# Commit
git commit -m "Ajout du test automatisé des interfaces duales"
```

## Évolutions possibles

### Phase 1 - Comparaison visuelle
- Implémentation de la comparaison pixel par pixel
- Détection des différences visuelles significatives
- Seuils de tolérance configurables

### Phase 2 - Tests d'interaction avancés
- Simulation de séquences de jeu complètes
- Test des commandes quantiques complexes
- Validation des états temporels

### Phase 3 - Intégration CI/CD
- Exécution automatique sur commit
- Génération de rapports HTML
- Notification des régressions

## Exemple d'utilisation

```bash
# Configuration initiale
npm install
npx playwright install

# Premier test (création des références)
npm test

# Tests suivants (comparaison)
npm test

# Nettoyage
rm -rf test-screenshots test-references test-report.json
```

## Logs d'exécution

Le test affiche des logs colorés :
- 🔵 **Bleu** : Opérations en cours
- 🟢 **Vert** : Succès
- 🟡 **Jaune** : Avertissements
- 🔴 **Rouge** : Erreurs

## Support

Pour des problèmes spécifiques :
1. Vérifier que les serveurs démarrent manuellement
2. Tester Playwright séparément
3. Consulter les logs détaillés
4. Vérifier les permissions de fichiers

---

*Ce test fait partie du système de qualité du projet Heroes of Time et assure la cohérence des interfaces utilisateur.* 