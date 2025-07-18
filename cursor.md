# Règles pour l'Agent Heroes of Time

## RÈGLES CRITIQUES

### 1. GIT - PAS DE RESET HARD
- **INTERDICTION ABSOLUE** : `git reset --hard`, `git push --force`
- **RAISON** : Agent partagé, plusieurs développeurs travaillent simultanément
- **ALTERNATIVES** : `git checkout <commit> -- <fichier>`, `git revert`, `git stash`

### 2. TERMINAL - PAS D'EMOJIS
- **INTERDICTION** : Emojis/Unicode dans les commandes `echo`
- **RAISON** : Cause des blocages avec `quote>` et nécessite "move to background"
- **EXEMPLE À ÉVITER** : `echo "🚀 Test"`
- **EXEMPLE CORRECT** : `echo "Test"`

### 3. GIT COMMIT - GUILLEMETS SIMPLES
- **RÈGLE** : Toujours utiliser des guillemets simples ou échapper les guillemets
- **RAISON** : Évite les blocages `dquote>` avec messages complexes
- **EXEMPLE CORRECT** : `git commit -m 'Message simple'`
- **EXEMPLE À ÉVITER** : `git commit -m "Message avec des "guillemets" internes"`
- **SOLUTION SI BLOQUÉ** : Tapez `Ctrl+C` puis recommencez avec message simple

### 4. SERVEURS - PORTS SIMPLES
- **RÈGLE** : Utiliser des ports différents pour éviter les conflits
- **FRONTEND TEMPORAL** : Port 5174 (pas 5173)
- **BACKEND** : Port 8080
- **VÉRIFICATION** : Toujours faire `lsof -ti:PORT | xargs kill -9` avant de démarrer

## ARCHITECTURE SYSTÈME

### Dual Parser System
- **REGEX Parser** : Production, rapide
- **ANTLR4 Parser** : Développement, complet
- **SWITCH** : Via property `heroes.parser.use.antlr=true/false`

### Interfaces
- **Frontend Classic** : Express server, port 8000
- **Frontend Temporal** : Python HTTP server, port 5174
- **Backend** : Spring Boot, port 8080

## FOCUS PROJET

### Ce que c'est
- **JEU DE STRATÉGIE** temporel asynchrone
- **MÉCANIQUES QUANTIQUES** : États ψ, collapse, timeline branching
- **HEROES OF MIGHT & MAGIC 3** avec éléments temporels

### Ce que ce n'est PAS
- VR / Réalité virtuelle
- IA révolutionnaire
- Percée scientifique
- IDE quantico-temporel

## COMMANDES SÉCURISÉES

### Git
```bash
# Commit simple
git commit -m 'Message simple sans guillemets internes'

# Restaurer fichier
git checkout <commit> -- <fichier>

# Annuler commit
git revert <commit>
```

### Serveurs
```bash
# Nettoyer port
lsof -ti:5174 | xargs kill -9

# Démarrer frontend
cd frontend-temporal && python3 -m http.server 5174

# Démarrer backend
cd backend && mvn spring-boot:run
```

### Debug
```bash
# Vérifier serveurs
curl -s http://localhost:5174 | head -n 5
curl -s http://localhost:8080/api/temporal/health
```

## DERNIÈRES AMÉLIORATIONS

- **Interface temporelle** : Épée mystique + console avancée
- **Fonctionnalités** : Historique, auto-complétion, métriques performance
- **Mémorisation** : Pas de git reset --hard, pas d'emojis terminal, guillemets simples
- **URLs** : Frontend http://localhost:5174, Backend http://localhost:8080 