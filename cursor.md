# Règles pour l'Agent Heroes of Time

## ⚠️ PROBLÈME CRITIQUE - DQUOTE> BLOQUANT

### 🚨 **LE PROBLÈME QUI ARRIVE TOUT LE TEMPS**
Le terminal se bloque avec `dquote>` quand :
- **Echo avec guillemets** : `echo "Message avec des "guillemets" internes"`
- **Gros messages** : Messages multi-lignes avec guillemets mal fermés
- **Caractères spéciaux** : Emojis, Unicode, apostrophes dans echo
- **Git commit** : Messages complexes avec guillemets imbriqués

### 💥 **SYMPTÔMES**
```bash
admin@vincents-MacBook-Pro Heroes-of-Time % echo "Message avec des "guillemets" internes"
dquote> 
dquote> 
dquote> # BLOQUÉ ICI - IMPOSSIBLE DE SORTIR
```

### ✅ **SOLUTIONS IMMÉDIATES**
1. **Tapez `Ctrl+C`** pour annuler la commande bloquée
2. **Recommencez** avec une commande simple
3. **Utilisez guillemets simples** : `echo 'Message simple'`
4. **Évitez les emojis** dans echo complètement

### 🛡️ **RÈGLES DE PRÉVENTION**

#### **ECHO - TOUJOURS SIMPLE**
```bash
# ❌ INTERDIT - Cause dquote>
echo "Message avec des "guillemets" internes"
echo "🚀 Message avec emoji"
echo "Message multi-ligne
avec retour à la ligne"

# ✅ AUTORISÉ - Sécurisé
echo 'Message simple'
echo "Message sans guillemets internes"
echo "Message simple sur une ligne"
```

#### **GIT COMMIT - GUILLEMETS SIMPLES**
```bash
# ❌ INTERDIT - Cause dquote>
git commit -m "Message avec des "guillemets" internes"
git commit -m "Message multi-ligne
avec retour à la ligne"

# ✅ AUTORISÉ - Sécurisé
git commit -m 'Message simple'
git commit -m "Message sans guillemets internes"
```

#### **MESSAGES LONGS - FICHIER TEMPORAIRE**
```bash
# Pour les gros messages, utilisez un fichier
echo 'Message long et complexe' > /tmp/msg.txt
git commit -F /tmp/msg.txt
rm /tmp/msg.txt
```

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
# Commit simple - TOUJOURS MARCHE
git commit -m 'Message simple sans guillemets internes'

# Commit avec fichier pour messages longs
echo 'Message long et complexe' > /tmp/msg.txt
git commit -F /tmp/msg.txt
rm /tmp/msg.txt

# Restaurer fichier
git checkout <commit> -- <fichier>

# Annuler commit
git revert <commit>
```

### Serveurs
```bash
# Nettoyer TOUS les ports avant démarrage
lsof -ti:5174 | xargs kill -9 2>/dev/null
lsof -ti:8080 | xargs kill -9 2>/dev/null

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

### Echo sécurisé
```bash
# TOUJOURS utiliser guillemets simples
echo 'Message simple'
echo 'Message sans emojis'

# Ou guillemets doubles SANS guillemets internes
echo "Message simple sans guillemets internes"
```

## PROCÉDURE D'URGENCE DQUOTE>

### Si bloqué dans dquote>
1. **Tapez `Ctrl+C`** immédiatement
2. **Attendez** que le prompt revienne
3. **Recommencez** avec commande simple
4. **Évitez** les guillemets complexes

### Prévention
- **Jamais** de guillemets dans guillemets
- **Jamais** d'emojis dans echo
- **Toujours** tester avec des commandes simples
- **Utiliser** des fichiers temporaires pour les gros messages

## DERNIÈRES AMÉLIORATIONS

- **Interface temporelle** : Épée mystique + console avancée
- **Fonctionnalités** : Historique, auto-complétion, métriques performance
- **Mémorisation** : Pas de git reset --hard, pas d'emojis terminal, guillemets simples
- **URLs** : Frontend http://localhost:5174, Backend http://localhost:8080 