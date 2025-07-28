# 🧠 Guide du Système de Persistance Cursor - Heroes of Time

**Système intelligent de maintien du contexte pour éviter la perte de mémoire**

---

## 🎯 Objectif

Ce système garantit que l'agent Cursor **ne perd jamais le contexte** du projet Heroes of Time, même après redémarrage ou oubli. Il maintient automatiquement :

- ✅ **Concepts de base** du jeu (grammaire temporelle, artefacts, etc.)
- ✅ **Historique des modifications** avec horodatage
- ✅ **État actuel du projet** et focus de développement
- ✅ **Structure technique** et endpoints API
- ✅ **Mise à jour automatique** via hooks Git

---

## 📁 Fichiers du Système

### 1. `cursor.rules` (JSON)
**Fichier principal** - Contexte structuré pour l'agent Cursor
```json
{
  "project_name": "Heroes of Time - Temporal Engine",
  "core_concepts": [...],
  "temporal_grammar": {...},
  "active_artifacts": [...],
  "history": [...]
}
```

### 2. `cursor.md` (Markdown)
**Version lisible** - Pour consultation humaine et debug
```markdown
# 🎮 Heroes of Time – Mémoire Cursor
## 🧠 Concepts de Base
- Jeu de stratégie temporelle quantique
- Superpositions quantiques (ψ-states)
...
```

### 3. `update-cursor-context.sh` (Script)
**Outil de mise à jour** - Commandes pour maintenir le contexte
```bash
./update-cursor-context.sh add-artifact "echo_chrono" "Écho Chrono" "Épique" "Duplique actions"
./update-cursor-context.sh update-focus "Implémentation interface React"
./update-cursor-context.sh add-history "Nouveau système de combat"
```

### 4. `.githooks/post-commit` (Hook Git)
**Mise à jour automatique** - Exécuté après chaque commit
```bash
# Analyse automatique des changements
# Mise à jour du contexte selon les fichiers modifiés
```

---

## 🚀 Utilisation

### Installation Initiale
```bash
# 1. Activer les hooks Git personnalisés
git config core.hooksPath .githooks

# 2. Installer jq pour la manipulation JSON (optionnel mais recommandé)
sudo apt-get install jq  # Ubuntu/Debian
brew install jq          # macOS

# 3. Tester le système
./update-cursor-context.sh
```

### Commandes Principales

#### Ajouter un Artefact
```bash
./update-cursor-context.sh add-artifact "temporal_anchor" "Ancre Temporelle" "Légendaire" "Fixe timeline"
```

#### Mettre à Jour le Focus
```bash
./update-cursor-context.sh update-focus "Développement interface Electron"
```

#### Ajouter une Entrée d'Historique
```bash
./update-cursor-context.sh add-history "Optimisation du moteur de collapse"
```

#### Mise à Jour Automatique
```bash
./update-cursor-context.sh
# Détecte automatiquement les changements récents
```

---

## 🔄 Fonctionnement Automatique

### Lors d'un Commit Git
1. **Hook post-commit** s'exécute automatiquement
2. **Analyse** des fichiers modifiés
3. **Catégorisation** du type de changement
4. **Mise à jour** du contexte avec horodatage
5. **Sauvegarde** dans `cursor.rules` et `cursor.md`

### Types de Changements Détectés
- **Fichiers Java** → "Modifications Java: [message commit]"
- **pom.xml** → "Mise à jour Maven: [message commit]"
- **TEMPORAL_ARTIFACTS.json** → "Artefacts temporels modifiés"
- **Fichiers .md** → "Documentation mise à jour"
- **Autres** → "Commit: [message commit]"

---

## 🧠 Comportement de Cursor

### Au Démarrage
1. **Lecture automatique** de `cursor.rules`
2. **Chargement** des concepts, artefacts, et historique
3. **Compréhension** du contexte actuel
4. **Aucune réinvention** des concepts existants

### Pendant le Développement
1. **Référence constante** aux `core_concepts`
2. **Utilisation** de la grammaire spatio-temporelle
3. **Respect** des artefacts définis
4. **Mise à jour automatique** de l'historique

### Résolution d'Ambiguïtés
- **Consulte** les `core_concepts` pour clarifier
- **Utilise** les `syntax_examples` pour la grammaire
- **Référence** les `active_artifacts` pour les effets
- **Vérifie** l'historique pour les changements récents

---

## 🛠️ Maintenance

### Validation JSON
```bash
# Vérifier la validité du JSON
jq empty cursor.rules
echo $?  # 0 = valide, autre = erreur
```

### Sauvegarde
```bash
# Créer une sauvegarde du contexte
cp cursor.rules cursor.rules.backup.$(date +%Y%m%d_%H%M%S)
cp cursor.md cursor.md.backup.$(date +%Y%m%d_%H%M%S)
```

### Restauration
```bash
# Restaurer depuis une sauvegarde
cp cursor.rules.backup.YYYYMMDD_HHMMSS cursor.rules
cp cursor.md.backup.YYYYMMDD_HHMMSS cursor.md
```

---

## 📊 Structure des Données

### Artefact
```json
{
  "id": "identifiant_unique",
  "name": "Nom Affiché",
  "rarity": "Commun|Rare|Épique|Légendaire|Paradoxe",
  "effect": "Description de l'effet"
}
```

### Entrée Historique
```json
{
  "timestamp": "2025-01-21T10:00:00Z",
  "change": "Description du changement"
}
```

### Symbole Temporel
```json
{
  "⊙": "Action en superposition temporelle",
  "†": "État effondré (collapse)",
  "ψ": "Instance d'un état superposé"
}
```

---

## 🔧 Dépannage

### Problèmes Courants

#### jq Non Disponible
```bash
# Symptôme: "jq non disponible - mise à jour manuelle requise"
# Solution: Installer jq ou éditer manuellement cursor.rules
sudo apt-get install jq
```

#### JSON Invalide
```bash
# Symptôme: "cursor.rules contient des erreurs JSON"
# Solution: Valider et corriger le JSON
jq . cursor.rules  # Affiche l'erreur
```

#### Hook Git Non Exécuté
```bash
# Symptôme: Contexte non mis à jour après commit
# Solution: Vérifier la configuration des hooks
git config core.hooksPath .githooks
chmod +x .githooks/post-commit
```

### Logs de Debug
```bash
# Activer les logs détaillés
export CURSOR_DEBUG=1
./update-cursor-context.sh
```

---

## 🎮 Exemples d'Usage

### Ajout d'un Nouvel Artefact
```bash
# Ajouter l'Orbe de Paradoxe
./update-cursor-context.sh add-artifact \
  "paradox_orb" \
  "Orbe de Paradoxe" \
  "Paradoxe" \
  "Inverse cause et effet"

# Résultat dans cursor.rules:
# "active_artifacts": [..., {"id": "paradox_orb", ...}]
# "history": [..., {"timestamp": "...", "change": "Ajout artefact: Orbe de Paradoxe"}]
```

### Changement de Focus de Développement
```bash
# Passer au développement frontend
./update-cursor-context.sh update-focus "Développement interface React avec visualisation temporelle"

# Résultat dans cursor.rules:
# "current_focus": "Développement interface React avec visualisation temporelle"
```

### Suivi d'une Fonctionnalité
```bash
# Début d'implémentation
./update-cursor-context.sh add-history "Début implémentation système de batailles fantômes"

# Commit automatique
git add . && git commit -m "Implémentation batailles fantômes"
# → Hook post-commit ajoute automatiquement l'entrée

# Fin d'implémentation
./update-cursor-context.sh add-history "Système de batailles fantômes terminé et testé"
```

---

## 🔮 Avantages du Système

### Pour l'Agent Cursor
- ✅ **Contexte permanent** - Aucune perte de mémoire
- ✅ **Compréhension immédiate** - Concepts chargés au démarrage
- ✅ **Cohérence** - Pas de réinvention des concepts
- ✅ **Historique complet** - Traçabilité des changements

### Pour le Développeur
- ✅ **Continuité** - Travail sans interruption
- ✅ **Documentation automatique** - Historique maintenu
- ✅ **Visibilité** - État du projet toujours clair
- ✅ **Collaboration** - Contexte partageable

### Pour le Projet
- ✅ **Stabilité** - Concepts cohérents dans le temps
- ✅ **Évolutivité** - Ajout facile de nouveaux éléments
- ✅ **Traçabilité** - Historique complet des modifications
- ✅ **Maintenance** - Système auto-entretenu

---

*🕰️ Système de Persistance Heroes of Time - Contexte maintenu automatiquement depuis 2025*