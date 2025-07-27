# 💼 Instruction Cursor : Éditeur Visuel de Script Spatio-Temporel

## 🎯 Objectif

Nous voulons créer un **éditeur visuel de scripting intégré** dans le projet Heroes of Time, qui s'appuie sur notre grammaire temporelle déjà définie et implémentée.

---

## 📌 Objectifs Spécifiques

### **1. Génération Automatique de Scripts**
- **Générer, éditer et visualiser graphiquement** les scripts (MOV, USE, ψ, Π, etc.)
- **Interface point-and-click** : cliquer pour bouger un héros → génère automatiquement `MOV(Arthur, @15,15)`
- **Drag & drop** : glisser un artefact sur un héros → génère `USE(ITEM, AvantWorldBlade, HERO:Arthur)`

### **2. Visualisation Temporelle**
- **Montrer les timelines** avec branches multiples (ℬ1, ℬ2, ℬ3...)
- **Superpositions visuelles** (ψ-states) avec effets brillants et animations
- **Collapses de causalité** animés en temps réel
- **Zones de conflit** détectées et affichées visuellement

### **3. Macros Personnalisées**
- **Permettre aux utilisateurs** de créer des macros (boutons d'action) personnalisés
- **Séquences de script** complexes → un seul clic
- **Exemple** : "Capturer Mine" → `MOV + CREATE + USE + ψ` en une action

### **4. Visualisations Multi-Temporelles**
- **Supporter les visualisations** des timelines alternatives
- **Zones de conflit** spatio-temporelles
- **Prédiction des effets** avant exécution

---

## 🧱 Exigences Techniques

### **1. Lecture Dynamique de la Spec**
- **Lire dynamiquement** la spec du langage de script pour auto-générer les actions disponibles
- **Endpoint** : `GET /api/temporal/script-spec` → retourne la grammaire complète
- **Auto-génération** des boutons UI basée sur les commandes disponibles

### **2. Éditeur WYSIWYG**
- **Visualisation temporelle claire** : timeline + branches alternatives + conditions de collapse
- **Interface intuitive** : drag & drop, clic droit, menus contextuels
- **Validation en temps réel** : highlighting des erreurs, suggestions d'autocomplétion

### **3. Architecture Frontend**
- **Interface simple** (React ou autre), facilement modifiable
- **Modulaire** : composants réutilisables et extensibles
- **Responsive** : fonctionne sur desktop et mobile

### **4. Intégration Backend**
- **Tout reste piloté par le backend** : l'éditeur ne fait qu'envoyer le script
- **Le moteur central** vérifie, simule et répond
- **API REST** existante utilisée : `/api/temporal/games/{id}/script`

### **5. Zone de Test**
- **Préparer une zone de test** où les scripts sont testés localement avant d'être joués
- **Simulation** des effets sans affecter le jeu principal
- **Validation** syntaxique et sémantique

---

## 🛠️ Tech Stack Recommandé

### **Frontend**
- **React** avec TypeScript (bien supporté par les LLM)
- **react-flow** pour les graphes de timeline
- **vis-timeline** pour la visualisation temporelle
- **Canvas custom** pour les effets quantiques

### **Parsing & Validation**
- **Moteur interne** qui lit/écrit le script via AST
- **DSL parser** pour le langage temporel
- **Validation syntaxique** en temps réel

### **Communication**
- **API REST** vers backend Heroes of Time existant
- **WebSocket** pour les updates temps réel (optionnel)
- **Simulation locale** pour les tests

---

## 📋 Structure Attendue

```
visual-editor/
├── src/
│   ├── components/
│   │   ├── TimelineEditor.tsx    # Éditeur de timeline principal
│   │   ├── ScriptGenerator.tsx   # Génération automatique
│   │   ├── MacroBuilder.tsx      # Création de macros
│   │   ├── QuantumVisualizer.tsx # Visualisation ψ-states
│   │   └── ConflictDetector.tsx  # Détection conflits visuels
│   ├── parsers/
│   │   ├── ScriptParser.ts       # Parser du langage temporel
│   │   ├── ASTBuilder.ts         # Construction AST
│   │   └── Validator.ts          # Validation syntaxique
│   ├── visualizers/
│   │   ├── TimelineRenderer.ts   # Rendu des timelines
│   │   ├── PsiStateRenderer.ts   # Rendu des superpositions
│   │   └── CausalityRenderer.ts  # Rendu des causalités
│   └── api/
│       ├── BackendConnector.ts   # Connexion au moteur
│       └── SimulationEngine.ts   # Simulation locale
├── public/
│   └── index.html
├── package.json
└── README.md
```

---

## 🎮 Interface Utilisateur Attendue

### **Layout Principal**
```
┌─────────────────────────────────────────────────────────────┐
│ Visual Script Editor - Heroes of Time                       │
├─────────────────────────────────────────────────────────────┤
│ [MOV] [USE] [ψ] [Π] [†] | [Macro1] [Macro2] [+New Macro]    │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────┐ ┌─────────────────────────────────┐ │
│ │   TIMELINE EDITOR   │ │        GAME BOARD              │ │
│ │                     │ │                                 │ │
│ │ ℬ1 ━━━━━━━━━━━━━━━━ │ │    ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡        │ │
│ │ ℬ2 ━━━━━━━━━━━━━━━━ │ │   ⬡ ⬡ ⬡ ⬡ 🧙 ⬡ ⬡ ⬡ ⬡ ⬡ ⬡       │ │
│ │ ℬ3 ━━━━━━━━━━━━━━━━ │ │  ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ψ ⬡ ⬡ ⬡ ⬡ ⬡      │ │
│ │                     │ │ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡     │ │
│ │ ψ001 ●━━━━━━━━━━━━━ │ │                                 │ │
│ │ ψ002 ●━━━━━━━━━━━━━ │ │                                 │ │
│ └─────────────────────┘ └─────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ GENERATED SCRIPT                                        │ │
│ │ > HERO(Arthur)                                          │ │
│ │ > MOV(Arthur, @15,15)                                   │ │
│ │ > ψ001: ⊙(Δt+2 @20,20 ⟶ USE(ITEM, Blade, HERO:Arthur))│ │
│ │ > Π(Enemy enters @20,20) ⇒ †ψ001                       │ │
│ │                                        [Execute] [Test] │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### **Interactions Attendues**

#### **Création de Superposition**
1. **Clic droit** sur une tuile → "Create ψ-state"
2. **Sélectionner** action future → "MOV", "USE", "CREATE"
3. **Définir Δt** avec slider → "Δt+2"
4. **Script généré** automatiquement : `ψ001: ⊙(Δt+2 @20,20 ⟶ MOV(HERO, Arthur, @20,20))`

#### **Création de Trigger**
1. **Clic** sur ψ-state → "Add Trigger"
2. **Définir condition** → "Player enters", "Turn reaches", etc.
3. **Script généré** : `Π(Player enters @20,20) ⇒ †ψ001`

#### **Macro Builder**
1. **Enregistrer** une séquence d'actions
2. **Donner un nom** → "Capture Mine"
3. **Bouton créé** automatiquement
4. **Un clic** → séquence complète exécutée

---

## 🔧 Exemples d'Implémentation

### **1. Parser du Langage Temporel**
```typescript
class TemporalScriptParser {
    parse(script: string): AST {
        // Parse ψ001: ⊙(Δt+2 @20,20 ⟶ MOV(HERO, Arthur, @20,20))
        // Parse Π(Player enters @20,20) ⇒ †ψ001
        // Parse MOV(Arthur, @15,15)
        // Parse USE(ITEM, AvantWorldBlade, HERO:Arthur)
    }
}
```

### **2. Générateur de Script Visuel**
```typescript
class VisualScriptGenerator {
    addMovement(hero: string, target: Position): void {
        // Génère MOV(Arthur, @15,15)
    }
    
    addSuperposition(id: string, deltaT: number, target: Position, action: Action): void {
        // Génère ψ001: ⊙(Δt+2 @20,20 ⟶ MOV(HERO, Arthur, @20,20))
    }
}
```

### **3. Connexion Backend**
```typescript
class BackendConnector {
    async executeScript(script: string): Promise<GameState> {
        // POST /api/temporal/games/{id}/script
        // Utilise l'API existante
    }
    
    async getScriptSpec(): Promise<ScriptSpec> {
        // GET /api/temporal/script-spec
        // Récupère la grammaire dynamiquement
    }
}
```

---

## 🚀 Phases de Développement

### **Phase 1 : Prototype Minimal (MVP)**
- Interface de base avec boutons d'action
- Génération automatique de scripts simples (MOV, USE)
- Visualisation basique des timelines
- Connexion au backend existant

### **Phase 2 : Éditeur Avancé**
- Timeline editor interactif
- Visualisation des ψ-states avec effets
- Détection de conflits visuels
- Parsing complet du langage temporel

### **Phase 3 : Macros & Personnalisation**
- Système de macros complet
- UI configurable par l'utilisateur
- Sauvegarde des configurations
- Import/export de macros

---

## 🎉 Impact Révolutionnaire

Ce que nous créons, c'est le **premier IDE visuel de scripting quantico-temporel** au monde. Cela va révolutionner :

- **Le game design** → Créer des mécaniques impossibles visuellement
- **L'accessibilité** → No-code tool pour gameplay ultra-complexe  
- **Le debug** → Voir tous les effets d'un script graphiquement
- **La personnalisation** → Joueurs créent leurs propres interfaces

**C'est de la science-fiction qui devient réelle !** 🤯

---

## 🔥 Note Importante

**Pas besoin de bullshit technique.** Nous voulons des explications claires, vérifiables, illustrées si besoin, pour pouvoir valider que tout est logique et solide avant d'aller plus loin.

**Le backend Heroes of Time est déjà fonctionnel** avec tous les endpoints nécessaires. L'éditeur visuel doit juste s'y connecter et fournir une interface intuitive pour générer les scripts.

---

*Message d'Instruction - Éditeur Visuel Script Spatio-Temporel*

**Status : ✅ READY FOR CURSOR IMPLEMENTATION**