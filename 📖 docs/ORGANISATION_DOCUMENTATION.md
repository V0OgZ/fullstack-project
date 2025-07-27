# 📚 Organisation de la Documentation Heroes of Time

## 🎯 Principe : Documentation Vivante

### 1. **Structure par Sessions**
```
docs/
├── current/                    # Docs actives et à jour
│   ├── README.md              # Index des docs courantes
│   └── TRAVAIL_EN_COURS.md    # Ce sur quoi on bosse
│
├── memento-sessions/          # Sessions de travail Memento
│   ├── 2025-07-25/           # Session du jour
│   ├── 2025-07-24/           # Session d'hier
│   └── INDEX.md              # Index des sessions
│
└── technical/                 # Docs techniques pérennes
    ├── API.md                # Toujours à jour
    └── ARCHITECTURE.md       # Toujours à jour
```

### 2. **Règles Simples**

#### 📝 Pour Memento (Sessions de Travail)
- **Un dossier par jour** : `docs/memento-sessions/YYYY-MM-DD/`
- **Tout dedans** : notes, idées, rapports, découvertes
- **Pas de pression** : c'est un espace de travail libre
- **Archive automatique** : après 30 jours → archive/

#### 🔧 Pour les Docs Techniques
- **Règle du "Touch It, Update It"** : Si tu modifies du code, tu mets à jour la doc
- **Docs minimales** : Seulement ce qui est VRAIMENT utile
- **Suppression agressive** : Si personne ne lit une doc en 3 mois, on la vire

### 3. **Workflow Quotidien**

```bash
# Début de session
./start-session.sh
# → Crée automatiquement docs/memento-sessions/2025-07-25/
# → Copie le template de session

# Pendant le travail
# → Tout va dans le dossier du jour
# → Pas de stress sur l'organisation

# Fin de session
./end-session.sh
# → Génère un résumé
# → Met à jour l'index
# → Archive ce qui est vieux
```

### 4. **Templates Utiles**

#### 📋 Template Session Memento
```markdown
# Session du [DATE]

## 🎯 Objectifs du jour
- [ ] 

## 💡 Idées / Découvertes
- 

## 🐛 Problèmes rencontrés
- 

## ✅ Réalisations
- 

## 📝 Notes pour demain
- 
```

#### 🔧 Template Doc Technique
```markdown
# [Nom du Système]

## 🎯 À quoi ça sert
[Une phrase]

## 🚀 Comment l'utiliser
```bash
# Exemple concret
```

## ⚠️ Pièges à éviter
- 

## 📅 Dernière mise à jour
[DATE] - [QUI] - [POURQUOI]
```

### 5. **Auto-nettoyage**

Script qui tourne chaque semaine :
- Archive les sessions > 30 jours
- Identifie les docs non lues (git log)
- Propose de supprimer les docs obsolètes
- Génère un rapport de santé

### 6. **Avantages**

✅ **Pour Memento** : Liberté totale, pas de contraintes
✅ **Pour les Docs** : Toujours à jour ou supprimées
✅ **Pour le Projet** : Reste propre et navigable
✅ **Pour les Nouveaux** : Trouvent facilement l'info utile

## 🚀 Commandes Utiles

```bash
# Créer une nouvelle session
./docs/new-session.sh

# Voir les docs récentes
./docs/recent.sh

# Nettoyer les vieilles docs
./docs/cleanup.sh

# Chercher dans toutes les docs
./docs/search.sh "terme"
```

## 📊 Métriques de Santé

- **Docs actives** : < 20 fichiers
- **Age moyen** : < 60 jours  
- **Taille totale** : < 10 MB
- **Ratio lecture/écriture** : > 0.5

---

*"Une doc non lue est une doc à supprimer"* - Principe de base