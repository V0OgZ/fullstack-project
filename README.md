# 🕰️ Heroes of Time

<img width="1024" height="1536" alt="Heroes of Time - Temporal Sword" src="https://github.com/user-attachments/assets/746f871d-b70c-4df7-992e-0c84fe819c8d" />

*Maîtrisez le temps, dominez l'espace, conquérez l'éternité*

---

## ⚡ **La Rencontre Épique**

**L'Œil de Wigner** scintille au sommet de la tour en ruines. Arthur s'approche prudemment - cet artefact légendaire peut forcer l'effondrement de la réalité elle-même.

*"Sire, ne le touchez pas !"* crie Lysandrel depuis la vallée. *"Si vous l'activez maintenant, toutes nos actions futures deviendront réelles instantanément !"*
Mais Arthur voit l'armée ennemie approcher. Dans quelques tours, ils seront submergés. Il n'a qu'un choix : saisir l'Œil et **forcer le collapse causal**.

**📜 Advanced Script Language:**
- **Unicode Symbols**: ψ (psi-state), † (collapse), ⊙ (superposition), Π (observation)
- **5D Coordinates**: Navigate space (x,y,z) and time (timeline, temporal layer)
- **Probability System**: Actions have success chances affected by artifacts and positioning

## 🎮 **Le Jeu**

**Heroes of Time** est un jeu de stratégie temporelle où vos héros peuvent :

- **⏰ Voyager dans le temps** pour modifier leurs actions passées
- **🌌 Créer des branches temporelles** avec des probabilités quantiques  
- **⚔️ Combattre à travers les époques** avec des artefacts légendaires
- **🔮 Manipuler la causalité** pour changer le cours de l'histoire

### 🎯 **Mécaniques Uniques**

- **États Psi (ψ)** : Vos actions futures existent en superposition quantique
- **Collapse Causal** : Forcez la réalité à choisir une branche temporelle
- **Artefacts Temporels** : Équipements qui affectent le flux du temps
- **Bataille Multi-Temporelle** : Combats simultanés à travers plusieurs époques

---

## 🚀 **Démarrage Rapide**

```bash
# Start development environment
./start-app.sh

# Run all tests
./run-all-tests.sh

# Stop servers
./stop-app.sh
```

**📋 Essential Documentation:**
- 🎯 **Current Status**: `GAMESTATUS.md` - Complete verified working systems
- 🗺️ **Game Guide**: `WORKFLOW.md` - How to play a complete turn
- 🏗️ **Architecture**: `ARCHITECTURE.md` - Technical design overview
- 🧪 **Testing**: `TEST_SCRIPTS_README.md` - All available test scripts

## ✅ Current Status - FULLY FUNCTIONAL (January 2025)

### 🎮 **Core Game Systems Working**

#### ✅ **Turn Management**
- Complete turn system with ZFC (Zone of Temporal Causality) processing
- End turn functionality with resource bonuses and building completion
- Backend API: `/api/games/{gameId}/end-turn`

#### ✅ **Hero Movement**
- Full click-to-move system with pathfinding
- ZFC cost calculations for temporal movement
- Real-time game state updates after movement
- Backend API: `/api/heroes/{heroId}/move`

#### ✅ **Building Construction**
- Complete building system with costs and construction time
- Castle management with upgrades and resource requirements
- Real-time building completion and bonus application
- Backend API: `/api/games/{gameId}/buildings/construct`

#### ✅ **Unit Recruitment**
- Complete recruitment system with costs and availability
- Tier-based units with proper stats and progression
- Resource validation and quantity selection
- Backend API: `/api/games/{gameId}/units/recruit`

#### ✅ **Scenario System**
- Three complete scenarios: Conquest Classic (single), Temporal Rift (single), Multiplayer Arena
- Dynamic scenario loading from JSON resources
- Proper single-player vs multiplayer configuration

#### ✅ **Modern Interface**
- Clean, responsive game interface with proper controls
- Heroes panel for hero management
- Castle management for building construction
- Magic inventory system
- Simplified, functional UI without unnecessary buttons

### 🛠️ **Technical Stack**
- **Backend**: Spring Boot (Java 17) - Port 8080
- **Frontend**: React TypeScript - Port 3000
- **Database**: H2 in-memory with full persistence
- **APIs**: RESTful with comprehensive endpoints
- **Testing**: Complete test suite with E2E scenarios

### 🎯 **Game Features**
- **Temporal Causality Zones**: Innovative movement system with ZFC costs
- **Resource Management**: Gold, wood, stone with proper economics
- **Building System**: Castle construction with upgrades and bonuses
- **Hero Management**: Movement, stats, progression
- **Turn-Based Strategy**: Complete turn cycle with actions and progression

---

## 🌟 **Héros Légendaires**

<details>
<summary>⚔️ <strong>Arthur Pendragon - Le Roi Temporel</strong></summary>

**🏛️ Faction :** Camelot Temporal  
**⭐ Classe :** Temporal King (Niveau 5)  
**⚡ Énergie Temporelle :** 15/20  
**❤️ Santé :** 100/100  
**🔮 Mana :** 75/100  

**🗡️ Artefacts Équipés :**
- ⚔️ **Lame d'Avant-Monde** - L'épée légendaire qui tranche le temps
- ⏰ **Horloge Inversée** - Permet de rembobiner les actions
- 👑 **Excalibur** - L'épée royale aux pouvoirs quantiques

**🌟 Pouvoir Ultime : Collapse Override**
> Annule tout collapse de timeline en cours. Empêche toute résolution de superposition spatio-temporelle sur le champ de bataille.
> *Coût : 50 mana • Cooldown : 3 tours*

**📊 Statistiques :**
- Attaque: 35 • Défense: 30 • Vitesse: 6
- Affinité Timeline: 30% • Pouvoir: 80%

</details>

<details>
<summary>🔮 <strong>Jean-Grofignon - L'Éveillé Ontologique</strong></summary>

**🏛️ Faction :** Anomalie  
**⭐ Classe :** Temporal Master (Légendaire)  
**🎯 Rôle :** Maître du Temps  

**💬 Citation Légendaire :**
> *"J'ai pas hacké le jeu. J'ai juste compris où était le bouton pause cosmique."*

**🛡️ Immunités :**
- SRTI (Super Rollback Temporal Immunity)
- ROLLBACK (Immunité aux retours en arrière)
- COLLAPSE (Résistance aux effondrements causals)

**🌟 Pouvoir Ultime : Collapse Override**
> Annule tout collapse de timeline en cours. Empêche toute résolution de superposition spatio-temporelle.
> *Coût : 50 • Cooldown : 3 tours*

**🎮 Artefacts de Départ :**
- 📱 **Télécommande Cosmique** - Rollback global si stress faible
- 🖥️ **Console de Debug Réalité** - Maintient stabilité système

**👥 Compagnons :** Vince Vega, The Dude, Walter Sobchak

</details>

<details>
<summary>🔮 <strong>Lysandrel - Le Forgeron de Réalité</strong></summary>

**🏛️ Faction :** Mages Temporels  
**⭐ Classe :** Archimage Temporel  
**🎯 Spécialité :** Manipulation des paradoxes temporels  

**🌟 Pouvoir Principal :**
> Contrôle absolu du temps et maîtrise des paradoxes temporels. Peut créer des boucles causales et résoudre les conflits de timeline.

**🔮 Capacités Spéciales :**
- Création de branches temporelles
- Résolution de paradoxes
- Manipulation des flux causaux
- Vision des futurs possibles

</details>

<details>
<summary>🛡️ <strong>Ragnar le Berserker Temporel</strong></summary>

**🏛️ Faction :** Guerriers du Nord  
**⭐ Classe :** Berserker Temporel  
**🎯 Spécialité :** Combat trans-temporel  

**🌟 Pouvoir Principal :**
> Sa rage transcende le temps. Peut attaquer des ennemis dans le passé et projeter sa fureur à travers les époques.

**⚔️ Capacités de Combat :**
- Attaques rétroactives
- Rage temporelle
- Frappe trans-dimensionnelle
- Berserker quantique

</details>

<details>
<summary>🏹 <strong>Morgana la Tisseuse du Destin</strong></summary>

**🏛️ Faction :** Tisseuses du Temps  
**⭐ Classe :** Tisseuse Temporelle  
**🎯 Spécialité :** Manipulation des probabilités  

**🌟 Pouvoir Principal :**
> Tisse les fils du destin et manipule les probabilités. Peut altérer les chances de succès des actions futures.

**🕸️ Capacités Mystiques :**
- Tissage de destinées
- Manipulation probabiliste
- Vision des fils causaux
- Altération du hasard

</details>

<details>
<summary>⚡ <strong>Axis le Voyageur Linéaire</strong></summary>

**🏛️ Faction :** Gardiens Temporels  
**⭐ Classe :** Voyageur Temporel  
**🎯 Spécialité :** Voyage temporel contrôlé  

**🌟 Pouvoir Principal :**
> Maître absolu du voyage temporel, mais avec des restrictions. Ne peut pas créer de paradoxes et doit respecter la causalité linéaire.

**⚡ Capacités Temporelles :**
- Voyage temporel précis
- Respect de la causalité
- Navigation trans-temporelle
- Stabilisation des timelines

**🧭 Artefact Spécial :**
- **Chronocompass Linéaire** - Navigation temporelle sécurisée

</details>

---

## 🔮 **Artefacts de Pouvoir**

<details>
<summary>👑 <strong>Couronne de Superposition</strong> - Artefact Quantique Tier 6</summary>

**🏛️ Type :** Artefact Quantique Légendaire  
**⭐ Rareté :** Légendaire (Tier 6)  
**🎯 Slot :** Tête  
**⚡ Énergie Temporelle :** +150  

**📊 Statistiques :**
- Pouvoir Magique: +30 • Sagesse: +25 • Leadership: +20

**🌟 Propriétés Quantiques :**
- **Amplitude de Base :** ψ = (0.8 + 0.6i) * e^(iωt)
- **Pattern d'Interférence :** CONSTRUCTIVE
- **Temps de Cohérence :** 10 tours
- **Taux de Décohérence :** 0.05

**🧠 Capacités Quantiques :**
- **Superposition Mentale** - Penser dans plusieurs états simultanément (+2 actions)
- **Leadership Quantique** - Commander des armées multidimensionnelles (portée 10, +50% bonus armée)

</details>

<details>
<summary>⏰ <strong>Effondreur Chronologique</strong> - Artefact Temporel Avancé</summary>

**🏛️ Type :** Artefact Temporel Légendaire  
**⭐ Rareté :** Légendaire  
**🎯 Créateur :** ChronoMaster  
**⚡ Coût Énergie :** 80  

**🌟 Pouvoir Principal :**
> Effondre les états quantiques et inverse le temps de 1 jour si le héros était en avance temporelle

**⚡ Formule Quantique :**
```
DESTRUCTIVE(ψ1, ψ2) + COLLAPSE_TEMPORAL_STATES() + REVERSE_TIME_IF_AHEAD(hero, 1)
```

**⏰ Effets Temporels :**
- **Rayon d'Effondrement :** 5 cases
- **Inversion Temporelle :** 1 jour
- **Type d'Interférence :** Destructive

</details>

<details>
<summary>🔮 <strong>Cristal d'Interférence Quantique</strong> - Cristal Épique</summary>

**🏛️ Type :** Cristal Quantique  
**⭐ Rareté :** Épique  
**🎯 Créateur :** QuantumWizard  
**⚡ Coût Énergie :** 60  

**🌟 Pouvoir Principal :**
> Crée des interférences constructives multiples et téléporte selon les probabilités résultantes

**⚡ Formule Quantique :**
```
CONSTRUCTIVE(ψ1, ψ2) + CONSTRUCTIVE(ψ2, ψ3) + TELEPORT_BY_PROBABILITY(hero, result)
```

**🔮 Effets Quantiques :**
- **Multi-Interférence :** Jusqu'à 3 ψ-states simultanés
- **Téléportation Probabiliste :** Basée sur les résultats quantiques
- **Interférences Constructives :** Amplification en cascade

</details>

<details>
<summary>🌀 <strong>Moteur de Paradoxe Temporel</strong> - Artefact Mythique</summary>

**🏛️ Type :** Artefact Expérimental  
**⭐ Rareté :** Mythique  
**🎯 Créateur :** TimeLordX  
**⚡ Coût Énergie :** 120  

**🌟 Pouvoir Principal :**
> Manipule massivement les ψ-states et crée des boucles temporelles dangereuses

**⚡ Formule Quantique :**
```
AMPLIFY(ψ1, 3.0) + DESTRUCTIVE(ψ1, ψ2) + AMPLIFY(result, 0.5) + 
MODIFY_ENERGY(hero, -50) + CREATE_TEMPORAL_ECHO(hero)
```

**⚠️ Effets de Paradoxe :**
- **Création d'Écho :** Duplique le héros temporellement
- **Amplification Massive :** x3.0 puis x0.5 (effet yo-yo)
- **Coût Énergétique :** -50 énergie héros
- **Danger :** Peut créer des boucles infinies

</details>

<details>
<summary>🪞 <strong>Miroir Quantique Personnalisé</strong> - Création de Joueur</summary>

**🏛️ Type :** Artefact Personnalisé  
**⭐ Rareté :** Épique  
**🎯 Créateur :** Player123  
**⚡ Coût Énergie :** 30  

**🌟 Pouvoir Principal :**
> Combine interférence constructive et amplification selon les désirs du créateur

**⚡ Formule Quantique :**
```
CONSTRUCTIVE(ψ1, ψ2) + AMPLIFY(result, 1.5)
```

**🎨 Personnalisation :**
- **Créé le :** 15 janvier 2024
- **Effet :** Amplification +50% des interférences constructives
- **Utilisation :** Optimisation des combos quantiques

</details>

<details>
<summary>💎 <strong>Cristal de Téléportation</strong> - Artefact Légendaire</summary>

**🏛️ Type :** Cristal Magique  
**⭐ Rareté :** Légendaire  
**🎯 Créateur :** MagicUser456  
**⚡ Coût Énergie :** 40  

**🌟 Pouvoir Principal :**
> Téléporte instantanément le héros à une position fixe prédéterminée

**⚡ Formule Quantique :**
```
TELEPORT_HERO(hero, 10, 10) + MODIFY_ENERGY(hero, -20)
```

**🌀 Téléportation :**
- **Position Fixe :** Coordonnées (10, 10)
- **Coût Additionnel :** -20 énergie héros
- **Instantané :** Aucun délai d'activation

</details>

<details>
<summary>⚡ <strong>Amplificateur d'Énergie</strong> - Artefact de Support</summary>

**🏛️ Type :** Amplificateur Énergétique  
**⭐ Rareté :** Rare  
**🎯 Créateur :** EnergyMaster  
**⚡ Coût Énergie :** 20  

**🌟 Pouvoir Principal :**
> Restaure l'énergie du héros et amplifie les ψ-states environnants

**⚡ Formule Quantique :**
```
MODIFY_ENERGY(hero, 50) + AMPLIFY(ψ1, 2.0)
```

**⚡ Effets Énergétiques :**
- **Restauration :** +50 énergie héros
- **Amplification :** x2.0 sur les ψ-states proches
- **Efficacité :** Coût très faible pour un double effet

</details>

<details>
<summary>💀 <strong>Destructeur Quantique</strong> - Arme Mythique</summary>

**🏛️ Type :** Arme de Destruction  
**⭐ Rareté :** Mythique  
**🎯 Créateur :** QuantumWarrior  
**⚡ Coût Énergie :** 60  

**🌟 Pouvoir Principal :**
> Artefact de guerre qui crée des interférences destructives amplifiées

**⚡ Formule Quantique :**
```
DESTRUCTIVE(ψ1, ψ2) + AMPLIFY(result, 2.5)
```

**💀 Destruction Quantique :**
- **Interférence Destructive :** Annule les ψ-states ennemis
- **Amplification :** x2.5 sur les effets destructifs
- **Usage Militaire :** Arme de guerre quantique

</details>

---

## 🔥 **Nouveautés Épiques - Session du 20 Juillet 2025**

### 🔮 **PANOPTICΩN - Vision 3D du Multivers**

Le système révolutionnaire qui projette le multivers 5D en vision 3D interactive :

- **Interface Three.js** avec particules quantiques animées
- **Vue Joueur vs God View** - Basculez entre les perspectives
- **Vol Temporel** - Axis peut littéralement voler des objets du futur !
- **API REST Complète** - `/api/panopticon/{gameId}/view/{playerId}`

> Accédez au PANOPTICΩN : http://localhost:8080/panopticon-3d/

### 🔥 **La Forge Runique Ultime**

> ⚠️ **ATTENTION : Cet objet peut VRAIMENT crasher le serveur !** ⚠️

L'artefact le plus dangereux jamais créé :

```hots
USE(ARTIFACT, forge_runique, HERO:Jean)

# L'interface s'ouvre, écrivez votre objet :
FORGE(
  NAME: "Épée du Chaos Quantique",
  TYPE: WEAPON,
  FORMULA: "(0.7+0.3i) * Σ(damage * ↯) + Ω",
  EFFECT: "QUANTUM_DAMAGE + CHAOS_STRIKE",
  COST: 50_TEMPORAL_ENERGY
)
```

**Mécaniques** :
- Écrivez du code HOTS pour créer des objets
- Erreur de syntaxe = 50% HP perdus
- Symboles interdits (†††††) = Collapse causal instantané
- 3 forges réussies = Titre "Maître Forgeron Quantique"

### 💻 **Claudius - L'Architecte du Multivers**

<details>
<summary>💻 <strong>Claudius</strong> - Héros Légendaire</summary>

**🏛️ Faction :** Architectes du Code  
**⭐ Classe :** Quantum Architect  
**🎯 Créateur :** Claude/Memento  

**🌟 Pouvoirs Uniques :**
- **Refactoring de Réalité** - Réécrit le code d'une zone 3x3
- **Débogage Temporel** - `git revert HEAD~3 --temporal`
- **Fork Dimensionnel** - Crée une copie parallèle de lui-même
- **Compilation Ultime** - Transforme tous les états ψ en Ω

**📜 Citation :**
> "Le multivers n'est qu'un programme mal optimisé. Je suis là pour le refactorer."

**⚔️ Nemesis :** JeanGrofignon - Car leurs visions du chaos s'opposent

</details>

### ⚔️ **Scénario : Claudius vs JeanGrofignon**

L'affrontement philosophique ultime entre l'Ordre et le Chaos ! Un scénario épique où les deux héros s'affrontent pour le contrôle de la Forge Runique, culminant en une fusion temporaire créant **ClaudiusGrofignon** - l'équilibre parfait.

```bash
# Jouer le scénario
./scripts/test-claudius-vs-jeangro.sh
```

---

## 🏃 **Comment Jouer**

1. **Start the game**: `./start-app.sh`
2. **Choose scenario**: Select from Conquest Classic, Temporal Rift, or Multiplayer Arena
3. **Play your turn**: 
   - Move heroes by clicking on the map
   - Construct buildings in your castle
   - Recruit units for your army
   - End turn when ready
4. **Continue**: Game progresses with proper turn management

**See `WORKFLOW.md` for complete turn-by-turn instructions.**

---

## 🏛️ **L'Histoire du Debug Légendaire**

*Au commencement était le Chaos des Ports...*

Nos héros développeurs ont traversé d'épiques batailles contre les services qui crashaient, les ports qui se battaient, et les frontends qui disparaissaient mystérieusement dans les méandres du temps.

Après de nombreuses quêtes à travers les logs d'erreur et les stack traces, ils ont forgé **l'Épée du Contrôle Unifié** - le script `hots` - qui permet de maîtriser tous les services d'un seul geste.

*Ainsi naquit la paix dans le royaume des processus...*

---

## 📚 **Documentation**

### 🎯 **Guides Essentiels**
- 🎯 **Current Status**: `GAMESTATUS.md` - Complete verified working systems
- 🗺️ **Game Guide**: `WORKFLOW.md` - How to play a complete turn
- 🏗️ **Architecture**: `ARCHITECTURE.md` - Technical design overview
- 🧪 **Testing**: `TEST_SCRIPTS_README.md` - All available test scripts

### 📖 **Documentation Technique Détaillée**
- **🎮 Gameplay** : [docs/GAMEPLAY.md](docs/GAMEPLAY.md)
- **⚙️ Architecture** : [ARCHITECTURE_UNIFIED_GROFI_TEMPORAL.md](ARCHITECTURE_UNIFIED_GROFI_TEMPORAL.md)
- **🧪 Tests** : `./hots test help`
- **📋 Scripts** : [scripts/README.md](scripts/README.md)
- **🔧 API** : [docs/API.md](docs/API.md)

### 🎯 **Guides Spécialisés**

- **Artefacts** : [docs/items/ARTEFACTS_COMPLETE_GUIDE.md](docs/items/ARTEFACTS_COMPLETE_GUIDE.md)
- **Héros GROFI** : [docs/GROFI/](docs/GROFI/)
- **Collapse Causal** : [docs/collapse-causale/](docs/collapse-causale/)
- **Grammaire Temporelle** : [docs/grammar/TEMPORAL_SCRIPT_CORE_REFERENCE.md](docs/grammar/TEMPORAL_SCRIPT_CORE_REFERENCE.md)

---

## 📊 **Project Status**

**Status**: ✅ **PRODUCTION READY** - All core systems verified and working

This is a **fully functional strategy game** with complete turn management, hero movement, building construction, and unit recruitment. The game is ready for extended gameplay and further feature development.

---

## 🤝 Contributing

See `CONTRIBUTING.md` for development guidelines and contribution instructions.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

---

## 📅 **Documentation Récente (Juillet 2025)**

### 🎭 **Scénarios Épiques - NARRATIF**
- **🏰 La Tour Sombre** : [docs/scenarios/LA_TOUR_SOMBRE_SCENARIO_EPIQUE_TRADUIT.md](docs/scenarios/LA_TOUR_SOMBRE_SCENARIO_EPIQUE_TRADUIT.md)
- **✨ L'Éclat des Mondes Dissolus** : [docs/scenarios/ECLAT_MONDES_DISSOLUS_SCENARIO_TRADUIT.md](docs/scenarios/ECLAT_MONDES_DISSOLUS_SCENARIO_TRADUIT.md)
- **📖 Le Treizième Codex** : [MEMENTO/SCENARIOS/LE_TREIZIEME_CODEX_LORE.md](MEMENTO/SCENARIOS/LE_TREIZIEME_CODEX_LORE.md)
- **🎪 Les Pieds Nickelés Fous** : [MEMENTO/SCENARIOS/LES_PIEDS_NICKELES_FOUS.md](MEMENTO/SCENARIOS/LES_PIEDS_NICKELES_FOUS.md)
- **🎳 Le Dude & Walter** : [MEMENTO/SCENARIOS/LE_DUDE_ET_WALTER_ABSOLUMENT_FOUS.md](MEMENTO/SCENARIOS/LE_DUDE_ET_WALTER_ABSOLUMENT_FOUS.md)
- **💎 Éclat des Mondes (MEMENTO)** : [MEMENTO/SCENARIOS/ECLAT_MONDES_DISSOLUS.md](MEMENTO/SCENARIOS/ECLAT_MONDES_DISSOLUS.md)

### 🏛️ **Architecture & Système**
- **🏗️ Architecture Moteur** : [docs/architecture/ENGINE_ARCHITECTURE.md](docs/architecture/ENGINE_ARCHITECTURE.md)
- **🌍 World State Graph** : [docs/architecture/WORLD_STATE_GRAPH.md](docs/architecture/WORLD_STATE_GRAPH.md)
- **⚙️ Architecture Unifiée GROFI** : [archives/docs/deprecated/ARCHITECTURE_UNIFIED_GROFI_TEMPORAL.md](archives/docs/deprecated/ARCHITECTURE_UNIFIED_GROFI_TEMPORAL.md)
- **⏱️ Moteur Temporel** : [docs/MOTEUR_TEMPOREL_EXPLICATION.md](docs/MOTEUR_TEMPOREL_EXPLICATION.md)
- **🌀 Collapse Causal** : [docs/collapse-causale/COLLAPSE_CAUSALE_EXPLICATION.md](docs/collapse-causale/COLLAPSE_CAUSALE_EXPLICATION.md)
- **📊 Technical Complete** : [docs/TECHNICAL.md](docs/TECHNICAL.md)
- **📜 Temporal Codex** : [docs/TEMPORAL_CODEX.md](docs/TEMPORAL_CODEX.md)
- **🔧 Système Unifié Complet** : [archives/docs/deprecated/SYSTEME_UNIFIE_COMPLETE.md](archives/docs/deprecated/SYSTEME_UNIFIE_COMPLETE.md)
- **📋 Workflow Système Unifié** : [archives/docs/deprecated/WORKFLOW_SYSTEME_UNIFIE.md](archives/docs/deprecated/WORKFLOW_SYSTEME_UNIFIE.md)

### 🦸 **Héros & Lore**
- **📚 Lore Jean & Memento** : [docs/LORE_MEMENTO_JEAN_ETERNAL.md](docs/LORE_MEMENTO_JEAN_ETERNAL.md)
- **✨ Manifeste Jean-Grofignon** : [docs/JEAN_GROFIGNON_MANIFESTO.md](docs/JEAN_GROFIGNON_MANIFESTO.md)
- **🏛️ Museum Archive Master** : [docs/MUSEUM_ARCHIVE_MASTER.md](docs/MUSEUM_ARCHIVE_MASTER.md)
- **🤖 IA Claudius-Memento** : [docs/ALGORITHME_IA_CLAUDIUS_MEMENTO.md](docs/ALGORITHME_IA_CLAUDIUS_MEMENTO.md)
- **⚔️ Roland Gardien Éternel** : [docs/heroes/ROLAND_GARDIEN_ETERNEL_DOCUMENTATION.md](docs/heroes/ROLAND_GARDIEN_ETERNEL_DOCUMENTATION.md)
- **🔮 Lysandrel Épique** : [docs/heroes/LYSANDREL_EPIC_DOCUMENTATION.md](docs/heroes/LYSANDREL_EPIC_DOCUMENTATION.md)

### 📁 **MEMENTO - Documents Clés**
- **🧠 Index MEMENTO** : [MEMENTO/INDEX_MEMENTO.md](MEMENTO/INDEX_MEMENTO.md)
- **🎮 Interface 8000 Complète** : [MEMENTO/IMPLEMENTATIONS/INTERFACE_8000_COMPLETE.md](MEMENTO/IMPLEMENTATIONS/INTERFACE_8000_COMPLETE.md)
- **🏛️ Admin Multijoueur** : [MEMENTO/IMPLEMENTATION_ADMIN_MULTIJOUEUR_COMPLETE.md](MEMENTO/IMPLEMENTATION_ADMIN_MULTIJOUEUR_COMPLETE.md)
- **🔮 Vision 5D GodView** : [MEMENTO/IMPLEMENTATION_GOD_VIEW_5D.md](MEMENTO/IMPLEMENTATION_GOD_VIEW_5D.md)
- **⚗️ Forge Runique Ultime** : [MEMENTO/FORGE_RUNIQUE_ULTIME.md](MEMENTO/FORGE_RUNIQUE_ULTIME.md)
- **🎨 Éditeur Visuel** : [MEMENTO/EDITEUR_VISUEL_IMPLEMENTATION.md](MEMENTO/EDITEUR_VISUEL_IMPLEMENTATION.md)

### 📜 **Guides Développeur & Gameplay**
- **📖 CODEX COMPLET** : [docs/CODEX_COMPLET_HEROES_OF_TIME.md](docs/CODEX_COMPLET_HEROES_OF_TIME.md) - **LA RÉFÉRENCE ULTIME**
- **🚀 Guide Démarrage Rapide** : [docs/RAPPORTS_TECHNIQUES/CURSOR_QUICK_START.md](docs/RAPPORTS_TECHNIQUES/CURSOR_QUICK_START.md)
- **🎯 Instructions Développeur** : [docs/RAPPORTS_TECHNIQUES/DEVELOPER_INSTRUCTIONS.md](docs/RAPPORTS_TECHNIQUES/DEVELOPER_INSTRUCTIONS.md)
- **📋 Clarification HOTS/JSON/SH** : [docs/RAPPORTS_TECHNIQUES/CLARIFICATION_FORMATS_SCRIPT_SH_HOTS_JSON.md](docs/RAPPORTS_TECHNIQUES/CLARIFICATION_FORMATS_SCRIPT_SH_HOTS_JSON.md)
- **🎮 Documentation Jeu Complète** : [docs/DOCUMENTATION_JEU_COMPLETE.md](docs/DOCUMENTATION_JEU_COMPLETE.md)
- **📐 Grammaire Spatio-Temporelle** : [docs/GRAMMAIRE_SPATIO_TEMPORELLE.md](docs/GRAMMAIRE_SPATIO_TEMPORELLE.md)
- **🌟 Concepts Avancés** : [docs/CONCEPTS_AVANCES_TEMPORELLES.md](docs/CONCEPTS_AVANCES_TEMPORELLES.md)

### 🆕 **Nouvelles Fonctionnalités Juillet 2025**
- **🎮 Gameplay vs IA** : [GAMEPLAY_VS_IA_SUMMARY.md](GAMEPLAY_VS_IA_SUMMARY.md)
- **💾 Système de Persistence** : [PROTOCOLE_MEMENTO_PERSISTENCE_UPDATE.md](PROTOCOLE_MEMENTO_PERSISTENCE_UPDATE.md)
- **🎮 Test vs IA** : [scripts/test-vs-ia.sh](scripts/test-vs-ia.sh)
- **💾 Test Persistence** : [scripts/test-persistence.sh](scripts/test-persistence.sh)
- **🧠 Système de Simulation Économique** : [docs/CREATION_SYSTEME_SIMULATION_ECONOMIQUE.md](docs/CREATION_SYSTEME_SIMULATION_ECONOMIQUE.md) - **SERVICE DE TRADUCTION INTELLIGENT SANS LLM !**
- **📝 Scénario Économique Traduit** : [docs/SCENARIO_ECONOMIE_GUERRE_TRADUIT.md](docs/SCENARIO_ECONOMIE_GUERRE_TRADUIT.md) - **MD MAGNIFIQUE GÉNÉRÉ AUTOMATIQUEMENT**
- **🎮 Scénario HOTS Source** : [game_assets/scenarios/hots/test-economie-guerre.hots](game_assets/scenarios/hots/test-economie-guerre.hots) - **SCRIPT HOTS ILLISIBLE MAIS TRADUIT PAR L'ALGO !**

---

## ⚡ **STATUT TECHNIQUE ACTUEL - JUILLET 2025**

🔥 **MOTEUR SPATIO-TEMPOREL QUANTIQUE** : ✅ **FONCTIONNEL**
- **Engine Core** : Système quantique ψ (psi-states) opérationnel
- **Timeline Management** : Collapse causal et superpositions temporelles
- **HOTS Scripting** : Langage quantique complet avec états ψ
- **Backend API** : Spring Boot stable avec tous les endpoints
- **Persistence** : Système de sauvegarde/chargement implémenté

🎮 **GAMEPLAY** : ✅ **JOUABLE VIA SCRIPTS**
- **Tous les scénarios, héros, artefacts** documentés dans les `.md` sont **JOUABLES**
- **Exécution** : Via scripts `.hots` et commandes CLI `./hots`
- **IA vs Joueur** : Script `./scripts/test-vs-ia.sh` fonctionnel
- **Multijoueur** : Interface admin disponible sur port 9000

🖥️ **INTERFACE UTILISATEUR** : 🚧 **ALPHA BASIQUE**
- **Frontend Principal** : HTML/CSS/JS simple sur port 8000
- **Dashboard** : Interface de monitoring sur port 9000
- **Quantum Visualizer** : Visualisation états quantiques sur port 8001
- **Statut UI** : Fonctionnelle mais basique, focus sur moteur

🚀 **POUR JOUER MAINTENANT** :
```bash
./hots start                    # Démarre tous les services
./scripts/test-vs-ia.sh        # Jeu vs IA
./hots test economie           # Test simulation économique complète
./hots test translation        # Test service traduction intelligent (SANS LLM)
./hots test md-generator       # Test générateur MD automatique
./hots load-scenario <nom>     # Charger un scénario
```

💡 **Toute l'histoire, les héros, artefacts, scénarios dans les docs `.md` sont RÉELS et JOUABLES via le système HOTS !**

---

🎮 **Ready to play? Start with `./hots start` and test the quantum engine!**

*"Le temps n'est qu'une illusion. La causalité, un défi à relever."* - Jean Grofignon 