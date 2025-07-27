# 🎮 Heroes of Time – Mémoire Cursor

**Version POC Alpha V0.1** | **Dernière mise à jour : 2025-07-17**

---

## 🧠 Concepts de Base

- **Jeu de stratégie temporelle quantique** avec mécaniques de collapse causal
- **Timeline locale par joueur** avec branches multiples (ℬ1, ℬ2, ℬ3...)
- **Superpositions quantiques (ψ-states)** avec collapse automatique
- **Artefacts temporels** avec effets spatio-temporels
- **Batailles fantômes** pour résolution de conflits causaux
- **Script-first gameplay** avec langage temporel complet
- **Moteur 5D** (x,y,z,timeline,temporalLayer)
- **Système hexagonal** pour la carte

---

## 🔣 Grammaire Spatio-Temporelle

### Symboles Principaux
- `⊙` → Action en superposition temporelle
- `†` → État effondré (collapse)
- `ψ` → Instance d'un état superposé
- `Π` → Observation externe (déclencheur de collapse)
- `Δt` → Délai temporel (ex: Δt+2 = dans 2 tours)
- `@` → Coordonnées spatiales (@x,y)
- `ℬ` → Branche temporelle (multivers ℬ1, ℬ2, etc.)
- `⟶` → Projection d'effet ou d'action

### Exemples de Syntaxe
```
ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))
Π(Player2 enters @126,65) ⇒ †ψ001
†ψ001
USE(ITEM, AvantWorldBlade, HERO:Arthur)
```

---

## 🔮 Artefacts Temporels Actifs

### Paradoxe
- **Lame de l'Avant-Monde** → Bataille fantôme future

### Légendaires
- **Horloge du Dernier Instant** → Rollback 1-3 tours
- **Balise d'Ignorance Temporelle** → Ignore entités faibles
- **Tour de l'Ancrage** → Gèle zone temporelle

---

## 🏗️ Architecture Technique

### Backend (Port 8080)
- **Framework** : Spring Boot 3.2.0
- **Java** : 17+
- **Database** : H2 in-memory
- **Build** : Maven 3.8+

### Frontend (À développer)
- **Technology** : React/Electron suggéré
- **Port** : 3000

---

## ✅ Fonctionnalités Implémentées

### Backend Complet
- ✅ Moteur temporel quantique complet
- ✅ Parser de scripts temporels avec regex
- ✅ Système de ψ-states avec collapse
- ✅ Gestion des timelines multiples
- ✅ Artefacts temporels avec effets
- ✅ API REST complète
- ✅ Base de données H2 avec schéma complet
- ✅ Système hexagonal de coordonnées
- ✅ Détection et résolution des conflits causaux

### Tests
- ✅ Scripts de test automatisés
- ✅ Données d'exemple complètes
- ✅ Tests d'intégration API
- ✅ Validation des mécaniques temporelles

---

## 🎯 Tâche en Cours

**Système de persistance intelligent créé - Prêt pour développement frontend**

---

## 🚀 API Endpoints

- `/api/games` → Gestion des parties
- `/api/heroes` → Actions des héros
- `/api/scripts` → Exécution des scripts temporels
- `/api/temporal` → Opérations temporelles
- `/api/tiles` → Gestion de la carte
- `/api/timelines` → Gestion des branches temporelles

---

## 📜 Historique Récent

- **2025-01-21 08:00** → Création du POC complet avec moteur temporel
- **2025-01-21 09:00** → Implémentation des artefacts temporels
- **2025-01-21 09:30** → Parser de scripts temporels avec regex complet
- **2025-01-21 10:00** → Système de persistance intelligent créé

---

## 🔄 Prochaines Étapes

1. **Développement de l'interface frontend**
2. **Visualisation des timelines et zones temporelles**
3. **Tests d'intégration avec interface utilisateur**
4. **Optimisation des performances du moteur temporel**

---

## ⚠️ Notes Importantes

- **Toujours respecter** la grammaire spatio-temporelle définie
- **Les ψ-states** doivent être gérés avec précaution (collapse automatique)
- **Les conflits causaux** déclenchent des batailles fantômes
- **Le système est script-first** : tout doit être jouable par scripts
- **Coordonnées hexagonales** avec système de cubes
- **H2 database** auto-initialisée avec données d'exemple

---

## 📁 Structure des Fichiers

### Racine
- `README.md` → Documentation principale
- `RESUME_POC_HEROES_OF_TIME.md` → Résumé complet
- `TEMPORAL_ARTIFACTS.json` → Artefacts définis
- `GRAMMAIRE_SPATIO_TEMPORELLE.md` → Syntaxe complète
- `sample_data.json` → Données de test
- `cursor.rules` → Fichier de contexte JSON
- `cursor.md` → Ce fichier de contexte lisible

### Backend
- `src/main/java/com/heroesoftimepoc/temporalengine/`
  - `model/` → Entités JPA
  - `service/` → Logique métier
  - `controller/` → API REST
  - `repository/` → Accès données

---

*🕰️ Système de persistance Heroes of Time - Contexte maintenu automatiquement*