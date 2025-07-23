# 🚨 GIT SHARED AGENT RULES 🚨

## **PAS DE RESET HARD - C'EST UN AGENT PARTAGÉ**

### RÈGLES CRITIQUES

**⚠️ INTERDICTIONS ABSOLUES ⚠️**
```bash
# ❌ JAMAIS FAIRE ÇA :
git reset --hard <commit>
git push --force
git push -f
git branch -D <branch>
```

**✅ MÉTHODES SÉCURISÉES ✅**
```bash
# ✅ Pour restaurer un fichier :
git checkout <commit> -- <fichier>

# ✅ Pour annuler un commit :
git revert <commit>

# ✅ Pour sauvegarder temporairement :
git stash
git stash pop

# ✅ Pour voir l'historique :
git reflog
```

### POURQUOI CES RÈGLES ?

- **Plusieurs développeurs** travaillent simultanément
- **Perte de données** irréversible avec reset --hard
- **Conflits majeurs** et corruption de l'historique
- **Travail collaboratif** nécessite des méthodes non-destructives

### EN CAS DE PROBLÈME

1. **STOP** - Ne pas paniquer
2. **COMMUNIQUER** avec l'équipe
3. **UTILISER** `git reflog` pour voir l'historique
4. **RESTAURER** avec `git checkout` ou `git revert`

---
**🔴 RAPPEL : AGENT PARTAGÉ = ZÉRO RESET HARD 🔴** 