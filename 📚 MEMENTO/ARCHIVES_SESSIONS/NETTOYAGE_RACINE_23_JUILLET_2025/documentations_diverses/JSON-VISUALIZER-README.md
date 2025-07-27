# 📊 Heroes of Time - JSON Visualizer

**Visualiseur intelligent de tous les JSON du projet avec icônes et interface moderne**

## 🎯 **Objectif**

Afficher de manière visuelle et intuitive tous les fichiers JSON du projet Heroes of Time :
- **⚔️ Héros** (Arthur, Ragnar, Lysandrel, Morgana...)
- **🐉 Créatures** (Créatures quantiques, dragons...)  
- **💎 Artefacts** (Lame d'Avant-Monde, Œil de Wigner...)
- **📜 Scénarios** (Bataille temporelle, Duel collapse...)
- **⚛️ Quantum** (Amplitude complexes, interférences...)

## ✨ **Features**

### 🎨 **Détection Automatique Intelligente**
- **Analyse du contenu et du chemin** pour déterminer le type
- **Icônes automatiques** : ⚔️ Héros, 🐉 Créatures, 💎 Artefacts
- **Classification précise** basée sur patterns et mots-clés

### 🔍 **Recherche Avancée**
- **Recherche globale** dans tous les JSON simultanément
- **Recherche par contenu** ET par nom de fichier
- **Filtres par catégorie** (Héros, Créatures, Artefacts, etc.)

### 📈 **Interface Moderne**
- **Statistiques live** → Compteurs automatiques
- **Coloration syntaxique** → JSON coloré et lisible
- **Cards interactives** → Survol et clic pour détails
- **Design responsive** → Fonctionne sur mobile

### 🌐 **Compatible GitHub**
- **Fichier HTML statique** → Fonctionne directement sur GitHub
- **Liens directs** vers les fichiers raw sur GitHub
- **Pas de serveur requis** → Ouvrir directement dans le navigateur

## 🚀 **Comment l'utiliser**

### 📱 **Depuis le Dashboard**
1. Ouvrir `dashboard.html`
2. Cliquer sur **"📊 JSON Visualizer"**
3. Bouton **"📊 EXPLORER LES JSON !"**

### 🌐 **Directement**
1. Ouvrir `json-visualizer.html` dans le navigateur
2. Attendre le chargement des JSON depuis GitHub
3. Explorer, rechercher, filtrer !

### 🔗 **Sur GitHub**
Le visualiseur fonctionne directement depuis GitHub Pages ou via raw.githubusercontent.com

## 📂 **JSON Détectés Automatiquement**

| **Type** | **Icône** | **Fichiers Detectés** |
|----------|-----------|----------------------|
| **Héros** | ⚔️ | `heroes/`, `Arthur.json`, `Ragnar.json`, `GROFI/` |
| **Créatures** | 🐉 | `creatures.json`, `quantum-creatures.json`, `dragon` |
| **Artefacts** | 💎 | `artifacts.json`, `blade`, `mirror`, `temporal` |
| **Scénarios** | 📜 | `scenarios/`, `battle`, `DUEL`, `ECLAT` |
| **Quantum** | ⚛️ | `quantum`, `temporal`, `psi`, `amplitude` |
| **Config** | ⚙️ | `config`, `settings`, `manifest`, `package` |

## 🎨 **Fonctionnalités Avancées**

### 🔍 **Recherche Intelligente**
```
Exemples de recherches :
- "Arthur" → Trouve tous les JSON contenant Arthur
- "quantum" → Trouve créatures quantiques, artefacts, etc.
- "blade" → Trouve Lame d'Avant-Monde et autres lames
- "temporal" → Trouve tout ce qui touche au temps
```

### 📊 **Statistiques Automatiques**
- **Total de fichiers JSON** dans le projet
- **Nombre de héros** définis
- **Nombre de créatures** disponibles  
- **Nombre d'artefacts** créés

### 🎯 **Aperçu JSON Coloré**
- **Clés** en turquoise
- **Strings** en vert
- **Nombres** en orange
- **Booléens** en rouge
- **Préview limitée** pour éviter la surcharge

## 🛠️ **Architecture Technique**

### 📡 **Chargement Dynamique**
```javascript
// Chargement depuis GitHub raw URLs
const jsonFiles = [
    {
        path: 'backend/src/main/resources/heroes/Arthur.json',
        url: 'https://raw.githubusercontent.com/V0OgZ/Heroes-of-Time/poc-heroes-of-time/...'
    },
    // ...
];
```

### 🎨 **Détection de Type**
```javascript
function detectJsonType(filename, data) {
    const content = JSON.stringify(data).toLowerCase();
    const path = filename.toLowerCase();
    
    // Analyse patterns dans nom + contenu
    for (const [type, config] of Object.entries(jsonTypes)) {
        for (const pattern of config.patterns) {
            if (path.includes(pattern) || content.includes(pattern)) {
                return type;
            }
        }
    }
}
```

### 🌈 **Coloration Syntaxique**
```javascript
// Coloration JSON simple mais efficace
return line
    .replace(/"([^"]+)":/g, '<span class="json-key">"$1":</span>')
    .replace(/: "([^"]+)"/g, ': <span class="json-string">"$1"</span>')
    .replace(/: (\d+)/g, ': <span class="json-number">$1</span>');
```

## 🎯 **Cas d'Usage**

### 👨‍💻 **Pour les Développeurs**
- **Explorer rapidement** tous les JSON du projet
- **Comprendre la structure** des données
- **Retrouver des patterns** dans les définitions

### 🎮 **Pour les Game Designers**
- **Visualiser les héros** disponibles
- **Explorer les créatures** et leurs stats
- **Analyser les artefacts** et leurs effets

### 📊 **Pour les Analystes**
- **Statistiques globales** du contenu
- **Recherche cross-fichiers** efficace
- **Vue d'ensemble** du project data

## 🚀 **Évolutions Possibles**

### 🔮 **Version Future**
- **Graphiques D3.js** → Relations entre héros/artefacts
- **Comparateur** → Comparer 2 héros côte à côte
- **Export** → Générer des rapports
- **API intégration** → Données live depuis le backend

### 🎨 **Améliorations UI**
- **Mode sombre/clair**
- **Thèmes personnalisables**  
- **Favoris** → Marquer JSON importants
- **Historique** → Recherches récentes

---

## 🎯 **RÉSULTAT**

**Un visualiseur JSON intelligent, moderne et fonctionnel qui transforme l'exploration des données du projet en expérience visuelle agréable !** 📊✨

**Compatible GitHub, pas de serveur requis, interface intuitive avec icônes !** 🌐🎨 