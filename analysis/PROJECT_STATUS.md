# Heroes of Time - État Actuel du Projet

*Dernière mise à jour : Janvier 2025*

## 📋 Résumé

Heroes of Time est un projet de jeu de stratégie expérimentant avec des mécaniques temporelles inspirées de la physique quantique. Le projet explore l'idée d'intégrer des concepts comme les superpositions d'états et l'effondrement quantique dans le gameplay.

## 🎯 Objectif du Projet

Créer un jeu de stratégie où les joueurs peuvent planifier des actions futures qui existent en superposition jusqu'à ce qu'elles soient "observées" ou que certaines conditions soient remplies, déclenchant alors leur matérialisation.

## 🏗️ Architecture Actuelle

### Backend (Java Spring Boot)
- **Statut** : Fonctionnel à ~70%
- **Fonctionnalités** :
  - API REST pour la gestion des parties
  - Système d'états quantiques (ψ-states)
  - Mécanisme de collapse causale (3 types)
  - Gestion des héros et mouvement
  - Scripts temporels avec grammaire spécialisée (ψ, †, ⊙, Δt)

### Frontend
- **Statut** : Multiple interfaces en développement
- **Port 8000** : Console temporelle avec carte hexagonale
- **Port 8001** : Visualiseur quantique avec graphe D3.js
- **Port 8888** : Interface de tests automatisés

## ✅ Ce qui Fonctionne

1. **Moteur Temporal** : Création et gestion des états quantiques
2. **API Backend** : Endpoints REST opérationnels
3. **Tests Automatisés** : Suite de tests validant les fonctionnalités de base
4. **Grammaire Temporelle** : Parsing des commandes temporelles
5. **Collapse Causale** : 3 types d'effondrement (Interaction, Observation, Anchoring)
6. **Système de Héros** : Création, mouvement, inventaire
7. **Interface de Test** : Outils pour tester le système

## ❌ Limitations Actuelles

1. **Scripts Complexes** : Le backend crash sur les scripts lourds (manque de mémoire)
2. **Intégration Frontend-Backend** : Problèmes CORS et de connectivité
3. **Assets Visuels** : Graphiques manquants pour le visualiseur quantique
4. **WebSocket** : Pas de synchronisation temps réel entre les interfaces
5. **Système UTMD** : Logique des "jours temporels" incomplète
6. **Métriques** : Monitoring incomplet des collapses causales

## 🧪 Tests et Validation

**Résultats des tests d'intégration** : 14/20 tests réussis (70%)

### Tests qui Passent
- Santé du backend
- Création de parties
- Scripts temporels simples
- Interface utilisateur de base
- Métriques de performance

### Tests qui Échouent
- Scripts quantiques complexes
- Intégration complète frontend-backend
- Assets du visualiseur quantique
- Métriques avancées

## 🔧 Stack Technique

- **Backend** : Java 17, Spring Boot 3.2, Maven
- **Frontend** : HTML/CSS/JS vanilla, D3.js pour les graphiques
- **Base de données** : H2 (développement)
- **Tests** : JUnit, scripts bash automatisés
- **Déploiement** : Scripts de démarrage unifiés

## 💡 Concept Innovant

L'idée centrale est d'appliquer des concepts de mécanique quantique au gameplay :
- **Superposition** : Les actions planifiées existent dans plusieurs états simultanément
- **Collapse** : L'observation ou l'interaction force la résolution en une seule réalité
- **Interférence** : Plusieurs plans peuvent s'influencer mutuellement
- **Timeline Branching** : Différentes possibilités créent des branches temporelles

## 📊 État de Développement

| Composant | Statut | Complétude |
|-----------|--------|------------|
| Moteur Temporal | ✅ Fonctionnel | 85% |
| API REST | ✅ Fonctionnel | 90% |
| Interface Console | ✅ Fonctionnel | 75% |
| Visualiseur Quantique | ⚠️ Partiel | 60% |
| Tests Automatisés | ✅ Fonctionnel | 80% |
| Documentation | ✅ Complète | 95% |

## 🎯 Prochaines Étapes

1. **Stabiliser le Backend** : Résoudre les crashes sur scripts complexes
2. **Finaliser l'Intégration** : Connecter proprement frontend et backend
3. **Compléter les Assets** : Ajouter les graphiques manquants
4. **Implémenter WebSocket** : Synchronisation temps réel
5. **Système UTMD** : Finaliser la logique des jours temporels

## 🤔 Réflexions

Ce projet explore un territoire inexploré en game design. L'application de concepts quantiques au gameplay est expérimentale et présente des défis techniques intéressants. 

Bien que l'implémentation actuelle soit incomplète, elle démontre la faisabilité du concept et pose les bases pour un système de jeu original.

L'approche est ambitieuse mais reste un prototype expérimental plutôt qu'un produit fini. Les résultats obtenus jusqu'à présent sont encourageants pour poursuivre l'exploration de ces mécaniques.

---

*Ce document reflète l'état factuel du projet sans exagération. Le projet reste expérimental et en développement actif.* 