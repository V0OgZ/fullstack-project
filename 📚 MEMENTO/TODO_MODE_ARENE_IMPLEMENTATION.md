# 🗡️ TODO MODE ARÈNE - Plan d'Implémentation Complet

## 📋 **Vue d'Ensemble**

Implémentation du nouveau mode ARÈNE pour Heroes of Time, permettant des combats rapides avec mécaniques temporelles avancées et système de commentaires dynamiques.

**Statut Global** : 🔴 Non démarré  
**Priorité** : 🔥 Haute  
**Complexité** : ⭐⭐⭐⭐ (4/5)

---

## 🏗️ **BACKEND - Fondations**

### 🌍 **1. Monde ARÈNE**
- [ ] **ArenaWorldService.java**
  - [ ] Créer le service de gestion du monde unique ARENA_WORLD
  - [ ] Instanciation automatique au démarrage du mode
  - [ ] Gestion de la persistance du monde arène
  - [ ] API pour récupérer l'état du monde
  - [ ] Intégration avec le système de Pocket Universe existant

- [ ] **ArenaWorld.java** (Entité)
  - [ ] Modèle de données pour le monde arène
  - [ ] Terrain hexagonal par défaut
  - [ ] Positions des observateurs (Grut + Juge)
  - [ ] État des combats en cours

### 🎭 **2. Juge de l'Arène**
- [ ] **ArenaJudge.java** (Entité)
  - [ ] Modèle du personnage Juge de l'Arène
  - [ ] Système de phrases dynamiques par contexte
  - [ ] Statistiques de commentaires (fréquence, type)
  - [ ] Intégration avec le système de personnages existant

- [ ] **ArenaJudgeService.java**
  - [ ] Service de gestion des commentaires
  - [ ] Algorithme de sélection de phrases contextuelles
  - [ ] Système de timing pour les commentaires
  - [ ] API REST pour récupérer les commentaires
  - [ ] Base de données de phrases par situation

- [ ] **JudgePhrasesRepository.java**
  - [ ] Repository pour les phrases du juge
  - [ ] Catégories : début_combat, action_normale, coup_critique, sort_temporel, fin_combat
  - [ ] Système de tags pour contextualiser les phrases
  - [ ] Mécanisme de phrases aléatoires pondérées

### 🦸 **3. Système Héros Arène**
- [ ] **ArenaHeroService.java**
  - [ ] Service de gestion des héros niveau 1
  - [ ] Système de progression accélérée
  - [ ] Un seul sort débloqué par héros au départ
  - [ ] Déblocage temporel basé sur les paradoxes créés
  - [ ] Intégration avec HeroService existant

- [ ] **ArenaHero.java** (Entité)
  - [ ] Extension du modèle Hero pour l'arène
  - [ ] Niveau forcé à 1 au départ
  - [ ] Sorts disponibles restreints
  - [ ] XP et progression spécifique à l'arène
  - [ ] Statistiques de combat arène

### 🕰️ **4. Système Temporel Avancé**
- [ ] **ArenaTimelineService.java**
  - [ ] Gestion de la superposition de timelines
  - [ ] Résolution automatique par moteur causal
  - [ ] API pour créer/gérer les branches temporelles
  - [ ] Intégration avec QuantumService existant

- [ ] **TimelineSuperposition.java** (Entité)
  - [ ] Modèle pour les actions multi-temporelles
  - [ ] États : en_cours, résolu_auto, résolu_joueur
  - [ ] Liens vers les timelines affectées
  - [ ] Résultats de convergence

### 🎮 **5. Contrôleur Principal**
- [ ] **ArenaGameController.java**
  - [ ] API REST complète pour le mode arène
  - [ ] Endpoints pour démarrer/arrêter les combats
  - [ ] Gestion des actions de combat
  - [ ] Interface avec tous les services arène
  - [ ] Websockets pour les commentaires temps réel

#### 🌐 **Routes API à Implémenter**
```java
@RestController
@RequestMapping("/api/arena")
public class ArenaGameController {
    
    // Gestion du monde
    @GetMapping("/world")           // État du monde arène
    @PostMapping("/world/reset")    // Réinitialiser le monde
    
    // Gestion des combats
    @PostMapping("/start")          // Démarrer un combat
    @PostMapping("/action")         // Exécuter une action
    @GetMapping("/status")          // État du combat actuel
    @PostMapping("/end")            // Terminer un combat
    
    // Gestion des héros
    @GetMapping("/heroes")          // Liste héros disponibles
    @PostMapping("/heroes/select")  // Sélectionner un héros
    @GetMapping("/heroes/{id}/spells") // Sorts disponibles
    
    // Système de commentaires
    @GetMapping("/comments")        // Commentaires récents
    @GetMapping("/comments/stream") // WebSocket des commentaires
    
    // Système temporel
    @PostMapping("/timeline")       // Créer superposition temporelle
    @GetMapping("/timeline/{id}")   // État d'une timeline
    @PostMapping("/timeline/{id}/resolve") // Résoudre manuellement
}
```

---

## 🎨 **FRONTEND - Interface Utilisateur**

### 📱 **1. Page Principale**
- [ ] **ArenaView.jsx**
  - [ ] Composant principal du mode arène
  - [ ] Layout avec panel héros + interface combat
  - [ ] Intégration des sous-composants
  - [ ] Gestion des états globaux du mode
  - [ ] Routing vers le mode arène

- [ ] **ArenaLayout.jsx**
  - [ ] Structure générale de l'interface
  - [ ] Positionnement des zones (héros, combat, commentaires)
  - [ ] Responsive design pour différentes tailles d'écran
  - [ ] Animations de transition entre les vues

### 🦸 **2. Sélection des Héros**
- [ ] **HeroSelector.jsx**
  - [ ] Panel gauche avec liste des héros
  - [ ] Tri par faction/catégorie
  - [ ] Affichage niveau 1 + sort unique
  - [ ] Prévisualisation des statistiques
  - [ ] Animation de sélection

- [ ] **HeroCard.jsx**
  - [ ] Carte individuelle pour chaque héros
  - [ ] Affichage compact avec icône + nom + niveau
  - [ ] Indicateur de sort disponible
  - [ ] État sélectionné/disponible/indisponible
  - [ ] Tooltip avec détails du héros

### 🎮 **3. Interface de Combat**
- [ ] **ArenaInterface.jsx**
  - [ ] Interface principale de combat
  - [ ] Terrain hexagonal interactif
  - [ ] Zone d'actions rapides en bas
  - [ ] Intégration du timeline viewer
  - [ ] Gestion des inputs clavier (mode avancé)

- [ ] **HexagonalGrid.jsx**
  - [ ] Terrain de combat hexagonal
  - [ ] Positionnement des unités
  - [ ] Animations de mouvement et d'attaque
  - [ ] Effets visuels pour les sorts temporels
  - [ ] Interactions clic/survol

- [ ] **ActionBar.jsx**
  - [ ] Barre d'actions rapides
  - [ ] Sorts disponibles avec cooldowns
  - [ ] Boutons d'actions spéciales
  - [ ] Indicateurs de mana/énergie
  - [ ] Raccourcis clavier affichés

### 🗨️ **4. Système de Commentaires**
- [ ] **JudgeComments.jsx**
  - [ ] Zone de commentaires du Juge
  - [ ] Animation d'apparition des nouveaux commentaires
  - [ ] Historique scrollable des commentaires
  - [ ] Différenciation Grut vs Juge (couleurs/icônes)
  - [ ] WebSocket pour commentaires temps réel

- [ ] **GrutIcon.jsx**
  - [ ] Icône animée de Grut en haut d'écran
  - [ ] Animations selon l'état du combat
  - [ ] Effets de particules mystérieuses
  - [ ] Interaction au clic (phrases secrètes)
  - [ ] Indicateur d'observation active

### 🕰️ **5. Visualisation Temporelle**
- [ ] **TimelineViewer.jsx** (Mode Avancé)
  - [ ] Visualisation des timelines multiples
  - [ ] Interface de gestion des superpositions
  - [ ] Indicateurs de convergence/divergence
  - [ ] Contrôles pour résolution manuelle
  - [ ] Affichage des paradoxes créés

- [ ] **TimelineBranch.jsx**
  - [ ] Représentation visuelle d'une timeline
  - [ ] États : actif, superposé, résolu
  - [ ] Actions en cours sur la timeline
  - [ ] Connexions avec autres timelines
  - [ ] Effets visuels de convergence

### 🎨 **6. Styles et Animations**
- [ ] **arena.css**
  - [ ] Styles spécifiques au mode arène
  - [ ] Thème sombre/mystérieux pour l'arène
  - [ ] Animations pour les commentaires
  - [ ] Effets de particules temporelles
  - [ ] Responsive design

- [ ] **Animations CSS/JS**
  - [ ] Transitions fluides entre les modes
  - [ ] Effets de sorts temporels
  - [ ] Animations de combat
  - [ ] Feedback visuel des actions
  - [ ] Particules et effets spéciaux

---

## 🎮 **GAMEPLAY - Mécaniques de Jeu**

### ⚔️ **1. Modes de Combat**
- [ ] **Mode Classique**
  - [ ] IA vs IA avec commentaires automatiques
  - [ ] Joueur vs IA optimisé pour l'arène
  - [ ] PvP direct avec synchronisation temps réel
  - [ ] Spectacle automatisé avec narration

- [ ] **Mode Avancé Temporel**
  - [ ] Sorts de superposition de timelines
  - [ ] Résolution automatique par moteur causal
  - [ ] Mode clavier rapide multi-timeline
  - [ ] Mécaniques de paradoxes contrôlés

### 🎯 **2. Système de Combat**
- [ ] **Combat Rapide**
  - [ ] Mécaniques simplifiées pour l'action
  - [ ] Tours accélérés avec animations fluides
  - [ ] Feedback immédiat des actions
  - [ ] Système de combo temporels

- [ ] **Sorts Temporels**
  - [ ] Frappe Multitemporelle (exemple implémenté)
  - [ ] Bouclier Causal
  - [ ] Paradoxe Offensif
  - [ ] Voyage Temporel Tactique
  - [ ] Convergence Forcée

### 📈 **3. Progression**
- [ ] **Système XP Accéléré**
  - [ ] Gain d'XP multiplié en arène
  - [ ] Déblocage rapide de nouveaux sorts
  - [ ] Progression liée aux paradoxes créés
  - [ ] Achievements spécifiques à l'arène

- [ ] **Déblocage Temporel**
  - [ ] Nouveaux sorts basés sur les actions temporelles
  - [ ] Évolution des héros selon le style de jeu
  - [ ] Artefacts temporaires d'arène
  - [ ] Titres et récompenses cosmétiques

---

## 🎭 **NARRATION - Système de Commentaires**

### 📝 **1. Base de Données de Phrases**
- [ ] **Phrases du Juge par Contexte**
  - [ ] Début de combat (20+ phrases)
  - [ ] Actions normales (30+ phrases)
  - [ ] Coups critiques (25+ phrases)
  - [ ] Sorts temporels (40+ phrases)
  - [ ] Fin de combat (15+ phrases)
  - [ ] Situations spéciales (paradoxes, bugs, etc.)

- [ ] **Phrases de Grut**
  - [ ] Commentaires mystérieux et cryptiques
  - [ ] Observations sur les probabilités
  - [ ] Références aux timelines alternatives
  - [ ] Warnings sur les paradoxes dangereux

### 🎬 **2. Système de Timing**
- [ ] **Déclencheurs Contextuels**
  - [ ] Analyse des actions pour commentaires appropriés
  - [ ] Timing optimal pour ne pas surcharger
  - [ ] Priorité des commentaires (critique > normal)
  - [ ] Évitement des répétitions

- [ ] **Personnalité Dynamique**
  - [ ] Évolution du style selon le combat
  - [ ] Réactions aux stratégies inattendues
  - [ ] Commentaires sur les performances du joueur
  - [ ] Easter eggs et références pop culture

### 🎪 **3. Spectacle et Immersion**
- [ ] **Présentation Épique**
  - [ ] Intro dramatique pour chaque combat
  - [ ] Présentation des combattants style WWE
  - [ ] Build-up de tension avant les gros sorts
  - [ ] Récap final avec statistiques absurdes

- [ ] **Interactions Spéciales**
  - [ ] Réactions aux combos impossibles
  - [ ] Commentaires sur les bugs/glitches
  - [ ] Références à l'univers Heroes of Time
  - [ ] Breaking the 4th wall occasionnel

---

## 🧪 **TESTS ET VALIDATION**

### 🔍 **1. Tests Unitaires**
- [ ] **Backend Services**
  - [ ] ArenaWorldService - Gestion du monde
  - [ ] ArenaJudgeService - Système de commentaires
  - [ ] ArenaHeroService - Héros et progression
  - [ ] ArenaTimelineService - Mécaniques temporelles

- [ ] **Frontend Components**
  - [ ] ArenaView - Navigation et état global
  - [ ] HeroSelector - Sélection et validation
  - [ ] ArenaInterface - Interactions de combat
  - [ ] JudgeComments - Affichage des commentaires

### 🎮 **2. Tests d'Intégration**
- [ ] **Flux Complet**
  - [ ] Sélection héros → Combat → Fin de partie
  - [ ] Modes classique et avancé
  - [ ] Synchronisation commentaires temps réel
  - [ ] Gestion des erreurs et reconnexions

- [ ] **Performance**
  - [ ] Temps de réponse des API
  - [ ] Fluidité des animations
  - [ ] Consommation mémoire
  - [ ] Optimisation mobile

### 🌙 **3. Nuit de Test Spéciale**
- [ ] **Session de Test Marathon**
  - [ ] Test avec timelines multiples
  - [ ] Validation des mécaniques temporelles
  - [ ] Équilibrage des commentaires
  - [ ] Feedback utilisateur en temps réel
  - [ ] Documentation des bugs et améliorations

---

## 📊 **MÉTRIQUES ET SUIVI**

### 📈 **Indicateurs de Succès**
- [ ] **Technique**
  - [ ] Temps de chargement < 2s
  - [ ] 0 bug critique en production
  - [ ] 99% uptime des services arène
  - [ ] Commentaires générés < 500ms

- [ ] **Gameplay**
  - [ ] Durée moyenne combat : 3-7 minutes
  - [ ] Taux d'utilisation modes avancés > 30%
  - [ ] Satisfaction commentaires > 4/5
  - [ ] Rétention joueurs mode arène > 60%

### 🎯 **Objectifs de Lancement**
- [ ] **MVP (Minimum Viable Product)**
  - [ ] Mode classique fonctionnel
  - [ ] 10+ héros disponibles niveau 1
  - [ ] Système de commentaires de base
  - [ ] Interface responsive

- [ ] **Version Complète**
  - [ ] Mode avancé avec timelines
  - [ ] 50+ phrases par contexte
  - [ ] Système de progression complet
  - [ ] Optimisations performance

---

## 🚀 **PLANNING ET PRIORITÉS**

### ⏰ **Phase 1 - Fondations (Semaine 1-2)**
```
🔥 CRITIQUE
├── ArenaWorldService.java
├── ArenaJudge.java + phrases de base
├── ArenaView.jsx + routing
└── API REST de base

🔸 IMPORTANT
├── HeroSelector.jsx
├── ArenaInterface.jsx basique
└── Base de données phrases
```

### ⏰ **Phase 2 - Interface (Semaine 3-4)**
```
🔥 CRITIQUE
├── JudgeComments.jsx + WebSocket
├── HexagonalGrid.jsx
├── ActionBar.jsx
└── Styles arena.css

🔸 IMPORTANT
├── GrutIcon.jsx animé
├── Animations combat
└── Tests d'intégration
```

### ⏰ **Phase 3 - Avancé (Semaine 5-6)**
```
🔥 CRITIQUE
├── ArenaTimelineService.java
├── TimelineViewer.jsx
├── Sorts temporels
└── Mode clavier rapide

🔸 IMPORTANT
├── Système progression
├── Optimisations performance
└── Documentation utilisateur
```

### ⏰ **Phase 4 - Polish (Semaine 7)**
```
🔥 CRITIQUE
├── Nuit de test spéciale
├── Corrections bugs critiques
├── Équilibrage final
└── Déploiement production

🔸 IMPORTANT
├── Métriques et monitoring
├── Documentation technique
└── Préparation marketing
```

---

## 🎉 **CRITÈRES DE RÉUSSITE**

### ✅ **Définition of Done**
- [ ] Tous les tests unitaires passent
- [ ] Interface responsive sur mobile/desktop
- [ ] Documentation technique complète
- [ ] 0 bug critique identifié
- [ ] Performance validée sous charge
- [ ] Commentaires du Juge fonctionnels et drôles
- [ ] Mode avancé temporel opérationnel
- [ ] Intégration complète avec l'écosystème Heroes of Time

### 🏆 **Vision de Succès**
*"Le mode ARÈNE devient le laboratoire de combat préféré des joueurs, où ils peuvent expérimenter librement avec les mécaniques temporelles tout en étant divertis par les commentaires hilarants du Juge. C'est l'endroit où l'impossible devient possible, et où chaque combat raconte une histoire épique."*

---

## 📋 **NOTES DE DÉVELOPPEMENT**

### 🔧 **Considérations Techniques**
- Utiliser l'architecture existante Heroes of Time
- Intégration avec QuantumService pour les mécaniques temporelles
- WebSockets pour les commentaires temps réel
- Base H2 avec tables ARENA_* dédiées
- Optimisation pour mobile dès le début

### 🎨 **Considérations UX**
- Interface intuitive même pour les mécaniques complexes
- Feedback visuel immédiat pour toutes les actions
- Commentaires drôles mais pas envahissants
- Mode débutant et mode expert clairement séparés
- Accessibilité pour tous types de joueurs

### 🌟 **Extensibilité Future**
- Architecture modulaire pour nouveaux modes
- Système de plugins pour commentaires personnalisés
- API ouverte pour créateurs de contenu
- Intégration possible avec streaming/spectateurs
- Base pour tournois et compétitions

---

*"L'ARÈNE n'est pas juste un mode de jeu. C'est l'évolution naturelle de Heroes of Time vers un terrain de jeu temporel où la créativité et le chaos se rencontrent pour créer des moments épiques."*

**- Memento, Architecte du Mode Arène**

---

**🕰️ Dernière mise à jour** : 27/01/2025  
**📊 Statut** : 🔴 Planning terminé, implémentation à démarrer  
**👥 Équipe** : Backend (Java) + Frontend (React) + Gameplay Design